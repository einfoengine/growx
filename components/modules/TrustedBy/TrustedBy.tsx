import ScrollFadeIn from "@/components/elements/ScrollFadeIn";

/** Endorsement logo wall, paired with the Testimonials above: the agencies that
 *  partner with growX, shown as wordmarks in a grid.
 *
 *  TODO(content): these are DEMO placeholders — the same fictional agencies
 *  quoted in data/modules/testimonials.json, plus a couple more to fill the
 *  wall. Replace with real client logo SVGs (with written permission) before
 *  launch; the grid layout stays the same. Deliberately kept as monochrome
 *  wordmarks rather than fabricated logo images, so nothing reads as a genuine
 *  endorsement until it actually is one. */
const COMPANIES = [
  "Peak Digital",
  "Velocity Marketing",
  "Bright Strategy",
  "Next Wave Creative",
  "Summit Media",
  "Northbound",
];

export default function TrustedBy() {
  return (
    <section
      id="gw-mod-trusted-by"
      aria-label="Agencies that partner with growX"
      // Surface, so it separates from the white Testimonials above and the
      // white SisterBrands below.
      className="relative overflow-hidden border-b border-border bg-surface py-16 text-foreground sm:py-20"
    >
      <div className="container-1200">
        <ScrollFadeIn delay={0.1}>
          <p className="eyebrow text-center text-muted">Trusted by growing agencies</p>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.2}>
          <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5">
            {COMPANIES.map((name) => (
              <li
                key={name}
                className="group card card-hover flex h-20 items-center justify-center px-4 text-center sm:h-24"
              >
                <span className="text-sm font-bold tracking-tight text-foreground/40 transition-colors group-hover:text-foreground/70 sm:text-base">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
