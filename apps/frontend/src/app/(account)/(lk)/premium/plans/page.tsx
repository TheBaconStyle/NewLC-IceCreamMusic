"use client";
import MusicServices from "@/entities/ui/MusicServices/MusicServices";
import TarifCard from "@/entities/ui/TarifCard/TarifCard";
import TarifTable from "@/entities/ui/TarifTable/TarifTable";
import ITarifTable, {
  ArrayTarifTable,
} from "@/entities/ui/TarifTable/TarifTable.props";
import { premiumPlansArray } from "@/shared/model/helpers/premiumPlans";
import { PageTransitionProvider } from "@/providers/PageTransitionProvider";
import TopMine from "../../../../../../public/assets/TopMine.svg";
import { DynamicSvg } from "@/shared/ui/DynamicSvg/DynamicSvg";
import MyText from "@/shared/ui/MyText/MyText";
import MyTitle from "@/shared/ui/MyTitle/MyTitle";
import classNames from "classnames";
import style from "./page.module.css";

const pulseIconClasses = ["", style.blur_small, style.blur_medium, style.big];

export default function TarifPage() {
  return (
    <PageTransitionProvider>
      <div className={style.info}>
        <div className={style.relative}>
          {pulseIconClasses.map((cn) => (
            <TopMine
              key={cn}
              className={classNames(
                style.mineIcon,
                style.absolute,
                cn,
                style.pulse
              )}
            />
          ))}
        </div>
        <MyTitle className={style.title} Tag="h2">
          Всего один шаг до известности
        </MyTitle>
        <MyText className={style.text}>
          Станьте частью частного и приватного лобби лучших артистов в
          музыкальной индустрии по цене обеда! Хватит упускать возможности —
          пора действовать, остальное мы сделаем за вас
        </MyText>
      </div>
      <MusicServices />
      <hr className={style.sepparator} />
      <div className={style.tarifs}>
        {premiumPlansArray.map((plan) => {
          const { src, border, desc, markers, name, price, system_name } = plan;
          return (
            <TarifCard
              icon={<DynamicSvg name={src} className={style.icon} />}
              desc={desc}
              border={border}
              markers={markers as any}
              name={name}
              price={price}
              key={src}
              purchaseUrl={`/purchase/subscription/${system_name}`}
            />
          );
        })}
      </div>
      <TarifTable data={ArrayTarifTable as ITarifTable[]} />
    </PageTransitionProvider>
  );
}
