"use server";

import { sendResetPasswordEmail } from "@/actions/email";
import {
  defaultAuthRedirect,
  sessionCookieName,
  sessionCookieOptions,
} from "@/config/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import {
  signInClientSchema,
  TSignInClientSchema,
} from "@/schema/signin.schema";
import { authUserSchema } from "@/schema/user.schema";
import { hashPassword } from "@/utils/hashPassword";
import { signJWT, verifyJWT } from "@/utils/token";
import { compare } from "bcrypt-ts";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function credentialsSignIn(credentials: TSignInClientSchema) {
  const validationResult = signInClientSchema
    .parseAsync(credentials)
    .catch(() => null);

  if (!validationResult) {
    throw new Error("Неверные данные для входа");
  }

  const { email, password, rememberMe } = credentials;

  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.email, email),
  });

  if (!user || !!!user.emailVerified) {
    throw new Error("Неверные данные для входа");
  }

  const passwordVerified = await compare(password, user.password);

  if (!passwordVerified) {
    throw new Error("Неверные данные для входа");
  }

  const cookiesStore = cookies();

  const preparedUserData = authUserSchema.parse(user);

  let expirationTime = "1 day";
  let expNumber = 24 * 60 * 60;

  if (rememberMe) {
    expirationTime = "30 days";
    expNumber = expNumber * 30;
  }

  const encryptedToken = await signJWT(preparedUserData, {
    exp: expirationTime,
  });

  cookiesStore.set(sessionCookieName, encryptedToken, {
    ...sessionCookieOptions,
    maxAge: expNumber,
  });

  redirect(defaultAuthRedirect);
}

export async function signOutAction() {
  const cookiesStore = cookies();

  cookiesStore.delete(sessionCookieName);

  redirect("/signin");
}

export async function getAuthSession() {
  const cookieStore = cookies();

  const encryptedToken = cookieStore.get(sessionCookieName);

  if (!encryptedToken) {
    return null;
  }

  const sessionData = await verifyJWT(encryptedToken.value).catch(() => null);

  if (!sessionData) {
    return null;
  }

  return sessionData;
}

export async function recoverPassword(email: string) {
  const matchedUser = await db.query.users.findFirst({
    where: (us, { eq }) => eq(us.email, email),
  });

  if (!matchedUser) {
    return { success: false, message: "No user with this email" };
  }

  sendResetPasswordEmail(matchedUser.email);

  return redirect("/recover/complete");
}

export async function resetPassword(newPassword: string, token: string) {
  const hashedPassword = await hashPassword(newPassword);

  await db
    .update(users)
    .set({ password: hashedPassword, resetPasswordToken: null })
    .where(eq(users.resetPasswordToken, token));

  return redirect("/reset/complete");
}
