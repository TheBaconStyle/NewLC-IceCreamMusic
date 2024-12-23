import { Metadata } from "next";
import { Banner } from "../../../../components/Banner/Banner";
import { FAQ } from "../../../../components/FAQ/FAQ";
import { ListStores } from "../../../../components/ListStores/ListStores";
import { ReviewList } from "../../../../components/ReviewList/ReviewList";

import style from "./page.module.css";
import { FAQ_data } from "@/helpers/site/FAQ/FAQ";
import { BannerIntresting } from "@/helpers/site/BannerIntresting/BannerIntresting";

export const metadata: Metadata = {
  title: "ICECREAMMUSIC | Вопросы",
  description: "ICECREAMMUSIC - Часто задаваемые вопросы",
};

export default function Home() {
  return (
    <main className="main">
      <div className={style.preview}>
        <h1 className={style.title}>Часто задаваемые вопросы</h1>
        <p className={style.text}>
          Здесь вы найдете ответ на интересующий вас вопрос!
        </p>
      </div>
      <FAQ FAQ_data={FAQ_data} />
      <ListStores />
      <ReviewList />
      <Banner info={BannerIntresting} />
    </main>
  );
}
