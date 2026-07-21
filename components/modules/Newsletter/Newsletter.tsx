import { Check } from "lucide-react";
import SectionHeader from "@/components/elements/SectionHeader";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import { getNewsletter } from "@/lib/content";
import NewsletterForm from "./NewsletterForm";

export default async function Newsletter() {
  const data = await getNewsletter();

  return (
    <section
      id={`gw-${data.id}`}
      aria-labelledby={`${data.id}-headline`}
      className="relative bg-background py-24 sm:py-28 lg:py-32"
    >
      <div className="container-1200">
        <ScrollFadeIn>
          <div className="relative isolate overflow-hidden rounded-xl border border-white/10 bg-foreground px-6 py-16 text-background sm:px-14 sm:py-20 lg:py-24">
            {/* Grid + brand glow, mirroring the CtaBanner treatment. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_60%_60%_at_50%_0%,#000,transparent_80%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-80 w-170 max-w-none -translate-x-1/2 rounded-full bg-(--brand-soft) blur-[130px]"
            />

            <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center text-center">
              <SectionHeader
                eyebrow={data.eyebrow}
                headline={data.headline.parts}
                headlineId={`${data.id}-headline`}
                sub={data.sub}
                align="center"
                headlineClassName="mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
                subClassName="mx-auto mt-4 max-w-xl text-base text-white/70 sm:text-lg"
                highlightClassName="text-brand"
              />

              <div className="mt-10 w-full">
                <NewsletterForm
                  placeholder={data.placeholder}
                  cta={data.cta}
                  disclaimer={data.disclaimer}
                />
              </div>

              {data.perks && data.perks.length > 0 && (
                <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                  {data.perks.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-center gap-2 text-sm text-white/70"
                    >
                      <Check aria-hidden="true" size={16} className="text-brand" />
                      {perk}
                    </li>
                  ))}
                </ul>
              )}

              {data.socialProof && (
                <p className="mt-8 text-sm text-white/50">{data.socialProof}</p>
              )}
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
