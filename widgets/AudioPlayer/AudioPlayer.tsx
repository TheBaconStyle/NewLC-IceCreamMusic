"use client";
import style from "./AudioPlayer.module.css";
import Image from "next/image";
import { IoPlay, IoPause, IoClose } from "react-icons/io5";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import { IoMdVolumeHigh } from "react-icons/io";
import { useAudioPlayerContext } from "@/providers/AudioPlayerContext";
import classNames from "classnames";
import { useEffect } from "react";
import ButtonCloseAudioPlayer from "./ButtonCloseAudioPlayer/ButtonCloseAudioPlayer";

// import { useState } from "react";

export const AudioPlayer = ({ track }: { track: string }) => {
  const { isShow, setIsPlaying, isPlaying } = useAudioPlayerContext();
  // const trackAudio = new Audio(track);
  // const [durationTrack, setDuration] = useState("0");
  // const onLoadedMetadata = () => {
  //   correctDuration(trackAudio.duration);
  // };

  // const correctDuration = (time: number) => {
  //   let minutes = time / 60;
  //   let seconds = time % 60;
  //   let strSeconds = seconds.toFixed(0);
  //   let strMinutes = minutes.toFixed(0);
  //   setDuration(strMinutes + ":" + strSeconds);
  // };

  return (
    <>
      <div
        className={classNames(style.audioWrap, {
          [style.audioWrapShow]: isShow,
        })}
      >
        {isShow && (
          <>
            <div>
              <audio className={style.hidden} src={track} controls></audio>
            </div>
            <Image
              src={"/assets/noPhoto.png"}
              alt={"Обложка"}
              width={56}
              height={56}
              className={style.audioPreview}
            />
            <div className={style.audioInfo}>
              <p className={style.audioName}>Дико например</p>
              <p className={style.audioAuthor}>Pharaoh(fit: OG Budda)</p>
            </div>
            <div className={style.audioControls}>
              <TbPlayerTrackPrevFilled />
              {!isPlaying && (
                <IoPlay onClick={() => setIsPlaying(!isPlaying)} />
              )}
              {isPlaying && (
                <IoPause onClick={() => setIsPlaying(!isPlaying)} />
              )}
              <TbPlayerTrackNextFilled />
            </div>
            <div className={style.audioLine}>
              <p className={style.audioTime}>00:00</p>
              <input className={style.audioRange} type="range" />
              <p className={style.audioTime}>{123}</p>
            </div>
            <div className={style.audioBtn}>
              <IoMdVolumeHigh />
            </div>
          </>
        )}
        <ButtonCloseAudioPlayer />
      </div>
    </>
  );
};
