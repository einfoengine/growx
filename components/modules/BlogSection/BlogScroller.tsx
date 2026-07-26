"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { BlogPost } from "@/lib/content";
import { BlogCard } from "./BlogCard";

/** Horizontal, snap-scrolling row of blog cards with desktop arrow controls.
 *  Touch/trackpad users swipe; the arrows appear on large screens and hide
 *  once you reach either end. */
export default function BlogScroller({ posts }: { posts: BlogPost[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const sync = () => {
      setAtStart(el.scrollLeft <= 2);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
    };
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div id="gw-blog-scroller" className="relative">
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {posts.map((post) => (
          <div key={post.id} className="w-[300px] shrink-0 snap-start sm:w-[350px]">
            <BlogCard post={post} />
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous posts"
        onClick={() => nudge(-1)}
        disabled={atStart}
        className="absolute -left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-border bg-background text-foreground shadow-lg transition hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-0 lg:flex"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        aria-label="Next posts"
        onClick={() => nudge(1)}
        disabled={atEnd}
        className="absolute -right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center border border-border bg-background text-foreground shadow-lg transition hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-0 lg:flex"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
