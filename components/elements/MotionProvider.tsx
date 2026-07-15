"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Client boundary for framer-motion's global config.
 *
 * `reducedMotion="user"` makes every `motion` component honour the OS-level
 * prefers-reduced-motion setting: transform/layout animations are dropped while
 * opacity still animates, so reveals fade in rather than slide. This covers the
 * JS-driven motion that the CSS safety net in app/styles/utilities.css cannot
 * reach (ScrollFadeIn, modal + card entrances, the mobile drawer).
 *
 * Kept as its own component so the root layout stays a server component.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
