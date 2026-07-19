import Eyebrow from "@/components/elements/Eyebrow";
import Headline from "@/components/elements/Headline";
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

export default async function Testimonials() {
  const data = await getTestimonials();

  return (
    <section
      id={`gw-${data.id}`}
      aria-labelledby="testimonials-headline"
      className="relative overflow-hidden border-b border-border bg-surface py-24 text-foreground sm:py-28 lg:py-32"
    >
      <div className="container-1200">
        <ScrollFadeIn delay={0.1}>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow text={data.eyebrow} />
            <Headline
              id="testimonials-headline"
              parts={data.headline.parts}
              as="h2"
              className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
              highlightClassName="text-gradient-brand"
            />
            <p className="mt-5 text-base text-muted sm:text-lg">{data.sub}</p>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.2}>
          <div className="mt-14">
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
