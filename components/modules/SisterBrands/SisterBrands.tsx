import type { ReactNode } from "react";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import ModuleTitle from "@/components/elements/ModuleTitle";
import SectionTitle from "@/components/modules/SectionTitle/SectionTitle";

/** Our family of brands, framed as lineage: growX is the newest name from the
 *  operators already running GHL Video and socialX — a legacy, not a cold
 *  start. Closes the page as the final reassurance before the footer CTA.
 *  Logos live in /public/assets. */
const BRANDS: { name: string; src: string; alt: string; tagline: string }[] = [
  {
    name: "growX",
    src: "/assets/growX-black-logo.svg",
    alt: "growX",
    tagline: "White-label fulfillment for agencies",
  },
  {
    name: "GHL Video",
    src: "/assets/ghl-video-logo.svg",
    alt: "GHL Video",
    tagline: "Video production & editing",
  },
  {
    name: "socialX",
    src: "/assets/socialx-logo.svg",
    alt: "socialX",
    tagline: "Social media management",
  },
];

export default function SisterBrands({
  moduleTitle,
  title,
}: { moduleTitle?: string; title?: ReactNode } = {}) {
  return (
    <section
      id="gw-mod-sister-brands"
      className="relative overflow-hidden border-b border-border bg-background text-foreground gw-section"
    >
      <div className="container-1200">
        {title ?? (
          <SectionTitle
            id="gw-mod-sister-brands-title"
            eyebrow="Three brands. One mission."
            headline={[
              { type: "text", value: "A new name. " },
              { type: "highlight", value: "The same team since 2019." },
            ]}
            sub="growX was built by the operators behind GHL Video and socialX: one in-house team that has been fulfilling agency work for years, now under one roof. Partner with one brand and you tap into all of them."
          />
        )}
        {moduleTitle && (
          <ModuleTitle id="gw-sister-brands-module-title">
            {moduleTitle}
          </ModuleTitle>
        )}
        <ScrollFadeIn delay={0.2}>
        <ul className="mx-auto mt-0 grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-3">
          {BRANDS.map((brand) => (
            <li
              key={brand.name}
              // Pinned white tile: the brand logos are light-designed assets,
              // so the tile must not follow the dark theme's token flip.
              className="flex flex-col items-center gap-5 rounded-2xl border border-black/8 bg-white px-8 py-10 text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex h-12 items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className="h-9 w-auto max-w-[180px] object-contain"
                />
              </div>
              <p className="text-sm text-[#6b7280]">{brand.tagline}</p>
            </li>
          ))}
        </ul>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
