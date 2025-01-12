"use client";

import { uploadRelease } from "@/actions/release/upload";
import { standardLabelName } from "@/helpers/priceList";
import {
  releaseFormSchema,
  TReleaseForm,
  TReleaseInsert,
  TTrackInsert,
} from "@/schema/release.schema";
import MyButton from "@/shared/MyButton/MyButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import trackRusificator, {
  releaseRussificator,
  type TReleaseFormTrimmed,
  TTrackFormTrimmed,
} from "./russificator";
import style from "./SendRelease.module.css";
import { ReleaseGeneralInfo } from "../ReleaseDraft/ReleaseGeneralInfo";
import { ReleasePersons } from "../ReleaseDraft/ReleasePersons";
import { ReleaseGenre } from "../ReleaseDraft/ReleaseGenre";
import { ReleaseIdentification } from "../ReleaseDraft/ReleaseIdentification";
import { ReleaseLabel } from "../ReleaseDraft/RleaseLabel";
import { ReleaseDates } from "../ReleaseDraft/ReleaseDates";
import { ReleaseArea } from "../ReleaseDraft/ReleaseArea";
import { ReleasePlatforms } from "../ReleaseDraft/ReleasePlatform";
import { ReleaseTracks } from "../ReleaseDraft/ReleaseTracks";
import classNames from "classnames";
import Image from "next/image";
import FinalCheck from "./FinalCheck/FinalCheck";

export type TSendRelease = {
  release?: TReleaseForm;
};

const SendRelease = () => {
  const formMethods = useForm<TReleaseForm>({
    resolver: zodResolver(releaseFormSchema),
    defaultValues: { labelName: standardLabelName, tracks: [] },
    progressive: true,
    mode: "all",
  });

  const { handleSubmit, watch } = formMethods;

  // const releasePreview = watch("preview");

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
                enqueueSnackbar({
                  variant: "info",
                  message: "Загружаем релиз. Подождите.",
                });

                setIsBlocked(true);

                const { tracks, ...release } = data;

                const releasePreview = new FormData();

                releasePreview.set("preview", release.preview);

                const tracksFiles: FormData[] = [];

                const tracksData: TTrackInsert[] = [];

                for (let track of tracks) {
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
                    track: track.track.type.split("/")[1],
                    instant_gratification: !!track.instant_gratification
                      ? new Date(track.instant_gratification)
                      : undefined,
                    text_sync: !!track.text_sync
                      ? track.text_sync.type.split("/")[1]
                      : undefined,
                    video: !!track.video
                      ? track.video.type.split("/")[1]
                      : undefined,
                    video_shot: !!track.video_shot
                      ? track.video_shot.type.split("/")[1]
                      : undefined,
                    ringtone: !!track.ringtone
                      ? track.ringtone.type.split("/")[1]
                      : undefined,
                  };
                  tracksData.push(trackData);
                  tracksFiles.push(trackFiles);
                }

                const releaseData: TReleaseInsert = {
                  ...release,
                  preview: release.preview.type.split("/")[1],
                  area: JSON.stringify(release.area),
                  platforms: JSON.stringify(release.platforms),
                  releaseDate: new Date(release.releaseDate),
                  startDate: new Date(release.startDate),
                  preorderDate: new Date(release.preorderDate),
                };

                await uploadRelease(
                  releaseData,
                  releasePreview,
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
          {tab == 1 && (
            <>
              <ReleaseGeneralInfo />
              <ReleasePersons />
              <ReleaseGenre />
              <ReleaseIdentification />
              <ReleaseLabel />
              <ReleaseDates />
              <ReleaseArea />
              <ReleasePlatforms />
            </>
          )}
          {tab == 2 && <ReleaseTracks />}

          {tab == 3 && <FinalCheck release={releaseData} />}

          {tab == 3 && (
            <div className={style.wrap}>
              <MyButton
                text="Отправить релиз"
                view="secondary"
                type="submit"
                disabled={isBlocked}
              />
            </div>
          )}
        </form>
      </FormProvider>
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
