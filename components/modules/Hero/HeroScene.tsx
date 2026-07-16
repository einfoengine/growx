"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Cinematic hero backdrop, in the style of the coming-soon scene: a dark
 *  emerald image crushed to near-black by a layered scrim, textured with film
 *  grain, and drifting slowly on scroll (parallax). Sits behind the copy;
 *  purely decorative. */
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
          src="/assets/hero/scene.webp"
          alt=""
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Scrim: layered radial + linear gradients crushing the image to
          near-black so it reads as texture, not a photo. */}
      <div
        className="absolute inset-0 bg-[radial-gradient(64%_58%_at_50%_45%,rgba(10,10,10,0.75)_0%,rgba(10,10,10,0.45)_60%,transparent_84%),radial-gradient(90%_80%_at_50%_50%,transparent_40%,rgba(10,10,10,0.85)_100%),linear-gradient(to_bottom,rgba(10,10,10,0.85)_0%,rgba(10,10,10,0.6)_35%,rgba(10,10,10,0.55)_60%,rgba(10,10,10,0.9)_100%)]"
      />

      {/* Film grain. */}
      <div className="absolute inset-0 bg-film-grain opacity-30" />
    </div>
  );
}
