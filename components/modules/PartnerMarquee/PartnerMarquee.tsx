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
 *  once so the -50% translate loops seamlessly. Pauses on hover. */
export default function PartnerMarquee() {
  return (
    <section
      id="gw-mod-partner-marquee"
      aria-label="Benefits of becoming a partner"
      data-nav-theme="dark"
      // Solid dark band, same near-black as the hero above and the trust bar
      // below, so the whole top of the page reads as one continuous dark zone.
      // (The earlier glass overlay straddled the hero/next-section seam and
      // looked half-frosted; a solid band is clean and seamless.)
      className="relative z-10 overflow-hidden border-y border-white/10 bg-foreground py-6 text-white sm:py-7"
    >
      <ScrollFadeIn delay={0.1}>
      <div className="relative flex w-full overflow-hidden mask-[linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-fit animate-marquee hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {BENEFITS.map(({ label, Icon }, i) => (
                <div key={`${copy}-${i}`} className="flex items-center">
                  <Icon
                    size={18}
                    strokeWidth={2.5}
                    aria-hidden="true"
                    className="shrink-0 text-brand"
                  />
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
    </section>
  );
}
