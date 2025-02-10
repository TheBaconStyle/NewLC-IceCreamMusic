"use client";

import { trackPossibleLanguages } from "@/shared/model/helpers/allLanguages";
import {
  TTrackInsertForm,
  TTrackUpdateForm,
} from "@/shared/model/schema/release.schema";
import dateFormatter from "@/shared/model/utils/dateFormatter";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useState } from "react";
import { DownloadButton } from "../../DownloadButton/DownloadButton";
import style from "../TrackAccordion/TrackAccordion.module.css";

export type TFinalCheckTrack = {
  track: TTrackInsertForm | TTrackUpdateForm;
  s3_url: string;
};

export default function FinalCheckTrack({ track, s3_url }: TFinalCheckTrack) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="wrap" key={track.title}>
      <div className="row between mb20">
        <p className="styleValue ">
          {track.title ? (
            track.title
          ) : (
            <span className="styleTitle warningUnderline">
              Не указано название трека
            </span>
          )}
          {track.subtitle && (
            <span className="styleTitle">- {track.subtitle}</span>
          )}
        </p>
        <div
          className={style.wrapArrow}
          onClick={() => setShowDetail(!showDetail)}
        >
          <div
            className={classNames(style.arrow, {
              [style.arrow_open]: showDetail,
            })}
          />
        </div>
      </div>
      <audio
        src={
          track.track instanceof File
            ? URL.createObjectURL(track.track)
            : `${s3_url}/tracks/${(track as TTrackUpdateForm).trackId}.${
                track.track
              }`
        }
        controls
        className="audio"
      ></audio>

      {
        <motion.div
          animate={{ height: showDetail ? "auto" : "0" }}
          initial={{ height: 0 }}
          key={track.title}
          className="overHidden col gap20"
        >
          <div className="row gap20 pt20">
            {track.isrc && (
              <p className="styleValue fs14">
                ISRC: <br />
                <span className="styleTitle">{track.isrc}</span>
              </p>
            )}
            {track.partner_code && (
              <p className="styleValue fs14">
                Код партнера: <br />
                <span className="styleTitle">{track.partner_code}</span>
              </p>
            )}

            <p className="styleValue fs14">
              Авторские права: <br />
              <span className="styleTitle">
                {track.author_rights ? (
                  track.author_rights
                ) : (
                  <span className="styleTitle warningUnderline">
                    Не указаны авторские права
                  </span>
                )}
              </span>
            </p>

            <p className="styleValue fs14">
              Смежные права: <br />
              <span className="styleTitle">100</span>
            </p>

            <p className="styleValue fs14">
              Начало прослушвания: <br />
              <span className="styleTitle">
                {track.preview_start.length ? track.preview_start : "00:00"}
              </span>
            </p>
          </div>

          <div className="row gap20">
            <p className="styleValue fs14">
              Персоны и роли: <br />
              {track.roles.length > 0 && (
                <>
                  {track.roles.map((p) => (
                    <>
                      <span className="styleTitle">
                        {p.person ? (
                          p.person
                        ) : (
                          <span className="styleTitle warningUnderline">
                            Информация о персоне отсутствует
                          </span>
                        )}
                        -
                        {p.role ? (
                          p.role
                        ) : (
                          <span className="styleTitle warningUnderline">
                            Информация о роли персоны отсутствует
                          </span>
                        )}
                      </span>
                      <br />
                    </>
                  ))}
                </>
              )}
              {!track.roles.map((r) => r.role).includes("Исполнитель") && (
                <p className="styleTitle warningUnderline">
                  Не указаны данные об исполнителе
                </p>
              )}
              {!track.roles.map((r) => r.role).includes("Автор слов") && (
                <p className="styleTitle warningUnderline">
                  Не указаны данные об авторе слов
                </p>
              )}
              {!track.roles.map((r) => r.role).includes("Автор музыки") && (
                <p className="styleTitle warningUnderline">
                  Не указаны данные об авторе музыки
                </p>
              )}
            </p>
          </div>

          <div className="row gap20">
            {track.instant_gratification && (
              <p className="styleValue fs14">
                Instant Gratification: <br />
                <span className="styleTitle">
                  {dateFormatter(new Date(track.instant_gratification))}
                </span>
              </p>
            )}
            {track.focus && (
              <p className="styleValue fs14">
                Focus Track: <br />
                <span className="styleTitle">{track.focus && "Да"}</span>
              </p>
            )}
            {track.explicit && (
              <p className="styleValue fs14">
                Explicit Content: <br />
                <span className="styleTitle">{track.explicit && "Да"}</span>
              </p>
            )}
            {track.live && (
              <p className="styleValue fs14">
                Live: <br />
                <span className="styleTitle">{track.live && "Да"}</span>
              </p>
            )}
            {track.cover && (
              <p className="styleValue fs14">
                Cover: <br />
                <span className="styleTitle">{track.cover && "Да"}</span>
              </p>
            )}
            {track.remix && (
              <p className="styleValue fs14">
                Remix: <br />
                <span className="styleTitle">{track.remix && "Да"}</span>
              </p>
            )}
            {track.instrumental && (
              <p className="styleValue fs14">
                Instrumental: <br />
                <span className="styleTitle">{track.instrumental && "Да"}</span>
              </p>
            )}
          </div>

          <div className="row gap">
            {track.text_sync && (
              <p className="styleValue fs14">
                Синхронзация текста: <br />
                <DownloadButton
                  src={
                    track.text_sync instanceof File
                      ? URL.createObjectURL(track.text_sync)
                      : `${s3_url}/syncs/${
                          (track as TTrackUpdateForm).trackId
                        }.${track.text_sync}`
                  }
                  fileName={
                    track.text_sync instanceof File
                      ? track.text_sync.name
                      : `${(track as TTrackUpdateForm).trackId}.${
                          track.text_sync
                        }`
                  }
                />
              </p>
            )}
            {track.ringtone && (
              <p className="styleValue fs14">
                Рингтон: <br />
                <DownloadButton
                  src={
                    track.ringtone instanceof File
                      ? URL.createObjectURL(track.ringtone)
                      : `${s3_url}/ringtones/${
                          (track as TTrackUpdateForm).trackId
                        }.${track.ringtone}`
                  }
                  fileName={
                    track.ringtone instanceof File
                      ? track.ringtone.name
                      : `${(track as TTrackUpdateForm).trackId}.${
                          track.ringtone
                        }`
                  }
                />
              </p>
            )}
            {track.video && (
              <p className="styleValue fs14">
                Видео к треку: <br />
                <DownloadButton
                  src={
                    track.video instanceof File
                      ? URL.createObjectURL(track.video)
                      : `${s3_url}/ringtones/${
                          (track as TTrackUpdateForm).trackId
                        }.${track.video}`
                  }
                  fileName={
                    track.video instanceof File
                      ? track.video.name
                      : `${(track as TTrackUpdateForm).trackId}.${track.video}`
                  }
                />
              </p>
            )}
            {track.video_shot && (
              <p className="styleValue fs14">
                Видео-шот: <br />
                <DownloadButton
                  src={
                    track.video_shot instanceof File
                      ? URL.createObjectURL(track.video_shot)
                      : `${s3_url}/ringtones/${
                          (track as TTrackUpdateForm).trackId
                        }.${track.video_shot}`
                  }
                  fileName={
                    track.video_shot instanceof File
                      ? track.video_shot.name
                      : `${(track as TTrackUpdateForm).trackId}.${
                          track.video_shot
                        }`
                  }
                />
              </p>
            )}
          </div>
          <p className="styleValue fs14">
            Язык трека: <br />
            <span className="styleTitle">
              {typeof track.language === "string" ? (
                trackPossibleLanguages.find((e) => e.value == track.language)
                  ?.label
              ) : (
                <span className="styleTitle warningUnderline">
                  Не указаны данные о языке
                </span>
              )}
            </span>
          </p>

          {track.text && (
            <pre className="styleValue fs14">
              Текст трека: <br />
              <span className="styleTitle">{track.text}</span>
            </pre>
          )}
        </motion.div>
      }
    </div>
  );
}
