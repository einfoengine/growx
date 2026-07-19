"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Cinematic hero backdrop: a team of robots working at glowing workstations —
 *  the "we are the production team behind your agency" idea made literal —
 *  darkened by a layered scrim, textured with film grain, and drifting slowly
 *  on scroll (parallax). Sits behind the copy; decorative. */
export default function HeroScene({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Slow downward drift as the hero scrolls out of view. Overscaled so the
  // shift never exposes an edge.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.div
        style={{ y: reduceMotion ? 0 : y }}
        className="absolute inset-0 scale-125"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/hero/scene-robots.webp"
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Scrim: layered radial + linear gradients. Tuned lighter than a pure
          crush so the robots stay visible, while keeping the top (behind the
          copy) and bottom (behind the video) dark enough for legible text. */}
      <div
        className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_44%,rgba(10,10,10,0.55)_0%,rgba(10,10,10,0.28)_58%,transparent_86%),radial-gradient(94%_84%_at_50%_50%,transparent_44%,rgba(10,10,10,0.8)_100%),linear-gradient(to_bottom,rgba(10,10,10,0.86)_0%,rgba(10,10,10,0.46)_32%,rgba(10,10,10,0.42)_60%,rgba(10,10,10,0.88)_100%)]"
      />

      {/* Film grain. */}
      <div className="absolute inset-0 bg-film-grain opacity-30" />
    </div>
  );
}
