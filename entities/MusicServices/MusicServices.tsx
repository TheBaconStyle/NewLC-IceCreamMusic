"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
const MusicServices = () => {
  const { resolvedTheme } = useTheme();

  return (
    <div className={"center mt50 gap40"}>
      <Image
        src={`/MusicServicesIcons/${resolvedTheme}/apple_music.svg`}
        alt="Apple Music"
        height={16}
        width={104}
      />
      <Image
        src={`/MusicServicesIcons/${resolvedTheme}/deezer.svg`}
        alt="Deezer"
        height={16}
        width={104}
      />
      <Image
        src={`/MusicServicesIcons/${resolvedTheme}/spotify.svg`}
        alt="Spotify"
        height={16}
        width={104}
      />
      <Image
        src={`/MusicServicesIcons/${resolvedTheme}/tidal.svg`}
        alt="Tidal"
        height={16}
        width={104}
      />
      <Image
        src={`/MusicServicesIcons/${resolvedTheme}/tiktok.svg`}
        alt="TikTok"
        height={16}
        width={104}
      />
      <Image
        src={`/MusicServicesIcons/${resolvedTheme}/vk.svg`}
        alt="Vk"
        height={16}
        width={104}
      />
      <Image
        src={`/MusicServicesIcons/${resolvedTheme}/yandex.svg`}
        alt="Yandex"
        height={16}
        width={104}
      />
      <Image
        src={`/MusicServicesIcons/${resolvedTheme}/youtube_music.svg`}
        alt="Youtube Music"
        height={16}
        width={104}
      />
      <Image
        src={`/MusicServicesIcons/${resolvedTheme}/zvuk.svg`}
        alt="Zvuk"
        height={16}
        width={104}
      />
    </div>
  );
};
export default MusicServices;
