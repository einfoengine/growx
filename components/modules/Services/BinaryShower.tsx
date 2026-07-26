"use client";

import { useEffect, useRef } from "react";
import {
  useActiveWhenVisible,
  usePrefersReducedMotion,
} from "@/lib/hooks/useActiveWhenVisible";

type Props = {
  /** Extra classes (z-index / mask / opacity) for the canvas layer. */
  className?: string;
};

const SPACING = 16; // px between columns / rows
const FONT = 14;
const TRAIL = 12; // chars in each falling streak
const BRAND = "16,185,129"; // --brand rgb

/** Matrix-style "binary shower": columns of 0/1 streak downward, brightest at
 *  the head and fading up the trail. Transparent canvas so the section shows
 *  through. Decorative + aria-hidden. */
export default function BinaryShower({ className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ~1,440 fillText() per frame. Falling streaks are exactly the kind of motion
  // reduced-motion users opt out of, and there is no reason to animate them
  // while the section is off-screen or the tab is hidden.
  const reduced = usePrefersReducedMotion();
  const active = useActiveWhenVisible(canvasRef, { enabled: !reduced });

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cols = 0;
    let heads: number[] = []; // head row per column
    let speeds: number[] = []; // rows/frame per column

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT}px ui-monospace, monospace`;
      ctx.textBaseline = "top";
      cols = Math.ceil(width / SPACING) + 1;
      heads = Array.from({ length: cols }, () => Math.random() * -40);
      speeds = Array.from({ length: cols }, () => 0.25 + Math.random() * 0.4);
    };
    resize();
    window.addEventListener("resize", resize);

    // Stable glyph per cell so characters don't flicker as they fall.
    const glyph = (i: number, row: number) =>
      (i * 31 + row * 17) % 3 === 0 ? "1" : "0";

    const totalRows = () => Math.ceil(height / SPACING) + TRAIL;

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < cols; i++) {
        const head = heads[i];
        for (let t = 0; t < TRAIL; t++) {
          const row = Math.floor(head) - t;
          if (row < 0) continue;
          const y = row * SPACING;
          if (y > height) continue;
          const alpha = (1 - t / TRAIL) * 0.42;
          ctx.fillStyle = `rgba(${BRAND},${alpha})`;
          ctx.fillText(glyph(i, row), i * SPACING, y);
        }
        heads[i] += speeds[i];
        if (heads[i] - TRAIL > totalRows()) heads[i] = Math.random() * -10;
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return (
    <canvas
      id="gw-binary-shower"
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
