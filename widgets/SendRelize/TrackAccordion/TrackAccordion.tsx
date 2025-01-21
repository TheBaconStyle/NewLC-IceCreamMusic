"use client";

import classNames from "classnames";
import { PropsWithChildren, useState } from "react";
import style from "./TrackAccordion.module.css";
import { motion } from "framer-motion";
import { TTrackForm } from "@/schema/release.schema";
import { AudioPlayer } from "@/widgets/AudioPlayer/AudioPlayer";

export type TTrackAccordion = {
  track: TTrackForm;
};

export function TrackAccordion({
  track,
  children,
}: PropsWithChildren<TTrackAccordion>) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className={style.wrap}>
        <div className={style.header}>
          <div
            className={style.wrapArrow}
            onClick={() => setShowDetails(!showDetails)}
          >
            <div
              className={classNames(style.arrow, {
                [style.arrow_open]: showDetails,
              })}
            />
          </div>
          {track.track.name}
          <audio
            //TODO: Сделать ссылку!!!!!!!!!!!!!!!!!!!!!!!!
            src={""}
            // URL.createObjectURL(track.track)
            controls
            className="audio pr50"
          />
          <div>Play</div>
        </div>

        <motion.div
          className={style.detail}
          initial={{
            height: 0,
            marginTop: 0,
            y: 0,
          }}
          animate={{
            height: showDetails ? "auto" : 0,
            marginTop: showDetails ? "30px" : 0,
          }}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}
