"use client";
import { useParams } from "next/navigation";
import style from "./page.module.css";
import classNames from "classnames";
import MyButton from "@/shared/MyButton/MyButton";
import { rejectRelease } from "@/actions/release";
import { enqueueSnackbar } from "notistack";
import ModalPopup from "@/widgets/ModalPopup/ModalPopup";
import { useState } from "react";
import MyTextArea from "@/shared/MyTextArea/MyTextArea";

export function RejectButton() {
  const [show, setShow] = useState(false);
  const params = useParams();

  return (
    <>
      <MyButton
        className={classNames(style.btn, style.error)}
        text={"Отказать"}
        view={"secondary"}
        onClick={() => {
          setShow(!show);
        }}
      />
      <ModalPopup
        active={show}
        setActive={setShow}
        title={"Отказ"}
        width={0}
        height={300}
      >
        <MyTextArea className="w100" label={"Комментарий к релизу"} />
        <MyButton
          className="mt30"
          text={"Отправить"}
          view={"secondary"}
          onClick={() => {
            rejectRelease(params.id as string).then(() =>
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
