import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICE_SLUGS, getServicePage } from "@/lib/content";
import LandingPageTemplate from "@/components/templates/LandingPage";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = await getServicePage(slug);
  if (!data) return {};
  return {
    title: data.name,
    description: `${data.tagline} ${data.description}`,
  };
}

export default async function ServiceLandingPage({ params }: Params) {
  const { slug } = await params;
  const data = await getServicePage(slug);
  if (!data) notFound();
  return <LandingPageTemplate data={data} />;
}
