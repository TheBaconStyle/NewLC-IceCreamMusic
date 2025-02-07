"use client";
import { approveRelease } from "@/actions/release/moderate";
import MyButton from "@/shared/MyButton/MyButton";
import MyInput from "@/shared/MyInput/MyInput";
import ModalPopup from "@/widgets/ModalPopup/ModalPopup";
import { useParams } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import style from "./page.module.css";

export function ConfirmButton() {
  const [show, setShow] = useState(false);
  const [upc, setUpc] = useState("");
  const params = useParams();
  useEffect(() => {
    if (!show) setUpc("");
  }, [show, setShow]);

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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            approveRelease(params.id as string, upc).then(() => {
              enqueueSnackbar({
                variant: "success",
                message: "Статус обновлён",
              });
              setShow(!show);
            });
          }}
        >
          <MyInput
            className="w100"
            type={"text"}
            label={"UPC"}
            inpLk
            value={upc}
            onChange={(e) => setUpc(e.target.value)}
          />
          <MyButton
            className="mt30"
            text={"Отправить"}
            view={"secondary"}
            type="submit"
          />
        </form>
      </ModalPopup>
    </>
  );
}
