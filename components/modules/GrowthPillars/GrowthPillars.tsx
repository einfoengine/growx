import type { ReactNode } from "react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  Clock,
  Code,
  Gauge,
  Headset,
  Layers,
  Link2,
  Palette,
  Search,
  Shield,
  TrendingDown,
  TriangleAlert,
  UserX,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import Button from "@/components/elements/Button";
import ModuleTitle from "@/components/elements/ModuleTitle";
import type { HeadlinePart } from "@/lib/content";

/* ── Data mode ─────────────────────────────────────────────────
   The home page renders the hardcoded pillars below (illustrated). Other pages
   reuse this exact section design for their own card data — icon sticker or
   mono label instead of the illustration well, optional checklist points. */

export type GrowthPillarsIcon =
  | "triangle-alert" | "user-x" | "layers" | "trending-down" | "clock"
  | "palette" | "code" | "gauge" | "shield" | "wrench" | "headset"
  | "search" | "bot" | "link-2" | "bar-chart-3";

const GLYPHS: Record<GrowthPillarsIcon, LucideIcon> = {
  "triangle-alert": TriangleAlert,
  "user-x": UserX,
  layers: Layers,
  "trending-down": TrendingDown,
  clock: Clock,
  palette: Palette,
  code: Code,
  gauge: Gauge,
  shield: Shield,
  wrench: Wrench,
  headset: Headset,
  search: Search,
  bot: Bot,
  "link-2": Link2,
  "bar-chart-3": BarChart3,
};

export type GrowthPillarsCard = {
  id: string;
  /** Small mono label over the title, e.g. "Problem 01". */
  label?: string;
  /** Black sticker chip glyph (home ProcessJourney treatment). */
  icon?: GrowthPillarsIcon;
  title: string;
  blurb?: string;
  points?: string[];
};

export type GrowthPillarsData = {
  id: string;
  eyebrow: string;
  headline: { parts: HeadlinePart[] };
  sub: string;
  cards: GrowthPillarsCard[];
  /** Bullet marker for `points` rows: positive check or neutral dot. */
  pointsIcon?: "check" | "dot";
  /** The parallax problem backdrop (home default: on). */
  backdrop?: boolean;
  /** Section ground, for white/surface page alternation. */
  tone?: "surface" | "background";
  /** A SectionTitle module sits directly above and provides the top spacing. */
  noPaddingTop?: boolean;
};

/** Full-bleed background image for the problem section. */
const PROBLEM_BG = "/problem-bg-1.png";

/** The three problems growX removes for a growing agency, framed as the areas
 *  we take over: fulfillment (delivery capacity), client management (the
 *  white-label account layer), and the growth partnership that scales with them.
 *
 *  Creative treatment mirrors the site's ServicesCatalog band — light surface,
 *  the signature faint grid backdrop — and gives each pillar a short line of
 *  copy over a bespoke inline-SVG illustration, so the section reads at a glance
 *  the way the reference three-up does, without any fabricated imagery. */

type Pillar = {
  n: string;
  title: string;
  blurb: string;
  illustration: ReactNode;
};

/* ── Illustrations ─────────────────────────────────────────────
   Decorative, so each is aria-hidden. Emerald accents come from the brand
   token (#10b981 → #047857); neutral lines are low-opacity ink so they sit
   quietly on the light card. Sized to fill the card's lower zone. */

