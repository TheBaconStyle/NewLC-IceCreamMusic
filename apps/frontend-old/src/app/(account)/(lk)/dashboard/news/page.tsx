import NewsList from "@/entities/NewsList/NewsList";
import { PageTransitionProvider } from "@/providers/PageTransitionProvider";

export default function NewsPage() {
  return (
    <PageTransitionProvider>
      <NewsList />
    </PageTransitionProvider>
  );
}
