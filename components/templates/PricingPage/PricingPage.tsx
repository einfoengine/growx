import { ArrowRight } from "lucide-react";
import type { PricingPageContent, ServicePageContent } from "@/lib/content";
import SectionHeader from "@/components/elements/SectionHeader";
import Button from "@/components/elements/Button";
import PricingPlans from "@/components/modules/Pricing";
import HowItWorks from "@/components/modules/HowItWorks/HowItWorks";
import Testimonials from "@/components/modules/Testimonials/Testimonials";
import CtaBanner from "@/components/modules/CtaBanner/CtaBanner";
import Faq from "@/components/modules/Faq";
import InnerHeroBackdrop from "@/components/modules/Hero/InnerHeroBackdrop";
import PricingBand from "./PricingBand";
import SavingsCalculator from "./SavingsCalculator";
import TierMatrix from "./TierMatrix";
import ServicePreview from "./ServicePreview";

type Props = {
  pageData: PricingPageContent;
  services: ServicePageContent[];
};

/** /pricing, built to convert: credibility and reframe up top, the offer high,
 *  the savings calculator doing the persuading, then completeness, proof, and a
 *  free-signup close. Every block reuses a shared module so the page can never
 *  drift from the rest of the site. */
export default function PricingPage({ pageData }: Props) {
  return (
    <>
      {/* 01 ── Hero: the reframe thesis, primary CTA is Join free ──────── */}
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
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button label="Join free" href="#onboard-free" icon={<ArrowRight size={16} />} darkBg />
            <Button label="Compare tiers" href="#gw-mod-pricing" variant="secondary" darkBg />
          </div>
        </div>
      </section>

      {/* 02 ── Reframe strip: three objections, killed before they form ── */}
      <PricingBand
        dark
        items={[
          { label: "$0 to join" },
          { label: "Fixed price per service" },
          { label: "Cancel anytime" },
        ]}
      />

      {/* 03 ── Tier module (same component as home, no manufactured badge) ─ */}
      <PricingPlans hidePopularBadge />

      {/* 04 ── Savings calculator: the page's most persuasive element ───── */}
      <SavingsCalculator />

      {/* 05 ── Comparison matrix: where completeness lives ──────────────── */}
      <TierMatrix />

      {/* 06 ── Per-service preview: proves fixed pricing is real ────────── */}
      <ServicePreview />

      {/* 07 ── How it works (shared component, already tells this story) ── */}
      <HowItWorks />

      {/* 08 ── Proof and guarantees ─────────────────────────────────────── */}
      <Testimonials />
      <PricingBand
        withChecks
        items={[
          { label: "100% white-label", sub: "Full commercial rights, your brand on everything" },
          { label: "We stay invisible", sub: "Your client never learns growX exists" },
          { label: "Cancel anytime", sub: "Month to month, no lock-in" },
        ]}
      />

      {/* 09 ── FAQ (shared component, pricing-specific data) ────────────── */}
      <Faq data={pageData.faq} />

      {/* 10 ── Closing CTA (shared banner, pricing-specific data) ───────── */}
      <CtaBanner data={pageData.closingCta} />
    </>
  );
}
