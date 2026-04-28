"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Headline from "@/components/elements/Headline";
import type { GrowthCalculatorContent } from "@/lib/content/types";

type GrowthCalculatorProps = {
  data: GrowthCalculatorContent;
};

export default function GrowthCalculatorClient({ data }: GrowthCalculatorProps) {
  const [monthlyTraffic, setMonthlyTraffic] = useState(10000);
  const [conversionRate, setConversionRate] = useState(2);
  const [avgOrderValue, setAvgOrderValue] = useState(500);
  const calculatorRef = useRef<HTMLDivElement>(null);

  const currentRevenue = (monthlyTraffic * conversionRate) / 100 * avgOrderValue;
  const projectedRevenue = currentRevenue * 2.5; // 2.5x growth with Scalify
  const additionalRevenue = projectedRevenue - currentRevenue;
  const annualAdditional = additionalRevenue * 12;

  return (
    <section
      id={data.id}
      aria-labelledby={`${data.id}-headline`}
      className="relative isolate overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(10,10,10,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.05)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_80%_70%_at_50%_30%,#000_20%,transparent_85%)]" />

      <div className="container-1200 relative py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-brand">{data.eyebrow}</p>
          <Headline
            id={`${data.id}-headline`}
            parts={data.headline.parts}
            as="h2"
            className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl"
            highlightClassName="bg-gradient-to-br from-brand to-[#059669] bg-clip-text text-transparent"
            underlineHighlight={false}
          />
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted">{data.sub}</p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted">{data.description}</p>
        </div>

        <div
          ref={calculatorRef}
          className="mx-auto mt-16 max-w-2xl rounded-2xl border border-border bg-background/70 p-8 backdrop-blur-sm"
        >
          <div className="space-y-8">
            {/* Monthly Traffic */}
            <div>
              <label className="block text-sm font-semibold text-foreground">Monthly Visitors</label>
              <p className="mt-1 text-2xl font-bold text-brand">{monthlyTraffic.toLocaleString()}</p>
              <input
                type="range"
                min="1000"
                max="100000"
                step="5000"
                value={monthlyTraffic}
                onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
                className="mt-3 w-full accent-brand"
              />
              <p className="mt-2 text-xs text-muted">1K — 100K visitors/month</p>
            </div>

            {/* Conversion Rate */}
            <div>
              <label className="block text-sm font-semibold text-foreground">Current Conversion Rate</label>
              <p className="mt-1 text-2xl font-bold text-brand">{conversionRate.toFixed(1)}%</p>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.5"
                value={conversionRate}
                onChange={(e) => setConversionRate(Number(e.target.value))}
                className="mt-3 w-full accent-brand"
              />
              <p className="mt-2 text-xs text-muted">0.5% — 10%</p>
            </div>

            {/* Average Order Value */}
            <div>
              <label className="block text-sm font-semibold text-foreground">Average Order Value</label>
              <p className="mt-1 text-2xl font-bold text-brand">${avgOrderValue.toLocaleString()}</p>
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={avgOrderValue}
                onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                className="mt-3 w-full accent-brand"
              />
              <p className="mt-2 text-xs text-muted">$50 — $5,000</p>
            </div>

            {/* Results */}
            <div className="border-t border-border pt-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="rounded-xl border border-border/50 bg-background/50 p-4">
                  <p className="text-xs font-medium text-muted">Current Monthly Revenue</p>
                  <p className="mt-2 text-2xl font-bold text-foreground">
                    ${currentRevenue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="rounded-xl border border-brand/30 bg-brand/5 p-4">
                  <p className="text-xs font-medium text-brand">Projected with Scalify</p>
                  <p className="mt-2 text-2xl font-bold text-brand">
                    ${projectedRevenue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border-2 border-brand/30 bg-brand/8 p-6 text-center">
                <p className="text-sm text-muted">Additional Annual Revenue</p>
                <p className="mt-2 text-4xl font-bold text-brand">
                  ${annualAdditional.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </p>
                <p className="mt-1 text-xs text-muted">From scaling delivery with Scalify</p>
              </div>
            </div>
          </div>

          <Link
            href={data.cta.href}
            className="mt-8 block w-full rounded-full bg-brand py-3 text-center text-sm font-medium text-background transition hover:bg-brand/90"
          >
            {data.cta.label}
          </Link>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-muted">
          *Projections based on historical data of agencies scaling with Scalify. Actual results may vary.
        </p>
      </div>
    </section>
  );
}
