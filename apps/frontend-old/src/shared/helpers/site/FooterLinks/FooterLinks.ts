import IFooterLinks from "./FooterLinks.interface";

export const FooterData: IFooterLinks = {
  data: [
    {
      title: "Основное",
      block: [
        { label: "Главная", href: "/" },
        { label: "Дистрибуция", href: "/distribution" },
        { label: "Платформы", href: "/platforms" },
        { label: "Вопросы", href: "/questions" },
      ],
    },
    {
      title: "Каталог",
      block: [
        { label: "Кабинет", href: "/signin" },
        { label: "Аналитика", href: "/signin" },
        { label: "Финансы", href: "/signin" },
        { label: "Смарт-ссылка", href: "/signin" },
      ],
    },
    {
      title: "Панель управления",
      block: [{ label: "Войти", href: "/signin" }],
    },
    {
      title: "Документы",
      block: [{ label: "Публичная оферта", href: "/terms" }],
    },
  ],
};
