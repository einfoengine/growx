import { Check } from "lucide-react";
import type { WebinarPageContent } from "@/lib/content";
import SectionHeader from "@/components/elements/SectionHeader";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import InnerHeroBackdrop from "@/components/modules/Hero/InnerHeroBackdrop";
import WebinarRegistration from "./WebinarRegistration";

type Props = { data: WebinarPageContent };

export default function WebinarPage({ data }: Props) {
  return (
    <>
      {/* ── Hero + registration (dark, emerald-lit — same family as home) ─ */}
      <section
        id="gw-webinar-hero"
        aria-labelledby="gw-webinar-headline"
        data-nav-theme="dark"
        className="relative isolate overflow-hidden bg-foreground text-background"
      >
        <InnerHeroBackdrop />
        <div className="container-1200 pb-24 pt-28 sm:pt-32 lg:pb-28 lg:pt-36">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-16">
            {/* Left: pitch */}
            <ScrollFadeIn delay={0.1}>
              <SectionHeader
                as="h1"
                eyebrow={data.hero.eyebrow}
                headline={data.hero.headline.parts}
                headlineId="gw-webinar-headline"
                headlineClassName="mt-4 text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl"
                highlightClassName="text-gradient-brand"
                sub={data.hero.sub}
                subClassName="mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg"
                align="left"
              />

              <div className="mt-8">
                <p className="font-label text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  Who this is for
                </p>
                <ul className="mt-4 space-y-3">
                  {data.audience.map((line) => (
                    <li key={line} className="flex items-start gap-2.5">
                      <Check size={16} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                      <span className="text-sm text-white/80">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollFadeIn>

            {/* Right: registration card */}
            <ScrollFadeIn delay={0.25} className="lg:sticky lg:top-28">
              <WebinarRegistration
                startsAt={data.startsAt}
                dateLabel={data.dateLabel}
                durationLabel={data.durationLabel}
              />
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* ── Agenda ───────────────────────────────────────────── */}
      <section
        id="gw-webinar-agenda"
        aria-labelledby="gw-webinar-agenda-heading"
        className="bg-surface"
      >
        <div className="container-1200 py-24 sm:py-28 lg:py-32">
          <ScrollFadeIn delay={0.1}>
            <SectionHeader
              eyebrow="The agenda"
              headline={[
                { type: "text", value: "What you'll " },
                { type: "highlight", value: "walk away with" },
              ]}
              headlineId="gw-webinar-agenda-heading"
              highlightClassName="text-gradient-brand"
              sub="One focused hour, built around the decisions that actually move your margin."
              subClassName="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg"
              align="center"
              className="mx-auto max-w-3xl"
            />
          </ScrollFadeIn>

          <ScrollFadeIn delay={0.3}>
            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {data.agenda.map((item, i) => (
                <div
                  key={item.id}
                  id={item.id}
                  className="flex gap-4 rounded-2xl border border-border bg-background p-6"
                >
                  <span className="font-mono text-2xl font-semibold leading-none tracking-tight text-brand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* ── Host ─────────────────────────────────────────────── */}
      <section id="gw-webinar-host" aria-label="Your host" className="bg-background">
        <div className="container-1200 py-24 sm:py-28 lg:py-32">
          <ScrollFadeIn delay={0.1}>
            <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center sm:flex-row sm:text-left">
              <span
                aria-hidden="true"
                className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-brand text-2xl font-bold text-black"
              >
                {data.host.initials}
              </span>
              <div>
                <p className="font-label text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                  Your host
                </p>
                <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground">
                  {data.host.name}
                </h2>
                <p className="text-sm font-medium text-muted">{data.host.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{data.host.bio}</p>
              </div>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section
        id="gw-webinar-faq"
        aria-labelledby="gw-webinar-faq-heading"
        className="bg-surface"
      >
        <div className="container-1200 py-24 sm:py-28 lg:py-32">
          <ScrollFadeIn delay={0.1}>
            <SectionHeader
              eyebrow="Questions"
              headline={[
                { type: "text", value: "Before you " },
                { type: "highlight", value: "register" },
              ]}
              headlineId="gw-webinar-faq-heading"
              highlightClassName="text-gradient-brand"
              align="center"
              className="mx-auto max-w-3xl"
            />
          </ScrollFadeIn>

          <ScrollFadeIn delay={0.3}>
            <dl className="mx-auto mt-10 max-w-2xl divide-y divide-border">
              {data.faq.map((item) => (
                <details key={item.id} id={item.id} className="group py-5 marker:content-none">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <dt className="text-sm font-semibold text-foreground">{item.question}</dt>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-muted transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <dd className="mt-3 text-sm leading-relaxed text-muted">{item.answer}</dd>
                </details>
              ))}
            </dl>
          </ScrollFadeIn>
        </div>
      </section>
    </>
  );
}
