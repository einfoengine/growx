import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorkItem, WORK_ITEM_SLUGS } from "@/lib/content";
import WorkItemPage from "@/components/templates/WorksPage/WorkItemPage";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return WORK_ITEM_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getWorkItem(slug);
  if (!item) return {};
  return {
    title: `${item.title} — ${item.client}`,
    description: item.description,
  };
}

export default async function WorkItemRoute({ params }: Props) {
  const { slug } = await params;
  const item = await getWorkItem(slug);
  if (!item) notFound();
  return <WorkItemPage item={item} />;
}
