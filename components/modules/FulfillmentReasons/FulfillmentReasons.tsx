"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import Eyebrow from "@/components/elements/Eyebrow";
import MagneticTiltCard from "@/components/modules/Services/MagneticTiltCard";

/** The four ceilings fulfillment puts on an agency, each told as the solution:
 *  what growX takes off the founder's plate and what that buys them.
 *
 *  Creative treatment: a bento-style row on Deep Pine. Each card leads with a
 *  vibrant 3D image that carries its idea in full colour (no overlay), with the
 *  copy resolving the pain into the growX answer on the glass panel below —
 *  capacity breaking the ceiling, the freelancer patchwork unifying into one
 *  team, the full service menu, the founder's plate cleared. */

type Solution = {
  n: string;
  /** The ceiling, phrased as the pain — rendered struck-through above the
   *  solution title, so every card performs the removal typographically. */
  pain: string;
  title: string;
  body: string;
  points: string[];
  /** Vibrant 3D image that represents the card's idea. */
  image: string;
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
    image: "/assets/gw-mod-fulfillment-reasons/01-capacity.jpg",
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
    image: "/assets/gw-mod-fulfillment-reasons/02-one-team.jpg",
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
    image: "/assets/gw-mod-fulfillment-reasons/03-menu.jpg",
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
    image: "/assets/gw-mod-fulfillment-reasons/04-off-plate.jpg",
  },
];

export default function FulfillmentReasons() {
  return (
    <section
      id="gw-mod-fulfillment-reasons"
      aria-labelledby="fulfillment-reasons-headline"
      data-nav-theme="dark" data-dark-surface
      // Deep Pine, the brand's dark green — the one green section on home.
      className="relative isolate overflow-clip bg-[#07533a] text-background"
    >
      {/* Living backdrop: three oversized aurora blobs drifting on their own
          clocks over the Deep Pine, so the cards always have motion behind them. */}
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
                  // The image is the full-height card background; the copy sits
                  // over it, with a gradient only in the lower area for legibility.
                  className="group relative flex h-full min-h-112 flex-col justify-end overflow-hidden rounded-3xl border border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_40px_-12px_rgba(1,32,23,0.5)] transition-colors duration-300 hover:border-brand/40"
                >
                  {/* Full-bleed image — fills the whole card. */}
                  <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 288px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Legibility gradient — sits under the copy in the image's
                      empty lower zone, clearing early so the subject up top
                      stays fully vibrant. */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.38)_44%,transparent_72%)]"
                  />

                  {/* Step badge, top-left. */}
                  <span className="absolute left-4 top-4 rounded-full bg-black/45 px-2.5 py-1 font-mono text-[11px] font-bold text-brand ring-1 ring-white/15 backdrop-blur">
                    {s.n}
                  </span>

                  {/* Copy over the image. */}
                  <div className="relative p-6 [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">
                    {/* The pain, struck through as the card enters — the
                        removal happens in type before the title answers. */}
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-white/65">
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
                    <p className="mt-2.5 text-sm leading-relaxed text-white/85">
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
                          <span className="text-white/90">{point}</span>
                        </li>
                      ))}
                    </ul>
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
