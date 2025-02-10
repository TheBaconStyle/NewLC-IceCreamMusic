import { PageTransitionProvider } from "@/providers/PageTransitionProvider";
import NewsList from "@/entities/ui/NewsList/NewsList";
import ButtonInitAudioPlayer from "@/widgets/ui/AudioPlayer/ButtonInitAudioPlayer/ButtonInitAudioPlayer";
import ButtonCloseAudioPlayer from "@/widgets/ui/AudioPlayer/ButtonCloseAudioPlayer/ButtonCloseAudioPlayer";

export default function NewsPage() {
  return (
    <PageTransitionProvider>
      <NewsList />
    </PageTransitionProvider>
  );
}
