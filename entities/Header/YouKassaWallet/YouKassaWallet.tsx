import ModalPopup from "@/widgets/ModalPopup/ModalPopup";
import { useEffect } from "react";

export default function YouKassaWallet({
  showYouKassa,
  setShowYouKassa,
}: {
  showYouKassa: boolean;
  setShowYouKassa: () => {};
}) {
  useEffect(() => {
    const pay = new window.PayoutsData({
      type: "payout",
      account_id: "407649", //Идентификатор шлюза (agentId в личном кабинете)
      success_callback: function (data) {
        console.log(data);
      },
      error_callback: function (error) {
        console.log(error);
      },
    });
    pay.render("payout-form").then(() => {});
  }, []);

  return (
    <ModalPopup
      title="Кошелек"
      active={showYouKassa}
      setActive={setShowYouKassa}
      width={0}
      height={450}
      view="white"
    >
      <div id="payout-form"></div>
    </ModalPopup>
  );
}
