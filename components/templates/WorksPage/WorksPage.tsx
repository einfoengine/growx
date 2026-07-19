import { ArrowRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/content";
import SectionHeader from "@/components/elements/SectionHeader";
import Button from "@/components/elements/Button";
import InnerHeroBackdrop from "@/components/modules/Hero/InnerHeroBackdrop";
import WorksGrid from "./WorksGrid";

type Props = { data: PortfolioContent };

export default function WorksPage({ data }: Props) {
  return (
    <>
      {/* ── Hero (dark, emerald-lit — same family as the home hero) ────── */}
      <section
        id="gw-works-hero"
        data-nav-theme="dark"
        className="relative isolate overflow-hidden bg-foreground text-background"
      >
        <InnerHeroBackdrop />
        <div className="container-1200 pb-20 pt-28 text-center sm:pb-24 sm:pt-32 lg:pt-36">
          <SectionHeader
            eyebrow={data.eyebrow}
            headline={data.headline.parts}
            as="h1"
            headlineClassName="mx-auto mt-4 max-w-3xl text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl"
            highlightClassName="text-gradient-brand"
            sub={data.sub}
            subClassName="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg"
            align="center"
          />
        </div>
      </section>

      {/* ── Filterable grid ──────────────────────────────────── */}
      <WorksGrid data={data} />

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section id="gw-works-cta" className="relative overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 left-1/2 top-0 h-72 w-150 -translate-x-1/2 rounded-full bg-brand/8 blur-[90px]"
        />
        <div className="container-1200 py-24 text-center">
          <SectionHeader
            eyebrow="Want to see your brand here?"
            headlineText="Let's build something worth showcasing."
            headlineClassName="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl"
            sub="Bring the brief. We'll bring the team, the creative, and deliver it under your brand."
            subClassName="mx-auto mt-5 max-w-xl text-base text-muted"
            align="center"
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button label="Book a discovery call" href="#book" icon={<ArrowRight size={15} />} />
          </div>
        </div>
      </section>
    </>
  );
}
