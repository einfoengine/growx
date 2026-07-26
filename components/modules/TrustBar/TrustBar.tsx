import ModuleTitle from "@/components/elements/ModuleTitle";

/** Capability strip under the hero: the platforms our team ships client work
 *  on every week. These are factual tool claims presented as quiet wordmarks,
 *  not endorsements — deliberately monochrome so they read as credentials, not
 *  partnerships. Black band, continuing the dark top zone of the page.
 *
 *  TODO(content): when real endorsements exist (client logos with permission,
 *  press mentions, certification badges), swap these text wordmarks for those
 *  logo SVGs — the layout stays the same. */
const PLATFORMS = [
  "HighLevel",
  "WordPress",
  "Webflow",
  "Shopify",
  "ClickFunnels",
  "Meta Ads",
  "Google Ads",
  "Figma",
];

export default function TrustBar({ moduleTitle }: { moduleTitle?: string } = {}) {
  return (
    <section
      id="gw-mod-trust-bar"
      aria-label="Platforms we fulfill on"
      // Stays black in BOTH themes (contrast band, same standard as the home
      // marquee) — no data-dark-surface here.
      data-nav-theme="dark"
      className="border-b border-white/10 bg-foreground py-12 text-background sm:py-14"
    >
      <div className="container-1200 text-center">
        {moduleTitle && <ModuleTitle id="gw-trust-bar-module-title">{moduleTitle}</ModuleTitle>}
        <ul className="mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PLATFORMS.map((name) => (
            <li
              key={name}
              className="text-lg font-bold tracking-tight text-white/25 transition-colors hover:text-white/60 sm:text-xl"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
