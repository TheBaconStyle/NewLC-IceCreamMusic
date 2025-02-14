"use client";

import { uploadRelease } from "@/actions/release/upload";
import { standardLabelName } from "@/shared/helpers/priceList";
import {
  releaseInsertFormSchema,
  TReleaseInsertForm,
  TReleaseInsert,
  TTrackInsert,
} from "shared/schema/release.schema";
import MyButton from "@/shared/MyButton/MyButton";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { motion } from "framer-motion";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ReleaseArea } from "../ReleaseDraft/ReleaseArea";
import { ReleaseDates } from "../ReleaseDraft/ReleaseDates";
import { ReleaseGeneralInfo } from "../ReleaseDraft/ReleaseGeneralInfo";
import { ReleaseGenre } from "../ReleaseDraft/ReleaseGenre";
import { ReleaseIdentification } from "../ReleaseDraft/ReleaseIdentification";
import { ReleaseModeratorComment } from "../ReleaseDraft/ReleaseModeratorComment";
import { ReleasePersons } from "../ReleaseDraft/ReleasePersons";
import { ReleasePlatforms } from "../ReleaseDraft/ReleasePlatform";
import { ReleaseTracks } from "../ReleaseDraft/ReleaseTracks";
import { ReleaseLabel } from "../ReleaseDraft/RleaseLabel";
import FinalCheck from "./FinalCheck/FinalCheck";
import trackRusificator, {
  releaseRussificator,
  type TReleaseFormTrimmed,
  TTrackFormTrimmed,
} from "./russificator";
import style from "./SendRelease.module.css";

export type TSendRelease = {
  release?: TReleaseInsertForm;
};

const SendRelease = () => {
  const formMethods = useForm<TReleaseInsertForm>({
    resolver: zodResolver(releaseInsertFormSchema),
    defaultValues: { labelName: standardLabelName, tracks: [] },
    progressive: true,
    mode: "all",
  });

  const { handleSubmit, watch } = formMethods;

  const releaseData = watch();

  const [isBlocked, setIsBlocked] = useState(false);

  const [tab, setTab] = useState(1);

  return (
    <div className={style["container"]}>
      <div className={style.lineTab}>
        <p
          onClick={() => setTab(1)}
          className={classNames(style.tab, { [style.tabActive]: tab == 1 })}
        >
          1
        </p>
        <p
          onClick={() => setTab(2)}
          className={classNames(style.tab, { [style.tabActive]: tab == 2 })}
        >
          2
        </p>
        <p
          onClick={() => setTab(3)}
          className={classNames(style.tab, { [style.tabActive]: tab == 3 })}
        >
          3
        </p>
      </div>
      <FormProvider {...formMethods}>
        <form
          className={style.form}
          onSubmit={handleSubmit(
            async (data) => {
              if (!isBlocked) {
                setIsBlocked(true);

                enqueueSnackbar({
                  variant: "info",
                  message: "Загружаем релиз. Подождите.",
                });

                enqueueSnackbar({
                  variant: "info",
                  message: "Скорость загрузки зависит от качества соединения.",
                });

                const { tracks, ...release } = data;

                const releaseFiles = new FormData();

                releaseFiles.set("preview", release.preview);

                const tracksFiles: FormData[] = [];

                const tracksData: TTrackInsert[] = [];

                tracks.forEach((track, index) => {
                  const trackFiles = new FormData();
                  trackFiles.set("track", track.track);
                  !!track.ringtone &&
                    trackFiles.set("ringtone", track.ringtone);
                  !!track.text_sync &&
                    trackFiles.set("text_sync", track.text_sync);
                  !!track.video && trackFiles.set("video", track.video);
                  !!track.video_shot &&
                    trackFiles.set("video_shot", track.video_shot);
                  const trackData: TTrackInsert = {
                    ...track,
                    track: track.track?.type.split("/")[1],
                    instant_gratification: !!track.instant_gratification
                      ? new Date(track.instant_gratification)
                      : undefined,
                    text_sync: !!track.text_sync
                      ? track.text_sync?.type.split("/")[1]
                      : undefined,
                    video: !!track.video
                      ? track.video?.type.split("/")[1]
                      : undefined,
                    video_shot: !!track.video_shot
                      ? track.video_shot?.type.split("/")[1]
                      : undefined,
                    ringtone: !!track.ringtone
                      ? track.ringtone?.type.split("/")[1]
                      : undefined,
                    index,
                  };
                  tracksData.push(trackData);
                  tracksFiles.push(trackFiles);
                });

                const releaseData: TReleaseInsert = {
                  ...release,
                  preview: release.preview?.type.split("/")[1]!,
                  area: JSON.stringify(release.area),
                  platforms: JSON.stringify(release.platforms),
                  releaseDate: new Date(release.releaseDate),
                  startDate: new Date(release.startDate),
                  preorderDate: new Date(release.preorderDate),
                };

                await uploadRelease(
                  releaseData,
                  releaseFiles,
                  tracksData,
                  ...tracksFiles
                ).then((res) => {
                  setIsBlocked(false);
                  if (res) {
                    return enqueueSnackbar({
                      variant: "error",
                      message: res.message,
                    });
                  }
                  return enqueueSnackbar({
                    variant: "success",
                    message: "Релиз успешно загружен",
                  });
                });
              }
            },
            (e) => {
              console.log(e);

              const generalErrors = Object.keys(e).filter(
                (i) => i !== "tracks"
              ) as (keyof TReleaseFormTrimmed)[];

              const tracksErrors = Array.isArray(e.tracks)
                ? e.tracks
                    ?.map(
                      (t, i) =>
                        t &&
                        `Трек №${
                          i + 1
                        } из формы неверно заполнено: ${trackRusificator(
                          Object.keys(t) as (keyof TTrackFormTrimmed)[]
                        )}`
                    )
                    .filter(Boolean)
                    .join(";")
                : "";

              enqueueSnackbar({
                variant: "error",
                message: (
                  <div>
                    {releaseRussificator(generalErrors)}
                    <br />
                    {tracksErrors}
                  </div>
                ),
              });
            }
          )}
        >
          <>
            {tab == 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={1}
              >
                <div className="col gap30">
                  <ReleaseGeneralInfo />
                  <ReleasePersons />
                  <ReleaseGenre />
                  <ReleaseIdentification />
                  <ReleaseLabel />
                  <ReleaseDates />
                  <ReleaseArea />
                  <ReleasePlatforms />
                </div>
              </motion.div>
            )}
            {tab == 2 && (
              <motion.div
                key={2}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ReleaseTracks />
              </motion.div>
            )}

            {tab == 3 && (
              <motion.div
                key={3}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FinalCheck
                  release={releaseData}
                  s3_url={process.env.NEXT_PUBLIC_S3_URL!}
                />

                <ReleaseModeratorComment />

                <div className={style.wrap}>
                  <MyButton
                    text="Отправить релиз"
                    view="secondary"
                    type="submit"
                    disabled={isBlocked}
                  />
                </div>
              </motion.div>
            )}
          </>
        </form>
      </FormProvider>
      {/* <pre>{JSON.stringify(releaseData, null, 4)}</pre> */}
      <div className="center gap20">
        {tab != 1 && (
          <p onClick={() => setTab(tab - 1)} className="linkButton">
            Назад
          </p>
        )}
        {tab != 3 && (
          <p onClick={() => setTab(tab + 1)} className="linkButton">
            Дальше
          </p>
        )}
      </div>
    </div>
  );
};
export default SendRelease;
