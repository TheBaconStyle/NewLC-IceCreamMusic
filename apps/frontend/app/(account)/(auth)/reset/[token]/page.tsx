import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unsealData } from "iron-session";
import { redirect } from "next/navigation";
import { ResetPasswordForm } from "@/widgets/ui/ResetPassword/ResetPassword";
import style from "./page.module.css";
const wrongUrl = "/reset/wrong";

export default async function ResetPasswordPage({
  params: { token },
}: {
  params: { token: string };
}) {
  const tokenData = await unsealData<Record<"token", string>>(token, {
    password: process.env.MAGIC_LINK_SECRET!,
    ttl: 60 * 10,
  }).catch(() => null);

  if (!tokenData) {
    redirect(wrongUrl);
  }

  const user = await db.query.users.findFirst({
    where: (us, { eq }) => eq(us.resetPasswordToken, tokenData.token),
  });

  if (!user) {
    redirect(wrongUrl);
  }

  return (
    <div className={style.form}>
      <div className={style.formContent}>
        <ResetPasswordForm token={tokenData.token} />
      </div>
    </div>
  );
}
