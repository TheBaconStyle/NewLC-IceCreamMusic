import { TReleaseInsertForm, TTrackInsertForm } from "@/schema/release.schema";

export type TReleaseFormTrimmed = Omit<
  TReleaseInsertForm,
  "tracks" | "labelName" | "upc"
>;

const releaseRusText: Record<keyof TReleaseFormTrimmed, string> = {
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

export function releaseRussificator(
  engArray: (keyof TReleaseFormTrimmed)[]
): string {
  const fieldsString = engArray
    .map((e) => {
      return e in releaseRusText ? releaseRusText[e] : e;
    })
    .join(",  ");

  return `Некорректный ввод данных в полях: ${fieldsString}`;
}

export type TTrackFormTrimmed = Pick<
  TTrackInsertForm,
  "author_rights" | "language" | "title" | "roles"
>;

export const trackRusText: Record<keyof TTrackFormTrimmed, string> = {
  author_rights: "Авторские права",
  language: "Язык",
  title: "Название трека",
  roles: "Персоны и роли",
};

export default function trackRusificator(
  engArray: (keyof TTrackFormTrimmed)[]
) {
  return engArray
    .map((e) => {
      return e in trackRusText ? trackRusText[e] : e;
    })
    .join(", ");
}
