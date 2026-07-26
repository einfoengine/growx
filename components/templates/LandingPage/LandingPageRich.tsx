import Hero from "@/components/modules/Hero";
import HeroVideo from "@/components/modules/Hero/HeroVideo";
import HeroVideoPerspective from "@/components/modules/Hero/HeroVideoPerspective";
import PartnerMarquee from "@/components/modules/PartnerMarquee/PartnerMarquee";
import ServicesCatalog, {
  type ServicesCatalogData,
} from "@/components/modules/Services/ServicesCatalog";
import Portfolio from "@/components/modules/Portfolio/Portfolio";
import ServicePricing from "@/components/modules/ServicePricing/ServicePricing";
import ProcessJourney from "@/components/modules/ProcessJourney/ProcessJourney";
import Testimonials from "@/components/modules/Testimonials/Testimonials";
import TrustedBy from "@/components/modules/TrustedBy/TrustedBy";
import PricingPlans from "@/components/modules/Pricing";
import Comparison from "@/components/modules/Comparison";
import Faq from "@/components/modules/Faq";
import SisterBrands from "@/components/modules/SisterBrands/SisterBrands";
import GrowthPillars, {
  type GrowthPillarsData,
} from "@/components/modules/GrowthPillars/GrowthPillars";
import SectionTitle from "@/components/modules/SectionTitle/SectionTitle";
import {
  getComparison,
  getPricing,
  getServicePricingConfig,
  getTestimonials,
} from "@/lib/content";
import type {
  FaqContent,
  HeroContent,
  ServiceIcon,
  ServicePageContent,
} from "@/lib/content";

const SERVICE_ICONS: ServiceIcon[] = [
  "code", "search", "bot", "pen-tool", "share-2", "funnel", "target",
];

type Props = { data: ServicePageContent };

/** The high-converting service landing layout, used by services whose JSON
 *  carries a `landing` block. Every section is a HOME-page component fed with
 *  this service's data (GrowthPillars renders the pains, features, and why-us
 *  sections; PartnerMarquee scrolls the platform list) — the only page-specific
 *  module is ServicePricing, whose margin calculator has no home equivalent.
 *  The arc: promise → VSL → credibility → agitate → solution → features →
 *  proof → endorsement → money → mechanics → social proof → packages →
 *  differentiation → objections; the footer's global CtaBanner closes. */
