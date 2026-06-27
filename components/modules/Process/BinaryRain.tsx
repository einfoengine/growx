"use client";

import { useEffect, useRef } from "react";

/** Matrix-style falling 0/1 rain — a subtle dark background texture. */
export default function BinaryRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const FONT = 14;
    let width = 0;
    let height = 0;
    let cols = 0;
    let drops: number[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / FONT);
      drops = Array.from({ length: cols }, () =>
        Math.floor(Math.random() * -50),
      );
      ctx.fillStyle = "#070707";
      ctx.fillRect(0, 0, width, height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    let last = 0;
    const STEP = 45; // ms between rows

    const tick = (t: number) => {
      if (t - last >= STEP) {
        last = t;
        // Fade the previous frame toward the section background.
        ctx.fillStyle = "rgba(7,7,7,0.14)";
        ctx.fillRect(0, 0, width, height);
        ctx.font = `${FONT}px monospace`;

        for (let i = 0; i < cols; i++) {
          const ch = Math.random() < 0.5 ? "0" : "1";
          const x = i * FONT;
          const y = drops[i] * FONT;
          // Occasional bright "head", otherwise muted brand green.
          ctx.fillStyle =
            Math.random() < 0.015
              ? "rgba(209,250,229,0.85)"
              : "rgba(16,185,129,0.45)";
          ctx.fillText(ch, x, y);

          if (y > height && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full opacity-50 mask-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_15%,#000_80%)]"
    />
  );
}
