"use client";

import classNames from "classnames";
import { PropsWithChildren, useState } from "react";
import style from "./TrackAccordion.module.css";

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

      <div className={classNames(style.detail, { [style.open]: showDetails })}>
        {children}
      </div>
    </div>
  );
}
