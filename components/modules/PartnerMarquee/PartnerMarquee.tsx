import {
  Clock,
  Headset,
  MousePointerClick,
  ShieldCheck,
  Tag,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import ModuleTitle from "@/components/elements/ModuleTitle";

/** What an agency owner actually gets by partnering with growX — the
 *  white-label fulfillment value props, not lead-gen perks. */
const BENEFITS: { label: string; Icon: LucideIcon }[] = [
  { label: "100% White-Label", Icon: Tag },
  { label: "Scale Without Hiring", Icon: TrendingUp },
  { label: "In-House Team", Icon: Users },
  { label: "Fixed Pricing", Icon: Wallet },
  { label: "Clear SLAs", Icon: Clock },
  { label: "One-Click Ordering", Icon: MousePointerClick },
  { label: "Full Commercial Rights", Icon: ShieldCheck },
  // "Dedicated Account Manager" was here, but it only exists from the $295
  // tier — an unqualified claim the pricing table contradicts. This one is
  // true at every tier.
  { label: "One Accountable Team", Icon: Headset },
];

/** Marquee band under the hero listing partner benefits. Content is duplicated
 *  once so the -50% translate loops seamlessly. Pauses on hover.
 *
 *  Glassmorphism: a frosted band (bg-white/8 + backdrop-blur-xl) floats over a
 *  pair of soft brand-coloured aurora blobs (same animate-aurora treatment as
 *  FulfillmentReasons) rendered as an earlier sibling in the same section, so
 *  the blur has something colourful behind it to sample. The blobs sit on the
 *  section's own bg-foreground canvas — same near-black as the hero above —
 *  so the zone still reads as one continuous dark band, just glassy instead
 *  of flat. Self-contained (its own blur source), so it doesn't straddle the
 *  hero/next-section seam the way an earlier glass experiment here did. */
export default function PartnerMarquee({
  items,
  ariaLabel = "Benefits of becoming a partner",
  id = "gw-mod-partner-marquee",
  moduleTitle,
}: {
  /** Override the scrolled items (plain labels, no icons) — e.g. a service
   *  page's platform list. Default: the partner-benefit chips. */
  items?: string[];
  ariaLabel?: string;
  id?: string;
  moduleTitle?: string;
} = {}) {
  const entries: { label: string; Icon: LucideIcon | null }[] = items
    ? items.map((label) => ({ label, Icon: null }))
    : BENEFITS;
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      // Stays black in BOTH themes (deliberate contrast band) — no
      // data-dark-surface here.
      data-nav-theme="dark"
      className="relative isolate overflow-hidden bg-foreground text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-aurora absolute -top-20 left-[12%] h-48 w-80 rounded-full bg-brand/30 blur-[90px]" />
        <div className="animate-aurora absolute -bottom-20 right-[12%] h-48 w-80 rounded-full bg-brand-strong/25 blur-[90px] [animation-delay:-9s] [animation-duration:22s]" />
      </div>

      <div className="relative border-y border-white/15 bg-white/8 py-6 backdrop-blur-xl sm:py-7">
        {moduleTitle && <ModuleTitle id="gw-partner-marquee-module-title">{moduleTitle}</ModuleTitle>}
        <ScrollFadeIn delay={0.1}>
        <div className="relative flex w-full overflow-hidden mask-[linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex w-fit animate-marquee hover:[animation-play-state:paused]">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
                {entries.map(({ label, Icon }, i) => (
                  <div key={`${copy}-${i}`} className="flex items-center">
                    {Icon && (
                      <Icon
                        size={18}
                        strokeWidth={2.5}
                        aria-hidden="true"
                        className="shrink-0 text-brand"
                      />
                    )}
                    <span className="mx-2.5 whitespace-nowrap text-sm font-bold uppercase tracking-wider text-white/85 sm:mx-3 sm:text-base">
                      {label}
                    </span>
                    {/* Dot separator between items. */}
                    <span
                      aria-hidden="true"
                      className="mr-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand/60 sm:mr-3"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