function FulfillmentArt() {
  return (
    <svg viewBox="0 0 240 168" fill="none" aria-hidden="true" className="h-full w-full">
      <defs>
        <linearGradient id="gp-brand-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#10b981" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
      </defs>

      {/* Delivery panel: the agency's asks, checked off under your brand. */}
      <rect x="30" y="30" width="150" height="112" rx="16" fill="#ffffff" stroke="rgba(10,10,10,0.09)" />

      {/* Two shipped rows, one in flight. */}
      {[
        { y: 56, done: true },
        { y: 88, done: true },
        { y: 120, done: false },
      ].map((row) => (
        <g key={row.y}>
          {row.done ? (
            <>
              <circle cx="52" cy={row.y} r="9" fill="url(#gp-brand-a)" />
              <path
                d={`M47.5 ${row.y} l3 3 5 -6`}
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          ) : (
            <circle cx="52" cy={row.y} r="8.5" fill="none" stroke="rgba(10,10,10,0.22)" strokeWidth="2" />
          )}
          <rect
            x="70"
            y={row.y - 8}
            width={row.done ? 86 : 60}
            height="6"
            rx="3"
            fill={row.done ? "rgba(16,185,129,0.28)" : "rgba(10,10,10,0.1)"}
          />
          <rect x="70" y={row.y + 2} width="52" height="5" rx="2.5" fill="rgba(10,10,10,0.07)" />
        </g>
      ))}

      {/* Gear: fulfillment engine, straddling the panel edge. */}
      <g transform="translate(184 44)" stroke="url(#gp-brand-a)" strokeWidth="3" strokeLinecap="round">
        <circle cx="0" cy="0" r="15" fill="#ffffff" />
        <circle cx="0" cy="0" r="6" fill="none" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 15}
              y1={Math.sin(a) * 15}
              x2={Math.cos(a) * 21}
              y2={Math.sin(a) * 21}
            />
          );
        })}
      </g>

      {/* Sparkles. */}
      <path d="M28 120 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill="#10b981" opacity="0.55" />
      <path d="M196 118 l1.5 3.5 3.5 1.5 -3.5 1.5 -1.5 3.5 -1.5 -3.5 -3.5 -1.5 3.5 -1.5z" fill="#10b981" opacity="0.4" />
    </svg>
  );
}

function ClientArt() {
  return (
    <svg viewBox="0 0 240 168" fill="none" aria-hidden="true" className="h-full w-full">
      <defs>
        <linearGradient id="gp-brand-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#10b981" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
      </defs>

      {/* Client message, top-right, with their avatar. */}
      <g>
        <rect x="70" y="26" width="128" height="34" rx="14" fill="#ffffff" stroke="rgba(10,10,10,0.09)" />
        <path d="M196 52 l10 6 -10 4z" fill="#ffffff" stroke="rgba(10,10,10,0.09)" />
        <text x="84" y="47" fill="rgba(10,10,10,0.62)" fontSize="10.5" fontFamily="sans-serif">
          How is my campaign doing?
        </text>
        <circle cx="222" cy="43" r="12" fill="rgba(10,10,10,0.08)" />
        <circle cx="222" cy="39" r="4.2" fill="rgba(10,10,10,0.32)" />
        <path d="M215 50 a7 6 0 0 1 14 0z" fill="rgba(10,10,10,0.32)" />
      </g>

      {/* Your-brand reply, handled by growX under the wall. */}
      <g>
        <circle cx="30" cy="94" r="13" fill="url(#gp-brand-b)" />
        <path d="M30 86 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill="#ffffff" />
        <rect x="50" y="78" width="150" height="34" rx="14" fill="url(#gp-brand-b)" />
        <path d="M52 104 l-10 6 10 4z" fill="#10b981" />
        <text x="64" y="99" fill="#ffffff" fontSize="10.5" fontFamily="sans-serif">
          Your report is on the way.
        </text>
      </g>

      {/* Typing: the conversation keeps going, under your name. */}
      <g>
        <rect x="50" y="122" width="52" height="26" rx="13" fill="#ffffff" stroke="rgba(10,10,10,0.09)" />
        <circle cx="66" cy="135" r="3" fill="#10b981" opacity="0.5" />
        <circle cx="76" cy="135" r="3" fill="#10b981" opacity="0.75" />
        <circle cx="86" cy="135" r="3" fill="#10b981" />
      </g>
    </svg>
  );
}

function GrowthArt() {
  return (
    <svg viewBox="0 0 240 168" fill="none" aria-hidden="true" className="h-full w-full">
      <defs>
        <linearGradient id="gp-brand-c" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#047857" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>

      {/* Baseline. */}
      <line x1="30" y1="140" x2="210" y2="140" stroke="rgba(10,10,10,0.12)" strokeWidth="1.5" />

      {/* Three ascending tiers: Vendor, Team member, Department. */}
      {[
        { x: 46, h: 40, brand: false, label: "Vendor" },
        { x: 108, h: 68, brand: false, label: "Team" },
        { x: 170, h: 100, brand: true, label: "Dept" },
      ].map((bar) => (
        <g key={bar.x}>
          <rect
            x={bar.x}
            y={140 - bar.h}
            width="40"
            height={bar.h}
            rx="9"
            fill={bar.brand ? "url(#gp-brand-c)" : "rgba(16,185,129,0.16)"}
            stroke={bar.brand ? "none" : "rgba(16,185,129,0.3)"}
          />
          <text
            x={bar.x + 20}
            y="154"
            textAnchor="middle"
            fill="rgba(10,10,10,0.4)"
            fontSize="9"
            fontFamily="sans-serif"
          >
            {bar.label}
          </text>
        </g>
      ))}

      {/* Rising trajectory across the tier tops, arrow up-right. */}
      <path
        d="M66 96 L128 68 L190 34"
        stroke="url(#gp-brand-c)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M190 34 l-11 1 M190 34 l1 11" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
      {[
        { x: 66, y: 96 },
        { x: 128, y: 68 },
      ].map((node) => (
        <circle key={node.x} cx={node.x} cy={node.y} r="4" fill="#ffffff" stroke="#10b981" strokeWidth="2.5" />
      ))}
      <circle cx="190" cy="34" r="5" fill="#10b981" />
    </svg>
  );
}

