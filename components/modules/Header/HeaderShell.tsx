"use client";

import type React from "react";
import { useEffect, useState } from "react";

/** Dark token overrides - scoped to the header so its token-based children
 *  (links, borders, CTA, dropdown) flip to a dark treatment automatically. */
const DARK_TOKENS = {
  "--background": "#070707",
  "--foreground": "#fafafa",
  "--muted": "#a1a1aa",
  "--border": "rgba(255,255,255,0.16)",
  "--surface": "#161616",
} as React.CSSProperties;

/** Sticky top bar that turns dark when a `[data-nav-theme="dark"]` section sits
 *  beneath it, and light when a normal (light) section scrolls up to meet it. */
export default function HeaderShell({ children }: { children: React.ReactNode }) {
  // Start light (the home/inner heroes are light); the first measurement
  // flips it instantly over any dark top section.
  const [dark, setDark] = useState(false);
  const [animate, setAnimate] = useState(false);
  // Condensed state: once the page scrolls, the bar narrows from the section
  // container's outer box to its padded content width.
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      // Global light theme repaints every dark band white, so the bar must
      // read those sections as light too — skip dark detection entirely.
      if (document.documentElement.dataset.theme === "light") {
        setDark(false);
        setScrolled((prev) => (prev ? window.scrollY > 8 : window.scrollY > 32));
        return;
      }
      // Sample just below the bar (8px top gap + h-16) to read the section
      // beneath it.
      const probe = 80;
      let isDark = false;
      for (const el of document.querySelectorAll('[data-nav-theme="dark"]')) {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          isDark = true;
          break;
        }
      }
      setDark(isDark);
      // Hysteresis: engage past 32px, release under 8px. A single threshold
      // made the bar's width toggle back and forth when the page idled right
      // at the boundary (or shifted a pixel from late-loading content).
      setScrolled((prev) => (prev ? window.scrollY > 8 : window.scrollY > 32));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };

    compute();
    // Enable color transitions only after the first (instant) measurement,
    // so the bar doesn't visibly fade from light → dark on initial load.
    raf = requestAnimationFrame(() => setAnimate(true));

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Re-read immediately when the theme toggle flips <html data-theme>.
    window.addEventListener("growx-themechange", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("growx-themechange", onScroll);
    };
  }, []);

  return (
    <header
      id="gw-header-shell"
      data-theme={dark ? "dark" : "light"}
      style={dark ? DARK_TOKENS : undefined}
      // Fixed, not sticky: the bar occupies zero flow space, so the page
      // (and the hero's dark background) starts at the very top of the
      // viewport with no background strip above it.
      className="group/nav fixed inset-x-0 top-2 z-50 px-3 sm:px-4"
    >
      {/* Header row: logo at the left, menu centered, CTA at the right. At
          the top of the page the bar is fully transparent and spans the
          section container's outer box; once scrolled it condenses to the
          container's padded content width AND gains the glass pill treatment
          so it stays legible over passing content. */}
      {/* transform-gpu + backface-hidden promote the pill to its own
          compositor layer so the backdrop-blur samples a stable buffer while
          content (incl. the parallax hero scene) repaints behind it — without
          this the blur shimmers/flickers on scroll. */}
      <div
        className={`mx-auto transform-gpu rounded-2xl [backface-visibility:hidden] ${
          scrolled
            ? "max-w-[calc(var(--container-max)-4rem)] border border-border/60 bg-background/65 shadow-lg shadow-black/5 backdrop-blur-xl"
            : "max-w-(--container-max) border border-transparent"
        } ${
          animate
            ? "transition-[max-width,background-color,border-color,box-shadow] duration-300 ease-out"
            : ""
        }`}
      >
        {children}
      </div>
    </header>
  );
}
