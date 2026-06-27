"use client";

import { useEffect, useRef } from "react";

/** An interactive globe made of dots — a lightweight canvas stand-in for the
 *  earth-from-space video. Spins on its own and parallaxes toward the cursor. */
export default function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // ── Points evenly spread on a unit sphere (Fibonacci lattice) ───────────
    const COUNT = 7000;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2; // 1 → -1
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      pts.push({ x: Math.cos(theta) * r, y, z: Math.sin(theta) * r });
    }

    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Pointer parallax (smoothed)
    const ptr = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      ptr.tx = e.clientX / window.innerWidth - 0.5;
      ptr.ty = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove);

    let spin = 0;
    let last = 0;
    let raf = 0;

    const frame = (t: number) => {
      const dt = last ? Math.min((t - last) / 1000, 0.05) : 0;
      last = t;

      ptr.x += (ptr.tx - ptr.x) * 0.04;
      ptr.y += (ptr.ty - ptr.y) * 0.04;
      if (!reduceMotion) spin += dt * 0.13;

      const rotY = spin + ptr.x * 0.9;
      const rotX = 0.32 + ptr.y * 0.45;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const cx = width / 2;
      // Center sits near the bottom, so only the top half of the globe is
      // visible — the lower half is clipped below the section.
      const cy = height - 100;
      const radius = Math.min(900, width); // ~1800px wide on desktop

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        // rotate Y then X
        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const persp = 1 / (1.85 - z2 * 0.6);
        const sx = cx + x1 * radius * persp;
        const sy = cy + y2 * radius * persp;

        const depth = (z2 + 1) / 2; // 0 back → 1 front
        const size = 0.5 + depth * 1.3;
        const alpha = 0.06 + depth * depth * 0.55;

        // Brand green with a sprinkle of deeper-emerald accents (reads on white)
        ctx.fillStyle =
          i % 11 === 0
            ? `rgba(4,120,87,${alpha})`
            : `rgba(16,185,129,${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 -z-30 h-full w-full"
    />
  );
}
