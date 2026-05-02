import HeroAnimatedContent from "@/components/modules/Hero/HeroAnimatedContent";
import MouseGlow from "@/components/elements/MouseGlow";
import { getHero } from "@/lib/content";
import type { HeroContent } from "@/lib/content";

export default async function Hero({ data }: { data?: HeroContent } = {}) {
  const heroData = data ?? await getHero("home");

  return (
    <section
      id={heroData.id}
      aria-labelledby={`${heroData.id}-headline`}
      className="relative isolate overflow-hidden bg-background"
    >
      <MouseGlow />
      {/* Dot grid */}
      <div
        id={`${heroData.id}-bg-grid`}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(10,10,10,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.05)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_80%_70%_at_50%_30%,#000_20%,transparent_85%)]"
      />
      {/* Top-center brand glow — "lit from above" */}
      <div
        id={`${heroData.id}-bg-blob-top`}
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 left-1/2 -top-24 h-96 w-190 -translate-x-1/2 rounded-full bg-brand/8 blur-[90px]"
      />
      {/* Bottom-right accent */}
      <div
        id={`${heroData.id}-bg-blob-brand`}
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 -right-40 -bottom-48 h-130 w-130 rounded-full bg-(--brand-soft) blur-[130px]"
      />

      <HeroAnimatedContent data={heroData} />
    </section>
  );
}
