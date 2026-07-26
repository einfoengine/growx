import ModuleTitle from "@/components/elements/ModuleTitle";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import TestimonialsSlider from "./TestimonialsSlider";
import { getTestimonials } from "@/lib/content";

/** Social proof between the pain (FulfillmentReasons) and the mechanics
 *  (HowItWorks): an auto-advancing slider of partner voices, one at a time,
 *  over a band of verifiable company facts that anchor the quotes.
 *
 *  TODO(content): the entries in data/modules/testimonials.json are DEMO
 *  placeholders (names, companies, metrics). Replace with real partner
 *  quotes before launch — nothing else needs changing. */

// Verifiable company facts (not testimonials): claims a skeptic can check,
// real today, anchoring the quotes above them.
const FACTS = [
  { value: "2019", label: "In-house team since" },
  { value: "100%", label: "White-label delivery" },
  { value: "4", label: "Markets: US, CA, UK, AU" },
];

export default async function Testimonials({
  moduleTitle,
  noPaddingTop,
}: { moduleTitle?: string; noPaddingTop?: boolean } = {}) {
  const data = await getTestimonials();

  return (
    <section
      id={`gw-${data.id}`}
      // White, so it alternates against ProcessJourney's surface above and
      // TrustedBy's surface below. noPaddingTop: a SectionTitle module sits
      // directly above and already provides the top spacing.
      className={`relative overflow-hidden border-b border-border bg-background text-foreground ${
        noPaddingTop ? "pb-24 pt-0 sm:pb-28 lg:pb-32" : "py-24 sm:py-28 lg:py-32"
      }`}
    >
      <div className="container-1200">
        {moduleTitle && (
          <ModuleTitle id="gw-testimonials-module-title">{moduleTitle}</ModuleTitle>
        )}
        <ScrollFadeIn delay={0.2}>
          <div className={noPaddingTop && !moduleTitle ? "mt-0" : "mt-14"}>
            <TestimonialsSlider testimonials={data.testimonials} />
          </div>
        </ScrollFadeIn>

        {/* Fact band under the slider: opinions above, checkable facts below. */}
        <ScrollFadeIn delay={0.3}>
          <ul className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {FACTS.map((f) => (
              <li key={f.label} className="flex items-baseline gap-3">
                <span className="text-gradient-brand text-3xl font-extrabold leading-none tracking-tight sm:text-4xl">
                  {f.value}
                </span>
                <span className="max-w-32 text-sm font-medium text-foreground/70">
                  {f.label}
                </span>
              </li>
            ))}
          </ul>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
