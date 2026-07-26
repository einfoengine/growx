"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Visually pins its content once its bottom reaches the viewport bottom, so
 *  whatever follows in the document scrolls OVER it (the follower must be a
 *  positioned, opaque, later sibling — e.g. the site footer).
 *
 *  Why not position: sticky — the pinned block and the section covering it
 *  live in different parents (page `main` vs the layout footer), and sticky
 *  can't span that boundary. Instead the block translates down at exactly the
 *  scroll rate across one viewport of scrolling, which reads as pinned.
 *  Respects reduced motion (no transform → normal scrolling). */
export default function StickyReveal({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // 0 → block's bottom meets the viewport bottom (follower about to enter);
    // 1 → block's bottom meets the viewport top. Exactly 100vh of scrolling.
    offset: ["end end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "100vh"]);

  return (
    <motion.div
      ref={ref}
      id={id ?? "el-sticky-reveal"}
      style={{ y: reduceMotion ? 0 : y }}
      className={`relative z-0 ${className}`.trim()}
    >
      {children}
    </motion.div>
  );
}
