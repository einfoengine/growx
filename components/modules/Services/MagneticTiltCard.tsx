"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
};

const SPRING = { stiffness: 300, damping: 24, mass: 0.6 };

/** 3D magnetic frame: the card tilts toward the cursor and drifts a few px
 *  after it, springing back flat on leave. Mouse-only — touch pointers and
 *  reduced-motion users get the plain card. */
export default function MagneticTiltCard({ children, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Cursor position inside the card, normalized to -0.5 … 0.5 on each axis.
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), SPRING);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), SPRING);
  const x = useSpring(useTransform(px, [-0.5, 0.5], [-5, 5]), SPRING);
  const y = useSpring(useTransform(py, [-0.5, 0.5], [-5, 5]), SPRING);

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      // backfaceVisibility + translateZ promote the card to its own layer so
      // its 3D tilt does not flicker while the tab-slide transform moves it.
      style={{
        rotateX,
        rotateY,
        x,
        y,
        z: 0,
        transformPerspective: 900,
        backfaceVisibility: "hidden",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
