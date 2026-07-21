import Hero from "@/components/modules/Hero";

/** Home — the hero only. The sections that followed it (marquee, trust bar,
 *  fulfillment reasons, catalog, how-it-works, pricing, comparison, portfolio,
 *  sister brands, FAQ) were intentionally removed; the components still exist
 *  and are used on other routes.
 *
 *  The footer's CTA banner is global (rendered in the shared layout's Footer),
 *  so it's hidden on this route only via the scoped style below — server-
 *  rendered, so there's no hydration flash. */
export default function HomePage() {
  return (
    <>
      <style>{`#gw-mod-cta-banner{display:none}`}</style>
      <Hero />
    </>
  );
}
