import type { Metadata } from "next";
import { getProcessPage } from "@/lib/content";
import ProcessPage from "@/components/templates/ProcessPage";

export const metadata: Metadata = {
  title: "How We Work",
  description:
    "From discovery call to white-label delivery — how growX runs every engagement, what communication looks like, and how we stay invisible to your clients.",
};

export default async function ProcessRoute() {
  const data = await getProcessPage();
  return <ProcessPage data={data} />;
}
