import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBlog } from "@/lib/content";
import SectionHeader from "@/components/elements/SectionHeader";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import BlogScroller from "./BlogScroller";

export default async function BlogSection() {
  const { eyebrow, headline, sub, posts } = await getBlog();
  if (posts.length === 0) return null;

  return (
    <section
      id="gw-mod-blog"
      aria-labelledby="blog-headline"
      className="relative overflow-hidden bg-surface py-20 sm:py-24 lg:py-28"
    >
      <div className="container-1200">
        <ScrollFadeIn>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow={eyebrow}
              headline={headline.parts}
              headlineId="blog-headline"
              highlightClassName="text-gradient-brand"
              sub={sub}
              subClassName="mt-4 max-w-xl text-base text-muted"
              className="max-w-2xl"
            />
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
