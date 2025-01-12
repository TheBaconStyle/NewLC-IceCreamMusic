"use server";

import { getAuthSession } from "@/actions/auth";
import { revalidatePathAction } from "@/actions/revalidate";
import { createS3Client } from "@/config/s3";
import { db } from "@/db";
import { release } from "@/db/schema";
import { standardLabelName } from "@/helpers/priceList";
import {
  releasePreviewSchema,
  releaseUpdateSchema,
  TReleaseUpdate,
} from "@/schema/release.schema";
import { uploadFile } from "@/utils/fuleUpload";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function editUserRelease(
  releaseData: TReleaseUpdate,
  releaseFiles: FormData
) {
  const session = await getAuthSession();

  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const user = await db.query.users.findFirst({
    where: (user, { eq, and }) =>
      and(eq(user.isVerifiedAuthor, true), eq(user.id, session.id)),
  });

  if (!user) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const releaseResult = releaseUpdateSchema.safeParse(releaseData);

  if (!releaseResult.success) {
    console.dir(releaseResult.error, { depth: Infinity });
    return {
      success: false,
      message: "Данные релиза не прошли автоматическую проверку",
    };
  }

  const releaseDBData = await db.query.release.findFirst({
    where: (rel, { eq, and }) =>
      and(eq(rel.authorId, user.id), eq(rel.id, releaseResult.data.id)),
  });

  if (!releaseDBData) {
    return {
      success: false,
      message: "У пользователя не существует релиза с предоставленными данными",
    };
  }

  if (releaseDBData.labelName === standardLabelName) {
    releaseResult.data.labelName = standardLabelName;
  }

  const transactionResult = await db
    .transaction(async (tx) => {
      const client = createS3Client();

      const { id, ...otherReleaseData } = releaseResult.data;

      const updatedRelease = (
        await tx
          .update(release)
          .set(otherReleaseData)
          .where(eq(release.id, id))
          .returning({ id: release.id, preview: release.preview })
      ).pop();

      if (!updatedRelease) {
        throw new Error("Не удалось обновить данные релиза");
      }

      const releasePreview = releaseFiles.get("preview");

      if (!!updatedRelease.preview && !!releasePreview) {
        const releasePreviewResult =
          releasePreviewSchema.safeParse(releasePreview);

        if (!releasePreviewResult.success) {
          throw new Error(
            "Файл обложки релиза не прошёл автоматическую проверку",
            { cause: releasePreviewResult.error }
          );
        }

        await uploadFile({
          bucket: "previews",
          name: `${updatedRelease.id}.${updatedRelease.preview}`,
          file: releasePreviewResult.data,
          client,
        }).catch((e) => {
          throw new Error("Не удалось обновить обложку релиза", { cause: e });
        });
      }

      return { success: true as const, data: updatedRelease };
    })
    .catch((e: Error) => {
      console.dir(
        { date: new Date(), error: e.cause, message: e.message },
        { depth: Infinity }
      );
      return {
        success: false as const,
        message: e.message,
      };
    });

  if (!transactionResult.success) {
    return transactionResult;
  }

  await revalidatePathAction(`/dashboard/release/${transactionResult.data.id}`);

  redirect(`/dashboard/release/${transactionResult.data.id}`);
}
