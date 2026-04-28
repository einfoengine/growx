import {
  Clock,
  Layers,
  TrendingDown,
  TriangleAlert,
  UserX,
} from "lucide-react";
import type { ComponentType } from "react";
import Headline from "@/components/elements/Headline";
import { getPainPoints } from "@/lib/content";
import type { PainIcon } from "@/lib/content";

type IconProps = { size?: number; className?: string };

const ICON_BY_KEY: Record<PainIcon, ComponentType<IconProps>> = {
  "triangle-alert": TriangleAlert,
  "user-x": UserX,
  layers: Layers,
  "trending-down": TrendingDown,
  clock: Clock,
};

export default async function PainPoints() {
  const data = await getPainPoints();

  return (
    <section
      id={data.id}
      aria-labelledby={`${data.id}-headline`}
      className="relative isolate overflow-hidden bg-foreground text-background"
    >
      <div
        id={`${data.id}-bg-glow`}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(ellipse_60%_60%_at_50%_30%,#000,transparent_85%)]"
      >
        <div className="absolute -top-40 left-1/4 h-105 w-105 rounded-full bg-(--brand-soft) blur-[140px]" />
      </div>
      <div
        id={`${data.id}-bg-grid`}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_70%_60%_at_50%_50%,#000,transparent_90%)]"
      />

      <div className="container-1200 relative py-24 sm:py-28 lg:py-32">
        <div
          id={`${data.id}-intro`}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            {data.eyebrow}
          </p>
          <Headline
            id={`${data.id}-headline`}
            parts={data.headline.parts}
            as="h2"
            className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
          />
          <p className="mx-auto mt-5 max-w-xl text-base text-white/70 sm:text-lg">
            {data.sub}
          </p>
        </div>

        <ul
          id={`${data.id}-grid`}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {data.cards.map((card) => {
            const Icon = ICON_BY_KEY[card.icon];
            return (
              <li
                key={card.id}
                id={card.id}
                className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition hover:border-brand/40 hover:bg-white/[0.06]"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-(--brand-soft) text-brand">
                  <Icon size={18} />
                </span>
                <h3 className="mt-5 text-base font-semibold tracking-tight">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {card.blurb}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
