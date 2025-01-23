"use client";
import { TRelease, TTrack } from "@/schema/release.schema";
import MyText from "@/shared/MyText/MyText";
import dateFormatter from "@/utils/dateFormatter";
import classNames from "classnames";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import style from "./RelizeItem.module.css";

export type TReleaseItem = {
  release: TRelease & { tracks: TTrack[] };
};

const ReleaseItem = ({ release, ...props }: TReleaseItem) => {
  const [showTracks, setShowTracks] = useState<boolean>(false);

  return (
    <div className={style.wrapper} {...props}>
      <div className={style.top}>
        <Image
          className={style.preview}
          alt="Превью"
          src={`${process.env.NEXT_PUBLIC_S3_URL}/previews/${release?.id}.${release?.preview}`}
          height={90}
          width={90}
          unoptimized
        />
        <div className={style.top__info}>
          <div>
            <MyText className={style.title}>{release?.title}</MyText>
            {/* <MyText className={style.value}>{artistsName}</MyText> */}
          </div>

          <div className={style.top__info_down}>
            {release?.labelName && (
              <div>
                <MyText className={style.title}>Название лейбла</MyText>
                <MyText className={style.value}>{release?.labelName}</MyText>
              </div>
            )}
          </div>
        </div>
        <div className={style.status}>
          <div
            className={classNames(style.point, {
              [style.green]: release?.status === "approved",
              [style.red]: release?.status === "rejected",
              [style.blue]: release?.status === "moderating",
            })}
          ></div>
          <MyText className={style.statusTitle}>
            {release?.status === "moderating"
              ? "На модерации"
              : release?.status === "approved"
              ? "Одобрен"
              : "Отказано"}
          </MyText>
        </div>
      </div>
      <div className={style.body}>
        <div>
          <MyText className={style.title}>Дата релиза</MyText>
          <MyText className={style.value}>
            {dateFormatter(new Date(release.releaseDate))}
          </MyText>
        </div>
        <div>
          <MyText className={style.title}>Дата старта</MyText>
          <MyText className={style.value}>
            {dateFormatter(new Date(release.startDate))}
          </MyText>
        </div>
        <div>
          <MyText className={style.title}>Тип релиза</MyText>
          <MyText className={style.value}>{release.type}</MyText>
        </div>
        <div>
          <MyText className={style.title}>Жанр</MyText>
          <MyText className={style.value}>{release.genre}</MyText>
        </div>
        {release.upc && (
          <div>
            <MyText className={style.title}>UPC</MyText>
            <MyText className={style.value}>{release.upc}</MyText>
          </div>
        )}

        <div>
          <MyText className={style.title}>Статус оплаты</MyText>
          <MyText className={style.value}>
            {release.confirmed ? "Оплачено" : "Не оплачено"}
          </MyText>
        </div>
      </div>
      <div className={style.bottom}>
        {release.moderatorComment && (
          <div>
            <MyText className={style.title}>Комментарий от модератора:</MyText>
            <MyText className={style.value}>{release.moderatorComment}</MyText>
          </div>
        )}
      </div>
      {!release.confirmed && (
        <Link
          className={classNames("linkButton", style.linkToPay)}
          href={`/purchase/release/${release.id}`}
        >
          Оплатить
        </Link>
      )}
      <Link
        className={classNames("linkButton", style.linkToEdit)}
        href={`/dashboard/edit/${release.id}`}
      >
        Редактировать
      </Link>

      <div
        className="row gap10 pointer fs14 mt20 pb20"
        onClick={() => setShowTracks(!showTracks)}
      >
        <IoIosArrowForward />
        <p>Список треков</p>
      </div>
      {showTracks && (
        <motion.div className={style.tracks}>
          {release.tracks.map((track) => {
            return (
              <div className={style.track} key={track.id}>
                <MyText className={style.trackTitle}>{track.title}</MyText>
                <audio
                  className="audio"
                  src={`${process.env.NEXT_PUBLIC_S3_URL}/tracks/${track.id}.${track.track}`}
                  controls
                ></audio>
              </div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
};
export default ReleaseItem;
