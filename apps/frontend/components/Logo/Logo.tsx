import Link from "next/link";
import style from "./Logo.module.css";
import classNames from "classnames";
import ILogo from "./Logo.props";

export const Logo = ({ className }: ILogo) => {
  return (
    <Link href={"/"}>
      <img
        className={classNames(className, style.logo)}
        alt="ICECREAMMUSIC логотип"
        src={"./site_assets/logo.png"}
        width={100}
        height={100}
      />
    </Link>
  );
};
