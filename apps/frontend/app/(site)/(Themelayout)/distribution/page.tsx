import { BannerIntresting } from "@/shared/model/helpers/site/BannerIntresting/BannerIntresting";
import { Banner } from "../../../../components/Banner/Banner";
import { HowItWorksList } from "../../../../components/HowItWorksList/HowItWorksList";
import { ListStores } from "../../../../components/ListStores/ListStores";
import { ReviewList } from "../../../../components/ReviewList/ReviewList";
import style from "./page.module.css";

import classNames from "classnames";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ICECREAMMUSIC | Дистрибуция",
  description: `
		ICECREAMMUSIC - Дистрибуция музыки - это процесс распространения музыкальных
		композиций и альбомов от исполнителей и музыкальных групп к
		слушателям. В цифровую эпоху дистрибуция музыки в основном связана с
		распространением аудиофайлов или потоковой передачей музыки через
		интернет.`,
};

export default function Home() {
  return (
    <main className="main">
      <div className={classNames(style.preview, "previewBG")}>
        <h1 className={style.title}>Что такое дистрибуция?</h1>
        <div className={style.block}>
          <p className={style.text}>
            Дистрибуция музыки - это процесс распространения музыкальных
            композиций и альбомов от исполнителей и музыкальных групп к
            слушателям. В цифровую эпоху дистрибуция музыки в основном связана с
            распространением аудиофайлов или потоковой передачей музыки через
            интернет.
          </p>
          <img
            className={style.preview__image}
            src={"/site_assets/music.png"}
            width={80}
            height={80}
            alt="Иконка ноты"
          />
        </div>
      </div>
      <HowItWorksList />
      <ListStores />
      <ReviewList />
      <Banner info={BannerIntresting} />
    </main>
  );
}
