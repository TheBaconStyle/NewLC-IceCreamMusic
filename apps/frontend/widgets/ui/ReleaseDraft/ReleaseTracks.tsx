"use client";

import CloseIcon from "@/public/InfoIcon/close.svg";
import {
  TReleaseInsertForm,
  TReleaseUpdateForm,
} from "@/shared/model/schema/release.schema";
import DragAndDropFile from "@/widgets/ui/SendRelize/DragAndDropFile/DragAndDropFile";
import { TrackAccordion } from "@/widgets/ui/SendRelize/TrackAccordion/TrackAccordion";
import { Reorder } from "framer-motion";
import { useRef } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import style from "./Release.module.css";
import { TrackAdditionalParameters } from "./TrackDraft/TrackAdditionalParameters";
import { TrackGeneralInfo } from "./TrackDraft/TrackGeneralInfo";
import { TrackIdentification } from "./TrackDraft/TrackIdentification";
import { TrackRights } from "./TrackDraft/TrackRights";
import { TrackRingtone } from "./TrackDraft/TrackRingtone";
import { TrackRoles } from "./TrackDraft/TrackRoles";
import { TrackText } from "./TrackDraft/TrackText";
import { TrackTextSync } from "./TrackDraft/TrackTextSync";
import { TrackUseCases } from "./TrackDraft/TrackUseCases";
import { TrackVersion } from "./TrackDraft/TrackVersion";
import { TrackVideo } from "./TrackDraft/TrackVideo";
import { TrackVideoShot } from "./TrackDraft/TrackVideoShot";

export type TReleaseTracks = {
  update?: boolean;
  s3_url?: string;
};

export function ReleaseTracks({ update, s3_url }: TReleaseTracks) {
  const { control } = useFormContext<TReleaseInsertForm | TReleaseUpdateForm>();

  const constraintsRef = useRef(null);

  const {
    append: appendTrack,
    remove: removeTrack,
    fields: tracks,
    swap: swapTracks,
  } = useFieldArray({
    control: control,
    name: "tracks",
  });

  const reorderTracks = (newTracks: typeof tracks) => {
    const firstDiffIndex = tracks.findIndex(
      (field, index) => field.id !== newTracks[index].id
    );
    if (firstDiffIndex !== -1) {
      const newIndex = newTracks.findIndex(
        (field) => field.id === tracks[firstDiffIndex].id
      );
      swapTracks(firstDiffIndex, newIndex);
    }
  };

  return (
    <div>
      {!update && (
        <div className={style.wrap}>
          <DragAndDropFile appendTrack={appendTrack} />
        </div>
      )}

      <Reorder.Group
        axis="y"
        values={tracks}
        onReorder={reorderTracks}
        className="col gap10 mt10"
        ref={constraintsRef}
      >
        {tracks.map((trackData, trackIndex) => (
          <Reorder.Item
            key={trackData.id}
            value={trackData}
            layout={"position"}
            className="listNone"
            dragConstraints={constraintsRef}
          >
            <div className={style.wrap_track}>
              <TrackAccordion trackIndex={trackIndex} s3_url={s3_url}>
                <TrackGeneralInfo trackIndex={trackIndex} />
                <TrackIdentification trackIndex={trackIndex} />
                <TrackRoles trackIndex={trackIndex} />
                <TrackRights trackIndex={trackIndex} />
                <TrackAdditionalParameters trackIndex={trackIndex} />
                <TrackVersion trackIndex={trackIndex} />
                <TrackUseCases trackIndex={trackIndex}>
                  {!update && (
                    <>
                      <TrackText trackIndex={trackIndex} />
                      <TrackTextSync trackIndex={trackIndex} />
                    </>
                  )}
                  <TrackRingtone trackIndex={trackIndex} />
                  {!update && (
                    <>
                      <TrackVideo trackIndex={trackIndex} />
                      <TrackVideoShot trackIndex={trackIndex} />
                    </>
                  )}
                </TrackUseCases>
              </TrackAccordion>
              {!update && (
                <div
                  className={style.close}
                  onClick={async () => {
                    if (
                      confirm(
                        "Вы точно хотите удалить трек? Это действие невозможно будет отменить."
                      )
                    ) {
                      // if (update) {
                      //   enqueueSnackbar({
                      //     variant: "info",
                      //     message: "Удаляем трек из релиза",
                      //   });
                      //   await deleteUserTrack(
                      //     (trackData as TTrackUpdateForm).trackId
                      //   );
                      //   enqueueSnackbar({
                      //     variant: "success",
                      //     message: "Готово",
                      //   });
                      // }
                      removeTrack(trackIndex);
                    }
                  }}
                >
                  <CloseIcon className={style.deleteTrack} />
                </div>
              )}
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
