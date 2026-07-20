import type { Metadata } from "next";
import { getPricing } from "@/lib/content";
import type { TierKey } from "@/lib/config/pricing";
import CheckoutClient from "@/components/templates/CheckoutPage/CheckoutClient";
import type { PlanInfo } from "@/components/templates/PricingPage/EstimateCalculator";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

const TIER_KEY: Record<string, TierKey> = { Free: "free", Standard: "standard", VIP: "vip" };

export default async function CheckoutRoute() {
  const pricing = await getPricing();
  const plans: PlanInfo[] = pricing.tiers
    .map((t) => ({ key: TIER_KEY[t.name], name: t.name, features: t.features }))
    .filter((p): p is PlanInfo => Boolean(p.key));

  return <CheckoutClient plans={plans} />;
}
