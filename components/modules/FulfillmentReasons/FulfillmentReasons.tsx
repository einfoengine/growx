"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import Eyebrow from "@/components/elements/Eyebrow";
import MagneticTiltCard from "@/components/modules/Services/MagneticTiltCard";

/** Cursor-following emerald spotlight: the card tracks the pointer via CSS
 *  vars, and a radial glow rides them (revealed by group-hover). */
function setSpotlight(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--sx", `${e.clientX - r.left}px`);
  el.style.setProperty("--sy", `${e.clientY - r.top}px`);
}

/** The four ceilings fulfillment puts on an agency, each told as the solution:
 *  what growX takes off the founder's plate and what that buys them.
 *
 *  Creative treatment: a bento grid (wide, narrow / narrow, wide) on Deep
 *  Pine, and self-drawing line art. Each illustration sketches its white
 *  "problem" strokes first, then the emerald "growX" strokes complete the
 *  picture as the card scrolls into view, so the drawing itself performs the
 *  before-to-after turn the copy is making. */

const ART_STROKE = {
  fill: "none",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/* Stroke draw-on, staggered by a per-shape delay. Dashed shapes fade instead:
   animating pathLength overrides strokeDasharray, which would erase the dash. */
const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration: 0.6, ease: "easeInOut" },
      opacity: { delay, duration: 0.01 },
    },
  }),
};
const fade: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { delay, duration: 0.5, ease: "easeOut" },
  }),
};

/* The problem sketches in first (white), the growX answer draws second
   (emerald) — shared phase offsets keep all four cards on one rhythm. */
const PROBLEM = 0.15;
const SOLUTION = 0.75;

function ArtSvg({ children }: { children: React.ReactNode }) {
  return (
    <motion.svg
      viewBox="0 0 220 110"
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="h-20 w-full transition-[filter] duration-300 group-hover:filter-[drop-shadow(0_0_10px_rgba(16,185,129,0.45))] sm:h-24"
    >
      {children}
    </motion.svg>
  );
}

/** Rising bars breaking through a dashed ceiling. */
const CapacityArt = (
  <ArtSvg>
    <g {...ART_STROKE} className="stroke-white/35">
      <motion.line variants={draw} custom={PROBLEM} x1="24" y1="92" x2="196" y2="92" />
      <motion.line variants={draw} custom={PROBLEM + 0.1} x1="44" y1="92" x2="44" y2="72" />
      <motion.line variants={draw} custom={PROBLEM + 0.1} x1="52" y1="92" x2="52" y2="72" />
      <motion.line variants={draw} custom={PROBLEM + 0.2} x1="76" y1="92" x2="76" y2="58" />
      <motion.line variants={draw} custom={PROBLEM + 0.2} x1="84" y1="92" x2="84" y2="58" />
      <motion.line variants={draw} custom={PROBLEM + 0.3} x1="108" y1="92" x2="108" y2="44" />
      <motion.line variants={draw} custom={PROBLEM + 0.3} x1="116" y1="92" x2="116" y2="44" />
      {/* the ceiling */}
      <motion.line
        variants={fade}
        custom={PROBLEM + 0.35}
        x1="24"
        y1="34"
        x2="196"
        y2="34"
        strokeDasharray="6 6"
      />
    </g>
    {/* growX: the bar that keeps going */}
    <g {...ART_STROKE} className="stroke-brand">
      <motion.line variants={draw} custom={SOLUTION} x1="140" y1="92" x2="140" y2="20" />
      <motion.line variants={draw} custom={SOLUTION + 0.08} x1="148" y1="92" x2="148" y2="20" />
      <motion.polyline variants={draw} custom={SOLUTION + 0.2} points="40,78 72,64 104,50 168,16" />
      <motion.polyline variants={draw} custom={SOLUTION + 0.55} points="156,18 168,16 166,28" />
    </g>
  </ArtSvg>
);

/** Scattered freelancer dots converging into one accountable team. */
const OneTeamArt = (
  <ArtSvg>
    <g {...ART_STROKE} className="stroke-white/35">
      <motion.circle variants={fade} custom={PROBLEM} cx="38" cy="30" r="10" strokeDasharray="4 5" />
      <motion.circle variants={fade} custom={PROBLEM + 0.1} cx="30" cy="72" r="8" strokeDasharray="4 5" />
      <motion.circle variants={fade} custom={PROBLEM + 0.2} cx="66" cy="52" r="9" strokeDasharray="4 5" />
      <motion.circle variants={fade} custom={PROBLEM + 0.3} cx="58" cy="90" r="7" strokeDasharray="4 5" />
      <motion.line variants={draw} custom={PROBLEM + 0.35} x1="50" y1="34" x2="126" y2="50" />
      <motion.line variants={draw} custom={PROBLEM + 0.4} x1="40" y1="70" x2="126" y2="58" />
      <motion.line variants={draw} custom={PROBLEM + 0.45} x1="76" y1="54" x2="126" y2="54" />
    </g>
    <g {...ART_STROKE} className="stroke-brand">
      <motion.circle variants={draw} custom={SOLUTION} cx="156" cy="54" r="26" />
      <motion.polyline variants={draw} custom={SOLUTION + 0.35} points="144,54 152,62 168,44" />
    </g>
  </ArtSvg>
);

