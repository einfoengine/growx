"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
};

/** Evervault-style reveal (à la Aceternity UI): a radial mask follows the
 *  cursor, exposing a scramble of characters over a brand gradient. Full-bleed,
 *  click-through background layer that sizes its character field to fill. */
export default function EvervaultBackground({
  radius = 150,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const countRef = useRef(4000);
  const [str, setStr] = useState(() => randomString(4000));
  const [active, setActive] = useState(false);

  useEffect(() => {
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
  }, [mouseX, mouseY]);

  const mask = useMotionTemplate`radial-gradient(${radius}px at ${mouseX}px ${mouseY}px, white, transparent)`;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Dark brand gradient revealed under the cursor */}
      <motion.div
        className="absolute inset-0 bg-linear-to-br from-emerald-800 via-emerald-950 to-teal-950 transition-opacity duration-500"
        style={{
          maskImage: mask,
          WebkitMaskImage: mask,
          opacity: active ? 0.6 : 0,
        }}
      />
      {/* Scrambled characters, masked to the same spotlight */}
      <motion.div
        className="absolute inset-0 mix-blend-overlay transition-opacity duration-500"
        style={{
          maskImage: mask,
          WebkitMaskImage: mask,
          opacity: active ? 0.4 : 0,
        }}
      >
        <p className="absolute inset-0 wrap-break-word whitespace-pre-wrap p-2 font-mono text-[10px] font-bold leading-[1.1] text-emerald-300/40">
          {str}
        </p>
      </motion.div>
    </div>
  );
}
