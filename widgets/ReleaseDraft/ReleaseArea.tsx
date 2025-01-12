"use client";

import { allCountry } from "@/helpers/allCountry";
import { TReleaseForm } from "@/schema/release.schema";
import MyCheckbox from "@/shared/MyCheckbox/MyCheckbox";
import MyRadio from "@/shared/MyRadio/MyRadio";
import MyText from "@/shared/MyText/MyText";
import MyTitle from "@/shared/MyTitle/MyTitle";
import classNames from "classnames";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import style from "./Release.module.css";

export function ReleaseArea() {
  const { watch, setValue, register } = useFormContext<TReleaseForm>();

  const areas = watch("area");

  const [showAreasLands, setShowAreasLands] = useState(() => {
    return (
      (areas &&
        !areas.negate &&
        !areas.data.includes("all") &&
        !areas.data.includes("sng")) ||
      (areas && areas.negate && !areas.data.includes("all"))
    );
  });

  return (
    <>
      <div className={style.wrap}>
        <div>
          <MyTitle Tag={"h2"}>Территории *</MyTitle>
          <MyText className={classNames(style.desc, style.mb20)}>
            Укажите территории распространения для релиза
          </MyText>
        </div>
        <div className={style.col}>
          <MyRadio
            label={"Во всех странах"}
            name={"areaLand"}
            onChange={() => {
              setShowAreasLands(false);
              setValue("area", { negate: false, data: ["all"] });
            }}
            checked={areas && areas.data.includes("all") && !areas.negate}
          />
          <MyRadio
            label={"Только в определенных странах"}
            onChange={() => {
              setShowAreasLands(true);
              setValue("area", { negate: false, data: [] });
            }}
            name={"areaLand"}
            checked={
              areas &&
              !areas.negate &&
              !areas.data.includes("all") &&
              !areas.data.includes("sng")
            }
          />
          <MyRadio
            label={"Во всех кроме"}
            onChange={() => {
              setShowAreasLands(true);
              setValue("area", { negate: true, data: [] });
            }}
            name={"areaLand"}
            checked={areas && areas.negate && !areas.data.includes("all")}
          />
          <MyRadio
            label={"В СНГ"}
            name={"areaLand"}
            onChange={() => {
              setShowAreasLands(false);
              setValue("area", { negate: false, data: ["sng"] });
            }}
            checked={areas && !areas.negate && areas.data.includes("sng")}
          />
        </div>
      </div>

      {showAreasLands && (
        <div className={style.wrap}>
          <div>
            <MyTitle Tag={"h2"}>Список площадок с которыми мы работаем</MyTitle>
            <MyText className={classNames(style.desc, style.mb20)}>
              Выберте из списка те площадки, на которых будет распространяться
              релиз
            </MyText>
          </div>
          <div className={style.areaShop}>
            {allCountry.map((a) => (
              <MyCheckbox
                className={style.areaLandCheckbox}
                key={a.value}
                label={a.label}
                name={a.label}
                checked={areas && areas.data && areas.data.includes(a.value)}
                onChange={(e: any) => {
                  if (!areas.data) {
                    setValue("area", {
                      data: [a.value],
                      negate: areas.negate,
                    });
                    return;
                  }

                  const areas_set = new Set(areas.data);

                  if (e.target.checked) {
                    areas_set.add(a.value);
                  } else {
                    areas_set.delete(a.value);
                  }

                  setValue("area", {
                    negate: areas.negate,
                    data: Array.from(areas_set),
                  });
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
