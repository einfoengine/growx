import { Plus } from "lucide-react";
import Headline from "@/components/elements/Headline";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import { getFaq } from "@/lib/content";
import Eyebrow from "@/components/elements/Eyebrow";
import FaqAccordion from "./FaqAccordion";

export default async function Faq() {
  const data = await getFaq();

  return (
    <section
      id={data.id}
      aria-labelledby={`${data.id}-headline`}
      className="relative bg-surface"
    >
      <div className="container-1200 py-24 sm:py-28 lg:py-32">
        <ScrollFadeIn delay={0.1}>
          <div
            id={`${data.id}-intro`}
            className="grid gap-10 lg:grid-cols-12 lg:items-end"
          >
            <div className="lg:col-span-7">
              <Eyebrow text={data.eyebrow} />
              <Headline
                id={`${data.id}-headline`}
                parts={data.headline.parts}
                as="h2"
                className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              />
            </div>
            <p className="text-base text-muted lg:col-span-5 lg:max-w-md">
              {data.sub}
            </p>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.3}>
          <FaqAccordion items={data.items} />
        </ScrollFadeIn>
      </div>
    </section>
  );
}
