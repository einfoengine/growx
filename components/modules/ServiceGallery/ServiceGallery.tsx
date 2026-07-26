import { GROUPS } from "@/components/modules/Services/servicesData";
import ModuleTitle from "@/components/elements/ModuleTitle";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import PortfolioSlideshow from "./PortfolioSlideshow";

/** Bento gallery of the six service groups — the major areas where growX's
 *  support does the work. Two tiles carry a crossfade slideshow of real
 *  portfolio work (advancing on an interval); the rest are text-only panels
 *  (dark / brand / surface) so the grid has rhythm instead of six identical
 *  image cards. Labels and icons are reused from the Services catalog data
 *  (servicesData GROUPS) so the views never drift apart. */

type Tone = "dark" | "brand" | "surface";

type TileConfig = {
  /** Index into GROUPS (label + icon). */
  group: number;
  /** One-line descriptor for the group. */
  desc: string;
  /** Portfolio images to crossfade. Present → slideshow tile; absent → panel. */
  images?: string[];
  /** Milliseconds per slide (varied so tiles don't flip in lockstep). */
  interval?: number;
  /** Panel background for text-only tiles. */
  tone?: Tone;
  /** Responsive bento span classes. */
  span?: string;
};

/* Order matches GROUPS. Only web & social have real portfolio imagery, so they
   get the crossfade; the others are panels. Group 0 is the 2×2 feature. */
const TILES: TileConfig[] = [
  {
    group: 0, // Web & Funnels
    desc: "Conversion-built sites, funnels, and landing pages.",
    images: [
      "/assets/portfolio/web-1.png",
      "/assets/portfolio/web-2.png",
      "/assets/portfolio/web-3.png",
    ],
    interval: 3800,
    span: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    group: 1, // Traffic & Visibility
    desc: "SEO, AEO, and paid media that get you found.",
    tone: "dark",
  },
  {
    group: 2, // Content & Social
    desc: "Copy, content, and social that build presence.",
    images: ["/assets/portfolio/social-1.png", "/assets/portfolio/social-2.png"],
    interval: 4600,
  },
  {
    group: 3, // Video
    desc: "Production and editing — scripted to published.",
    tone: "dark",
  },
  {
    group: 4, // HighLevel Services
    desc: "Onboarding, admin, and custom builds in HighLevel.",
    tone: "surface",
  },
  {
    group: 5, // And Beyond
    desc: "New services on demand, added as fast as you grow.",
    tone: "brand",
    span: "sm:col-span-2 lg:col-span-1",
  },
];

const TONE: Record<Tone, { panel: string; sub: string; chip: string }> = {
  dark: {
    panel: "bg-foreground text-background border-white/10",
    sub: "text-white/70",
    chip: "bg-white/12 text-white ring-1 ring-white/20",
  },
  brand: {
    panel: "bg-gradient-brand text-black border-white/10",
    sub: "text-black/70",
    chip: "bg-black/12 text-black ring-1 ring-black/15",
  },
  surface: {
    panel: "bg-surface text-foreground border-border",
    sub: "text-muted",
    chip: "bg-brand/10 text-brand",
  },
};

const SLIDESHOW_SKIN = {
  panel: "text-background border-white/10",
  sub: "text-white/80",
  chip: "bg-white/15 text-white ring-1 ring-white/25 backdrop-blur",
};

export default function ServiceGallery({
  moduleTitle,
}: {
  moduleTitle?: string;
}) {
  return (
    <section
      id="gw-mod-service-gallery"
      className="relative border-b border-border bg-background py-20 text-foreground sm:py-24 lg:py-28"
    >
      <div className="container-1200">
        {moduleTitle && (
          <ModuleTitle id="gw-service-gallery-module-title">
            {moduleTitle}
          </ModuleTitle>
        )}

        <ScrollFadeIn delay={0.2}>
          <div className="mt-12 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[210px] lg:grid-cols-3">
            {TILES.map(({ group, desc, images, interval, tone, span }) => {
              const g = GROUPS[group];
              const Icon = g.Icon;
              const isSlideshow = Boolean(images?.length);
              const skin = isSlideshow ? SLIDESHOW_SKIN : TONE[tone ?? "surface"];

              return (
                <article
                  key={g.label}
                  // Dark tiles stay dark in both themes — they're the contrast
                  // anchors of the grid against the white background.
                  className={`group relative isolate flex flex-col justify-end overflow-hidden rounded-xl border p-6 ${skin.panel} ${span ?? ""}`}
                >
                  {isSlideshow && (
                    <>
                      <PortfolioSlideshow images={images!} interval={interval} />
                      {/* Legibility gradient over the slides. */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.4)_48%,rgba(0,0,0,0.18)_100%)]"
                      />
                    </>
                  )}

                  {/* Icon chip, top-left. */}
                  <span
                    className={`absolute left-6 top-6 inline-flex h-11 w-11 items-center justify-center rounded-xl ${skin.chip}`}
                  >
                    <Icon size={20} />
                  </span>

                  {/* Copy, pinned to the bottom. */}
                  <div className="relative">
                    <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                      {g.label}
                    </h3>
                    <p className={`mt-1.5 max-w-sm text-sm leading-relaxed ${skin.sub}`}>
                      {desc}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
