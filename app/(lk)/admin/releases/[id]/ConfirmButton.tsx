"use client";
import MyButton from "@/shared/MyButton/MyButton";
import { useParams } from "next/navigation";
import style from "../page.module.css";
import { approveRelease } from "@/actions/release";
import { enqueueSnackbar } from "notistack";

export function ConfirmButton() {
  const params = useParams();

  return (
    <MyButton
      className={style.btn}
      text={"Подтвердить"}
      view={"secondary"}
      onClick={() => {
        approveRelease(params.id as string).then(() =>
          enqueueSnackbar({ variant: "success", message: "Статус обновлён" })
        );
      }}
    />
  );
}
