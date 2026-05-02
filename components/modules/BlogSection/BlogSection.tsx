import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/elements/SectionHeader";

const BLOG_POSTS = [
  {
    id: 1,
    title: "10 Proven Strategies to Skyrocket Your Conversion Rates",
    excerpt: "Discover the secrets top agencies use to turn traffic into paying customers with simple UX tweaks.",
    category: "Conversion",
    date: "Oct 12, 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "The Future of Web Design: Glassmorphism and Beyond",
    excerpt: "Explore the latest UI trends that are capturing user attention and defining modern brand identities.",
    category: "Design",
    date: "Oct 05, 2026",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "How to Build a Social Media Strategy That Actually Converts",
    excerpt: "Stop posting for likes. Here is how to build an engagement funnel that generates high-quality leads.",
    category: "Marketing",
    date: "Sep 28, 2026",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
  },
];

export default function BlogSection() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="container-1200">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <SectionHeader
            eyebrow="Insights"
            headlineText="Latest from the blog"
            headlineClassName="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
            className="max-w-2xl"
          />
          <Link href="#" className="inline-flex items-center gap-2 text-brand font-medium hover:text-[#059669] transition-colors">
            View all posts <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="group relative flex flex-col items-start justify-between rounded-3xl border border-border bg-surface p-4 transition-colors hover:bg-surface/80">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl mb-6 bg-muted">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <div className="flex items-center gap-4 text-xs text-muted mb-4 px-2">
                <span className="font-semibold text-brand px-3 py-1 bg-brand/10 rounded-full">{post.category}</span>
                <time>{post.date}</time>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3 px-2 group-hover:text-brand transition-colors">
                <Link href="#">
                  <span className="absolute inset-0" />
                  {post.title}
                </Link>
              </h3>
              <p className="text-sm text-muted leading-relaxed line-clamp-3 px-2 pb-2">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
