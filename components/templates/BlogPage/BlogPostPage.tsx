import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import type { BlogBlock, BlogPost } from "@/lib/content";
import SectionHeader from "@/components/elements/SectionHeader";
import Button from "@/components/elements/Button";
import { AuthorAvatar, BlogCard, formatBlogDate } from "@/components/modules/BlogSection/BlogCard";

type Props = { post: BlogPost; related: BlogPost[] };

function ListBlock({ items }: { items: string[] }) {
  // If every item is prefixed with "1." / "2)" treat it as an ordered list and
  // strip the prefix so we don't double the numbering.
  const ordered = items.every((it) => /^\d+[.)]\s/.test(it));
  if (ordered) {
    return (
      <ol className="mt-5 space-y-3">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3.5">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
              {i + 1}
            </span>
            <span className="text-base leading-relaxed text-foreground/80">
              {it.replace(/^\d+[.)]\s/, "")}
            </span>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ul className="mt-5 space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3.5">
          <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10">
            <Check size={12} className="text-brand" />
          </span>
          <span className="text-base leading-relaxed text-foreground/80">{it}</span>
        </li>
      ))}
    </ul>
  );
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-12 text-2xl font-bold tracking-tight text-foreground sm:text-[1.7rem]">
          {block.text}
        </h2>
      );
    case "paragraph":
      return <p className="mt-5 text-lg leading-relaxed text-foreground/80">{block.text}</p>;
    case "list":
      return <ListBlock items={block.items} />;
    case "quote":
      return (
        <blockquote className="my-9 border-l-4 border-brand pl-6">
          <p className="text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
            &ldquo;{block.text}&rdquo;
          </p>
          {block.cite && <cite className="mt-3 block text-sm not-italic text-muted">— {block.cite}</cite>}
        </blockquote>
      );
    default:
      return null;
  }
}

export default function BlogPostPage({ post, related }: Props) {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section id="gw-blog-post-hero" className="relative overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 left-1/2 -top-24 h-72 w-[640px] -translate-x-1/2 rounded-full bg-brand/8 blur-[100px]"
        />
        <div className="container-1200 pt-12 sm:pt-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs text-muted transition hover:text-foreground"
          >
            <ArrowLeft size={13} />
            All articles
          </Link>

          <div className="mx-auto mt-8 max-w-3xl text-center">
            <div className="flex items-center justify-center gap-2 text-xs">
              <span className="badge-brand">{post.category}</span>
              <time dateTime={post.date} className="text-muted">
                {formatBlogDate(post.date)}
              </time>
              <span aria-hidden="true" className="text-muted">·</span>
              <span className="text-muted">{post.readMinutes} min read</span>
            </div>
            <h1 className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">{post.deck}</p>
            <div className="mt-7 flex items-center justify-center gap-3">
              <AuthorAvatar author={post.author} />
              <div className="text-left text-xs leading-tight">
                <p className="font-semibold text-foreground">{post.author.name}</p>
                <p className="text-muted">{post.author.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cover */}
        <div className="container-1200 mt-10 sm:mt-12">
          <div className="relative aspect-16/9 w-full overflow-hidden rounded-2xl border border-border sm:aspect-[2/1]">
            <Image
              src={post.cover}
              alt={post.coverAlt}
              fill
              priority
              sizes="(min-width: 1200px) 1136px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────── */}
      <section id="gw-blog-post-body" className="bg-background">
        <div className="container-1200 py-14 sm:py-16">
          <article className="mx-auto max-w-3xl">
            {/* Key takeaways */}
            {post.keyTakeaways.length > 0 && (
              <aside className="rounded-2xl border border-brand/20 bg-brand/[0.04] p-6 sm:p-7">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Sparkles size={16} className="text-brand" />
                  Key takeaways
                </div>
                <ul className="mt-4 space-y-2.5">
                  {post.keyTakeaways.map((t, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10">
                        <Check size={12} className="text-brand" />
                      </span>
                      <span className="text-sm leading-relaxed text-foreground/80">{t}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            {/* Article body */}
            <div className="mt-10">
              {post.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Author bio */}
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-border bg-surface p-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
                {post.author.initials}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{post.author.name}</p>
                <p className="text-sm text-muted">
                  {post.author.role} at growX — the white-label team behind the agencies.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ── Related ──────────────────────────────────────────── */}
      {related.length > 0 && (
        <section id="gw-blog-post-related" className="bg-surface">
          <div className="container-1200 py-16 sm:py-20">
            <div className="flex items-end justify-between gap-4">
              <SectionHeader
                eyebrow="Keep reading"
                headlineText="More from the blog"
                headlineClassName="mt-2 text-2xl font-bold leading-[1.2] tracking-tight text-foreground sm:text-3xl"
              />
              <Link
                href="/blog"
                className="hidden items-center gap-1.5 text-sm font-medium text-foreground/70 transition hover:text-foreground sm:inline-flex"
              >
                View all
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section id="gw-blog-post-cta" className="relative isolate overflow-hidden bg-foreground text-background">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 h-130 w-[760px] -translate-x-1/2 rounded-full bg-brand/20 blur-[140px]" />
        </div>
        <div className="container-1200 py-24">
          <SectionHeader
            eyebrow="Put it into practice"
            headlineText="Deliver more without hiring"
            headlineClassName="mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl"
            sub="growX fulfills web, SEO & AEO, PPC, content, social, and funnels under your brand — so you can scale delivery without adding payroll."
            subClassName="mx-auto mt-5 max-w-xl text-base text-white/70"
            align="center"
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button label="Book a Discovery Call" href="#book" icon={<ArrowRight size={15} />} darkBg />
            <Button label="Explore services" href="/#gw-mod-services" variant="secondary" darkBg />
          </div>
        </div>
      </section>
    </>
  );
}
