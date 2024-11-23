"use server";

import { createS3Client } from "@/config/s3";
import { db } from "@/db";
import { release, track, users } from "@/db/schema";
import {
  releaseFormSchema,
  trackFormSchema,
  TReleaseForm,
  TReleaseInsert,
  TTrackForm,
} from "@/schema/release.schema";
import { createSMTPClient } from "@/utils/createSMTPClient";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getAuthSession } from "./auth";
import { sendModerationNotification } from "./email";
import { revalidateCurrentPath, revalidatePathAction } from "./revalidate";
import { isAdminUser } from "./users";

export async function uploadRelease(
  releaseData: FormData,
  ...tracksData: FormData[]
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

  let newReleaseData: Omit<TReleaseForm, "tracks"> | null = null;

  const releaseObjectProto = {
    ...Object.fromEntries(releaseData.entries()),
    preview: releaseData.get("preview"),
    area: JSON.parse(String(releaseData.get("area") ?? "")),
    platforms: JSON.parse(String(releaseData.get("platforms") ?? "")),
  };

  try {
    newReleaseData = releaseFormSchema
      .omit({ tracks: true })
      .parse(releaseObjectProto);
  } catch (e) {
    console.dir(e, { depth: Infinity });
  }

  if (!newReleaseData) {
    return {
      success: false,
      message:
        "Некорректные данные релиза. Пожалуйста попробуйте заполнить форму ещё раз",
    };
  }

  let tracksError = null;

  const tracksObjectData: TTrackForm[] = [];

  for (let td of tracksData) {
    try {
      const trackSync = td.get("text_sync");
      const ringtone = td.get("ringtone");
      const video = td.get("video");
      const track = td.get("track");
      const video_shot = td.get("video_shot");

      const validatedTrack = trackFormSchema.parse({
        ...Object.fromEntries(td.entries()),
        roles: JSON.parse(String(td.get("roles") ?? "")),
        track: track,
        text_sync: !!trackSync ? trackSync : undefined,
        ringtone: !!ringtone ? ringtone : undefined,
        video: !!video ? video : undefined,
        focus: !!td.get("focus"),
        explicit: !!td.get("explicit"),
        cover: !!td.get("cover"),
        remix: !!td.get("remix"),
        live: Boolean(JSON.parse(String(td.get("live")))),
        instrumental: !!td.get("instrumental"),
        video_shot: !!video_shot ? video_shot : undefined,
      });

      tracksObjectData.push(validatedTrack);
    } catch (e) {
      console.dir(e, { depth: Infinity });
      tracksError = e;
      break;
    }
  }

  if (tracksError) {
    return {
      success: false,
      message:
        "Некорректные данные треков. Пожалуйста попробуйте отправить форму снова.",
    };
  }

  const releaseFile = newReleaseData.preview as File;

  const previewBytes = await releaseFile.arrayBuffer();

  const previewType = releaseFile.type.split("/")[1];

  newReleaseData.preview = previewType;

  const newRelease: TReleaseInsert = {
    ...newReleaseData,
    authorId: user.id,
    preview: newReleaseData.preview,
    releaseDate: new Date(newReleaseData.releaseDate),
    startDate: new Date(newReleaseData.startDate),
    preorderDate: new Date(newReleaseData.preorderDate),
  };

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
          .values({ ...newRelease, confirmed })
          .returning({ id: release.id })
      ).pop();

      const previewUploaded = await minioS3
        .putObject(
          "previews",
          `${uploadedRelease!.id}.${previewType}`,
          Buffer.from(previewBytes)
        )
        .then(() => true)
        .catch(() => false);

      if (!previewUploaded) {
        throw new Error("Не удалось загрузить превью к релизу");
      }

      for (let td of tracksObjectData) {
        const trackFile = td.track as File;

        const trackBytes = await trackFile.arrayBuffer();

        const trackType = trackFile.type.split("/")[1];

        let trackSync: string | null = null;

        if (td.text_sync instanceof File) {
          trackSync = td.text_sync.type.split("/")[1];
        }

        let trackRingtone: string | null = null;

        if (td.ringtone instanceof File) {
          trackRingtone = td.ringtone.type.split("/")[1];
        }

        let trackVideo: string | null = null;

        if (td.video instanceof File) {
          trackVideo = td.video.type.split("/")[1];
        }

        let trackVideoShot: string | null = null;

        if (td.video_shot instanceof File) {
          trackVideoShot = td.video_shot.type.split("/")[1];
        }

        const newTrack = (
          await db
            .insert(track)
            .values({
              ...td,
              track: trackType,
              instant_gratification: td.instant_gratification
                ? new Date(td.instant_gratification)
                : null,
              releaseId: uploadedRelease!.id,
              video: trackVideo,
              video_shot: trackVideoShot,
              ringtone: trackRingtone,
              text_sync: trackSync,
            })
            .returning({
              id: track.id,
              syncType: track.text_sync,
              ringtoneType: track.ringtone,
              videoType: track.video,
              videoShotType: track.video_shot,
            })
        ).pop();

        if (!newTrack) {
          throw new Error(
            "Не удалось загрузить один из треков. Попробуйте ещё раз."
          );
        }

        await minioS3
          .putObject(
            "tracks",
            `${newTrack!.id}.${trackType}`,
            Buffer.from(trackBytes)
          )
          .catch(() => {
            throw new Error(
              `Не удалось загрузить трек ${td.title} (${trackFile.name})`
            );
          });

        if (td.text_sync instanceof File) {
          const syncBytes = await td.text_sync.arrayBuffer();

          await minioS3
            .putObject(
              "syncs",
              `${newTrack!.id}.${newTrack!.syncType}`,
              Buffer.from(syncBytes)
            )
            .catch(() => {
              throw new Error(
                `Не удалось загрузить синхротекст к треку ${td.title} (${trackFile.name})`
              );
            });
        }

        if (td.ringtone instanceof File) {
          const ringtoneBytes = await td.ringtone.arrayBuffer();

          await minioS3
            .putObject(
              "syncs",
              `${newTrack!.id}.${newTrack!.ringtoneType}`,
              Buffer.from(ringtoneBytes)
            )
            .catch(() => {
              throw new Error(
                `Не удалось загрузить рингтон к треку ${td.title} (${trackFile.name})`
              );
            });
        }

        if (td.video instanceof File) {
          const videoBytes = await td.video.arrayBuffer();

          await minioS3
            .putObject(
              "syncs",
              `${newTrack!.id}.${newTrack!.videoType}`,
              Buffer.from(videoBytes)
            )
            .catch(() => {
              throw new Error(
                `Не удалось загрузить видео к треку ${td.title} (${trackFile.name})`
              );
            });
        }

        if (td.video_shot instanceof File) {
          const videoShotBytes = await td.video_shot.arrayBuffer();

          await minioS3
            .putObject(
              "syncs",
              `${newTrack!.id}.${newTrack!.videoShotType}`,
              Buffer.from(videoShotBytes)
            )
            .catch(() => {
              throw new Error(
                `Не удалось загрузить видео-шот к треку ${td.title} (${trackFile.name})`
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

  if (typeof result !== "undefined") {
    return {
      success: false,
      message: result.message,
    };
  }

  revalidatePathAction("/dashboard");

  redirect("/dashboard");
}

export async function approveRelease(releaseId: string, upc: string) {
  const isAdmin = await isAdminUser();

  if (!isAdmin) {
    return {
      success: false,
      message: "Недостаточно прав для выполнения действия",
    };
  }

  const isSuccess = await db
    .transaction(async () => {
      const releaseData = await db.query.release.findFirst({
        where: (rel, { eq }) => eq(rel.id, releaseId),
        with: {
          author: {
            columns: {
              email: true,
            },
          },
        },
      });

      if (!releaseData) {
        throw new Error("Нет релиза с такими данными");
      }

      await db
        .update(release)
        .set({ status: "approved", upc, rejectReason: null })
        .where(eq(release.id, releaseData.id));

      const transport = await createSMTPClient().catch(() => null);

      if (!transport) {
        throw new Error("Что-то пошло не так");
      }

      sendModerationNotification(
        releaseData.author.email,
        transport,
        "approved",
        releaseData.title
      );
    })
    .then(() => true)
    .catch(() => false);

  if (!isSuccess) {
    return { success: false, message: "Что-то пошло не так" };
  }

  return revalidateCurrentPath();
}

export async function rejectRelease(releaseId: string, reason: string) {
  const isAdmin = await isAdminUser();

  if (!isAdmin) {
    return {
      success: false,
      message: "Недостаточно прав для выполнения действия",
    };
  }

  const isSuccess = await db
    .transaction(async () => {
      const releaseData = await db.query.release.findFirst({
        where: (rel, { eq }) => eq(rel.id, releaseId),
        with: {
          author: {
            columns: {
              email: true,
            },
          },
        },
      });

      if (!releaseData) {
        throw new Error("Нет релиза с такими данными");
      }

      await db
        .update(release)
        .set({ status: "rejected", rejectReason: reason })
        .where(eq(release.id, releaseData.id));

      const transport = await createSMTPClient().catch(() => null);

      if (!transport) {
        throw new Error("Что-то пошло не так");
      }

      await sendModerationNotification(
        releaseData.author.email,
        transport,
        "rejected",
        releaseData.title,
        reason
      );
    })
    .then(() => true)
    .catch(() => false);

  if (!isSuccess) {
    return { success: false, message: "Что-то пошло не так" };
  }

  return revalidateCurrentPath();
}
