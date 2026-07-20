/** Single source of truth for the pricing page's math.
 *
 *  The three membership tiers and their fees are the LOCKED launch model
 *  (Free / Standard / VIP at $0 / $295 / $495). Per-service base prices are
 *  NOT locked yet, so nothing here invents one; the calculator and matrix work
 *  purely off the published membership fees and standing discounts.
 *
 *  Every pricing component (SavingsCalculator, TierMatrix, ServicePreview)
 *  reads from here, so the day a number changes it changes in exactly one
 *  place and every component updates at once.
 */
export type TierKey = "free" | "standard" | "vip";

export type TierConfig = {
  key: TierKey;
  name: string;
  /** Relationship the tier names, per the Vendor to Department ladder. */
  persona: string;
  /** Monthly membership fee in USD. */
  fee: number;
  /** Standing discount applied to every per-service order. */
  discount: number;
};

export const TIERS: Record<TierKey, TierConfig> = {
  free: { key: "free", name: "Free", persona: "The Vendor", fee: 0, discount: 0 },
  standard: { key: "standard", name: "Standard", persona: "The Team Member", fee: 295, discount: 0.1 },
  vip: { key: "vip", name: "VIP", persona: "The Department", fee: 495, discount: 0.15 },
};

export const TIER_ORDER: TierKey[] = ["free", "standard", "vip"];

/** What a service costs on a given tier once its standing discount applies. */
export function priceForTier(basePrice: number, tier: TierKey): number {
  return Math.round(basePrice * (1 - TIERS[tier].discount));
}

/** Monthly service spend at which a paid tier's discount exactly repays its
 *  fee. Free has no fee, so it has no break-even (returns 0). */
export function breakEven(tier: TierKey): number {
  const { fee, discount } = TIERS[tier];
  return discount > 0 ? Math.round(fee / discount) : 0;
}

/** Net monthly effect of holding a tier at a given service spend. Negative
 *  means the discount more than covers the fee, so the partner keeps money. */
export function netEffect(spend: number, tier: TierKey): number {
  const { fee, discount } = TIERS[tier];
  return Math.round(fee - spend * discount);
}

/** The tier the math favours at a given spend. Drives the calculator's verdict
 *  so the page never has to stamp a "most popular" badge on a new program. */
export function recommendedTier(spend: number): TierKey {
  if (spend < breakEven("standard")) return "free";
  if (spend < breakEven("vip")) return "standard";
  return "vip";
}

// ── Service catalog (drives the cards, calculator, cart and checkout) ────────
//
// PLACEHOLDER PRICING. Both `price` (our fixed price) and `marketPrice` (the
// typical cost of buying this elsewhere, used for the "if it was not us"
// comparison) are unconfirmed launch placeholders. They must be replaced with
// real numbers before publish. Titles use the locked service list.

export type ServiceBilling = "one-off" | "monthly";

export type PricingService = {
  slug: string;
  title: string;
  intro: string;
  /** Our fixed price, before any tier discount. Placeholder. */
  price: number;
  /** Typical cost of the same work elsewhere. Placeholder. */
  marketPrice: number;
  billing: ServiceBilling;
  /** Optional unit qualifier, e.g. "per video". */
  unit?: string;
  benefits: string[];
};

