import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Headline from "@/components/elements/Headline";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import { getCtaBanner } from "@/lib/content";
import Eyebrow from "@/components/elements/Eyebrow";

export default async function CtaBanner() {
  const data = await getCtaBanner();

  return (
    <section
      id={data.id}
      aria-labelledby={`${data.id}-headline`}
      className="relative isolate overflow-hidden bg-foreground text-background"
    >
      <div
        id={`${data.id}-bg-glow`}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent_75%)]"
      >
        <div className="absolute -top-40 left-1/2 h-130 w-[760px] -translate-x-1/2 rounded-full bg-(--brand-soft) blur-[140px]" />
      </div>
      <div
        id={`${data.id}-bg-grid`}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent_85%)]"
      />

      <div className="container-1200 relative py-24 sm:py-28 lg:py-32">
        <ScrollFadeIn delay={0.1}>
          <div className="mx-auto max-w-3xl text-center">
            {data.eyebrow && (
              <Eyebrow text={data.eyebrow} />
            )}
            <Headline
              id={`${data.id}-headline`}
              parts={data.headline.parts}
              as="h2"
              className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            />
            <p
              id={`${data.id}-sub`}
              className="mx-auto mt-6 max-w-xl text-base text-white/70 sm:text-lg"
            >
              {data.sub}
            </p>
          </div>
        </ScrollFadeIn>

          <ScrollFadeIn delay={0.3}>
            <div
              id={`${data.id}-ctas`}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              {data.ctas.map((cta) => {
                const isPrimary = cta.variant === "primary";
                const className = isPrimary
                  ? "group inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground shadow-sm transition hover:opacity-90"
                  : "group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white";
                return (
                  <Link
                    key={cta.id}
                    id={cta.id}
                    href={cta.href}
                    className={className}
                  >
                    {cta.label}
                    <ArrowRight
                      size={isPrimary ? 16 : 14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                );
              })}
            </div>
          </ScrollFadeIn>
      </div>
    </section>
  );
}
