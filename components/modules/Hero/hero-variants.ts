/** Visual scale for the shared Hero shell + animated content. */
export type HeroVariant = "home" | "inner";

export const HERO_LAYOUT: Record<
  HeroVariant,
  {
    shell: string;
    headline: string;
    tagline: string;
    sub: string;
    ctas: string;
    stats: string;
    eyebrowArrow: number;
  }
> = {
  home: {
    shell: "container-1200 relative pt-24 pb-24 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-36",
    headline: "mt-5 hero-headline",
    tagline: "mt-5 hero-tagline",
    // ~740px measure keeps the sub at a readable line length under the wide
    // centered headline.
    sub: "mx-auto mt-6 max-w-185 text-pretty hero-sub",
    ctas: "mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row",
    stats: "mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-4",
    eyebrowArrow: 12,
  },
  inner: {
    shell: "container-1200 relative pt-20 pb-20 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-28",
    headline:
      "mt-7 text-5xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl",
    tagline: "mt-6 text-base font-semibold tracking-tight text-foreground/90 sm:text-lg",
    sub: "mx-auto mt-3 max-w-xl text-pretty text-sm text-muted sm:text-base",
    ctas: "mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row",
    stats: "mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-4",
    eyebrowArrow: 12,
  },
};
