"use client";

import MyInput from "@/shared/MyInput/MyInput";
import MyText from "@/shared/MyText/MyText";
import MyTitle from "@/shared/MyTitle/MyTitle";
import { useFormContext } from "react-hook-form";
import style from "./Release.module.css";

export function ReleasePersons() {
  const { register } = useFormContext();

  return (
    <>
      <div className={style.wrap}>
        <div className={style.wrap__title}>
          <MyTitle Tag={"h2"}>Персоны и роли</MyTitle>
          <MyText className={style.desc}>
            Для Исполнителей, Соисполнителей (feat.), Remixer необходимо указать
            псевдоним артиста, группы или проекта.{" "}
            <span style={{ color: "#fb4444" }}>
              В скобках ОБЯЗАТЕЛЬНО укажите ФИО.
            </span>
          </MyText>
        </div>
        <div className={style.row}>
          <MyInput
            className={style.inp}
            label={"Bведите исполнителя"}
            type={"text"}
            placeholder="Исполнитель"
            inpLk
            tooltip={{
              id: "ispolnitelName",
              text: "Введите исполнителей, через запятую",
            }}
            {...register("performer")}
          />
          <MyInput
            className={style.inp}
            label={"Bведите лиц со статусом feat"}
            type={"text"}
            placeholder="feat"
            inpLk
            tooltip={{
              id: "featName",
              text: "Bведите лиц со статусом feat, через запятую",
            }}
            {...register("feat")}
          />
          <MyInput
            className={style.inp}
            label={"Bведите лиц со статусом Remixer"}
            type={"text"}
            placeholder="Remixer"
            inpLk
            tooltip={{
              id: "RemixerName",
              text: "Bведите лиц со статусом Remixer, через запятую",
            }}
            {...register("remixer")}
          />
        </div>
      </div>
    </>
  );
}
