import FAQItem from "@/entities/FAQItem/FAQItem";
import { allFAQ } from "@/helpers/allFAQ";
import { PageTransitionProvider } from "@/providers/PageTransitionProvider";

export default function FAQPage() {
  return (
    <PageTransitionProvider>
      <div className="col gap20">
        {allFAQ.map((e) => (
          <FAQItem key={e.question} question={e.question} answer={e.answer} />
        ))}
      </div>
    </PageTransitionProvider>
  );
}
