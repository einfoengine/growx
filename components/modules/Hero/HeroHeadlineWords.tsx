"use client";

import { motion } from "framer-motion";
import type { HeadlinePart } from "@/lib/content/types";

type Fragment = { text: string; highlight: boolean };

type HeroHeadlineWordsProps = {
  id?: string;
  parts: HeadlinePart[];
  className?: string;
  highlightClassName?: string;
};

/** Tokenize headline parts into whitespace-delimited words while preserving
 *  highlight boundaries. A part that starts without whitespace (e.g. a
 *  trailing ".") attaches to the previous word so it never wraps alone. */
function tokenize(parts: HeadlinePart[]): Fragment[][] {
  const tokens: Fragment[][] = [];
  let current: Fragment[] = [];

  for (const part of parts) {
    const highlight = part.type === "highlight";
    // Keep the whitespace chunks: they close the current token.
    for (const chunk of part.value.split(/(\s+)/)) {
      if (!chunk) continue;
      if (/^\s+$/.test(chunk)) {
        if (current.length > 0) tokens.push(current);
        current = [];
      } else {
        current.push({ text: chunk, highlight });
      }
    }
  }
  if (current.length > 0) tokens.push(current);
  return tokens;
}

/** Word-by-word headline reveal: each word rises out of its own clipped
 *  wrapper with a small stagger. The h1 keeps the full text in the DOM, so
 *  reading order and SEO are unchanged. */
export default function HeroHeadlineWords({
  id,
  parts,
  className = "",
  highlightClassName = "",
}: HeroHeadlineWordsProps) {
  const tokens = tokenize(parts);

  return (
    <h1 id={id} className={className}>
      {tokens.map((frags, i) => (
        <span key={i}>
          {/* pb/-mb buffer keeps descenders (g, y) out of the clip. */}
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2 + i * 0.08,
              }}
            >
              {frags.map((f, j) =>
                f.highlight ? (
                  <span key={j} className={highlightClassName}>
                    {f.text}
                  </span>
                ) : (
                  <span key={j}>{f.text}</span>
                )
              )}
            </motion.span>
          </span>
          {i < tokens.length - 1 ? " " : null}
        </span>
      ))}
    </h1>
  );
}
