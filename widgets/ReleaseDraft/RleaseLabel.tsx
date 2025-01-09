"use client";

import { labelCost, standardLabelName } from "@/helpers/priceList";
import MyCheckbox from "@/shared/MyCheckbox/MyCheckbox";
import MyInput from "@/shared/MyInput/MyInput";
import MyText from "@/shared/MyText/MyText";
import MyTitle from "@/shared/MyTitle/MyTitle";
import classNames from "classnames";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import style from "./Release.module.css";

export function ReleaseLabel() {
  const { register, setValue } = useFormContext();

  const [changeLabel, setChangeLabel] = useState(false);

  return (
    <>
      <div className={style.wrap}>
        <div>
          <MyTitle Tag={"h2"}>Название лейбла</MyTitle>
          <MyText className={classNames(style.desc, style.mb20)}>
            Укажите наименование лейбла, данная информация будет отображена на
            площадках.
          </MyText>
          <MyText className={classNames(style.desc, style.mb20)}>
            Стоимость изменения лейбла: без подписки: {labelCost.none}р, с
            подпиской уровня &quot;Стандарт&quot;: {labelCost.standard}р, с
            подпиской уровня &quot;Профессионал&quot;: {labelCost.professional}
            р, с подпиской уровня &quot;Энтерпрайз&quot;: {labelCost.enterprise}
            р
          </MyText>
          <MyCheckbox
            label={"Изменить лейбл"}
            name="label_change"
            onChange={() => {
              if (changeLabel) setValue("labelName", standardLabelName);
              setChangeLabel(!changeLabel);
            }}
            checked={changeLabel}
          />
        </div>

        <MyInput
          className={style.inp}
          label={"Лейбл"}
          type={"text"}
          placeholder="Введите название лейбла"
          inpLk
          disabled={!changeLabel}
          {...register("labelName")}
        />
      </div>
    </>
  );
}
