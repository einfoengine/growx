import Hero from "@/components/modules/Hero";
import LogoMarquee from "@/components/modules/LogoMarquee";
import PainPoints from "@/components/modules/PainPoints";
import Services from "@/components/modules/Services";
import TextMarquee from "@/components/modules/TextMarquee/TextMarquee";
import PricingPlans from "@/components/modules/Pricing";
import Comparison from "@/components/modules/Comparison";
import Process from "@/components/modules/Process";
import Faq from "@/components/modules/Faq";
import SectionTitle from "@/components/modules/SectionTitle/SectionTitle";
import { getComparison, getPricing } from "@/lib/content";
import type {
  FaqContent,
  HeroContent,
  PainIcon,
  PainPointsContent,
  ServiceIcon,
  ServicePageContent,
  ServicesContent,
} from "@/lib/content";

const SERVICE_ICONS: ServiceIcon[] = [
  "code", "search", "bot", "pen-tool", "share-2", "funnel", "target",
];

const PAIN_ICONS: PainIcon[] = [
  "layers", "trending-down", "clock", "triangle-alert", "user-x",
];

type Props = { data: ServicePageContent };

/** The shared service layout — every service without a `landing` block renders
 *  this (moved verbatim from LandingPageTemplate when the rich layout landed). */
export default async function LandingPageClassic({ data }: Props) {
  // ── Hero ─────────────────────────────────────────────────────────────────
  const heroData: HeroContent = {
    id: `${data.id}-hero`,
    eyebrow: { label: "Our Services", href: "/services" },
    headline: { parts: [{ type: "text", value: data.tagline }] },
    tagline: data.name,
    sub: data.description,
    ctas: [
      {
        id: `${data.id}-cta-book`,
        label: "Book a discovery call",
        href: "#book",
        variant: "primary",
      },
      {
        id: `${data.id}-cta-work`,
        label: "See our work",
        href: "/services",
      },
    ],
    stats: [],
  };

  // ── Deliverables → Services grid ─────────────────────────────────────────
  const deliverablesData: ServicesContent = {
    id: `${data.id}-deliverables`,
    eyebrow: "What's included",
    headline: {
      parts: [
        { type: "text", value: "Everything you need, " },
        { type: "highlight", value: "delivered." },
      ],
    },
    sub: "Every deliverable scoped and agreed upfront. No surprises at handoff.",
    cards: data.deliverables.map((d, i) => ({
      id: d.id,
      title: d.title,
      blurb: d.description,
      href: "#book",
      icon: SERVICE_ICONS[i % SERVICE_ICONS.length],
    })),
  };

  // ── Why Us → PainPoints (dark section) ───────────────────────────────────
  const whyUsData: PainPointsContent = {
    id: `${data.id}-why-us`,
    eyebrow: `Why partner with us`,
    headline: {
      parts: [
        { type: "text", value: "Why agencies choose " },
        { type: "highlight", value: "us" },
        { type: "text", value: " for this." },
      ],
    },
    sub: "Three reasons our partners never look elsewhere.",
    cards: data.whyUs.map((item, i) => ({
      id: item.id,
      title: item.title,
      blurb: item.description,
      icon: PAIN_ICONS[i % PAIN_ICONS.length],
    })),
  };

  // ── FAQ ───────────────────────────────────────────────────────────────────
  const faqData: FaqContent = {
    id: `${data.id}-faq`,
    eyebrow: "Questions",
    headline: {
      parts: [
        { type: "text", value: "Common questions about " },
        { type: "highlight", value: data.name.toLowerCase() },
        { type: "text", value: "." },
      ],
    },
    sub: "Everything you need to know before you brief us.",
    items: data.faq,
  };

  const [tiersHeader, comparisonHeader] = await Promise.all([
    getPricing(),
    getComparison(),
  ]);

  return (
    <>
      <Hero data={heroData} variant="inner" />
      <LogoMarquee />
      {/* Section headings are standalone SectionTitle modules; the content
          modules render bodies only and take noPaddingTop under a title. */}
      <div className="bg-foreground text-background" data-nav-theme="dark" data-dark-surface>
        <SectionTitle
          id={`gw-${whyUsData.id}-title`}
          eyebrow={whyUsData.eyebrow}
          headline={whyUsData.headline.parts}
          sub={whyUsData.sub}
        />
      </div>
      <PainPoints data={whyUsData} noPaddingTop />
      <Services data={deliverablesData} />
      <TextMarquee />
      <SectionTitle
        id="gw-mod-pricing-title"
        eyebrow={tiersHeader.eyebrow}
        headline={tiersHeader.headline.parts}
        sub={tiersHeader.sub}
        className="bg-surface"
      />
      <PricingPlans noPaddingTop />
      <SectionTitle
        id="gw-mod-comparison-title"
        eyebrow={comparisonHeader.eyebrow}
        headline={comparisonHeader.headline.parts}
        sub={comparisonHeader.sub}
        className="bg-background"
      />
      <Comparison noPaddingTop />
      <Process />
      <SectionTitle
        id={`gw-${faqData.id}-title`}
        eyebrow={faqData.eyebrow}
        headline={faqData.headline.parts}
        sub={faqData.sub}
        className="bg-surface"
      />
      <Faq data={faqData} noPaddingTop />
    </>
  );
}
