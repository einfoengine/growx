import HeroAnimatedContent from "@/components/modules/Hero/HeroAnimatedContent";
import HeroDots from "@/components/modules/Hero/HeroDots";
import HeroScene from "@/components/modules/Hero/HeroScene";
import HeroVideo from "@/components/modules/Hero/HeroVideo";
import HeroVideoPerspective from "@/components/modules/Hero/HeroVideoPerspective";
import type { HeroVariant } from "@/components/modules/Hero/hero-variants";
import MouseGlow from "@/components/elements/MouseGlow";
import { getHero } from "@/lib/content";
import type { HeroContent } from "@/lib/content";

export type HeroProps = {
  data?: HeroContent;
  /**
   * `home` - split layout: text left, video right (default).
   * `inner` - compact centered hero for inner / marketing subpages.
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

  // ── Home hero - centered copy, video below ────────────────────────────────
  return (
    <section
      id={`gw-${heroData.id}`}
      aria-labelledby={`${heroData.id}-headline`}
      data-nav-theme="dark"
      className="relative isolate overflow-hidden bg-foreground text-background"
    >
      {/* Cinematic backdrop: darkened emerald aurora photo + film grain,
          drifting slowly on scroll. Sits at the very back. */}
      <HeroScene className="-z-20" />
      {/* Brand wash over the scene. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_55%_at_50%_-5%,var(--brand-soft),transparent_60%)]"
      />
      {/* Interactive dot field: lights up under the cursor + random dim sparkles. */}
      <HeroDots className="-z-10 mask-[radial-gradient(ellipse_80%_70%_at_50%_30%,#000_15%,transparent_80%)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 left-1/2 -top-24 h-64 w-375 max-w-none animate-hero-glow bg-brand/12 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 right-0 bottom-0 h-80 w-96 translate-x-1/4 translate-y-1/4 rounded-full bg-(--brand-soft) blur-[120px]"
      />

      <div className="container-1200 flex w-full flex-col items-center">
        {/* The copy centers in most of the first screen — short of a full
            viewport so the VSL peeks above the fold instead of sitting a
            whole screen away from the copy. */}
        {/* Top padding clears the fixed glass bar (72px zone) with real air
            to spare, so the eyebrow never crowds it. */}
        <div className="flex w-full items-center justify-center pt-36 pb-10 sm:pt-40 lg:min-h-[82svh] lg:pb-16 lg:pt-32">
          <HeroAnimatedContent data={heroData} variant={variant} />
        </div>
        <HeroVideoPerspective className="w-full pb-16 sm:pb-24">
          <HeroVideo videoId="oGKjh10TbK0" />
        </HeroVideoPerspective>
      </div>
    </section>
  );
}
