import Headline from "@/components/elements/Headline";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import PainPointsCards from "./PainPointsCards";
import { getPainPoints } from "@/lib/content";

export default async function PainPoints() {
  const data = await getPainPoints();

  return (
    <section
      id={data.id}
      aria-labelledby={`${data.id}-headline`}
      className="relative isolate overflow-x-clip bg-foreground text-background"
    >
      <div
        id={`${data.id}-bg-glow`}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(ellipse_60%_60%_at_50%_30%,#000,transparent_85%)]"
      >
        <div className="absolute -top-40 left-1/4 h-105 w-105 rounded-full bg-(--brand-soft) blur-[140px]" />
      </div>
      <div
        id={`${data.id}-bg-grid`}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_70%_60%_at_50%_50%,#000,transparent_90%)]"
      />

      <div className="container-1200 relative py-24 sm:py-28 lg:py-32">
        <ScrollFadeIn delay={0.1}>
          <div
            id={`${data.id}-intro`}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              {data.eyebrow}
            </p>
            <Headline
              id={`${data.id}-headline`}
              parts={data.headline.parts}
              as="h2"
              className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            />
            <p className="mx-auto mt-5 max-w-xl text-base text-white/70 sm:text-lg">
              {data.sub}
            </p>
          </div>
        </ScrollFadeIn>

        <PainPointsCards cards={data.cards} />
      </div>
    </section>
  );
}
