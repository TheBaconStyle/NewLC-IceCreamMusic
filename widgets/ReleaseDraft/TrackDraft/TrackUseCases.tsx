import { allLanguages } from "@/helpers/allLanguages";
import { TReleaseForm } from "@/schema/release.schema";
import MySelect from "@/shared/MySelect/MySelect";
import IMySelectProps from "@/shared/MySelect/MySelect.props";
import MyText from "@/shared/MyText/MyText";
import MyTitle from "@/shared/MyTitle/MyTitle";
import classNames from "classnames";
import { PropsWithChildren, useState } from "react";
import { useFormContext } from "react-hook-form";
import style from "./TrackItem.module.css";
import { TTrackItem } from "./TrackItem.props";

export function TrackUseCases({
  trackIndex,
  children,
}: PropsWithChildren<TTrackItem>) {
  const { setValue } = useFormContext<TReleaseForm>();

  const [language, setLanguage] = useState<IMySelectProps["value"]>();

  return (
    <div className={style.infoItem}>
      <div className={classNames(style.desc, style.mt30)}>
        <MyTitle Tag={"h3"}>Виды использования</MyTitle>
        <MyText className={style.subText}>
          Укажите дополнительные виды использования для трека
        </MyText>
        <MyTitle className={style.mt10} Tag={"h4"}>
          Язык трека *
        </MyTitle>
        <MyText className={classNames(style.subText, style.mb10)}>
          Укажите язык, на котором исполняется трек, если трек без вокальной
          партии в списке выберите «Без слов»
        </MyText>
        <MySelect
          label={"Язык трека"}
          value={language}
          onValueChange={(newLang) => {
            // handleTrackChange({ language: newLang.value });
            setValue(`tracks.${trackIndex}.language`, newLang.value);
            setLanguage(newLang);
          }}
          options={[{ value: "Без слов", label: "Без слов" }, ...allLanguages]}
        />
        {children}
      </div>
    </div>
  );
}
