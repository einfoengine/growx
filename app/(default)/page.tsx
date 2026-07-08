import FulfillmentReasons from "@/components/modules/FulfillmentReasons/FulfillmentReasons";
import Hero from "@/components/modules/Hero";
import PartnerMarquee from "@/components/modules/PartnerMarquee/PartnerMarquee";
import SisterBrands from "@/components/modules/SisterBrands/SisterBrands";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PartnerMarquee />
      <SisterBrands />
      <FulfillmentReasons />
    </>
  );
}
