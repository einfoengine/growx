import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBlog } from "@/lib/content";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import ModuleTitle from "@/components/elements/ModuleTitle";
import BlogScroller from "./BlogScroller";

export default async function BlogSection({
  moduleTitle,
}: { moduleTitle?: string } = {}) {
  const { posts } = await getBlog();
  if (posts.length === 0) return null;

  return (
    <section
      id="gw-mod-blog"
      className="relative overflow-hidden bg-surface gw-section"
    >
      <div className="container-1200">
        {moduleTitle && <ModuleTitle id="gw-blog-section-module-title">{moduleTitle}</ModuleTitle>}
        <ScrollFadeIn>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Link
              href="/blog"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-brand"
            >
              View all posts
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.1}>
          <div className="mt-12">
            <BlogScroller posts={posts} />
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
