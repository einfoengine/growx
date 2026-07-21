import Hero from "@/components/modules/Hero";
import PartnerMarquee from "@/components/modules/PartnerMarquee/PartnerMarquee";
import ServicesCatalog from "@/components/modules/Services/ServicesCatalog";
import GrowthPillars from "@/components/modules/GrowthPillars/GrowthPillars";

/** Home — hero, then the body (#gw-home-body): benefits marquee and the
 *  12-service catalog. The other sections that used to follow (trust bar,
 *  fulfillment reasons, how-it-works, pricing, comparison, portfolio, sister
 *  brands, FAQ) are still intentionally out; the components still exist and
 *  are used on other routes.
 *
 *  The footer's CTA banner is global (rendered in the shared layout's Footer),
 *  so it's hidden on this route only via the scoped style below — server-
 *  rendered, so there's no hydration flash. */
export default function HomePage() {
  return (
    <>
      <style>{`#gw-mod-cta-banner{display:none}`}</style>
      <Hero />
      <div id="gw-home-body">
        <PartnerMarquee />
        <ServicesCatalog />
        <GrowthPillars />
      </div>
    </>
  );
}
