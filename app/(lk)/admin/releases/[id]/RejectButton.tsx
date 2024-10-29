"use client";
import { useParams } from "next/navigation";
import style from "../page.module.css";
import classNames from "classnames";
import MyButton from "@/shared/MyButton/MyButton";
import { rejectRelease } from "@/actions/release";
import { enqueueSnackbar } from "notistack";

export function RejectButton() {
  const params = useParams();

  return (
    <MyButton
      className={classNames(style.btn, style.error)}
      text={"Отказать"}
      view={"secondary"}
      onClick={() => {
        rejectRelease(params.id as string).then(() =>
          enqueueSnackbar({ variant: "success", message: "Статус обновлён" })
        );
      }}
    />
  );
}
