import { db } from "@/db";
import MyText from "@/shared/MyText/MyText";
import MyTitle from "@/shared/MyTitle/MyTitle";
import dateFormatter from "@/utils/dateFormatter";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { ConfirmButton } from "./ConfirmButton";
import style from "./page.module.css";
import { RejectButton } from "./RejectButton";
import { DownloadButton } from "./DownloadButton";

export default async function AdminReleaseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const releaseData = await db.query.release.findFirst({
    where: (rel, { eq }) => eq(rel.id, params.id),
    with: { tracks: true },
  });

  // платформы
  let platforms = z.string().array().parse(releaseData?.platforms);
  if (platforms.includes("all")) {
    platforms = ["На всех площадках"];
  } else {
    platforms.join(", ");
  }

  // территории
  let areas = z
    .object({
      negate: z.boolean(),
      data: z.string().array(),
    })
    .parse(releaseData?.area);
  if (areas.negate) {
    areas.data = ["Во всех кроме: ", areas.data.join(", ")];
  }
  if (areas.data.includes("all")) {
    areas.data = ["Во всех странах"];
  }
  if (areas.data.includes("sng")) {
    areas.data = ["В странах СНГ"];
  }

  return (
    <div>
      {releaseData && (
        <div className={style.header}>
          <div className={classNames("wrap", style.fit)}>
            <Image
              alt={releaseData.title}
              src={`${process.env.NEXT_PUBLIC_S3_URL}/previews/${
                releaseData!.id
              }.${releaseData!.preview}`}
              // alt={data!.title}
              className={style.image}
              width={250}
              height={250}
              unoptimized
            />

            <div>Оплачен: {releaseData.confirmed ? "Да" : "Нет"}</div>

            <div>Текущий статус: {releaseData.status}</div>

            <div className="row mt20">
              <ConfirmButton />
              <RejectButton />
            </div>
          </div>

          <div className={classNames("col gap20 w100", style.body)}>
            <MyTitle Tag={"h2"}>Совокупная информация релиза</MyTitle>
            <div className="col wrap">
              <MyTitle Tag={"h4"}>Основная информация</MyTitle>
              <div className="row gap50 mt10">
                <div className="col">
                  <MyText className={style.title}>Название релиза</MyText>
                  <MyText className={style.value}>{releaseData!.title}</MyText>
                </div>
                <div className="col">
                  <MyText className={style.title}>Подзаголовок релиза</MyText>
                  <MyText className={style.value}>
                    {releaseData.subtitle
                      ? releaseData.subtitle
                      : "Информация отсутствует"}
                  </MyText>
                </div>
                <div className="col">
                  <MyText className={style.title}>Язык метаданных</MyText>
                  <MyText className={style.value}>
                    {releaseData.language}
                  </MyText>
                </div>
                <div className="col">
                  <MyText className={style.title}>Тип релиза</MyText>
                  <MyText className={style.value}>{releaseData.type}</MyText>
                </div>
              </div>
            </div>

            <div className="col wrap">
              <MyTitle Tag={"h4"}>Персоны и роли</MyTitle>
              <div className="row gap50 mt10">
                <div className="col">
                  <MyText className={style.title}>Исполнитель</MyText>
                  <MyText className={style.value}>
                    {releaseData.performer}
                  </MyText>
                </div>
                <div className="col">
                  <MyText className={style.title}>Лица со статусом feat</MyText>
                  <MyText className={style.value}>{releaseData.feat}</MyText>
                </div>
                <div className="col">
                  <MyText className={style.title}>
                    Лицаиц со статусом Remixer
                  </MyText>
                  <MyText className={style.value}>{releaseData.remixer}</MyText>
                </div>
              </div>
            </div>

            <div className="col wrap">
              <MyTitle Tag={"h4"}>Дополнительная информация</MyTitle>
              <div className="row gap50 mt10">
                <div className="col">
                  <MyText className={style.title}>Жанр</MyText>
                  <MyText className={style.value}>{releaseData.genre}</MyText>
                </div>
                <div className="col">
                  <MyText className={style.title}>Идентификация UPC</MyText>
                  <MyText className={style.value}>
                    {releaseData.upc ? (
                      releaseData.upc
                    ) : (
                      <span className={style.warning}>Отсутствует UPC</span>
                    )}
                  </MyText>
                </div>
                <div className="col">
                  <MyText className={style.title}>Название лейбла</MyText>
                  <MyText className={style.value}>
                    {releaseData.labelName}
                  </MyText>
                </div>
              </div>
            </div>

            <div className="col wrap">
              <MyTitle Tag={"h4"}>Информация по датам</MyTitle>
              <div className="row gap50 mt10">
                <div className="col">
                  <MyText className={style.title}>Дата релиза</MyText>
                  <MyText className={style.value}>
                    {dateFormatter(releaseData.releaseDate)}
                  </MyText>
                </div>

                <div className="col">
                  <MyText className={style.title}>Дата старта</MyText>
                  <MyText className={style.value}>
                    {dateFormatter(releaseData.startDate)}
                  </MyText>
                </div>

                <div className="col">
                  <MyText className={style.title}>Дата предзаказа</MyText>
                  <MyText className={style.value}>
                    {dateFormatter(releaseData.preorderDate)}
                  </MyText>
                </div>
              </div>
            </div>

            <div className="col wrap">
              <MyTitle Tag={"h4"}>Информация по площадкам</MyTitle>
              <div className="row gap50 mt10">
                <div className="col">
                  <MyText className={style.title}>Площадки для релиза</MyText>
                  <MyText className={style.value}>{platforms}</MyText>
                </div>
              </div>
            </div>

            <div className="col wrap">
              <MyTitle Tag={"h4"}>Территории</MyTitle>
              <div className="row gap50 mt10">
                <div className="col">
                  <MyText className={style.title}>
                    Территории распространения для релиза
                  </MyText>
                  <MyText className={style.value}>
                    {areas.data.join(" ")}
                  </MyText>
                </div>
              </div>
            </div>

            <div className="col">
              <MyTitle Tag={"h2"}>
                Подробная информация по каждому треку
              </MyTitle>
              <div className="col gap20 mt20">
                {releaseData.tracks &&
                  releaseData.tracks.map((e) => {
                    let roles = z
                      .object({
                        person: z.string(),
                        role: z.string(),
                      })
                      .array()
                      .parse(e.roles ?? []);

                    return (
                      <div key={e.id} className="wrap col gap30">
                        <div className="col">
                          <MyTitle Tag={"h4"}>Основная информация</MyTitle>
                          <div className="row gap50 mt10">
                            <div className="col">
                              <MyText className={style.title}>
                                Название трека
                              </MyText>
                              <MyText className={style.value}>{e.title}</MyText>
                            </div>
                            <div className="col">
                              <MyText className={style.title}>
                                Подзаголовок трека
                              </MyText>
                              <MyText className={style.value}>
                                {e.subtitle ? (
                                  e.subtitle
                                ) : (
                                  <span className={style.warning}>
                                    Информация отсутствует
                                  </span>
                                )}
                              </MyText>
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <MyTitle Tag={"h4"}>
                            Ссылка на скачивание трека
                          </MyTitle>
                          <div className="col mt10">
                            <MyText className={style.title}>Ссылка</MyText>
                            {/* <Link
                              href={`${process.env.NEXT_PUBLIC_S3_URL}/tracks/${e.id}.${e.track}`}
                              download={`${e.title}.${e.track}`}
                              className={style.link}
                              prefetch={false}
                            >
                              Файл
                            </Link> */}
                            <DownloadButton
                              type="button"
                              src={`${process.env.NEXT_PUBLIC_S3_URL}/tracks/${e.id}.${e.track}`}
                              fileName={`${e.title}.${e.track}`}
                              className={style.link}
                            />
                          </div>
                        </div>

                        <div className="col">
                          <MyTitle Tag={"h4"}>Идентификация</MyTitle>
                          <div className="row gap50 mt10">
                            <div className="col">
                              <MyText className={style.title}>ISRC</MyText>
                              <MyText className={style.value}>
                                {e.isrc ? (
                                  e.isrc
                                ) : (
                                  <span className={style.warning}>
                                    Информация отсутствует
                                  </span>
                                )}
                              </MyText>
                            </div>
                            <div className="col">
                              <MyText className={style.title}>
                                Код партнера
                              </MyText>
                              <MyText className={style.value}>
                                {e.partner_code ? (
                                  e.partner_code
                                ) : (
                                  <span className={style.warning}>
                                    Информация отсутствует
                                  </span>
                                )}
                              </MyText>
                            </div>
                          </div>
                        </div>

                        <div className="col">
                          <MyTitle Tag={"h4"}>Персоны и роли</MyTitle>
                          <div className="row gap50 mt10">
                            <div className="col">
                              {roles.length == 0 && (
                                <MyText className={style.value}>
                                  <span className={style.warning}>
                                    Информация отсутствует
                                  </span>
                                </MyText>
                              )}
                              {roles.length > 0 && (
                                <MyText className={style.title}>
                                  Перечень персон
                                </MyText>
                              )}
                              {roles.map((r) => (
                                <MyText key={r.person} className={style.value}>
                                  {r.person} - {r.role}
                                </MyText>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="col">
                          <MyTitle Tag={"h4"}>Права</MyTitle>
                          <div className="row gap50 mt10">
                            <div className="col">
                              <MyText className={style.title}>
                                Авторские права
                              </MyText>
                              <MyText className={style.value}>
                                {e.author_rights}
                              </MyText>
                            </div>
                            <div className="col">
                              <MyText className={style.title}>
                                Смежные права
                              </MyText>
                              <MyText className={style.value}>100</MyText>
                            </div>
                          </div>
                        </div>

                        <div className="col">
                          <MyTitle Tag={"h4"}>Дополнительные параметры</MyTitle>
                          <div className="row gap50 mt10">
                            <div className="col">
                              <MyText className={style.title}>
                                Начало предпрослушивания (секунды)
                              </MyText>
                              <MyText className={style.value}>
                                {e.preview_start}
                              </MyText>
                            </div>

                            <div className="col">
                              <MyText className={style.title}>
                                Instant Gratification
                              </MyText>
                              {e.instant_gratification ? (
                                <MyText className={style.value}>
                                  {dateFormatter(e.instant_gratification)}
                                </MyText>
                              ) : (
                                <MyText className={style.value}>
                                  <span className={style.warning}>
                                    Информация отсутствует
                                  </span>
                                </MyText>
                              )}
                            </div>

                            <div className="col">
                              <MyText className={style.title}>
                                Focus track
                              </MyText>
                              {e.focus ? (
                                <MyText className={style.value}>Да</MyText>
                              ) : (
                                <MyText className={style.value}>
                                  <span className={style.warning}>
                                    Информация отсутствует
                                  </span>
                                </MyText>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="col">
                          <MyTitle Tag={"h4"}>Версия трека</MyTitle>
                          <div className="row gap50 mt10">
                            <div className="col">
                              <MyText className={style.title}>
                                Explicit Content
                              </MyText>
                              <MyText className={style.value}>
                                {e.explicit ? "Да" : "Нет"}
                              </MyText>
                            </div>

                            <div className="col">
                              <MyText className={style.title}>Live</MyText>
                              <MyText className={style.value}>
                                {e.live ? "Да" : "Нет"}
                              </MyText>
                            </div>

                            <div className="col">
                              <MyText className={style.title}>Cover</MyText>
                              <MyText className={style.value}>
                                {e.cover ? "Да" : "Нет"}
                              </MyText>
                            </div>

                            <div className="col">
                              <MyText className={style.title}>Remix</MyText>
                              <MyText className={style.value}>
                                {e.remix ? "Да" : "Нет"}
                              </MyText>
                            </div>

                            <div className="col">
                              <MyText className={style.title}>
                                Instrumental
                              </MyText>
                              <MyText className={style.value}>
                                {e.instrumental ? "Да" : "Нет"}
                              </MyText>
                            </div>
                          </div>
                        </div>

                        <div className="col">
                          <MyTitle Tag={"h4"}>Виды использования</MyTitle>
                          <div className="row  mt10">
                            <div className="col">
                              <MyText className={style.title}>
                                Язык трека
                              </MyText>
                              <MyText className={style.value}>
                                {e.language}
                              </MyText>
                            </div>
                          </div>

                          <div className="row  mt10">
                            <div className="col">
                              <MyText className={style.title}>
                                Текст трека
                              </MyText>
                              <MyText className={style.value}>
                                {e.text ? (
                                  e.text
                                ) : (
                                  <span className={style.warning}>
                                    Информация отсутствует
                                  </span>
                                )}
                              </MyText>
                            </div>
                          </div>

                          <div className="row  mt10">
                            <div className="col">
                              <MyText className={style.title}>
                                Синхронизированный текст трека
                              </MyText>
                              <MyText className={style.value}>
                                {e.text_sync ? (
                                  <Link
                                    href={`${process.env.NEXT_PUBLIC_S3_URL}/syncs/${releaseData.id}.${e.text_sync}`}
                                    download
                                    className={style.link}
                                    prefetch={false}
                                  >
                                    Файл
                                  </Link>
                                ) : (
                                  <span className={style.warning}>
                                    Информация отсутствует
                                  </span>
                                )}
                              </MyText>
                            </div>
                          </div>

                          <div className="row  mt10">
                            <div className="col">
                              <MyText className={style.title}>Рингтон</MyText>
                              <MyText className={style.value}>
                                {e.ringtone ? (
                                  <Link
                                    href={`${process.env.NEXT_PUBLIC_S3_URL}/ringtones/${releaseData.id}.${e.ringtone}`}
                                    download
                                    className={style.link}
                                    prefetch={false}
                                  >
                                    Файл
                                  </Link>
                                ) : (
                                  <span className={style.warning}>
                                    Информация отсутствует
                                  </span>
                                )}
                              </MyText>
                            </div>
                          </div>

                          <div className="row  mt10">
                            <div className="col">
                              <MyText className={style.title}>
                                Видео к треку
                              </MyText>
                              <MyText className={style.value}>
                                {e.video ? (
                                  <Link
                                    href={`${process.env.NEXT_PUBLIC_S3_URL}/videos/${releaseData.id}.${e.video}`}
                                    download
                                    className={style.link}
                                    prefetch={false}
                                  >
                                    Файл
                                  </Link>
                                ) : (
                                  <span className={style.warning}>
                                    Информация отсутствует
                                  </span>
                                )}
                              </MyText>
                            </div>
                          </div>

                          <div className="row  mt10">
                            <div className="col">
                              <MyText className={style.title}>Видео-шот</MyText>
                              <MyText className={style.value}>
                                {e.video ? (
                                  <Link
                                    href={`${process.env.NEXT_PUBLIC_S3_URL}/videoshots/${releaseData.id}.${e.video_shot}`}
                                    download
                                    className={style.link}
                                    prefetch={false}
                                  >
                                    Файл
                                  </Link>
                                ) : (
                                  <span className={style.warning}>
                                    Информация отсутствует
                                  </span>
                                )}
                              </MyText>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
