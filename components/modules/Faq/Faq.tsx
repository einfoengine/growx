import type { ReactNode } from "react";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import ModuleTitle from "@/components/elements/ModuleTitle";
import { getFaq } from "@/lib/content";
import type { FaqContent } from "@/lib/content";
import FaqAccordion from "./FaqAccordion";

export default async function Faq({
  data,
  moduleTitle,
  title,
}: { data?: FaqContent; moduleTitle?: string; title?: ReactNode } = {}) {
  const faqData = data ?? await getFaq();

  return (
    <section
      id={`gw-${faqData.id}`}
      className="relative bg-surface"
    >
      <div className="container-1200 gw-section">
        {title}
        {moduleTitle && <ModuleTitle id="gw-faq-module-title">{moduleTitle}</ModuleTitle>}
        <ScrollFadeIn delay={0.3}>
          <FaqAccordion items={faqData.items} />
        </ScrollFadeIn>
      </div>
    </section>
  );
}
