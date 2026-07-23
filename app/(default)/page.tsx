import Hero from "@/components/modules/Hero";
import PartnerMarquee from "@/components/modules/PartnerMarquee/PartnerMarquee";
import ServicesCatalog from "@/components/modules/Services/ServicesCatalog";
import ServiceGallery from "@/components/modules/ServiceGallery/ServiceGallery";
import GrowthPillars from "@/components/modules/GrowthPillars/GrowthPillars";
import ProcessJourney from "@/components/modules/ProcessJourney/ProcessJourney";
import Testimonials from "@/components/modules/Testimonials/Testimonials";
import TrustedBy from "@/components/modules/TrustedBy/TrustedBy";
import PricingPlans from "@/components/modules/Pricing/PricingPlans";
import Comparison from "@/components/modules/Comparison";
import Faq from "@/components/modules/Faq";
import Newsletter from "@/components/modules/Newsletter";
import SisterBrands from "@/components/modules/SisterBrands/SisterBrands";

/** Home — hero, then the body (#gw-home-body): benefits marquee, the 12-service
 *  catalog, the problem/pillars section, how-it-works, partner testimonials,
 *  the endorsing-agency logo wall, then the offer + trust run: partnership
 *  tiers → why-us comparison → FAQ → newsletter → sister brands. The footer's
 *  global CtaBanner ("Ready when you are") closes the page. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <div id="gw-home-body">
        <PartnerMarquee />
        <ServicesCatalog />
        <GrowthPillars />
        <ServiceGallery />
        <ProcessJourney />
        {/* Trust cluster: quotes → logo wall → lineage, so the offer below
            lands on maximum credibility. */}
        <Testimonials />
        <TrustedBy />
        {/* [ THREE BRANDS. ONE MISSION. ] */}
        <SisterBrands />
        {/* [ PARTNERSHIP TIERS ] — the offer, on the trust just built. */}
        <PricingPlans />
        {/* [ WHY AGENCIES CHOOSE US ] — the alternatives, priced against it. */}
        <Comparison />
        {/* [ COMMON QUESTIONS ] — objections. */}
        <Faq />
        {/* [ THE GROWX LETTER ] — soft capture for the not-ready-yet. */}
        <Newsletter />
      </div>
      {/* [ READY WHEN YOU ARE ] — the global CtaBanner in the footer, no longer
          hidden on this route. */}
    </>
  );
}
