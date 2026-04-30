"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Clock, Layers, TrendingDown, TriangleAlert, UserX } from "lucide-react";
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
};

export default function PainPointsAccordion({ cards }: { cards: Card[] }) {
  // Start with everything closed
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto mt-16 max-w-3xl space-y-4 relative z-10">
      {cards.map((card, index) => {
        const Icon = ICON_BY_KEY[card.icon];
        const isActive = activeIndex === index;

        return (
          <motion.div
            key={card.id}
            // When this element crosses the middle 20% of the viewport, set it as active
            onViewportEnter={() => setActiveIndex(index)}
            viewport={{ margin: "-40% 0px -40% 0px" }}
            className={`group rounded-2xl border transition-all duration-300 ${
              isActive 
                ? "border-brand/50 bg-white/[0.08] shadow-[0_0_30px_rgba(16,185,129,0.1)]" 
                : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
            }`}
          >
            <button
              onClick={() => setActiveIndex(isActive ? null : index)}
              className="flex w-full items-center justify-between p-6 text-left sm:p-8 outline-none"
            >
              <div className="flex items-center gap-5">
                <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                  isActive ? "bg-brand text-background scale-110 shadow-lg shadow-brand/20" : "bg-(--brand-soft) text-brand"
                }`}>
                  <Icon size={22} />
                </span>
                <h3 className={`text-xl font-semibold tracking-tight transition-colors duration-300 ${
                  isActive ? "text-white" : "text-white/80 group-hover:text-white"
                }`}>
                  {card.title}
                </h3>
              </div>
              <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                isActive ? "border-brand bg-brand text-background rotate-180" : "border-white/20 text-white/50 group-hover:text-white/80 group-hover:border-white/40"
              }`}>
                {isActive ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <div className="px-6 pb-8 pt-0 sm:px-8 sm:pb-10">
                    <p className="pl-[68px] text-base leading-relaxed text-white/70 sm:text-lg">
                      {card.blurb}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
