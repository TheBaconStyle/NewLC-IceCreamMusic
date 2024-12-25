"use server";

import { createS3Client } from "@/config/s3";
import { db } from "@/db";
import { release, track, users } from "@/db/schema";
import {
  optionalFileSchema,
  releaseInsertSchema,
  releasePreviewSchema,
  trackInsertSchema,
  TReleaseInsert,
  TTrackInsert,
  TValidatedTrackFiles,
} from "@/schema/release.schema";
import { fileSchema } from "@/schema/shared.schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getAuthSession } from "../auth";
import { revalidatePathAction } from "../revalidate";

export async function uploadRelease(
  releaseData: TReleaseInsert,
  releaseFiles: FormData,
  tracksData: TTrackInsert[],
  ...tracksFiles: FormData[]
) {
  const session = await getAuthSession();

  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.id, session.id),
    with: {
      verifications: true,
    },
  });

  if (!user) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const releaseResult = releaseInsertSchema.safeParse(releaseData);

  if (!releaseResult.success) {
    console.dir(releaseResult.error, { depth: Infinity });
    return {
      success: false,
      message: "Данные релиза не прошли автоматическую проверку",
    };
  }

  const releasePreviewResult = releasePreviewSchema.safeParse(
    releaseFiles.get("preview")
  );

  if (!releasePreviewResult.success) {
    console.dir(releasePreviewResult.error, { depth: Infinity });
    return {
      success: false,
      message: "Файл обложки релиза не прошёл автоматическую проверку",
    };
  }

  if (tracksData.length !== tracksFiles.length) {
    return {
      success: false,
      message: `Количество файлов к трекам не соответствует количеству заполненных форм к трекам`,
    };
  }

  const validatedTracksData: TTrackInsert[] = [];
  const validatedTracksFiles: TValidatedTrackFiles[] = [];

  for (let index = 0; index < tracksData.length; index++) {
    const trackResult = trackInsertSchema.safeParse(tracksData[index]);

    if (!trackResult.success) {
      console.dir(trackResult.error, { depth: Infinity });
      return {
        success: false,
        message: `Данные к реку ${index} не прошли автоматическую проверку`,
      };
    }

    const validatedTrackFile = fileSchema.safeParse(
      tracksFiles[index].get("track")
    );

    if (!validatedTrackFile.success) {
      return {
        success: false,
        message: `Файл трека ${index} не прошёл автоматическую проверку`,
      };
    }

    const trackFiles: TValidatedTrackFiles = { track: validatedTrackFile.data };

    if (trackResult.data.ringtone) {
      const validatedRingtoneFile = optionalFileSchema.safeParse(
        tracksFiles[index].get("ringtone")
      );

      if (!validatedRingtoneFile.success) {
        console.dir(validatedRingtoneFile.error, { depth: Infinity });
        return {
          success: false,
          message: `Файл рингтона трека ${index} не прошёл автоматическую проверку`,
        };
      }

      trackFiles.ringtone = validatedRingtoneFile.data;
    }

    if (trackResult.data.text_sync) {
      const validatedTextSyncFile = optionalFileSchema.safeParse(
        tracksFiles[index].get("text_sync")
      );

      if (!validatedTextSyncFile.success) {
        return {
          success: false,
          message: `Файл синхротекста трека ${index} не прошёл автоматическую проверку`,
        };
      }

      trackFiles.text_sync = validatedTextSyncFile.data;
    }

    if (trackResult.data.video_shot) {
      const validatedVideoshotFile = optionalFileSchema.safeParse(
        tracksFiles[index].get("video_shot")
      );

      if (!validatedVideoshotFile.success) {
        return {
          success: false,
          message: `Файл видеошота трека ${index} не прошёл автоматическую проверку`,
        };
      }

      trackFiles.video_shot = validatedVideoshotFile.data;
    }

    if (trackResult.data.video) {
      const validatedVideoFile = optionalFileSchema.safeParse(
        tracksFiles[index].get("video")
      );

      if (!validatedVideoFile.success) {
        return {
          success: false,
          message: `Файл видео трека ${index} не прошёл автоматическую проверку`,
        };
      }

      trackFiles.video = validatedVideoFile.data;
    }

    validatedTracksFiles.push(trackFiles);

    validatedTracksData.push(trackResult.data);
  }

  const minioS3 = createS3Client();

  const result = await db
    .transaction(async () => {
      let confirmed = false;

      if (
        user.isSubscribed &&
        (user.subscriptionLevel === "enterprise" || user.freeReleases > 0)
      ) {
        await db
          .update(users)
          .set({
            freeReleases: user.freeReleases - 1,
          })
          .where(eq(users.id, user.id));
        confirmed = true;
      }

      const uploadedRelease = (
        await db
          .insert(release)
          .values({ ...releaseResult.data, confirmed, authorId: user.id })
          .returning({ id: release.id, preview: release.preview })
      ).pop();

      const previewUploaded = await minioS3
        .putObject(
          "previews",
          `${uploadedRelease!.id}.${uploadedRelease!.preview}`,
          Buffer.from(await releasePreviewResult.data.arrayBuffer())
        )
        .then(() => true)
        .catch(() => false);

      if (!previewUploaded) {
        throw new Error("Не удалось загрузить превью к релизу");
      }

      const insertedTracks = await db
        .insert(track)
        .values(
          validatedTracksData.map((td) => ({
            ...td,
            releaseId: uploadedRelease!.id,
          }))
        )
        .returning({
          id: track.id,
        });

      if (
        insertedTracks.length !== validatedTracksFiles.length ||
        insertedTracks.length !== validatedTracksData.length
      ) {
        throw new Error("Несоответствие треков и данных к ним");
      }

      for (let index = 0; index < insertedTracks.length; index++) {
        const trackFile = validatedTracksFiles[index].track as File;

        const trackBytes = await trackFile.arrayBuffer();

        const trackType = validatedTracksData[index].track;

        await minioS3
          .putObject(
            "tracks",
            `${insertedTracks[index].id}.${trackType}`,
            Buffer.from(trackBytes)
          )
          .catch(() => {
            throw new Error(
              `Не удалось загрузить трек ${validatedTracksData[index].title} (${trackFile.name})`
            );
          });

        if (
          !!validatedTracksData[index].text_sync &&
          !!validatedTracksFiles[index].text_sync
        ) {
          const syncBytes = await validatedTracksFiles[
            index
          ].text_sync!.arrayBuffer();

          await minioS3
            .putObject(
              "syncs",
              `${insertedTracks[index].id}.${validatedTracksData[index].text_sync}`,
              Buffer.from(syncBytes)
            )
            .catch(() => {
              throw new Error(
                `Не удалось загрузить синхротекст к треку ${validatedTracksData[index].title} (${trackFile.name})`
              );
            });
        }

        if (
          !!validatedTracksData[index].text_sync &&
          !!validatedTracksFiles[index].ringtone
        ) {
          const ringtoneBytes = await validatedTracksFiles[
            index
          ].ringtone!.arrayBuffer();

          await minioS3
            .putObject(
              "syncs",
              `${insertedTracks[index].id}.${validatedTracksData[index].ringtone}`,
              Buffer.from(ringtoneBytes)
            )
            .catch(() => {
              throw new Error(
                `Не удалось загрузить рингтон к треку ${validatedTracksData[index].title} (${trackFile.name})`
              );
            });
        }

        if (
          !!validatedTracksData[index].video &&
          !!validatedTracksFiles[index].video
        ) {
          const videoBytes = await validatedTracksFiles[
            index
          ].video!.arrayBuffer();

          await minioS3
            .putObject(
              "syncs",
              `${insertedTracks[index].id}.${validatedTracksData[index].video}`,
              Buffer.from(videoBytes)
            )
            .catch(() => {
              throw new Error(
                `Не удалось загрузить видео к треку ${validatedTracksData[index].title} (${trackFile.name})`
              );
            });
        }

        if (
          !!validatedTracksData[index].video_shot &&
          !!validatedTracksFiles[index].video_shot
        ) {
          const videoShotBytes = await validatedTracksFiles[
            index
          ].video_shot!.arrayBuffer();

          await minioS3
            .putObject(
              "syncs",
              `${insertedTracks[index].id}.${validatedTracksData[index].video_shot}`,
              Buffer.from(videoShotBytes)
            )
            .catch(() => {
              throw new Error(
                `Не удалось загрузить видео-шот к треку ${validatedTracksData[index].title} (${trackFile.name})`
              );
            });
        }
      }
    })
    .catch((e) => {
      console.dir(e, { depth: Infinity });
      return {
        success: false,
        message: e.message,
      };
    });

  if (!!result) {
    return result;
  }

  revalidatePathAction("/dashboard");

  redirect("/dashboard");
}
