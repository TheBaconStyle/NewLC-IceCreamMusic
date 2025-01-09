"use client";

import MyInput from "@/shared/MyInput/MyInput";
import MyText from "@/shared/MyText/MyText";
import MyTitle from "@/shared/MyTitle/MyTitle";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import style from "./Release.module.css";

export function ReleaseDates() {
  const { register } = useFormContext();

  return (
    <>
      <div className={style.wrap}>
        <div>
          <MyTitle Tag={"h2"}>Даты *</MyTitle>
          <MyText className={classNames(style.desc, style.mb20)}>
            Укажите основные даты для релиза
          </MyText>
        </div>
        <div className={style.row}>
          <MyInput
            className={style.inp}
            label={"Дата релиза"}
            type={"date"}
            placeholder="ДД.ММ.ГГГГ"
            inpLk
            tooltip={{
              id: "dateRelize",
              text: "Дата, когда релиз был впервые опубликован, независимо от того, был ли он выпущен в физическом или цифром формате",
            }}
            {...register("releaseDate")}
          />
          <MyInput
            className={style.inp}
            label={"Дата старта"}
            type={"date"}
            placeholder="ДД.ММ.ГГГГ"
            inpLk
            tooltip={{
              id: "dateStart",
              text: "Дата, когда ваш релиз должен стать доступным на площадках",
            }}
            {...register("startDate")}
          />
        </div>
        <div className={style.row}>
          <MyInput
            className={style.inp}
            label={"Дата предзаказа"}
            type={"date"}
            placeholder="ДД.ММ.ГГГГ"
            inpLk
            tooltip={{
              id: "datePreRelize",
              text: "Дата для предзаказа альбома на iTunes и Apple Music. Если релиз выпускается без предзаказа, укажите дату старта",
            }}
            {...register("preorderDate")}
          />
        </div>
      </div>
    </>
  );
}
