"use client";

import CloseIcon from "@/public/InfoIcon/close.svg";
import { TReleaseForm } from "@/schema/release.schema";
import { useFieldArray, useFormContext } from "react-hook-form";
import DragAndDropFile from "@/widgets/SendRelize/DragAndDropFile/DragAndDropFile";
import { TrackAccordion } from "@/widgets/SendRelize/TrackAccordion/TrackAccordion";
import style from "./Release.module.css";
import { TrackGeneralInfo } from "./TrackDraft/TrackGeneralInfo";
import { TrackIdentification } from "./TrackDraft/TrackIdentification";
import { TrackRoles } from "./TrackDraft/TrackRoles";
import { TrackRights } from "./TrackDraft/TrackRights";
import { TrackAdditionalParameters } from "./TrackDraft/TrackAdditionalParameters";
import { TrackVersion } from "./TrackDraft/TrackVersion";
import { TrackUseCases } from "./TrackDraft/TrackUseCases";
import { TrackText } from "./TrackDraft/TrackText";
import { TrackTextSync } from "./TrackDraft/TrackTextSync";
import { TrackRingtone } from "./TrackDraft/TrackRingtone";
import { TrackVideo } from "./TrackDraft/TrackVideo";
import { TrackVideoShot } from "./TrackDraft/TrackVideoShot";

export function ReleaseTracks() {
  const { control } = useFormContext<TReleaseForm>();

  const {
    append: appendTrack,
    remove: removeTrack,
    fields: tracks,
  } = useFieldArray({
    control: control,
    name: "tracks",
  });

  return (
    <>
      <div className={style.wrap}>
        <DragAndDropFile appendTrack={appendTrack} />
      </div>

      {tracks.map((trackData, trackIndex) => (
        <div className={style.wrap_track} key={trackData.id}>
          <TrackAccordion trackName={trackData.track.name}>
            <TrackGeneralInfo trackIndex={trackIndex} />
            <TrackIdentification trackIndex={trackIndex} />
            <TrackRoles trackIndex={trackIndex} />
            <TrackRights trackIndex={trackIndex} />
            <TrackAdditionalParameters trackIndex={trackIndex} />
            <TrackVersion trackIndex={trackIndex} />
            <TrackUseCases trackIndex={trackIndex}>
              <TrackText trackIndex={trackIndex} />
              <TrackTextSync trackIndex={trackIndex} />
              <TrackRingtone trackIndex={trackIndex} />
              <TrackVideo trackIndex={trackIndex} />
              <TrackVideoShot trackIndex={trackIndex} />
            </TrackUseCases>
          </TrackAccordion>
          <div className={style.close} onClick={() => removeTrack(trackIndex)}>
            <CloseIcon className={style.deleteTrack} />
          </div>
        </div>
      ))}
    </>
  );
}
