"use client";

import { useEffect, useState } from "react";
import { PhoneCall, Tag, Cog, Send, type LucideIcon } from "lucide-react";
import type { ProcessContent } from "@/lib/content";
import SectionHeader from "@/components/elements/SectionHeader";
import { STEP_ART } from "./StepArt";

/** One line icon per step, in step order (Book a call → Order → Produce →
 *  Deliver) — cycles with modulo if the counts ever diverge. */
const STEP_ICONS: LucideIcon[] = [PhoneCall, Tag, Cog, Send];

/** Milliseconds each step stays active before auto-advancing. Must match the
 *  animate-process-progress duration in app/styles/utilities.css. */
const STEP_MS = 4600;

/** The partnership lifecycle. Header spans the top; below it, the steps sit on
 *  the left with an illustration panel on the right that is aligned to the
 *  step buttons (not the title/description). The active step auto-advances on
 *  an interval and can be jumped to by click; the panel crossfades to the
 *  matching illustration — same light, emerald-accented art language as the
 *  GrowthPillars cards. */
export default function ProcessJourneyClient({ data }: { data: ProcessContent }) {
  const steps = data.steps;
  const [active, setActive] = useState(0);

  // Auto-advance. Keyed on `active`, so a click resets the dwell timer.
  useEffect(() => {
    const id = setTimeout(() => {
      setActive((a) => (a + 1) % steps.length);
    }, STEP_MS);
    return () => clearTimeout(id);
  }, [active, steps.length]);

  const activeStep = steps[active];
  // Art layer that matches the active step (cycles if fewer arts than steps).
  const activeArt = STEP_ART.length ? active % STEP_ART.length : 0;

  return (
    <section
      id="gw-mod-process-journey"
      aria-labelledby="process-journey-headline"
      className="relative border-b border-border bg-surface py-20 text-foreground sm:py-24 lg:py-28"
    >
      <div className="container-1200">
        {/* ── Header: full width, above both columns ─────────────────── */}
        <SectionHeader
          eyebrow={data.eyebrow}
          headline={data.headline.parts}
          headlineId="process-journey-headline"
          highlightClassName="text-gradient-brand"
          sub={data.sub}
          align="left"
          maxWidth=""
          headlineClassName="mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
          subClassName="mt-5 max-w-lg text-base text-muted sm:text-lg"
        />

        {/* ── Steps left, illustration right — top-aligned to each other ── */}
        <div className="mt-10 grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <ol className="space-y-2">
            {steps.map((step, i) => {
              const on = i === active;
              const Icon = STEP_ICONS[i % STEP_ICONS.length];
              return (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={on ? "step" : undefined}
                    className={`flex w-full gap-4 rounded-xl border p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                      on
                        ? "border-brand/40 bg-background shadow-sm shadow-black/5"
                        : "border-transparent hover:bg-background/60"
                    }`}
                  >
                    {/* Black icon sticker — a line glyph for the step, brand
                        green when the step is active. */}
                    <span
                      className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-foreground transition-colors ${
                        on ? "text-brand" : "text-white"
                      }`}
                    >
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block text-base font-semibold tracking-tight transition-colors sm:text-lg ${
                          on ? "text-foreground" : "text-foreground/70"
                        }`}
                      >
                        {step.title}
                      </span>
                      <span
                        className={`mt-1 block text-sm leading-relaxed transition-colors ${
                          on ? "text-muted" : "text-muted/70"
                        }`}
                      >
                        {step.blurb}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* ── Right: the active step, illustrated ──────────────────── */}
          <div className="relative min-h-110 overflow-hidden rounded-xl border border-border bg-background lg:min-h-0">
            {/* Soft grid ground behind the art (GrowthPillars signature). */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.06)_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_75%_70%_at_50%_45%,#000,transparent_90%)]"
            />

            {/* Crossfading illustration layers, clear of the label zone. */}
            {STEP_ART.map((art, i) => (
              <div
                key={i}
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 bottom-20 p-8 transition-opacity duration-700 ease-in-out sm:p-10 ${
                  i === activeArt ? "opacity-100" : "opacity-0"
                }`}
              >
                {art}
              </div>
            ))}

            {/* The active step's label. */}
            <div className="absolute inset-x-0 bottom-0 border-t border-border bg-surface/60 p-5 backdrop-blur-sm sm:px-8">
              <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-brand-text">
                Step {activeStep.number}
              </p>
              <p className="mt-1 text-lg font-bold tracking-tight text-foreground sm:text-xl">
                {activeStep.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
