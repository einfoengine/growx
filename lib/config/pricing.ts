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
