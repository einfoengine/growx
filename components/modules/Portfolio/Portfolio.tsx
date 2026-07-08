import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Headline from "@/components/elements/Headline";
import { getPortfolio } from "@/lib/content";

export default async function Portfolio() {
  const data = await getPortfolio();

  return (
    <section
      id={`gw-${data.id}`}
      aria-labelledby="portfolio-headline"
      className="relative overflow-hidden border-b border-border bg-background py-24 text-foreground sm:py-28 lg:py-32"
    >
      <div className="container-1200">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-brand">[ {data.eyebrow} ]</p>
          <Headline
            id="portfolio-headline"
            parts={data.headline.parts}
            as="h2"
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
            highlightClassName="text-gradient-brand"
          />
          <p className="mt-5 text-base text-muted sm:text-lg">{data.sub}</p>
        </div>
      </div>

      {/* Boxed marquee of work tiles, inside the container. */}
      <div className="container-1200 mt-14 sm:mt-16">
        <div className="relative border border-white/10 bg-foreground p-5">
          <div className="overflow-hidden">
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 gap-6 pr-6"
            >
              {data.items.map((item) => (
                <Link
                  key={`${copy}-${item.id}`}
                  href={`/works/${item.slug}`}
                  className="group relative block w-104 shrink-0 overflow-hidden lg:w-136"
                >
                  <div className="relative aspect-4/3 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className="text-xs font-semibold uppercase tracking-widest text-brand">
                        {item.tag}
                      </span>
                      <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-white">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-base text-white/70">{item.client}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container-1200 mt-12 flex justify-center">
        <Link href="/works" className="btn btn-secondary group">
          View full portfolio
          <ArrowRight
            size={16}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </section>
  );
}
