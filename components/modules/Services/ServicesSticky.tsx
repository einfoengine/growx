"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
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
import SectionHeader from "@/components/elements/SectionHeader";
import type {
  ServiceCard,
  ServiceIcon,
  ServicesContent,
} from "@/lib/content";

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

const MotionLink = motion(Link);

/** A grid cell that scales up a touch while the scroll passes its segment. */
function Card({
  card,
  index,
  total,
  progress,
  enabled,
}: {
  card: ServiceCard;
  index: number;
  total: number;
  progress: MotionValue<number>;
  enabled: boolean;
}) {
  const Icon = ICON_BY_KEY[card.icon];
  const seg = 1 / total;
  const start = index * seg;
  const mid = start + seg / 2;
  const end = start + seg;

  const scale = useTransform(progress, [start, mid, end], [1, 1.07, 1]);
  const zIndex = useTransform(progress, [start, mid, end], [1, 30, 1]);
  const boxShadow = useTransform(
    progress,
    [start, mid, end],
    [
      "0px 0px 0px rgba(16,185,129,0)",
      "0px 26px 50px rgba(16,185,129,0.18)",
      "0px 0px 0px rgba(16,185,129,0)",
    ],
  );

  return (
    <MotionLink
      id={card.id}
      href={card.href}
      style={enabled ? { scale, zIndex, boxShadow } : undefined}
      className="group flex h-full flex-col border-b border-r border-border bg-surface p-8 transition-colors hover:bg-background"
    >
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
      <p className="mt-2 text-sm leading-relaxed text-muted">{card.blurb}</p>
    </MotionLink>
  );
}

export default function ServicesSticky({ data }: { data: ServicesContent }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const total = data.cards.length;

  // Pin + scale only on large screens (where the grid fits the viewport).
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <section
      id={`gw-${data.id}`}
      aria-labelledby={`${data.id}-headline`}
      ref={ref}
      className="bg-surface lg:h-[216vh]"
      style={{ "--cg": "max(2rem, calc((100vw - 1400px) / 2 + 2rem))" } as React.CSSProperties}
    >
      {/* Pinned viewport (lg only) */}
      <div className="flex flex-col py-16 lg:sticky lg:top-0 lg:min-h-screen lg:justify-center lg:overflow-hidden lg:py-20">
        {/* Header */}
        <div className="container-1200 pb-12">
          <div
            id={`${data.id}-intro`}
            className="grid gap-10 lg:grid-cols-12 lg:items-end"
          >
            <SectionHeader
              eyebrow={data.eyebrow}
              headline={data.headline.parts}
              headlineId={`${data.id}-headline`}
              headlineClassName="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              className="lg:col-span-7"
            />
            <p className="text-base text-muted lg:col-span-5 lg:max-w-md">
              {data.sub}
            </p>
          </div>
        </div>

        {/* Full-width bordered grid */}
        <div
          id={`${data.id}-grid`}
          className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3 lg:[&>*:nth-child(3n+1)]:pl-(--cg) lg:[&>*:nth-child(3n)]:pr-(--cg)"
        >
          {data.cards.map((card, i) => (
            <Card
              key={card.id}
              card={card}
              index={i}
              total={total}
              progress={scrollYProgress}
              enabled={enabled}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
