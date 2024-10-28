"use server";

import { createS3Client } from "@/config/s3";
import { db } from "@/db";
import { users } from "@/db/schema";
import { profileFormSchema, TProfileSchema } from "@/schema/profile.schema";
import { signUpSchema, TSignUpClientSchema } from "@/schema/signup.schema";
import { hashPassword } from "@/utils/hashPassword";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getAuthSession } from "./auth";
import { sendSignUpConfirmEmail } from "@/utils/email";
import { createSMTPClient } from "@/utils/createSMTPClient";

export async function registerUser(userData: TSignUpClientSchema) {
  const { email, name, password } = signUpSchema.parse(userData);

  const matchedUser = await db.query.users.findFirst({
    where: (us, { eq }) => eq(us.email, email),
  });

  if (matchedUser) {
    throw new Error(
      "Учетная запись с данным адресом эл. почты уже существует."
    );
  }

  const smtpTransport = await createSMTPClient().catch((e) => {
    console.log(e);
    return null;
  });

  if (!smtpTransport) throw new Error("Что-то пошло не так");

  const hashedPassword = await hashPassword(password);

  const newUser = (
    await db
      .insert(users)
      .values({ email, name, password: hashedPassword })
      .returning({ id: users.id })
  ).pop();

  if (!newUser) throw new Error("Что-то пошло не так");

  await sendSignUpConfirmEmail(email, newUser.id, smtpTransport);

  return redirect("/signup/complete");
}

export async function isAdminUser() {
  const session = await getAuthSession();

  if (!session.isLoggedIn) {
    return false;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.id),
  });

  if (!user) return false;

  return user.isAdmin;
}

export async function getUserSubscriptionLevel() {
  const session = await getAuthSession();

  if (!session.isLoggedIn) {
    return false;
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.id),
  });

  if (!user) return false;

  if (user.isSubscribed) return user.subscriptionLevel ?? false;

  return false;
}

export async function editProfile(profileData: FormData) {
  const session = await getAuthSession();

  if (!session.isLoggedIn) {
    return { success: false, message: "You need to log in first" };
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.id),
  });

  if (!user) return { success: false, message: "You need to log in first" };

  const profileObjectProto = await new Promise((res, rej) => {
    try {
      res({
        ...Object.fromEntries(profileData.entries()),
        avatar: profileData.get("avatar") ?? undefined,
      });
    } catch (e) {
      rej(null);
    }
  });

  const profileResult = profileFormSchema.safeParse(profileObjectProto);

  if (!profileResult.success) {
    return {
      success: false,
      message: JSON.stringify(profileResult.error),
    };
  }

  if (profileResult.data.avatar instanceof File) {
    const minioS3 = createS3Client();

    const avatarFile = profileResult.data.avatar;

    const avatarBytes = await avatarFile.arrayBuffer();

    const avatarType = avatarFile.type.split("/")[1];

    const fileName = `${user.id}.${avatarType}`;

    const isAvatarLoaded = await minioS3
      .putObject("avatars", fileName, Buffer.from(avatarBytes))
      .then(() => true)
      .catch((e) => console.error(e));

    if (!isAvatarLoaded) {
      return {
        success: false,
        message: "Can not upload avatar",
      };
    }

    profileResult.data.avatar = avatarType;
  }

  const newProfile: TProfileSchema = {
    ...profileResult.data,
    birthDate: !!profileResult.data.birthDate
      ? new Date(profileResult.data.birthDate)
      : undefined,
  };

  const dbResult = await db
    .update(users)
    .set(newProfile)
    .where(eq(users.id, user.id))
    .returning({
      id: users.id,
      avatar: users.avatar,
      name: users.name,
    })
    .catch((e) => {
      console.error(e);
      return null;
    });

  if (!!!dbResult || dbResult.length === 0) {
    return { success: false, message: "Something went wrong" };
  }

  const newUser = dbResult.at(0);

  session.id = newUser!.id;
  session.avatar = newUser!.avatar;
  session.name = newUser!.name;

  session.save();

  redirect("/profile");
}

export async function getUserBalance() {
  const session = await getAuthSession();

  if (!session.isLoggedIn) {
    return { success: false, message: "You need to log in first" };
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, session.id),
    columns: { balance: true },
  });

  if (!user) return { success: false, message: "You need to log in first" };

  return {
    success: true,
    balance: user.balance,
  };
}
