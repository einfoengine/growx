"use client";

import { useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";

export type Reason = {
  n: string;
  title: string;
  desc: string;
  image: string;
  points: string[];
};

const MAX_TILT = 9; // degrees

/** Reason card with an Aceternity-style 3D tilt: the card leans toward the
 *  cursor. The image zooms and the copy pushes up to reveal the cost bullets.
 *
 *  The card is a real <button>: iOS Safari does not focus a tabindex'd non-form
 *  element on tap, so a focus-within-driven reveal left the cost copy
 *  unreachable on touch. Tap/Enter/Space now toggle `open`. Pointer devices keep
 *  the hover reveal — Tailwind v4 compiles `group-hover:` inside
 *  `@media (hover: hover)`, so it never sticks on touch. */
export default function ReasonCard({ reason }: { reason: Reason }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const handleMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 .. 0.5
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `rotateY(${px * MAX_TILT}deg) rotateX(${-py * MAX_TILT}deg)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <li className="group [perspective:1200px]">
      <button
        ref={ref}
        type="button"
        aria-expanded={open}
        aria-label={`Reason ${reason.n}: ${reason.title}. Show what it costs you.`}
        onClick={() => setOpen((v) => !v)}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onBlur={reset}
        className="relative block h-72 w-full overflow-hidden border border-[rgba(209,250,229,0.18)] text-left transition-transform duration-200 ease-out [transform-style:preserve-3d] focus:outline-none focus-visible:border-brand/40"
      >
        {/* Fixed image backdrop — stays put, only zooms on hover/open. */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-110 ${
            open ? "scale-110" : ""
          }`}
        >
          <Image
            src={reason.image}
            alt=""
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-black/40"
        />

        {/* Text track — slides up over the fixed image. */}
        <div
          className={`relative flex h-[200%] flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1/2 ${
            open ? "-translate-y-1/2" : ""
          }`}
        >
          {/* Primary — reason at the bottom. */}
          <div className="flex h-1/2 shrink-0 flex-col justify-end p-8">
            <span className="font-label text-sm font-bold tracking-[0.2em] text-brand/80">
              Reason {reason.n}
            </span>
            <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {reason.title}
            </h3>
            <p className="mt-3 text-sm text-white/80 sm:text-base">
              {reason.desc}
            </p>
            <span className="mt-4 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
              What it costs you
              <ArrowUpRight size={14} />
            </span>
          </div>

          {/* Reveal — the "flip side", pushed up into view. */}
          <div className="flex h-1/2 shrink-0 flex-col justify-center p-8">
            <span className="font-label text-sm font-bold tracking-[0.2em] text-brand/80">
              Reason {reason.n}: what it costs you
            </span>
            <ul className="mt-5 space-y-3">
              {reason.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X
                    size={16}
                    strokeWidth={3}
                    className="mt-0.5 shrink-0 text-rose-400/80"
                  />
                  <span className="text-sm text-white/85 sm:text-base">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </button>
    </li>
  );
}
