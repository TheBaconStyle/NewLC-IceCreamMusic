"use client";

import MyInput from "@/shared/ui/MyInput/MyInput";
import MyText from "@/shared/ui/MyText/MyText";
import MyTitle from "@/shared/ui/MyTitle/MyTitle";
import classNames from "classnames";
import { Controller, useFormContext } from "react-hook-form";
import style from "./Release.module.css";
import { TReleaseInsertForm } from "@/shared/model/schema/release.schema";
import { inputDateFormat } from "@/utils/dateFormatter";

export function ReleaseDates() {
  const { register, control } = useFormContext<TReleaseInsertForm>();

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
          <Controller
            control={control}
            name="releaseDate"
            render={({ field: { value, onChange, ...otherFieldData } }) => (
              <MyInput
                {...otherFieldData}
                value={value ? inputDateFormat(value) : value}
                onChange={(e) => onChange(new Date(e.target.value))}
                className={style.inp}
                label={"Дата релиза"}
                type={"date"}
                placeholder="ДД.ММ.ГГГГ"
                inpLk
                tooltip={{
                  id: "dateRelize",
                  text: "Дата, когда релиз был впервые опубликован, независимо от того, был ли он выпущен в физическом или цифром формате",
                }}
              />
            )}
          />
          <Controller
            control={control}
            name="startDate"
            render={({ field: { value, onChange, ...otherFieldData } }) => (
              <MyInput
                {...otherFieldData}
                value={value ? inputDateFormat(value) : value}
                onChange={(e) => onChange(new Date(e.target.value))}
                className={style.inp}
                label={"Дата релиза"}
                type={"date"}
                placeholder="ДД.ММ.ГГГГ"
                inpLk
                tooltip={{
                  id: "dateRelize",
                  text: "Дата, когда релиз был впервые опубликован, независимо от того, был ли он выпущен в физическом или цифром формате",
                }}
              />
            )}
          />
        </div>
        <div className={style.row}>
          <Controller
            control={control}
            name="preorderDate"
            render={({ field: { value, onChange, ...otherFieldData } }) => (
              <MyInput
                {...otherFieldData}
                value={value ? inputDateFormat(value) : value}
                onChange={(e) => onChange(new Date(e.target.value))}
                className={style.inp}
                label={"Дата предзаказа"}
                type={"date"}
                placeholder="ДД.ММ.ГГГГ"
                inpLk
                tooltip={{
                  id: "datePreRelize",
                  text: "Дата для предзаказа альбома на iTunes и Apple Music. Если релиз выпускается без предзаказа, укажите дату старта",
                }}
              />
            )}
          />
        </div>
      </div>
    </>
  );
}
