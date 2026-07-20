import type { PricingPageContent, ServicePageContent } from "@/lib/content";
import { getPricing } from "@/lib/content";
import type { TierKey } from "@/lib/config/pricing";
import SectionHeader from "@/components/elements/SectionHeader";
import InnerHeroBackdrop from "@/components/modules/Hero/InnerHeroBackdrop";
import PricingPlans from "@/components/modules/Pricing";
import PlanButton from "@/components/modules/Pricing/PlanButton";
import BookingSection from "@/components/modules/BookingSection/BookingSection";
import ServiceCatalog from "./ServiceCatalog";
import EstimateCalculator, { type PlanInfo } from "./EstimateCalculator";
import JoinCta from "./JoinCta";

type Props = {
  pageData: PricingPageContent;
  services: ServicePageContent[];
};

const TIER_KEY: Record<string, TierKey> = { Free: "free", Standard: "standard", VIP: "vip" };

/** /pricing, focused on the transaction: the plans, the service catalog with
 *  add-to-cart, an estimate-and-savings calculator, a booking calendar, and a
 *  free-signup close. Non-pricing sections (how it works, testimonials, etc.)
 *  live on other pages. */
export default async function PricingPage({ pageData }: Props) {
  const pricing = await getPricing();
  const plans: PlanInfo[] = pricing.tiers
    .map((t) => ({ key: TIER_KEY[t.name], name: t.name, features: t.features }))
    .filter((p): p is PlanInfo => Boolean(p.key));

  return (
    <>
      {/* Hero */}
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
            <PlanButton label="Join free" planKey="free" className="btn btn-brand" />
            <PlanButton label="How it works" href="#how-it-works" className="btn btn-secondary-dark" />
          </div>
        </div>
      </section>

      {/* Membership plans */}
      <PricingPlans hidePopularBadge />

      {/* Service catalog with add-to-cart */}
      <ServiceCatalog />

      {/* Estimate, savings, and checkout */}
      <EstimateCalculator plans={plans} />

      {/* Book a call */}
      <BookingSection />

      {/* Join / do-not-miss close */}
      <JoinCta />
    </>
  );
}
