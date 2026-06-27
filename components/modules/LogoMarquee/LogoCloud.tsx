"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const COUNT = 6;

/**
 * A single row of client logos. Every tick one logo fades out and a fresh one
 * (from the pool not currently shown) fades in. Swap the <span> for an <img>
 * once the real logo assets are ready.
 */
export default function LogoCloud({ logos }: { logos: string[] }) {
  const [visible, setVisible] = useState(() => logos.slice(0, COUNT));

  useEffect(() => {
    if (logos.length <= COUNT) return;
    const id = setInterval(() => {
      setVisible((prev) => {
        const pool = logos.filter((l) => !prev.includes(l));
        if (pool.length === 0) return prev;
        const slot = Math.floor(Math.random() * prev.length);
        const next = pool[Math.floor(Math.random() * pool.length)];
        const updated = [...prev];
        updated[slot] = next;
        return updated;
      });
    }, 1600);
    return () => clearInterval(id);
  }, [logos]);

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-8">
      {visible.map((name, i) => (
        <div key={i} className="flex flex-1 justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={name}
              initial={{ opacity: 0, scale: 0.8, filter: "blur(6px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.8, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="block whitespace-nowrap text-base font-semibold tracking-tight text-white/30 transition-colors hover:text-white/80 sm:text-2xl"
            >
              {name}
            </motion.span>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
