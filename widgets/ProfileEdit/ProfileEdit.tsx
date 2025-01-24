"use client";
import classNames from "classnames";
import style from "./ProfileEdit.module.css";
import MyInpFile from "@/shared/MyInpFile/MyInpFile";
import MyTitle from "@/shared/MyTitle/MyTitle";
import MyInput from "@/shared/MyInput/MyInput";
import { TProfileFormSchema } from "@/schema/profile.schema";
import { inputDateFormat } from "@/utils/dateFormatter";
import MyButton from "@/shared/MyButton/MyButton";
import { useForm } from "react-hook-form";
import { objectToFormData } from "@/utils/formDataTobject";
import { editProfile } from "@/actions/users";
import { enqueueSnackbar } from "notistack";

export type TProfileEdit = Omit<TProfileFormSchema, "birthDate"> & {
  birthDate?: Date | null;
};

export function ProfileEdit({
  birthDate,
  country,
  label,
  name,
  personalSiteUrl,
  telegram,
  viber,
  vk,
  whatsapp,
}: TProfileEdit) {
  const { register, handleSubmit, setValue } = useForm<TProfileFormSchema>({
    defaultValues: {
      name,
      birthDate: !!birthDate ? inputDateFormat(birthDate) : undefined,
      country,
      label,
      personalSiteUrl,
      viber,
      vk,
      telegram,
      whatsapp,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(
        (data) => {
          const profileData = objectToFormData({
            ...data,
            birthDate:
              data.birthDate?.length !== 0 ? data.birthDate : undefined,
          });

          editProfile(profileData).then((data) => {
            if (data) {
              return enqueueSnackbar({
                variant: data.success ? "success" : "error",
                message: data.message,
              });
            }
            return enqueueSnackbar({
              variant: "success",
              message: "Профиль обновлён",
            });
          });
        },
        () =>
          enqueueSnackbar({
            variant: "error",
            message: "Проверьте ещё раз обязательные к заполнению поля",
          })
      )}
      className={style.myProfile}
    >
      {}
      <div className="row wrap">
        <div className={classNames("wrap", "center")}>
          <MyInpFile
            className={style.avatar}
            onFileChange={(files) => setValue("avatar", files?.item(0))}
          />
        </div>
        <div className={classNames("wrap", "w100")}>
          <MyTitle Tag={"h4"} className="mb30">
            Личные ланные
          </MyTitle>
          <MyInput
            type={"text"}
            label={"Имя"}
            inpLk
            className={classNames(style.inp, "w100")}
            {...register("name")}
          />
          {/* <MyTextArea label={"Обо мне"} /> */}
        </div>
      </div>
      <div className={classNames("mt20")}>
        <div className="row">
          <div className={classNames(style.social, "w50", "wrap")}>
            <MyTitle Tag={"h4"} className="mb30">
              Социальные ссылки
            </MyTitle>
            <MyInput
              type={"text"}
              label={"Telegram"}
              inpLk
              className="w100"
              {...register("telegram")}
            />
            <MyInput
              type={"text"}
              label={"VK"}
              inpLk
              className="w100"
              {...register("vk")}
            />
            <MyInput
              type={"text"}
              label={"WhatsApp"}
              inpLk
              className="w100"
              {...register("whatsapp")}
            />
            <MyInput
              type={"text"}
              label={"Viber"}
              inpLk
              className="w100"
              {...register("viber")}
            />
          </div>
          <div className={classNames(style.pronous, "w50", "wrap")}>
            <MyTitle Tag={"h4"} className="mb30">
              Прочие данные
            </MyTitle>
            <MyInput
              type={"date"}
              label={"Дата рождения"}
              inpLk
              className="w100"
              {...register("birthDate")}
            />
            <MyInput
              type={"text"}
              label={"Страна"}
              inpLk
              className="w100"
              {...register("country")}
            />
            <MyInput
              type={"text"}
              label={"Лейбл"}
              inpLk
              className="w100"
              {...register("label")}
            />
            <MyInput
              type={"text"}
              label={"Личный сайт"}
              inpLk
              className="w100"
              {...register("personalSiteUrl")}
            />
          </div>
        </div>
      </div>
      <MyButton
        text={"Сохранить"}
        view={"secondary"}
        className="mt20"
        type="submit"
      />
    </form>
  );
}
