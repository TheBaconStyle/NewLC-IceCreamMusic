"use client";
import { IoClose } from "react-icons/io5";
import style from "../AudioPlayer.module.css";
import { useAudioPlayerContext } from "@/providers/AudioPlayerContext";

export default function ButtonCloseAudioPlayer() {
  const { setIsShow } = useAudioPlayerContext();
  return (
    <div onClick={() => setIsShow(false)}>
      <IoClose />
    </div>
  );
}
