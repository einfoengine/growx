import type React from "react";
import { Quote, Star } from "lucide-react";
import SectionHeader from "@/components/elements/SectionHeader";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import { getTestimonials } from "@/lib/content";
import type { Testimonial } from "@/lib/content";

const DARK_TOKENS = {
  "--background": "#070707",
  "--foreground": "#fafafa",
  "--muted": "#a1a1aa",
  "--border": "rgba(255,255,255,0.12)",
  "--surface": "#121212",
} as React.CSSProperties;

function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} fill="currentColor" strokeWidth={0} className="text-brand" />
      ))}
    </div>
  );
}

function Avatar({ name, dark }: { name: string; dark?: boolean }) {
  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
        dark ? "bg-brand/20" : "bg-brand/10"
      }`}
    >
      <span className={`text-xs font-bold ${dark ? "text-brand" : "text-brand"}`}>
        {name[0]}
      </span>
    </div>
  );
}

function FeaturedCard({ t }: { t: Testimonial }) {
  return (
    <div
      id={t.id}
      className="h-full relative flex flex-col rounded-2xl border border-border bg-surface p-8"
    >
      {/* Decorative grid overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[32px_32px]"
      />

      {/* Metric */}
      {t.metric && (
        <div id={`${t.id}-metric`}>
          <span className="text-6xl font-bold tracking-tight text-brand">
            {t.metric}
          </span>
          {t.metricLabel && (
            <p className="mt-1 text-xs text-white/50">{t.metricLabel}</p>
          )}
        </div>
      )}

      {/* Quote */}
      <Quote size={32} className="mt-6 text-white/10" aria-hidden="true" />
      <p
        id={`${t.id}-quote`}
        className="mt-3 flex-1 text-base leading-relaxed text-white/85"
      >
        {t.quote}
      </p>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
        <div className="flex items-center gap-3">
          <Avatar name={t.name} dark />
          <div>
            <p className="text-sm font-semibold text-white">{t.name}</p>
            <p className="text-xs text-white/50">
              {t.title} · {t.company}
            </p>
          </div>
        </div>
        <Stars />
      </div>
    </div>
  );
}

function RegularCard({ t, wide }: { t: Testimonial; wide?: boolean }) {
  return (
    <div
      id={t.id}
      className={`h-full flex flex-col rounded-2xl border border-border bg-surface p-8`}
    >
      {/* Metric */}
      {t.metric && (
        <div id={`${t.id}-metric`}>
          <span className="text-5xl font-bold tracking-tight text-brand">
            {t.metric}
          </span>
          {t.metricLabel && (
            <p className="mt-1 text-xs text-muted">{t.metricLabel}</p>
          )}
        </div>
      )}

      {/* Quote */}
      <Quote size={24} className="mt-5 text-brand/20" aria-hidden="true" />
      <p
        id={`${t.id}-quote`}
        className="mt-2 flex-1 text-sm leading-relaxed text-foreground/80"
      >
        {t.quote}
      </p>

      {/* Footer */}
      <div className="mt-6 border-t border-border pt-5">
        <Stars />
        <div className="mt-3 flex items-center gap-3">
          <Avatar name={t.name} />
          <div>
            <p className="text-sm font-semibold text-foreground">{t.name}</p>
            <p className="text-xs text-muted">
              {t.title} · {t.company}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function Testimonials() {
  const data = await getTestimonials();
  const [t1, t2, t3, t4] = data.testimonials;

  return (
    <section
      id={`gw-${data.id}`}
      aria-labelledby={`${data.id}-headline`}
      data-nav-theme="dark"
      className="relative bg-background text-foreground"
      style={DARK_TOKENS}
    >
      {/* Subtle brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-linear-to-t from-brand/5 to-transparent"
      />

      <div className="container-1200 py-24 sm:py-32 lg:py-40">
        {/* Header - left-aligned with split layout */}
        <ScrollFadeIn delay={0.1}>
          <div
            id={`${data.id}-header`}
            className="grid gap-6 lg:grid-cols-2 lg:items-end"
          >
            <SectionHeader
              eyebrow={data.eyebrow}
              headline={data.headline.parts}
              headlineId={`${data.id}-headline`}
              headlineClassName="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
              highlightClassName="bg-gradient-to-br from-brand to-[#059669] bg-clip-text text-transparent"
              underlineHighlight={false}
            />
            <p className="text-base text-muted lg:max-w-sm">
              {data.sub}
            </p>
          </div>
        </ScrollFadeIn>

        {/* Bento grid - zigzag on desktop */}
        <div
          id={`${data.id}-grid`}
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {t1 && <ScrollFadeIn delay={0.2} className="lg:col-span-2"><FeaturedCard t={t1} /></ScrollFadeIn>}
          {t2 && <ScrollFadeIn delay={0.3}><RegularCard t={t2} /></ScrollFadeIn>}
          {t3 && <ScrollFadeIn delay={0.4}><RegularCard t={t3} /></ScrollFadeIn>}
          {t4 && <ScrollFadeIn delay={0.5} className="lg:col-span-2"><RegularCard t={t4} wide /></ScrollFadeIn>}
        </div>
      </div>
    </section>
  );
}