/** Full-bleed background: the image is pinned to the viewport (background
 *  attachment: fixed), so the section scrolls over it for a parallax reveal.
 *  A whitish wash mutes it for readability, and the signature grid adds texture.
 *  (iOS Safari ignores fixed attachment and falls back to a static background.) */
export function ProblemBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Parallax image layer. */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: `url('${PROBLEM_BG}')` }}
      />

      {/* Whitish wash — mutes the image so the copy reads; a touch heavier toward
          the cards at the bottom. Tune the two alpha stops to taste. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.7),rgba(255,255,255,0.86))]" />

      {/* Signature grid texture, softly masked so it has no hard edges. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,10,10,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.05)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_80%_75%_at_50%_40%,#000,transparent_88%)]" />
    </div>
  );
}

const PILLARS: Pillar[] = [
  {
    n: "01",
    title: "Fulfillment",
    blurb:
      "You win work faster than you can deliver it. Our in-house team ships every service under your brand, so capacity never caps your sales.",
    illustration: <FulfillmentArt />,
  },
  {
    n: "02",
    title: "Client management",
    blurb:
      "Client comms, updates, and reporting pull you off growth. On the Department tier we manage your clients under your brand, from first reply to final delivery.",
    illustration: <ClientArt />,
  },
  {
    n: "03",
    title: "Growth partnership",
    blurb:
      "Vendors vanish the moment you scale. growX grows with you through fixed pricing, a dedicated team, and tiers built to expand as you do.",
    illustration: <GrowthArt />,
  },
];

export default function GrowthPillars({
  data,
  moduleTitle,
  noPaddingTop,
}: { data?: GrowthPillarsData; moduleTitle?: string; noPaddingTop?: boolean } = {}) {
  if (data)
    return (
      <GrowthPillarsWithData
        data={noPaddingTop ? { ...data, noPaddingTop: true } : data}
        moduleTitle={moduleTitle}
      />
    );
  return (
    <section
      id="gw-mod-growth-pillars"
      className="relative isolate border-b border-border bg-surface text-foreground"
    >
      {/* Background image. */}
      <ProblemBackground />

      {/* noPaddingTop: a SectionTitle module sits directly above. */}
      <div
        className={`container-1200 px-6 sm:px-8 ${
          noPaddingTop ? "pb-20 pt-0 sm:pb-24" : "py-20 sm:py-24"
        }`}
      >
        {moduleTitle && <ModuleTitle id="gw-growth-pillars-module-title">{moduleTitle}</ModuleTitle>}

        <div className={`grid gap-5 md:grid-cols-3 ${noPaddingTop && !moduleTitle ? "mt-0" : "mt-14"}`}>
          {PILLARS.map((pillar, i) => (
            <ScrollFadeIn key={pillar.n} delay={0.15 + i * 0.1} className="h-full">
              <article id={`gw-pillar-${pillar.n}`} className="group flex h-full flex-col rounded-3xl border border-border bg-background p-7 transition-colors hover:border-brand/40">
                <p className="font-label text-xs font-semibold uppercase tracking-[0.18em] text-brand-text">
                  Problem {pillar.n}
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{pillar.blurb}</p>

                {/* Illustration well: faint grid, subtle brand wash, art on top. */}
                <div className="relative mt-6 h-44 overflow-hidden rounded-2xl border border-border bg-surface">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(10,10,10,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.04)_1px,transparent_1px)] bg-size-[22px_22px]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -top-12 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-(--brand-soft) blur-3xl transition-opacity duration-300 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 p-4">{pillar.illustration}</div>
                </div>
              </article>
            </ScrollFadeIn>
          ))}
        </div>

        {/* Dark CTA band under the three pillars — turns the "we handle it"
            argument into a conversation. Same dark treatment as the site's
            CtaBanner (bg-foreground + brand glow + faint grid), but a
            self-contained rounded box inside this light section. */}
        <ScrollFadeIn delay={0.2}>
          {/* Stays black in both themes (deliberate contrast card). */}
          <div className="relative isolate mt-8 overflow-hidden rounded-xl border border-white/10 bg-foreground px-6 py-10 text-background sm:mt-10 sm:px-12 sm:py-12">
            {/* Brand glow, top-center. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-28 left-1/2 -z-10 h-72 w-170 max-w-none -translate-x-1/2 rounded-full bg-(--brand-soft) blur-[130px]"
            />
            {/* Faint grid, masked to fade out toward the edges. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[56px_56px] mask-[radial-gradient(ellipse_70%_80%_at_50%_0%,#000,transparent_82%)]"
            />

            <div className="relative z-10 flex flex-col items-center gap-7 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:text-left">
              <div className="max-w-2xl">
                <h3 className="text-2xl font-bold leading-[1.15] tracking-tight sm:text-3xl md:text-4xl">
                  Let&apos;s talk about how much more you could{" "}
                  <span className="text-gradient-brand">grow and close</span>.
                </h3>
                <p className="mt-3 text-base text-white/70 sm:text-lg">
                  Book a partner call and we&apos;ll map how growX takes
                  fulfillment, client management, and scale off your plate — so
                  you take on more work and close bigger deals.
                </p>
              </div>
              <div className="shrink-0">
                <Button
                  id="gw-growth-pillars-cta"
                  label="Book a partner call"
                  href="#book"
                  icon={<ArrowRight size={16} />}
                  darkBg
                />
              </div>
            </div>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}

/** The section rendered from caller data — same shell, header treatment, and
 *  card language as the home pillars, minus the illustrations and CTA band. */
function GrowthPillarsWithData({
  data,
  moduleTitle,
}: {
  data: GrowthPillarsData;
  moduleTitle?: string;
}) {
  const {
    backdrop = true,
    tone = "surface",
    pointsIcon = "check",
    noPaddingTop = false,
    cards,
  } = data;
  const cols =
    cards.length >= 5
      ? "sm:grid-cols-2 lg:grid-cols-3"
      : cards.length === 4
        ? "sm:grid-cols-2"
        : "md:grid-cols-3";

  return (
    <section
      id={`gw-${data.id}`}
      className={`relative isolate border-b border-border text-foreground ${
        tone === "surface" ? "bg-surface" : "bg-background"
      }`}
    >
      {backdrop && <ProblemBackground />}

      <div
        className={`container-1200 px-6 sm:px-8 ${
          noPaddingTop ? "pb-20 pt-0 sm:pb-24" : "py-20 sm:py-24"
        }`}
      >
        {moduleTitle && <ModuleTitle id="gw-growth-pillars-module-title">{moduleTitle}</ModuleTitle>}

        <div className={`grid gap-5 ${cols} ${noPaddingTop && !moduleTitle ? "mt-0" : "mt-14"}`}>
          {cards.map((card, i) => {
            const Glyph = card.icon ? GLYPHS[card.icon] : null;
            return (
              <ScrollFadeIn key={card.id} delay={0.15 + (i % 3) * 0.1} className="h-full">
                <article id={`gw-pillar-${card.id}`} className="group flex h-full flex-col rounded-3xl border border-border bg-background p-7 transition-colors hover:border-brand/40">
                  {(Glyph || card.label) && (
                    <div className="flex items-center justify-between">
                      {Glyph && (
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-foreground text-white">
                          <Glyph size={17} aria-hidden="true" />
                        </span>
                      )}
                      {card.label && (
                        <p className="font-label text-xs font-semibold uppercase tracking-[0.18em] text-brand-text">
                          {card.label}
                        </p>
                      )}
                    </div>
                  )}
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">
                    {card.title}
                  </h3>
                  {card.blurb && (
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">{card.blurb}</p>
                  )}
                  {card.points && card.points.length > 0 && (
                    <ul className="mt-4 space-y-2.5 border-t border-border pt-4">
                      {card.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          {pointsIcon === "check" ? (
                            <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-brand/10">
                              <Check
                                size={11}
                                strokeWidth={3}
                                className="text-brand"
                                aria-hidden="true"
                              />
                            </span>
                          ) : (
                            <span
                              aria-hidden="true"
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand/70"
                            />
                          )}
                          <span className="text-sm leading-relaxed text-muted">{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              </ScrollFadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