/** The full menu: every line item checked off. */
const FullMenuArt = (
  <ArtSvg>
    <g {...ART_STROKE} className="stroke-white/35">
      <motion.path
        variants={draw}
        custom={PROBLEM}
        d="M62 12 h96 a10 10 0 0 1 10 10 v66 a10 10 0 0 1 -10 10 h-96 a10 10 0 0 1 -10 -10 v-66 a10 10 0 0 1 10 -10 Z"
      />
      <motion.line variants={draw} custom={PROBLEM + 0.15} x1="70" y1="34" x2="122" y2="34" />
      <motion.line variants={draw} custom={PROBLEM + 0.25} x1="70" y1="55" x2="122" y2="55" />
      <motion.line variants={draw} custom={PROBLEM + 0.35} x1="70" y1="76" x2="122" y2="76" />
    </g>
    <g {...ART_STROKE} className="stroke-brand">
      <motion.polyline variants={draw} custom={SOLUTION} points="136,32 141,37 150,27" />
      <motion.polyline variants={draw} custom={SOLUTION + 0.15} points="136,53 141,58 150,48" />
      <motion.polyline variants={draw} custom={SOLUTION + 0.3} points="136,74 141,79 150,69" />
    </g>
  </ArtSvg>
);

/** The handoff: the box lifts off the founder's plate and away. */
const OffYourPlateArt = (
  <ArtSvg>
    <g {...ART_STROKE} className="stroke-white/35">
      <motion.circle variants={draw} custom={PROBLEM} cx="52" cy="38" r="12" />
      <motion.path variants={draw} custom={PROBLEM + 0.15} d="M32 92 Q32 64 52 64 Q72 64 72 92" />
      {/* the plate */}
      <motion.line variants={draw} custom={PROBLEM + 0.3} x1="92" y1="78" x2="150" y2="78" />
      <motion.path variants={draw} custom={PROBLEM + 0.4} d="M100 78 Q121 96 142 78" />
    </g>
    {/* the work, lifted off and carried away */}
    <g {...ART_STROKE} className="stroke-brand">
      <motion.path
        variants={draw}
        custom={SOLUTION}
        d="M112 64 v-14 a4 4 0 0 1 4 -4 h18 a4 4 0 0 1 4 4 v14 a4 4 0 0 1 -4 4 h-18 a4 4 0 0 1 -4 -4 Z"
      />
      <motion.polyline variants={draw} custom={SOLUTION + 0.25} points="146,50 178,28" />
      <motion.polyline variants={draw} custom={SOLUTION + 0.5} points="166,28 178,28 176,40" />
    </g>
  </ArtSvg>
);

type Solution = {
  n: string;
  /** The ceiling, phrased as the pain — rendered struck-through above the
   *  solution title, so every card performs the removal typographically. */
  pain: string;
  title: string;
  body: string;
  points: string[];
  art: React.ReactNode;
};

const SOLUTIONS: Solution[] = [
  {
    n: "01",
    pain: "Capacity caps your growth",
    title: "Capacity that scales with your sales",
    body: "You close it, we deliver it. Demand becomes your only ceiling.",
    points: [
      "Take every deal you can win",
      "No hiring to add delivery muscle",
      "Rushed work never churns a client again",
    ],
    art: CapacityArt,
  },
  {
    n: "02",
    pain: "The freelancer tax",
    title: "One team, not a freelancer patchwork",
    body: "One in-house team, running fulfillment since 2019, replaces the contractor roulette.",
    points: [
      "Fixed prices protect your margin",
      "Consistent quality and turnaround",
      "Zero hours lost managing vendors",
    ],
    art: OneTeamArt,
  },
  {
    n: "03",
    pain: "A menu you cannot fulfill",
    title: "Say yes to the whole menu",
    body: "Whatever your client asks for, you sell it and we produce it under your brand.",
    points: [
      "Never lose an account to a bigger agency",
      "Every upsell becomes revenue, not a scramble",
      "New services without learning them overnight",
    ],
    art: FullMenuArt,
  },
  {
    n: "04",
    pain: "Fulfillment eats your week",
    title: "You sell. We carry the rest.",
    body: "Sales and relationships stay yours. Production and deadlines become ours.",
    points: [
      "Your week goes to growth, not delivery",
      "A business that runs without burning you out",
      "Your client only ever sees you",
    ],
    art: OffYourPlateArt,
  },
];

