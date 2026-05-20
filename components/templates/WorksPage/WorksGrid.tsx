"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Star } from "lucide-react";
import type { PortfolioContent, PortfolioCategory } from "@/lib/content";

type Props = { data: PortfolioContent };

export default function WorksGrid({ data }: Props) {
  const [active, setActive] = useState<PortfolioCategory | "all">("all");

  const filtered =
    active === "all" ? data.items : data.items.filter((i) => i.category === active);

  return (
    <section id="gw-works-grid" className="bg-background">
      <div className="container-1200 py-16 sm:py-20">

        {/* Category tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActive("all")}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              active === "all"
                ? "bg-foreground text-background"
                : "border border-border text-foreground/70 hover:border-foreground/30 hover:text-foreground"
            }`}
          >
            All
          </button>
          {data.categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActive(cat.key)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                active === cat.key
                  ? "bg-foreground text-background"
                  : "border border-border text-foreground/70 hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry grid */}
        {filtered.length > 0 ? (
          <div className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
            {filtered.map((item) => (
              <div key={item.id} className="mb-5 break-inside-avoid">
                <Link
                  id={item.id}
                  href={`/works/${item.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5"
                >
                  {/* Image — featured items use a wider aspect ratio for height variety */}
                  <div className={`relative w-full overflow-hidden ${item.featured ? "aspect-video" : "aspect-4/3"}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Tag badge */}
                    <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
                      {item.tag}
                    </span>
                  </div>

                  {/* Primary data */}
                  <div className="p-5">
                    {/* Client */}
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                      {item.client}
                    </p>

                    {/* Title */}
                    <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>

                    {/* Technologies */}
                    {item.technologies.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-foreground/70"
                          >
                            {tech}
                          </span>
                        ))}
                        {item.technologies.length > 4 && (
                          <span className="rounded-full border border-border bg-background px-2.5 py-0.5 text-xs text-muted">
                            +{item.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Footer strip — duration + rating + arrow */}
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5 text-xs text-muted">
                          <Clock size={11} className="shrink-0 text-brand" />
                          {item.duration}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted">
                          <Star size={11} className="fill-brand text-brand" strokeWidth={0} />
                          <span className="font-medium text-foreground">{item.rating}.0</span>
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold text-brand opacity-0 transition-opacity group-hover:opacity-100">
                        View <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-16 text-center text-sm text-muted">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
