"use client";

import { useEffect, useRef } from "react";
import {
  useActiveWhenVisible,
  usePrefersReducedMotion,
} from "@/lib/hooks/useActiveWhenVisible";

type Props = {
  /** Extra classes (e.g. z-index / mask) for the canvas layer. */
  className?: string;
};

const SPACING = 26; // px between dots
const DOT = 1.1; // dot radius
const RADIUS = 135; // cursor light radius
const BASE_ALPHA = 0.07; // resting dot brightness
const SPARKLE_CHANCE = 0.45; // avg new sparkles spawned per frame
const BRAND = [16, 185, 129]; // emerald, matches --brand

/** Interactive dot field for the hero: dots brighten (and tint green) near the
 *  cursor, and every so often a random dot flickers with a dim light. Canvas so
 *  a few thousand dots animate cheaply. Decorative + aria-hidden. */
export default function HeroDots({ className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999, on: false });

  // A full redraw is ~2,300 arc()+fill() calls; left ungated it keeps running at
  // 60fps while the reader is eight sections down the page, or on a hidden tab.
  const reduced = usePrefersReducedMotion();
  const active = useActiveWhenVisible(canvasRef, { enabled: !reduced });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    // Transient dim lights at random grid cells; each fades in then out.
    let sparkles: { col: number; row: number; life: number; max: number; peak: number }[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / SPACING);
      rows = Math.ceil(height / SPACING);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
      mouse.current.on =
        mouse.current.x >= 0 &&
        mouse.current.y >= 0 &&
        mouse.current.x <= width &&
        mouse.current.y <= height;
    };
    /** The resting field: no cursor light, no sparkles. Used as the sole frame
     *  for reduced-motion, and to paint something before the observer reports
     *  the canvas on-screen. */
    const drawResting = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = `rgba(255,255,255,${BASE_ALPHA})`;
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          ctx.beginPath();
          ctx.arc(c * SPACING, r * SPACING, DOT, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // Honor the OS setting: a static field, no cursor tracking, no loop.
    // MotionConfig covers framer components but not canvas work like this.
    if (reduced) {
      drawResting();
      return () => window.removeEventListener("resize", resize);
    }

    window.addEventListener("pointermove", onMove);

    if (!active) {
      drawResting();
      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("pointermove", onMove);
      };
    }

    let raf = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const { x: mx, y: my, on } = mouse.current;

      // Spawn the occasional sparkle at a random cell.
      if (Math.random() < SPARKLE_CHANCE) {
        sparkles.push({
          col: Math.floor(Math.random() * cols),
          row: Math.floor(Math.random() * rows),
          life: 0,
          max: 55 + Math.random() * 90,
          peak: 0.35 + Math.random() * 0.45,
        });
      }
      // Advance + index active sparkles by cell.
      const sparkleMap = new Map<string, number>();
      sparkles = sparkles.filter((s) => {
        s.life += 1;
        if (s.life >= s.max) return false;
        const t = s.life / s.max;
        sparkleMap.set(`${s.col},${s.row}`, Math.sin(t * Math.PI) * s.peak);
        return true;
      });

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const x = c * SPACING;
          const y = r * SPACING;

          let alpha = BASE_ALPHA;
          let tint = 0; // 0 = white, 1 = full brand green

          if (on) {
            const dist = Math.hypot(x - mx, y - my);
            if (dist < RADIUS) {
              const f = 1 - dist / RADIUS;
              alpha += f * 0.85;
              tint = Math.max(tint, f);
            }
          }

          const sp = sparkleMap.get(`${c},${r}`);
          if (sp) {
            alpha += sp;
            tint = Math.max(tint, 0.6);
          }

          const rr = Math.round(255 + (BRAND[0] - 255) * tint);
          const gg = Math.round(255 + (BRAND[1] - 255) * tint);
          const bb = Math.round(255 + (BRAND[2] - 255) * tint);
          ctx.fillStyle = `rgba(${rr},${gg},${bb},${Math.min(alpha, 1)})`;
          ctx.beginPath();
          ctx.arc(x, y, DOT, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [active, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
