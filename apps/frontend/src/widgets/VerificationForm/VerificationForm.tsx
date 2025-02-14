"use client";

// TODO Добавить пространство для отображения ошибок ввода данных

import MyButton from "@/shared/MyButton/MyButton";
import MyInput from "@/shared/MyInput/MyInput";
import MyText from "@/shared/MyText/MyText";
import MyTitle from "@/shared/MyTitle/MyTitle";
import { useForm } from "react-hook-form";
import style from "./VerificationForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TVerificationFormSchema,
  verificationFormSchema,
} from "shared/schema/verification.schema";
import { verifyData } from "@/actions/verification";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { useState } from "react";

const VerificationForm = () => {
  const { handleSubmit, register } = useForm<TVerificationFormSchema>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {},
    progressive: true,
  });

  const [isBlocked, setIsBlocked] = useState(false);

  const router = useRouter();

  return (
    <form
      className={"mb30"}
      onSubmit={handleSubmit(
        async (data) => {
          setIsBlocked(true);
          const res = await verifyData(data);
          enqueueSnackbar({
            variant: res.success ? "success" : "error",
            message: res.message,
          });
          setIsBlocked(false);
          if (res.success) {
            router.push("/dashboard");
          }
        },
        () => {
          enqueueSnackbar({
            variant: "error",
            message: "Проверьте ещё раз заполнение полей",
          });
        }
      )}
    >
      <div className={"mt30"}>
        <MyTitle Tag={"h4"} className={"styleValue fs20 mb10"}>
          Основная информация
        </MyTitle>
        <MyText className={style.section__desc}>
          Основные данные для создания драфта договора
        </MyText>
        <div className={style.section__inputs}>
          <MyInput
            {...register("lastName")}
            className={style.inp}
            inpLk={true}
            label={"Фамилия"}
            type={"text"}
            placeholder="Иванов"
          />
          <MyInput
            {...register("firstName")}
            className={style.inp}
            inpLk={true}
            label={"Имя"}
            type={"text"}
            placeholder="Иван"
          />
          <MyInput
            {...register("middleName")}
            className={style.inp}
            inpLk={true}
            label={"Отчество"}
            type={"text"}
            placeholder="Иванович"
          />
          <MyInput
            {...register("birthDate", {
              setValueAs(value) {
                return new Date(value);
              },
            })}
            className={style.inp}
            inpLk={true}
            label={"Дата рождения"}
            type={"date"}
          />
          <MyInput
            {...register("birthPlace")}
            className={style.inp}
            inpLk={true}
            label={"Место рождения"}
            type={"text"}
            placeholder="г.Москва"
          />
          <MyInput
            {...register("tel")}
            className={style.inp}
            inpLk={true}
            label={"Номер телефона"}
            type={"text"}
            placeholder="+7XXXXXXXXXX"
          />
        </div>
      </div>

      <div className={style.section}>
        <MyTitle Tag={"h4"} className={"styleValue fs20 mb10"}>
          Идентификационные данные
        </MyTitle>
        <MyText className={style.section__desc}>
          Паспортные данные гарантируют оригинальность материала и отсутствие
          нарушений со стороны артиста, а также гарантируют выплату средств и
          исполнение условий с нашей стороны.
        </MyText>
        <div className={style.section__inputs}>
          <MyInput
            {...register("passSeries")}
            className={style.inp}
            inpLk={true}
            label={"Серия паспорта"}
            type={"text"}
            placeholder="4 цифры"
          />
          <MyInput
            {...register("passNumber")}
            className={style.inp}
            inpLk={true}
            label={"Номер паспорта"}
            type={"text"}
            placeholder="6 цифр"
          />
          <MyInput
            {...register("getDate", {
              setValueAs(value) {
                return new Date(value);
              },
            })}
            className={style.inp}
            inpLk={true}
            label={"Дата получения"}
            type={"date"}
          />
          <MyInput
            {...register("givenBy")}
            className={style.inp}
            inpLk={true}
            label={"Кем выдан"}
            type={"text"}
            placeholder="Отделом МВД по Москве МО"
          />
          <MyInput
            {...register("subunitCode")}
            className={style.inp}
            inpLk={true}
            label={"Код подразделения"}
            type={"text"}
            placeholder="XXXXXX"
          />
          <MyInput
            {...register("registrationAddress")}
            className={style.inp}
            inpLk={true}
            label={"Адрес регистрации"}
            type={"text"}
            placeholder="г. Москва, пр-т Мира, д.1"
          />
        </div>
      </div>

      <div className={style.section}>
        <MyTitle Tag={"h4"} className={"styleValue fs20 mb10"}>
          Банковские реквизиты
        </MyTitle>
        <MyText className={style.section__desc}>
          Банковские данные требуются для выплаты средств, в случае, если автор
          не может самостоятельно предоставить актуальные реквизиты
        </MyText>
        <div className={style.section__inputs_small}>
          <MyInput
            {...register("accountNumber")}
            className={style.inp}
            inpLk={true}
            label={"Номер счета"}
            type={"text"}
            placeholder="20 цифр"
          />
          <MyInput
            {...register("bankName")}
            className={style.inp}
            inpLk={true}
            label={"Наименование банка"}
            type={"text"}
            placeholder="АО ТИНЬКОФФ БАНК"
          />
        </div>
      </div>
      <MyButton
        text={"Подписать договор"}
        view={"secondary"}
        type="submit"
        disabled={isBlocked}
      />
    </form>
  );
};
export default VerificationForm;
