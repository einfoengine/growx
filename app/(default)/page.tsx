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
import SectionTitle from "@/components/modules/SectionTitle/SectionTitle";
import {
  getComparison,
  getFaq,
  getNewsletter,
  getPricing,
  getTestimonials,
} from "@/lib/content";

/** Home — hero, then the body (#gw-home-body): benefits marquee, the 12-service
 *  catalog, the problem/pillars section, how-it-works, partner testimonials,
 *  the endorsing-agency logo wall, then the offer + trust run: partnership
 *  tiers → why-us comparison → FAQ → newsletter → sister brands. The footer's
 *  global CtaBanner ("Ready when you are") closes the page.
 *
 *  Section headings are standalone SectionTitle modules (the content modules
 *  render bodies only); each titled module gets noPaddingTop since the title
 *  provides the top spacing. */
export default async function HomePage() {
  const [testimonials, tiers, comparison, faq, newsletter] = await Promise.all([
    getTestimonials(),
    getPricing(),
    getComparison(),
    getFaq(),
    getNewsletter(),
  ]);

  return (
    <>
      <Hero />
      <div id="gw-home-body">
        <PartnerMarquee />
        <ServicesCatalog />
        {/* [ WHAT WE TAKE OFF YOUR PLATE ] — the problem/pillars section. */}
        <SectionTitle
          id="gw-mod-growth-pillars-title"
          eyebrow="What we take off your plate"
          headline={[
            { type: "text", value: "Three problems that cap growth, " },
            { type: "highlight", value: "handled for you." },
          ]}
          sub="You sell and scale. We handle fulfillment, your client relationships, and a partnership that expands as fast as you do."
          className="bg-surface"
        />
        <GrowthPillars noPaddingTop />
        <ServiceGallery />
        <ProcessJourney />
        {/* Trust cluster: quotes → logo wall → lineage, so the offer below
            lands on maximum credibility. */}
        <SectionTitle
          id="gw-mod-testimonials-title"
          eyebrow={testimonials.eyebrow}
          headline={testimonials.headline.parts}
          sub={testimonials.sub}
          className="bg-background"
        />
        <Testimonials noPaddingTop />
        <TrustedBy />
        {/* [ THREE BRANDS. ONE MISSION. ] */}
        <SisterBrands />
        {/* [ PARTNERSHIP TIERS ] — the offer, on the trust just built. */}
        <SectionTitle
          id="gw-mod-pricing-title"
          eyebrow={tiers.eyebrow}
          headline={tiers.headline.parts}
          sub={tiers.sub}
          className="bg-surface"
        />
        <PricingPlans noPaddingTop />
        {/* [ WHY AGENCIES CHOOSE US ] — the alternatives, priced against it. */}
        <SectionTitle
          id="gw-mod-comparison-title"
          eyebrow={comparison.eyebrow}
          headline={comparison.headline.parts}
          sub={comparison.sub}
          className="bg-background"
        />
        <Comparison noPaddingTop />
        {/* [ COMMON QUESTIONS ] — objections. */}
        <SectionTitle
          id="gw-mod-faq-title"
          eyebrow={faq.eyebrow}
          headline={faq.headline.parts}
          sub={faq.sub}
          className="bg-surface"
        />
        <Faq noPaddingTop />
        {/* [ THE GROWX LETTER ] — soft capture for the not-ready-yet. */}
        <SectionTitle
          id="gw-mod-newsletter-title"
          eyebrow={newsletter.eyebrow}
          headline={newsletter.headline.parts}
          sub={newsletter.sub}
          className="bg-background"
        />
        <Newsletter noPaddingTop />
      </div>
      {/* [ READY WHEN YOU ARE ] — the global CtaBanner in the footer, no longer
          hidden on this route. */}
    </>
  );
}
