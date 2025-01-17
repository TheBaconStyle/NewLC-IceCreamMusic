"use client";

import { useFormContext } from "react-hook-form";
import { TTrackItem } from "./TrackItem.props";
import { TReleaseForm } from "@/schema/release.schema";
import style from "./TrackItem.module.css";
import MyCheckbox from "@/shared/MyCheckbox/MyCheckbox";
import MyTitle from "@/shared/MyTitle/MyTitle";
import MyText from "@/shared/MyText/MyText";
import { useState } from "react";
import MyTextArea from "@/shared/MyTextArea/MyTextArea";
import classNames from "classnames";

export function TrackText({ trackIndex }: TTrackItem) {
  const { setValue, watch } = useFormContext<TReleaseForm>();

  const value = watch(`tracks.${trackIndex}.text`);

  const [addText, setAddText] = useState(() => !!value);

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
            value={String(value ?? "")}
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
