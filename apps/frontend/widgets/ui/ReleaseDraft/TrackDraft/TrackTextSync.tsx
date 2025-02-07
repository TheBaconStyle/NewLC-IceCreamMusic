"use client";

import { TReleaseInsertForm } from "@/shared/model/schema/release.schema";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { TTrackItem } from "./TrackItem.props";
import MyCheckbox from "@/shared/ui/MyCheckbox/MyCheckbox";
import MyTitle from "@/shared/ui/MyTitle/MyTitle";
import MyText from "@/shared/ui/MyText/MyText";
import MyFile from "@/shared/ui/MyFile/MyFile";
import classNames from "classnames";
import style from "./TrackItem.module.css";

export function TrackTextSync({ trackIndex }: TTrackItem) {
  const { setValue, getValues, watch } = useFormContext<TReleaseInsertForm>();

  const textSyncFile = watch(`tracks.${trackIndex}.text_sync`);

  const [addTextSync, setAddTextSync] = useState(
    () => !!getValues(`tracks.${trackIndex}.text_sync`)
  );

  return (
    <>
      <MyCheckbox
        label="Добавить синхронизацию теста"
        className="w100"
        checked={addTextSync}
        onChange={() => {
          if (addTextSync) {
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
            files={textSyncFile ? [textSyncFile] : undefined}
            onChange={(e) =>
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
