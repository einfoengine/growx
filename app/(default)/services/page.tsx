import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clapperboard,
  Code,
  Filter,
  PenTool,
  Scissors,
  Search,
  Share2,
  Target,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { getAllServices, type ServicePageContent, type ServicePricingModel } from "@/lib/content";
import SectionHeader from "@/components/elements/SectionHeader";
import Button from "@/components/elements/Button";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import InnerHeroBackdrop from "@/components/modules/Hero/InnerHeroBackdrop";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Every service your agency sells, delivered under your brand. Web, SEO, paid media, content, social, funnels, and video, plus full HighLevel services. Productized with fixed pricing and clear SLAs, 100% white-label.",
};

// Slug → icon. Falls back to Workflow for anything unmapped.
const SERVICE_ICONS: Record<string, LucideIcon> = {
  website: Code,
  "seo-aeo": Search,
  ppc: Target,
  content: PenTool,
  social: Share2,
  funnels: Filter,
  "video-production": Clapperboard,
  "video-editing": Scissors,
  highlevel: Workflow,
};

const PRICING_LABELS: Record<ServicePricingModel, string> = {
  "one-off": "One-off project",
  retainer: "Monthly retainer",
  both: "Project or retainer",
};

function ServiceCard({ service }: { service: ServicePageContent }) {
  const Icon = SERVICE_ICONS[service.slug] ?? Workflow;
  return (
    <Link
      id={`gw-services-card-${service.slug}`}
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col rounded-2xl border border-border bg-background p-6 transition-colors hover:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10">
          <Icon size={18} className="text-brand" />
        </span>
        <ArrowUpRight
          size={18}
          aria-hidden="true"
          className="text-muted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:text-brand"
        />
      </div>

      <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
        {service.name}
      </h3>
      <p className="mt-2 text-sm font-medium text-brand">{service.tagline}</p>

      <ul className="mt-4 space-y-2">
        {service.deliverables.slice(0, 3).map((d) => (
          <li key={d.id} className="flex items-start gap-2 text-[13px] leading-snug">
            <Check size={14} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
            <span className="text-foreground/80">{d.title}</span>
          </li>
        ))}
      </ul>

      <span className="mt-auto pt-5 text-xs font-medium uppercase tracking-[0.14em] text-muted">
        {PRICING_LABELS[service.pricingModel]}
      </span>
    </Link>
  );
}

export default async function ServicesOverviewRoute() {
  const services = await getAllServices();

  return (
    <>
      {/* ── Hero (dark, emerald-lit — same family as the home hero) ────── */}
      <section
        id="gw-services-hero"
        aria-labelledby="gw-services-headline"
        data-nav-theme="dark"
        className="relative isolate overflow-hidden bg-foreground text-background"
      >
        <InnerHeroBackdrop />
        <div className="container-1200 pb-20 pt-28 text-center sm:pt-32 lg:pb-24 lg:pt-36">
          <ScrollFadeIn delay={0.1}>
            <SectionHeader
              as="h1"
              eyebrow="Our services"
              headline={[
                { type: "text", value: "Every service you sell, " },
                { type: "highlight", value: "delivered under your brand." },
              ]}
              headlineId="gw-services-headline"
              headlineClassName="mt-4 text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl"
              highlightClassName="text-gradient-brand"
              sub="Web, SEO, paid media, content, social, funnels, and video, plus full HighLevel services. Productized with fixed pricing and clear SLAs, ordered in one click and delivered 100% white-label."
              subClassName="mx-auto mt-5 max-w-2xl text-base text-white/70 sm:text-lg"
              align="center"
              maxWidth="max-w-3xl"
            />
          </ScrollFadeIn>
          <ScrollFadeIn delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                id="gw-services-cta-book"
                label="Book a partner call"
                href="#book"
                icon={<ArrowRight size={15} />}
                darkBg
              />
              <Button
                id="gw-services-cta-pricing"
                label="See pricing"
                href="/pricing"
                variant="secondary"
                icon={<ArrowRight size={13} />}
                darkBg
              />
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* ── Catalog grid ─────────────────────────────────────── */}
      <section id="gw-services-catalog" aria-label="Service catalog" className="bg-surface">
        <div className="container-1200 py-24 sm:py-28 lg:py-32">
          <ScrollFadeIn delay={0.1}>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* ── Bottom CTA (CtaBanner pattern: dark, glow + grid, nav-theme) ── */}
      <section
        id="gw-services-cta"
        aria-labelledby="gw-services-cta-headline"
        data-nav-theme="dark"
        className="relative isolate overflow-hidden bg-foreground text-background"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent_75%)]"
        >
          <div className="absolute -top-40 left-1/2 h-130 w-[760px] -translate-x-1/2 rounded-full bg-(--brand-soft) blur-[140px]" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent_85%)]"
        />

        <div className="container-1200 relative py-24 text-center sm:py-28 lg:py-32">
          <ScrollFadeIn delay={0.1}>
            <SectionHeader
              eyebrow="One team behind it all"
              headlineText="Not sure which to start with?"
              headlineId="gw-services-cta-headline"
              headlineClassName="mt-4 text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl"
              sub="Book a partner call and we'll map the services to what your clients actually need, then deliver them under your brand."
              subClassName="mx-auto mt-6 max-w-xl text-base text-white/70 sm:text-lg"
              align="center"
            />
          </ScrollFadeIn>
          <ScrollFadeIn delay={0.3}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button label="Book a partner call" href="#book" icon={<ArrowRight size={16} />} darkBg />
              <Button label="See how it works" href="/process" variant="secondary" icon={<ArrowRight size={14} />} darkBg />
            </div>
          </ScrollFadeIn>
        </div>
      </section>
    </>
  );
}
