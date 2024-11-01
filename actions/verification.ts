"use server";

import { db } from "@/db";
import { verification } from "@/db/schema";
import {
  TVerificationFormSchema,
  serverVerificationSchema,
} from "@/schema/verification.schema";
import { getAuthSession } from "./auth";
import { isAdminUser } from "./users";
import { eq } from "drizzle-orm";

export async function verifyData(data: TVerificationFormSchema) {
  const session = await getAuthSession();

  if (!session) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const verificationData = await db.query.verification.findFirst({
    where: (ver, { eq, and }) =>
      and(eq(ver.userId, session.id), eq(ver.status, "approved")),
  });

  if (!!verificationData) {
    return { success: false, message: "Пользователь уже был верифицирован" };
  }

  const res = await serverVerificationSchema.parseAsync(data).catch(() => null);

  if (res) {
    const isSuccess = await db
      .insert(verification)
      .values({
        ...res,
        userId: session.id,
      })
      .catch(() => false)
      .then(() => true);

    return {
      success: isSuccess,
      message: isSuccess
        ? "Открыт запрос на верификацию"
        : "Не получается открыть запрос на вериифкацию",
    };
  }

  return {
    success: false,
    message: "Проверьте заполнение полей",
  };
}

export async function approveVerification(id: string) {
  const isAdmin = await isAdminUser();

  if (!isAdmin) {
    return { success: false, message: "Unauthorized" };
  }

  const isSuccess = await db
    .update(verification)
    .set({ status: "approved" })
    .where(eq(verification.id, id))
    .then(() => true)
    .catch(() => false);

  if (!isSuccess) {
    return { success: false, message: "Что-то пошло не так" };
  }

  return { success: true };
}

export async function rejectVerification(id: string) {
  const isAdmin = await isAdminUser();

  if (!isAdmin) {
    return { success: false, message: "Unauthorized" };
  }

  const isSuccess = await db
    .update(verification)
    .set({ status: "rejected" })
    .where(eq(verification.id, id))
    .then(() => true)
    .catch(() => false);

  if (!isSuccess) {
    return { success: false, message: "Что-то пошло не так" };
  }

  return { success: true };
}
