import FulfillmentReasons from "@/components/modules/FulfillmentReasons/FulfillmentReasons";
import Hero from "@/components/modules/Hero";
import HowItWorks from "@/components/modules/HowItWorks/HowItWorks";
import PartnerMarquee from "@/components/modules/PartnerMarquee/PartnerMarquee";
import Portfolio from "@/components/modules/Portfolio/Portfolio";
import PricingPlans from "@/components/modules/Pricing/PricingPlans";
import ServicesCatalog from "@/components/modules/Services/ServicesCatalog";
import SisterBrands from "@/components/modules/SisterBrands/SisterBrands";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PartnerMarquee />
      <SisterBrands />
      <FulfillmentReasons />
      <ServicesCatalog />
      <HowItWorks />
      <Portfolio />
      <PricingPlans />
    </>
  );
}
