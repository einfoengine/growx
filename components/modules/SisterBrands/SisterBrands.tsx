import ScrollFadeIn from "@/components/elements/ScrollFadeIn";

/** Our family of brands. growX sits alongside its sister brands — one partner,
 *  a whole ecosystem. Logos live in /public/assets. */
const BRANDS: { name: string; src: string; alt: string; tagline: string }[] = [
  {
    name: "growX",
    src: "/assets/growX-black-logo.svg",
    alt: "growX",
    tagline: "Growth marketing & partnerships",
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

export default function SisterBrands() {
  return (
    <section
      id="gw-mod-sister-brands"
      aria-labelledby="sister-brands-headline"
      className="relative overflow-hidden border-b border-border bg-background py-20 text-foreground sm:py-24"
    >
      <div className="container-1200">
        <ScrollFadeIn delay={0.1}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand">Our family of brands</p>
          <h2
            id="sister-brands-headline"
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            One partner, a whole ecosystem
          </h2>
          <p className="mt-5 text-base text-muted sm:text-lg">
            growX is part of a family of {BRANDS.length} specialist brands — partner
            with one, and tap into all of them.
          </p>
        </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.2}>
        <ul className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-3">
          {BRANDS.map((brand) => (
            <li
              key={brand.name}
              className="card flex flex-col items-center gap-5 px-8 py-10 text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex h-12 items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className="h-9 w-auto max-w-[180px] object-contain"
                />
              </div>
              <p className="text-sm text-muted">{brand.tagline}</p>
            </li>
          ))}
        </ul>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
