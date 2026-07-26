"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import ModuleTitle from "@/components/elements/ModuleTitle";
import { useMediaQuery } from "@/lib/hooks/useActiveWhenVisible";
import { HOW_IT_WORKS_STEPS as STEPS } from "./steps";

// Badge centres as % of the connector line (which spans badge-0 to badge-3).
const POS = ["0%", "33.333%", "66.667%", "100%"];
// Bounce path: 0→1→2→3→2→1→(loop back to 0). Returns to the start seamlessly.
const PATH = [0, 1, 2, 3, 2, 1];
const TRAVEL_S = 0.8; // light glide time between badges
const DWELL_MS = 1600; // time the light rests on a badge (kindled)

export default function HowItWorks({
  moduleTitle,
}: { moduleTitle?: string } = {}) {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = useReducedMotion();
  // The animation is desktop-only geometry (the connector line is lg+) and
  // respects reduced motion.
  const active = desktop && !reduceMotion;

  // Single source of truth: `target` is the badge the light is on / heading to;
  // `lit` is the badge currently glowing. Both derive from one timer, so the
  // glow can never drift out of sync with the light.
  const [pathIdx, setPathIdx] = useState(0);
  const [lit, setLit] = useState(-1);
  const target = PATH[pathIdx];

  useEffect(() => {
    if (!active) return;
    // Kindle exactly when the light arrives (same TRAVEL_S it animates over);
    // at the end of the dwell, dim this badge and advance to the next. All
    // state changes happen inside the timers, so nothing fires synchronously
    // during the effect and the light/kindle stay driven by one clock.
    const arrive = setTimeout(() => setLit(target), TRAVEL_S * 1000);
    const advance = setTimeout(() => {
      setLit(-1);
      setPathIdx((p) => (p + 1) % PATH.length);
    }, TRAVEL_S * 1000 + DWELL_MS);
    return () => {
      clearTimeout(arrive);
      clearTimeout(advance);
    };
  }, [pathIdx, active, target]);

  return (
    <section
      id="gw-mod-how-it-works"
      data-nav-theme="dark" data-dark-surface
      className="relative isolate overflow-hidden bg-foreground text-background"
    >
      {/* Soft brand glow. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 left-1/2 -top-24 h-72 w-300 max-w-none -translate-x-1/2 bg-brand/8 blur-[130px]"
      />

      <div className="container-1200 gw-section">
        {moduleTitle && (
          <ModuleTitle id="gw-how-it-works-module-title">{moduleTitle}</ModuleTitle>
        )}
        {/* Steps */}
        <ScrollFadeIn delay={0.2}>
          <ol className="relative mt-16 grid gap-y-12 lg:mt-20 lg:grid-cols-4 lg:gap-x-8">
            {/* Connector line (desktop). A single light rests on each badge in
                turn — see the state machine above. */}
            <div
              aria-hidden="true"
              className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-white/15 lg:block"
            >
              {active && (
                <motion.span
                  className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_12px_4px_rgba(16,185,129,0.85)]"
                  initial={{ left: POS[0] }}
                  animate={{ left: POS[target] }}
                  transition={{ duration: TRAVEL_S, ease: "easeInOut" }}
                />
              )}
            </div>
            {STEPS.map((step, i) => (
              <li
                key={step.n}
                className="relative flex flex-col items-center text-center"
              >
                {/* Kindles only while the light is resting on this badge. */}
                <div
                  className={`relative z-10 flex h-16 w-16 items-center justify-center rounded-full border bg-foreground text-2xl font-bold text-brand transition-[border-color,box-shadow] duration-500 ${
                    active && lit === i
                      ? "border-brand shadow-[0_0_24px_3px_rgba(16,185,129,0.55)]"
                      : "border-brand/40"
                  }`}
                >
                  {step.n}
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-white/70 sm:text-base">
                  {step.desc}
                </p>
              </li>
            ))}
          </ol>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
