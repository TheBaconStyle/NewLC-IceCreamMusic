"use client";

import { TReleaseInsertForm } from "@/schema/release.schema";
import MyCheckbox from "@/shared/MyCheckbox/MyCheckbox";
import MyFile from "@/shared/MyFile/MyFile";
import MyText from "@/shared/MyText/MyText";
import MyTitle from "@/shared/MyTitle/MyTitle";
import classNames from "classnames";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import style from "./TrackItem.module.css";
import { TTrackItem } from "./TrackItem.props";

export function TrackVideo({ trackIndex }: TTrackItem) {
  const { setValue, getValues, watch } = useFormContext<TReleaseInsertForm>();

  const videoFile = watch(`tracks.${trackIndex}.video`);

  const [addVideo, setAddVideo] = useState(
    () => !!getValues(`tracks.${trackIndex}.video`)
  );

  return (
    <>
      <MyCheckbox
        label="Добавить видео к треку"
        className="w100"
        checked={addVideo}
        onChange={() => {
          if (addVideo) {
            setValue(`tracks.${trackIndex}.video`, undefined);
          }
          setAddVideo(!addVideo);
        }}
        name={`addVideo-${trackIndex}`}
      />
      {addVideo && (
        <>
          <MyTitle className={style.mt10} Tag={"h4"}>
            Загрузка видео
          </MyTitle>
          <MyText className={classNames(style.subText, style.mb10)}>
            Формат: .mov, .mp4, .avi
            <br />
            Максимальный размер: не более 6 ГБ
          </MyText>
          <MyFile
            files={videoFile ? [videoFile] : undefined}
            onChange={(e) =>
              setValue(
                `tracks.${trackIndex}.video`,
                Array.from(e.target.files ?? []).at(0)
              )
            }
          />
        </>
      )}
    </>
  );
}
