import Link from "next/link";
import Eyebrow from "@/components/elements/Eyebrow";
import { ArrowRight } from "lucide-react";
import Headline from "@/components/elements/Headline";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import PortfolioGallery from "@/components/modules/Portfolio/PortfolioGallery";
import { getPortfolio } from "@/lib/content";

export default async function Portfolio() {
  const data = await getPortfolio();

  return (
    <section
      id={`gw-${data.id}`}
      aria-labelledby="portfolio-headline"
      className="relative overflow-hidden border-b border-border bg-background py-24 text-foreground sm:py-28 lg:py-32"
    >
      <div className="container-1200">
        <ScrollFadeIn delay={0.1}>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow text={data.eyebrow} />
          <Headline
            id="portfolio-headline"
            parts={data.headline.parts}
            as="h2"
            className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
            highlightClassName="text-gradient-brand"
          />
          <p className="mt-5 text-base text-muted sm:text-lg">{data.sub}</p>
        </div>
        </ScrollFadeIn>
      </div>

      {/* Masonry filter gallery of work tiles. */}
      <div className="container-1200 mt-14 sm:mt-16">
        <ScrollFadeIn delay={0.2}>
          <PortfolioGallery categories={data.categories} items={data.items} />
        </ScrollFadeIn>
      </div>

      <div className="container-1200 mt-12 flex justify-center">
        <ScrollFadeIn delay={0.3}>
        <Link href="/works" className="btn btn-secondary group">
          View full portfolio
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
