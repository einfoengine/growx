"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/content";

const AUTOPLAY_MS = 6000;

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

/** Auto-advancing testimonial slider: one partner at a time on a dark card,
 *  metric-led with avatar and attribution. Advances every 6s, pauses on
 *  hover/focus, and (per reduced-motion) never auto-advances — arrows and dots
 *  always work. */
export default function TestimonialsSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const count = testimonials.length;

  const go = (next: number, d: number) => {
    setDir(d);
    setIndex((next + count) % count);
  };

  // Autoplay, gated on pause and reduced-motion. Re-armed whenever the visible
  // index changes so a manual click resets the dwell. Advances inline (not via
  // `go`) to keep the effect's deps self-contained.
  useEffect(() => {
    if (paused || reduceMotion || count < 2) return;
    const id = setTimeout(() => {
      setDir(1);
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [index, paused, reduceMotion, count]);

  const t = testimonials[index];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -60 }),
  };

  return (
    <div
      id="gw-testimonials-slider"
      className="relative mx-auto max-w-4xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Partner testimonials"
    >
      {/* Fixed-height stage so the surrounding layout never jumps between
          quotes of different lengths. */}
      <div className="relative min-h-85 sm:min-h-75">
        <AnimatePresence mode="wait" custom={dir} initial={false}>
          <motion.figure
            key={t.id}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-foreground p-8 text-background sm:p-12"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_12%_0%,rgba(16,185,129,0.26),transparent_58%)]"
            />
            <Quote size={26} aria-hidden="true" className="text-brand" />

            <div className="mt-6 flex flex-wrap items-end gap-x-4 gap-y-2">
              <span className="text-gradient-brand text-6xl font-extrabold leading-none tracking-tight sm:text-7xl">
                {t.metric}
              </span>
              <span className="pb-1 text-sm font-medium text-white/60">
                {t.metricLabel}
              </span>
            </div>

            <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-white/85 sm:text-xl">
              {t.quote}
            </blockquote>

            <figcaption className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-brand text-sm font-bold text-black"
              >
                {initials(t.name)}
              </span>
              <div>
                <div className="text-sm font-semibold text-background">
                  {t.name}
                </div>
                <div className="text-xs text-white/55">
                  {t.title}, {t.company}
                </div>
              </div>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      {/* Controls: arrows + dots. */}
      <div className="mt-6 flex items-center justify-center gap-5">
        <button
          type="button"
          onClick={() => go(index - 1, -1)}
          aria-label="Previous testimonial"
          className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/70 transition-colors hover:border-foreground/40 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <ArrowLeft size={16} aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => go(i, i > index ? 1 : -1)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? "w-6 bg-gradient-brand"
                  : "w-2 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => go(index + 1, 1)}
          aria-label="Next testimonial"
          className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/70 transition-colors hover:border-foreground/40 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
