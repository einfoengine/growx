import ModuleTitle from "@/components/elements/ModuleTitle";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import PortfolioGallery from "@/components/modules/Portfolio/PortfolioGallery";
import { getPortfolio } from "@/lib/content";
import type { PortfolioCategory } from "@/lib/content";
import type { ReactNode } from "react";

type Props = {
  /** Show only one category's items (also hides the filter pills). */
  category?: PortfolioCategory;
  /** Anchor id override so pages can deep-link the section. */
  id?: string;
  /** Section ground — lets pages keep the white/surface alternation. */
  tone?: "background" | "surface";
  /** Optional section heading rendered inside the module container, above the body. */
  title?: ReactNode;
  /** Optional single-line title rendered above the section header. */
  moduleTitle?: string;
};

/** "Our work" gallery. With no props it renders the full filterable portfolio;
 *  a rich landing page scopes it with `category`. Tiles are
 *  unlinked (the /works case-study route was removed). */
export default async function Portfolio({
  category,
  id,
  tone = "background",
  title,
  moduleTitle,
}: Props = {}) {
  const data = await getPortfolio();

  const items = category
    ? data.items.filter((item) => item.category === category)
    : data.items;

  return (
    <section
      id={id ?? `gw-${data.id}`}
      className={`relative overflow-hidden border-b border-border text-foreground gw-section ${tone === "surface" ? "bg-surface" : "bg-background"}`}
    >
      <div className="container-1200">
        {title}
        {moduleTitle && <ModuleTitle id="gw-portfolio-module-title">{moduleTitle}</ModuleTitle>}
      </div>

      {/* Masonry filter gallery of work tiles. */}
      <div
        className={`container-1200 ${
          title || moduleTitle ? "mt-0" : "mt-14 sm:mt-16"
        }`}
      >
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
