"use client";

import {
  TReleaseInsertForm,
  TReleaseUpdateForm,
} from "@/shared/model/schema/release.schema";
import MyFile from "@/shared/ui/MyFile/MyFile";
import MyText from "@/shared/ui/MyText/MyText";
import MyTitle from "@/shared/ui/MyTitle/MyTitle";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import style from "./TrackItem.module.css";
import { TTrackItem } from "./TrackItem.props";

export function TrackRingtone({ trackIndex }: TTrackItem) {
  const { setValue, watch } = useFormContext<
    TReleaseInsertForm | TReleaseUpdateForm
  >();

  const ringtone = watch(`tracks.${trackIndex}.ringtone`);
  const trackName = watch(`tracks.${trackIndex}.title`);

  const files: File[] = [];

  if (ringtone instanceof File) files.push(ringtone);

  return (
    <>
      <MyTitle className={style.mt10} Tag={"h4"}>
        Добавление рингтона
      </MyTitle>
      <MyText className={classNames(style.subText, style.mb10)}>
        Формат: .wav, .flac. <br />
        Длина: от 5 до 29.99 сек.
      </MyText>
      <MyFile
        fileName={
          !(ringtone instanceof File) ? `${trackName}.${ringtone}` : undefined
        }
        files={files}
        onChange={(e) =>
          setValue(
            `tracks.${trackIndex}.ringtone`,
            Array.from(e.target.files ?? []).at(0)
          )
        }
      />
    </>
  );
}
