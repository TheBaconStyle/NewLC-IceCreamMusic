import classNames from "classnames";
import style from "./loading.module.css";
export default function Loading() {
  return (
    <div className={style.bg}>
      <div className={style.loading}>
        <div className={classNames(style.border3, style.border)}></div>
        <div className={classNames(style.border2, style.border)}></div>
        <div className={classNames(style.border1, style.border)}></div>
        Загрузка
      </div>
    </div>
  );
}
