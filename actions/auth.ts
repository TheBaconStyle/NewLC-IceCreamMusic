"use server";

import { sendResetPasswordEmail } from "@/actions/email";
import {
  defaultAuthRedirect,
  sessionOptions,
  TSessionData,
} from "@/config/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import {
  signInClientSchema,
  TSignInClientSchema,
} from "@/schema/signin.schema";
import { authUserSchema } from "@/schema/user.schema";
import { hashPassword } from "@/utils/hashPassword";
import { compare } from "bcrypt-ts";
import { eq } from "drizzle-orm";
import { getIronSession } from "iron-session";
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

  const session = await getAuthSession();

  const preparedUserData = authUserSchema.parse(user);

  session.isLoggedIn = true;
  session.name = preparedUserData.name;
  session.avatar = preparedUserData.avatar;
  session.id = preparedUserData.id;

  if (rememberMe) {
    const oneMonthSeconds = 30 * sessionOptions.ttl!;
    session.updateConfig({ ...sessionOptions, ttl: oneMonthSeconds });
  }

  await session.save();

  redirect(defaultAuthRedirect);
}

export async function signOutAction() {
  const session = await getAuthSession();

  session.destroy();

  redirect("/signin");
}

export async function getAuthSession() {
  const cookiesStore = cookies();

  const session = await getIronSession<TSessionData>(
    cookiesStore,
    sessionOptions
  );

  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
  }

  return session;
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