export default function FulfillmentReasons() {
  return (
    <section
      id="gw-mod-fulfillment-reasons"
      aria-labelledby="fulfillment-reasons-headline"
      data-nav-theme="dark"
      // Deep Pine, the brand's dark green — the one green section on home.
      className="relative isolate overflow-clip bg-[#07533a] text-background"
    >
      {/* Living backdrop: three oversized aurora blobs drifting on their own
          clocks over the Deep Pine, so the glass cards always have motion
          behind them to refract. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="animate-aurora absolute -top-32 left-[12%] h-96 w-120 rounded-full bg-brand/25 blur-[110px]" />
        <div className="animate-aurora absolute right-[8%] top-1/4 h-80 w-96 rounded-full bg-[#6ee7b7]/15 blur-[120px] [animation-delay:-9s] [animation-duration:26s]" />
        <div className="animate-aurora absolute -bottom-24 left-1/3 h-96 w-140 rounded-full bg-[#022c22]/60 blur-[130px] [animation-delay:-16s] [animation-duration:32s]" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_70%_60%_at_50%_40%,#000,transparent_85%)]"
      />
      {/* Film grain for a cinematic finish on the green. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-film-grain opacity-30"
      />

      <div className="container-1200 py-24 sm:py-28 lg:py-32">
        <ScrollFadeIn delay={0.1}>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow text="The real bottleneck" />
            {/* Problem framing (the signature hook) followed by the one-line
                resolution turn, so nobody leaves the headline without the answer. */}
            <h2
              id="fulfillment-reasons-headline"
              className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
            >
              Fulfillment eats the founders.
            </h2>
            {/* Light mint instead of the emerald gradient: emerald-on-green
                would sink into the Deep Pine background. */}
            <p className="mt-4 text-lg font-semibold text-[#d1fae5] sm:text-xl">
              We take it off your plate and make it the reason you thrive.
            </p>
            <p className="mt-4 text-base text-white/70 sm:text-lg">
              Agencies do not fail because they cannot sell. Here is how we
              remove the four ceilings that cap how big you can get.
            </p>
          </div>
        </ScrollFadeIn>

        {/* All four at a glance: one row on desktop, 2x2 on tablet. */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {SOLUTIONS.map((s, i) => (
            <div key={s.n}>
              <ScrollFadeIn delay={0.1 + i * 0.08} className="h-full">
                <MagneticTiltCard className="h-full">
                <article
                  aria-labelledby={`fulfillment-solution-${s.n}-title`}
                  onMouseMove={setSpotlight}
                  // Glass: frosted blur over the drifting aurora, a hairline
                  // top highlight (inset shadow) and a soft drop into the green.
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/15 bg-white/8 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_40px_-12px_rgba(1,32,23,0.5)] backdrop-blur-xl transition-colors duration-300 hover:border-brand/40 hover:bg-white/12"
                >
                  {/* Cursor-following emerald spotlight. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(260px circle at var(--sx, 50%) var(--sy, 50%), rgba(16,185,129,0.16), transparent 70%)",
                    }}
                  />

                  {/* Oversized outlined numeral, a watermark not content. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-3 right-4 text-6xl font-extrabold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.14)]"
                  >
                    {s.n}
                  </span>

                  <div className="flex h-full flex-col">
                    <div>{s.art}</div>
                    <div>
                      {/* The pain, struck through as the card enters — the
                          removal happens in type before the title answers. */}
                      <p className="mt-5 font-mono text-[11px] font-semibold uppercase tracking-widest text-white/45">
                        <span className="relative inline-block">
                          {s.pain}
                          <motion.span
                            aria-hidden="true"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ delay: 0.55, duration: 0.4, ease: "easeInOut" }}
                            className="absolute inset-x-0 top-1/2 h-0.5 origin-left bg-[#d1fae5]/80"
                          />
                        </span>
                      </p>
                      <h3
                        id={`fulfillment-solution-${s.n}-title`}
                        className="mt-2 text-lg font-bold leading-snug tracking-tight sm:text-xl"
                      >
                        {s.title}
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-white/70">
                        {s.body}
                      </p>
                      <ul className="mt-4 space-y-1.5">
                        {s.points.map((point) => (
                          <li key={point} className="flex items-start gap-2 text-[13px] leading-snug">
                            <Check
                              size={15}
                              strokeWidth={3}
                              aria-hidden="true"
                              className="mt-0.5 shrink-0 text-brand"
                            />
                            <span className="text-white/80">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
                </MagneticTiltCard>
              </ScrollFadeIn>
            </div>
          ))}
        </div>

        {/* Segue into the catalog the cards just argued for. */}
        <ScrollFadeIn delay={0.2}>
          <p className="mt-10 text-center">
            <a
              href="#gw-mod-services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#d1fae5] transition-colors hover:text-white"
            >
              See everything we deliver under your brand
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </p>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
