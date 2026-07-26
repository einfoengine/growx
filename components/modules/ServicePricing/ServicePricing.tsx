import { BadgeCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import ModuleTitle from "@/components/elements/ModuleTitle";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import MarginCalculator from "./MarginCalculator";
import { TIERS, TIER_ORDER } from "@/lib/config/pricing";
import type { PricingServiceConfig, ServiceLandingPricing } from "@/lib/content";
import type { ReactNode } from "react";

function usd(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

type Props = {
  config: PricingServiceConfig;
  content: ServiceLandingPricing;
  /** Optional section heading rendered inside the module container, above the body. */
  title?: ReactNode;
  moduleTitle?: string;
};

/** The money section of a rich service landing page: the transparent rate card
 *  (straight from the shared pricing config), the interactive margin
 *  calculator beside it, and the risk-reversal guarantees underneath — safety
 *  shown at the exact moment the price is being weighed. */
export default function ServicePricing({ config, content, title, moduleTitle }: Props) {
  const paidTiers = TIER_ORDER.filter((k) => TIERS[k].discount > 0);

  return (
    <section
      id="gw-mod-service-pricing"
      className="relative border-b border-border bg-background text-foreground gw-section"
    >
      <div className="container-1200">
        {title}
        {moduleTitle && <ModuleTitle id="gw-service-pricing-module-title">{moduleTitle}</ModuleTitle>}

        <div
          className={`grid items-start gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-10 ${
            title || moduleTitle ? "mt-0" : "mt-14"
          }`}
        >
          {/* ── Rate card — the numbers, nothing hidden ─────────────────── */}
          <ScrollFadeIn delay={0.2}>
            <div className="rounded-xl border border-border bg-surface p-6 sm:p-8">
              <p className="font-label text-xs font-semibold uppercase tracking-widest text-muted">
                The rate
              </p>
              <p className="mt-3 flex items-baseline gap-2">
                <span className="font-mono text-5xl font-bold tracking-tight text-foreground">
                  {usd(config.unitPrice)}
                </span>
                <span className="text-base text-muted">
                  per {config.unit}
                  {config.billing === "monthly" ? " / month" : ", flat"}
                </span>
              </p>
              <p className="mt-2 text-sm text-muted">
                {config.minQty}-{config.unit} minimum ·{" "}
                {config.billing === "one-off"
                  ? "one-off project, no retainer required"
                  : "monthly retainer, month-to-month available"}
              </p>

              <p className="mt-7 font-label text-xs font-semibold uppercase tracking-widest text-muted">
                {config.billing === "monthly" ? "Pick your commitment" : "Pick your timeline"}
              </p>
              <ul className="mt-3 divide-y divide-border">
                {config.durations.map((d) => (
                  <li key={d.id} className="flex items-center justify-between gap-4 py-3">
                    <span className="text-sm font-medium text-foreground/85">{d.label}</span>
                    <span
                      className={`rounded-full px-2.5 py-1 font-mono text-[11px] font-bold ${
                        d.multiplier < 1
                          ? "bg-brand/10 text-brand-text"
                          : d.multiplier === 1
                            ? "bg-foreground/5 text-foreground/60"
                            : "bg-foreground/5 text-foreground/60"
                      }`}
                    >
                      {d.multiplier === 1
                        ? "base rate"
                        : `${d.multiplier > 1 ? "+" : "−"}${Math.round(Math.abs(d.multiplier - 1) * 100)}%`}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Membership footnote: the honest place for the tier ladder on
                  this page — a discount fact, not a competing pricing story. */}
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-border bg-background px-4 py-3.5">
                <BadgeCheck size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-brand" />
                <p className="text-xs leading-relaxed text-muted">
                  Members pay less on every order:{" "}
                  {paidTiers.map((k, i) => (
                    <span key={k}>
                      {i > 0 && " · "}
                      <span className="font-semibold text-foreground/80">
                        {TIERS[k].persona}
                      </span>{" "}
                      −{Math.round(TIERS[k].discount * 100)}%
                    </span>
                  ))}
                  {" — "}
                  <Link href="/pricing" className="link-underline font-semibold text-brand-text">
                    see memberships
                  </Link>
                </p>
              </div>
            </div>
          </ScrollFadeIn>

          {/* ── Margin calculator ───────────────────────────────────────── */}
          <ScrollFadeIn delay={0.3}>
            <MarginCalculator
              config={config}
              markupOptions={content.markupOptions}
              defaultMarkup={content.defaultMarkup}
            />
          </ScrollFadeIn>
        </div>

        {/* ── Risk reversal — safety at the moment of price evaluation ──── */}
        <ScrollFadeIn delay={0.2}>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.guarantees.map((g) => (
              <div key={g.id} className="rounded-xl border border-border bg-surface p-5">
                <ShieldCheck size={18} aria-hidden="true" className="text-brand" />
                <h3 className="mt-3 text-sm font-bold tracking-tight text-foreground">
                  {g.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted">{g.description}</p>
              </div>
            ))}
          </div>
        </ScrollFadeIn>

        {/* Soft alternative for the not-ready. */}
        {content.note && (
          <p className="mt-8 text-center text-sm text-muted">{content.note}</p>
        )}
      </div>
    </section>
  );
}
