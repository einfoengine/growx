import type { Metadata } from "next";
import Hero from "@/components/modules/Hero";
import BookingSection from "@/components/modules/BookingSection/BookingSection";
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

export default function BecomeAPartnerPage() {
  return (
    <>
      <Hero data={heroData} variant="inner" />
      <BookingSection />
    </>
  );
}
