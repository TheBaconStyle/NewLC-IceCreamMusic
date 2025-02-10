"use client";
import {
  resetPasswordSchema,
  TResetPassword,
} from "@/shared/model/schema/reset.schema";
import MyButton from "@/shared/ui/MyButton/MyButton";
import MyInput from "@/shared/ui/MyInput/MyInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPassword } from "@/actions/auth";
import classNames from "classnames";

type TResetPasswordForm = {
  token: string;
};

export function ResetPasswordForm({ token }: TResetPasswordForm) {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<TResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {},
  });

  return (
    <form
      className={classNames("w100", "center", "col", "gap10")}
      onSubmit={handleSubmit((data) => resetPassword(data.password, token))}
    >
      <MyInput
        label="Введите новый пароль"
        type="password"
        {...register("password")}
      />
      <MyInput
        label="Повторите пароль"
        type="password"
        {...register("confirm")}
      />
      <MyButton
        text="Изменить пароль"
        view="secondary"
        type="submit"
        disabled={!!errors.root || !!errors.confirm || !!errors.password}
      />
    </form>
  );
}
