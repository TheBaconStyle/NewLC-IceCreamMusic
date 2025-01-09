"use client";

import { TReleaseForm } from "@/schema/release.schema";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { TTrackItem } from "./TrackItem.props";
import MyCheckbox from "@/shared/MyCheckbox/MyCheckbox";
import MyTitle from "@/shared/MyTitle/MyTitle";
import MyText from "@/shared/MyText/MyText";
import MyFile from "@/shared/MyFile/MyFile";
import classNames from "classnames";
import style from "./TrackItem.module.css";

export function TrackTextSync({ trackIndex }: TTrackItem) {
  const { setValue } = useFormContext<TReleaseForm>();

  const [addTextSync, setAddTextSync] = useState(false);

  return (
    <>
      <MyCheckbox
        label="Добавить синхронизацию теста"
        className="w100"
        checked={addTextSync}
        onChange={() => {
          if (addTextSync) {
            // handleTrackChange({ text_sync: undefined });
            setValue(`tracks.${trackIndex}.text_sync`, undefined);
          }
          setAddTextSync(!addTextSync);
        }}
        name={`addTextSync-${trackIndex}`}
      />
      {addTextSync && (
        <>
          <MyTitle className={style.mt10} Tag={"h4"}>
            Синхронизированный текст трека
          </MyTitle>
          <MyText className={classNames(style.subText, style.mb10)}>
            Получите дополнительный доход и ещё больше внимания на площадках.
            Формат: .ttml
          </MyText>
          <MyFile
            onChange={(e) =>
              // handleTrackChange({
              //   text_sync: Array.from(e.target.files ?? []).at(0),
              // })
              setValue(
                `tracks.${trackIndex}.text_sync`,
                Array.from(e.target.files ?? []).at(0)
              )
            }
          />
        </>
      )}
    </>
  );
}
