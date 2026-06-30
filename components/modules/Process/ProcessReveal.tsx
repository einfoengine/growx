"use client";

import type React from "react";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { FileText, Hammer, PackageCheck, PhoneCall } from "lucide-react";
import type { ComponentType } from "react";
import SectionHeader from "@/components/elements/SectionHeader";
import BinaryRain from "./BinaryRain";
import type { ProcessContent } from "@/lib/content";

const DARK_TOKENS = {
  "--background": "#070707",
  "--foreground": "#fafafa",
  "--muted": "#a1a1aa",
  "--border": "rgba(255,255,255,0.12)",
  "--surface": "#121212",
} as React.CSSProperties;

type Step = ProcessContent["steps"][number];
type IconProps = { size?: number; className?: string };

const ICONS: ComponentType<IconProps>[] = [
  PhoneCall,
  FileText,
  Hammer,
  PackageCheck,
];

/** A process card that fades/lifts in as the scroll crosses its threshold. */
function StepCard({
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
  const Icon = ICONS[index % ICONS.length];
  const start = index / total;
  const end = start + 0.55 / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const y = useTransform(progress, [start, end], [30, 0]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="group relative h-full overflow-hidden rounded-3xl border border-border bg-surface p-5 transition-[border-color,box-shadow] hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 sm:p-7"
    >
      {/* Watermark number */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-1 -top-5 font-mono text-7xl font-bold leading-none text-brand/10 transition-colors group-hover:text-brand/20"
      >
        {step.number}
      </span>
      <div className="relative">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand ring-1 ring-brand/15">
          <Icon size={22} />
        </span>
        <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{step.blurb}</p>
      </div>
    </motion.div>
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
      data-nav-theme="dark"
      className="relative bg-background text-foreground"
      style={{ ...DARK_TOKENS, height: `${total * 55 + 20}vh` }}
    >
      {/* Pinned viewport - cards accumulate as you scroll */}
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Binary rain background */}
        <BinaryRain />

        <div className="container-1200 relative z-10">
          <SectionHeader
            eyebrow={data.eyebrow}
            headline={data.headline.parts}
            headlineId={`${data.id}-headline`}
            sub={data.sub}
            align="center"
            headlineClassName="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            subClassName="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg"
          />

          {/* Cards */}
          <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:mt-16 lg:grid-cols-4">
            {data.steps.map((step, i) => (
              <StepCard
                key={step.id}
                step={step}
                index={i}
                total={total}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
