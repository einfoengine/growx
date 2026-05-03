import type { Metadata } from "next";
import { getPricingPage, getAllServices } from "@/lib/content";
import PricingPage from "@/components/templates/PricingPage/PricingPage";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Build your white-label package. Select a service, configure your scope and timeline, and get an instant fixed-price estimate — no hidden fees.",
};

export default async function PricingRoute() {
  const [pageData, services] = await Promise.all([
    getPricingPage(),
    getAllServices(),
  ]);
  return <PricingPage pageData={pageData} services={services} />;
}
