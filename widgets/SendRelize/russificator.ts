import { TReleaseForm } from "@/schema/release.schema";

export type TReleaseFormTrimmed = Omit<
  TReleaseForm,
  "tracks" | "labelName" | "upc"
>;

const rusText: Record<keyof TReleaseFormTrimmed, string> = {
  language: "Язык",
  title: "Название релиза",
  type: "Тип релиза",
  genre: "Жанр",
  platforms: "Платформы",
  area: "Территории",
  preview: "Обложка релиза",
  releaseDate: "Дата релиза",
  startDate: "Дата старта",
  preorderDate: "Дата предзаказа",
  subtitle: "Подзаголовок",
  feat: "Персоны и роли",
  performer: "Персоны и роли",
  remixer: "Персоны и роли",
};

export default function russificator(
  engArray: (keyof TReleaseFormTrimmed)[]
): string {
  const rusArray: string[] = [];
  engArray.forEach((e) => {
    e in rusText ? rusArray.push(rusText[e]) : rusArray.push(e);
  });
  rusArray.join(",  ");
  return `Некорректный ввод данных в полях: ${rusArray}`;
}
