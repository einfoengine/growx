import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Headline from "@/components/elements/Headline";
import { getHero } from "@/lib/content";

export default async function Hero() {
  const data = await getHero("home");

  return (
    <section
      id={data.id}
      aria-labelledby={`${data.id}-headline`}
      className="relative isolate overflow-hidden bg-background"
    >
      {/* Dot grid */}
      <div
        id={`${data.id}-bg-grid`}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(10,10,10,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.05)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_80%_70%_at_50%_30%,#000_20%,transparent_85%)]"
      />
      {/* Top-center brand glow — "lit from above" */}
      <div
        id={`${data.id}-bg-blob-top`}
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 left-1/2 -top-24 h-96 w-190 -translate-x-1/2 rounded-full bg-brand/8 blur-[90px]"
      />
      {/* Bottom-right accent */}
      <div
        id={`${data.id}-bg-blob-brand`}
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 -right-40 -bottom-48 h-130 w-130 rounded-full bg-(--brand-soft) blur-[130px]"
      />

      {/* Floating side cards — xl+ only */}
      <div
        id={`${data.id}-float-left`}
        aria-hidden="true"
        className="absolute left-8 top-1/2 hidden -translate-y-1/2 flex-col gap-3 rounded-2xl border border-border bg-background/85 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)] backdrop-blur-md xl:flex"
        style={{ width: "176px" }}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--brand-soft)">
          <span className="text-sm font-bold text-brand">24h</span>
        </div>
        <div>
          <p className="text-xs font-semibold text-foreground">Proposal turnaround</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted">
            Scoped and priced in your inbox within one business day.
          </p>
        </div>
        <div className="h-px w-full bg-border" />
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          <span className="text-[11px] text-muted">No templates. No fluff.</span>
        </div>
      </div>

      <div
        id={`${data.id}-float-right`}
        aria-hidden="true"
        className="absolute right-8 top-2/5 hidden flex-col gap-3 rounded-2xl border border-border bg-background/85 p-5 shadow-[0_4px_24px_rgba(0,0,0,0.07)] backdrop-blur-md xl:flex"
        style={{ width: "176px" }}
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
          </span>
          <span className="text-xs font-semibold text-foreground">Onboarding open</span>
        </div>
        <p className="text-[11px] leading-relaxed text-muted">
          White-label or branded delivery — your call.
        </p>
        <div className="flex flex-wrap gap-1">
          {["US", "CA", "UK", "AU"].map((m) => (
            <span
              key={m}
              className="rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium text-foreground"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      <div className="container-1200 relative pt-24 pb-24 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-36">
        <div className="mx-auto max-w-3xl text-center">

          {/* Eyebrow */}
          <Link
            id={`${data.id}-eyebrow`}
            href={data.eyebrow.href}
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-md transition hover:border-brand/30 hover:bg-brand/4 hover:text-foreground"
          >
            <span aria-hidden="true" className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            <span>{data.eyebrow.label}</span>
            <ArrowRight
              size={12}
              className="opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:opacity-90"
            />
          </Link>

          {/* Headline — gradient on highlight */}
          <Headline
            id={`${data.id}-headline`}
            parts={data.headline.parts}
            as="h1"
            className="mt-7 text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl"
            highlightClassName="bg-gradient-to-br from-brand to-[#059669] bg-clip-text text-transparent"
            underlineHighlight={false}
          />

          {/* Tagline */}
          {data.tagline && (
            <p
              id={`${data.id}-tagline`}
              className="mt-6 text-base font-semibold tracking-tight text-foreground/90 sm:text-lg"
            >
              {data.tagline}
            </p>
          )}

          {/* Sub */}
          <p
            id={`${data.id}-sub`}
            className="mx-auto mt-3 max-w-xl text-pretty text-sm text-muted sm:text-base"
          >
            {data.sub}
          </p>

          {/* CTAs */}
          <div
            id={`${data.id}-ctas`}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            {data.ctas.map((cta) => {
              const isPrimary = cta.variant === "primary";
              const className = isPrimary
                ? "group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-sm transition hover:opacity-90 hover:shadow-[0_0_28px_rgba(16,185,129,0.35)]"
                : "group inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground/80 transition hover:border-foreground/20 hover:bg-black/5 hover:text-foreground";
              return (
                <Link
                  key={cta.id}
                  id={cta.id}
                  href={cta.href}
                  className={className}
                >
                  {cta.label}
                  <ArrowRight
                    size={isPrimary ? 16 : 14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              );
            })}
          </div>

          {/* Stats — mini bordered cards */}
          <div
            id={`${data.id}-stats`}
            className="mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
          >
            {data.stats.map((s) => (
              <div
                key={s.id}
                id={s.id}
                className="flex items-center gap-2 rounded-xl border border-border bg-background/70 px-3.5 py-3 backdrop-blur-sm"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                />
                <span className="text-[11px] font-medium text-foreground/80 sm:text-xs">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
