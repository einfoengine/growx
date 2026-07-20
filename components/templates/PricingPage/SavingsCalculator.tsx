"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Eyebrow from "@/components/elements/Eyebrow";
import {
  TIERS,
  breakEven,
  netEffect,
  recommendedTier,
} from "@/lib/config/pricing";

const MAX_SPEND = 15000;
const STEP = 250;
const DEFAULT_SPEND = 3000; // just above Standard's break-even, so it opens on a win

function usd(n: number): string {
  return `$${Math.abs(Math.round(n)).toLocaleString("en-US")}`;
}

/** The most persuasive element on the page: a spend slider that shows a paid
 *  membership turning into free money at everyday agency volume. It never
 *  pushes a tier; the numbers recommend one. All math comes from the shared
 *  pricing config, so it can never drift from the tier cards. */
export default function SavingsCalculator() {
  const [spend, setSpend] = useState(DEFAULT_SPEND);

  const rec = recommendedTier(spend);
  const stdSaves = spend * TIERS.standard.discount;
  const stdNet = netEffect(spend, "standard");
  const vipSaves = spend * TIERS.vip.discount;
  const vipNet = netEffect(spend, "vip");
  const showVip = spend >= breakEven("vip");

  const verdict =
    rec === "free"
      ? "At this spend, Free is the right home. Upgrade the moment you scale."
      : rec === "standard"
        ? "At this volume, Standard already pays for itself."
        : "Standard pays you back here, and VIP now funds itself too. Worth it when you want us running client comms.";

  const recTier = TIERS[rec];

  return (
    <section id="gw-pricing-calculator" className="relative isolate bg-surface">
      <div className="container-1200 py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow text="Membership math" />
          <h2 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
            See when a membership pays for itself.
          </h2>
          <p className="mt-5 text-base text-muted sm:text-lg">
            Slide to your monthly service spend with growX. The discount is
            standing, so a paid tier starts funding itself the moment you order
            regularly.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-foreground text-background shadow-2xl shadow-black/30">
          <div className="p-7 sm:p-9">
            {/* Slider */}
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-white/60">Monthly service spend</span>
              <span className="font-mono text-2xl font-bold tracking-tight sm:text-3xl">
                {usd(spend)}
                {spend >= MAX_SPEND && "+"}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={MAX_SPEND}
              step={STEP}
              value={spend}
              onChange={(e) => setSpend(Number(e.target.value))}
              aria-label="Monthly service spend with growX"
              className="mt-4 w-full accent-brand"
            />
            <div className="mt-1 flex justify-between font-mono text-[11px] text-white/40">
              <span>$0</span>
              <span>{usd(MAX_SPEND)}+</span>
            </div>

            {/* Standard breakdown */}
            <div className="mt-8 space-y-px overflow-hidden rounded-xl border border-white/10">
              <Row label="Standard saves you (10% back)" value={usd(stdSaves)} good />
              <Row label="Standard membership" value={usd(TIERS.standard.fee)} />
              <Row
                label="Net effect"
                value={
                  stdNet <= 0
                    ? `You keep ${usd(stdNet)} a month`
                    : `Costs ${usd(stdNet)} a month`
                }
                emphasis
                good={stdNet <= 0}
              />
            </div>

            {/* VIP surfaces once it funds itself */}
            {showVip && (
              <div className="mt-3 space-y-px overflow-hidden rounded-xl border border-brand/25 bg-brand/5">
                <Row label="VIP saves you (15% back)" value={usd(vipSaves)} good />
                <Row
                  label="VIP membership"
                  value={usd(TIERS.vip.fee)}
                  sub="Adds a white-label client PM who talks to your clients as you"
                />
                <Row
                  label="Net effect"
                  value={
                    vipNet <= 0
                      ? `You keep ${usd(vipNet)} a month`
                      : `Costs ${usd(vipNet)} a month`
                  }
                  emphasis
                  good={vipNet <= 0}
                />
              </div>
            )}

            {/* Verdict */}
            <div className="mt-7 rounded-xl bg-white/5 p-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-brand">
                The math points to {recTier.name}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-white/80">
                {verdict}
              </p>
              <Link
                href={rec === "free" ? "#onboard-free" : `#onboard-${rec}`}
                className="btn btn-brand mt-5 inline-flex"
              >
                {rec === "free" ? "Join free" : `Choose ${recTier.name}`}
                <ArrowRight size={16} className="ml-1.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs leading-relaxed text-muted">
          Break-even is {usd(breakEven("standard"))} a month of spend for
          Standard and {usd(breakEven("vip"))} for VIP. Membership buys the team
          and the discount; the work is ordered per project at fixed prices.
        </p>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  sub,
  good = false,
  emphasis = false,
}: {
  label: string;
  value: string;
  sub?: string;
  good?: boolean;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`flex items-start justify-between gap-4 px-4 py-3 ${
        emphasis ? "bg-white/5" : ""
      }`}
    >
      <span className="text-sm text-white/70">
        {label}
        {sub && <span className="mt-0.5 block text-xs text-white/45">{sub}</span>}
      </span>
      <span
        className={`shrink-0 text-right font-mono text-sm font-semibold ${
          good ? "text-brand" : emphasis ? "text-background" : "text-white/80"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
