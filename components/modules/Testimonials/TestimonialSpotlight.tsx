"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Testimonial = {
  name: string;
  title: string;
  company: string;
  quote: string;
  metric: string;
  metricLabel: string;
  /** Headshot; falls back to an initials tile when absent. */
  image?: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Chen",
    title: "Founder & CEO",
    company: "Peak Digital",
    metric: "3×",
    metricLabel: "more work delivered, same team size",
    image: "/assets/testimonials/sarah-chen.jpg",
    quote:
      "We went from turning away projects to delivering three times more work without a single hire. The quality is indistinguishable from what we'd do in-house — our clients have no idea.",
  },
  {
    name: "Marcus Rodriguez",
    title: "Managing Partner",
    company: "Velocity Marketing",
    metric: "10 days",
    metricLabel: "vs the 4-week timeline we quoted",
    image: "/assets/testimonials/marcus-rodriguez.jpg",
    quote:
      "We quoted a client four weeks. growX had it done in ten days. Our client thought we had a fifty-person team running it. That's the kind of leverage this gives you.",
  },
  {
    name: "Emily Thompson",
    title: "Agency Owner",
    company: "Bright Strategy",
    metric: "47",
    metricLabel: "projects delivered, zero quality complaints",
    image: "/assets/testimonials/emily-thompson.jpg",
    quote:
      "I was skeptical about quality at first. Forty-seven projects later, I trust growX with our most demanding clients. The work is exceptional, every single time.",
  },
  {
    name: "David Lee",
    title: "Creative Director",
    company: "Next Wave Creative",
    metric: "100%",
    metricLabel: "white-label — clients never knew",
    image: "/assets/testimonials/david-lee.jpg",
    quote:
      "Completely seamless — our clients have no idea. The handoff is smooth, communication is clear, and every project comes back exactly as scoped. They feel like an extension of our team.",
  },
];

// Calm fallback tones, keyed by index, for when a headshot is missing.
const TONES = [
  "from-emerald-100 to-emerald-200 text-emerald-800",
  "from-slate-100 to-slate-200 text-slate-700",
  "from-stone-100 to-stone-200 text-stone-700",
  "from-zinc-100 to-zinc-200 text-zinc-700",
  "from-sky-100 to-sky-200 text-sky-800",
  "from-amber-100 to-amber-200 text-amber-800",
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

const ROTATE_MS = 1500;

export default function TestimonialSpotlight() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const id = setInterval(() => setActive((a) => (a + 1) % count), ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, count]);

  const current = TESTIMONIALS[active];

  return (
    <section
      id="gw-mod-testimonials"
      aria-labelledby="testimonials-headline"
      className="relative isolate overflow-hidden border-b border-border bg-background py-16 sm:py-20 lg:py-24"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Soft brand wash behind the row of faces. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(55%_80%_at_50%_0%,var(--brand-soft),transparent_70%)]"
      />

      <div className="container-1200 flex flex-col items-center text-center">
        {/* ── Row of personal images (1px border, 20px gap) ── */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          {TESTIMONIALS.map((person, i) => {
            const isActive = i === active;
            return (
              <button
                key={person.name}
                type="button"
                aria-label={`Show testimonial from ${person.name}`}
                aria-pressed={isActive}
                onClick={() => setActive(i)}
                className={`aspect-3/4 w-16 shrink-0 overflow-hidden rounded-xl border transition-all duration-300 ease-out sm:w-24 lg:w-28 ${
                  isActive
                    ? "scale-105 border-brand opacity-100 shadow-lg shadow-brand/20"
                    : "border-border opacity-60 hover:-translate-y-0.5 hover:opacity-100"
                }`}
              >
                {person.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={person.image}
                    alt={person.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span
                    className={`flex h-full w-full items-center justify-center bg-linear-to-br ${
                      TONES[i % TONES.length]
                    } text-lg font-bold`}
                  >
                    {initials(person.name)}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Copy ── */}
        <span className="badge mt-12">Testimonials</span>
        <h2
          id="testimonials-headline"
          className="mt-5 text-balance text-4xl font-bold tracking-tight sm:text-5xl"
        >
          Trusted by leaders
          <br />
          <span className="text-foreground/40">from various industries</span>
        </h2>

        {/* Quote for the person in focus. Snappy fade so the text tracks the
            highlighted face on the fast 1.5s cycle. */}
        <div className="mt-7 flex min-h-52 max-w-2xl items-start justify-center sm:min-h-48">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <p className="text-pretty text-lg font-medium leading-relaxed text-foreground sm:text-xl">
                &ldquo;{current.quote}&rdquo;
              </p>
              <footer className="mt-6">
                <div className="text-base font-semibold text-foreground">{current.name}</div>
                <div className="text-sm text-muted">
                  {current.title} · {current.company}
                </div>
                <div className="mt-3 text-sm text-muted">
                  <span className="text-lg font-bold text-brand">{current.metric}</span>{" "}
                  {current.metricLabel}
                </div>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Progress dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-brand" : "w-2 bg-border hover:bg-foreground/30"
              }`}
            />
          ))}
        </div>

        <div className="mt-8">
          <Link href="/works" className="btn btn-primary group">
            Read Success Stories
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