export default async function LandingPageRich({ data }: Props) {
  const landing = data.landing!;
  // Shared-module headers: every section heading is a standalone SectionTitle
  // module now, so the template fetches the header copy the shared modules
  // (Testimonials, PricingPlans, Comparison) used to render themselves.
  const [pricingConfig, testimonialsHeader, tiersHeader, comparisonHeader] =
    await Promise.all([
      getServicePricingConfig(data.slug),
      getTestimonials(),
      getPricing(),
      getComparison(),
    ]);
  const workId = `gw-mod-${data.slug}-work`;
  const hasWork = Boolean(landing.work);

  // ── Hero: the classic mapping, upgraded with proof stats + a lower ask ───
  const heroData: HeroContent = {
    id: `${data.id}-hero`,
    eyebrow: { label: "Our Services", href: "/services" },
    headline: { parts: [{ type: "text", value: data.tagline }] },
    tagline: data.name,
    sub: data.description,
    ctas: [
      {
        id: `${data.id}-cta-book`,
        label: "Book a partner call",
        href: "#book",
        variant: "primary",
      },
      landing.hero?.secondaryCta ?? {
        id: `${data.id}-cta-work`,
        label: "See real builds",
        href: `#${workId}`,
      },
    ],
    ctaNote: landing.hero?.ctaNote,
    stats: landing.hero?.stats ?? [],
  };

  // ── Pains → GrowthPillars (the home problems section, our data) ──────────
  const painsData: GrowthPillarsData | null = landing.pains
    ? {
        id: landing.pains.id,
        eyebrow: landing.pains.eyebrow,
        headline: landing.pains.headline,
        sub: landing.pains.sub,
        pointsIcon: "dot",
        noPaddingTop: true,
        cards: landing.pains.cards.map((card, i) => ({
          id: card.id,
          label: `Problem 0${i + 1}`,
          icon: card.icon,
          title: card.title,
          blurb: card.blurb,
          points: card.points,
        })),
      }
    : null;

  // ── Feature groups → GrowthPillars (checklist cards, no backdrop) ────────
  const featuresData: GrowthPillarsData | null = landing.features
    ? {
        id: `mod-${data.slug}-features`,
        eyebrow: landing.features.eyebrow,
        headline: landing.features.headline,
        sub: landing.features.sub,
        backdrop: false,
        // With work present: pains(S) → features(W) → work(S) → pricing(W).
        // Without work the parity breaks; features drops to surface so the
        // only repeated ground sits beside the pains section, whose parallax
        // backdrop keeps the two visually distinct.
        tone: hasWork ? "background" : "surface",
        pointsIcon: "check",
        noPaddingTop: true,
        cards: landing.features.groups.map((group) => ({
          id: group.id,
          icon: group.icon,
          title: group.title,
          points: group.items,
        })),
      }
    : null;

  // ── WhyUs trio → GrowthPillars (numbered cards on white, before the table) ─
  const whyData: GrowthPillarsData | null = landing.differentiators
    ? {
        id: `${data.id}-why`,
        eyebrow: landing.differentiators.eyebrow,
        headline: landing.differentiators.headline,
        sub: landing.differentiators.sub,
        backdrop: false,
        tone: "background",
        noPaddingTop: true,
        cards: data.whyUs.map((item, i) => ({
          id: item.id,
          label: `0${i + 1}`,
          title: item.title,
          blurb: item.description,
        })),
      }
    : null;

  // ── Deliverables → the home catalog grid, framed for sellability ─────────
  const deliverablesData: ServicesCatalogData = {
    id: `mod-${data.slug}-deliverables`,
    eyebrow: "What's included",
    headline: {
      parts: [
        { type: "text", value: "A complete build you hand your client — " },
        { type: "highlight", value: "sold as yours." },
      ],
    },
    sub: "Every deliverable scoped and agreed upfront. No surprises at handoff — and nothing left for you to finish.",
    items: data.deliverables.map((d, i) => ({
      id: d.id,
      title: d.title,
      desc: d.description,
      icon: SERVICE_ICONS[i % SERVICE_ICONS.length],
    })),
  };

  // ── FAQ: base questions + the landing extras ─────────────────────────────
  const faqData: FaqContent = {
    id: `${data.id}-faq`,
    eyebrow: "Common questions",
    headline: {
      parts: [
        { type: "text", value: "Asked before " },
        { type: "highlight", value: "every partnership." },
      ],
    },
    sub: "Everything agency owners ask us before their first order.",
    items: [...data.faq, ...(landing.faqExtra ?? [])],
  };

  return (
    <>
      {/* 1 — Promise */}
      <Hero data={heroData} variant="inner" />

      {/* 1b — VSL, directly under the hero (same treatment as home: the video
          continues the hero's dark band and follows its theme). */}
      {landing.vsl && (
        <section
          id={`gw-${data.id}-vsl`}
          aria-label={`${data.name} — video`}
          data-nav-theme="dark"
          data-dark-surface
          className="relative bg-foreground pb-20 text-background sm:pb-24"
        >
          <div className="container-1200">
            <HeroVideoPerspective className="w-full">
              <HeroVideo videoId={landing.vsl.videoId} />
            </HeroVideoPerspective>
          </div>
        </section>
      )}

      {/* 2 — Credibility: the platforms we build on, scrolled in the home
          marquee band (black contrast band in both themes). */}
      {landing.platforms && (
        <PartnerMarquee
          id={`gw-mod-${data.slug}-platforms`}
          ariaLabel="Platforms we build on"
          items={landing.platforms}
        />
      )}

      {/* 3 — Solution first, home order (catalog → problems): the productized
          deliverable in the home catalog's exact bordered diamond-node grid. */}
      <ServicesCatalog data={deliverablesData} />

      {/* 4 — Agitate: the real cost of reselling without a bench — the home
          problems section, fed with this service's pains. */}
      {painsData && landing.pains && (
        <>
          <SectionTitle
            id={`gw-${landing.pains.id}-title`}
            eyebrow={landing.pains.eyebrow}
            headline={landing.pains.headline.parts}
            sub={landing.pains.sub}
            className="bg-surface"
          />
          <GrowthPillars data={painsData} />
        </>
      )}

      {/* 5 — The complete feature list (home's showcase slot): unique design
          (never AI templates), the stack (Next.js / GHL builder), performance,
          security, maintenance, support. */}
      {featuresData && landing.features && (
        <>
          <SectionTitle
            id={`gw-mod-${data.slug}-features-title`}
            eyebrow={landing.features.eyebrow}
            headline={landing.features.headline.parts}
            sub={landing.features.sub}
            className={hasWork ? "bg-background" : "bg-surface"}
          />
          <GrowthPillars data={featuresData} />
        </>
      )}

      {/* 5b — Proof: recent builds, shipped white-label. */}
      {landing.work && (
        <>
          <SectionTitle
            id={`${workId}-title`}
            eyebrow={landing.work.eyebrow}
            headline={landing.work.headline.parts}
            sub={landing.work.sub}
            className="bg-surface"
          />
          <Portfolio
            id={workId}
            tone="surface"
            category={landing.work.category}
            noPaddingTop
          />
        </>
      )}

      {/* 6 — Money: transparent rate card, margin math, risk reversal. */}
      {landing.pricing && pricingConfig && (
        <>
          <SectionTitle
            id="gw-mod-service-pricing-title"
            eyebrow={landing.pricing.eyebrow}
            headline={landing.pricing.headline.parts}
            sub={landing.pricing.sub}
            className="bg-background"
          />
          <ServicePricing
            config={pricingConfig}
            content={landing.pricing}
            noPaddingTop
          />
        </>
      )}

      {/* 7 — Mechanics: the same how-it-works section the home page uses. */}
      <ProcessJourney />

      {/* 8-10 — The home trust cluster, in home order: quotes → logo wall →
          lineage. The offer below lands on maximum credibility. */}
      <SectionTitle
        id="gw-mod-testimonials-title"
        eyebrow={testimonialsHeader.eyebrow}
        headline={testimonialsHeader.headline.parts}
        sub={testimonialsHeader.sub}
        className="bg-background"
      />
      <Testimonials noPaddingTop />
      <TrustedBy />
      <SisterBrands />

      {/* 11 — The membership packages: what paid members get on every order,
          and the free Vendor tier — the "join free" invitation (home module). */}
      <SectionTitle
        id="gw-mod-pricing-title"
        eyebrow={tiersHeader.eyebrow}
        headline={tiersHeader.headline.parts}
        sub={tiersHeader.sub}
        className="bg-surface"
      />
      <PricingPlans noPaddingTop />

      {/* 12 — Differentiation: the whyUs trio, then the comparison table. */}
      {whyData && landing.differentiators && (
        <>
          <SectionTitle
            id={`gw-${data.id}-why-title`}
            eyebrow={landing.differentiators.eyebrow}
            headline={landing.differentiators.headline.parts}
            sub={landing.differentiators.sub}
            className="bg-background"
          />
          <GrowthPillars data={whyData} />
        </>
      )}
      <SectionTitle
        id="gw-mod-comparison-title"
        eyebrow={comparisonHeader.eyebrow}
        headline={comparisonHeader.headline.parts}
        sub={comparisonHeader.sub}
        className="bg-background"
      />
      <Comparison noPaddingTop />

      {/* 10 — Objections. The footer's global CtaBanner ("Ready when you
          are", #book) is the page's close — booking itself opens in the
          globally-mounted BookingModal, exactly like the home page. */}
      <SectionTitle
        id={`gw-${data.id}-faq-title`}
        eyebrow={faqData.eyebrow}
        headline={faqData.headline.parts}
        sub={faqData.sub}
        className="bg-surface"
      />
      <Faq data={faqData} noPaddingTop />
    </>
  );
}
