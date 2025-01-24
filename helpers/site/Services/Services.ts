import IService from "./Service.interface";

export const Services: IService[] = [
  {
    title: "Стандарт",
    description: "Подписка для тех, кто хочет попробовать.",
    icon: "/site_assets/service/microphone.png",
    altIcon: "Иконка микрофона",
    countBuy: 153,
    color: "green",
    price: 490,
    timeframe: "навсегда",
    href: "/signin",
    listBenefit: [
      "Один релиз в месяц 😔",
      "Дистрибуция за 5 дней",
      "Идеально для новичков",
    ],
    labelButton: "Попробовать",
  },
  {
    title: "Энтерпрайз",
    description:
      "Идеальное решение для настоящих артистов, настроеных на получение результатов.",
    icon: "/site_assets/service/moneyBack.png",
    altIcon: "Иконка портфеля",
    countBuy: 230,
    href: "/signin",
    labelButton: "Купить",
    price: 1490,
    color: "orange",
    timeframe: "навсегда",
    listBenefit: [
      "Безлимитные релизы",
      "Выгрузка от 24 часов",
      "Приоритетная поддержка",
      "Приоритетная модерация",
      "Премиальные функции ",
      "Караоке текст / Видеошот",
    ],
  },
  {
    title: "PRO",
    description:
      "План для тех, у кого строго ограничен бюджет но тем не менее он хочет быть услышанным.",
    icon: "/site_assets/service/dollar.png",
    altIcon: "Иконка доллара",
    countBuy: 417,
    href: "/signin",
    labelButton: "Купить",
    price: 1190,
    color: "purple",
    timeframe: "навсегда",
    listBenefit: [
      "До 6 релизов в месяц",
      "Выгрузка на площадки до 3-х дней",
      "Персональная поддержка",
    ],
  },
];
