import { Check } from "lucide-react";
import Eyebrow from "@/components/elements/Eyebrow";
import Headline from "@/components/elements/Headline";
import { getPricing } from "@/lib/content";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import PlanButton from "./PlanButton";

/** Homepage pricing cards. Tiers come from data/modules/pricing.json — the same
 *  source the service-page <Pricing> module and the onboarding modal read, so
 *  names and prices cannot drift apart across the funnel. */
export default async function PricingPlans() {
  const data = await getPricing();

  return (
    <section
      id="gw-mod-pricing"
      aria-labelledby="pricing-headline"
      className="relative isolate overflow-hidden border-b border-border bg-background py-24 text-foreground sm:py-28 lg:py-32"
    >
      {/* Faint grid + soft brand glow backdrop. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(10,10,10,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.04)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_80%_55%_at_50%_15%,#000,transparent_80%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 left-1/2 -top-20 h-72 w-300 max-w-none -translate-x-1/2 bg-brand/8 blur-[130px]"
      />

      <div className="container-1200">
        {/* Header */}
        <ScrollFadeIn delay={0.1}>
        {/* The ladder narrative from pricing.json — "Vendor. Team member.
            Department." — pays off the hero typewriter (we are your vendor /
            team member / department) instead of generic SaaS boilerplate. */}
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow text={data.eyebrow} />
          <Headline
            id="pricing-headline"
            parts={data.headline.parts}
            as="h2"
            className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
            highlightClassName="text-gradient-brand"
          />
          <p className="mt-5 text-base text-muted sm:text-lg">{data.sub}</p>
          {/* Kills the "$295 covers fulfillment" misread before the sales
              call has to: membership buys the team, services are per-project. */}
          {data.clarifier && (
            <p className="mx-auto mt-4 max-w-xl rounded-full border border-border bg-surface px-5 py-2.5 text-xs leading-relaxed text-foreground/70 sm:text-sm">
              {data.clarifier}
            </p>
          )}
        </div>
        </ScrollFadeIn>

        {/* Compact plan cards */}
        <ScrollFadeIn delay={0.2}>
        <div className="mx-auto mt-10 grid max-w-6xl items-stretch gap-6 lg:grid-cols-3">
          {data.tiers.map((tier) => {
            const featured = !!tier.highlighted;
            return (
              <div
                key={tier.id}
                className={`relative isolate flex h-full flex-col overflow-hidden rounded-2xl border p-7 ${
                  featured
                    ? "border-foreground bg-foreground text-background shadow-[0_20px_60px_rgba(10,10,10,0.25)]"
                    : "border-border bg-background shadow-sm"
                }`}
              >
                {/* Brand aurora behind the featured header. */}
                {featured && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-[radial-gradient(120%_90%_at_50%_-10%,rgba(16,185,129,0.45),transparent_62%)]"
                  />
                )}

                {/* Persona + tier pill, with a Popular tag on the featured plan. */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl font-bold tracking-tight">
                      {tier.persona ?? tier.name}
                    </h3>
                    <span className="badge-brand">{tier.name}</span>
                  </div>
                  {featured && (
                    <span className="shrink-0 rounded-full bg-gradient-brand px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-black">
                      Popular
                    </span>
                  )}
                </div>

                <p className={`mt-2.5 text-sm ${featured ? "text-white/60" : "text-muted"}`}>
                  {tier.description}
                </p>

                <div className="mt-6 flex items-end gap-3">
                  <span className="text-5xl font-bold leading-none tracking-tight">
                    {tier.price}
                  </span>
                  <div className="pb-1 text-sm leading-snug">
                    <div className={featured ? "text-white/70" : "text-foreground/70"}>
                      per month
                    </div>
                    <div className={featured ? "text-white/45" : "text-muted"}>
                      {tier.price === "$0" ? "free forever" : "billed monthly"}
                    </div>
                  </div>
                </div>

                {/* Feature list */}
                <ul
                  className={`mt-7 space-y-3 border-t pt-7 ${
                    featured ? "border-white/15" : "border-border"
                  }`}
                >
                  {tier.features.map((feature, i) => {
                    const isLead = i === 0 && feature.startsWith("Everything");
                    const leadColor = featured ? "text-background" : "text-foreground";
                    const bodyColor = featured
                      ? "text-background/80"
                      : "text-foreground/80";
                    return (
                      <li key={i} className="flex items-start gap-3">
                        <Check
                          size={18}
                          strokeWidth={3}
                          className="mt-0.5 shrink-0 text-brand"
                        />
                        <span
                          className={`text-sm ${
                            isLead ? `font-semibold ${leadColor}` : bodyColor
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-auto pt-8">
                  {/* "#onboard-<plan>" opens the onboarding modal; anything else
                      (e.g. "#book") renders as a plain link. */}
                  <PlanButton
                    label={tier.cta.label}
                    planKey={
                      tier.cta.href.startsWith("#onboard-")
                        ? tier.cta.href.replace("#onboard-", "")
                        : undefined
                    }
                    href={
                      tier.cta.href.startsWith("#onboard-")
                        ? undefined
                        : tier.cta.href
                    }
                    className={`btn w-full ${featured ? "btn-brand" : "btn-secondary"}`}
                  />
                  <a
                    href="#book"
                    className={`mt-4 block text-center text-sm transition-colors ${
                      featured
                        ? "text-white/50 hover:text-white"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    Need higher limits?
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
