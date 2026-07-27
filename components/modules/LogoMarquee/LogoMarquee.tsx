import ModuleTitle from "@/components/elements/ModuleTitle";
import { getLogoMarquee } from "@/lib/content";

/** Sister-brand logos. `dark` brands ship on a black background, so their card
 *  is black too and the baked-in background blends seamlessly. */
const LOGOS: Record<string, { src: string; alt: string; dark?: boolean }> = {
  growX: { src: "/assets/logo-black.png", alt: "growX" },
  "GHL Video": { src: "/assets/ghl-video.png", alt: "GHL Video", dark: true },
  socialX: { src: "/assets/socialx.png", alt: "socialX" },
};

export default async function LogoMarquee({
  moduleTitle,
}: { moduleTitle?: string } = {}) {
  const data = await getLogoMarquee();

  return (
    <section
      id={`gw-${data.id}`}
      aria-label={data.label}
      className="relative overflow-hidden border-y border-border bg-background py-14 text-foreground sm:py-16"
    >
      <div className="container-1200">
        {moduleTitle && (
          <ModuleTitle id="gw-logo-marquee-module-title">{moduleTitle}</ModuleTitle>
        )}

        <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-5">
          {data.items.map((name) => {
            const logo = LOGOS[name];
            if (!logo) return null;
            return (
              <div
                key={name}
                // Pinned tiles: light-designed logos on white, dark-baked
                // logos on black — neither follows the theme token flip.
                className={`flex h-24 items-center justify-center rounded-2xl border px-8 transition-transform duration-300 hover:-translate-y-0.5 sm:h-28 ${
                  logo.dark ? "border-white/10 bg-black" : "border-black/8 bg-white"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 w-auto max-w-full object-contain sm:h-9"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
