"use client";

import { useFormContext } from "react-hook-form";
import { TTrackItem } from "./TrackItem.props";
import { TReleaseInsertForm } from "@/shared/model/schema/release.schema";
import style from "./TrackItem.module.css";
import MyCheckbox from "@/shared/ui/MyCheckbox/MyCheckbox";
import MyTitle from "@/shared/ui/MyTitle/MyTitle";
import MyText from "@/shared/ui/MyText/MyText";
import { useState } from "react";
import MyTextArea from "@/shared/ui/MyTextArea/MyTextArea";
import classNames from "classnames";

export function TrackText({ trackIndex }: TTrackItem) {
  const { setValue, watch } = useFormContext<TReleaseInsertForm>();

  const trackText = watch(`tracks.${trackIndex}.text`);

  const [addText, setAddText] = useState(() => !!trackText);

  return (
    <>
      <MyCheckbox
        label="Добавить текст трека"
        checked={addText}
        className="w100"
        onChange={() => {
          if (addText) {
            // handleTrackChange({ text: null });
            setValue(`tracks.${trackIndex}.text`, null);
          }
          setAddText(!addText);
        }}
        name={`addText-${trackIndex}`}
      />

      {addText && (
        <>
          <MyTitle className={style.mt10} Tag={"h4"}>
            Текст трека
          </MyTitle>
          <MyText className={classNames(style.subText, style.mb10)}>
            Ознакомьтесь с рекомендациями по подготовке и загрузке этого типа
            контента.
          </MyText>
          <MyTextArea
            label={"Введите текст трека"}
            value={trackText ?? ""}
            onChange={(e) =>
              // handleTrackChange({ text: e.target.value })
              setValue(`tracks.${trackIndex}.text`, e.target.value)
            }
          />
        </>
      )}
    </>
  );
}
