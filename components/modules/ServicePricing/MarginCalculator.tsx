"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { PricingServiceConfig } from "@/lib/content";

function usd(n: number): string {
  return `$${Math.round(n).toLocaleString("en-US")}`;
}

/** Shows a duration's price effect against the base rate: "+25%", "base",
 *  "−10%". */
function multiplierLabel(m: number): string {
  if (m === 1) return "base rate";
  const pct = Math.round(Math.abs(m - 1) * 100);
  return m > 1 ? `+${pct}%` : `−${pct}%`;
}

type Props = {
  config: PricingServiceConfig;
  markupOptions: number[];
  defaultMarkup: number;
};

/** The reseller's margin, made concrete: pick a project size, a timeline, and
 *  the markup you'd charge — see your cost, your invoice, and what you keep.
 *  All math runs client-side from the shared pricing config (the same entry
 *  the pricing page and checkout use), so the numbers can never drift. */
export default function MarginCalculator({ config, markupOptions, defaultMarkup }: Props) {
  // Retainer services ($/unit per month) speak in MRR; one-off in project totals.
  const monthly = config.billing === "monthly";
  const per = monthly ? "/mo" : "";
  const defaultDuration =
    config.durations.find((d) => d.multiplier === 1) ?? config.durations[0];

  // Default to the range midpoint (capped at 5): a representative project, not
  // the maximum — opening on the top price reads like a hard sell. Snapped to
  // the qty step grid so the default is always a value the slider can hold.
  const rawDefault = Math.min(
    5,
    Math.max(config.minQty, Math.round((config.minQty + config.maxQty) / 2))
  );
  const [qty, setQty] = useState(
    Math.min(
      config.maxQty,
      config.minQty +
        Math.round((rawDefault - config.minQty) / config.qtyStep) * config.qtyStep
    )
  );
  const [durationId, setDurationId] = useState(defaultDuration.id);
  const [markup, setMarkup] = useState(defaultMarkup);

  const duration =
    config.durations.find((d) => d.id === durationId) ?? defaultDuration;

  const { cost, charge, profit, marginPct } = useMemo(() => {
    const cost = qty * config.unitPrice * duration.multiplier;
    const charge = cost * markup;
    const profit = charge - cost;
    return { cost, charge, profit, marginPct: Math.round((profit / charge) * 100) };
  }, [qty, config.unitPrice, duration.multiplier, markup]);

  return (
    <div id="gw-margin-calculator" className="rounded-xl border border-border bg-surface p-6 sm:p-8">
      {/* 1 — project size */}
      <div>
        <div className="flex items-baseline justify-between">
          <label
            htmlFor="margin-calc-pages"
            className="font-label text-xs font-semibold uppercase tracking-widest text-muted"
          >
            1. {monthly ? "Retainer size" : "Project size"}
          </label>
          <span className="font-mono text-sm font-bold text-foreground">
            {qty} {config.unit}
            {qty === 1 ? "" : "s"}
          </span>
        </div>
        <input
          id="margin-calc-pages"
          type="range"
          min={config.minQty}
          max={config.maxQty}
          step={config.qtyStep}
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="mt-3 w-full accent-brand"
        />
        <div className="mt-1 flex justify-between font-mono text-[11px] text-muted">
          <span>{config.minQty} min</span>
          <span>{config.maxQty} max</span>
        </div>
      </div>

      {/* 2 — timeline */}
      <div className="mt-6">
        <p className="font-label text-xs font-semibold uppercase tracking-widest text-muted">
          2. {monthly ? "Commitment" : "Timeline"}
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {config.durations.map((d) => {
            const on = d.id === durationId;
            return (
              <button
                key={d.id}
                type="button"
                aria-pressed={on}
                onClick={() => setDurationId(d.id)}
                className={`rounded-lg border px-3 py-2.5 text-left transition-colors ${
                  on
                    ? "border-brand bg-brand/5"
                    : "border-border hover:border-foreground/20"
                }`}
              >
                <span className="block text-xs font-semibold text-foreground">
                  {d.label}
                </span>
                <span className="mt-0.5 block font-mono text-[11px] text-muted">
                  {multiplierLabel(d.multiplier)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3 — your markup */}
      <div className="mt-6">
        <p className="font-label text-xs font-semibold uppercase tracking-widest text-muted">
          3. Your markup
        </p>
        <div className="mt-3 flex gap-2">
          {markupOptions.map((m) => {
            const on = m === markup;
            return (
              <button
                key={m}
                type="button"
                aria-pressed={on}
                onClick={() => setMarkup(m)}
                className={`flex-1 rounded-lg border px-3 py-2.5 font-mono text-sm font-bold transition-colors ${
                  on
                    ? "border-transparent bg-gradient-brand text-black"
                    : "border-border text-foreground/80 hover:border-foreground/20"
                }`}
              >
                {m}×
              </button>
            );
          })}
        </div>
      </div>

      {/* Verdict — dark card, deliberately the loudest thing in the section. */}
      <div className="mt-7 rounded-xl bg-foreground p-6 text-background sm:p-7">
        <dl className="space-y-2.5">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-sm text-white/60">Your cost (from us)</dt>
            <dd className="font-mono text-base font-bold">
              {usd(cost)}
              {per}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-sm text-white/60">
              You invoice your client ({markup}×)
            </dt>
            <dd className="font-mono text-base font-bold">
              {usd(charge)}
              {per}
            </dd>
          </div>
          <div className="mt-1 flex items-baseline justify-between gap-4 border-t border-white/10 pt-3.5">
            <dt className="text-sm font-semibold text-white">You keep</dt>
            <dd className="text-right">
              <span className="font-mono text-3xl font-bold tracking-tight text-gradient-brand sm:text-4xl">
                {usd(profit)}
                {per}
              </span>
              <span className="mt-0.5 block font-mono text-[11px] text-white/50">
                {monthly
                  ? `${marginPct}% margin, recurring every month`
                  : `${marginPct}% margin, one project`}
              </span>
            </dd>
          </div>
        </dl>

        <a
          href="#book"
          className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-black transition-[filter] hover:brightness-110"
        >
          Lock this margin — book the call
          <ArrowRight
            size={15}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-0.5"
          />
        </a>
        <p className="mt-3 text-center text-[11px] leading-relaxed text-white/45">
          Illustration at your chosen markup — what you charge is entirely your
          call. Figures confirmed in the portal before you pay.
        </p>
      </div>
    </div>
  );
}
