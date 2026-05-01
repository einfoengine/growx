import type React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Bot,
  Code,
  Funnel,
  PenTool,
  Search,
  Share2,
  Target,
} from "lucide-react";
import type { ComponentType } from "react";
import Headline from "@/components/elements/Headline";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import { getServices } from "@/lib/content";
import type { ServiceIcon } from "@/lib/content";
import Eyebrow from "@/components/elements/Eyebrow";

type IconProps = { size?: number; className?: string };

const ICON_BY_KEY: Record<ServiceIcon, ComponentType<IconProps>> = {
  code: Code,
  search: Search,
  bot: Bot,
  "pen-tool": PenTool,
  "share-2": Share2,
  funnel: Funnel,
  target: Target,
};

export default async function Services() {
  const data = await getServices();

  return (
    <section
      id={data.id}
      aria-labelledby={`${data.id}-headline`}
      className="bg-surface"
      style={{ "--cg": "max(2rem, calc((100vw - 1400px) / 2 + 2rem))" } as React.CSSProperties}
    >
      {/* Header stays inside container */}
      <div className="container-1200 pb-14 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-32">
        <ScrollFadeIn delay={0.1}>
          <div
            id={`${data.id}-intro`}
            className="grid gap-10 lg:grid-cols-12 lg:items-end"
          >
            <div className="lg:col-span-7">
              <Eyebrow text={data.eyebrow} />
              <Headline
                id={`${data.id}-headline`}
                parts={data.headline.parts}
                as="h2"
                className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              />
            </div>
            <p className="text-base text-muted lg:col-span-5 lg:max-w-md">
              {data.sub}
            </p>
          </div>
        </ScrollFadeIn>
      </div>

      {/* Full-width bordered grid — parent owns top + left edge */}
      <div
        id={`${data.id}-grid`}
        className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3 lg:[&>*:nth-child(3n+1)]:pl-(--cg) lg:[&>*:nth-child(3n)]:pr-(--cg)"
      >
        {data.cards.map((card, i) => {
          const Icon = ICON_BY_KEY[card.icon];
          return (
            <Link
              key={card.id}
              id={card.id}
              href={card.href}
              className="group flex flex-col h-full border-b border-r border-border bg-surface p-8 transition-colors hover:bg-background"
            >
              <ScrollFadeIn delay={0.1 + (i * 0.1)}>
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
