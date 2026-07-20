import Link from "next/link";
import { ArrowRight, Lock, Check } from "lucide-react";
import Eyebrow from "@/components/elements/Eyebrow";
import { TIERS } from "@/lib/config/pricing";

/** Proves the second half of the promise: every service carries one fixed
 *  price, shown before you order. Per-service numbers are not locked yet and
 *  we never invent pricing, so the figure stays masked and unlocks behind the
 *  free signup. That gap is the reason to join. */
export default function ServicePreview() {
  return (
    <section id="gw-pricing-preview" className="relative isolate bg-surface">
      <div className="container-1200 py-24 sm:py-28 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: the promise in words */}
          <div>
            <Eyebrow text="Per-service pricing" />
            <h2 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
              One fixed price, shown before you order.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Every service in the catalog carries a single fixed price and a
              clear SLA. You see the number before you commit. No quotes, no
              hourly billing, no change-order surprises.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "The price you see is the price you pay",
                "Standard members save 10% on every order",
                "VIP members save 15% on every order",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/10">
                    <Check size={12} strokeWidth={3} className="text-brand" aria-hidden="true" />
                  </span>
                  <span className="text-sm text-foreground/80 sm:text-[15px]">{line}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: a sample service card as it appears inside the portal */}
          <div className="rounded-2xl border border-border bg-background p-7 shadow-sm sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-brand/10 px-3 py-1 font-label text-[11px] font-semibold uppercase tracking-widest text-brand">
                Fixed price
              </span>
              <span className="font-mono text-xs text-muted">5 to 7 day delivery</span>
            </div>

            <h3 className="mt-5 text-xl font-bold tracking-tight text-foreground">
              Website Design &amp; Development
            </h3>
            <p className="mt-2 text-sm text-muted">
              Sample from the catalog. Your live price and discount render the
              moment you sign in.
            </p>

            {/* Masked price: we never publish an unconfirmed number. */}
            <div className="mt-6 flex items-center justify-between rounded-xl border border-dashed border-border bg-surface px-5 py-4">
              <span className="text-sm text-foreground/70">Your price</span>
              <span className="flex items-center gap-2 font-mono text-lg font-bold tracking-widest text-foreground/40">
                <Lock size={15} aria-hidden="true" />
                $•,•••
              </span>
            </div>
            <p className="mt-3 text-center font-mono text-[11px] text-muted">
              Unlocks free. Standard sees {Math.round(TIERS.standard.discount * 100)}% off,
              VIP sees {Math.round(TIERS.vip.discount * 100)}% off.
            </p>

            <Link href="#onboard-free" className="btn btn-primary mt-6 w-full">
              Join free to see all pricing
              <ArrowRight size={16} className="ml-1.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
