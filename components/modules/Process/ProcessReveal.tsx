"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import SectionHeader from "@/components/elements/SectionHeader";
import type { ProcessContent } from "@/lib/content";

type Step = ProcessContent["steps"][number];

/** One process card — fades/slides in as the scroll crosses its threshold. */
function Card({
  step,
  index,
  total,
  progress,
}: {
  step: Step;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = start + 0.6 / total;
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [48, 0]);
  const scale = useTransform(progress, [start, end], [0.96, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-6 sm:p-7"
    >
      <span
        aria-hidden="true"
        className="font-mono text-4xl font-semibold tracking-tight text-foreground/10 transition-colors group-hover:text-brand/40"
      >
        {step.number}
      </span>
      <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
        {step.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{step.blurb}</p>
      <span
        aria-hidden="true"
        className="absolute left-6 top-6 h-1 w-8 rounded-full bg-brand opacity-0 transition-opacity group-hover:opacity-100"
      />
    </motion.div>
  );
}

/** A single progress dot that fills when its card is revealed. */
function Dot({
  index,
  total,
  progress,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const width = useTransform(progress, [start, start + 0.6 / total], [10, 28]);
  const bg = useTransform(
    progress,
    [start, start + 0.6 / total],
    ["rgba(10,10,10,0.12)", "var(--brand)"],
  );
  return (
    <motion.span
      style={{ width, backgroundColor: bg }}
      className="h-1.5 rounded-full"
    />
  );
}

/** Progress dots that fill as each card is revealed. */
function Dots({
  total,
  progress,
}: {
  total: number;
  progress: MotionValue<number>;
}) {
  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <Dot key={i} index={i} total={total} progress={progress} />
      ))}
    </div>
  );
}

export default function ProcessReveal({ data }: { data: ProcessContent }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const total = data.steps.length;

  return (
    <section
      id={`gw-${data.id}`}
      aria-labelledby={`${data.id}-headline`}
      ref={ref}
      className="relative bg-background"
      style={{ height: `${total * 60 + 20}vh` }}
    >
      {/* Pinned viewport — cards accumulate as you scroll */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="container-1200">
          <SectionHeader
            eyebrow={data.eyebrow}
            headline={data.headline.parts}
            headlineId={`${data.id}-headline`}
            sub={data.sub}
            align="center"
            headlineClassName="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            subClassName="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg"
          />

          <div className="mt-12 grid grid-cols-2 gap-5 lg:mt-16 lg:grid-cols-4">
            {data.steps.map((step, i) => (
              <Card
                key={step.id}
                step={step}
                index={i}
                total={total}
                progress={scrollYProgress}
              />
            ))}
          </div>

          <Dots total={total} progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}
