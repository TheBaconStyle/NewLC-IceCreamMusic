"use client";

import { TReleaseForm } from "@/schema/release.schema";
import MyCheckbox from "@/shared/MyCheckbox/MyCheckbox";
import MyInput from "@/shared/MyInput/MyInput";
import MyText from "@/shared/MyText/MyText";
import { useFormContext } from "react-hook-form";
import { TTrackItem } from "./TrackItem.props";
import { useState } from "react";
import MyTitle from "@/shared/MyTitle/MyTitle";
import style from "./TrackItem.module.css";

export function TrackAdditionalParameters({ trackIndex }: TTrackItem) {
  const { register, setValue } = useFormContext<TReleaseForm>();

  const [showInstantGratification, setShowInstantGratification] =
    useState(false);

  return (
    <>
      <div className={style.infoItem}>
        <div className={style.desc}>
          <MyTitle Tag={"h3"}>Дополнительные параметры</MyTitle>
          <MyText className={style.subText}>
            Укажите дополнительные параметры для трека
          </MyText>
        </div>

        <MyInput
          {...register(`tracks.${trackIndex}.preview_start`)}
          label={"Начало предпрослушивания (секунды)"}
          inpLk
          tooltip={{
            id: `startProsl-${trackIndex}`,
            text: "С выбранной секунды начинается воспроизведение фрагмента: который будет использован на сервисе VK Клипы, в качестве сниппета на VK музыка, проигрываться до покупки на ITunes, использоваться как сниппет на Apple Music и использоваться как официальный звук на TikTik, Likee",
          }}
          placeholder="20:00"
          type={"text"}
        />
        <MyCheckbox
          className={style.check}
          name={`InstantGratification-${trackIndex}`}
          label={"Instant Gratification"}
          tooltip={{
            id: "InstantGratification",
            text: "Дата, когда открывается возможность прослушать часть треков с альбома (до 50%). Указанная дата должна быть позже даты предзаказа, но не ранее даты старта на площадках. Поддерживают площадки: iTunes, Apple Music, Яндекс Музыка и YouTube Music",
          }}
          checked={showInstantGratification}
          onChange={() => {
            if (showInstantGratification) {
              // handleTrackChange({ instant_gratification: undefined });
              setValue(`tracks.${trackIndex}.instant_gratification`, undefined);
            }
            setShowInstantGratification(!showInstantGratification);
          }}
        />
        {showInstantGratification && (
          <MyInput
            {...register(`tracks.${trackIndex}.instant_gratification`)}
            className={style.mt30}
            label={"Выберите дату"}
            inpLk
            type={"date"}
          />
        )}
        <MyCheckbox
          {...register(`tracks.${trackIndex}.focus`)}
          // name={`Focus-track-${trackIndex}`}
          label={"Focus track"}
          // checked={!!track.focus}
          // onChange={() => {
          //   handleTrackChange({ focus: !!!track.focus });
          // }}
          tooltip={{
            id: "Focus track",
            text: "Простой способ выделить лучшее из лучшего. Отметьте трек, к которому хотите привлечь внимание слушателя. Поддерживает только VK Музыка",
          }}
        />
      </div>
    </>
  );
}
