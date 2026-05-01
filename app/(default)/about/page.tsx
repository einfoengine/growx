import type { Metadata } from "next";
import { getAbout } from "@/lib/content";
import AboutPage from "@/components/templates/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "growX is the white-label fulfilment studio built for agency owners who want to deliver more without hiring. Meet the team, our values, and how we work.",
};

export default async function AboutRoute() {
  const data = await getAbout();
  return <AboutPage data={data} />;
}
