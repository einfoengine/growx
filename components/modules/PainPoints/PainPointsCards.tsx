"use client";

import { motion } from "framer-motion";
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

export default function PainPointsCards({ cards }: { cards: Card[] }) {
  return (
    <>
      <div className="mt-20 flex flex-col gap-6">
      {cards.map((card, index) => {
        const Icon = ICON_BY_KEY[card.icon];
        
        return (
          <div
            key={card.id}
            className="sticky"
            style={{
              top: `calc(120px + ${index * 100}px)`, // 88px leaves room for the title of the card above
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-3xl border border-white/[0.08] bg-foreground p-8 shadow-2xl md:p-10"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-8">
              {/* Left Column: Icon & Title */}
              <div className="flex flex-1 items-start gap-5 h-[56px]">
                <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand text-black shadow-lg shadow-brand/20">
                  <Icon size={26} />
                </span>
                <div className="flex flex-col justify-center h-full">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand mb-1">
                    Pain point {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl line-clamp-1">
                    {card.title}
                  </h3>
                </div>
              </div>

              {/* Right Column: Details */}
              <div className="flex-1 md:mt-0 mt-4 md:pl-8 md:border-l border-white/[0.08]">
                <p className="text-base leading-relaxed text-white/70">
                  {card.blurb}
                </p>
                {card.points && card.points.length > 0 && (
                  <ul className="mt-6 space-y-4">
                    {card.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                          <span className="text-[10px] font-bold">{i + 1}</span>
                        </span>
                        <span className="text-sm leading-relaxed text-white/75 sm:text-base">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </motion.div>
          </div>
        );
      })}
      </div>
      
      {/* End CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="mt-16 flex flex-col items-center justify-center py-20 px-6 text-center"
      >
        <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Pitch big, we will deliver
        </h3>
        <a
          href="/contact"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-black transition-all hover:scale-105 hover:bg-[#059669] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
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
        </a>
      </motion.div>
    </>
  );
}
