import { getLogoMarquee } from "@/lib/content";

export default async function LogoMarquee() {
  const data = await getLogoMarquee();

  return (
    <section
      id={`gw-${data.id}`}
      aria-label={data.label}
      className="relative border-y border-border bg-background"
    >
      {/* Sticks under the fixed header (h-16); next section stacks above via z-index */}
      <div className="sticky top-16 z-40 border-b border-border bg-background/95 py-4 backdrop-blur-md supports-backdrop-filter:bg-background/80">
        <div className="container-1200">
          <p className="text-center text-xs font-medium uppercase tracking-[0.18em] text-muted">
            {data.label}
          </p>
        </div>
      </div>

      <div
        id={`${data.id}-track`}
        className="relative mt-8 flex overflow-hidden pb-12 mask-[linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
      >
        <div className="flex shrink-0 animate-marquee items-center gap-14 px-7">
          {data.items.map((item, i) => (
            <span
              key={`a-${i}`}
              className="whitespace-nowrap font-mono text-2xl font-semibold tracking-tight text-foreground/25 sm:text-3xl"
            >
              {item}
            </span>
          ))}
        </div>
        <div
          aria-hidden="true"
          className="flex shrink-0 animate-marquee items-center gap-14 px-7"
        >
          {data.items.map((item, i) => (
            <span
              key={`b-${i}`}
              className="whitespace-nowrap font-mono text-2xl font-semibold tracking-tight text-foreground/25 sm:text-3xl"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
