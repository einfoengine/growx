import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/modules/Hero";
import BookingSection from "@/components/modules/BookingSection/BookingSection";
import Eyebrow from "@/components/elements/Eyebrow";
import { getSite } from "@/lib/content";
import type { HeroContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Become a partner",
  description:
    "Book a 30-minute partner call with the growX founding team. Free to join, 100% white-label fulfillment, fixed pricing — no commitment, no card.",
};

/** Dedicated partner-signup page (replaces the header CTA's booking modal):
 *  the inner hero states the offer, the BookingSection below carries the pitch
 *  and the live partner-call calendar. All existing modules — no new UI. */
const heroData: HeroContent = {
  id: "page-partner-hero",
  eyebrow: { label: "Become a partner", href: "/pricing" },
  headline: {
    parts: [
      { type: "text", value: "Your production team is " },
      { type: "highlight", value: "one call away." },
    ],
  },
  tagline: "growX partnership",
  sub: "Thirty minutes with our founding team: we map what you're fulfilling today, set up your partner account, and you leave with a bench behind your brand. Free to start — no commitment, no card.",
  ctas: [
    {
      id: "page-partner-cta-book",
      label: "Pick a time below",
      href: "#gw-mod-book",
      variant: "primary",
    },
    {
      id: "page-partner-cta-pricing",
      label: "See memberships",
      href: "/pricing",
    },
  ],
  ctaNote: "No pitch deck, no pressure — a straight answer on whether we're a fit.",
  stats: [
    { id: "partner-st-1", label: "Free to join — The Vendor tier" },
    { id: "partner-st-2", label: "100% white-label delivery" },
    { id: "partner-st-3", label: "Fixed pricing on every service" },
    { id: "partner-st-4", label: "No commitment, no card" },
  ],
};

export default async function BecomeAPartnerPage() {
  const site = await getSite();
  return (
    <>
      <Hero data={heroData} variant="compact" />
      <BookingSection />

      {/* ── The no-call alternatives: email, or the short contact form.
          Black contrast band (stays dark in both themes), two bordered
          columns with mono corner indexes — the GHL Video pattern, in the
          growX palette. */}
      <section
        id="gw-page-partner-alt"
        aria-label="Alternatives to booking a call"
        data-nav-theme="dark"
        className="relative border-t border-white/10 bg-foreground text-background"
      >
        <div className="container-1200 py-0">
          <div className="grid sm:grid-cols-2">
            <div className="relative flex flex-col items-start gap-4 border-b border-white/10 px-2 py-12 sm:border-b-0 sm:border-r sm:py-16 sm:pr-12">
              <Eyebrow text="Email us" />
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Not a call person?
              </h2>
              <p className="text-base text-white/60">
                Email works. A human replies within one business day.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="group mt-2 inline-flex items-center gap-2 text-lg font-bold text-brand transition-opacity hover:opacity-80"
              >
                {site.email}
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <span
                aria-hidden="true"
                className="absolute bottom-4 right-4 font-mono text-xs text-brand/70"
              >
                [ 01 ]
              </span>
            </div>
            <div className="relative flex flex-col items-start gap-4 px-2 py-12 sm:py-16 sm:pl-12">
              <Eyebrow text="Prefer writing?" />
              <p className="mt-6 text-base leading-relaxed text-white/60 sm:mt-10">
                Skip the call and send the short form instead. You get a
                straight, human answer within one business day.
              </p>
              <a
                href="/contact"
                className="group mt-2 inline-flex items-center gap-2 text-lg font-bold text-brand transition-opacity hover:opacity-80"
              >
                Send the form
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <span
                aria-hidden="true"
                className="absolute bottom-4 right-4 font-mono text-xs text-brand/70"
              >
                [ 02 ]
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
