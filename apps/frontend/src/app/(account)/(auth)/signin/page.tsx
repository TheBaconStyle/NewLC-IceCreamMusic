import { oswald } from "@/fonts";
import MyText from "@/shared/ui/MyText/MyText";
import MyTitle from "@/shared/ui/MyTitle/MyTitle";
import Authorization from "@/widgets/ui/Auth/Auth";
import classNames from "classnames";
import Link from "next/link";
import style from "./page.module.css";

export default function Auth() {
  return (
    <div className={style.form}>
      <MyTitle Tag="h2" className={classNames(oswald.className, style.title)}>
        Авторизация
      </MyTitle>
      <MyText className={style.desc}>
        Вы должны быть авторизованы, чтобы получить доступ к сайту
      </MyText>
      <Authorization />
      <MyText className={style.linkReg}>
        Или{" "}
        <Link className={style.link} href="/signup">
          зарегистрируйте
        </Link>{" "}
        новый, если у Вас нет аккаунта
      </MyText>

      <MyText className={style.linkReg}>
        <Link className={style.link} href="/recover">
          Не помню пароль
        </Link>
      </MyText>
    </div>
  );
}
