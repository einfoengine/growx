"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Giant brand watermark at the very bottom of the footer. It starts tucked
 *  UP behind the footer's content box (its own container clips it) and slides
 *  DOWN into view as you scroll toward the end of the page, stopping at rest
 *  fully visible. */
export default function FooterWatermark({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  // Percentages are of the wordmark's own height. Negative = raised behind the
  // footer box (clipped away); 0% = settled, fully readable. The wordmark
  // descends into place and STOPS there.
  const y = useTransform(scrollYProgress, [0, 1], ["-85%", "0%"]);

  return (
    <div
      id="gw-footer-watermark"
      ref={ref}
      aria-hidden="true"
      // Height = the wordmark's own em box (15vw with leading-none), so the
      // container adds NO empty headroom of its own; the negative top margin
      // cancels the font's intrinsic space above the glyphs. Net gap between
      // the content above and the logo ink stays ~40–50px at every viewport
      // (well under the 100px ceiling).
      className="pointer-events-none relative z-0 mt-[-2vw] flex h-[15vw] items-end justify-center overflow-hidden"
    >
      <motion.span
        style={{
          y: reduceMotion ? "0%" : y,
          fontFamily: "var(--font-heading)",
        }}
        className="select-none whitespace-nowrap text-[15vw] font-bold leading-none tracking-tighter text-white/6 light:text-black/5"
      >
        {name}
      </motion.span>
    </div>
  );
}
