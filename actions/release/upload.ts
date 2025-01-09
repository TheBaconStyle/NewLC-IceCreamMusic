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
import { removeFile, uploadFile } from "@/utils/fuleUpload";
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
        message: `Данные к треку ${index} не прошли автоматическую проверку`,
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

  const result = await db
    .transaction(async (tx) => {
      let confirmed = false;

      const client = createS3Client();

      if (
        user.isSubscribed &&
        (user.subscriptionLevel === "enterprise" || user.freeReleases > 0)
      ) {
        await tx
          .update(users)
          .set({
            freeReleases: user.freeReleases - 1,
          })
          .where(eq(users.id, user.id));
        confirmed = true;
      }

      const insertedRelease = (
        await tx
          .insert(release)
          .values({ ...releaseResult.data, confirmed, authorId: user.id })
          .returning({ id: release.id, preview: release.preview })
      ).pop();

      if (!insertedRelease) {
        throw new Error("Не удалось загрузить данные к релизу");
      }

      await uploadFile({
        bucket: "previews",
        name: `${insertedRelease.id}.${insertedRelease.preview}`,
        file: releasePreviewResult.data,
        client,
      }).catch(async (e) => {
        console.log(new Date(), e);
        await removeReleaseAssets(insertedRelease, insertedTracks);
        throw new Error("Не удалось загрузить превью к релизу");
      });

      const insertedTracks = await tx
        .insert(track)
        .values(
          validatedTracksData.map((td) => ({
            ...td,
            releaseId: insertedRelease!.id,
          }))
        )
        .returning({
          id: track.id,
          track: track.track,
          text_sync: track.text_sync,
          ringtone: track.ringtone,
          video: track.video,
          video_shot: track.video_shot,
          title: track.title,
        });

      if (insertedTracks.length !== validatedTracksFiles.length) {
        throw new Error("Несоответствие треков и данных к ним");
      }

      for (let index = 0; index < insertedTracks.length; index++) {
        const trackFile = validatedTracksFiles[index].track;

        await uploadFile({
          bucket: "tracks",
          name: `${insertedTracks[index].id}.${insertedTracks[index].track}`,
          file: validatedTracksFiles[index].track,
          client,
        }).catch(async (e) => {
          console.log(new Date(), e);
          await removeReleaseAssets(insertedRelease, insertedTracks);
          throw new Error(
            `Не удалось загрузить трек ${insertedTracks[index].title} (${trackFile.name})`
          );
        });

        if (
          insertedTracks[index].text_sync !== null &&
          validatedTracksFiles[index].text_sync instanceof File
        ) {
          await uploadFile({
            bucket: "syncs",
            name: `${insertedTracks[index].id}.${insertedTracks[index].text_sync}`,
            file: validatedTracksFiles[index].text_sync!,
            client,
          }).catch(async (e) => {
            console.log(new Date(), e);
            await removeReleaseAssets(insertedRelease, insertedTracks);
            throw new Error(
              `Не удалось загрузить синхротекст к треку ${insertedTracks[index].title} (${trackFile.name})`
            );
          });
        }

        if (
          insertedTracks[index].ringtone !== null &&
          validatedTracksFiles[index].ringtone instanceof File
        ) {
          await uploadFile({
            bucket: "ringtones",
            name: `${insertedTracks[index].id}.${insertedTracks[index].ringtone}`,
            file: validatedTracksFiles[index].ringtone!,
            client,
          }).catch(async (e) => {
            console.log(new Date(), e);
            await removeReleaseAssets(insertedRelease, insertedTracks);
            throw new Error(
              `Не удалось загрузить рингтон к треку ${insertedTracks[index].title} (${trackFile.name})`
            );
          });
        }

        if (
          insertedTracks[index].video !== null &&
          validatedTracksFiles[index].video instanceof File
        ) {
          await uploadFile({
            bucket: "videos",
            name: `${insertedTracks[index].id}.${insertedTracks[index].video}`,
            file: await validatedTracksFiles[index].video!,
            client,
          }).catch(async (e) => {
            console.log(new Date(), e);
            await removeReleaseAssets(insertedRelease, insertedTracks);
            throw new Error(
              `Не удалось загрузить видео к треку ${insertedTracks[index].title} (${trackFile.name})`
            );
          });
        }

        if (
          insertedTracks[index].video_shot !== null &&
          validatedTracksFiles[index].video_shot instanceof File
        ) {
          await uploadFile({
            bucket: "videoshots",
            name: `${insertedTracks[index].id}.${insertedTracks[index].video_shot}`,
            file: validatedTracksFiles[index].video_shot!,
            client,
          }).catch(async (e) => {
            console.log(new Date(), e);
            await removeReleaseAssets(insertedRelease, insertedTracks);
            throw new Error(
              `Не удалось загрузить видео-шот к треку ${insertedTracks[index].title} (${trackFile.name})`
            );
          });
        }
      }
    })
    .catch((e) => {
      console.dir({ date: new Date(), error: e }, { depth: Infinity });
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

async function removeReleaseAssets(
  release: { preview: string; id: string },
  tracks: {
    id: string;
    track: string;
    text_sync: string | null;
    ringtone: string | null;
    video: string | null;
    video_shot: string | null;
  }[]
) {
  const client = createS3Client();
  await removeFile({
    bucket: "previews",
    name: `${release.id}.${release.preview}`,
    client,
  });
  await Promise.all(
    tracks.map(async (track) => {
      await removeFile({
        bucket: "tracks",
        name: `${track.id}.${track.track}`,
        client,
      });
      await removeFile({
        bucket: "syncs",
        name: `${track.id}.${track.text_sync}`,
        client,
      });
      await removeFile({
        bucket: "ringtones",
        name: `${track.id}.${track.ringtone}`,
        client,
      });
      await removeFile({
        bucket: "videos",
        name: `${track.id}.${track.video}`,
        client,
      });
      await removeFile({
        bucket: "videoshots",
        name: `${track.id}.${track.video_shot}`,
        client,
      });
    })
  );
}
