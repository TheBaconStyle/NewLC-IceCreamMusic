"use client";

import MyInput from "@/shared/MyInput/MyInput";
import MyText from "@/shared/MyText/MyText";
import MyTitle from "@/shared/MyTitle/MyTitle";
import { useFormContext } from "react-hook-form";
import { TTrackItem } from "./TrackItem.props";
import { TReleaseInsertForm } from "@/schema/release.schema";
import style from "./TrackItem.module.css";

export function TrackIdentification({ trackIndex }: TTrackItem) {
  const { register } = useFormContext<TReleaseInsertForm>();

  return (
    <>
      <div className={style.infoItem}>
        <div className={style.desc}>
          <MyTitle Tag={"h3"}>Идентификация</MyTitle>
          <MyText className={style.subText}>
            Укажите код, он необходим для точности в идентификации релиза на
            площадках и отчетности, если у вас нет ISRC, код будет сгенерирован
            автоматически
          </MyText>
        </div>
        <div className={style.row}>
          <MyInput
            {...register(`tracks.${trackIndex}.isrc`)}
            label={"ISRC"}
            inpLk
            placeholder="Введите ISRC"
            tooltip={{
              id: `trackName-${trackIndex}`,
              text: "Международный уникальный код. Его наличие упрощает управление правами, когда видео используется в разных форматах, каналах распространения или продуктах. Если у вас нет этого кода, мы присвоим его самостоятельно",
            }}
            type={"text"}
          />
          <MyInput
            {...register(`tracks.${trackIndex}.partner_code`)}
            label={"Код партнера"}
            inpLk
            tooltip={{
              id: `trackSubName-${trackIndex}`,
              text: "Ваш собственный код релиза. Укажите его для получения в финансовых отчетах",
            }}
            placeholder="Введите код партнера"
            type={"text"}
          />
        </div>
      </div>
    </>
  );
}
