/** Capability strip under the hero: the platforms our team ships client work
 *  on every week. These are factual tool claims presented as quiet wordmarks,
 *  not endorsements — deliberately grayscale so they read as credentials, not
 *  partnerships.
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

export default function TrustBar() {
  return (
    <section
      id="gw-mod-trust-bar"
      aria-label="Platforms we fulfill on"
      className="border-b border-border bg-background py-10 sm:py-12"
    >
      <div className="container-1200">
        <p className="text-center font-label text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
          Fulfilling client work every week across
        </p>
        <ul className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PLATFORMS.map((name) => (
            <li
              key={name}
              className="text-lg font-bold tracking-tight text-foreground/30 transition-colors hover:text-foreground/60 sm:text-xl"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
