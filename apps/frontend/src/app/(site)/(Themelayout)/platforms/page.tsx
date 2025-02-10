import { Banner } from "@/components/ui/Banner/Banner";

import { ListStores } from "@/components/ui/ListStores/ListStores";
import { ReviewList } from "@/components/ui/ReviewList/ReviewList";
import style from "./page.module.css";

import { FAQ } from "@/components/ui/FAQ/FAQ";

import { Metadata } from "next";
import { FAQ_data } from "@/shared/model/helpers/site/FAQ/FAQ";
import { BannerIntresting } from "@/shared/model/helpers/site/BannerIntresting/BannerIntresting";

export const metadata: Metadata = {
  title: "ICECREAMMUSIC | Платформы",
  description:
    "ICECREAMMUSIC - Основные площадки. Мы предоставляем большой выбор популярных площадок! Делись своим творчеством со всем миром и будь услышанным!",
};

export default function Home() {
  return (
    <main className="main">
      <div className={style.preview}>
        <h1 className={style.title}>Основные площадки</h1>
        <p className={style.text}>
          Мы предоставляем большой выбор популярных площадок! Делись своим
          творчеством со всем миром и будь услышанным!
        </p>
      </div>
      <ListStores />
      <FAQ
        FAQ_data={FAQ_data.filter((item) => {
          return item.important;
        })}
      />

      <ReviewList />
      <Banner info={BannerIntresting} />
    </main>
  );
}
