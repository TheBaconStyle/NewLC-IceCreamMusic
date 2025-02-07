import { PageTransitionProvider } from "@/providers/PageTransitionProvider";
import NewsList from "@/entities/NewsList/NewsList";
import ButtonInitAudioPlayer from "@/widgets/AudioPlayer/ButtonInitAudioPlayer/ButtonInitAudioPlayer";
import ButtonCloseAudioPlayer from "@/widgets/AudioPlayer/ButtonCloseAudioPlayer/ButtonCloseAudioPlayer";

export default function NewsPage() {
  return (
    <PageTransitionProvider>
      <NewsList />
    </PageTransitionProvider>
  );
}
