import Hero from "@/components/modules/Hero";
import LogoMarquee from "@/components/modules/LogoMarquee";
import PainPoints from "@/components/modules/PainPoints";
import Services from "@/components/modules/Services";
import TextMarquee from "@/components/modules/TextMarquee/TextMarquee";
import Testimonials from "@/components/modules/Testimonials";
import Pricing from "@/components/modules/Pricing";
import Comparison from "@/components/modules/Comparison";
import Process from "@/components/modules/Process";
import Faq from "@/components/modules/Faq";
import CtaBanner from "@/components/modules/CtaBanner";
import ScrollReveal from "@/components/elements/ScrollReveal";
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

export default async function LandingPageTemplate({ data }: Props) {
  // ── Hero ─────────────────────────────────────────────────────────────────
  const heroData: HeroContent = {
    id: `${data.id}-hero`,
    eyebrow: { label: "Our Services", href: "/#mod-services" },
    headline: { parts: [{ type: "text", value: data.tagline }] },
    tagline: data.name,
    sub: data.description,
    ctas: [
      {
        id: `${data.id}-cta-book`,
        label: "Book a Discovery Call",
        href: "#book",
        variant: "primary",
      },
      {
        id: `${data.id}-cta-work`,
        label: "See our work",
        href: "/case-studies",
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
    eyebrow: `Why growX for ${data.name}`,
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

  return (
    <>
      <Hero data={heroData} />
      <ScrollReveal><LogoMarquee /></ScrollReveal>
      <PainPoints data={whyUsData} />
      <ScrollReveal><Services data={deliverablesData} /></ScrollReveal>
      <TextMarquee />
      <ScrollReveal><Testimonials /></ScrollReveal>
      <ScrollReveal><Pricing noPaddingTop /></ScrollReveal>
      <ScrollReveal><Comparison noPaddingTop /></ScrollReveal>
      <ScrollReveal><Process noPaddingTop /></ScrollReveal>
      <ScrollReveal><Faq data={faqData} /></ScrollReveal>
      <ScrollReveal><CtaBanner /></ScrollReveal>
    </>
  );
}
