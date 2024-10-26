"use client";

import { recoverPassword } from "@/actions/auth";
import style from "./page.module.css";
import MyButton from "@/shared/MyButton/MyButton";
import MyInput from "@/shared/MyInput/MyInput";
import { useState } from "react";

export default function RecoverPage() {
  const [email, setEmail] = useState("");

  return (
    <div className={style.form}>
      <div className={style.formContent}>
        <div className="mb10">
          Введите адрес эл. почты, привязанный к Вашей учетной записи.
        </div>
        <MyInput
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <MyButton
          text="отправить"
          view="secondary"
          onClick={() => {
            recoverPassword(email);
          }}
        />
      </div>
    </div>
  );
}
