"use client";

import { useFormContext } from "react-hook-form";
import { TTrackItem } from "./TrackItem.props";
import { TReleaseInsertForm } from "shared/schema/release.schema";
import MyTitle from "@/shared/MyTitle/MyTitle";
import MyText from "@/shared/MyText/MyText";
import MyInput from "@/shared/MyInput/MyInput";
import style from "./TrackItem.module.css";

export function TrackGeneralInfo({ trackIndex }: TTrackItem) {
  const { register } = useFormContext<TReleaseInsertForm>();

  return (
    <>
      <div className={style.infoItem}>
        <div className={style.desc}>
          <MyTitle Tag={"h3"}>Основная информация</MyTitle>
          <MyText className={style.subText}>
            Укажите название трека, для грамотного отображения на различных
            площадках
          </MyText>
        </div>
        <div className={style.row}>
          <MyInput
            {...register(`tracks.${trackIndex}.title`)}
            label={"Название трека * "}
            inpLk
            placeholder="Введите название трека"
            tooltip={{
              id: `trackName-${trackIndex}`,
              text: "Наименование на языках, использующих кириллицу, не должны быть представлены на транслите, если вы планируете отгрузку в Apple Music",
            }}
            type={"text"}
          />
          <MyInput
            {...register(`tracks.${trackIndex}.subtitle`)}
            label={"Подзаголовок"}
            inpLk
            tooltip={{
              id: `trackSubName-${trackIndex}`,
              text: "Дополнительное название, например: Deluxe Edition, Remix, Acoustic Version. Если дополнительного названия нет, оставьте поле пустым",
            }}
            placeholder="Введите подзаголовок"
            type={"text"}
          />
        </div>
      </div>
    </>
  );
}
