import { Check, ArrowRight } from "lucide-react";
import type { AboutContent } from "@/lib/content";
import SectionHeader from "@/components/elements/SectionHeader";
import Button from "@/components/elements/Button";
import InnerHeroBackdrop from "@/components/modules/Hero/InnerHeroBackdrop";

type Props = { data: AboutContent };

export default function AboutPage({ data }: Props) {
  const missionParagraphs = data.mission.body.split("\n\n");
  const approachParagraphs = data.approach.body.split("\n\n");

  return (
    <>
      {/* ── Hero (dark, emerald-lit — same family as the home hero) ────── */}
      <section
        id="gw-about-hero"
        data-nav-theme="dark"
        className="relative isolate overflow-hidden bg-foreground text-background"
      >
        <InnerHeroBackdrop />
        <div className="container-1200 pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36">
          <SectionHeader
            eyebrow={data.hero.eyebrow}
            headlineText={data.hero.headline}
            as="h1"
            headlineClassName="mt-4 max-w-3xl text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl"
            sub={data.hero.sub}
            subClassName="mt-6 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Button label="Become a partner" href="#book" icon={<ArrowRight size={15} />} darkBg />
            <Button label="See our work" href="/works" variant="secondary" darkBg />
          </div>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────── */}
      <section id="gw-about-stats" className="border-y border-border bg-surface">
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
      <section id="gw-about-mission" className="bg-background">
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-start">
            <SectionHeader
              eyebrow={data.mission.eyebrow}
              headlineText={data.mission.headline}
              headlineClassName="mt-4 text-3xl font-bold leading-[1.2] tracking-tight text-foreground sm:text-4xl"
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

      {/* ── What makes us different ──────────────────────────── */}
      <section id="gw-about-values" className="bg-surface">
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <SectionHeader
            eyebrow="Why us"
            headlineText="What makes us different"
            headlineClassName="mt-4 text-3xl font-bold leading-[1.2] tracking-tight text-foreground sm:text-4xl"
            sub="Six reasons agencies choose a partner over a patchwork of freelancers and vendors."
            subClassName="mt-3 text-base text-muted"
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
      <section id="gw-about-approach" className="bg-background">
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-start">
            <div className="lg:sticky lg:top-28">
              <SectionHeader
                eyebrow={data.approach.eyebrow}
                headlineText={data.approach.headline}
                headlineClassName="mt-4 text-3xl font-bold leading-[1.2] tracking-tight text-foreground sm:text-4xl"
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

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section id="gw-about-cta" className="relative overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 left-1/2 top-0 h-72 w-150 -translate-x-1/2 rounded-full bg-brand/8 blur-[90px]"
        />
        <div className="container-1200 py-24 text-center">
          <SectionHeader
            eyebrow="Ready to scale"
            headlineText="Become a growX partner."
            headlineClassName="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl"
            sub="Start free in minutes. Full portal access, the entire catalog, and 100% white-label delivery from day one. No commitment, no card."
            subClassName="mx-auto mt-5 max-w-xl text-base text-muted"
            align="center"
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button label="Become a partner" href="#book" icon={<ArrowRight size={15} />} />
            <Button label="Book a discovery call" href="#book" variant="secondary" />
          </div>
        </div>
      </section>
    </>
  );
}


