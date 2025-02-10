"use client";

import { getUserBalance } from "@/actions/users";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import WalletIcon from "../../../../../public/InfoIcon/Wallet.svg";
import YouKassaWallet from "../YouKassaWallet/YouKassaWallet";
import style from "./Wallet.module.css";

export type TWallet = {
  balance?: number;
};

export function Wallet({ balance }: TWallet) {
  const [showYouKassa, setShowYouKassa] = useState(false);

  const handleShowWalletPopup = async () => {
    const balanceRes = await getUserBalance();
    if (!balanceRes.success) {
      enqueueSnackbar({
        variant: "error",
        message: "Невозможно получить баланс пользователя",
      });
      return;
    }
    if (balanceRes.balance! < 2000) {
      enqueueSnackbar({
        variant: "error",
        message: "Невозможно выполнить выплату при балансе менее 2000 руб.",
      });
      return;
    }
    setShowYouKassa(true);
  };

  return (
    <>
      <button className={style.header__button} onClick={handleShowWalletPopup}>
        <div className={style.header__wrapper__icon}>
          <WalletIcon className={style.header__icon} />
        </div>
        {balance?.toFixed(2)} ₽
      </button>

      {showYouKassa && (
        <YouKassaWallet
          showYouKassa={showYouKassa}
          setShowYouKassa={setShowYouKassa}
        />
      )}
    </>
  );
}
