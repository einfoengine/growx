import HeroDots from "@/components/modules/Hero/HeroDots";

/** Shared dark hero backdrop for inner/subpages. Mirrors the home hero's
 *  atmosphere — near-black ground, emerald aurora wash, interactive dot field,
 *  and drifting brand glows — but without the home hero's robots scene photo or
 *  VSL video, so every inner hero reads as the same family as home without
 *  competing with it. Drop inside a `relative isolate overflow-hidden
 *  bg-foreground text-background` section; all layers are decorative and
 *  click-through. */
export default function InnerHeroBackdrop() {
  return (
    <>
      {/* Emerald aurora wash from the top edge. */}
      <div
        id="gw-inner-hero-backdrop"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_55%_at_50%_-5%,var(--brand-soft),transparent_60%)]"
      />
      {/* Interactive dot field: brightens under the cursor, random sparkles.
          White dots — invisible on the light hero, so hidden there. */}
      <HeroDots className="-z-10 mask-[radial-gradient(ellipse_80%_70%_at_50%_30%,#000_15%,transparent_80%)] light:hidden" />
      {/* Slow-pulsing wide glow behind the copy. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 left-1/2 -top-24 h-64 w-375 max-w-none -translate-x-1/2 animate-hero-glow bg-brand/12 blur-[130px]"
      />
      {/* Bottom-right corner bloom. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 -right-40 -bottom-40 h-96 w-96 rounded-full bg-(--brand-soft) blur-[130px]"
      />
    </>
  );
}
