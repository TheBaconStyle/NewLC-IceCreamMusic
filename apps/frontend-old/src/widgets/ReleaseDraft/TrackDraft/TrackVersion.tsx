"use client";

import MyCheckbox from "@/shared/MyCheckbox/MyCheckbox";
import MyText from "@/shared/MyText/MyText";
import MyTitle from "@/shared/MyTitle/MyTitle";
import { TTrackItem } from "./TrackItem.props";
import { TReleaseInsertForm } from "shared/schema/release.schema";
import { useFormContext } from "react-hook-form";
import style from "./TrackItem.module.css";
import classNames from "classnames";

export function TrackVersion({ trackIndex }: TTrackItem) {
  const { register } = useFormContext<TReleaseInsertForm>();

  return (
    <>
      <div className={style.infoItem}>
        <div className={classNames(style.desc, style.mt30, style.mb20)}>
          <MyTitle Tag={"h3"}>Версия трека</MyTitle>
          <MyText className={style.subText}>
            Укажите версию трека, данный параметр участвует в системах
            рекомендаций площадок
          </MyText>
          <MyText className={style.subText}>
            Также редакции обращают внимание на версию, чтобы разместить трек в
            подходящий тематический плейлист
          </MyText>
        </div>
        <MyCheckbox
          {...register(`tracks.${trackIndex}.explicit`)}
          label={"Explicit Content"}
          // name={`Explicit-Content-${trackIndex}`}
          // checked={!!track.explicit}
          // onChange={() =>
          //   handleTrackChange({ explicit: !!!track.explicit })
          // }
          tooltip={{
            id: "Explicit Content",
            text: "Версия трека, содержащая ненормативную и потенциально оскорбительную лексику",
          }}
        />
        <MyCheckbox
          {...register(`tracks.${trackIndex}.live`)}
          label={"Live"}
          // name={`Live-${trackIndex}`}
          // checked={!!track.live}
          // onChange={() => handleTrackChange({ live: !!!track.live })}
          tooltip={{
            id: "Live",
            text: "Запись живого выступления, если в названии трека вы уже указали Live, можете не выбирать этот параметр",
          }}
        />
        <MyCheckbox
          {...register(`tracks.${trackIndex}.cover`)}
          label={"Cover"}
          // name={`Cover-${trackIndex}`}
          // checked={!!track.cover}
          // onChange={() => handleTrackChange({ cover: !!!track.cover })}
          tooltip={{
            id: "Cover",
            text: "Версия трека, исполненная другим артистом",
          }}
        />
        <MyCheckbox
          {...register(`tracks.${trackIndex}.remix`)}
          label={"Remix"}
          // name={`Remix-${trackIndex}`}
          // checked={!!track.remix}
          // onChange={() => handleTrackChange({ remix: !!!track.remix })}
          tooltip={{
            id: "Remix",
            text: "Альтернативная версия выпущенного ранее трека",
          }}
        />
        <MyCheckbox
          {...register(`tracks.${trackIndex}.instrumental`)}
          label={"Instrumental"}
          // name={`Instrumental-${trackIndex}`}
          // checked={!!track.instrumental}
          // onChange={() =>
          //   handleTrackChange({ instrumental: !!!track.instrumental })
          // }
          tooltip={{
            id: "Instrumental",
            text: "Версия трека без вокальной партии",
          }}
        />
      </div>
    </>
  );
}
