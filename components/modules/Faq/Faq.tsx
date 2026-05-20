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
          <div
            id={`${faqData.id}-intro`}
            className="grid gap-10 lg:grid-cols-12 lg:items-end"
          >
            <SectionHeader
              eyebrow={faqData.eyebrow}
              headline={faqData.headline.parts}
              headlineId={`${faqData.id}-headline`}
              headlineClassName="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              className="lg:col-span-7"
            />
            <p className="text-base text-muted lg:col-span-5 lg:max-w-md">
              {faqData.sub}
            </p>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.3}>
          <FaqAccordion items={faqData.items} />
        </ScrollFadeIn>
      </div>
    </section>
  );
}
