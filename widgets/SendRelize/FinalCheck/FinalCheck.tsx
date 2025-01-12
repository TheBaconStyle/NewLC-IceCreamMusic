import Image from "next/image";
import { TReleaseForm } from "@/schema/release.schema";
import MyTitle from "@/shared/MyTitle/MyTitle";
import { allGenres } from "@/helpers/allGenres";
import dateFormatter from "@/utils/dateFormatter";

export type TFinalCheck = {
  release: TReleaseForm;
};

export default function FinalCheck({ release }: TFinalCheck) {
  return (
    <>
      <div className="wrap col">
        <div className="row gap30 itemsStart">
          {release.preview && (
            <Image
              src={URL.createObjectURL(release.preview)}
              alt={"Превью "}
              width={200}
              height={200}
            />
          )}
          <div className="col gap20 itemsStart">
            <div>
              <MyTitle Tag={"h2"} className="fs18">
                Общая информация
              </MyTitle>
              <div className="row gap50 mt10 ">
                {(release.title || release.subtitle) && (
                  <p className="styleValue fs14">
                    Название: <br />
                    {release.title}
                    {release.subtitle && (
                      <span className="styleTitle"> - {release.subtitle}</span>
                    )}
                  </p>
                )}
                {release.labelName && (
                  <p className="styleValue fs14">
                    Лейбл:
                    <br />{" "}
                    <span className="styleTitle">{release.labelName}</span>
                  </p>
                )}
                {release.type && (
                  <p className="styleValue fs14">
                    Тип релиза:
                    <br /> <span className="styleTitle">{release.type}</span>
                  </p>
                )}
                {release.genre && (
                  <p className="styleValue fs14">
                    Жанр: <br />
                    <span className="styleTitle">
                      {
                        allGenres.find((e) => {
                          return e.value == release.genre;
                        })?.label
                      }
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div>
              <MyTitle Tag={"h2"} className="fs18">
                Персоны и роли
              </MyTitle>
              <div className="row gap50 mt10 ">
                {release.performer && (
                  <p className="styleValue fs14">
                    Исполнитель: <br />
                    <span className="styleTitle">{release.performer}</span>
                  </p>
                )}
                {release.feat && (
                  <p className="styleValue fs14">
                    Лица Feat: <br />
                    <span className="styleTitle">{release.feat}</span>
                  </p>
                )}
                {release.remixer && (
                  <p className="styleValue fs14">
                    Лица Remixer: <br />
                    <span className="styleTitle">{release.remixer}</span>
                  </p>
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
                  <span className="styleTitle">{release.language}</span>
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
                      <>???</>
                    )}
                  </span>
                </p>
                <p className="styleValue">
                  Дата старта: <br />
                  <span className="styleTitle">
                    {release.startDate ? (
                      dateFormatter(new Date(release.startDate))
                    ) : (
                      <>???</>
                    )}
                  </span>
                </p>

                <p className="styleValue">
                  Дата предзаказа: <br />
                  <span className="styleTitle">
                    {release.preorderDate ? (
                      dateFormatter(new Date(release.preorderDate))
                    ) : (
                      <>???</>
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
                    {release.area.negate && <>Во всех кроме: </>}
                    {release.area.data.length == 1 ? (
                      release.area.data[0] === "all" ? (
                        <>Во всех странах</>
                      ) : (
                        <>В странах снг</>
                      )
                    ) : (
                      release.area.data.join(", ")
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
                    {release.platforms.length == 1 ? (
                      <>На всех площадках</>
                    ) : (
                      release.platforms.join(", ")
                    )}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wrap">asd</div>
    </>
  );
}
