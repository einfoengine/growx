"use client";

import { useEffect, useState, type RefObject } from "react";

/** Reactive media query. Starts `false` on the server and on first paint so SSR
 *  always emits the "no match" branch — matching the matchMedia idiom already
 *  used in ServicesCatalog, and keeping hydration free of mismatches. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(query);
    const sync = () => setMatches(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [query]);

  return matches;
}

/** True when the device has a precise pointer (mouse/trackpad). Use to skip
 *  cursor-driven work that has no touch analogue. */
export function usePointerFine(): boolean {
  return useMediaQuery("(pointer: fine)");
}

/** True when the user has asked the OS to reduce motion. framer `motion`
 *  components are handled globally via MotionConfig; this is for canvas/rAF
 *  work, which that does not cover. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

type Options = {
  /** Extra gate. Pass `false` to force inactive regardless of visibility. */
  enabled?: boolean;
  /** Grows the observer box so work resumes just before the element scrolls in. */
  rootMargin?: string;
};

/**
 * True only while `ref`'s element is on-screen AND the tab is foregrounded.
 *
 * Gate a requestAnimationFrame loop on this so it stops burning frames while
 * the user reads a section further down the page or switches tabs:
 *
 *     const active = useActiveWhenVisible(canvasRef);
 *     useEffect(() => {
 *       if (!active) return;
 *       let raf = requestAnimationFrame(function loop() { ...; raf = requestAnimationFrame(loop); });
 *       return () => cancelAnimationFrame(raf);
 *     }, [active]);
 *
 * Starts `false`: a loop should never run before we know the element is
 * actually on-screen.
 */
export function useActiveWhenVisible<T extends Element>(
  ref: RefObject<T | null>,
  { enabled = true, rootMargin = "200px" }: Options = {},
): boolean {
  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    // No setOnScreen(false) here: the return value already ANDs in `enabled`,
    // so skipping the observer is enough and avoids a cascading render.
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, enabled, rootMargin]);

  useEffect(() => {
    const sync = () => setTabVisible(document.visibilityState === "visible");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return enabled && onScreen && tabVisible;
}
