import { Metadata } from "next";
import { Banner } from "@/components/ui/Banner/Banner";
import { FAQ } from "@/components/ui/FAQ/FAQ";
import { ListStores } from "@/components/ui/ListStores/ListStores";
import { ReviewList } from "@/components/ui/ReviewList/ReviewList";

import style from "./page.module.css";
import { FAQ_data } from "@/shared/model/helpers/site/FAQ/FAQ";
import { BannerIntresting } from "@/shared/model/helpers/site/BannerIntresting/BannerIntresting";

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
