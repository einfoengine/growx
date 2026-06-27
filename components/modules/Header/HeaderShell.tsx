"use client";

import type React from "react";
import { useEffect, useState } from "react";

/** Dark token overrides — scoped to the header so its token-based children
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

  useEffect(() => {
    let raf = 0;
    const compute = () => {
      // Sample just below the bar (h-16 = 64px) to read the section beneath it.
      const probe = 72;
      let isDark = false;
      for (const el of document.querySelectorAll('[data-nav-theme="dark"]')) {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          isDark = true;
          break;
        }
      }
      setDark(isDark);
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
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      data-theme={dark ? "dark" : "light"}
      style={dark ? DARK_TOKENS : undefined}
      className={`group/nav sticky top-0 z-50 w-full border-b border-border bg-background ${
        animate ? "transition-colors duration-300 ease-out" : ""
      }`}
    >
      {children}
    </header>
  );
}
