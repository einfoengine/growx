"use client";

import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import Eyebrow from "@/components/elements/Eyebrow";
import { TIERS, TIER_ORDER, buildEstimate, type TierKey } from "@/lib/config/pricing";
import { useCart } from "@/lib/cart/useCart";

export type PlanInfo = { key: TierKey; name: string; features: string[] };

function usd(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

/** The estimate: pick a membership, pull in the services from the cart, and see
 *  what it costs with growX, what the same work costs elsewhere, the year-one
 *  saving, and the benefits. All figures come from the shared pricing config. */
export default function EstimateCalculator({ plans }: { plans: PlanInfo[] }) {
  const { plan, services, setPlan, removeService } = useCart();
  const activePlan: TierKey = plan ?? "free";
  const est = buildEstimate(activePlan, services);
  const planInfo = plans.find((p) => p.key === activePlan);
  const hasServices = services.length > 0;

  return (
    <section id="gw-pricing-estimate" className="relative isolate bg-surface">
      <div className="container-1200 py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow text="Your estimate" />
          <h2 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
            Build your plan, see the math.
          </h2>
          <p className="mt-5 text-base text-muted sm:text-lg">
            Choose a membership and your services. We show what it costs with
            growX, what it would cost anywhere else, and what you keep.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
          {/* Left: build the order */}
          <div>
            <p className="font-label text-xs font-semibold uppercase tracking-widest text-muted">
              1. Choose your membership
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {TIER_ORDER.map((key) => {
                const tier = TIERS[key];
                const active = key === activePlan;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPlan(key)}
                    aria-pressed={active}
                    className={`flex flex-col items-start rounded-xl border p-4 text-left transition ${
                      active ? "border-brand bg-brand/5" : "border-border bg-background hover:border-foreground/20"
                    }`}
                  >
                    <span className="text-sm font-bold text-foreground">{tier.name}</span>
                    <span className="mt-1 font-mono text-xs text-muted">
                      {tier.fee === 0 ? "$0" : `${usd(tier.fee)}/mo`}
                    </span>
                    {tier.discount > 0 && (
                      <span className="mt-1 text-[11px] font-semibold text-brand">
                        {Math.round(tier.discount * 100)}% off
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <p className="mt-8 font-label text-xs font-semibold uppercase tracking-widest text-muted">
              2. Your services
            </p>
            {hasServices ? (
              <ul className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border bg-background">
                {est.lines.map(({ service, ourPrice }) => (
                  <li key={service.slug} className="flex items-center justify-between gap-3 px-4 py-3">
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-foreground">{service.title}</span>
                      <span className="font-mono text-xs text-muted">
                        {usd(ourPrice)}
                        {service.billing === "monthly" ? "/mo" : " one-off"}
                        {est.discount > 0 && <span className="text-brand"> after {Math.round(est.discount * 100)}% off</span>}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeService(service.slug)}
                      aria-label={`Remove ${service.title}`}
                      className="shrink-0 rounded-full p-1.5 text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-border bg-background px-4 py-8 text-center text-sm text-muted">
                No services yet. Add them from the catalog above.
              </div>
            )}
          </div>

          {/* Right: the verdict */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-foreground text-background shadow-2xl shadow-black/30">
              <div className="space-y-px">
                <Row label="With growX" primary>
                  {est.oneOffWithUs > 0 && <Amount value={`${usd(est.oneOffWithUs)} one-off`} />}
                  <Amount value={`${usd(est.monthlyWithUs)}/mo`} strong />
                </Row>
                <Row label="If it wasn't us">
                  {est.oneOffElsewhere > 0 && <Amount value={`${usd(est.oneOffElsewhere)} one-off`} muted />}
                  <Amount value={`${usd(est.monthlyElsewhere)}/mo`} muted />
                </Row>
              </div>

              <div className="bg-brand/10 px-6 py-5 text-center">
                <p className="font-label text-[11px] font-semibold uppercase tracking-widest text-brand">
                  Your year-one saving
                </p>
                <p className="mt-1 font-mono text-4xl font-bold text-background">{usd(est.yearOneSavings)}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  You keep {usd(est.yearOneSavings)} in year one and gain a team you never
                  have to hire, manage, or carry.
                </p>
              </div>

              <div className="px-6 py-6">
                <p className="font-label text-[11px] font-semibold uppercase tracking-widest text-white/50">
                  What you get
                </p>
                <ul className="mt-3 space-y-2">
                  {[...(planInfo?.features.slice(0, 4) ?? []), "100% white-label, full commercial rights", "Fixed prices, cancel anytime"].map(
                    (b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-white/80">
                        <Check size={15} strokeWidth={3} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                        {b}
                      </li>
                    ),
                  )}
                </ul>

                <Link
                  href="/checkout"
                  className="btn btn-brand mt-6 w-full"
                  aria-disabled={!hasServices && activePlan === "free"}
                >
                  Proceed to checkout
                  <ArrowRight size={16} className="ml-1.5" aria-hidden="true" />
                </Link>
                <p className="mt-3 text-center text-xs text-white/45">
                  Figures are a guide. Final pricing is confirmed at checkout.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  primary = false,
  children,
}: {
  label: string;
  primary?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex items-center justify-between gap-4 px-6 py-4 ${primary ? "bg-white/5" : ""}`}>
      <span className="text-sm text-white/70">{label}</span>
      <span className="flex flex-col items-end gap-0.5 text-right">{children}</span>
    </div>
  );
}

function Amount({ value, strong = false, muted = false }: { value: string; strong?: boolean; muted?: boolean }) {
  return (
    <span
      className={`font-mono text-sm font-semibold ${
        strong ? "text-background" : muted ? "text-white/50 line-through" : "text-white/80"
      }`}
    >
      {value}
    </span>
  );
}
