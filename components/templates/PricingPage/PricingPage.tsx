import { ArrowRight, Info } from "lucide-react";
import type { PricingPageContent, ServicePageContent } from "@/lib/content";
import SectionHeader from "@/components/elements/SectionHeader";
import Button from "@/components/elements/Button";
import Pricing from "@/components/modules/Pricing";
import InnerHeroBackdrop from "@/components/modules/Hero/InnerHeroBackdrop";
import PricingCalculator from "./PricingCalculator";

type Props = {
  pageData: PricingPageContent;
  services: ServicePageContent[];
};

export default function PricingPage({ pageData, services }: Props) {
  return (
    <>
      {/* ── Hero (dark, emerald-lit — same family as the home hero) ────── */}
      <section
        id="gw-pricing-hero"
        data-nav-theme="dark"
        className="relative isolate overflow-hidden bg-foreground text-background"
      >
        <InnerHeroBackdrop />
        <div className="container-1200 pb-20 pt-28 text-center sm:pb-24 sm:pt-32 lg:pt-36">
          <SectionHeader
            eyebrow={pageData.hero.eyebrow}
            headline={pageData.hero.headline.parts}
            as="h1"
            headlineClassName="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl"
            highlightClassName="text-gradient-brand"
            sub={pageData.hero.sub}
            subClassName="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
            align="center"
          />
        </div>
      </section>

      {/* ── Partnership tiers ────────────────────────────────── */}
      <Pricing noPaddingTop />

      {/* ── Estimate calculator ──────────────────────────────── */}
      <PricingCalculator pageData={pageData} services={services} />

      {/* ── Disclaimer note ──────────────────────────────────── */}
      <section id="gw-pricing-note" className="bg-surface">
        <div className="container-1200 py-8">
          <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-4">
            <Info size={15} className="mt-0.5 shrink-0 text-muted" />
            <p className="text-sm leading-relaxed text-muted">{pageData.note}</p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section id="gw-pricing-cta" className="relative overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 left-1/2 top-0 h-72 w-150 -translate-x-1/2 rounded-full bg-brand/8 blur-[90px]"
        />
        <div className="container-1200 py-24 text-center">
          <SectionHeader
            eyebrow="Not sure where to start?"
            headlineText="Start free, upgrade when you're ready."
            headlineClassName="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl"
            sub="Create a free partner account, browse the catalog, and place your first white-label order. Move up to Standard or VIP whenever you want more."
            subClassName="mx-auto mt-5 max-w-xl text-base text-muted"
            align="center"
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button label="Choose your tier" href="#gw-mod-pricing" icon={<ArrowRight size={15} />} />
            <Button label="Book a discovery call" href="#book" variant="secondary" />
          </div>
        </div>
      </section>
    </>
  );
}
