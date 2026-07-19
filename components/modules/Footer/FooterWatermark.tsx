"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Giant brand watermark at the very bottom of the footer, revealed with a
 *  slow parallax: it sits low and mostly tucked under the fold as the footer
 *  first appears, then drifts up as you scroll to the end of the page,
 *  finishing almost fully visible with only its base under the screen edge. */
export default function FooterWatermark({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  // Percentages are of the wordmark's own height, so the drift scales with the
  // vw-sized type. Positive = pushed down (more hidden), ending near flush.
  const y = useTransform(scrollYProgress, [0, 1], ["24%", "-4%"]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none relative z-0 -mt-8 flex h-[12vw] items-start justify-center overflow-hidden"
    >
      <motion.span
        style={{
          y: reduceMotion ? "-4%" : y,
          fontFamily: "var(--font-heading)",
        }}
        className="select-none whitespace-nowrap text-[15vw] font-bold leading-none tracking-tighter text-white/[0.06]"
      >
        {name}
      </motion.span>
    </div>
  );
}
