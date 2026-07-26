import EvervaultBackground from "@/components/elements/EvervaultBackground";
import ModuleTitle from "@/components/elements/ModuleTitle";
import PainPointsCards from "./PainPointsCards";
import { getPainPoints } from "@/lib/content";
import type { PainPointsContent } from "@/lib/content";

export default async function PainPoints({
  data,
  moduleTitle,
  noPaddingTop,
}: { data?: PainPointsContent; moduleTitle?: string; noPaddingTop?: boolean } = {}) {
  const painData = data ?? await getPainPoints();

  return (
    <section
      id={`gw-${painData.id}`}
      data-nav-theme="dark" data-dark-surface
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

      {/* noPaddingTop: a SectionTitle module sits directly above. */}
      <div
        className={`container-1200 relative ${
          noPaddingTop ? "pb-24 pt-0 sm:pb-28 lg:pb-32" : "py-24 sm:py-28 lg:py-32"
        }`}
      >
        {moduleTitle && <ModuleTitle id="gw-pain-points-module-title">{moduleTitle}</ModuleTitle>}

        <PainPointsCards cards={painData.cards} />
      </div>
    </section>
  );
}
