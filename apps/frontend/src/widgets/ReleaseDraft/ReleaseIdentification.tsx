"use client";

import MyInput from "@/shared/MyInput/MyInput";
import MyText from "@/shared/MyText/MyText";
import MyTitle from "@/shared/MyTitle/MyTitle";
import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import style from "./Release.module.css";

export function ReleaseIdentification() {
  const { register } = useFormContext();

  return (
    <>
      <div className={style.wrap}>
        <div>
          <MyTitle Tag={"h2"}>Идентификация</MyTitle>
          <MyText className={classNames(style.desc, style.mb20)}>
            Укажите код, он необходим для точности в идентификации релиза на
            площадках и отчетности, если у вас нет UPC, код будет сгенерирован
            автоматически
          </MyText>
        </div>

        <MyInput
          className={style.inp}
          label={"UPC"}
          type={"text"}
          placeholder="Введите UPC"
          inpLk
          tooltip={{
            id: "UPCName",
            text: "Универсальный код продукта. Он нужен для идентификации релизов на различных площадках и для последующей отчетности. Если у вас его нет, оставьте поле пустым, мы присвоим код самостоятельно.",
          }}
          {...register("upc")}
        />
      </div>
    </>
  );
}
