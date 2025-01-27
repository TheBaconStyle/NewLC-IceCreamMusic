import { allGenres } from "@/helpers/allGenres";
import { allLanguages } from "@/helpers/allLanguages";
import {
  TReleaseInsertForm,
  TReleaseUpdateForm,
} from "@/schema/release.schema";
import MyTitle from "@/shared/MyTitle/MyTitle";
import dateFormatter from "@/utils/dateFormatter";
import Image from "next/image";
import FinalCheckTrack from "./FinalCheckTrack";

export type TFinalCheck = {
  release: TReleaseUpdateForm | TReleaseInsertForm;
};

export default function FinalCheck({ release }: TFinalCheck) {
  return (
    <div className="col gap20 mb20">
      <div className="wrap col">
        <div className="row gap30 itemsStart">
          {!!release.preview ? (
            <Image
              src={
                release.preview instanceof File
                  ? URL.createObjectURL(release.preview)
                  : `${process.env.NEXT_PUBLIC_S3_URL}/previews/${
                      (release as TReleaseUpdateForm).id
                    }.${release.preview}`
              }
              alt={"Превью"}
              width={225}
              height={225}
              className="oFit round15"
            />
          ) : (
            <div className={"noPhoto styleTitle warningUnderline"}>
              Обложка отсутствует
            </div>
          )}

          <div className="col gap20 itemsStart">
            <div>
              <MyTitle Tag={"h2"} className="fs18">
                Общая информация
              </MyTitle>
              <div className="row gap50 mt10 itemsStart">
                <p className="styleValue fs14">
                  Название: <br />
                  {release.title ? (
                    release.title
                  ) : (
                    <span className="warningUnderline">
                      Название трека отсутствует
                    </span>
                  )}
                  {release.subtitle && (
                    <span className="styleTitle"> - {release.subtitle}</span>
                  )}
                </p>

                {release.labelName && (
                  <p className="styleValue fs14">
                    Лейбл:
                    <br />{" "}
                    <span className="styleTitle">{release.labelName}</span>
                  </p>
                )}

                <p className="styleValue fs14">
                  Тип релиза:
                  <br />{" "}
                  <span className="styleTitle">
                    {release.type ? (
                      release.type
                    ) : (
                      <span className="warningUnderline">
                        Информация о типе релиза отсутствует
                      </span>
                    )}
                  </span>
                </p>

                <p className="styleValue fs14">
                  Жанр: <br />
                  <span className="styleTitle">
                    {release.genre ? (
                      allGenres.find((e) => {
                        return e.value == release.genre;
                      })?.label
                    ) : (
                      <span className="warningUnderline">
                        Информация о жанре отсутствует
                      </span>
                    )}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <MyTitle Tag={"h2"} className="fs18">
                Персоны и роли
              </MyTitle>
              <div className="col mt10 ">
                {release.roles && release.roles.length > 0 ? (
                  release.roles.map((e, index) => (
                    <p className="styleValue fs14" key={index}>
                      {e.person ? (
                        e.person
                      ) : (
                        <span className="styleTitle warningUnderline">
                          Информация о персоне отсутствует
                        </span>
                      )}{" "}
                      -{" "}
                      <span className="styleTitle">
                        {e.role ? (
                          e.role
                        ) : (
                          <span className="styleTitle warningUnderline">
                            Информация о роли персоны отсутствует
                          </span>
                        )}
                      </span>
                    </p>
                  ))
                ) : (
                  <span className="styleTitle warningUnderline">
                    Информация о персонах альбома отсутствует
                  </span>
                )}
              </div>
            </div>

            <div>
              <MyTitle Tag={"h2"} className="fs18">
                Дополнительная информация
              </MyTitle>
              <div className="row gap50 mt10 ">
                <p className="styleValue">
                  Язык метаданных: <br />
                  <span className="styleTitle">
                    {release.language ? (
                      allLanguages.find((e) => e.value == release.language)
                        ?.label
                    ) : (
                      <span className="styleTitle warningUnderline">
                        Язык метаданных отсутствует
                      </span>
                    )}
                  </span>
                </p>
                {release.upc && (
                  <p className="styleValue">
                    UPC: <br />
                    <span className="styleTitle">{release.upc}</span>
                  </p>
                )}
              </div>
            </div>

            <div>
              <MyTitle Tag={"h2"} className="fs18">
                Даты
              </MyTitle>
              <div className="row gap50 mt10 ">
                <p className="styleValue">
                  Дата релиза: <br />
                  <span className="styleTitle">
                    {release.releaseDate ? (
                      dateFormatter(new Date(release.releaseDate))
                    ) : (
                      <span className="styleTitle warningUnderline">
                        Информация о дате релиза отсутствует
                      </span>
                    )}
                  </span>
                </p>
                <p className="styleValue">
                  Дата старта: <br />
                  <span className="styleTitle">
                    {release.startDate ? (
                      dateFormatter(new Date(release.startDate))
                    ) : (
                      <span className="styleTitle warningUnderline">
                        Информация о дате старта отсутствует
                      </span>
                    )}
                  </span>
                </p>

                <p className="styleValue">
                  Дата предзаказа: <br />
                  <span className="styleTitle">
                    {release.preorderDate ? (
                      dateFormatter(new Date(release.preorderDate))
                    ) : (
                      <span className="styleTitle warningUnderline">
                        Информация о дате предзаказа отсутствует
                      </span>
                    )}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <MyTitle Tag={"h2"} className="fs18">
                Территории
              </MyTitle>
              <div className="row gap50 mt10 ">
                <p className="styleValue">
                  Страны распространения релиза:
                  <br />
                  <span className="styleTitle">
                    {Array.isArray(release.area?.data) && (
                      <>
                        {release.area?.negate && <>Во всех кроме: </>}
                        {release.area.data[0] === "all" && <>Все страны</>}
                        {release.area.data[0] === "sng" && <>В странах СНГ</>}
                        {release.area.data.length > 0 ? (
                          release.area.data[0] !== "sng" &&
                          release.area.data[0] !== "all" &&
                          release.area.data.join(", ")
                        ) : (
                          <span className="styleTitle warningUnderline">
                            Не указаны страны
                          </span>
                        )}
                      </>
                    )}

                    {!Array.isArray(release.area?.data) && (
                      <span className="styleTitle warningUnderline">
                        Информация о странах распространения отсутствует
                      </span>
                    )}
                  </span>
                </p>
              </div>
            </div>

            <div>
              <MyTitle Tag={"h2"} className="fs18">
                Площадки
              </MyTitle>
              <div className="row gap50 mt10 ">
                <p className="styleValue">
                  Площадки распространения релиза:
                  <br />
                  <span className="styleTitle">
                    {Array.isArray(release.platforms) && (
                      <>
                        {release.platforms[0] === "all" && (
                          <>На всех площадках</>
                        )}
                        {release.platforms.length > 0 ? (
                          release.platforms?.join(", ")
                        ) : (
                          <span className="styleTitle warningUnderline">
                            Не указаны площалки
                          </span>
                        )}
                      </>
                    )}

                    {!Array.isArray(release.platforms) && (
                      <span className="styleTitle warningUnderline">
                        Информация о площадках распространения отсутствует
                      </span>
                    )}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {release.tracks.map((e, i) => (
        <FinalCheckTrack track={e} key={i} />
      ))}
    </div>
  );
}
