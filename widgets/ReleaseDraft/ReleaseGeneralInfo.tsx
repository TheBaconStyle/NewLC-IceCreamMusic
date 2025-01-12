"use client";

import MyInpFile from "@/shared/MyInpFile/MyInpFile";
import MyInput from "@/shared/MyInput/MyInput";
import MyRadio from "@/shared/MyRadio/MyRadio";
import MySelect from "@/shared/MySelect/MySelect";
import IMySelectProps from "@/shared/MySelect/MySelect.props";
import MyText from "@/shared/MyText/MyText";
import MyTitle from "@/shared/MyTitle/MyTitle";
import classNames from "classnames";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import style from "./Release.module.css";
import { allLanguages } from "@/helpers/allLanguages";
import { TReleaseForm } from "@/schema/release.schema";

export function ReleaseGeneralInfo() {
  const { register, setValue, watch, getValues } =
    useFormContext<TReleaseForm>();

  const [languageValue, setLanguageValue] = useState<IMySelectProps["value"]>(
    () => {
      const language = getValues("language");
      return allLanguages.find((l) => l.value === language);
    }
  );

  const preview = watch("preview");

  return (
    <>
      <div className={style.row}>
        <div className={classNames(style.wrap, style.w30)}>
          <MyTitle Tag={"h3"}>Обложка *</MyTitle>
          <MyInpFile
            onFileChange={(files) => {
              const file = files?.item(0);
              !!file && file !== null && setValue("preview", file);
            }}
            srcPrev={preview && URL.createObjectURL(preview)}
          />
          <MyText className={style.desc}>
            Минимальный размер изображения: 3000x3000px
            <br />
            Максимальный размер изображения: 6000x6000px
            <br />
            Максимальный размер файла: 30MB
          </MyText>
        </div>
        <div className={classNames(style.wrap, style.full)}>
          <div>
            <MyTitle Tag={"h2"}>Работа с релизом</MyTitle>
            <MyText className={style.desc}>
              Заполните общую информацю по релизу
            </MyText>
          </div>
          <MySelect
            label="Язык метаданных *"
            options={allLanguages}
            tooltip={{
              id: "languageMetadata",
              text: "Язык, на котором представленна основаная информация о релиизе",
            }}
            value={languageValue}
            onValueChange={(data) => {
              setValue("language", data.value);
              setLanguageValue(data);
            }}
          />
          <div className={style.row}>
            <MyInput
              className={style.inp}
              label={"Название релиза *"}
              type={"text"}
              placeholder="Введите название"
              inpLk
              tooltip={{
                id: "relizeNameData",
                text: "Наименовани на языках, использующиих кириллицу, не должны быть представленны на транслиите, если вы планируете отгрузку в Apple Music",
              }}
              {...register("title")}
            />
            <MyInput
              className={style.inp}
              label={"Подзаголовок"}
              type={"text"}
              placeholder="Введите подзаголовок"
              inpLk
              tooltip={{
                id: "relizeSubNameData",
                text: "Дополнительное название, например: Deluxe Edition, Remix, Acoustic Version. Если дополнительного названиия нет, оставьте поле пустым",
              }}
              {...register("subtitle")}
            />
          </div>
          <MyTitle Tag={"h3"}>Тип релиза *</MyTitle>
          <div className={style.topRelizes}>
            <MyRadio
              id="type1"
              label={"Single"}
              tooltip={{
                id: "Single",
                text: "Содержит от 1 до 3 треков, каждый продолжительностью менее 10 минут",
              }}
              value="single"
              {...register("type")}
            />
            <MyRadio
              id="type2"
              label={"EP"}
              tooltip={{
                id: "EP",
                text: "Содержит от 1 до 3 треков, каждый продолжительностью менее 10 минут. Общая продолжительность должна быть не более 30 минут. Также релиз может содержать от 4 до 6 треков общей продолжительностью не более 30 минут",
              }}
              value="ep"
              {...register("type")}
            />
            <MyRadio
              id="type3"
              label={"Album"}
              tooltip={{
                id: "Album",
                text: "Содержит 7 треков и/или более, общей продолжительностью более 30 минут",
              }}
              value="album"
              {...register("type")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
