"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Clock,
  Layers,
  TrendingDown,
  TriangleAlert,
  UserX,
} from "lucide-react";
import type { ComponentType } from "react";
import type { PainIcon } from "@/lib/content";

type IconProps = { size?: number; className?: string };

const ICON_BY_KEY: Record<PainIcon, ComponentType<IconProps>> = {
  "triangle-alert": TriangleAlert,
  "user-x": UserX,
  layers: Layers,
  "trending-down": TrendingDown,
  clock: Clock,
};

type Card = {
  id: string;
  title: string;
  blurb: string;
  icon: PainIcon;
  points?: string[];
};

/** Sticky-stack geometry. Each card rests STRIP px below the previous one so the
 *  icon + title of the card above stays readable above the covering card. */
const STICKY_TOP = 100;
const STRIP = 132;

/** Baked scatter so each pill sits on an irregular, hand-placed-looking cluster. */
const SCATTER: { x: number; y: number; rot: number }[] = [
  { x: -6, y: -14, rot: -4 },
  { x: 8, y: 12, rot: 5 },
  { x: -4, y: 16, rot: -3 },
  { x: 6, y: -12, rot: 4 },
  { x: -8, y: 8, rot: 3 },
];

const REPEL_RADIUS = 150;
const REPEL_STRENGTH = 46;

/** A cluster of point-pills that drift away from the cursor when it comes near. */
function MagneticPills({ points }: { points: string[] }) {
  const pillsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const mouse = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const pills = pillsRef.current;
    const cur = pills.map(() => ({ x: 0, y: 0 }));
    let raf = 0;

    const tick = () => {
      for (let i = 0; i < pills.length; i++) {
        const pill = pills[i];
        if (!pill) continue;

        const rect = pill.getBoundingClientRect();
        // Rest center = current visual center minus the offset already applied.
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

        cur[i].x += (targetX - cur[i].x) * 0.12;
        cur[i].y += (targetY - cur[i].y) * 0.12;

        const base = SCATTER[i % SCATTER.length];
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
    <div className="relative z-1 mt-10 flex flex-wrap items-center justify-center gap-3 sm:flex-nowrap">
      {points.map((point, i) => {
        const base = SCATTER[i % SCATTER.length];
        return (
          <span
            key={i}
            ref={(el) => {
              pillsRef.current[i] = el;
            }}
            style={{
              transform: `translate3d(${base.x}px, ${base.y}px, 0) rotate(${base.rot}deg)`,
              willChange: "transform",
            }}
            className="w-full cursor-default rounded-3xl border border-white/12 bg-white/5 px-4 py-2.5 text-center text-sm leading-snug text-white/75 backdrop-blur-sm transition-colors hover:border-brand/40 hover:text-white sm:w-auto sm:max-w-[30%]"
          >
            {point}
          </span>
        );
      })}
    </div>
  );
}

export default function PainPointsCards({ cards }: { cards: Card[] }) {
  const ctaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ["start 90%", "center center"],
  });

  const textScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.25]);
  const textOpacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  // Shrink a card's icon once the following card stacks over it, so the
  // pinned card's title strip reads cleanly.
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [compact, setCompact] = useState<boolean[]>(() => cards.map(() => false));

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const next = cards.map((_, i) => {
        if (i >= cards.length - 1) return false;
        const cur = wrapperRefs.current[i];
        const nxt = wrapperRefs.current[i + 1];
        if (!cur || !nxt) return false;
        const curTop = cur.getBoundingClientRect().top;
        const nxtTop = nxt.getBoundingClientRect().top;
        return nxtTop - curTop <= STRIP + 56;
      });
      setCompact((prev) =>
        prev.length === next.length && prev.every((v, i) => v === next[i])
          ? prev
          : next,
      );
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [cards.length]);

  return (
    <>
      {/* Timeline rail */}
      <div className="relative mt-24">
        <div className="flex flex-col gap-10">
          {cards.map((card, index) => {
            const Icon = ICON_BY_KEY[card.icon];

            return (
              <div
                key={card.id}
                ref={(el) => {
                  wrapperRefs.current[index] = el;
                }}
                className="sticky"
                style={{
                  top: `${STICKY_TOP + index * STRIP}px`,
                  zIndex: index + 1,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className={`relative mx-auto w-full max-w-5xl rounded-4xl border border-white/10 bg-foreground/95 px-8 pb-12 shadow-2xl backdrop-blur-xl transition-[padding] duration-300 ease-out sm:px-16 ${
                    compact[index] ? "pt-9" : "pt-16"
                  }`}
                >
                  {/* Timeline spine — extends past the card edges so stacked cards read as one continuous line through the icons */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 w-px -translate-x-1/2 bg-white/12"
                    style={{ top: "-40px", bottom: "-40px" }}
                  />

                  {/* Icon node sitting on the line, top-center — shrinks when the next card stacks over it */}
                  <span
                    className={`absolute left-1/2 z-10 inline-flex -translate-x-1/2 items-center justify-center rounded-2xl bg-brand text-black shadow-lg shadow-brand/30 ring-8 ring-foreground transition-all duration-300 ease-out ${
                      compact[index]
                        ? "-top-4 h-8 w-8"
                        : "-top-6 h-10 w-10"
                    }`}
                  >
                    <Icon size={compact[index] ? 14 : 18} />
                  </span>

                  {/* Title + subtitle — kept in the top strip so it stays readable when stacked */}
                  <div className="relative z-1 text-center">
                    <p
                      className={`font-semibold uppercase tracking-[0.16em] text-brand transition-all duration-300 ${
                        compact[index] ? "mb-1 text-[10px]" : "mb-2 text-[11px]"
                      }`}
                    >
                      Reason {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
                      {card.title}
                    </h3>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
                      {card.blurb}
                    </p>
                  </div>

                  {/* Points as scattered, cursor-repelling pills */}
                  {card.points && card.points.length > 0 && (
                    <MagneticPills points={card.points} />
                  )}
                </motion.div>
              </div>
            );
          })}

          {/* Trailing space so the last card pins at its stop (the full stack
              completes) before the section scrolls away — kept small to avoid a
              large empty gap at the bottom. */}
          <div aria-hidden="true" className="h-[18vh]" />
        </div>
      </div>

      {/* End CTA */}
      <div ref={ctaRef} className="mt-16 flex flex-col items-center justify-center py-32 text-center overflow-hidden">
        <motion.h3
          style={{ scale: textScale, opacity: textOpacity }}
          className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Pitch big, we will deliver
        </motion.h3>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          href="#book"
          className="group mt-12 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-sm font-semibold text-black transition-all hover:scale-105 hover:bg-[#059669] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
        >
          Lets engage in a meeting
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-1"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </motion.a>
      </div>
    </>
  );
}
