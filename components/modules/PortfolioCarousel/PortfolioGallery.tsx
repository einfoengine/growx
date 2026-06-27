"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

type Item = {
  id: string;
  slug: string;
  title: string;
  client: string;
  tag: string;
  image: string;
  category: string;
};

const TABS: { key: string; label: string; match: (c: string) => boolean }[] = [
  { key: "web", label: "Web Design", match: (c) => c === "web" },
  {
    key: "social",
    label: "Social Media",
    match: (c) => c === "social" || c === "video",
  },
];

export default function PortfolioGallery({ items }: { items: Item[] }) {
  const [active, setActive] = useState(TABS[0].key);
  const tab = TABS.find((t) => t.key === active) ?? TABS[0];
  const filtered = items.filter((i) => tab.match(i.category));

  return (
    <div className="mt-12 rounded-[1.75rem] bg-neutral-950 p-4 shadow-2xl shadow-black/10 ring-1 ring-black/5 sm:mt-16 sm:p-6">
      {/* Tabs */}
      <div className="mb-6 flex justify-center">
        <div className="inline-flex gap-1 rounded-full border border-white/10 bg-white/5 p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActive(t.key)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                active === t.key
                  ? "bg-brand text-black"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filtered grid */}
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3"
      >
        {filtered.map((item) => (
          <Link
            key={item.id}
            href={`/works/${item.slug}`}
            className="group relative aspect-4/3 overflow-hidden rounded-2xl bg-neutral-900"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <span className="inline-flex h-7 items-center rounded-full bg-brand px-3 text-[11px] font-semibold text-black">
                {item.tag}
              </span>
              <p className="mt-3 text-lg font-semibold tracking-tight text-white">
                {item.title}
              </p>
              <p className="mt-0.5 text-sm text-white/60">{item.client}</p>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
