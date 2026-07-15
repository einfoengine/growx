"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Perspective stage for the hero VSL. At rest the frame lies tilted back
 *  into the page (top edge receding, like a presentation screen); scrolling
 *  it up the viewport straightens it to flat. Scroll-linked, not triggered,
 *  so it tracks in both directions and never plays "at" the user. */
export default function HeroVideoPerspective({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // Fully tilted while the frame is at the fold, flat once its top reaches
    // the upper third of the viewport — roughly where it sits when the user
    // has scrolled it into "watch me" position.
    offset: ["start end", "start 0.35"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [26, 0]);
  // The tilt's bottom half swings toward the viewer and reads wider than the
  // column; the slight scale-down keeps it inside the container until flat.
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);

  if (reduceMotion) {
    return (
      <div className={className}>
        <div className="hero-video">{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="hero-video"
        style={{ rotateX, scale, transformPerspective: 1100 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
