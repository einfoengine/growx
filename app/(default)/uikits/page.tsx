import type { Metadata } from "next";
import type { HeadlinePart } from "@/lib/content";

// ── Elements ──────────────────────────────────────────────────────────
import Button from "@/components/elements/Button";
import Eyebrow from "@/components/elements/Eyebrow";
import SectionHeader from "@/components/elements/SectionHeader";
import Headline from "@/components/elements/Headline";
import Logo from "@/components/elements/Logo";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import Typewriter from "@/components/elements/Typewriter";
import MouseGlow from "@/components/elements/MouseGlow";
import EvervaultBackground from "@/components/elements/EvervaultBackground";
import CartIcon from "@/components/modules/Cart/CartIcon";
import { ArrowRight } from "lucide-react";

// ── Modules (rendered inline, each self-loads its own data) ────────────
import Hero from "@/components/modules/Hero";
import PartnerMarquee from "@/components/modules/PartnerMarquee/PartnerMarquee";
import LogoMarquee from "@/components/modules/LogoMarquee";
import TextMarquee from "@/components/modules/TextMarquee/TextMarquee";
import TrustBar from "@/components/modules/TrustBar/TrustBar";
import PainPoints from "@/components/modules/PainPoints";
import FulfillmentReasons from "@/components/modules/FulfillmentReasons/FulfillmentReasons";
import Services from "@/components/modules/Services";
import ServicesCatalog from "@/components/modules/Services/ServicesCatalog";
import HowItWorks from "@/components/modules/HowItWorks/HowItWorks";
import Pricing from "@/components/modules/Pricing";
import Comparison from "@/components/modules/Comparison";
import Portfolio from "@/components/modules/Portfolio/Portfolio";
import Testimonials from "@/components/modules/Testimonials/Testimonials";
import SisterBrands from "@/components/modules/SisterBrands/SisterBrands";
import Faq from "@/components/modules/Faq";
import Newsletter from "@/components/modules/Newsletter";
import BlogSection from "@/components/modules/BlogSection/BlogSection";
import JoinCta from "@/components/modules/JoinCta/JoinCta";
import BookingSection from "@/components/modules/BookingSection/BookingSection";
import Process from "@/components/modules/Process";
import SectionTitle from "@/components/modules/SectionTitle/SectionTitle";

import OnboardingDemoButton from "./OnboardingDemoButton";

export const metadata: Metadata = {
  title: "UI Kit",
  description: "Internal component gallery — every element and module used across the growX site.",
  // Reference page: keep it out of search results.
  robots: { index: false, follow: false },
};

/* ── Design tokens (mirrors app/styles/theme.css :root) ───────────────── */
const COLOR_TOKENS: { name: string; value: string; note?: string }[] = [
  { name: "--brand", value: "#10b981", note: "fills" },
  { name: "--brand-strong", value: "#059669" },
  { name: "--brand-text", value: "#047857", note: "AA text on light" },
  { name: "--foreground", value: "#0a0a0a", note: "text / dark bg" },
  { name: "--background", value: "#ffffff" },
  { name: "--surface", value: "#f7f7f5" },
  { name: "--muted", value: "#6b7280" },
  { name: "--border", value: "#e5e7eb" },
  { name: "--footer-bg", value: "#0a0a0a" },
  { name: "--footer-fg", value: "#f5f5f5" },
  { name: "--footer-muted", value: "#9ca3af" },
];

const demoHeadline: HeadlinePart[] = [
  { type: "text", value: "Every service you sell, " },
  { type: "highlight", value: "delivered under your brand." },
];

/* Section index — in-page anchors only (not the site nav). */
const INDEX: { href: string; label: string }[] = [
  { href: "#colors", label: "Colors" },
  { href: "#type", label: "Typography" },
  { href: "#buttons", label: "Button" },
  { href: "#text-elements", label: "Text elements" },
  { href: "#brand-elements", label: "Logo / effects" },
  { href: "#overlays", label: "Overlays" },
  { href: "#modules", label: "Modules ↓" },
];

/* Labelled wrapper for one showcased component. `full` renders the child
   edge-to-edge (for modules that bring their own container/background). */
