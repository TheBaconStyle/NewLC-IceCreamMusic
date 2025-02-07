"use client";

import { allGenres } from "@/helpers/allGenres";
import MySelect from "@/shared/MySelect/MySelect";
import IMySelectProps from "@/shared/MySelect/MySelect.props";
import MyTitle from "@/shared/MyTitle/MyTitle";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import style from "./Release.module.css";

export function ReleaseGenre() {
  const { setValue, getValues } = useFormContext();

  const [genreValue, setGenreValue] = useState<IMySelectProps["value"]>(() => {
    const genre = getValues("genre");
    return allGenres.find((g) => g.value === genre);
  });

  return (
    <>
      <div className={style.wrap}>
        <div>
          <MyTitle Tag={"h2"}>Жанр *</MyTitle>
        </div>
        <MySelect
          label="Жанр"
          options={allGenres}
          tooltip={{
            id: "GenreData",
            text: "Основной жанр вашего релиза",
          }}
          value={genreValue}
          onValueChange={(data) => {
            setValue("genre", data.value);
            setGenreValue(data);
          }}
        />
      </div>
    </>
  );
}
