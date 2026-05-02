import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Quote } from "lucide-react";
import type { CaseStudy } from "@/lib/content";
import SectionHeader from "@/components/elements/SectionHeader";

const SERVICE_COLORS: Record<string, string> = {
  "seo-aeo": "bg-emerald-50 text-emerald-700 border-emerald-200",
  ppc: "bg-blue-50 text-blue-700 border-blue-200",
  social: "bg-violet-50 text-violet-700 border-violet-200",
  website: "bg-amber-50 text-amber-700 border-amber-200",
  content: "bg-rose-50 text-rose-700 border-rose-200",
  funnels: "bg-cyan-50 text-cyan-700 border-cyan-200",
};

type Props = {
  caseStudy: CaseStudy;
  related: CaseStudy[];
};

export default function CaseStudyPage({ caseStudy: cs, related }: Props) {
  const serviceColor = SERVICE_COLORS[cs.serviceSlug] ?? "bg-gray-50 text-gray-700 border-gray-200";

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 left-1/2 -top-20 h-80 w-[700px] -translate-x-1/2 rounded-full bg-brand/8 blur-[90px]"
        />
        <div className="container-1200 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
          {/* Breadcrumb */}
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-xs text-muted transition hover:text-foreground"
          >
            <ArrowLeft size={13} />
            All case studies
          </Link>

          <div className="mt-8 max-w-3xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${serviceColor}`}>
                {cs.service}
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
                {cs.industry}
              </span>
              <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
                {cs.duration}
              </span>
            </div>

            <SectionHeader
              eyebrow={cs.client}
              headlineText={cs.tagline}
              as="h1"
              headlineClassName="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              sub={cs.description}
              subClassName="mt-5 text-base leading-relaxed text-muted max-w-2xl"
              className="mt-5"
            />
          </div>
        </div>
      </section>

      {/* ── Results Bar ──────────────────────────────────────── */}
      <section className="border-y border-border bg-surface">
        <div className="container-1200 py-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cs.results.map((r) => (
              <div key={r.id} className="text-center sm:text-left">
                <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {r.value}
                </p>
                <p className="mt-1.5 text-sm text-muted">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Challenge & Solution ─────────────────────────────── */}
      <section className="bg-background">
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            <div>
              <SectionHeader
                eyebrow="The challenge"
                headlineText="What we were solving"
                headlineClassName="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
              />
              <p className="mt-5 text-base leading-relaxed text-muted">{cs.challenge}</p>
            </div>
            <div>
              <SectionHeader
                eyebrow="The solution"
                headlineText="How we approached it"
                headlineClassName="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
              />
              <p className="mt-5 text-base leading-relaxed text-muted">{cs.solution}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services Used ────────────────────────────────────── */}
      <section className="bg-surface">
        <div className="container-1200 py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <SectionHeader
              eyebrow="Scope of work"
              headlineText="What we delivered"
              headlineClassName="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
              sub="Every engagement is scoped and agreed upfront. Here's exactly what was included."
              subClassName="mt-3 text-sm text-muted"
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {cs.services.map((s) => (
                <li key={s} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10">
                    <Check size={11} className="text-brand" />
                  </span>
                  <span className="text-sm text-foreground/80">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Testimonial ──────────────────────────────────────── */}
      {cs.testimonial && (
        <section className="bg-background">
          <div className="container-1200 py-20 sm:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <Quote size={36} className="mx-auto text-brand/30" />
              <blockquote className="mt-6 text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                &ldquo;{cs.testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-8">
                <p className="text-sm font-semibold text-foreground">
                  {cs.testimonial.author}
                </p>
                <p className="mt-0.5 text-sm text-muted">{cs.testimonial.title}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Related Case Studies ─────────────────────────────── */}
      {related.length > 0 && (
        <section className="bg-surface">
          <div className="container-1200 py-20 sm:py-24">
            <div className="flex items-end justify-between gap-4">
              <SectionHeader
                eyebrow="More results"
                headlineText="Other case studies"
                headlineClassName="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
              />
              <Link
                href="/case-studies"
                className="hidden items-center gap-1.5 text-sm font-medium text-foreground/70 transition hover:text-foreground sm:inline-flex"
              >
                View all
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => {
                const color = SERVICE_COLORS[r.serviceSlug] ?? "bg-gray-50 text-gray-700 border-gray-200";
                return (
                  <Link
                    key={r.id}
                    href={`/case-studies/${r.slug}`}
                    className="group flex flex-col rounded-2xl border border-border bg-background p-6 transition-all hover:border-brand/40 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="flex flex-wrap gap-2">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${color}`}>
                        {r.service}
                      </span>
                    </div>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-muted">
                      {r.client}
                    </p>
                    <p className="mt-1 text-base font-semibold text-foreground group-hover:text-brand transition-colors">
                      {r.results[0].value}
                      <span className="ml-1.5 text-sm font-normal text-muted">{r.results[0].label}</span>
                    </p>
                    <p className="mt-2 text-sm text-muted line-clamp-2">{r.tagline}</p>
                    <div className="mt-4 flex items-center gap-1 text-xs font-medium text-brand">
                      Read more
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-foreground text-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-40 left-1/2 h-130 w-[760px] -translate-x-1/2 rounded-full bg-brand/20 blur-[140px]" />
        </div>
        <div className="container-1200 py-24">
          <SectionHeader
            eyebrow="Ready to start"
            headlineText="Want results like these?"
            headlineClassName="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
            sub="Book a free discovery call and we'll scope out exactly what's possible for your business."
            subClassName="mx-auto mt-5 max-w-xl text-base text-white/70"
            align="center"
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="#book"
              className="group inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground transition hover:opacity-90"
            >
              Book a Discovery Call
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
            >
              All case studies
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
