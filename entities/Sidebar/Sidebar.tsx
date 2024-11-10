"use client";
import MyText from "@/shared/MyText/MyText";
import classNames from "classnames";
import Link from "next/link";
import style from "./Sidebar.module.css";
import SidebarHeader from "./SidebarHeader/SidebarHeader";
import AnalyticIcon from "./SidebarIcons/Analytic.svg";
import BitMarketIcon from "./SidebarIcons/BitMarket.svg";
import ChatIcon from "./SidebarIcons/Chat.svg";

import ExitIcon from "./SidebarIcons/Exit.svg";
import LightningIcon from "./SidebarIcons/Lightning.svg";
import MasspostingIcon from "./SidebarIcons/Massposting.svg";
import PromotionIcon from "./SidebarIcons/Promotion.svg";
import QueryIcon from "./SidebarIcons/Query.svg";
import SuccessIcon from "./SidebarIcons/Success.svg";
import ControlPanelIcon from "./SidebarIcons/TheControlPanel.svg";
import UserIcon from "./SidebarIcons/User.svg";
import { signOutAction } from "@/actions/auth";
import { enqueueSnackbar } from "notistack";
import AdminSideBar from "./AdminSideBar/AdminSideBar";

const Sidebar = ({ isAdmin }: { isAdmin: boolean }) => {
  return (
    <aside className={style.sidebar}>
      <SidebarHeader />
      <div className={style.menu}>
        {isAdmin && <AdminSideBar />}
        {/* {!isAdmin && ( */}
        <>
          <div className={style.section}>
            <MyText className={style.section__name}>ОСНОВНОЕ</MyText>
            <Link className={style.section__item} href="/dashboard/news">
              <ControlPanelIcon className={style.section__icon} />
              Новости
            </Link>
            <Link className={style.section__item} href="/dashboard">
              <ControlPanelIcon className={style.section__icon} />
              Мои релизы
            </Link>
            <Link className={style.section__item} href="/dashboard/catalog">
              <ControlPanelIcon className={style.section__icon} />
              Новый релиз
            </Link>
            <Link
              className={classNames(style.section__item, style.inWork)}
              href={"#"}
            >
              <AnalyticIcon className={style.section__icon} />
              Аналитика
            </Link>
            {/* <Link className={style.section__item} href={"#"}>
            <WalletIcon className={style.section__icon} />
            Кошелек
          </Link> */}

            <Link className={style.section__item} href="/dashboard/faq">
              <QueryIcon className={style.section__icon} />
              FAQ
            </Link>
          </div>

          <div className={style.section}>
            <MyText className={style.section__name}>Маркетинг</MyText>
            <Link
              className={classNames(style.section__item, style.inWork)}
              href={"#"}
            >
              <MasspostingIcon className={style.section__icon} />
              Масспостинг
            </Link>
            <Link
              className={classNames(style.section__item, style.inWork)}
              href={"#"}
            >
              <BitMarketIcon className={style.section__icon} />
              Маркет битов
            </Link>
            <Link className={style.section__item} href={"/marketing/promotion"}>
              <PromotionIcon className={style.section__icon} />
              Продвижение
            </Link>
            {/* <Link className={style.section__item} href={"/marketing/charts"}>
            <LightningIcon className={style.section__icon} />
            Чарты
          </Link> */}
          </div>

          <div className={style.section}>
            <MyText className={style.section__name}>Инструменты</MyText>
            {/* <Link className={style.section__item} href={"#"}>
            <LinksIcon className={style.section__icon} />
            Смарт-ссылки
          </Link> */}
            {/* <Link className={style.section__item} href={"#"}>
            <StarsIcon className={style.section__icon} />
            Генератор
          </Link> */}
            <Link className={style.section__item} href={"/instruments/license"}>
              <SuccessIcon className={style.section__icon} />
              Верификация
            </Link>
            <Link
              className={style.section__item}
              href={"https://t.me/Ckeabrona"}
            >
              <ChatIcon className={style.section__icon} />
              Поддержка
            </Link>
          </div>

          <div className={style.section}>
            <MyText className={style.section__name}>Премиум</MyText>
            <Link className={style.section__item} href={"/premium/plans"}>
              <LightningIcon className={style.section__icon} />
              Тарифы
            </Link>
            {/* <Link className={style.section__item} href={"/premium/current"}>
            <LikeIcon className={style.section__icon} />
            Мои подписки
          </Link> */}
          </div>
        </>
        {/* )} */}
        <div className={classNames(style.section, style.bottom)}>
          <MyText className={style.section__name}>Учетная запись</MyText>
          <Link className={style.section__item} href={"/profile"}>
            <UserIcon className={style.user} />
            Профиль
          </Link>
          <button
            className={style.section__item}
            onClick={() =>
              signOutAction().then(() =>
                enqueueSnackbar({
                  variant: "success",
                  message: "Произведён выход из системы",
                })
              )
            }
          >
            <ExitIcon className={style.exit} />
            Выход
          </button>
        </div>
      </div>
    </aside>
  );
};
export default Sidebar;
