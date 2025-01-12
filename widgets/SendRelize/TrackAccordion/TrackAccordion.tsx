"use client";

import classNames from "classnames";
import { PropsWithChildren, useState } from "react";
import style from "./TrackAccordion.module.css";
import { motion } from "framer-motion";

export type TTrackAccordion = {
  trackName: string;
};

export function TrackAccordion({
  trackName,
  children,
}: PropsWithChildren<TTrackAccordion>) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={style.wrap}>
      <div
        className={style.header}
        onClick={() => setShowDetails(!showDetails)}
      >
        <div
          className={classNames(style.arrow, {
            [style.arrow_open]: showDetails,
          })}
        />
        {trackName}
      </div>

      <motion.div
        className={style.detail}
        animate={{
          height: showDetails ? "auto" : 0,
          marginTop: showDetails ? "30px" : 0,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
