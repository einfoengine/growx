import { ArrowRight, Info } from "lucide-react";
import type { PricingPageContent, ServicePageContent } from "@/lib/content";
import SectionHeader from "@/components/elements/SectionHeader";
import Button from "@/components/elements/Button";
import Pricing from "@/components/modules/Pricing";
import PricingCalculator from "./PricingCalculator";

type Props = {
  pageData: PricingPageContent;
  services: ServicePageContent[];
};

export default function PricingPage({ pageData, services }: Props) {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section id="pricing-hero" className="relative overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 left-1/2 -top-24 h-80 w-175 -translate-x-1/2 rounded-full bg-brand/8 blur-[100px]"
        />
        <div className="container-1200 pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
          <SectionHeader
            eyebrow={pageData.hero.eyebrow}
            headline={pageData.hero.headline.parts}
            as="h1"
            headlineClassName="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            sub={pageData.hero.sub}
            subClassName="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
            align="center"
          />
        </div>
      </section>

      {/* ── Custom calculator ────────────────────────────────── */}
      <PricingCalculator pageData={pageData} services={services} />

      {/* ── Disclaimer note ──────────────────────────────────── */}
      <section id="pricing-note" className="bg-surface">
        <div className="container-1200 py-8">
          <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-4">
            <Info size={15} className="mt-0.5 shrink-0 text-muted" />
            <p className="text-sm leading-relaxed text-muted">{pageData.note}</p>
          </div>
        </div>
      </section>

      {/* ── Fixed-plan pricing module ────────────────────────── */}
      <Pricing noPaddingTop />

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section id="pricing-cta" className="relative overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 left-1/2 top-0 h-72 w-150 -translate-x-1/2 rounded-full bg-brand/8 blur-[90px]"
        />
        <div className="container-1200 py-24 text-center">
          <SectionHeader
            eyebrow="Not sure where to start?"
            headlineText="Let us scope it for you."
            headlineClassName="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
            sub="Book a free 30-minute discovery call. We'll map out the right services, quantities, and timeline for your client pipeline."
            subClassName="mx-auto mt-5 max-w-xl text-base text-muted"
            align="center"
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button label="Book a Discovery Call" href="#book" icon={<ArrowRight size={15} />} />
            <Button label="View our work" href="/works" variant="secondary" />
          </div>
        </div>
      </section>
    </>
  );
}
