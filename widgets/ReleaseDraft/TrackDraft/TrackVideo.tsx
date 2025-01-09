"use client";

import { TReleaseForm } from "@/schema/release.schema";
import MyCheckbox from "@/shared/MyCheckbox/MyCheckbox";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { TTrackItem } from "./TrackItem.props";
import MyTitle from "@/shared/MyTitle/MyTitle";
import MyText from "@/shared/MyText/MyText";
import MyFile from "@/shared/MyFile/MyFile";
import style from "./TrackItem.module.css";
import classNames from "classnames";

export function TrackVideo({ trackIndex }: TTrackItem) {
  const { setValue } = useFormContext<TReleaseForm>();
  const [addVideo, setAddVideo] = useState(false);
  return (
    <>
      <MyCheckbox
        label="Добавить видео к треку"
        className="w100"
        checked={addVideo}
        onChange={() => {
          if (addVideo) {
            // handleTrackChange({ video: undefined });
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
            onChange={(e) =>
              // handleTrackChange({
              //   video: Array.from(e.target.files ?? []).at(0),
              // })
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
