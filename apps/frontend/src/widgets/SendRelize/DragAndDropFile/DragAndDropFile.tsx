"use client";

import {
  TReleaseInsertForm,
  TReleaseUpdateForm,
} from "shared/schema/release.schema";
import classNames from "classnames";
import { ChangeEvent, DragEvent, useState } from "react";
import { UseFieldArrayAppend, useFormContext } from "react-hook-form";
import MyText from "@/shared/MyText/MyText";
import style from "./DragAndDropFile.module.css";

export type TDragAndDropFile = {
  appendTrack: UseFieldArrayAppend<
    TReleaseInsertForm | TReleaseUpdateForm,
    "tracks"
  >;
};

const DragAndDropFile = ({ appendTrack }: TDragAndDropFile) => {
  const [drag, setDrag] = useState<boolean>(false);

  const [error, setError] = useState<boolean>(false);

  const { getValues } = useFormContext<
    TReleaseInsertForm | TReleaseUpdateForm
  >();

  const dragStartHandler = (e: DragEvent) => {
    e.preventDefault();
    setDrag(true);
  };

  const dragLeaveHandler = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
  };

  const handleAppendFiles = (newFiles: File[]) => {
    const tracks = getValues("tracks");

    const withoutErrors = newFiles.every((track) => {
      const typeTrack = track.type.split("/")[1];
      return (
        (typeTrack == "wav" || typeTrack == "flac") &&
        !tracks
          .map((track) => track.track instanceof File && track.track.name)
          .filter(Boolean)
          .includes(track.name)
      );
    });

    if (withoutErrors) {
      newFiles.forEach((track) => {
        appendTrack({
          language: "",
          partner_code: "",
          preview_start: "",
          roles: [],
          subtitle: "",
          title: "",
          track: track,
          author_rights: "",
          trackId: "",
        });
      });
    } else {
      setError(true);
    }
  };

  const handleLoadFile = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);

    setDrag(false);

    let newFiles = Array.from(e.target.files ?? []);

    handleAppendFiles(newFiles);
  };

  const onDropHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    setError(false);

    setDrag(false);

    const newFiles = Array.from(e.dataTransfer?.files ?? []);

    handleAppendFiles(newFiles);
  };

  return (
    <div>
      <label htmlFor="file">
        <input
          className={style.none}
          accept=".wav,.flac"
          id="file"
          type="file"
          multiple
          onChange={(e) => handleLoadFile(e)}
        />
        {drag ? (
          <div
            className={classNames(style.dropArea, { [style.active]: drag })}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
          >
            <MyText>Отпустите файлы, чтобы загрузить их</MyText>
            <MyText className={style.sub}>Формат: .wav, .flac</MyText>
            <MyText className={style.sub}>Максимальный размер: 1Гб</MyText>
          </div>
        ) : (
          <div
            className={style.dropArea}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
          >
            <MyText>Перетащите файлы, чтобы загрузить их</MyText>
            <MyText className={style.sub}>Формат: .wav, .flac</MyText>
            <MyText className={style.sub}>Максимальный размер: 1Гб</MyText>
          </div>
        )}
      </label>
      {error && (
        <MyText className={style.error}>
          Ошибка: среди загруженных файлов, присутствуют некорректные форматы
        </MyText>
      )}
    </div>
  );
};
export default DragAndDropFile;
