import SectionHeader from "@/components/elements/SectionHeader";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import { getFaq } from "@/lib/content";
import type { FaqContent } from "@/lib/content";
import FaqAccordion from "./FaqAccordion";

export default async function Faq({ data }: { data?: FaqContent } = {}) {
  const faqData = data ?? await getFaq();

  return (
    <section
      id={`gw-${faqData.id}`}
      aria-labelledby={`${faqData.id}-headline`}
      className="relative bg-surface"
    >
      <div className="container-1200 py-24 sm:py-28 lg:py-32">
        <ScrollFadeIn delay={0.1}>
          <SectionHeader
            eyebrow={faqData.eyebrow}
            headline={faqData.headline.parts}
            headlineId={`${faqData.id}-headline`}
            sub={faqData.sub}
            align="center"
            headlineClassName="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl"
            subClassName="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg"
            className="mx-auto max-w-3xl"
          />
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.3}>
          <FaqAccordion items={faqData.items} />
        </ScrollFadeIn>
      </div>
    </section>
  );
}
