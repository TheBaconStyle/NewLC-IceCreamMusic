"use client";

import { TReleaseInsertForm } from "@/schema/release.schema";
import MyCheckbox from "@/shared/MyCheckbox/MyCheckbox";
import MyInput from "@/shared/MyInput/MyInput";
import MyText from "@/shared/MyText/MyText";
import MyTitle from "@/shared/MyTitle/MyTitle";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import style from "./TrackItem.module.css";
import { TTrackItem } from "./TrackItem.props";
import { useIMask } from "react-imask";
import { mergeRefs } from "react-merge-refs";
import { inputDateFormat } from "@/shared/utils/dateFormatter";

export function TrackAdditionalParameters({ trackIndex }: TTrackItem) {
  const { register, setValue, getValues, control } =
    useFormContext<TReleaseInsertForm>();

  const { ref: maskedRef } = useIMask({
    mask: "XX:XX",
    definitions: {
      X: {
        mask: "0",
        placeholderChar: "0",
      },
    },
    lazy: false,
    autofix: true,
  });

  const [showInstantGratification, setShowInstantGratification] = useState(
    () => !!getValues(`tracks.${trackIndex}.instant_gratification`)
  );

  const previewRegister = register(`tracks.${trackIndex}.preview_start`);

  const previewRef = mergeRefs([maskedRef, previewRegister.ref]);

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
          {...previewRegister}
          ref={previewRef}
          label={"Начало предпрослушивания (секунды)"}
          inpLk
          tooltip={{
            id: `startProsl-${trackIndex}`,
            text: "С выбранной секунды начинается воспроизведение фрагмента: который будет использован на сервисе VK Клипы, в качестве сниппета на VK музыка, проигрываться до покупки на ITunes, использоваться как сниппет на Apple Music и использоваться как официальный звук на TikTik, Likee",
          }}
          // placeholder="20:00"
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
              setValue(`tracks.${trackIndex}.instant_gratification`, undefined);
            }
            setShowInstantGratification(!showInstantGratification);
          }}
        />
        {showInstantGratification && (
          <Controller
            control={control}
            name={`tracks.${trackIndex}.instant_gratification`}
            render={({ field: { value, onChange, ...otherFieldDAta } }) => (
              <MyInput
                {...otherFieldDAta}
                value={!!value ? inputDateFormat(value) : undefined}
                onChange={(e) => onChange(new Date(e.target.value))}
                className={style.mt30}
                label={"Выберите дату"}
                inpLk
                type={"date"}
              />
            )}
          />
        )}
        <MyCheckbox
          {...register(`tracks.${trackIndex}.focus`)}
          label={"Focus track"}
          tooltip={{
            id: "Focus track",
            text: "Простой способ выделить лучшее из лучшего. Отметьте трек, к которому хотите привлечь внимание слушателя. Поддерживает только VK Музыка",
          }}
        />
      </div>
    </>
  );
}
