import { Plus } from "lucide-react";
import Headline from "@/components/elements/Headline";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import { getFaq } from "@/lib/content";
import type { FaqContent } from "@/lib/content";
import Eyebrow from "@/components/elements/Eyebrow";
import FaqAccordion from "./FaqAccordion";

export default async function Faq({ data }: { data?: FaqContent } = {}) {
  const faqData = data ?? await getFaq();

  return (
    <section
      id={faqData.id}
      aria-labelledby={`${faqData.id}-headline`}
      className="relative bg-surface"
    >
      <div className="container-1200 py-24 sm:py-28 lg:py-32">
        <ScrollFadeIn delay={0.1}>
          <div
            id={`${faqData.id}-intro`}
            className="grid gap-10 lg:grid-cols-12 lg:items-end"
          >
            <div className="lg:col-span-7">
              <Eyebrow text={faqData.eyebrow} />
              <Headline
                id={`${faqData.id}-headline`}
                parts={faqData.headline.parts}
                as="h2"
                className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              />
            </div>
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
