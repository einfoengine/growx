import {
  ArrowRight,
  Check,
  MessageSquare,
  BarChart3,
  Layout,
  FileText,
  UserPlus,
  MousePointerClick,
  Cog,
  PackageCheck,
  KeyRound,
  CircleCheckBig,
  ShieldCheck,
  RefreshCw,
  UserCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type {
  HeroContent,
  ProcessPageContent,
  ProcessChannel,
} from "@/lib/content";
import SectionHeader from "@/components/elements/SectionHeader";
import Button from "@/components/elements/Button";
import Hero from "@/components/modules/Hero";
import Faq from "@/components/modules/Faq";
import WhiteLabelWall from "./WhiteLabelWall";

const CHANNEL_ICONS: Record<string, typeof Check> = {
  Slack: MessageSquare,
  "Weekly Demos": BarChart3,
  "Project Board": Layout,
  "Monthly Reports": FileText,
};

// One icon per journey phase, in order (Join, Order, Produce, Deliver).
const PHASE_ICONS: LucideIcon[] = [UserPlus, MousePointerClick, Cog, PackageCheck];

// Icon keys used by the "your part" and "quality" data sections.
const INFO_ICONS: Record<string, LucideIcon> = {
  "file-text": FileText,
  "key-round": KeyRound,
  "circle-check-big": CircleCheckBig,
  "shield-check": ShieldCheck,
  "refresh-cw": RefreshCw,
  "user-check": UserCheck,
  wrench: Wrench,
};

type Props = { data: ProcessPageContent };

function processHeroToHeroContent(page: ProcessPageContent): HeroContent {
  return {
    id: `${page.id}-hero`,
    eyebrow: { label: page.hero.eyebrow, href: "#process-journey" },
    headline: { parts: [{ type: "text", value: page.hero.headline }] },
    sub: page.hero.sub,
    ctas: [
      {
        id: `${page.id}-hero-cta-book`,
        label: "Book a discovery call",
        href: "#book",
        variant: "primary",
      },
      {
        id: `${page.id}-hero-cta-work`,
        label: "See our work",
        href: "/works",
        variant: "secondary",
      },
    ],
    stats: [],
  };
}

export default function ProcessPage({ data }: Props) {
  return (
    <>
      <Hero data={processHeroToHeroContent(data)} variant="inner" />

      {/* ── Journey ──────────────────────────────────────────── */}
      <section id="gw-process-journey" className="bg-surface">
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <SectionHeader
            eyebrow={data.journey.eyebrow}
            headlineText={data.journey.headline}
            headlineClassName="mt-4 text-3xl font-bold leading-[1.2] tracking-tight text-foreground sm:text-4xl"
            sub={data.journey.sub}
            subClassName="mt-3 text-base text-muted"
            className="max-w-2xl"
          />

          {/* Phases stack as you scroll: each card pins under the last, so its
              number + label strip stays visible as the next slides over it. */}
          <div className="mt-14">
            {data.journey.phases.map((phase, i) => {
              const PhaseIcon = PHASE_ICONS[i % PHASE_ICONS.length];
              return (
              <div
                key={phase.id}
                className="mb-6 lg:sticky"
                style={{ top: `calc(5.5rem + ${i} * 5rem)` }}
              >
                <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
                  {/* Header strip — what remains visible when the card is stacked. */}
                  <div className="flex items-center gap-5 border-b border-border bg-surface px-6 py-5 sm:px-8">
                    <span className="text-gradient-brand font-mono text-3xl font-bold sm:text-4xl">
                      {phase.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold uppercase tracking-widest text-brand">
                        {phase.label}
                      </p>
                      <h3 className="mt-0.5 text-lg font-semibold tracking-tight text-foreground sm:text-xl lg:truncate">
                        {phase.title}
                      </h3>
                    </div>
                    <span
                      aria-hidden="true"
                      className="hidden h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand/10 sm:grid"
                    >
                      <PhaseIcon size={22} className="text-brand" />
                    </span>
                  </div>

                  {/* Body: description + the three steps. */}
                  <div className="p-6 sm:p-8">
                    <p className="max-w-2xl text-sm leading-relaxed text-muted">
                      {phase.description}
                    </p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-3">
                      {phase.steps.map((step, si) => (
                        <div
                          key={step.id}
                          className="rounded-xl border border-brand/15 bg-brand/5 p-5"
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-brand text-xs font-bold text-black">
                            {si + 1}
                          </span>
                          <p className="mt-3 text-sm font-semibold text-foreground">{step.title}</p>
                          <p className="mt-1.5 text-sm leading-relaxed text-muted">{step.body}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              );
            })}
            {/* Trailing room so the LAST phase can settle at its stacked
                position instead of being carried to the top — it's the last
                child, so without this the container ends the moment it sticks.
                Desktop only (mobile has no sticky). */}
            <div aria-hidden="true" className="hidden h-[46vh] lg:block" />
          </div>
        </div>
      </section>

      {/* ── Your part (what we need from you) ─────────────────── */}
      <section id="gw-process-your-part" className="bg-background">
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <SectionHeader
            eyebrow={data.yourPart.eyebrow}
            headlineText={data.yourPart.headline}
            headlineClassName="mt-4 text-3xl font-bold leading-[1.2] tracking-tight text-foreground sm:text-4xl"
            sub={data.yourPart.sub}
            subClassName="mt-3 text-base text-muted"
            className="max-w-2xl"
          />

          <ol className="mt-12 grid gap-5 sm:grid-cols-3">
            {data.yourPart.steps.map((step, i) => {
              const Icon = INFO_ICONS[step.icon] ?? Check;
              return (
                <li
                  key={step.id}
                  className="relative rounded-2xl border border-border bg-surface p-6 sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand/10">
                      <Icon size={20} className="text-brand" aria-hidden="true" />
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-sm font-semibold text-muted"
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <p className="mt-5 text-base font-semibold text-foreground">
                    {step.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── Communication ────────────────────────────────────── */}
      <section id="gw-process-communication" className="relative isolate overflow-hidden bg-foreground text-background">
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
          {/* Header spans the full content width so the two content columns
              below start at the same top edge. */}
          <SectionHeader
            eyebrow={data.communication.eyebrow}
            headlineText={data.communication.headline}
            headlineClassName="mt-4 text-3xl font-bold leading-[1.2] tracking-tight sm:text-4xl"
            sub={data.communication.sub}
            subClassName="mt-4 max-w-2xl text-base text-white/70"
            className="max-w-2xl"
          />

          <div className="mt-12 grid gap-14 lg:grid-cols-2 lg:gap-20 lg:items-start">
            {/* Left: channels */}
            <div className="grid gap-5 sm:grid-cols-2">
              {data.communication.channels.map((ch) => {
                const Icon = CHANNEL_ICONS[ch.name] ?? Check;
                return <ChannelCard key={ch.id} channel={ch} Icon={Icon} />;
              })}
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
                  Response times and pipeline calls scale with your tier. Free covers portal support, Standard adds a dedicated account manager, and VIP adds priority production and a quarterly strategy session.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quality & revisions (execution risk-reversal) ────── */}
      <section id="gw-process-quality" className="bg-surface">
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <SectionHeader
            eyebrow={data.quality.eyebrow}
            headlineText={data.quality.headline}
            headlineClassName="mt-4 text-3xl font-bold leading-[1.2] tracking-tight text-foreground sm:text-4xl"
            sub={data.quality.sub}
            subClassName="mt-3 text-base text-muted"
            className="max-w-2xl"
          />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {data.quality.items.map((item) => {
              const Icon = INFO_ICONS[item.icon] ?? Check;
              return (
                <li
                  key={item.id}
                  className="flex gap-5 rounded-2xl border border-border bg-background p-6 sm:p-7"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand/10">
                    <Icon size={20} className="text-brand" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-base font-semibold text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── White-Label (pinned horizontal card scroll) ───────── */}
      <WhiteLabelWall
        eyebrow={data.whiteLabel.eyebrow}
        headline={data.whiteLabel.headline}
        sub={data.whiteLabel.sub}
        promises={data.whiteLabel.promises}
      />

      {/* ── FAQ (shared module, same as the home page) ────────── */}
      <Faq data={data.faq} />

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section id="gw-process-cta" className="relative overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 left-1/2 top-0 h-72 w-150 -translate-x-1/2 rounded-full bg-brand/8 blur-[90px]"
        />
        <div className="container-1200 py-24 text-center">
          <SectionHeader
            eyebrow="Ready to start"
            headlineText="Let's put this into motion."
            headlineClassName="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl"
            sub="Create your free partner account and place your first white-label order today. No commitment, no card, no sales call required."
            subClassName="mx-auto mt-5 max-w-xl text-base text-muted"
            align="center"
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button label="Become a partner" href="#book" icon={<ArrowRight size={15} />} />
            <Button label="See our work" href="/works" variant="secondary" />
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
