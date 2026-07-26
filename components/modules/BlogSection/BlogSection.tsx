import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBlog } from "@/lib/content";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import ModuleTitle from "@/components/elements/ModuleTitle";
import BlogScroller from "./BlogScroller";

export default async function BlogSection({
  moduleTitle,
  noPaddingTop,
}: { moduleTitle?: string; noPaddingTop?: boolean } = {}) {
  const { posts } = await getBlog();
  if (posts.length === 0) return null;

  return (
    <section
      id="gw-mod-blog"
      className={`relative overflow-hidden bg-surface ${noPaddingTop ? "pb-24 pt-0 sm:pb-28 lg:pb-32" : "py-24 sm:py-28 lg:py-32"}`}
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
