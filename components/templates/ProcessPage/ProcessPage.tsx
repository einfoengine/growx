import Link from "next/link";
import { ArrowRight, Check, MessageSquare, BarChart3, Layout, FileText } from "lucide-react";
import type { ProcessPageContent, ProcessChannel } from "@/lib/content";

const CHANNEL_ICONS: Record<string, typeof Check> = {
  Slack: MessageSquare,
  "Weekly Demos": BarChart3,
  "Project Board": Layout,
  "Monthly Reports": FileText,
};

type Props = { data: ProcessPageContent };

export default function ProcessPage({ data }: Props) {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 left-1/2 -top-24 h-80 w-[700px] -translate-x-1/2 rounded-full bg-brand/8 blur-[100px]"
        />
        <div className="container-1200 pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            {data.hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {data.hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {data.hero.sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#book"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
            >
              Book a discovery call
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground/70 transition hover:border-foreground/30 hover:text-foreground"
            >
              See our work
            </Link>
          </div>
        </div>
      </section>

      {/* ── Journey ──────────────────────────────────────────── */}
      <section className="bg-surface">
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {data.journey.eyebrow}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {data.journey.headline}
            </h2>
            <p className="mt-3 text-base text-muted">{data.journey.sub}</p>
          </div>

          <div className="mt-14 space-y-6">
            {data.journey.phases.map((phase) => (
              <div
                key={phase.id}
                className="grid gap-0 overflow-hidden border border-border bg-background lg:grid-cols-[280px_1fr]"
              >
                {/* Phase label column */}
                <div className="flex flex-col justify-between border-b border-border bg-surface p-8 lg:border-b-0 lg:border-r">
                  <div>
                    <span className="font-mono text-5xl font-bold text-foreground/8">
                      {phase.number}
                    </span>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-brand">
                      {phase.label}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
                      {phase.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {phase.description}
                    </p>
                  </div>
                </div>

                {/* Steps column */}
                <div className="divide-y divide-border">
                  {phase.steps.map((step, i) => (
                    <div key={step.id} className="flex gap-5 p-8">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand/30 bg-brand/5 text-xs font-bold text-brand">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{step.title}</p>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Communication ────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-foreground text-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_70%_60%_at_50%_50%,#000,transparent_90%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(ellipse_60%_60%_at_50%_30%,#000,transparent_85%)]"
        >
          <div className="absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-brand/20 blur-[140px]" />
        </div>

        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-start">
            {/* Left: copy + channels */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                {data.communication.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                {data.communication.headline}
              </h2>
              <p className="mt-4 text-base text-white/70">{data.communication.sub}</p>

              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {data.communication.channels.map((ch) => {
                  const Icon = CHANNEL_ICONS[ch.name] ?? Check;
                  return (
                    <ChannelCard key={ch.id} channel={ch} Icon={Icon} />
                  );
                })}
              </div>
            </div>

            {/* Right: cadence table */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-6">
                Communication cadence
              </p>
              <div className="divide-y divide-white/10">
                {data.communication.cadence.map((item) => (
                  <div key={item.id} className="flex items-start gap-5 py-4 first:pt-0 last:pb-0">
                    <span className="w-24 shrink-0 text-xs font-semibold uppercase tracking-wider text-brand">
                      {item.period}
                    </span>
                    <p className="text-sm text-white/70">{item.action}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-xs text-white/50">
                  All cadence items are included in every retainer plan. One-off projects follow the delivery phase rhythm only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── White-Label ───────────────────────────────────────── */}
      <section className="bg-background">
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                {data.whiteLabel.eyebrow}
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {data.whiteLabel.headline}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {data.whiteLabel.sub}
              </p>
              <Link
                href="#book"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
              >
                Become a partner
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="space-y-0 divide-y divide-border border border-border">
              {data.whiteLabel.promises.map((promise) => (
                <div key={promise.id} className="flex gap-5 p-7">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10">
                    <Check size={11} className="text-brand" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{promise.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{promise.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="bg-surface">
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Questions
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              About how we work
            </h2>

            <dl className="mt-10 divide-y divide-border">
              {data.faq.map((item) => (
                <details
                  key={item.id}
                  className="group py-5 marker:content-none"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <dt className="text-sm font-semibold text-foreground">{item.question}</dt>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-lg text-muted transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <dd className="mt-3 text-sm leading-relaxed text-muted">{item.answer}</dd>
                </details>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 left-1/2 top-0 h-72 w-150 -translate-x-1/2 rounded-full bg-brand/8 blur-[90px]"
        />
        <div className="container-1200 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Ready to start
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Let&apos;s put this into motion.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted">
            Book a 30-minute discovery call. We&apos;ll scope the brief, confirm fit, and have a proposal in your inbox within 24 hours.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#book"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
            >
              Book a Discovery Call
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground/70 transition hover:border-foreground/30 hover:text-foreground"
            >
              See our results
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ChannelCard({
  channel,
  Icon,
}: {
  channel: ProcessChannel;
  Icon: typeof Check;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/20">
        <Icon size={16} className="text-brand" />
      </div>
      <p className="text-sm font-semibold text-white">{channel.name}</p>
      <p className="text-xs leading-relaxed text-white/60">{channel.description}</p>
    </div>
  );
}
