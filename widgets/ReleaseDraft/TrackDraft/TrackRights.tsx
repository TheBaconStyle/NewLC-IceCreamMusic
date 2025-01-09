"use client";

import MyTitle from "@/shared/MyTitle/MyTitle";
import { TTrackItem } from "./TrackItem.props";
import MyText from "@/shared/MyText/MyText";
import MyInput from "@/shared/MyInput/MyInput";
import { useFormContext } from "react-hook-form";
import { TReleaseForm } from "@/schema/release.schema";
import style from "./TrackItem.module.css";

export function TrackRights({ trackIndex }: TTrackItem) {
  const { register } = useFormContext<TReleaseForm>();

  return (
    <>
      <div className={style.infoItem}>
        <div className={style.desc}>
          <MyTitle Tag={"h3"}>Права *</MyTitle>
          <MyText className={style.subText}>
            Укажите долю, если авторов несколько, укажите сумму долей
          </MyText>
          <MyText className={style.subText}>
            Авторское вознаграждение выплачивается в соответствии с указанной
            долей и условиям договора. 
          </MyText>
        </div>
        <div className={style.row}>
          <MyInput
            {...register(`tracks.${trackIndex}.author_rights`)}
            label={"Авторские права"}
            inpLk
            tooltip={{
              id: `avtorPrava-${trackIndex}`,
              text: "Укажите долю. Если авторов несколько укажите сумму долей",
            }}
            type="number"
            min={1}
            max={100}
            // value={track.author_rights}
            // onChange={(e) =>
            //   handleTrackChange({ author_rights: e.target.value })
            // }
          />
          <MyInput
            label={"Смежные права"}
            value={100.0}
            inpLk
            tooltip={{
              id: `avtorPrava-${trackIndex}`,
              text: "Релиз может быть доставлен на площадки только при наличии 100%",
            }}
            type={"text"}
          />
        </div>
      </div>
    </>
  );
}
