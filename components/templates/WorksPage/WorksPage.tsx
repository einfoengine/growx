import { ArrowRight } from "lucide-react";
import type { PortfolioContent } from "@/lib/content";
import SectionHeader from "@/components/elements/SectionHeader";
import Button from "@/components/elements/Button";
import WorksGrid from "./WorksGrid";

type Props = { data: PortfolioContent };

export default function WorksPage({ data }: Props) {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section id="gw-works-hero" className="relative overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 left-1/2 -top-24 h-80 w-175 -translate-x-1/2 rounded-full bg-brand/8 blur-[100px]"
        />
        <div className="container-1200 pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24">
          <SectionHeader
            eyebrow={data.eyebrow}
            headline={data.headline.parts}
            as="h1"
            headlineClassName="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            sub={data.sub}
            subClassName="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
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
            headlineClassName="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
            sub="Bring the brief. We'll bring the team, the creative, and a proposal in 24 hours."
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
