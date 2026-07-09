import type { Metadata } from "next";
import { getBlog } from "@/lib/content";
import BlogPage from "@/components/templates/BlogPage/BlogPage";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Playbooks on white-label fulfillment, agency margins, and scaling delivery without hiring — from the team that ships it every day.",
};

export default async function BlogRoute() {
  const content = await getBlog();
  return <BlogPage content={content} />;
}
