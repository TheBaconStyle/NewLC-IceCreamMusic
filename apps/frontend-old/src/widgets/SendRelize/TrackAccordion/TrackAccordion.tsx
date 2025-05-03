"use client";

import {
  TReleaseInsertForm,
  TReleaseUpdateForm,
  TTrackInsertForm,
} from "@/schema/release.schema";
import classNames from "classnames";
import { motion } from "framer-motion";
import { PropsWithChildren, useMemo, useState } from "react";
import style from "./TrackAccordion.module.css";
import { useFormContext } from "react-hook-form";

export type TTrackAccordion = {
  trackIndex: number;
  s3_url?: string;
};

export function TrackAccordion({
  trackIndex,
  children,
  s3_url,
}: PropsWithChildren<TTrackAccordion>) {
  const [showDetails, setShowDetails] = useState(false);

  const { watch } = useFormContext<TReleaseInsertForm | TReleaseUpdateForm>();

  const trackData = watch(`tracks.${trackIndex}`);

  const trackSrc = useMemo(
    () =>
      trackData.track instanceof File
        ? URL.createObjectURL(trackData.track)
        : `${s3_url}/tracks/${
            (trackData as TReleaseUpdateForm["tracks"][number]).trackId
          }.${trackData.track}`,
    [trackData, s3_url]
  );

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
          {trackData.track instanceof File
            ? trackData.track.name
            : `${trackData.title}.${trackData.track}`}
          <audio src={trackSrc} controls className="audio pr50" />
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
