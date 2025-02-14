"use client";

import MyTitle from "@/shared/MyTitle/MyTitle";
import { TTrackItem } from "./TrackItem.props";
import MyText from "@/shared/MyText/MyText";
import MyInput from "@/shared/MyInput/MyInput";
import { useFormContext } from "react-hook-form";
import { TReleaseInsertForm } from "shared/schema/release.schema";
import style from "./TrackItem.module.css";
import { mergeRefs } from "react-merge-refs";
import { useIMask } from "react-imask";

export function TrackRights({ trackIndex }: TTrackItem) {
  const { register } = useFormContext<TReleaseInsertForm>();

  const rightsRegister = register(`tracks.${trackIndex}.author_rights`);

  const { ref: maskedRef } = useIMask({
    mask: Number,
    min: 1,
    max: 100,
    autofix: true,
  });

  const rightsRef = mergeRefs([maskedRef, rightsRegister.ref]);

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
            {...rightsRegister}
            ref={rightsRef}
            label={"Авторские права"}
            inpLk
            tooltip={{
              id: `avtorPrava-${trackIndex}`,
              text: "Укажите долю. Если авторов несколько укажите сумму долей",
            }}
            type="text"
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
