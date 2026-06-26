"use client";

import { useEffect, useRef } from "react";
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
import type { ServiceCard, ServiceIcon } from "@/lib/content";

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

/** Baked-in scatter so the pills sit on an irregular, hand-placed-looking grid. */
const SCATTER: { x: number; y: number; rot: number }[] = [
  { x: -40, y: -28, rot: -5 },
  { x: 36, y: 22, rot: 4 },
  { x: -18, y: 30, rot: -3 },
  { x: 44, y: -24, rot: 6 },
  { x: -34, y: 18, rot: 3 },
  { x: 24, y: -32, rot: -6 },
  { x: -10, y: -14, rot: 2 },
];

const REPEL_RADIUS = 200;
const REPEL_STRENGTH = 70;

export default function ServicePillsCloud({ cards }: { cards: ServiceCard[] }) {
  const pillsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const mouse = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const pills = pillsRef.current;
    const cur = pills.map(() => ({ x: 0, y: 0 }));
    let raf = 0;

    const tick = () => {
      for (let i = 0; i < pills.length; i++) {
        const pill = pills[i];
        if (!pill) continue;

        const base = SCATTER[i % SCATTER.length];
        const rect = pill.getBoundingClientRect();
        // Rest center = current visual center minus the offset we already applied.
        const restX = rect.left + rect.width / 2 - cur[i].x;
        const restY = rect.top + rect.height / 2 - cur[i].y;

        const dx = restX - mouse.current.x;
        const dy = restY - mouse.current.y;
        const dist = Math.hypot(dx, dy) || 1;

        let targetX = 0;
        let targetY = 0;
        if (mouse.current.active && dist < REPEL_RADIUS) {
          const force = (1 - dist / REPEL_RADIUS) ** 2;
          targetX = (dx / dist) * force * REPEL_STRENGTH;
          targetY = (dy / dist) * force * REPEL_STRENGTH;
        }

        // Smooth toward the target (spring-ish lerp).
        cur[i].x += (targetX - cur[i].x) * 0.12;
        cur[i].y += (targetY - cur[i].y) * 0.12;

        pill.style.transform = `translate3d(${base.x + cur[i].x}px, ${base.y + cur[i].y}px, 0) rotate(${base.rot}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onLeave = () => {
      mouse.current.active = false;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="relative mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-x-4 gap-y-6 px-6 py-10 sm:gap-x-6">
      {cards.map((card, i) => {
        const Icon = ICON_BY_KEY[card.icon];
        const base = SCATTER[i % SCATTER.length];
        return (
          <Link
            key={card.id}
            id={card.id}
            href={card.href}
            ref={(el) => {
              pillsRef.current[i] = el;
            }}
            style={{
              transform: `translate3d(${base.x}px, ${base.y}px, 0) rotate(${base.rot}deg)`,
              willChange: "transform",
            }}
            className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-surface py-3 pl-3 pr-5 shadow-sm transition-[background-color,border-color,box-shadow] duration-300 hover:border-brand/40 hover:bg-background hover:shadow-md"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--brand-soft) text-brand transition-transform group-hover:scale-110">
              <Icon size={18} />
            </span>
            <span className="text-sm font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand">
              {card.title}
            </span>
            <ArrowUpRight
              size={15}
              className="text-foreground/30 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
            />
          </Link>
        );
      })}
    </div>
  );
}
