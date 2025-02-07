import Link from "next/link";
import style from "../Sidebar.module.css";
import MyText from "@/shared/ui/MyText/MyText";
import ControlPanelIcon from "../SidebarIcons/TheControlPanel.svg";
export default async function AdminSideBar() {
  return (
    <div className={style.section}>
      <MyText className={style.section__name}>Админ-Панель</MyText>
      <Link className={style.section__item} href="/admin/releases">
        <ControlPanelIcon className={style.section__icon} />
        Релизы
      </Link>
      <Link className={style.section__item} href="/admin/verifications">
        <ControlPanelIcon className={style.section__icon} />
        Верификация
      </Link>
      <Link className={style.section__item} href="/admin/wallet">
        <ControlPanelIcon className={style.section__icon} />
        Выплаты
      </Link>
    </div>
  );
}
