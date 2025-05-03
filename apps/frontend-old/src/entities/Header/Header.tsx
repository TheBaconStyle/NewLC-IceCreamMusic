import { getAuthSession } from "@/actions/auth";
import { db } from "db";
import { Error } from "@/entities/Error";
import MyText from "@/shared/MyText/MyText";
import ThemeToggle from "@/widgets/ThemeToggle/ThemeToggle";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import style from "./Header.module.css";
import { Wallet } from "./Wallet/Wallet";

export type THeader = {
  userid: string;
  username: string;
  avatar: string | null;
};

async function Header({ avatar, username, userid }: THeader) {
  const theme = cookies().get("__theme__")?.value || "system";

  const session = await getAuthSession();

  if (!session) {
    return <Error statusCode={401} />;
  }

  const userBalance = await db.query.users.findFirst({
    where: (us, { eq }) => eq(us.id, session.id),
    columns: { balance: true },
  });

  return (
    <header className={style.header}>
      <div className={style.headerWrapper}>
        <div className={style.version}>BETA v 1.3.4</div>
        <div className={"center gap10"}>
          <ThemeToggle currentTheme={theme ?? "light"} />
          <Wallet balance={userBalance?.balance} />
          <Link className={"a"} href="/profile">
            <div className={"center gap10 styleValue bold"}>
              <Image
                className={style.avatar}
                alt="Аватарка"
                src={
                  !!avatar
                    ? `${process.env.NEXT_PUBLIC_S3_URL}/avatars/${userid}.${avatar}`
                    : "/assets/noAvatar.png"
                }
                height={40}
                width={40}
                unoptimized
              />
              <MyText>{username}</MyText>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
export default Header;
