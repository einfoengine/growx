import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDY_SLUGS, getCaseStudies, getCaseStudy } from "@/lib/content";
import CaseStudyPage from "@/components/templates/CaseStudyPage";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const cs = await getCaseStudy(slug);
  if (!cs) return {};
  return {
    title: `${cs.client} — ${cs.service} Case Study`,
    description: cs.description,
  };
}

export default async function CaseStudyRoute({ params }: Params) {
  const { slug } = await params;
  const [cs, all] = await Promise.all([getCaseStudy(slug), getCaseStudies()]);
  if (!cs) notFound();

  const related = all.filter((c) => c.slug !== slug).slice(0, 3);

  return <CaseStudyPage caseStudy={cs} related={related} />;
}
