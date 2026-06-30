import HeroAnimatedContent from "@/components/modules/Hero/HeroAnimatedContent";
import HeroGlobe from "@/components/modules/Hero/HeroGlobe";
import type { HeroVariant } from "@/components/modules/Hero/hero-variants";
import MouseGlow from "@/components/elements/MouseGlow";
import { getHero } from "@/lib/content";
import type { HeroContent } from "@/lib/content";

export type HeroProps = {
  data?: HeroContent;
  /**
   * `home` - large headline and vertical rhythm (default).
   * `inner` - compact hero for inner / marketing subpages.
   */
  variant?: HeroVariant;
};

export default async function Hero({ data, variant = "home" }: HeroProps = {}) {
  const heroData = data ?? await getHero("home");

  // ── Inner / subpage hero ──────────────────────────────────────────────────
  if (variant !== "home") {
    return (
      <section
        id={`gw-${heroData.id}`}
        aria-labelledby={`${heroData.id}-headline`}
        className="relative isolate overflow-hidden bg-background"
      >
        <MouseGlow />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(10,10,10,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.05)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_80%_70%_at_50%_30%,#000_20%,transparent_85%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 left-1/2 -top-24 h-96 w-190 -translate-x-1/2 rounded-full bg-brand/8 blur-[90px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 -right-40 -bottom-48 h-130 w-130 rounded-full bg-(--brand-soft) blur-[130px]"
        />
        <HeroAnimatedContent data={heroData} variant={variant} />
      </section>
    );
  }

  // ── Home hero - light, with the interactive dot globe ─────────────────────
  return (
    <section
      id={`gw-${heroData.id}`}
      aria-labelledby={`${heroData.id}-headline`}
      className="relative isolate overflow-hidden bg-background"
    >
      {/* Interactive dot globe */}
      <HeroGlobe />

      {/* Fine grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(10,10,10,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.05)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_80%_70%_at_50%_30%,#000_20%,transparent_85%)]"
      />
      {/* Brand glow lit from above */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 left-1/2 -top-24 h-96 w-190 -translate-x-1/2 rounded-full bg-brand/8 blur-[90px]"
      />
      {/* Bottom fade - blends the globe into the section below */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-b from-transparent to-background"
      />

      <HeroAnimatedContent data={heroData} variant={variant} />
    </section>
  );
}
