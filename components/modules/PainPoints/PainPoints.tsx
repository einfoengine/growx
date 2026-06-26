import SectionHeader from "@/components/elements/SectionHeader";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import EvervaultBackground from "@/components/elements/EvervaultBackground";
import PainPointsCards from "./PainPointsCards";
import { getPainPoints } from "@/lib/content";
import type { PainPointsContent } from "@/lib/content";

export default async function PainPoints({ data }: { data?: PainPointsContent } = {}) {
  const painData = data ?? await getPainPoints();

  return (
    <section
      id={`gw-${painData.id}`}
      aria-labelledby={`${painData.id}-headline`}
      data-nav-theme="dark"
      className="relative isolate z-45 overflow-x-clip bg-foreground text-background"
    >
      <div
        id={`${painData.id}-bg-glow`}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(ellipse_60%_60%_at_50%_30%,#000,transparent_85%)]"
      >
        <div className="absolute -top-40 left-1/4 h-105 w-105 rounded-full bg-(--brand-soft) blur-[140px]" />
      </div>
      <div
        id={`${painData.id}-bg-grid`}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_70%_60%_at_50%_50%,#000,transparent_90%)]"
      />

      {/* Evervault-style cursor reveal */}
      <EvervaultBackground className="-z-10" />

      <div className="container-1200 relative py-24 sm:py-28 lg:py-32">
        <ScrollFadeIn delay={0.1}>
          <SectionHeader
            eyebrow={painData.eyebrow}
            headline={painData.headline.parts}
            headlineId={`${painData.id}-headline`}
            sub={painData.sub}
            align="center"
            maxWidth="max-w-2xl"
            headlineClassName="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            subClassName="mx-auto mt-5 max-w-xl text-base text-white/70 sm:text-lg"
          />
        </ScrollFadeIn>

        <PainPointsCards cards={painData.cards} />
      </div>
    </section>
  );
}
