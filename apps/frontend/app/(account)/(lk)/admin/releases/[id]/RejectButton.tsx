"use client";
import { useParams } from "next/navigation";
import style from "./page.module.css";
import classNames from "classnames";
import MyButton from "@/shared/MyButton/MyButton";
import { rejectRelease } from "@/actions/release/moderate";
import { enqueueSnackbar } from "notistack";
import ModalPopup from "@/widgets/ModalPopup/ModalPopup";
import { useEffect, useState } from "react";
import MyTextArea from "@/shared/MyTextArea/MyTextArea";

export function RejectButton() {
  const [show, setShow] = useState(false);
  const [reason, setReason] = useState("");
  const params = useParams();

  useEffect(() => {
    if (!show) setReason("");
  }, [show, setShow]);

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            rejectRelease(params.id as string, reason).then((data) => {
              if (data && !data.success) {
                enqueueSnackbar({
                  variant: "error",
                  message: data.message,
                });
              }

              enqueueSnackbar({
                variant: "success",
                message: "Статус обновлён",
              });
              setShow(!show);
            });
          }}
        >
          <MyTextArea
            className="w100"
            label="Комментарий к релизу"
            onChange={(e) => setReason(e.target.value)}
            value={reason}
          />
          <MyButton
            className="mt30"
            text="Отправить"
            view="secondary"
            type="submit"
          />
        </form>
      </ModalPopup>
    </>
  );
}
