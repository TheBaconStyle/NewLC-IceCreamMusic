"use client";

import CloseIcon from "@/public/InfoIcon/close.svg";
import { TReleaseForm } from "@/schema/release.schema";
import DragAndDropFile from "@/widgets/SendRelize/DragAndDropFile/DragAndDropFile";
import { TrackAccordion } from "@/widgets/SendRelize/TrackAccordion/TrackAccordion";
import { motion, Reorder } from "framer-motion";
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
import { useRef } from "react";

export function ReleaseTracks() {
  const { control } = useFormContext<TReleaseForm>();
  const constraintsRef = useRef(null);

  const {
    append: appendTrack,
    remove: removeTrack,
    fields: tracks,
    replace: replaceTrack,
  } = useFieldArray({
    control: control,
    name: "tracks",
  });

  return (
    <div>
      <div className={style.wrap}>
        <DragAndDropFile appendTrack={appendTrack} />
      </div>

      <Reorder.Group
        axis="y"
        values={tracks}
        onReorder={replaceTrack}
        className="col gap10 mt10"
        ref={constraintsRef}
      >
        {tracks.map((trackData, trackIndex) => (
          <Reorder.Item
            key={trackData.track.name}
            value={trackData}
            layout={"position"}
            className="listNone"
            dragConstraints={constraintsRef}
          >
            <div className={style.wrap_track}>
              <TrackAccordion track={trackData}>
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
              <div
                className={style.close}
                onClick={() => removeTrack(trackIndex)}
              >
                <CloseIcon className={style.deleteTrack} />
              </div>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}
