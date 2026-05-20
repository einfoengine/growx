import SectionHeader from "@/components/elements/SectionHeader";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import { getProcess } from "@/lib/content";

export default async function Process({ noPaddingTop }: { noPaddingTop?: boolean }) {
  const data = await getProcess();

  return (
    <section
      id={`gw-${data.id}`}
      aria-labelledby={`${data.id}-headline`}
      className="relative bg-background"
    >
      <div className={`container-1200 ${noPaddingTop ? "pt-0 pb-24 sm:pb-28 lg:pb-32" : "py-24 sm:py-28 lg:py-32"}`}>
        <ScrollFadeIn delay={0.1}>
          <SectionHeader
            eyebrow={data.eyebrow}
            headline={data.headline.parts}
            headlineId={`${data.id}-headline`}
            sub={data.sub}
            align="center"
            headlineClassName="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            subClassName="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg"
          />
        </ScrollFadeIn>

        <ol
          id={`${data.id}-steps`}
          className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-border sm:grid-cols-2 lg:grid-cols-4"
        >
          {data.steps.map((step, idx) => (
            <ScrollFadeIn key={step.id} delay={0.1 + (idx * 0.1)}>
              <li
                id={step.id}
                className="h-full group relative flex flex-col bg-background p-8 transition hover:bg-surface"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-5xl font-semibold tracking-tight text-foreground/10 transition-colors group-hover:text-brand/40"
                >
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.blurb}
                </p>
                <span
                  aria-hidden="true"
                  className="absolute left-8 top-8 h-1 w-8 rounded-full bg-brand opacity-0 transition-opacity group-hover:opacity-100"
                />
              </li>
            </ScrollFadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
