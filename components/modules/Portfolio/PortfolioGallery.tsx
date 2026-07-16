"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { PortfolioContent, PortfolioItem } from "@/lib/content";

type Props = {
  categories: PortfolioContent["categories"];
  items: PortfolioItem[];
};

const ALL = "all";

// Source art is square, so tiles are given varied aspect ratios (cycled by
// position) to produce the staggered masonry rhythm.
const ASPECTS = [
  "aspect-3/4",
  "aspect-square",
  "aspect-4/5",
  "aspect-4/3",
  "aspect-square",
  "aspect-3/4",
];

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const tileVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/** Masonry filter gallery for the "Our Work" section. Category pills filter the
 *  tiles; the grid re-staggers on every filter change (the motion container is
 *  keyed by the active filter, so it remounts and replays). CSS multi-column
 *  gives the masonry flow. */
export default function PortfolioGallery({ categories, items }: Props) {
  const [active, setActive] = useState<string>(ALL);

  const filters = useMemo(
    () => [{ key: ALL, label: "All work" }, ...categories.map((c) => ({ key: c.key, label: c.label }))],
    [categories]
  );

  const visible = useMemo(
    () => (active === ALL ? items : items.filter((i) => i.category === active)),
    [active, items]
  );

  return (
    <div>
      {/* Filter pills */}
      <div
        role="tablist"
        aria-label="Filter work by category"
        className="flex flex-wrap items-center justify-center gap-2.5"
      >
        {filters.map((f) => {
          const isActive = f.key === active;
          return (
            <button
              key={f.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(f.key)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-transparent bg-gradient-brand text-black"
                  : "border-border text-foreground/70 hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Masonry grid — remounts on filter change to replay the stagger. */}
      <motion.div
        key={active}
        variants={gridVariants}
        initial="hidden"
        animate="visible"
        className="mt-10 gap-5 [column-fill:_balance] sm:columns-2 lg:columns-3"
      >
        {visible.map((item, i) => (
          <motion.div
            key={item.id}
            variants={tileVariants}
            className="mb-5 break-inside-avoid"
          >
            <Link
              href={`/works/${item.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <div className={`relative w-full overflow-hidden ${ASPECTS[i % ASPECTS.length]}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand">
                    {item.tag}
                  </span>
                  <h3 className="mt-1.5 text-xl font-bold tracking-tight text-white lg:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-white/70 lg:text-base">
                    {item.client}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
