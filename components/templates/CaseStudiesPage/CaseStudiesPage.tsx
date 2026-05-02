import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/lib/content";
import SectionHeader from "@/components/elements/SectionHeader";
import Button from "@/components/elements/Button";

const SERVICE_COLORS: Record<string, string> = {
  "seo-aeo": "bg-emerald-50 text-emerald-700 border-emerald-200",
  ppc: "bg-blue-50 text-blue-700 border-blue-200",
  social: "bg-violet-50 text-violet-700 border-violet-200",
  website: "bg-amber-50 text-amber-700 border-amber-200",
  content: "bg-rose-50 text-rose-700 border-rose-200",
  funnels: "bg-cyan-50 text-cyan-700 border-cyan-200",
};

type Props = { caseStudies: CaseStudy[] };

export default function CaseStudiesPage({ caseStudies }: Props) {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 left-1/2 -top-24 h-80 w-[700px] -translate-x-1/2 rounded-full bg-brand/8 blur-[100px]"
        />
        <div className="container-1200 pb-20 pt-16 sm:pb-24 sm:pt-20 lg:pb-28 lg:pt-24">
          <SectionHeader
            eyebrow="Proof of work"
            headlineText="Real clients. Real results."
            as="h1"
            headlineClassName="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            sub="Every engagement starts with a clear brief and ends with numbers you can take to your stakeholders. Here's what we've delivered."
            subClassName="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted"
            align="center"
          />
        </div>
      </section>

      {/* ── Case Study Grid ──────────────────────────────────── */}
      <section className="bg-surface">
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
            {caseStudies.map((cs, i) => (
              <CaseStudyCard key={cs.id} cs={cs} featured={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 left-1/2 top-0 h-72 w-150 -translate-x-1/2 rounded-full bg-brand/8 blur-[90px]"
        />
        <div className="container-1200 py-24">
          <SectionHeader
            eyebrow="Your turn"
            headlineText="Ready to be the next case study?"
            headlineClassName="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
            sub="Bring the brief. We'll bring the strategy, the team, and a proposal within 24 hours."
            subClassName="mx-auto mt-5 max-w-xl text-base text-muted"
            align="center"
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button label="Book a Discovery Call" href="#book" icon={<ArrowRight size={15} />} />
            <Button label="View all services" href="/#mod-services" variant="secondary" />
          </div>
        </div>
      </section>
    </>
  );
}

function CaseStudyCard({ cs, featured }: { cs: CaseStudy; featured: boolean }) {
  const colorClass = SERVICE_COLORS[cs.serviceSlug] ?? "bg-gray-50 text-gray-700 border-gray-200";
  const firstResult = cs.results[0];

  return (
    <Link
      href={`/case-studies/${cs.slug}`}
      className={`group relative flex flex-col rounded-3xl border border-border bg-background p-8 transition-all duration-300 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1 ${featured ? "sm:col-span-2 xl:col-span-1" : ""}`}
    >
      {/* Service + Industry badges */}
      <div className="flex flex-wrap items-center gap-2">
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${colorClass}`}>
          {cs.service}
        </span>
        <span className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-medium text-muted">
          {cs.industry}
        </span>
      </div>

      {/* Client + Tagline */}
      <div className="mt-6 flex-1">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          {cs.client}
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-foreground group-hover:text-brand transition-colors sm:text-2xl">
          {cs.tagline}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
          {cs.description}
        </p>
      </div>

      {/* Metrics strip */}
      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-4">
        {cs.results.map((r) => (
          <div key={r.id}>
            <p className="text-2xl font-bold tracking-tight text-foreground">{r.value}</p>
            <p className="mt-0.5 text-xs text-muted">{r.label}</p>
          </div>
        ))}
      </div>

      {/* Read link */}
      <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-brand">
        Read case study
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
