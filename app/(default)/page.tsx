import Comparison from "@/components/modules/Comparison";
import Faq from "@/components/modules/Faq";
import FulfillmentReasons from "@/components/modules/FulfillmentReasons/FulfillmentReasons";
import Hero from "@/components/modules/Hero";
import HowItWorks from "@/components/modules/HowItWorks/HowItWorks";
import PartnerMarquee from "@/components/modules/PartnerMarquee/PartnerMarquee";
import Portfolio from "@/components/modules/Portfolio/Portfolio";
import PricingPlans from "@/components/modules/Pricing/PricingPlans";
import ServicesCatalog from "@/components/modules/Services/ServicesCatalog";
import SisterBrands from "@/components/modules/SisterBrands/SisterBrands";
import TrustBar from "@/components/modules/TrustBar/TrustBar";

/** Home, sequenced to the persuasion arc: who/what (hero + proof stats) ->
 *  the pain -> the catalog (resolution) -> how it works (call-first) -> the
 *  offer -> why us -> proof (real work + lineage) -> objections.
 *
 *  Testimonials are intentionally absent until real partner quotes exist —
 *  never ship invented people as proof. Newsletter returns when the ESP is
 *  wired (the form currently errors on submit). */
export default function HomePage() {
  return (
    <>
      <Hero />
      <PartnerMarquee />
      <TrustBar />
      {/* The problem before the solution's menu. */}
      <FulfillmentReasons />
      <ServicesCatalog />
      <HowItWorks />
      <PricingPlans />
      <Comparison />
      {/* Proof block: the work, then the lineage that anchors "since 2019". */}
      <Portfolio />
      <SisterBrands />
      <Faq />
    </>
  );
}
