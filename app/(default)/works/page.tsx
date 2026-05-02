import type { Metadata } from "next";
import { getPortfolio } from "@/lib/content";
import WorksPage from "@/components/templates/WorksPage/WorksPage";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Browse our portfolio of websites, social media campaigns, and video content — all delivered white-label for agency partners.",
};

export default async function WorksRoute() {
  const data = await getPortfolio();
  return <WorksPage data={data} />;
}
