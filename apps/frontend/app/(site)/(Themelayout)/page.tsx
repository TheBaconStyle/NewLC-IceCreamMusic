import { Banner } from "../../../components/Banner/Banner";

import { ListAdvantages } from "../../../components/ListAdvantages/ListAdvantages";
import { ListStores } from "../../../components/ListStores/ListStores";
import { ServicesList } from "../../../components/ServicesList/ServicesList";
import { FAQ } from "../../../components/FAQ/FAQ";
import { StatisticList } from "../../../components/StatisticList/StatisticList";
import { HowItWorksList } from "../../../components/HowItWorksList/HowItWorksList";

import { Metadata } from "next";
import { Preview } from "./components/Preview.tsx/Preview";
import { FAQ_data } from "@/shared/model/helpers/site/FAQ/FAQ";
import { BannerIntresting } from "@/shared/model/helpers/site/BannerIntresting/BannerIntresting";
export const metadata: Metadata = {
  title: "ICECREAMMUSIC | Главная",
  description:
    "ICECREAMMUSIC - Управляйте своим творчеством, продажами и маркетингом в одном месте, чтобы сделать вашу музыку заметной и доступной миллионам слушателей!",
};

export default function Home() {
  return (
    <main className="main">
      <Preview />
      <HowItWorksList />
      <ListAdvantages />
      <ListStores />
      <ServicesList />
      <FAQ
        FAQ_data={FAQ_data.filter((item) => {
          return item.important;
        })}
      />

      <StatisticList />

      <Banner info={BannerIntresting} />
    </main>
  );
}
