"use client";
import MyButton from "@/shared/MyButton/MyButton";
import { useParams } from "next/navigation";
import style from "./page.module.css";
import { approveRelease } from "@/actions/release";
import { enqueueSnackbar } from "notistack";
import ModalPopup from "@/widgets/ModalPopup/ModalPopup";
import MyTextArea from "@/shared/MyTextArea/MyTextArea";
import { useState } from "react";
import MyInput from "@/shared/MyInput/MyInput";

export function ConfirmButton() {
  const params = useParams();
  const [show, setShow] = useState(false);

  return (
    <>
      <MyButton
        className={style.btn}
        text={"Подтвердить"}
        view={"secondary"}
        onClick={() => {
          setShow(!show);
        }}
      />
      <ModalPopup
        active={show}
        setActive={setShow}
        title={"Подтверждение релиза"}
        width={0}
        height={300}
      >
        <MyInput className="w100" type={"text"} label={"UPC"} inpLk />
        <MyButton
          className="mt30"
          text={"Отправить"}
          view={"secondary"}
          onClick={() => {
            approveRelease(params.id as string).then(() =>
              enqueueSnackbar({
                variant: "success",
                message: "Статус обновлён",
              })
            );
          }}
        />
      </ModalPopup>
    </>
  );
}
