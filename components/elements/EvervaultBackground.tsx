"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  usePointerFine,
  usePrefersReducedMotion,
} from "@/lib/hooks/useActiveWhenVisible";

const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>/{}[]()=+-*$#";

function randomString(length: number) {
  let out = "";
  for (let i = 0; i < length; i++) {
    out += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return out;
}

type Props = {
  /** Spotlight radius in px. */
  radius?: number;
  /** Extra classes (e.g. z-index placement) for the layer. */
  className?: string;
  id?: string;
};

/** Evervault-style reveal (à la Aceternity UI): a radial mask follows the
 *  cursor, exposing a scramble of characters over a brand gradient. Full-bleed,
 *  click-through background layer that sizes its character field to fill. */
export default function EvervaultBackground({
  radius = 150,
  className = "",
  id,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const countRef = useRef(4000);
  // Empty on the server; the mount effect measures and fills it. Generating a
  // random string during render would differ between SSR and client → hydration
  // mismatch (and it's a hover-only decorative layer, so nothing is lost).
  const [str, setStr] = useState("");
  const [active, setActive] = useState(false);

  // A cursor spotlight has no touch analogue: on a phone `pointermove` fires
  // continuously while scrolling and `inside` stays true across this full-bleed
  // layer, so every frame would rebuild a string of up to 32k characters and
  // re-render it — for an effect that can never be seen. Reduced-motion users
  // opt out of the scramble for the same reason.
  // Both hooks are called unconditionally; `&&` in the declaration would make
  // the second one conditional and break the rules of hooks.
  const pointerFine = usePointerFine();
  const reduced = usePrefersReducedMotion();
  const enabled = pointerFine && !reduced;

  useEffect(() => {
    if (!enabled) return;

    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // ~7px per glyph, ~13px per line at text-[11px]; cap for performance.
      const cols = Math.ceil(r.width / 7);
      const rows = Math.ceil(r.height / 13);
      countRef.current = Math.min(cols * rows, 32000);
      setStr(randomString(countRef.current));
    };
    measure();
    window.addEventListener("resize", measure);

    let queued = false;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      setActive(inside);
      if (!inside) return;
      mouseX.set(x);
      mouseY.set(y);
      // Re-scramble at most once per frame.
      if (!queued) {
        queued = true;
        requestAnimationFrame(() => {
          setStr(randomString(countRef.current));
          queued = false;
        });
      }
    };
    window.addEventListener("pointermove", onMove);

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", onMove);
    };
  }, [mouseX, mouseY, enabled]);

  const mask = useMotionTemplate`radial-gradient(${radius}px at ${mouseX}px ${mouseY}px, white, transparent)`;
  // `active` is only ever set while enabled; AND it here so a device that flips
  // to coarse-pointer mid-session hides the layer without a state write.
  const show = enabled && active;

  return (
    <div
      ref={ref}
      id={id}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Dark brand gradient revealed under the cursor */}
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-emerald-800 via-emerald-950 to-teal-950 transition-opacity duration-500"
        style={{
          maskImage: mask,
          WebkitMaskImage: mask,
          opacity: show ? 0.6 : 0,
        }}
      />
      {/* Scrambled characters, masked to the same spotlight */}
      <motion.div
        className="absolute inset-0 mix-blend-overlay transition-opacity duration-500"
        style={{
          maskImage: mask,
          WebkitMaskImage: mask,
          opacity: show ? 0.4 : 0,
        }}
      >
        <p className="absolute inset-0 wrap-break-word whitespace-pre-wrap p-2 font-mono text-[10px] font-bold leading-[1.1] text-emerald-300/40">
          {str}
        </p>
      </motion.div>
    </div>
  );
}
