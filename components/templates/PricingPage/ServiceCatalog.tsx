"use client";

import { Check, Plus, ArrowDown } from "lucide-react";
import Eyebrow from "@/components/elements/Eyebrow";
import { PRICING_SERVICES, type PricingService } from "@/lib/config/pricing";
import { useCart } from "@/lib/cart/useCart";

function usd(n: number): string {
  return `$${n.toLocaleString("en-US")}`;
}

function priceLabel(s: PricingService): string {
  const unit = s.unit ? ` ${s.unit}` : "";
  return s.billing === "monthly" ? `${usd(s.price)}${unit} / mo` : `${usd(s.price)}${unit}`;
}

/** The catalog: every service as a card with its fixed price and a one-click
 *  add to cart. The cart total and estimate update live in the calculator and
 *  the header cart. */
export default function ServiceCatalog() {
  const { hasService, addService, removeService } = useCart();

  return (
    <section id="gw-pricing-services" className="relative isolate bg-background">
      <div className="container-1200 py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow text="The catalog" />
          <h2 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
            Add the services you sell.
          </h2>
          <p className="mt-5 text-base text-muted sm:text-lg">
            Every service carries one fixed price. Add what you need to your cart
            and the calculator below shows what it costs and what you save.
          </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRICING_SERVICES.map((s) => {
            const inCart = hasService(s.slug);
            return (
              <li
                key={s.slug}
                className={`flex flex-col rounded-2xl border p-6 transition-colors ${
                  inCart ? "border-brand bg-brand/5" : "border-border bg-surface"
                }`}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-bold tracking-tight text-foreground">{s.title}</h3>
                </div>
                <p className="mt-1 font-mono text-sm font-semibold text-brand">{priceLabel(s)}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{s.intro}</p>

                <ul className="mt-4 space-y-2">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-[13px] leading-snug text-foreground/75">
                      <Check size={14} strokeWidth={3} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => (inCart ? removeService(s.slug) : addService(s.slug))}
                  aria-pressed={inCart}
                  className={`mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    inCart
                      ? "bg-brand/15 text-brand hover:bg-brand/20"
                      : "bg-foreground text-background hover:opacity-90"
                  }`}
                >
                  {inCart ? (
                    <>
                      <Check size={16} aria-hidden="true" /> Added
                    </>
                  ) : (
                    <>
                      <Plus size={16} aria-hidden="true" /> Add to cart
                    </>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-10 flex items-center justify-center gap-2 text-sm text-muted">
          <ArrowDown size={15} className="text-brand" aria-hidden="true" />
          See your estimate and savings below
        </p>
      </div>
    </section>
  );
}
