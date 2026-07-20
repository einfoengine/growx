"use client";

import Link from "next/link";
import { ArrowRight, Check, X, ShoppingCart } from "lucide-react";
import { TIERS, buildEstimate, type TierKey } from "@/lib/config/pricing";
import { useCart } from "@/lib/cart/useCart";
import type { PlanInfo } from "@/components/templates/PricingPage/EstimateCalculator";

function usd(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

/** Assembles the order and hands off to signup. Real payment happens in the
 *  client portal (Stripe), so this never takes a card; it captures the cart and
 *  routes the partner to a free account or a call to finalise. */
export default function CheckoutClient({ plans }: { plans: PlanInfo[] }) {
  const { plan, services, setPlan, removeService, clear } = useCart();
  const activePlan: TierKey = plan ?? "free";
  const est = buildEstimate(activePlan, services);
  const isEmpty = !plan && services.length === 0;
  const planInfo = plans.find((p) => p.key === activePlan);

  const complete = () => {
    window.dispatchEvent(new CustomEvent("open-onboarding", { detail: { plan: activePlan } }));
  };

  return (
    <section className="relative isolate min-h-[70vh] bg-background">
      <div className="container-1200 pb-24 pt-32 sm:pt-36">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Your order</h1>

          {isEmpty ? (
            <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border bg-surface px-6 py-16 text-center">
              <ShoppingCart size={28} className="text-muted" aria-hidden="true" />
              <p className="mt-4 text-lg font-semibold text-foreground">Your cart is empty</p>
              <p className="mt-2 max-w-sm text-sm text-muted">
                Add a membership and the services you sell, then come back to review your order.
              </p>
              <Link href="/pricing" className="btn btn-primary mt-6">
                Browse the catalog
                <ArrowRight size={16} className="ml-1.5" aria-hidden="true" />
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
              {/* Order lines */}
              <div>
                <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface">
                  <li className="flex items-center justify-between gap-3 px-5 py-4">
                    <span>
                      <span className="block text-sm font-semibold text-foreground">
                        {TIERS[activePlan].name} membership
                      </span>
                      <span className="text-xs text-muted">{TIERS[activePlan].persona}</span>
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold text-foreground">
                        {TIERS[activePlan].fee === 0 ? "$0" : `${usd(TIERS[activePlan].fee)}/mo`}
                      </span>
                      {plan && (
                        <button
                          type="button"
                          onClick={() => setPlan(null)}
                          aria-label="Remove membership"
                          className="rounded-full p-1.5 text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </span>
                  </li>
                  {est.lines.map(({ service, ourPrice }) => (
                    <li key={service.slug} className="flex items-center justify-between gap-3 px-5 py-4">
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-foreground">{service.title}</span>
                        <span className="text-xs text-muted">
                          {service.billing === "monthly" ? "Monthly service" : "One-off project"}
                        </span>
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-sm font-semibold text-foreground">
                          {usd(ourPrice)}
                          {service.billing === "monthly" ? "/mo" : ""}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeService(service.slug)}
                          aria-label={`Remove ${service.title}`}
                          className="rounded-full p-1.5 text-muted transition-colors hover:bg-red-500/10 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={clear}
                  className="mt-4 text-sm font-medium text-muted transition-colors hover:text-foreground"
                >
                  Clear cart
                </button>
              </div>

              {/* Summary */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <dl className="space-y-2 text-sm">
                    {est.oneOffWithUs > 0 && (
                      <div className="flex justify-between">
                        <dt className="text-muted">One-off today</dt>
                        <dd className="font-mono font-semibold text-foreground">{usd(est.oneOffWithUs)}</dd>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <dt className="text-muted">Monthly</dt>
                      <dd className="font-mono font-semibold text-foreground">{usd(est.monthlyWithUs)}/mo</dd>
                    </div>
                    {est.yearOneSavings > 0 && (
                      <div className="flex justify-between border-t border-border pt-2">
                        <dt className="font-semibold text-brand">Year-one saving</dt>
                        <dd className="font-mono font-semibold text-brand">{usd(est.yearOneSavings)}</dd>
                      </div>
                    )}
                  </dl>

                  <button onClick={complete} className="btn btn-primary mt-6 w-full">
                    Complete signup
                    <ArrowRight size={16} className="ml-1.5" aria-hidden="true" />
                  </button>
                  <Link href="#book" className="btn btn-secondary mt-3 w-full">
                    Book a call to finalise
                  </Link>
                  <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted">
                    <Check size={14} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                    Signing up is free. You confirm and pay for each order inside the
                    partner portal, never before.
                  </p>
                  {planInfo && planInfo.features[0] && (
                    <p className="mt-3 text-xs text-muted">{planInfo.features[0]}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
