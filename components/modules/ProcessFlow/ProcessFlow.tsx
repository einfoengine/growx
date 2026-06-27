"use client";

import type React from "react";
import { motion } from "framer-motion";
import { ClipboardList, PhoneCall, Rocket } from "lucide-react";
import type { ComponentType } from "react";
import SectionHeader from "@/components/elements/SectionHeader";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";

const DARK_TOKENS = {
  "--background": "#070707",
  "--foreground": "#fafafa",
  "--muted": "#a1a1aa",
  "--border": "rgba(255,255,255,0.12)",
  "--surface": "#121212",
} as React.CSSProperties;

type IconProps = { size?: number; className?: string; strokeWidth?: number };

const STEPS: {
  n: string;
  title: string;
  desc: string;
  Icon: ComponentType<IconProps>;
}[] = [
  {
    n: "01",
    title: "Place your order",
    desc: "Choose a service and send your brief. Flat, transparent pricing from day one — no surprises.",
    Icon: ClipboardList,
  },
  {
    n: "02",
    title: "Engage in a discovery call",
    desc: "We align on scope, timeline, and your client's goals on a quick kickoff call before anything ships.",
    Icon: PhoneCall,
  },
  {
    n: "03",
    title: "We deliver, you stay in front",
    desc: "Keep every client project moving — delivered under your brand by your trusted white-label partner.",
    Icon: Rocket,
  },
];

/** Neutral line-icon "sticker" — a dark chip that punches cleanly through the
 *  dotted wire behind it. */
function Node({ Icon }: { Icon: ComponentType<IconProps> }) {
  return (
    <span className="relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-background text-white shadow-lg shadow-black/40 ring-8 ring-background">
      <Icon size={26} strokeWidth={1.5} />
    </span>
  );
}

/** Marching dotted line — dots flow along the path to convey forward motion. */
const DOTTED = {
  strokeDasharray: "1 13",
  strokeLinecap: "round" as const,
};
const MARCH = {
  strokeDashoffset: [0, -14],
  transition: { repeat: Infinity, ease: "linear" as const, duration: 1.1 },
};

export default function ProcessFlow() {
  return (
    <section
      id="gw-mod-process-flow"
      aria-labelledby="process-flow-headline"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-background py-24 text-foreground sm:py-28 lg:py-32"
      style={DARK_TOKENS}
    >
      {/* Brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-brand/10 blur-[120px]"
      />

      <div className="container-1200">
        <ScrollFadeIn delay={0.1}>
          <SectionHeader
            eyebrow="How it works"
            headline={[
              { type: "text", value: "From order to delivery in " },
              { type: "highlight", value: "three steps" },
            ]}
            headlineId="process-flow-headline"
            headlineClassName="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            sub="A simple, repeatable flow that keeps your clients moving — and your brand out front."
            subClassName="mx-auto mt-4 max-w-xl text-base text-white/60 sm:text-lg"
            align="center"
          />
        </ScrollFadeIn>

        {/* ── Desktop: wired flowchart ─────────────────────────────────────── */}
        <div className="mt-20 hidden lg:block">
          {/* Dotted wire layer + node row */}
          <div className="relative h-40">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 1000 160"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="wireGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
              </defs>

              {[
                "M 166 80 C 300 20, 366 140, 500 80",
                "M 500 80 C 634 20, 700 140, 834 80",
              ].map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="url(#wireGrad)"
                  strokeWidth={2.5}
                  {...DOTTED}
                  animate={MARCH}
                />
              ))}
            </svg>

            <div className="relative grid h-full grid-cols-3 items-center">
              {STEPS.map((step) => (
                <div key={step.n} className="flex justify-center">
                  <Node Icon={step.Icon} />
                </div>
              ))}
            </div>
          </div>

          {/* Text row */}
          <div className="mt-10 grid grid-cols-3 gap-10">
            {STEPS.map((step, i) => (
              <ScrollFadeIn key={step.n} delay={0.15 + i * 0.1}>
                <div className="text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                    Step {step.n}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-white/60">
                    {step.desc}
                  </p>
                </div>
              </ScrollFadeIn>
            ))}
          </div>
        </div>

        {/* ── Mobile: vertical stack ───────────────────────────────────────── */}
        <div className="relative mt-14 space-y-8 lg:hidden">
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-8 top-8 z-0 border-l-2 border-dotted border-brand/35"
          />
          {STEPS.map((step) => (
            <ScrollFadeIn key={step.n}>
              <div className="relative flex gap-5">
                <Node Icon={step.Icon} />
                <div className="pt-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                    Step {step.n}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                    {step.desc}
                  </p>
                </div>
              </div>
            </ScrollFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
