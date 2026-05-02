import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/elements/SectionHeader";
import { getPortfolio } from "@/lib/content";

export default async function PortfolioCarousel() {
  const data = await getPortfolio();

  return (
    <section id={data.id} className="relative overflow-hidden bg-background pt-24">
      <div className="container-1200 mb-16">
        <SectionHeader
          eyebrow={data.eyebrow}
          headline={data.headline.parts}
          headlineClassName="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          sub={data.sub}
          subClassName="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg"
          align="center"
        />
        <div className="mt-6 flex justify-center">
          <Link
            href="/works"
            className="text-sm font-medium text-brand transition hover:text-brand/80"
          >
            View full portfolio →
          </Link>
        </div>
      </div>

      <div className="relative flex w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-background to-transparent sm:w-48" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-background to-transparent sm:w-48" />

        <div className="flex w-fit animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
          {[...Array(2)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex shrink-0 items-center">
              {data.items.map((item) => (
                <div
                  key={`${groupIndex}-${item.id}`}
                  className="group relative h-62.5 w-75 overflow-hidden border-y border-r border-border bg-surface sm:h-87.5 sm:w-125 lg:h-112.5 lg:w-162.5"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 translate-y-4 p-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:p-10">
                    <p className="text-2xl font-semibold tracking-tight text-white">{item.title}</p>
                    <p className="mt-1 text-sm text-white/70">{item.client}</p>
                    <span className="mt-3 inline-flex h-8 items-center rounded-full bg-brand px-4 text-xs font-semibold text-black">
                      {item.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
