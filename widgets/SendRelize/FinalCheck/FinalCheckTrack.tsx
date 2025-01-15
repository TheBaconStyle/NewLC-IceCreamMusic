import { TTrackForm } from "@/schema/release.schema";
import dateFormatter from "@/utils/dateFormatter";
import classNames from "classnames";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import style from "../TrackAccordion/TrackAccordion.module.css";

export type TFinalCheckTrack = {
  track: TTrackForm;
};

export default function FinalCheckTrack({ track }: TFinalCheckTrack) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="wrap" key={track.title}>
      <div className="row between mb20">
        <p className="styleValue ">
          {track.title}
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
        src={URL.createObjectURL(track.track)}
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

            {track.author_rights && (
              <p className="styleValue fs14">
                Авторские права: <br />
                <span className="styleTitle">{track.author_rights}</span>
              </p>
            )}

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
          {track.roles.length > 0 && (
            <div className="row gap20">
              <p className="styleValue fs14">
                Персоны и роли: <br />
                {track.roles.map((p) => (
                  <>
                    <span className="styleTitle">
                      {p.person}-{p.role}
                    </span>
                    <br />
                  </>
                ))}
              </p>
            </div>
          )}

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
            {track.text_sync && (
              <p className="styleValue fs14">
                Синхронзация текста: <br />
                Скачать:{" "}
                <Link
                  href={URL.createObjectURL(track.text_sync)}
                  prefetch={false}
                  download={track.text_sync.name}
                >
                  {track.text_sync.name}
                </Link>
              </p>
            )}
            {track.ringtone && (
              <p className="styleValue fs14">
                Рингтон: <br />
                Скачать:{" "}
                <Link
                  href={URL.createObjectURL(track.ringtone)}
                  prefetch={false}
                  download={track.ringtone.name}
                >
                  {track.ringtone.name}
                </Link>
              </p>
            )}
            {track.video && (
              <p className="styleValue fs14">
                Видео к треку: <br />
                Скачать:{" "}
                <Link
                  href={URL.createObjectURL(track.video)}
                  prefetch={false}
                  download={track.video.name}
                >
                  {track.video.name}
                </Link>
              </p>
            )}
            {track.video_shot && (
              <p className="styleValue fs14">
                Видео-шот: <br />
                Скачать:{" "}
                <Link
                  href={URL.createObjectURL(track.video_shot)}
                  prefetch={false}
                  download={true}
                >
                  {track.video_shot.name}
                </Link>
              </p>
            )}
          </div>

          {track.language && (
            <p className="styleValue fs14">
              Язык трека: <br />
              <span className="styleTitle">{track.language}</span>
            </p>
          )}
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
