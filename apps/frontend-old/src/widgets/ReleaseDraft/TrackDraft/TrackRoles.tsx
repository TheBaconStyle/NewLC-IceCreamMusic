"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { TTrackItem } from "./TrackItem.props";
import MyTitle from "@/shared/MyTitle/MyTitle";
import MyText from "@/shared/MyText/MyText";
import MyInput from "@/shared/MyInput/MyInput";
import MySelect from "@/shared/MySelect/MySelect";
import { allRoles } from "@/shared/helpers/allRoles";
import { TReleaseInsertForm } from "shared/schema/release.schema";
import style from "./TrackItem.module.css";

export function TrackRoles({ trackIndex }: TTrackItem) {
  const { control, register, setValue, watch } =
    useFormContext<TReleaseInsertForm>();

  const trackRoles = watch(`tracks.${trackIndex}.roles`);

  const {
    fields: roles,
    append: appendRole,
    remove: removeRole,
  } = useFieldArray({
    name: `tracks.${trackIndex}.roles`,
    control,
  });

  return (
    <>
      <div className={style.infoItem}>
        <div className={style.desc}>
          <MyTitle Tag={"h3"}>Персоны и роли</MyTitle>
          <MyText className={style.subText}>
            Для Авторов музыки и Авторов слов и Исполнителей необходимо указать
            фактические имена и фамилии, не указывайте псевдонимы артистов,
            групп или проектов.
          </MyText>
          <MyText className={style.subText}>
            <span style={{ color: "#fb4444" }}>
              Обязательно указать исполнителя, автора музыки и автора текста
            </span>
          </MyText>
        </div>
        {roles.map((role: any, roleIndex) => (
          <div key={role.id} className={style.row}>
            <MyInput
              {...register(`tracks.${trackIndex}.roles.${roleIndex}.person`)}
              label={`Персона ${roleIndex + 1}`}
              placeholder={
                trackRoles[roleIndex].role === "Исполнитель" ||
                trackRoles[roleIndex].role === "feat."
                  ? "Nickname"
                  : "ФИО персоны"
              }
              inpLk
              type={"text"}
            />
            <div className={style.w30}>
              <MySelect
                className={style.select}
                label={"Выберите роль"}
                options={allRoles}
                value={allRoles.find((r) => r.value === role.role)}
                onValueChange={({ value }) => {
                  // handleChangeRole(roleIndex, { role: value });
                  setValue(
                    `tracks.${trackIndex}.roles.${roleIndex}.role`,
                    value
                  );
                }}
              />
            </div>
            <div className={style.delete} onClick={() => removeRole(roleIndex)}>
              <div className={style.line1}></div>
              <div className={style.line2}></div>
            </div>
          </div>
        ))}
        <div
          className={style.btn}
          onClick={() => {
            // handleTrackChange({
            //   roles: [...track.roles, { person: "", role: "" }],
            // });
            appendRole({ person: "", role: "" });
          }}
        >
          Добавить персону
        </div>
      </div>
    </>
  );
}
