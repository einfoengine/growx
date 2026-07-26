"use client";

import { useEffect, useState, type ReactNode } from "react";
import { PhoneCall, Tag, Cog, Send, type LucideIcon } from "lucide-react";
import type { ProcessContent } from "@/lib/content";
import ModuleTitle from "@/components/elements/ModuleTitle";
import SectionTitle from "@/components/modules/SectionTitle/SectionTitle";
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
export default function ProcessJourneyClient({
  data,
  moduleTitle,
  title,
}: {
  data: ProcessContent;
  moduleTitle?: string;
  title?: ReactNode;
}) {
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
      className="relative border-b border-border bg-surface text-foreground gw-section"
    >
      <div className="container-1200">
        {title ?? (
          <SectionTitle
            id="gw-mod-process-journey-title"
            eyebrow={data.eyebrow}
            headline={data.headline.parts}
            sub={data.sub}
            align="left"
          />
        )}

        {moduleTitle && <ModuleTitle id="gw-process-journey-module-title">{moduleTitle}</ModuleTitle>}
        {/* ── Steps left, illustration right — top-aligned to each other ── */}
        <div className="mt-0 grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
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
            {/* Crossfading illustration layers, clear of the label zone. Each
                layer holds the art inside a framed WELL — bordered box with the
                grid ground and brand wash (GrowthPillars signature), the
                animated art painting over it. */}
            {STEP_ART.map((art, i) => (
              <div
                key={i}
                aria-hidden="true"
                className={`absolute inset-x-0 top-0 bottom-20 p-5 transition-opacity duration-700 ease-in-out sm:p-7 ${
                  i === activeArt ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="relative h-full w-full overflow-hidden rounded-xl border border-border bg-surface">
                  {/* Grid ground. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(10,10,10,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.05)_1px,transparent_1px)] bg-size-[22px_22px]"
                  />
                  {/* Brand wash behind the subject. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-16 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-(--brand-soft) blur-3xl"
                  />
                  <div className="absolute inset-0 p-5 sm:p-6">{art}</div>
                </div>
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
