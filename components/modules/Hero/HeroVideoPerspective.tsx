"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "@/lib/hooks/useActiveWhenVisible";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Presentation stage for the hero VSL. At rest the frame is narrow and lies
 *  tilted back into the page; scrolling it up the viewport straightens it to
 *  flat while it grows to the full container width. Scroll-linked, not
 *  triggered, so it tracks in both directions and never plays "at" the user. */
export default function HeroVideoPerspective({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // The narrow start only reads on screens with room to spare; on phones the
  // frame stays full width and just untilts.
  const wide = useMediaQuery("(min-width: 640px)");
  const { scrollYProgress } = useScroll({
    target: ref,
    // Fully tilted while the frame is at the fold, flat once its top reaches
    // the upper third of the viewport — roughly where it sits when the user
    // has scrolled it into "watch me" position.
    offset: ["start end", "start 0.35"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [26, 0]);
  // Scale, NOT width: width is a layout property, so animating it reflowed
  // the whole page every frame — content below shifted while scrolling, and
  // the header's section probe crossed boundaries repeatedly and flickered.
  // A transform stays on the compositor and moves nothing else.
  const scale = useTransform(scrollYProgress, [0, 1], wide ? [0.62, 1] : [1, 1]);

  if (reduceMotion) {
    return (
      <div id="gw-hero-video-perspective" className={className}>
        <div className="hero-video">{children}</div>
      </div>
    );
  }

  return (
    <div ref={ref} id="gw-hero-video-perspective" className={className}>
      <motion.div
        className="hero-video mx-auto"
        style={{
          scale,
          rotateX,
          transformPerspective: 1100,
          transformOrigin: "center top",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
