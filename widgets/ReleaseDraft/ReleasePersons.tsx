"use client";

import MyInput from "@/shared/MyInput/MyInput";
import MyText from "@/shared/MyText/MyText";
import MyTitle from "@/shared/MyTitle/MyTitle";
import { useFieldArray, useFormContext } from "react-hook-form";
import style from "./Release.module.css";
import { TReleaseInsertForm } from "@/schema/release.schema";
import MySelect from "@/shared/MySelect/MySelect";
import { allRolesAlbum } from "@/helpers/allRolesAlbum";

export function ReleasePersons() {
  const { control, register, setValue, watch } =
    useFormContext<TReleaseInsertForm>();

  const {
    fields: roles,
    append: appendRole,
    remove: removeRole,
  } = useFieldArray({
    name: `roles`,
    control,
  });

  const rolesData = watch("roles");

  return (
    <>
      <div className={"wrap col gap30"}>
        <div>
          <MyTitle Tag={"h3"}>Персоны и роли</MyTitle>
          <div className="mt10">
            <MyText className={style.desc}>
              Для Авторов музыки и Авторов слов и Исполнителей необходимо
              указать фактические имена и фамилии, не указывайте псевдонимы
              артистов, групп или проектов.
            </MyText>
            <MyText className={style.desc}>
              <span style={{ color: "#fb4444" }}>
                Обязательно указать исполнителя, автора музыки и автора текста
              </span>
            </MyText>
          </div>
        </div>
        <div>
          {roles.map((role, roleIndex) => (
            <div key={role.id} className={"row"}>
              <MyInput
                {...register(`roles.${roleIndex}.person`)}
                label={`Персона ${roleIndex + 1}`}
                placeholder={
                  rolesData[roleIndex].role === "Исполнитель"
                    ? "ФИО исполнителя"
                    : "Nickname персоны"
                }
                inpLk
                type={"text"}
                className="mb0"
              />
              <div className={"w30"}>
                <MySelect
                  className={style.select}
                  label={"Выберите роль"}
                  options={allRolesAlbum}
                  value={allRolesAlbum.find(
                    (r) => r.value === rolesData[roleIndex].role
                  )}
                  onValueChange={({ value }) => {
                    // handleChangeRole(roleIndex, { role: value });
                    setValue(`roles.${roleIndex}.role`, value);
                  }}
                />
              </div>
              <div
                className={style.delete}
                onClick={() => removeRole(roleIndex)}
              >
                <div className={style.line1}></div>
                <div className={style.line2}></div>
              </div>
            </div>
          ))}
          <div
            className={"linkButton wfit"}
            onClick={() => {
              appendRole({ person: "", role: "" });
            }}
          >
            Добавить персону
          </div>
        </div>
      </div>
    </>
  );
}
