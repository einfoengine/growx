import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, RefreshCw, Sparkles } from "lucide-react";
import type { ServicePageContent, ServicePricingModel } from "@/lib/content";

const PRICING_LABELS: Record<ServicePricingModel, { label: string; description: string }> = {
  "one-off": { label: "One-off project", description: "Scoped, quoted, delivered." },
  retainer: { label: "Monthly retainer", description: "Ongoing delivery, compounding results." },
  both: { label: "Flexible", description: "Available as a project or retainer." },
};

const PRICING_ICONS: Record<ServicePricingModel, typeof Sparkles> = {
  "one-off": Check,
  retainer: RefreshCw,
  both: Sparkles,
};

type Props = { data: ServicePageContent };

export default function ServicePage({ data }: Props) {
  const pricing = PRICING_LABELS[data.pricingModel];
  const PricingIcon = PRICING_ICONS[data.pricingModel];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        id={`${data.id}-hero`}
        className="relative overflow-hidden bg-background"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 left-1/2 -top-20 h-80 w-190 -translate-x-1/2 rounded-full bg-brand/8 blur-[90px]"
        />
        <div className="container-1200 pb-20 pt-12 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20">
          {/* Breadcrumb */}
          <Link
            href="/#mod-services"
            className="inline-flex items-center gap-1.5 text-xs text-muted transition hover:text-foreground"
          >
            <ArrowLeft size={13} />
            All services
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              {/* Pricing badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-foreground/80">
                <PricingIcon size={12} className="text-brand" />
                {pricing.label}: {pricing.description}
              </span>

              <h1
                id={`${data.id}-name`}
                className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              >
                {data.name}
              </h1>
              <p className="mt-4 text-xl font-medium text-brand">
                {data.tagline}
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                {data.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  id={`${data.id}-cta-primary`}
                  href="/book-a-call"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90 hover:shadow-[0_0_28px_rgba(16,185,129,0.3)]"
                >
                  Book a Discovery Call
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  id={`${data.id}-cta-secondary`}
                  href="/#mod-services"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition hover:text-foreground"
                >
                  Explore all services
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Deliverables quick-list on desktop */}
            <div
              id={`${data.id}-quick-list`}
              className="hidden lg:block rounded-2xl border border-border bg-surface p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                What&apos;s included
              </p>
              <ul className="mt-5 space-y-3">
                {data.deliverables.map((d) => (
                  <li key={d.id} className="flex items-start gap-2.5">
                    <Check size={15} className="mt-0.5 shrink-0 text-brand" />
                    <span className="text-sm text-foreground/80">{d.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Deliverables ─────────────────────────────────────── */}
      <section
        id={`${data.id}-deliverables`}
        aria-labelledby={`${data.id}-deliverables-heading`}
        className="bg-surface"
      >
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Full scope
            </p>
            <h2
              id={`${data.id}-deliverables-heading`}
              className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              What&apos;s included
            </h2>
            <p className="mt-3 text-base text-muted">
              Every deliverable scoped, priced, and agreed upfront. No surprises at handoff.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {data.deliverables.map((d) => (
              <div
                key={d.id}
                id={d.id}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-6"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10">
                  <Check size={15} className="text-brand" />
                </span>
                <h3 className="text-sm font-semibold text-foreground">{d.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why growX ────────────────────────────────────────── */}
      <section
        id={`${data.id}-why-us`}
        aria-labelledby={`${data.id}-why-heading`}
        className="bg-background"
      >
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Why growX
            </p>
            <h2
              id={`${data.id}-why-heading`}
              className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              Why agencies choose us for {data.name}
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {data.whyUs.map((item, i) => (
              <div key={item.id} id={item.id} className="flex flex-col gap-4">
                <span className="font-mono text-5xl font-semibold tracking-tight text-foreground/10">
                  0{i + 1}
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section
        id={`${data.id}-faq`}
        aria-labelledby={`${data.id}-faq-heading`}
        className="bg-surface"
      >
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Questions
            </p>
            <h2
              id={`${data.id}-faq-heading`}
              className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            >
              About {data.name}
            </h2>

            <dl
              id={`${data.id}-faq-list`}
              className="mt-10 divide-y divide-border"
            >
              {data.faq.map((item) => (
                <details
                  key={item.id}
                  id={item.id}
                  className="group py-5 marker:content-none"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <dt className="text-sm font-semibold text-foreground">
                      {item.question}
                    </dt>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-muted transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <dd className="mt-3 text-sm leading-relaxed text-muted">
                    {item.answer}
                  </dd>
                </details>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section
        id={`${data.id}-cta`}
        className="relative isolate overflow-hidden bg-foreground text-background"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent_75%)]"
        >
          <div className="absolute -top-40 left-1/2 h-130 w-[760px] -translate-x-1/2 rounded-full bg-(--brand-soft) blur-[140px]" />
        </div>

        <div className="container-1200 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Ready to start
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Add {data.name} to your roster.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-white/70">
            Bring the brief. We&apos;ll bring the team, the timeline, and a proposal in 24 hours.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/book-a-call"
              className="group inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition hover:opacity-90"
            >
              Book a Discovery Call
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/#mod-services"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
            >
              View all services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
