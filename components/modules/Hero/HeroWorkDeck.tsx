"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type HeroWorkDeckProps = {
  /** Work shots to cycle through. Swap via props as stronger pieces land. */
  images?: string[];
  className?: string;
};

// Real deliverables already shipped on the site (portfolio + services art).
const DEFAULT_IMAGES = [
  "/assets/portfolio/web-1.png",
  "/assets/services/s01.webp",
  "/assets/portfolio/social-1.png",
  "/assets/services/s03.webp",
  "/assets/portfolio/web-3.png",
  "/assets/services/s05.webp",
  "/assets/portfolio/social-2.png",
  "/assets/portfolio/web-2.png",
];

// The visible pile, bottom to top: a loose stack of three, like cards tossed
// onto a table.
const SLOTS = [
  { rotate: 9, scale: 0.9, z: 1 },
  { rotate: 0, scale: 0.95, z: 2 },
  { rotate: -9, scale: 1, z: 3 },
];

const DEAL_MS = 2600;

/** Cycling deck of work shots: every couple of seconds a new card drops from
 *  above onto a small rotated pile. Purely decorative (aria-hidden) — the
 *  pile is proof-of-craft texture beside the headline, not content. */
export default function HeroWorkDeck({
  images = DEFAULT_IMAGES,
  className = "",
}: HeroWorkDeckProps) {
  const reduceMotion = useReducedMotion();
  // Monotonic deal counter; the pile shows the last three cards dealt.
  const [dealt, setDealt] = useState(SLOTS.length);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setDealt((d) => d + 1), DEAL_MS);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const visible = reduceMotion
    ? [0]
    : [dealt - 2, dealt - 1, dealt].filter((n) => n >= 0);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative h-[194px] w-[150px] ${className}`}
    >
      {visible.map((seq, idx) => {
        // Later cards take higher slots; a short pile keeps the top slot.
        const slot = SLOTS[idx + (SLOTS.length - visible.length)];
        const src = images[seq % images.length];
        return (
          <motion.div
            key={seq}
            initial={
              reduceMotion ? false : { y: -420, rotate: -16, scale: 1 }
            }
            animate={{ y: 0, rotate: slot.rotate, scale: slot.scale }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            style={{ zIndex: slot.z }}
            className="absolute inset-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="h-full w-full object-cover" />
          </motion.div>
        );
      })}
    </div>
  );
}