export const PRICING_SERVICES: PricingService[] = [
  {
    slug: "websites-funnels",
    title: "Websites & Funnels",
    intro: "Conversion-ready sites and funnels built to spec and shipped under your brand.",
    price: 1500,
    marketPrice: 2800,
    billing: "one-off",
    benefits: ["Fixed scope and price", "2 to 4 week build", "Handed over white-label"],
  },
  {
    slug: "seo-aeo",
    title: "SEO & AEO",
    intro: "Search and answer-engine optimisation that compounds month over month.",
    price: 400,
    marketPrice: 750,
    billing: "monthly",
    benefits: ["Traditional and AI search", "White-label reporting", "Compounding retainer"],
  },
  {
    slug: "meta-ppc",
    title: "Meta Ads & PPC",
    intro: "Paid media managed for revenue, never vanity metrics, on any platform.",
    price: 800,
    marketPrice: 1500,
    billing: "monthly",
    benefits: ["No markup on ad spend", "Platform-flexible", "Reported on conversions"],
  },
  {
    slug: "content",
    title: "Content & Copywriting",
    intro: "SEO-aware content and copy written in your client's voice, on a fixed cadence.",
    price: 250,
    marketPrice: 500,
    billing: "monthly",
    benefits: ["SEO built in", "Voice matched", "Predictable delivery"],
  },
  {
    slug: "social",
    title: "Social Media Management",
    intro: "Platform-native social handled end to end so your bandwidth stays free.",
    price: 350,
    marketPrice: 700,
    billing: "monthly",
    benefits: ["Hands-off for you", "Built per platform", "Recurring revenue"],
  },
  {
    slug: "video-production",
    title: "Video Production",
    intro: "Animated video produced in-house, styled to your client's brand.",
    price: 1200,
    marketPrice: 2200,
    billing: "one-off",
    unit: "per video",
    benefits: ["Script to delivery", "Every platform cutdown", "No growX watermark"],
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    intro: "Short and long-form editing built to hold attention and drive action.",
    price: 150,
    marketPrice: 300,
    billing: "monthly",
    unit: "per video",
    benefits: ["Fast turnaround", "Captions and grading", "All aspect ratios"],
  },
  {
    slug: "highlevel",
    title: "HighLevel Services",
    intro: "Onboarding, admin, and custom builds across your HighLevel accounts.",
    price: 500,
    marketPrice: 1000,
    billing: "monthly",
    benefits: ["Onboarding and admin", "Automations and builds", "Runs under your brand"],
  },
];

export function getService(slug: string): PricingService | undefined {
  return PRICING_SERVICES.find((s) => s.slug === slug);
}

export type EstimateLine = { service: PricingService; ourPrice: number };

export type Estimate = {
  planFee: number;
  discount: number;
  monthlyWithUs: number;
  monthlyElsewhere: number;
  oneOffWithUs: number;
  oneOffElsewhere: number;
  yearOneWithUs: number;
  yearOneElsewhere: number;
  yearOneSavings: number;
  lines: EstimateLine[];
};

/** Full estimate for a chosen plan and set of service slugs. Monthly figures
 *  include the plan fee; the "elsewhere" figures use market price with no
 *  discount. Year-one rolls monthly x 12 plus one-off. */
export function buildEstimate(plan: TierKey, slugs: string[]): Estimate {
  const discount = TIERS[plan].discount;
  const planFee = TIERS[plan].fee;
  const lines: EstimateLine[] = [];
  let monthlyWithUs = planFee;
  let monthlyElsewhere = 0;
  let oneOffWithUs = 0;
  let oneOffElsewhere = 0;

  for (const slug of slugs) {
    const service = getService(slug);
    if (!service) continue;
    const ourPrice = Math.round(service.price * (1 - discount));
    lines.push({ service, ourPrice });
    if (service.billing === "monthly") {
      monthlyWithUs += ourPrice;
      monthlyElsewhere += service.marketPrice;
    } else {
      oneOffWithUs += ourPrice;
      oneOffElsewhere += service.marketPrice;
    }
  }

  const yearOneWithUs = monthlyWithUs * 12 + oneOffWithUs;
  const yearOneElsewhere = monthlyElsewhere * 12 + oneOffElsewhere;

  return {
    planFee,
    discount,
    monthlyWithUs,
    monthlyElsewhere,
    oneOffWithUs,
    oneOffElsewhere,
    yearOneWithUs,
    yearOneElsewhere,
    yearOneSavings: Math.max(0, yearOneElsewhere - yearOneWithUs),
    lines,
  };
}
