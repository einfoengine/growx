"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Layers,
  TrendingDown,
  TriangleAlert,
  UserX,
  ArrowRight,
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

export default function PainPointsAccordion({ cards }: { cards: Card[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.04] lg:grid-cols-[1fr_1fr]">
      {/* Left column: list of items */}
      <div className="divide-y divide-white/[0.07] bg-black/20 backdrop-blur-sm">
        {cards.map((card, index) => {
          const Icon = ICON_BY_KEY[card.icon];
          const isActive = activeIndex === index;

          return (
            <motion.button
              key={card.id}
              onViewportEnter={() => setActiveIndex(index)}
              viewport={{ margin: "-35% 0px -35% 0px" }}
              onClick={() => setActiveIndex(isActive ? null : index)}
              className={`group relative flex w-full items-center gap-5 px-8 py-6 text-left transition-all duration-300 ${
                isActive
                  ? "bg-white/[0.06]"
                  : "hover:bg-white/[0.03]"
              }`}
            >
              {/* Active indicator bar */}
              <span
                className={`absolute left-0 top-0 h-full w-0.5 rounded-r-full bg-brand transition-all duration-300 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Icon */}
              <span
                className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-brand text-black shadow-lg shadow-brand/30"
                    : "bg-white/[0.06] text-white/50 group-hover:bg-white/[0.1] group-hover:text-white/80"
                }`}
              >
                <Icon size={20} />
              </span>

              {/* Title + index */}
              <div className="min-w-0 flex-1">
                <span
                  className={`block text-[11px] font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                    isActive ? "text-brand" : "text-white/30"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className={`mt-0.5 block text-base font-semibold tracking-tight transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/60 group-hover:text-white/90"
                  }`}
                >
                  {card.title}
                </span>
              </div>

              <ArrowRight
                size={16}
                className={`shrink-0 transition-all duration-300 ${
                  isActive
                    ? "translate-x-0 text-brand opacity-100"
                    : "-translate-x-1 text-white/20 opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                }`}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Right column: detail panel */}
      <div className="relative min-h-[340px] bg-black/10 backdrop-blur-sm">
        <AnimatePresence mode="wait">
          {activeIndex !== null ? (
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="p-10"
            >
              {/* Header */}
              <div className="flex items-start gap-4">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-black shadow-xl shadow-brand/20">
                  {(() => {
                    const Icon = ICON_BY_KEY[cards[activeIndex].icon];
                    return <Icon size={26} />;
                  })()}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
                    Pain point {String(activeIndex + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white">
                    {cards[activeIndex].title}
                  </h3>
                </div>
              </div>

              {/* Blurb */}
              <p className="mt-6 text-base leading-relaxed text-white/60">
                {cards[activeIndex].blurb}
              </p>

              {/* Divider */}
              <div className="mt-7 h-px w-full bg-white/[0.07]" />

              {/* Points */}
              {cards[activeIndex].points && cards[activeIndex].points!.length > 0 && (
                <ul className="mt-6 space-y-4">
                  {cards[activeIndex].points!.map((point, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.07 }}
                      className="flex items-start gap-4"
                    >
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                        <span className="text-[10px] font-bold">{i + 1}</span>
                      </span>
                      <span className="text-sm leading-relaxed text-white/75 sm:text-base">
                        {point}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full min-h-[340px] flex-col items-center justify-center p-10 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                <ArrowRight size={24} className="text-white/20 -rotate-45" />
              </div>
              <p className="mt-4 text-sm text-white/30">
                Select a pain point to learn more
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
