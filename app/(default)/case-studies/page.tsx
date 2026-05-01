import type { Metadata } from "next";
import { getCaseStudies } from "@/lib/content";
import CaseStudiesPage from "@/components/templates/CaseStudiesPage";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real clients, real results. See how growX has helped businesses grow through SEO, PPC, social media, and web design.",
};

export default async function CaseStudiesRoute() {
  const caseStudies = await getCaseStudies();
  return <CaseStudiesPage caseStudies={caseStudies} />;
}
