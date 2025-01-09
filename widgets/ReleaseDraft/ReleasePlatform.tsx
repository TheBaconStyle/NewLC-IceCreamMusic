"use client";

import { allAreasMusic } from "@/helpers/allAreasMusic";
import { TReleaseForm } from "@/schema/release.schema";
import MyCheckbox from "@/shared/MyCheckbox/MyCheckbox";
import MyRadio from "@/shared/MyRadio/MyRadio";
import MyText from "@/shared/MyText/MyText";
import MyTitle from "@/shared/MyTitle/MyTitle";
import classNames from "classnames";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import style from "./Release.module.css";

export function ReleasePlatforms() {
  const [showPlatforms, setShowPlatforms] = useState(false);

  const { watch, setValue } = useFormContext<TReleaseForm>();

  const platforms = watch("platforms");

  return (
    <>
      <div className={style.wrap}>
        <div>
          <MyTitle Tag={"h2"}>Площадки *</MyTitle>
          <MyText className={classNames(style.desc, style.mb20)}>
            Укажите основные площадки для релиза
          </MyText>
        </div>
        <div className={style.col}>
          <MyRadio
            label={"На всех площадках"}
            onChange={() => {
              setShowPlatforms(false);
              setValue("platforms", ["all"]);
            }}
            name={"areaShop"}
          />
          <MyRadio
            label={"Только на некоторых"}
            onChange={() => {
              setShowPlatforms(true);
              setValue("platforms", []);
            }}
            name={"areaShop"}
          />
        </div>
      </div>

      {showPlatforms && (
        <div className={style.wrap}>
          <div>
            <MyTitle Tag={"h2"}>Список площадок с которыми мы работаем</MyTitle>
            <MyText className={classNames(style.desc, style.mb20)}>
              Выберте из списка те площадки, на которых будет распространяться
              релиз
            </MyText>
          </div>
          <div className={style.areaShop}>
            {allAreasMusic.map((p) => (
              <MyCheckbox
                className={style.areaShopCheckbox}
                key={p.value}
                label={p.label}
                name={p.label}
                checked={platforms.includes(p.value)}
                onChange={(e: any) => {
                  if (!platforms) {
                    setValue("platforms", [p.value]);
                    return;
                  }

                  const platforms_set = new Set(platforms as string[]);

                  if (e.target.checked) {
                    platforms_set.add(p.value);
                  } else {
                    platforms_set.delete(p.value);
                  }

                  setValue("platforms", Array.from(platforms_set));
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
