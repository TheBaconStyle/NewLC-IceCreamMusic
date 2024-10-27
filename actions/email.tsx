// "use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { createSMTPClient } from "@/utils/createSMTPClient";
import { render } from "@react-email/render";
import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";
import { sealData } from "iron-session";
import SignUpConfirm from "../emails/SignUpConfirm";
import { getFullUrl } from "./url";
import PasswordRecovery from "@/emails/PasswordRecover";
import { Transporter } from "nodemailer";

export async function sendSignUpConfirmEmail(
  email: string,
  id: string,
  transport: Transporter
) {
  const verificationToken = randomBytes(16).toString("hex");

  await db.update(users).set({ verificationToken }).where(eq(users.id, id));

  const magicLinkToken = await sealData(
    { id, token: verificationToken },
    { password: process.env.MAGIC_LINK_SECRET! }
  );

  const url = new URL(await getFullUrl());

  const { href, pathname } = url;

  const domain = href.replace(pathname, "");

  const magicLink = `${domain}/confirm/${encodeURI(magicLinkToken)}`;

  const htmlEmail = await render(<SignUpConfirm link={magicLink} />);

  await transport.sendMail({
    from: "info@icecreammusic.net",
    to: email,
    subject: "Подтверждение регистрации аккаунта",
    html: htmlEmail,
  });
}

export async function sendResetPasswordEmail(email: string) {
  const resetPasswordToken = randomBytes(16).toString("hex");

  const user = (
    await db
      .update(users)
      .set({ resetPasswordToken })
      .where(eq(users.email, email))
      .returning({ id: users.id })
  ).pop();

  if (!user) throw new Error("Нет учетной записи с данным адресом эл. почты.");

  const magicLinkToken = await sealData(
    { token: resetPasswordToken },
    { password: process.env.MAGIC_LINK_SECRET!, ttl: 60 * 10 }
  );

  const url = new URL(await getFullUrl());

  const { href, pathname } = url;

  const domain = href.replace(pathname, "");

  const magicLink = `${domain}/reset/${encodeURI(magicLinkToken)}`;

  const htmlEmail = await render(<PasswordRecovery link={magicLink} />);

  const smtpTransport = await createSMTPClient();

  await smtpTransport.sendMail({
    from: "info@icecreammusic.net",
    to: email,
    subject: "Восстановление пароля к аккаунту",
    html: htmlEmail,
  });
}
