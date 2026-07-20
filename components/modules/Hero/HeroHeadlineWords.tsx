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

/** A token is a word (fragments preserving highlight boundaries, plus its
 *  word position for the stagger) or an explicit line break. */
type Token =
  | { kind: "word"; frags: Fragment[]; wordIndex: number }
  | { kind: "break" };

/** Tokenize headline parts into whitespace-delimited words while preserving
 *  highlight boundaries. A part that starts without whitespace (e.g. a
 *  trailing ".") attaches to the previous word so it never wraps alone.
 *  A literal "\n" inside a part's value forces a line break. Word indices are
 *  assigned here (breaks excluded) so the reveal stagger has no gaps. */
function tokenize(parts: HeadlinePart[]): Token[] {
  const tokens: Token[] = [];
  let current: Fragment[] = [];
  let wordIndex = 0;

  const flush = () => {
    if (current.length > 0) {
      tokens.push({ kind: "word", frags: current, wordIndex: wordIndex++ });
      current = [];
    }
  };

  for (const part of parts) {
    const highlight = part.type === "highlight";
    if (highlight) {
      // A highlighted phrase stays ONE token (spaces and all) so a single
      // continuous gradient spans it — split per word, each word would carry
      // its own background and the roaming light would render once per word.
      for (const chunk of part.value.split(/(\n)/)) {
        if (!chunk) continue;
        if (chunk === "\n") {
          flush();
          tokens.push({ kind: "break" });
        } else {
          current.push({ text: chunk, highlight });
        }
      }
      continue;
    }
    // Keep the whitespace chunks: they close the current token.
    for (const chunk of part.value.split(/(\s+)/)) {
      if (!chunk) continue;
      if (/^\s+$/.test(chunk)) {
        flush();
        if (chunk.includes("\n")) tokens.push({ kind: "break" });
      } else {
        current.push({ text: chunk, highlight });
      }
    }
  }
  flush();
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
      {tokens.map((tok, i) => {
        if (tok.kind === "break") return <br key={i} />;
        const delay = 0.2 + tok.wordIndex * 0.08;
        const prevIsWord = i > 0 && tokens[i - 1].kind !== "break";
        return (
          <span key={i}>
            {prevIsWord ? " " : null}
            {/* pb/-mb buffer keeps descenders (g, y) out of the clip. */}
            <span className="inline-block overflow-hidden pb-[0.12em] mb-[-0.12em] align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay,
                }}
              >
                {tok.frags.map((f, j) =>
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
          </span>
        );
      })}
    </h1>
  );
}
