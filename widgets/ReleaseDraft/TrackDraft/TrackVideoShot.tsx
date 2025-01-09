"use client";

import MyCheckbox from "@/shared/MyCheckbox/MyCheckbox";
import MyFile from "@/shared/MyFile/MyFile";
import MyText from "@/shared/MyText/MyText";
import MyTitle from "@/shared/MyTitle/MyTitle";
import { TTrackItem } from "./TrackItem.props";
import { useFormContext } from "react-hook-form";
import { TReleaseForm } from "@/schema/release.schema";
import classNames from "classnames";
import { useState } from "react";
import style from "./TrackItem.module.css";

export function TrackVideoShot({ trackIndex }: TTrackItem) {
  const { setValue } = useFormContext<TReleaseForm>();

  const [addVideoShot, setAddVideoShot] = useState(false);

  return (
    <>
      <MyCheckbox
        label="Добавить видео-шот"
        checked={addVideoShot}
        className="w100"
        onChange={() => {
          console.log("qweqweqwe");
          if (addVideoShot) {
            // handleTrackChange({ video_shot: undefined });
            setValue(`tracks.${trackIndex}.video_shot`, undefined);
          }
          setAddVideoShot(!addVideoShot);
        }}
        name={`addVideoShot-${trackIndex}`}
      />
      {addVideoShot && (
        <>
          <MyTitle className={style.mt10} Tag={"h4"}>
            Загрузка видео-шота
          </MyTitle>
          <MyText className={classNames(style.subText, style.mb10)}>
            Формат: .mov, .mp4, .avi
            <br />
            Максимальный размер: не более 6 ГБ
          </MyText>
          <MyFile
            onChange={(e) =>
              // handleTrackChange({
              //   video_shot: Array.from(e.target.files ?? []).at(0),
              // })
              setValue(
                `tracks.${trackIndex}.video_shot`,
                Array.from(e.target.files ?? []).at(0)
              )
            }
          />
        </>
      )}
    </>
  );
}
