import ScrollFadeIn from "@/components/elements/ScrollFadeIn";

/** Benefits of becoming a growX partner, scrolled as an infinite marquee. */
const BENEFITS = [
  "Recurring Revenue",
  "White-Label Ready",
  "Dedicated Partner Support",
  "Co-Marketing Resources",
  "Higher Profit Margins",
  "Priority Onboarding",
  "Exclusive Leads",
  "Free Sales Training",
];

/** Marquee band under the hero listing partner benefits. Content is duplicated
 *  once so the -50% translate loops seamlessly. Pauses on hover. */
export default function PartnerMarquee() {
  return (
    <section
      id="gw-mod-partner-marquee"
      aria-label="Benefits of becoming a partner"
      className="relative overflow-hidden border-y border-border bg-background py-6 sm:py-7"
    >
      <ScrollFadeIn delay={0.1}>
      <div className="relative flex w-full overflow-hidden mask-[linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-fit animate-marquee hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
              {BENEFITS.map((benefit, i) => (
                <div key={`${copy}-${i}`} className="flex items-center">
                  <span className="mx-6 whitespace-nowrap text-sm font-bold uppercase tracking-widest text-foreground/70 sm:mx-8 sm:text-base">
                    {benefit}
                  </span>
                  {/* Divider rule between items. */}
                  <span aria-hidden="true" className="h-5 w-px shrink-0 bg-border sm:h-6" />
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
