import {
  Check,
  Clock,
  Code,
  Gauge,
  Headset,
  Layers,
  Palette,
  Shield,
  TrendingDown,
  TriangleAlert,
  UserX,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import Hero from "@/components/modules/Hero";
import HeroVideo from "@/components/modules/Hero/HeroVideo";
import HeroVideoPerspective from "@/components/modules/Hero/HeroVideoPerspective";
import TrustBar from "@/components/modules/TrustBar/TrustBar";
import Services from "@/components/modules/Services";
import Portfolio from "@/components/modules/Portfolio/Portfolio";
import ServicePricing from "@/components/modules/ServicePricing/ServicePricing";
import ProcessJourney from "@/components/modules/ProcessJourney/ProcessJourney";
import Testimonials from "@/components/modules/Testimonials/Testimonials";
import TrustedBy from "@/components/modules/TrustedBy/TrustedBy";
import PricingPlans from "@/components/modules/Pricing";
import Comparison from "@/components/modules/Comparison";
import Faq from "@/components/modules/Faq";
import BookingSection from "@/components/modules/BookingSection/BookingSection";
import { ProblemBackground } from "@/components/modules/GrowthPillars/GrowthPillars";
import SectionHeader from "@/components/elements/SectionHeader";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import { getServicePricingConfig } from "@/lib/content";
import type {
  FaqContent,
  HeroContent,
  PainIcon,
  ServiceIcon,
  ServiceLandingFeatureGroup,
  ServicePageContent,
  ServicesContent,
} from "@/lib/content";

const SERVICE_ICONS: ServiceIcon[] = [
  "code", "search", "bot", "pen-tool", "share-2", "funnel", "target",
];

/** PainIcon key → lucide glyph, for the problem cards' black icon stickers
 *  (same treatment as the home ProcessJourney step chips). */
const PAIN_GLYPHS: Record<PainIcon, LucideIcon> = {
  "triangle-alert": TriangleAlert,
  "user-x": UserX,
  layers: Layers,
  "trending-down": TrendingDown,
  clock: Clock,
};

/** Feature-group icon key → lucide glyph (black sticker chips). */
const FEATURE_GLYPHS: Record<ServiceLandingFeatureGroup["icon"], LucideIcon> = {
  palette: Palette,
  code: Code,
  gauge: Gauge,
  shield: Shield,
  wrench: Wrench,
  headset: Headset,
};

type Props = { data: ServicePageContent };

/** The high-converting service landing layout, used by services whose JSON
 *  carries a `landing` block. Composed from the HOME page's design system —
 *  same modules, same section rhythm (white/surface alternation, black
 *  contrast bands), same card + gradient-headline language. The arc:
 *  promise → credibility → agitate → solution → proof → money → mechanics →
 *  differentiation → objections → close. */
export default async function LandingPageRich({ data }: Props) {
  const landing = data.landing!;
  const pricingConfig = await getServicePricingConfig(data.slug);
  const workId = `gw-mod-${data.slug}-work`;

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

  // ── Deliverables → Services grid, framed for sellability ────────────────
  const deliverablesData: ServicesContent = {
    id: `${data.id}-deliverables`,
    eyebrow: "What's included",
    headline: {
      parts: [
        { type: "text", value: "A complete build you hand your client — " },
        { type: "highlight", value: "sold as yours." },
      ],
    },
    sub: "Every deliverable scoped and agreed upfront. No surprises at handoff — and nothing left for you to finish.",
    cards: data.deliverables.map((d, i) => ({
      id: d.id,
      title: d.title,
      blurb: d.description,
      href: "#book",
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

      {/* 2 — Instant "these people actually build" credibility (black band,
          same contrast-band standard as the home marquee). */}
      <TrustBar />

      {/* 3 — Agitate: the real cost of reselling without a bench. Same visual
          language as the home problems section (GrowthPillars): surface
          ground, parallax problem backdrop, white cards, black icon stickers. */}
      {landing.pains && (
        <section
          id={`gw-${landing.pains.id}`}
          aria-labelledby={`${landing.pains.id}-headline`}
          className="relative isolate border-b border-border bg-surface text-foreground"
        >
          <ProblemBackground />
          <div className="container-1200 py-20 sm:py-24 lg:py-28">
            <ScrollFadeIn delay={0.1}>
              <SectionHeader
                eyebrow={landing.pains.eyebrow}
                headline={landing.pains.headline.parts}
                headlineId={`${landing.pains.id}-headline`}
                highlightClassName="text-gradient-brand"
                sub={landing.pains.sub}
                align="center"
                maxWidth="max-w-2xl"
                headlineClassName="mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
                subClassName="mx-auto mt-5 text-base text-muted sm:text-lg"
              />
            </ScrollFadeIn>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {landing.pains.cards.map((card, i) => {
                const Glyph = PAIN_GLYPHS[card.icon];
                return (
                  <ScrollFadeIn key={card.id} delay={0.15 + (i % 2) * 0.1}>
                    <article className="flex h-full flex-col rounded-xl border border-border bg-background p-7">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-white">
                          <Glyph size={17} aria-hidden="true" />
                        </span>
                        <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-brand-text">
                          Problem 0{i + 1}
                        </span>
                      </div>
                      <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">
                        {card.blurb}
                      </p>
                      {card.points && (
                        <ul className="mt-4 space-y-2 border-t border-border pt-4">
                          {card.points.map((point) => (
                            <li key={point} className="flex items-start gap-2.5">
                              <span
                                aria-hidden="true"
                                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand/70"
                              />
                              <span className="text-xs leading-relaxed text-foreground/70">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  </ScrollFadeIn>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4 — Solution: the productized deliverable (white ground so the
          bordered grid reads like the home catalog). */}
      <Services data={deliverablesData} tone="background" />

      {/* 4b — The complete feature list: unique design (never AI templates),
          the stack (Next.js / GHL builder / Webflow / WordPress), performance,
          security, maintenance, and support — grouped checklists. */}
      {landing.features && (
        <section
          id={`gw-${data.id}-features`}
          aria-labelledby={`${data.id}-features-headline`}
          className="relative border-b border-border bg-surface py-20 text-foreground sm:py-24 lg:py-28"
        >
          <div className="container-1200">
            <ScrollFadeIn delay={0.1}>
              <SectionHeader
                eyebrow={landing.features.eyebrow}
                headline={landing.features.headline.parts}
                headlineId={`${data.id}-features-headline`}
                highlightClassName="text-gradient-brand"
                sub={landing.features.sub}
                align="center"
                maxWidth="max-w-2xl"
                headlineClassName="mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
                subClassName="mx-auto mt-5 text-base text-muted sm:text-lg"
              />
            </ScrollFadeIn>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {landing.features.groups.map((group, i) => {
                const Glyph = FEATURE_GLYPHS[group.icon];
                return (
                  <ScrollFadeIn key={group.id} delay={0.15 + (i % 3) * 0.08}>
                    <div className="flex h-full flex-col rounded-xl border border-border bg-background p-6">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-foreground text-white">
                          <Glyph size={17} aria-hidden="true" />
                        </span>
                        <h3 className="text-base font-semibold tracking-tight text-foreground">
                          {group.title}
                        </h3>
                      </div>
                      <ul className="mt-4 space-y-2.5">
                        {group.items.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-brand/10">
                              <Check size={11} strokeWidth={3} className="text-brand" aria-hidden="true" />
                            </span>
                            <span className="text-sm leading-relaxed text-muted">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollFadeIn>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 5 — Proof: recent builds, shipped white-label. */}
      {landing.work && (
        <Portfolio
          id={workId}
          category={landing.work.category}
          header={{
            eyebrow: landing.work.eyebrow,
            headline: landing.work.headline,
            sub: landing.work.sub,
          }}
        />
      )}

      {/* 5b — Endorsement: the agency logo wall (home module). */}
      <TrustedBy />

      {/* 6+7 — Money: transparent rate card, margin math, risk reversal. */}
      {landing.pricing && pricingConfig && (
        <ServicePricing config={pricingConfig} content={landing.pricing} />
      )}

      {/* 8 — Mechanics: the same how-it-works section the home page uses. */}
      <ProcessJourney />

      {/* 8b — Social proof: partner quotes (home module). */}
      <Testimonials />

      {/* 8c — The membership packages: what paid members get on every order,
          and the free Vendor tier — the "join free" invitation (home module). */}
      <PricingPlans />

      {/* 9 — Differentiation: the whyUs trio, then the comparison table. */}
      {landing.differentiators && (
        <section
          id={`gw-${data.id}-why`}
          aria-labelledby={`${data.id}-why-headline`}
          className="relative bg-background pt-20 pb-16 text-foreground sm:pt-24 sm:pb-20 lg:pt-28"
        >
          <div className="container-1200">
            <ScrollFadeIn delay={0.1}>
              <SectionHeader
                eyebrow={landing.differentiators.eyebrow}
                headline={landing.differentiators.headline.parts}
                headlineId={`${data.id}-why-headline`}
                highlightClassName="text-gradient-brand"
                sub={landing.differentiators.sub}
                align="center"
                maxWidth="max-w-2xl"
                headlineClassName="mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
                subClassName="mx-auto mt-5 text-base text-muted sm:text-lg"
              />
            </ScrollFadeIn>
            <ScrollFadeIn delay={0.2}>
              <div className="mt-12 grid gap-5 sm:grid-cols-3">
                {data.whyUs.map((item, i) => (
                  <div
                    key={item.id}
                    className="flex flex-col rounded-xl border border-border bg-surface p-7"
                  >
                    <span className="font-mono text-3xl font-semibold tracking-tight text-foreground/10">
                      0{i + 1}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollFadeIn>
          </div>
        </section>
      )}
      <Comparison noPaddingTop={Boolean(landing.differentiators)} />

      {/* 10 — Objections. */}
      <Faq data={faqData} />

      {/* 12 — Close: the live calendar, zero friction. The footer's global
          CtaBanner follows as the true last word — never duplicate it here. */}
      <BookingSection />
    </>
  );
}
