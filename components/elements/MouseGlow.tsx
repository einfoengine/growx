"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  useActiveWhenVisible,
  usePointerFine,
} from "@/lib/hooks/useActiveWhenVisible";

/** A soft brand glow trailing the cursor across its nearest positioned ancestor.
 *  Decorative and click-through.
 *
 *  It's purely a cursor affordance, so it's skipped on touch devices, where it
 *  could never be seen but would still cost a listener and two live springs.
 *  It also parks while its container is off-screen: mounted in the footer, it
 *  would otherwise read a rect on every mousemove for the whole page. */
export default function MouseGlow({ id }: { id?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Doubles as the mount guard: false on the server and on the first client
  // render, so SSR and hydration agree without a separate isMounted state.
  const pointerFine = usePointerFine();
  // `enabled` has to carry pointerFine — the container isn't rendered until it
  // is true, so the observer would otherwise attach to a null ref and never fire.
  const active = useActiveWhenVisible(containerRef, { enabled: pointerFine });

  // start offscreen
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!active) return;

    const handleMouseMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, active]);

  if (!pointerFine) return null;

  return (
    <div
      ref={containerRef}
      id={id}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <motion.div
        className="absolute h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/30 blur-[120px]"
        style={{
          left: smoothX,
          top: smoothY,
        }}
      />
    </div>
  );
}