function Kit({
  id,
  tag,
  name,
  path,
  note,
  full = false,
  children,
}: {
  id: string;
  tag: string;
  name: string;
  path?: string;
  note?: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-label={name} className="scroll-mt-24 border-t border-white/10">
      <div className="container-1200 flex flex-wrap items-baseline gap-x-3 gap-y-1 px-6 pt-10 pb-5">
        <span className="rounded-full bg-brand/15 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-brand">
          {tag}
        </span>
        <h3 className="text-base font-bold tracking-tight text-white">{name}</h3>
        {path && <code className="font-mono text-[11px] text-white/40">{path}</code>}
        {note && <span className="text-xs text-white/45">— {note}</span>}
      </div>
      {full ? (
        <div className="pb-14">{children}</div>
      ) : (
        <div className="container-1200 px-6 pb-14">{children}</div>
      )}
    </section>
  );
}

/* Demo surface for elements — light or dark so each element sits on a
   background it was designed for. */
function Surface({
  dark = false,
  label,
  className = "",
  children,
}: {
  dark?: boolean;
  label?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 ${
        dark ? "border-white/10 bg-foreground text-white" : "border-border bg-background text-foreground"
      } ${className}`}
    >
      {label && (
        <p className="mb-4 font-mono text-[11px] uppercase tracking-widest opacity-50">{label}</p>
      )}
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

export default function UiKitsPage() {
  return (
    <div className="min-h-screen bg-foreground text-white">
      {/* ── Gallery header ─────────────────────────────────────────── */}
      <header className="container-1200 px-6 pt-28 pb-10 sm:pt-32">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          growX
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">UI Kit</h1>
        <p className="mt-4 max-w-2xl text-base text-white/60 sm:text-lg">
          A living gallery of every design token, element, and module used across
          the growX site — rendered live from the same components production uses.
        </p>
        <nav aria-label="Sections" className="mt-8 flex flex-wrap gap-2">
          {INDEX.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-white/70 transition-colors hover:border-brand/50 hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </nav>
      </header>

      {/* ── FOUNDATIONS: Colors ────────────────────────────────────── */}
      <Kit id="colors" tag="Foundations" name="Colors" path="app/styles/theme.css">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {COLOR_TOKENS.map((t) => (
            <div key={t.name} className="overflow-hidden rounded-xl border border-white/10">
              <div className="h-20 w-full" style={{ backgroundColor: t.value }} />
              <div className="bg-white/5 px-3 py-2">
                <p className="font-mono text-xs text-white">{t.name}</p>
                <p className="font-mono text-[11px] text-white/45">
                  {t.value}
                  {t.note ? ` · ${t.note}` : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Kit>

      {/* ── FOUNDATIONS: Typography ────────────────────────────────── */}
      <Kit id="type" tag="Foundations" name="Typography" note="Manrope · Chillax (labels) · Geist Mono">
        <div className="space-y-6">
          <div>
            <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-white/40">
              text-hero · Manrope
            </p>
            <p className="text-hero font-bold tracking-tight">Delivered under your brand.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-white/40">Headings</p>
              <p className="text-4xl font-bold tracking-tight">Heading 4xl</p>
              <p className="text-2xl font-bold tracking-tight">Heading 2xl</p>
              <p className="text-lg font-semibold">Heading lg</p>
            </div>
            <div>
              <p className="mb-1 font-mono text-[11px] uppercase tracking-widest text-white/40">Body / label / mono</p>
              <p className="text-base text-white/80">
                Body — Productized, white-label fulfillment for agencies.
              </p>
              <p className="mt-2 font-label text-sm font-semibold uppercase tracking-[0.2em] text-brand">
                Chillax label
              </p>
              <p className="mt-2 font-mono text-sm text-white/70">font-mono · SLA 48h</p>
            </div>
          </div>
        </div>
      </Kit>

      {/* ── ELEMENTS: Button ───────────────────────────────────────── */}
      <Kit id="buttons" tag="Element" name="Button" path="components/elements/Button" note="primary / secondary / ghost, icon, darkBg, disabled">
        <div className="grid gap-4 lg:grid-cols-2">
          <Surface label="On light">
            <Button label="Primary" />
            <Button label="Secondary" variant="secondary" />
            <Button label="Ghost" variant="ghost" />
            <Button label="With link" href="/pricing" />
            <Button label="No icon" icon={null} />
            <Button label="Disabled" disabled />
          </Surface>
          <Surface dark label="On dark (darkBg)">
            <Button label="Primary" darkBg />
            <Button label="Secondary" variant="secondary" darkBg />
            <Button label="Ghost" variant="ghost" darkBg />
            <Button label="Custom icon" icon={<ArrowRight size={15} />} darkBg />
          </Surface>
          <Surface label="Full width" className="lg:col-span-2">
            <div className="w-full max-w-sm">
              <Button label="Full-width primary" fullWidth />
            </div>
          </Surface>
        </div>
      </Kit>

      {/* ── ELEMENTS: Text elements ────────────────────────────────── */}
      <Kit id="text-elements" tag="Elements" name="Eyebrow · Headline · SectionHeader · Typewriter" path="components/elements/*">
        <div className="grid gap-4 lg:grid-cols-2">
          <Surface label="Eyebrow (scramble on scroll)">
            <Eyebrow text="Full-stack catalog" />
          </Surface>
          <Surface label="Typewriter">
            <p className="text-2xl font-bold tracking-tight">
              We deliver{" "}
              <Typewriter
                words={["websites", "funnels", "SEO", "video"]}
                className="text-brand-text"
              />
            </p>
          </Surface>
          <Surface label="Headline (rich parts + highlight)">
            <Headline parts={demoHeadline} as="h3" className="text-3xl font-bold tracking-tight" />
          </Surface>
          <Surface label="SectionHeader (eyebrow + headline + sub)">
            <SectionHeader
              eyebrow="Our services"
              headline={demoHeadline}
              as="h3"
              sub="Web, SEO, paid media, content, social, funnels, and video."
              align="left"
            />
          </Surface>
        </div>
      </Kit>

      {/* ── ELEMENTS: Logo, effects, cart ──────────────────────────── */}
      <Kit id="brand-elements" tag="Elements" name="Logo · ScrollFadeIn · MouseGlow · EvervaultBackground · CartIcon" path="components/elements/*">
        <div className="grid gap-4 lg:grid-cols-2">
          <Surface label="Logo — tone dark / light">
            <div className="rounded-lg bg-white px-4 py-3">
              <Logo tone="dark" width={130} />
            </div>
            <div className="rounded-lg bg-foreground px-4 py-3">
              <Logo tone="light" width={130} />
            </div>
          </Surface>
          <Surface label="CartIcon (header control)">
            <CartIcon />
            <span className="text-sm opacity-60">links to /checkout, live badge count</span>
          </Surface>
          <Surface dark label="MouseGlow (hover with a mouse)" className="relative overflow-hidden">
            <MouseGlow />
            <div className="relative py-6 text-sm text-white/70">Move your cursor across this panel.</div>
          </Surface>
          <Surface dark label="EvervaultBackground (hover, fine pointer)" className="relative isolate overflow-hidden">
            <EvervaultBackground />
            <div className="relative py-6 text-sm text-white/70">Hover to reveal the encrypted grid.</div>
          </Surface>
          <Surface label="ScrollFadeIn (reveals on scroll)" className="lg:col-span-2">
            <ScrollFadeIn>
              <p className="text-sm">This block fades/slides in when scrolled into view.</p>
            </ScrollFadeIn>
          </Surface>
        </div>
      </Kit>

      {/* ── OVERLAYS / triggers ────────────────────────────────────── */}
      <Kit id="overlays" tag="Overlays" name="Modals (globally mounted; open via trigger)" note="BookingModal · HowItWorksModal · OnboardingModal">
        <Surface dark>
          <Button label="Open booking modal" href="#book" darkBg />
          <Button label="Open how-it-works modal" href="#how-it-works" variant="secondary" darkBg />
          <OnboardingDemoButton />
        </Surface>
      </Kit>

      {/* ══ MODULES ═════════════════════════════════════════════════ */}
      <div id="modules" className="container-1200 px-6 pt-16 pb-2">
        <h2 className="text-2xl font-bold tracking-tight">Modules</h2>
        <p className="mt-2 text-sm text-white/50">
          Full sections, rendered live with their own content. Header &amp; Footer are the
          chrome of this page; the CTA banner sits at the top of the footer below.
        </p>
      </div>

      <Kit id="section-title" tag="Module" name="Section Intro Heading" path="components/modules/SectionTitle" note="Eyebrow, gradient headline, short description; introduces a section (needs no module title — it is one)" full>
        <SectionTitle
          eyebrow="Our services"
          headline={demoHeadline}
          sub="Web, SEO, paid media, content, social, funnels, and video."
        />
      </Kit>
      <Kit id="hero" tag="Module" name="Centered Hero With Media Panel" path="components/modules/Hero" note="Centered copy over full-bleed backdrop; media panel tilts on scroll" full>
        <Hero />
      </Kit>
      <Kit id="partner-marquee" tag="Module" name="Infinite Icon Chip Marquee" path="components/modules/PartnerMarquee" note="Endless icon-label chips scroll; pauses on hover" full>
        <PartnerMarquee />
      </Kit>
      <Kit id="logo-marquee" tag="Module" name="Bordered Logo Card Grid" path="components/modules/LogoMarquee" note="Hover-lift cards for logos, badges, or integrations" full>
        <LogoMarquee />
      </Kit>
      <Kit id="text-marquee" tag="Module" name="Infinite Text Ticker Strip" path="components/modules/TextMarquee" note="Continuously scrolling labels; edge fade, pause on hover" full>
        <TextMarquee />
      </Kit>
      <Kit id="trust-bar" tag="Module" name="Centered Logo Strip" path="components/modules/TrustBar" note="Centered wrapping logo row; hover brightens each item" full>
        <TrustBar />
      </Kit>
      <Kit id="pain-points" tag="Module" name="Sticky Stacked Timeline Cards" path="components/modules/PainPoints" note="Scroll pins cards into a stacked icon timeline; steps or reasons" full>
        <PainPoints />
      </Kit>
      <Kit id="fulfillment-reasons" tag="Module" name="Full-Bleed Image Card Grid" path="components/modules/FulfillmentReasons" note="Photo-backed feature cards in a row; hover tilt" full>
        <FulfillmentReasons />
      </Kit>
      <Kit id="services" tag="Module" name="Split-Header Icon Card Grid" path="components/modules/Services" note="Clickable icon cards invert on hover; hairline-ruled grid" full>
        <Services />
      </Kit>
      <Kit id="services-catalog" tag="Module" name="Modal Icon Tile Grid" path="components/modules/Services/ServicesCatalog" note="Hairline-seamed tiles with diamond nodes; click for detail" full>
        <ServicesCatalog />
      </Kit>
      <Kit id="how-it-works" tag="Module" name="Horizontal Numbered Step Timeline" path="components/modules/HowItWorks" note="Connected numbered badges; glow marker auto-travels the steps" full>
        <HowItWorks />
      </Kit>
      <Kit id="pricing" tag="Module" name="Featured Tier Card Row" path="components/modules/Pricing" note="Equal-height tier trio, one emphasized; figure, checklist, CTA" full>
        <Pricing />
      </Kit>
      <Kit id="comparison" tag="Module" name="Highlighted Comparison Matrix" path="components/modules/Comparison" note="Compare options across feature rows; one column emphasized · demo: optional moduleTitle shown above" full>
        <Comparison moduleTitle="Optional module title" />
      </Kit>
      <Kit id="portfolio" tag="Module" name="Filterable Masonry Image Grid" path="components/modules/Portfolio" note="Tab-filtered masonry of image cards; reuse for galleries" full>
        <Portfolio />
      </Kit>
      <Kit id="testimonials" tag="Module" name="Auto-Advancing Spotlight Carousel" path="components/modules/Testimonials" note="One card at a time, autoplay arrows/dots; stat band" full>
        <Testimonials />
      </Kit>
      <Kit id="sister-brands" tag="Module" name="Captioned Logo Card Grid" path="components/modules/SisterBrands" note="Intro header over hover-lift logo cards with captions" full>
        <SisterBrands />
      </Kit>
      <Kit id="faq" tag="Module" name="Numbered Accordion List" path="components/modules/Faq" note="Expandable question or feature rows; single-open toggle" full>
        <Faq />
      </Kit>
      <Kit id="newsletter" tag="Module" name="Centered Form Capture Panel" path="components/modules/Newsletter" note="Boxed centered stack with inline form; signups or waitlists" full>
        <Newsletter />
      </Kit>
      <Kit id="blog-section" tag="Module" name="Horizontal Snap Card Carousel" path="components/modules/BlogSection" note="Snap-scroll card row with header and view-all link" full>
        <BlogSection />
      </Kit>
      <Kit id="join-cta" tag="Module" name="Centered CTA Banner" path="components/modules/JoinCta" note="Centered headline, checklist grid, dual action buttons" full>
        <JoinCta />
      </Kit>
      <Kit id="booking-section" tag="Module" name="Framed Embed Panel" path="components/modules/BookingSection" note="Centered intro above framed, lazy-loaded iframe; schedulers or forms" full>
        <BookingSection />
      </Kit>
      <Kit id="process" tag="Module" name="Scroll-Pinned Card Reveal" path="components/modules/Process" note="Pinned panel reveals a card row while scrolling" full>
        <Process />
      </Kit>
    </div>
  );
}
