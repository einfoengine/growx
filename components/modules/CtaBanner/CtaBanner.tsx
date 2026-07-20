import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/elements/SectionHeader";
import Button from "@/components/elements/Button";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import { getCtaBanner } from "@/lib/content";
import type { CtaBannerContent } from "@/lib/content";

/** Site-wide closing CTA. Defaults to the shared banner data, but accepts an
 *  override so a page (e.g. /pricing) can reuse the exact same component with
 *  its own headline and CTAs instead of a bespoke rebuild. */
export default async function CtaBanner({ data }: { data?: CtaBannerContent } = {}) {
  const banner = data ?? (await getCtaBanner());

  return (
    <section
      id={`gw-${banner.id}`}
      aria-labelledby={`${banner.id}-headline`}
      className="relative isolate overflow-hidden bg-foreground text-background"
    >
      <div
        id={`${banner.id}-bg-glow`}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000,transparent_75%)]"
      >
        <div className="absolute -top-40 left-1/2 h-130 w-[760px] -translate-x-1/2 rounded-full bg-(--brand-soft) blur-[140px]" />
      </div>
      <div
        id={`${banner.id}-bg-grid`}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent_85%)]"
      />

      <div className="container-1200 relative py-24 sm:py-28 lg:py-32">
        <ScrollFadeIn delay={0.1}>
          <SectionHeader
            eyebrow={banner.eyebrow}
            headline={banner.headline.parts}
            headlineId={`${banner.id}-headline`}
            sub={banner.sub}
            align="center"
            headlineClassName="mt-4 text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl"
            subClassName="mx-auto mt-6 max-w-xl text-base text-white/70 sm:text-lg"
          />
        </ScrollFadeIn>

          <ScrollFadeIn delay={0.3}>
            <div
              id={`${banner.id}-ctas`}
              className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
            >
              {banner.ctas.map((cta) => {
                const isPrimary = cta.variant === "primary";
                return (
                  <Button
                    key={cta.id}
                    id={cta.id}
                    label={cta.label}
                    href={cta.href}
                    variant={isPrimary ? "primary" : "secondary"}
                    icon={<ArrowRight size={isPrimary ? 16 : 14} />}
                    darkBg
                  />
                );
              })}
            </div>
          </ScrollFadeIn>
      </div>
    </section>
  );
}
