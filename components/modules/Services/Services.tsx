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
import { getServices } from "@/lib/content";
import type { ServiceIcon } from "@/lib/content";

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
      className="relative bg-surface"
    >
      <div className="container-1200 py-24 sm:py-28 lg:py-32">
        <div
          id={`${data.id}-intro`}
          className="grid gap-10 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {data.eyebrow}
            </p>
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

        <div
          id={`${data.id}-grid`}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {data.cards.map((card) => {
            const Icon = ICON_BY_KEY[card.icon];
            return (
              <Link
                key={card.id}
                id={card.id}
                href={card.href}
                className="group relative flex flex-col rounded-2xl border border-border bg-background p-7 transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-[0_20px_40px_-20px_rgba(10,10,10,0.18)]"
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
                <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {card.blurb}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
