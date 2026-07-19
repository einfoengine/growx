import type { Metadata } from "next";
import { getWebinarPage } from "@/lib/content";
import WebinarPage from "@/components/templates/WebinarPage";

export const metadata: Metadata = {
  title: "Scale Without Hiring | Live Webinar",
  description:
    "A free live webinar for agency owners who want to sell more services and deliver them without hiring. Learn the white-label fulfillment model and see the partner portal in action.",
};

export default async function WebinarRoute() {
  const data = await getWebinarPage();
  return <WebinarPage data={data} />;
}
