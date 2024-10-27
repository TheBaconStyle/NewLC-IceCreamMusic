import MyText from "@/shared/MyText/MyText";
import Image from "next/image";
import NotificationIcon from "../../public/InfoIcon/Notification.svg";
import style from "./Header.module.css";
import Link from "next/link";
import { Wallet } from "./Wallet/Wallet";
import ThemeToggle from "@/widgets/ThemeToggle/ThemeToggle";
import { cookies } from "next/headers";
import { getAuthSession } from "@/actions/auth";
import { db } from "@/db";

export type THeader = {
  userid: string;
  username: string;
  avatar: string | null;
};

async function Header({ avatar, username, userid }: THeader) {
  const theme = cookies().get("__theme__")?.value || "system";

  const session = await getAuthSession();

  const userBalance = await db.query.users.findFirst({
    where: (us, { eq }) => eq(us.id, session!.user!.id),
    columns: { balance: true },
  });

  return (
    <header className={style.header}>
      <div className={style.headerWrapper}>
        <div className={style.version}>BETA v1.1.2</div>
        <div className={style.header__info}>
          <ThemeToggle currentTheme={theme ?? "light"} />
          <Wallet balance={userBalance?.balance} />
          <button className={style.header__button}>
            <div className={style.header__wrapper_w_h}>
              <NotificationIcon className={style.header__icon} />
            </div>
          </button>

          <Link className={style.noStyle} href="/profile">
            <div className={style.header__wrapper_avatar}>
              <Image
                className={style.avatar}
                alt="Аватарка"
                src={
                  !!avatar
                    ? `${process.env.NEXT_PUBLIC_S3_URL}/avatars/${userid}.${avatar}`
                    : "/assets/avatar.jpg"
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
