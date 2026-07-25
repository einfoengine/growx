import Eyebrow from "@/components/elements/Eyebrow";
import Headline from "@/components/elements/Headline";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import PortfolioGallery from "@/components/modules/Portfolio/PortfolioGallery";
import { getPortfolio } from "@/lib/content";
import type { HeadlinePart, PortfolioCategory } from "@/lib/content";

type Props = {
  /** Show only one category's items (also hides the filter pills). */
  category?: PortfolioCategory;
  /** Override the section header copy (defaults to the portfolio module's). */
  header?: { eyebrow: string; headline: { parts: HeadlinePart[] }; sub: string };
  /** Anchor id override so pages can deep-link the section. */
  id?: string;
  /** Section ground — lets pages keep the white/surface alternation. */
  tone?: "background" | "surface";
};

/** "Our work" gallery. With no props it renders the full filterable portfolio;
 *  a rich landing page scopes it with `category` + its own `header`. Tiles are
 *  unlinked (the /works case-study route was removed). */
export default async function Portfolio({
  category,
  header,
  id,
  tone = "background",
}: Props = {}) {
  const data = await getPortfolio();

  const items = category
    ? data.items.filter((item) => item.category === category)
    : data.items;
  const eyebrow = header?.eyebrow ?? data.eyebrow;
  const headline = header?.headline ?? data.headline;
  const sub = header?.sub ?? data.sub;

  return (
    <section
      id={id ?? `gw-${data.id}`}
      aria-labelledby="portfolio-headline"
      className={`relative overflow-hidden border-b border-border py-24 text-foreground sm:py-28 lg:py-32 ${
        tone === "surface" ? "bg-surface" : "bg-background"
      }`}
    >
      <div className="container-1200">
        <ScrollFadeIn delay={0.1}>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow text={eyebrow} />
          <Headline
            id="portfolio-headline"
            parts={headline.parts}
            as="h2"
            className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
            highlightClassName="text-gradient-brand"
          />
          <p className="mt-5 text-base text-muted sm:text-lg">{sub}</p>
        </div>
        </ScrollFadeIn>
      </div>

      {/* Masonry filter gallery of work tiles. */}
      <div className="container-1200 mt-14 sm:mt-16">
        <ScrollFadeIn delay={0.2}>
          <PortfolioGallery
            categories={data.categories}
            items={items}
            hideFilters={Boolean(category)}
            linkItems={false}
          />
        </ScrollFadeIn>
      </div>
    </section>
  );
}
