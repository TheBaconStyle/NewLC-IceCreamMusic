"use client";

import MyTitle from "@/shared/ui/MyTitle/MyTitle";
import { usePathname } from "next/navigation";
import React from "react";

export type TBreadCrumbs = {
  separator?: string;
  home?: string;
};

const BreadCrumbRoutes = {
  charts: "Чарты",
  license: "Верификация",
  marketing: "Маркетинг",
  instruments: "Инструменты",
  promotion: "Продвижение",
  news: "Новости",
  dashboard: "Основное",
  catalog: "Релиз",
  faq: "Вопрос-ответ",
  premium: "Премиум",
  plans: "Тарифы",
  admin: "Административная панель",
  releases: "Релизы",
  verifications: "Верификация",
  wallet: "Кошелек",
  profile: "Профиль",
  edit: "Редактирование",
};

export function BreadCrumbs({ separator = "/", home }: TBreadCrumbs) {
  const pathname = usePathname();

  const roots = pathname.split("/").filter(Boolean);

  if (roots.length === 1) return null;

  return (
    <div className={"mb30"}>
      <div className={"row gap10"}>
        {roots.map((root, index) => (
          <React.Fragment key={root}>
            <span className={"styleTitle"}>
              {Object.keys(BreadCrumbRoutes).includes(root)
                ? BreadCrumbRoutes[root as keyof typeof BreadCrumbRoutes]
                : root}
            </span>
            {index !== roots.length - 1 && (
              <span className={"styleTitle"}>{separator}</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <MyTitle Tag={"h1"}>
        {BreadCrumbRoutes[roots.at(-1) as keyof typeof BreadCrumbRoutes] ??
          roots.at(-1)}
      </MyTitle>
    </div>
  );
}
export default BreadCrumbs;
