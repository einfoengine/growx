import { Quote } from "lucide-react";
import Eyebrow from "@/components/elements/Eyebrow";
import Headline from "@/components/elements/Headline";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import { getTestimonials } from "@/lib/content";
import type { Testimonial } from "@/lib/content";

/** Social proof between the pain (FulfillmentReasons) and the mechanics
 *  (HowItWorks), laid out as a bento: one featured voice on dark, compact
 *  cards around it, and a band of verifiable company facts anchoring the
 *  quotes.
 *
 *  TODO(content): the entries in data/modules/testimonials.json are DEMO
 *  placeholders (names, companies, metrics). Replace with real partner
 *  quotes before launch — the layout needs nothing else changed. */

/** Initials avatar: personality without stock photos or fake headshots. */
function Avatar({ name, dark }: { name: string; dark?: boolean }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      aria-hidden="true"
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
        dark ? "bg-gradient-brand text-black" : "bg-brand/10 text-brand-text"
      }`}
    >
      {initials}
    </span>
  );
}

function Attribution({ t, dark }: { t: Testimonial; dark?: boolean }) {
  return (
    <figcaption className="flex items-center gap-3">
      <Avatar name={t.name} dark={dark} />
      <div>
        <div
          className={`text-sm font-semibold ${dark ? "text-background" : "text-foreground"}`}
        >
          {t.name}
        </div>
        <div className={`text-xs ${dark ? "text-white/55" : "text-muted"}`}>
          {t.title}, {t.company}
        </div>
      </div>
    </figcaption>
  );
}

function CompactCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-background p-7">
      <div className="flex items-end gap-3">
        <span className="text-gradient-brand text-4xl font-extrabold leading-none tracking-tight">
          {t.metric}
        </span>
        <span className="pb-0.5 text-xs font-medium leading-snug text-muted">
          {t.metricLabel}
        </span>
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
        {t.quote}
      </blockquote>
      <div className="mt-6 border-t border-border pt-4">
        <Attribution t={t} />
      </div>
    </figure>
  );
}

export default async function Testimonials() {
  const data = await getTestimonials();
  const [featured, ...rest] = data.testimonials;

  // Verifiable company facts (not testimonials): same claims the hero and
  // about page carry, real today, anchoring the quotes above them.
  const FACTS = [
    { value: "2019", label: "In-house team since" },
    { value: "100%", label: "White-label delivery" },
    { value: "4", label: "Markets: US, CA, UK, AU" },
  ];

  return (
    <section
      id={`gw-${data.id}`}
      aria-labelledby="testimonials-headline"
      className="relative overflow-hidden border-b border-border bg-surface py-24 text-foreground sm:py-28"
    >
      <div className="container-1200">
        <ScrollFadeIn delay={0.1}>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow text={data.eyebrow} />
            <Headline
              id="testimonials-headline"
              parts={data.headline.parts}
              as="h2"
              className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
              highlightClassName="text-gradient-brand"
            />
            <p className="mt-5 text-base text-muted sm:text-lg">{data.sub}</p>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.2}>
          <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-3">
            {/* Featured voice: dark card, brand aurora, the strongest metric
                rendered huge. Spans two columns so the grid reads as a
                composition, not a template row. */}
            {featured && (
              <figure className="relative isolate flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-foreground p-8 text-background sm:p-10 lg:col-span-2">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(110%_90%_at_15%_0%,rgba(16,185,129,0.28),transparent_60%)]"
                />
                <Quote size={22} aria-hidden="true" className="text-brand" />
                <div className="mt-5 flex flex-wrap items-end gap-x-4 gap-y-2">
                  <span className="text-gradient-brand text-6xl font-extrabold leading-none tracking-tight sm:text-7xl">
                    {featured.metric}
                  </span>
                  <span className="pb-1 text-sm font-medium text-white/60">
                    {featured.metricLabel}
                  </span>
                </div>
                <blockquote className="mt-5 max-w-2xl flex-1 text-lg leading-relaxed text-white/85 sm:text-xl">
                  {featured.quote}
                </blockquote>
                <div className="mt-8 border-t border-white/10 pt-5">
                  <Attribution t={featured} dark />
                </div>
              </figure>
            )}

            {rest[0] && <CompactCard t={rest[0]} />}
            {rest[1] && <CompactCard t={rest[1]} />}
            {rest[2] && <CompactCard t={rest[2]} />}

            {/* Fact band: claims a skeptic can check, not opinions. */}
            <ul className="flex flex-col justify-center gap-6 rounded-2xl border border-brand/25 bg-brand/5 p-7">
              {FACTS.map((f) => (
                <li key={f.label} className="flex items-baseline gap-3">
                  <span className="text-gradient-brand min-w-18 text-3xl font-extrabold leading-none tracking-tight">
                    {f.value}
                  </span>
                  <span className="text-sm font-medium text-foreground/75">
                    {f.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
