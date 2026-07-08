"use client";

import { useEffect, useState } from "react";

type Props = {
  words: string[];
  className?: string;
  /** ms per typed character */
  typeSpeed?: number;
  /** ms per deleted character */
  deleteSpeed?: number;
  /** ms to hold a completed word before deleting */
  holdTime?: number;
};

/** Cycles through `words`, typing and deleting one character at a time with a
 *  blinking caret. Starts empty so SSR and the first client render match. */
export default function Typewriter({
  words,
  className = "",
  typeSpeed = 95,
  deleteSpeed = 45,
  holdTime = 1600,
}: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const current = words[index % words.length];
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (!deleting && text === current) {
      timer = setTimeout(() => setDeleting(true), holdTime);
    } else if (deleting && text === "") {
      timer = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      }, 400);
    } else {
      timer = setTimeout(
        () =>
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1),
          ),
        deleting ? deleteSpeed : typeSpeed,
      );
    }
    return () => clearTimeout(timer);
  }, [text, deleting, index, words, typeSpeed, deleteSpeed, holdTime]);

  return (
    <span className={className}>
      {text}
      <span
        aria-hidden="true"
        className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-[0.12em] animate-pulse bg-current"
      />
    </span>
  );
}
