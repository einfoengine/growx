import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import ModuleTitle from "@/components/elements/ModuleTitle";
import { getFaq } from "@/lib/content";
import type { FaqContent } from "@/lib/content";
import FaqAccordion from "./FaqAccordion";

export default async function Faq({
  data,
  moduleTitle,
  noPaddingTop,
}: { data?: FaqContent; moduleTitle?: string; noPaddingTop?: boolean } = {}) {
  const faqData = data ?? await getFaq();

  return (
    <section
      id={`gw-${faqData.id}`}
      className="relative bg-surface"
    >
      {/* noPaddingTop: a SectionTitle module sits directly above and already
          provides the top spacing. */}
      <div
        className={`container-1200 ${
          noPaddingTop ? "pb-24 pt-0 sm:pb-28 lg:pb-32" : "py-24 sm:py-28 lg:py-32"
        }`}
      >
        {moduleTitle && <ModuleTitle id="gw-faq-module-title">{moduleTitle}</ModuleTitle>}
        <ScrollFadeIn delay={0.3}>
          <FaqAccordion items={faqData.items} />
        </ScrollFadeIn>
      </div>
    </section>
  );
}
