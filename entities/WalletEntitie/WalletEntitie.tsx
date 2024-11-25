"use client";
import { replenishBalance } from "@/actions/users";
import MyButton from "@/shared/MyButton/MyButton";
import MyInput from "@/shared/MyInput/MyInput";
import MyText from "@/shared/MyText/MyText";
import ModalPopup from "@/widgets/ModalPopup/ModalPopup";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import style from "./WalletEntitie.module.css";

export default function WalletEntitie({
  id,
  avatar,
  name,
  telegram,
  whatsapp,
  viber,
  vk,
  email,
}: {
  id: string;
  avatar: string | null;
  name: string;
  telegram: string | null;
  whatsapp: string | null;
  viber: string | null;
  vk: string | null;
  email: string;
}) {
  const [showToPay, setShowToPay] = useState(false);

  const [balance, setBalance] = useState(0);

  return (
    <div className={classNames("wrap gap30", style.rel)}>
      <div className="row">
        <Image
          src={
            avatar
              ? `${process.env.NEXT_PUBLIC_S3_URL!}/avatars/${id}.${avatar}`
              : "/assets/noAvatar.png"
          }
          alt={name}
          width={100}
          height={100}
        />
        <div className="col gap10">
          <div className="col">
            <MyText className="styleTitle">Пользователь</MyText>
            <MyText className="styleValue">{name}</MyText>
          </div>
          <div className="row gap50">
            <div className="col">
              <MyText className="styleTitle">Telegram</MyText>
              {telegram ? (
                telegram.includes("@") ? (
                  <Link
                    className="styleValue"
                    href={`https://t.me/${telegram.slice(1)}`}
                  >
                    Telegram
                  </Link>
                ) : (
                  <Link className="styleValue" href={telegram}>
                    Telegram
                  </Link>
                )
              ) : (
                <MyText className="styleValue">
                  <span className="warning">Не указано</span>
                </MyText>
              )}
            </div>

            <div className="col">
              <MyText className="styleTitle">WhatsApp</MyText>
              {whatsapp ? (
                <Link className="styleValue" href={whatsapp}>
                  Whatsapp
                </Link>
              ) : (
                <MyText className="styleValue">
                  <span className="warning">Не указано</span>
                </MyText>
              )}
            </div>
            <div className="col">
              <MyText className="styleTitle">VK</MyText>
              {vk ? (
                <Link className="styleValue" href={vk}>
                  В контакте
                </Link>
              ) : (
                <MyText className="styleValue">
                  <span className="warning">Не указано</span>
                </MyText>
              )}
            </div>

            <div className="col">
              <MyText className="styleTitle">Viber</MyText>
              {viber ? (
                <Link className="styleValue" href={viber}>
                  Viber
                </Link>
              ) : (
                <MyText className="styleValue">
                  <span className="warning">Не указано</span>
                </MyText>
              )}
            </div>

            <div className="col">
              <MyText className="styleTitle">Почта</MyText>
              {viber ? (
                <a className="styleValue" href={`mailto:${email}`}>
                  {email}
                </a>
              ) : (
                <MyText className="styleValue">
                  <span className="warning">Не указано</span>
                </MyText>
              )}
            </div>
          </div>
        </div>
        <MyButton
          className={style.toPay}
          text={"Начислить выплату"}
          view={"secondary"}
          onClick={() => {
            setShowToPay(!showToPay);
          }}
        />

        <ModalPopup
          active={showToPay}
          setActive={setShowToPay}
          title={"Начисление выплат"}
          width={400}
          height={300}
        >
          <MyText className="styleValue">Пользователь: {name}</MyText>
          <MyInput
            className="w100 mt40"
            label="Сумма начиления"
            type="number"
            inpLk
            onChange={(e) => setBalance(Number(e.target.value))}
            value={balance}
          />
          <div className="center">
            <MyButton
              text={"Начислить"}
              view={"secondary"}
              onClick={() => {
                if (balance <= 0) {
                  enqueueSnackbar({
                    variant: "error",
                    message:
                      "Можно начислить выплату только на положительную сумму",
                  });
                  return;
                }
                replenishBalance(id, balance).then((data) => {
                  enqueueSnackbar({
                    variant: data.success ? "success" : "error",
                    message: data.message,
                  });

                  if (data.success) {
                    setBalance(0);
                    setShowToPay(false);
                  }
                });
              }}
            />
          </div>
        </ModalPopup>
      </div>
    </div>
  );
}
