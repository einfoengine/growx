import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { BlogContent } from "@/lib/content";
import SectionHeader from "@/components/elements/SectionHeader";
import Button from "@/components/elements/Button";
import InnerHeroBackdrop from "@/components/modules/Hero/InnerHeroBackdrop";
import { AuthorAvatar, BlogCard, formatBlogDate } from "@/components/modules/BlogSection/BlogCard";

export default function BlogPage({ content }: { content: BlogContent }) {
  const { eyebrow, headline, sub, posts } = content;
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      {/* ── Hero (dark, emerald-lit — same family as the home hero) ────── */}
      <section
        id="gw-blog-hero"
        data-nav-theme="dark" data-dark-surface
        className="relative isolate overflow-hidden bg-foreground text-background"
      >
        <InnerHeroBackdrop />
        <div className="container-1200 pb-14 pt-24 sm:pb-16 sm:pt-28 lg:pt-30">
          <SectionHeader
            eyebrow={eyebrow}
            headline={headline.parts}
            as="h1"
            headlineClassName="mt-4 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl"
            highlightClassName="text-gradient-brand"
            sub={sub}
            subClassName="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70"
            align="center"
          />
        </div>
      </section>

      {/* ── Posts ────────────────────────────────────────────── */}
      <section id="gw-blog-posts" className="bg-surface">
        <div className="container-1200 py-16 sm:py-20 lg:py-24">
          {/* Featured — horizontal split */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid overflow-hidden rounded-3xl border border-border bg-background transition-all duration-300 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5 lg:grid-cols-2"
            >
              <div className="relative aspect-16/10 w-full overflow-hidden lg:aspect-auto lg:min-h-[22rem]">
                <Image
                  src={featured.cover}
                  alt={featured.coverAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
                  {featured.category}
                </span>
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <div className="flex items-center gap-2 text-xs text-muted">
                  <span className="badge-brand">Featured</span>
                  <time dateTime={featured.date}>{formatBlogDate(featured.date)}</time>
                  <span aria-hidden="true" className="inline-block h-1 w-1 rounded-full bg-current opacity-40" />
                  <span>{featured.readMinutes} min read</span>
                </div>
                <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-brand sm:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted">{featured.deck}</p>
                <div className="mt-6 flex items-center gap-3">
                  <AuthorAvatar author={featured.author} />
                  <div className="text-xs leading-tight">
                    <p className="font-semibold text-foreground">{featured.author.name}</p>
                    <p className="text-muted">{featured.author.role}</p>
                  </div>
                </div>
                <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Read article
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          )}

          {/* Rest — grid */}
          {rest.length > 0 && (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section id="gw-blog-cta" className="relative isolate overflow-hidden bg-foreground text-background">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-130 w-[760px] -translate-x-1/2 rounded-full bg-brand/20 blur-[140px]" />
        </div>
        <div className="container-1200 py-24">
          <SectionHeader
            eyebrow="Stop reading, start scaling"
            headlineText="Add capacity without adding headcount"
            headlineClassName="mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl"
            sub="Bring the client relationship. We'll deliver the work, 100% white-label, under your brand."
            subClassName="mx-auto mt-5 max-w-xl text-base text-white/70"
            align="center"
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button label="Book a discovery call" href="#book" icon={<ArrowRight size={15} />} darkBg />
            <Button label="View pricing" href="/pricing" variant="secondary" darkBg />
          </div>
        </div>
      </section>
    </>
  );
}
