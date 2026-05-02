import Image from "next/image";
import { Check, Quote } from "lucide-react";
import { ArrowRight } from "lucide-react";
import type { AboutContent, TeamMember } from "@/lib/content";
import FoundersSection from "./FoundersSection";
import SectionHeader from "@/components/elements/SectionHeader";
import Button from "@/components/elements/Button";

const AVATAR_COLORS: Record<string, string> = {
  emerald: "bg-emerald-100 text-emerald-700",
  violet:  "bg-violet-100 text-violet-700",
  blue:    "bg-blue-100 text-blue-700",
  rose:    "bg-rose-100 text-rose-700",
  amber:   "bg-amber-100 text-amber-700",
  cyan:    "bg-cyan-100 text-cyan-700",
  indigo:  "bg-indigo-100 text-indigo-700",
};

const DEPT_COLORS: Record<string, string> = {
  Search:       "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Paid Media": "bg-blue-50 text-blue-700 border-blue-200",
  Social:       "bg-rose-50 text-rose-700 border-rose-200",
  Content:      "bg-amber-50 text-amber-700 border-amber-200",
  Development:  "bg-cyan-50 text-cyan-700 border-cyan-200",
  Growth:       "bg-indigo-50 text-indigo-700 border-indigo-200",
};

type Props = { data: AboutContent };

export default function AboutPage({ data }: Props) {
  const missionParagraphs = data.mission.body.split("\n\n");
  const approachParagraphs = data.approach.body.split("\n\n");

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
            eyebrow={data.hero.eyebrow}
            headlineText={data.hero.headline}
            as="h1"
            headlineClassName="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            sub={data.hero.sub}
            subClassName="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button label="Work with us" href="#book" icon={<ArrowRight size={15} />} />
            <Button label="See our work" href="/case-studies" variant="secondary" />
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────── */}
      <section className="border-y border-border bg-surface">
        <div className="container-1200 py-12">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {data.stats.map((s) => (
              <div key={s.id} className="text-center sm:text-left">
                <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1.5 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────── */}
      <section className="bg-background">
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-start">
            <SectionHeader
              eyebrow={data.mission.eyebrow}
              headlineText={data.mission.headline}
              headlineClassName="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              className="lg:sticky lg:top-28"
            />
            <div className="space-y-5">
              {missionParagraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Founders ─────────────────────────────────────────── */}
      <section className="bg-surface">
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <SectionHeader
            eyebrow="Leadership"
            headlineText="Meet the founders"
            headlineClassName="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            sub="Operators who've been on both sides of the agency relationship — and built growX to fix what frustrated them most."
            subClassName="mt-3 text-base text-muted"
            className="max-w-xl"
          />

          <div className="mt-14">
            <FoundersSection founders={data.founders} />
          </div>
        </div>
      </section>

      {/* ── Team ─────────────────────────────────────────────── */}
      <section className="bg-background">
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <SectionHeader
            eyebrow="The crew"
            headlineText="Specialists, not generalists"
            headlineClassName="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            sub="Each discipline is led by someone who has spent years doing exactly that — not a project manager wearing six hats."
            subClassName="mt-3 text-base text-muted"
            className="max-w-xl"
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.team.map((m) => (
              <TeamMemberCard key={m.id} member={m} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────── */}
      <section className="bg-surface">
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <SectionHeader
            eyebrow="What we stand for"
            headlineText="Our values"
            headlineClassName="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
            className="max-w-xl"
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {data.values.map((v, i) => (
              <div
                key={v.id}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-background p-8"
              >
                <span className="font-mono text-4xl font-semibold tracking-tight text-foreground/8">
                  0{i + 1}
                </span>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Work ──────────────────────────────────────── */}
      <section className="bg-background">
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                eyebrow={data.approach.eyebrow}
                headlineText={data.approach.headline}
                headlineClassName="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              />
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {data.approach.pillars.map((p) => (
                  <div key={p.id} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10">
                      <Check size={11} className="text-brand" />
                    </span>
                    <span className="text-sm text-foreground/80">{p.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-5">
              {approachParagraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Testimonial ─────────────────────────────── */}
      <section className="bg-surface">
        <div className="container-1200 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <div className="flex flex-col items-center text-center">
              <Quote size={36} className="text-brand/30" />
              <blockquote className="mt-6 text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                &ldquo;{data.featuredTestimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-8">
                <p className="text-sm font-semibold text-foreground">
                  {data.featuredTestimonial.author}
                </p>
                <p className="mt-0.5 text-sm text-muted">
                  {data.featuredTestimonial.title}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4 rounded-2xl border border-border bg-background px-8 py-5">
                <p className="text-3xl font-bold tracking-tight text-foreground">
                  {data.featuredTestimonial.metric}
                </p>
                <p className="text-left text-sm text-muted">
                  {data.featuredTestimonial.metricLabel}
                </p>
              </div>
            </div>
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
          <SectionHeader
            eyebrow="Ready to scale"
            headlineText="Let's build something together."
            headlineClassName="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
            sub="Book a free 30-minute discovery call. We'll scope the brief, confirm fit, and have a proposal in your inbox within 24 hours."
            subClassName="mx-auto mt-5 max-w-xl text-base text-muted"
            align="center"
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button label="Book a Discovery Call" href="#book" icon={<ArrowRight size={15} />} />
            <Button label="View case studies" href="/case-studies" variant="secondary" />
          </div>
        </div>
      </section>
    </>
  );
}


function TeamMemberCard({ member: m }: { member: TeamMember }) {
  const avatarClass = AVATAR_COLORS[m.avatarColor] ?? "bg-gray-100 text-gray-700";
  const deptClass = DEPT_COLORS[m.department] ?? "bg-gray-50 text-gray-700 border-gray-200";
  return (
    <div className="flex flex-col overflow-hidden border border-border bg-background">
      {/* Photo — fills full width, no padding */}
      <div className={`relative w-full aspect-4/3 overflow-hidden ${avatarClass}`}>
        {m.image ? (
          <Image src={m.image} alt={m.name} fill className="object-cover object-top" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold">
            {m.initials}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-3 p-5">
        <span className={`self-start inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${deptClass}`}>
          {m.department}
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">{m.name}</p>
          <p className="text-xs text-muted">{m.role}</p>
        </div>
        <p className="text-sm leading-relaxed text-muted">{m.bio}</p>
      </div>
    </div>
  );
}
