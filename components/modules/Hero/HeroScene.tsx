"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Seeded PRNG (mulberry32) so the star field is identical on server and
 *  client — Math.random() in render would be a hydration mismatch. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Star = {
  left: number; // %
  top: number; // %
  size: number; // px
  delay: number; // s
  duration: number; // s
  emerald: boolean;
};

function makeStars(count: number): Star[] {
  const rand = mulberry32(20260722);
  return Array.from({ length: count }, () => ({
    left: rand() * 100,
    // Keep the field in the upper ~70% — the sky — clear of the feather/video.
    top: rand() * 70,
    size: 1 + rand() * 1.6,
    delay: rand() * 4,
    duration: 2.4 + rand() * 3,
    emerald: rand() < 0.18,
  }));
}

/** Cinematic hero backdrop: robots building glowing product panels toward a
 *  rocket launch city — the "we build the path that scales your agency" idea
 *  made literal.
 *
 *  Source is /hero-dark.png rendered through next/image, so it's auto-optimized
 *  (WebP/AVIF, responsive sizes) AND reflects the file whenever it's replaced —
 *  no manual re-export step.
 *
 *  Layout: the layer fills the whole section (inset-0) and object-cover scales
 *  the image to cover it, so there's never a gap. For that to be full-width with
 *  no side cropping, the source should be TALLER than the section (a square-ish
 *  ~1:1 or portrait ~4:5 crop) — cover then fills by width and trims a little off
 *  top/bottom instead of the sides.
 *
 *  Parallax: a small downward drift as the hero scrolls away. It rides inside the
 *  vertical overflow that cover already creates (the trimmed top/bottom), so no
 *  CSS overscale is needed and the sides are never re-cropped. A layered scrim
 *  keeps the copy legible; film grain adds texture. Decorative. */
export default function HeroScene({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Downward drift as the hero scrolls away, riding inside the vertical overflow
  // cover already creates — no CSS overscale, so the sides stay uncropped.
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  const stars = useMemo(() => makeStars(70), []);

  // Dark-theme spotlight: the heavy overlay opens around the cursor so the
  // scene shows through where the visitor points. CSS vars are mutated on the
  // element directly (no React state) so mousemove never re-renders, rAF-
  // throttled. Until the first move the hole sits off-screen (uniformly dark).
  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = spotlightRef.current;
        const host = ref.current;
        if (!el || !host) return;
        const r = host.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Fills the section via cover. With a taller-than-section source this
          fills by width (no side crop) and trims a little off top/bottom.
          Theme pair: the dark scene renders by default, the white scene in
          [data-theme="light"]. The inactive one is display:none AND lazy, so
          browsers don't fetch it until the theme actually shows it. */}
      <motion.div
        style={{ y: reduceMotion ? 0 : y }}
        className="absolute inset-0"
      >
        <Image
          src="/hero-dark.png"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center light:hidden"
        />
        <Image
          src="/hero-white.png"
          alt=""
          fill
          loading="lazy"
          quality={90}
          sizes="100vw"
          className="hidden object-cover object-center light:block"
        />
      </motion.div>

      {/* Scrim: a soft radial behind the copy for text contrast, plus a light
          top-to-bottom wash. Kept light since the image is already dark — so the
          robots, glowing panels, and rocket read through — while the top
          (headline) and bottom (video) stay legible. Theme pair: white-based
          scrim over the light scene keeps dark text legible the same way. */}
      <div
        className="absolute inset-0 light:hidden bg-[radial-gradient(66%_56%_at_50%_36%,rgba(10,10,10,0.5)_0%,rgba(10,10,10,0.2)_56%,transparent_82%),linear-gradient(to_bottom,rgba(10,10,10,0.48)_0%,rgba(10,10,10,0.1)_28%,rgba(10,10,10,0.14)_58%,rgba(10,10,10,0.82)_100%)]"
      />
      <div
        className="hidden light:block absolute inset-0 bg-[radial-gradient(66%_56%_at_50%_36%,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.25)_56%,transparent_82%),linear-gradient(to_bottom,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.15)_28%,rgba(255,255,255,0.2)_58%,rgba(255,255,255,0.9)_100%)]"
      />

      {/* Dark theme only: heavy overlay that deepens the whole scene, with a
          soft spotlight hole tracking the cursor — the image is dim everywhere
          and reveals itself where the visitor points. Default hole position is
          off-screen so touch/idle viewers just get the deep-dark scene. */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 light:hidden"
        style={{
          background:
            "radial-gradient(circle 380px at var(--mx, 50%) var(--my, -40%), rgba(10,10,10,0.05) 0%, rgba(10,10,10,0.45) 55%, rgba(10,10,10,0.72) 100%)",
        }}
      />

      {/* Dark theme only: twinkling stars over the darkened sky. Positions are
          seeded (SSR-stable); per-star delay/duration desynchronize the field. */}
      <div className="absolute inset-0 light:hidden">
        {stars.map((s, i) => (
          <span
            key={i}
            className="animate-star-twinkle absolute rounded-full"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              backgroundColor: s.emerald ? "#34d399" : "#e5e7eb",
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Bottom feather: the image dissolves fully into the section background
          at its lower edge (white in the light theme, near-black in dark), so
          the hero never ends on a hard image line. */}
      <div className="absolute inset-x-0 bottom-0 h-56 light:hidden bg-linear-to-b from-transparent to-[#0a0a0a]" />
      <div className="hidden light:block absolute inset-x-0 bottom-0 h-56 bg-linear-to-b from-transparent to-white" />

      {/* Film grain. */}
      <div className="absolute inset-0 bg-film-grain opacity-30" />
    </div>
  );
}
