"use client";

import { editUserRelease } from "@/actions/release/edit/user";
import {
  releaseAreaSchema,
  releasePlatformsSchema,
  releaseRolesSchema,
  releaseUpdateFormSchema,
  trackRolesSchema,
  TRelease,
  TReleaseArea,
  TReleasePlatforms,
  TReleaseRoles,
  TReleaseUpdateForm,
  TTrack,
  TTrackUpdate,
} from "@/schema/release.schema";
import MyButton from "@/shared/MyButton/MyButton";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import { motion } from "framer-motion";
import Link from "next/link";
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
import FinalCheck from "../SendRelize/FinalCheck/FinalCheck";
import trackRusificator, {
  releaseRussificator,
  TReleaseFormTrimmed,
  TTrackFormTrimmed,
} from "../SendRelize/russificator";
import style from "./UpdateRelize.module.css";

export type TUpdateRelease = {
  release: TRelease & { tracks: TTrack[] };
  s3_url: string;
};

const UpdateRelease = ({ release, s3_url }: TUpdateRelease) => {
  const { tracks, platforms, area, roles, ...otherReleaseData } = release;

  const releaseRolesResult = releaseRolesSchema.safeParse(roles);

  const releaseRoles: TReleaseRoles = [];

  if (releaseRolesResult.success) {
    releaseRoles.push(...releaseRolesResult.data);
  }

  if (!!release.performer) {
    releaseRoles.push({
      role: "Исполнитель",
      person: release.performer,
    });
  }

  if (!!release.feat) {
    releaseRoles.push({
      role: "feat.",
      person: release.feat,
    });
  }

  const releaseAreaResult = releaseAreaSchema.safeParse(area);

  let releaseArea: TReleaseArea = { data: [], negate: false };

  if (releaseAreaResult.success) {
    releaseArea = releaseAreaResult.data;
  }

  const releasePlatformsResult = releasePlatformsSchema.safeParse(platforms);

  let releasePlatforms: TReleasePlatforms = [];

  if (releasePlatformsResult.success) {
    releasePlatforms = releasePlatformsResult.data;
  }

  const formMethods = useForm<TReleaseUpdateForm>({
    resolver: zodResolver(releaseUpdateFormSchema),
    defaultValues: {
      ...otherReleaseData,
      roles: releaseRoles,
      area: releaseArea,
      platforms: releasePlatforms,
      tracks: tracks.map((track) => ({
        ...track,
        roles: trackRolesSchema.parse(track.roles),
        language: track.language ?? undefined,
        trackId: track.id,
        text_sync: track.text_sync ?? undefined,
        ringtone: track.ringtone ?? undefined,
        video: track.video ?? undefined,
        video_shot: track.video_shot ?? undefined,
      })),
    },
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

              const { preview, labelName, ...releaseUpdateData } = release;

              const releaseFiles = new FormData();

              if (release.preview instanceof File) {
                releaseFiles.set("preview", release.preview);
              }

              const tracksFiles: FormData[] = [];

              const tracksData: TTrackUpdate[] = [];

              tracks.forEach((track, index) => {
                track.text = undefined;

                track.video = undefined;

                track.video_shot = undefined;

                track.text_sync = undefined;

                const trackFiles = new FormData();
                trackFiles.set("track", track.track);
                const trackData: TTrackUpdate = {
                  id: track.trackId,
                  releaseId: release.id,
                };

                if (track.ringtone instanceof File) {
                  trackData.ringtone = track.ringtone.type.split("/")[1];
                  trackFiles.set("ringtone", track.ringtone);
                }

                tracksData.push({
                  ...trackData,
                  index,
                });

                tracksFiles.push(trackFiles);
              });

              await editUserRelease(
                releaseUpdateData,
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
            },
            (e) => {
              console.dir(e, { depth: Infinity });

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
                <Link
                  href={`/dashboard/edit/${release.id}/new-track`}
                  className="linkButton wfit"
                >
                  Добавить трек
                </Link>

                <ReleaseTracks update />
              </motion.div>
            )}

            {tab == 3 && (
              <motion.div
                key={3}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FinalCheck release={releaseData} s3_url={s3_url} />

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
export default UpdateRelease;
