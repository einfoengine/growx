import { Check } from "lucide-react";
import PlanButton from "./PlanButton";

type Tier = {
  name: string;
  pill: string;
  tagline: string;
  price: string;
  cta: { label: string; planKey?: string; href?: string };
  featured?: boolean;
  features: string[];
};

const TIERS: Tier[] = [
  {
    name: "The Vendor",
    pill: "Starter",
    tagline: "A reliable production line, on demand.",
    price: "$0",
    cta: { label: "Get started", planKey: "free" },
    features: [
      "Full portal access with one-click ordering across the catalog",
      "Standard fixed pricing on every service",
      "100% white-label deliverables with full commercial rights",
      "First response within 4 business hours",
      "Standard production queue and SLAs",
      "Partner resource library to help you sell",
    ],
  },
  {
    name: "The Team Member",
    pill: "Standard",
    tagline: "A dedicated manager who knows your business.",
    price: "$295",
    cta: { label: "Start Standard", planKey: "standard" },
    featured: true,
    features: [
      "Everything in Free, plus:",
      "Dedicated account manager who knows your clients and history",
      "10% partner discount on all services",
      "Priority queue and 2-hour first response",
      "Direct Slack or WhatsApp channel to your manager",
      "White-label sales enablement kit to close your clients",
      "Monthly pipeline call and early access to new services",
    ],
  },
  {
    name: "The Department",
    pill: "VIP",
    tagline: "We handle fulfillment and your client comms.",
    price: "$495",
    cta: { label: "Book a VIP call", href: "#book" },
    features: [
      "Everything in Standard, plus:",
      "White-label client project manager who talks to your clients as your team",
      "15% partner discount on all services",
      "Front-of-queue production, 20 to 30% faster delivery",
      "1-hour first response with real-time availability",
      "White-label client onboarding run under your brand",
      "Unlimited revisions and guaranteed monthly capacity",
    ],
  },
];

export default function PricingPlans() {
  return (
    <section
      id="gw-mod-pricing"
      aria-labelledby="pricing-headline"
      className="relative isolate overflow-hidden border-b border-border bg-background py-16 text-foreground sm:py-20 lg:py-24"
    >
      {/* Faint grid + soft brand glow backdrop. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(10,10,10,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.04)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_80%_60%_at_50%_20%,#000,transparent_80%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 left-1/2 -top-20 h-72 w-300 max-w-none -translate-x-1/2 bg-brand/8 blur-[130px]"
      />

      <div className="container-1200">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand">[ Pricing ]</p>
          <h2
            id="pricing-headline"
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Plans that scale with your agency.
          </h2>
          <p className="mt-5 text-base text-muted sm:text-lg">
            Start free and upgrade when you&apos;re ready. Every tier is 100%
            white-label with full commercial rights and one-click portal ordering.
          </p>
        </div>

        {/* Tiers */}
        <div className="mx-auto mt-10 grid max-w-7xl items-stretch gap-6 lg:mt-12 lg:grid-cols-3">
          {TIERS.map((tier) => {
            const featured = !!tier.featured;
            return (
              <div
                key={tier.name}
                className={`relative flex h-full flex-col border ${
                  featured
                    ? "border-foreground bg-foreground text-background shadow-[0_20px_60px_rgba(10,10,10,0.25)]"
                    : "border-border bg-surface shadow-sm"
                }`}
              >
                {featured && (
                  <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 bg-brand px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-black">
                    Most Popular
                  </span>
                )}

                {/* Header — inner box that contrasts its parent card. */}
                <div
                  className={`p-7 ${
                    featured
                      ? "bg-background text-foreground"
                      : "bg-foreground text-background"
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-bold tracking-tight">{tier.name}</h3>
                    <span className="badge-brand">{tier.pill}</span>
                  </div>
                  <p
                    className={`mt-4 text-sm sm:text-base ${
                      featured ? "text-muted" : "text-white/60"
                    }`}
                  >
                    {tier.tagline}
                  </p>
                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="text-4xl font-bold tracking-tight sm:text-5xl">
                      {tier.price}
                    </span>
                    <span
                      className={featured ? "text-sm text-muted" : "text-sm text-white/50"}
                    >
                      /month
                    </span>
                  </div>
                </div>

                {/* Features + CTA pinned to the end. */}
                <div className="flex flex-1 flex-col p-7">
                  <ul className="space-y-3">
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
                    <PlanButton
                      label={tier.cta.label}
                      planKey={tier.cta.planKey}
                      href={tier.cta.href}
                      className={`btn w-full ${featured ? "btn-brand" : "btn-secondary"}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted">
          Not sure which fits?{" "}
          <a href="#book" className="font-semibold text-brand transition-colors hover:text-brand-strong">
            Book a call
          </a>{" "}
          and we&apos;ll help you choose.
        </p>
      </div>
    </section>
  );
}
