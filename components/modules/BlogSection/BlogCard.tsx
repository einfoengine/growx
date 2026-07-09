import Image from "next/image";
import Link from "next/link";
import type { BlogAuthor, BlogPost } from "@/lib/content";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Deterministic date formatting (no Date object → no SSR/locale drift). */
export function formatBlogDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

export function AuthorAvatar({ author, small }: { author: BlogAuthor; small?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex ${small ? "h-7 w-7" : "h-9 w-9"} shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand`}
    >
      {author.initials}
    </span>
  );
}

function MetaLine({ post, className = "" }: { post: BlogPost; className?: string }) {
  return (
    <div className={`flex items-center gap-2 text-xs text-muted ${className}`}>
      <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readMinutes} min read</span>
    </div>
  );
}

/** Large lead card — image on top, byline in the footer. */
export function BlogFeatureCard({ post, priority }: { post: BlogPost; priority?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background transition-all duration-300 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 640px, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <MetaLine post={post} />
        <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-brand sm:text-2xl">
          {post.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted sm:text-base">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-6">
          <AuthorAvatar author={post.author} />
          <div className="text-xs leading-tight">
            <p className="font-semibold text-foreground">{post.author.name}</p>
            <p className="text-muted">{post.author.role}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

/** Compact horizontal row — thumbnail + title, for the section's side list. */
export function BlogListItem({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex items-center gap-4 py-5 first:pt-0 last:pb-0"
    >
      <div className="relative aspect-4/3 w-24 shrink-0 overflow-hidden rounded-xl border border-border sm:w-28">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          sizes="120px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="font-semibold text-brand">{post.category}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readMinutes} min</span>
        </div>
        <h3 className="mt-1.5 line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-brand sm:text-base">
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

/** Standard grid card — used on the index and in related-posts strips. */
export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden">
        <Image
          src={post.cover}
          alt={post.coverAlt}
          fill
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <MetaLine post={post} />
        <h3 className="mt-2 line-clamp-2 text-base font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand sm:text-lg">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-2.5 border-t border-border pt-4">
          <AuthorAvatar author={post.author} small />
          <span className="text-xs font-medium text-foreground/80">{post.author.name}</span>
        </div>
      </div>
    </Link>
  );
}
