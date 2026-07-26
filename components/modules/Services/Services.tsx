import type React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import ModuleTitle from "@/components/elements/ModuleTitle";
import { SERVICE_ICON_BY_KEY as ICON_BY_KEY } from "./servicesData";
import { getServices } from "@/lib/content";
import type { ServicesContent } from "@/lib/content";

export default async function Services({
  data,
  tone = "surface",
  moduleTitle,
  noPaddingTop,
}: { data?: ServicesContent; tone?: "surface" | "background"; moduleTitle?: string; noPaddingTop?: boolean } = {}) {
  const servicesData = data ?? (await getServices());
  // Cell fill inverts against the section ground so hover always contrasts.
  const cellCls =
    tone === "surface"
      ? "bg-surface hover:bg-background"
      : "bg-background hover:bg-surface";

  return (
    <section
      id={`gw-${servicesData.id}`}
      className={tone === "surface" ? "bg-surface" : "bg-background"}
      style={{ "--cg": "max(2rem, calc((100vw - 1400px) / 2 + 2rem))" } as React.CSSProperties}
    >
      <div className={`container-1200 ${noPaddingTop ? "pb-14 pt-0 sm:pb-16 lg:pb-20" : "pb-14 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-32"}`}>
        {moduleTitle && <ModuleTitle id="gw-services-module-title">{moduleTitle}</ModuleTitle>}
      </div>

      {/* Full-width bordered grid - parent owns top + left edge */}
      <div
        id={`${servicesData.id}-grid`}
        className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3 lg:[&>*:nth-child(3n+1)]:pl-(--cg) lg:[&>*:nth-child(3n)]:pr-(--cg)"
      >
        {servicesData.cards.map((card, i) => {
          const Icon = ICON_BY_KEY[card.icon];
          return (
            <Link
              key={card.id}
              id={card.id}
              href={card.href}
              className={`group flex flex-col h-full border-b border-r border-border p-8 transition-colors ${cellCls}`}
            >
              <ScrollFadeIn delay={0.1 + (i % 3) * 0.1}>
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-(--brand-soft) text-brand transition-transform group-hover:scale-105">
                    <Icon size={20} />
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-foreground/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  />
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {card.blurb}
                </p>
              </ScrollFadeIn>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
