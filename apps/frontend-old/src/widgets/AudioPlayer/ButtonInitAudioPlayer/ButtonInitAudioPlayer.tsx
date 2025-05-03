"use client";
import { useAudioPlayerContext } from "@/providers/AudioPlayerContext";
import { IoPlay } from "react-icons/io5";
import { AudioPlayer } from "../AudioPlayer";

export default function ButtonInitAudioPlayer() {
  const { setIsShow, isShow } = useAudioPlayerContext();
  return (
    <div onClick={() => setIsShow(true)}>
      <IoPlay /> <AudioPlayer track={"/a.wav"} />
    </div>
  );
}
