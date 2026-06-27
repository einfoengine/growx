import Link from "next/link";
import SectionHeader from "@/components/elements/SectionHeader";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import PortfolioGallery from "./PortfolioGallery";
import { getPortfolio } from "@/lib/content";

export default async function PortfolioCarousel() {
  const data = await getPortfolio();

  return (
    <section
      id={`gw-${data.id}`}
      className="relative bg-background py-24 sm:py-28 lg:py-32"
    >
      <div className="container-1200">
        <ScrollFadeIn>
          <SectionHeader
            eyebrow={data.eyebrow}
            headline={data.headline.parts}
            headlineClassName="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
            sub={data.sub}
            subClassName="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg"
            align="center"
          />
          <div className="mt-6 flex justify-center">
            <Link
              href="/works"
              className="text-sm font-medium text-brand transition hover:text-brand/80"
            >
              View full portfolio →
            </Link>
          </div>
        </ScrollFadeIn>

        {/* Filterable gallery on a black panel */}
        <ScrollFadeIn delay={0.1}>
          <PortfolioGallery items={data.items} />
        </ScrollFadeIn>
      </div>
    </section>
  );
}
