import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, RefreshCw, Sparkles } from "lucide-react";
import type { ServicePageContent, ServicePricingModel } from "@/lib/content";
import SectionHeader from "@/components/elements/SectionHeader";
import Button from "@/components/elements/Button";

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
        id={`gw-${data.id}-hero`}
        className="relative overflow-hidden bg-background"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 left-1/2 -top-20 h-80 w-190 -translate-x-1/2 rounded-full bg-brand/8 blur-[90px]"
        />
        <div className="container-1200 pb-20 pt-12 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20">
          {/* Breadcrumb */}
          <Link
            href="/#gw-mod-services"
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
                <Button
                  id={`${data.id}-cta-primary`}
                  label="Book a Discovery Call"
                  href="#book"
                  icon={<ArrowRight size={15} />}
                  className="hover:shadow-[0_0_28px_rgba(16,185,129,0.3)]"
                />
                <Button
                  id={`${data.id}-cta-secondary`}
                  label="Explore all services"
                  href="/#gw-mod-services"
                  variant="ghost"
                  icon={<ArrowRight size={13} />}
                />
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
        id={`gw-${data.id}-deliverables`}
        aria-labelledby={`${data.id}-deliverables-heading`}
        className="bg-surface"
      >
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <SectionHeader
            eyebrow="Full scope"
            headlineText="What's included"
            headlineId={`${data.id}-deliverables-heading`}
            headlineClassName="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            sub="Every deliverable scoped, priced, and agreed upfront. No surprises at handoff."
            subClassName="mt-3 text-base text-muted"
            className="max-w-xl"
          />

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
        id={`gw-${data.id}-why-us`}
        aria-labelledby={`${data.id}-why-heading`}
        className="bg-background"
      >
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <SectionHeader
            eyebrow="Why growX"
            headlineText={`Why agencies choose us for ${data.name}`}
            headlineId={`${data.id}-why-heading`}
            headlineClassName="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            className="max-w-xl"
          />

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
        id={`gw-${data.id}-faq`}
        aria-labelledby={`${data.id}-faq-heading`}
        className="bg-surface"
      >
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <SectionHeader
            eyebrow="Questions"
            headlineText={`About ${data.name}`}
            headlineId={`${data.id}-faq-heading`}
            headlineClassName="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            align="center"
            maxWidth="max-w-2xl"
          />

          <dl
            id={`${data.id}-faq-list`}
            className="mx-auto mt-10 max-w-2xl divide-y divide-border"
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
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section
        id={`gw-${data.id}-cta`}
        className="relative isolate overflow-hidden bg-foreground text-background"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent_75%)]"
        >
          <div className="absolute -top-40 left-1/2 h-130 w-[760px] -translate-x-1/2 rounded-full bg-(--brand-soft) blur-[140px]" />
        </div>

        <div className="container-1200 py-24 text-center">
          <SectionHeader
            eyebrow="Ready to start"
            headlineText={`Add ${data.name} to your roster.`}
            headlineClassName="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
            sub="Bring the brief. We'll bring the team, the timeline, and a proposal in 24 hours."
            subClassName="mx-auto mt-5 max-w-xl text-base text-white/70"
            align="center"
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button label="Book a Discovery Call" href="#book" icon={<ArrowRight size={15} />} darkBg />
            <Button label="View all services" href="/#gw-mod-services" variant="secondary" darkBg />
          </div>
        </div>
      </section>
    </>
  );
}
