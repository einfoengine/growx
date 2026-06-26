import type React from "react";
import HeroAnimatedContent from "@/components/modules/Hero/HeroAnimatedContent";
import type { HeroVariant } from "@/components/modules/Hero/hero-variants";
import MouseGlow from "@/components/elements/MouseGlow";
import { getHero } from "@/lib/content";
import type { HeroContent } from "@/lib/content";

export type HeroProps = {
  data?: HeroContent;
  /**
   * `home` — large headline and vertical rhythm (default).
   * `inner` — compact hero for inner / marketing subpages.
   */
  variant?: HeroVariant;
};

/** Dark token overrides — scoped to the section so the shared content turns
 *  dark-appropriate (text, buttons, borders, eyebrow) without any extra props. */
const DARK_TOKENS = {
  "--background": "#070707",
  "--foreground": "#fafafa",
  "--muted": "#a1a1aa",
  "--border": "rgba(255,255,255,0.14)",
  "--surface": "#141414",
} as React.CSSProperties;

export default async function Hero({ data, variant = "home" }: HeroProps = {}) {
  const heroData = data ?? await getHero("home");

  // ── Inner / subpage hero — original light treatment ───────────────────────
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

  // ── Home hero — dark, cinematic video background ──────────────────────────
  return (
    <section
      id={`gw-${heroData.id}`}
      aria-labelledby={`${heroData.id}-headline`}
      data-nav-theme="dark"
      className="relative isolate overflow-hidden bg-background text-foreground"
      style={DARK_TOKENS}
    >
      {/* Background video */}
      <video
        aria-hidden="true"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 -z-30 h-full w-full object-cover"
      >
        <source src="/hero-vdo.mp4" type="video/mp4" />
      </video>

      {/* Readability scrim — darkens the footage so white text stays legible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-background/55"
      />
      {/* Vignette — pulls focus to the center and softens the frame edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(ellipse_75%_65%_at_50%_40%,transparent_0%,rgba(7,7,7,0.45)_65%,rgba(7,7,7,0.9)_100%)]"
      />
      {/* Bottom fade — blends the dark hero into the light section below */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-20 h-44 bg-linear-to-b from-transparent to-background"
      />

      {/* Fine grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-size-[52px_52px] mask-[radial-gradient(ellipse_80%_70%_at_50%_35%,#000_10%,transparent_80%)]"
      />
      {/* Brand glow lit from above */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 left-1/2 -top-28 h-96 w-190 -translate-x-1/2 rounded-full bg-brand/15 blur-[100px]"
      />

      <MouseGlow />
      <HeroAnimatedContent data={heroData} variant={variant} />
    </section>
  );
}
