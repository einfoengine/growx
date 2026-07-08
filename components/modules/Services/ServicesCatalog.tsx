"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clapperboard,
  Code,
  Film,
  Funnel,
  Globe,
  Headset,
  MessageSquare,
  PenTool,
  Search,
  Settings2,
  Share2,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  UserPlus,
  Video,
} from "lucide-react";
import BinaryShower from "./BinaryShower";

type IconProps = { size?: number; className?: string };

type Service = {
  n: string;
  title: string;
  desc: string;
  Icon: ComponentType<IconProps>;
  /** Optional real image; falls back to the icon tile when absent. */
  image?: string;
};

type Group = { label: string; Icon: ComponentType<IconProps>; services: Service[] };

const GROUPS: Group[] = [
  {
    label: "Web & Funnels",
    Icon: Globe,
    services: [
      { n: "S01", title: "Website Design & Development", desc: "Full sites, redesigns, landing pages", Icon: Code },
      { n: "S02", title: "Funnel Building", desc: "High-converting funnels and automations", Icon: Funnel },
    ],
  },
  {
    label: "Traffic & Visibility",
    Icon: TrendingUp,
    services: [
      { n: "S03", title: "SEO & AEO", desc: "Search and answer-engine optimization", Icon: Search },
      { n: "S04", title: "Media Buying & PPC", desc: "Meta, Google, paid acquisition", Icon: Target },
    ],
  },
  {
    label: "Content & Social",
    Icon: MessageSquare,
    services: [
      { n: "S05", title: "Content & Copywriting", desc: "Web copy, blogs, email, ads", Icon: PenTool },
      { n: "S06", title: "Social Media Management", desc: "Full-channel posting and engagement", Icon: Share2 },
    ],
  },
  {
    label: "Video",
    Icon: Video,
    services: [
      { n: "S07", title: "Animated Video Production", desc: "Explainers, demos, promos", Icon: Clapperboard },
      { n: "S08", title: "Video Editing", desc: "Long-form and short-form editing", Icon: Film },
    ],
  },
  {
    label: "HighLevel Operations",
    Icon: Settings2,
    services: [
      { n: "S09", title: "HighLevel Client Onboarding", desc: "Done-for-you client setup", Icon: UserPlus },
      { n: "S10", title: "HighLevel Admin Support", desc: "Ongoing platform administration", Icon: Headset },
      { n: "S11", title: "Custom HighLevel Development", desc: "Custom builds and integrations", Icon: Terminal },
    ],
  },
  {
    label: "And Beyond",
    Icon: Sparkles,
    services: [
      { n: "S12", title: "Expanding Catalog", desc: "Everything an agency needs to serve their clients, added on demand", Icon: Sparkles },
    ],
  },
];

const NAV_H = 64; // sticky header height (h-16)
const STEP_VH = 60; // scroll distance allotted per group while pinned

export default function ServicesCatalog() {
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const pinRef = useRef<HTMLDivElement>(null);
  const group = GROUPS[active];

  // Enable the scroll-jack only on large screens.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Map the pin track's scroll position → active group index. A rAF loop reads
  // the track's rect every frame (independent of scroll events firing) and only
  // commits state when the index actually changes.
  useEffect(() => {
    if (!isDesktop) return;

    let raf = 0;
    const loop = () => {
      const el = pinRef.current;
      if (el) {
        const stage = window.innerHeight - NAV_H;
        const travel = el.offsetHeight - stage;
        const rect = el.getBoundingClientRect();
        const p = travel > 0 ? (NAV_H - rect.top) / travel : 0;
        const clamped = Math.min(1, Math.max(0, p));
        const idx = Math.min(GROUPS.length - 1, Math.floor(clamped * GROUPS.length));
        setActive((prev) => (prev === idx ? prev : idx));
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [isDesktop]);

  // Tab click: on desktop, scroll to that group's slice of the pin track.
  const select = (idx: number) => {
    const el = pinRef.current;
    if (!isDesktop || !el) {
      setActive(idx);
      return;
    }
    const stage = window.innerHeight - NAV_H;
    const travel = el.offsetHeight - stage;
    const topPage = el.getBoundingClientRect().top + window.scrollY;
    const targetP = (idx + 0.5) / GROUPS.length;
    window.scrollTo({ top: topPage - NAV_H + targetP * travel, behavior: "smooth" });
  };

  const header = (
    <div className="mx-auto max-w-3xl text-center">
      <p className="eyebrow text-brand">[ Full-stack catalog ]</p>
      <h2
        id="services-headline"
        className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
      >
        Every service you sell, delivered under your brand.
      </h2>
      <p className="mt-5 text-base text-muted sm:text-lg">
        Web, funnels, search, paid media, content, social, and video, plus full
        HighLevel operations. Productized with fixed pricing and clear SLAs,
        ordered in one click, delivered 100% white-label.
      </p>
    </div>
  );

  const tabs = (
    <div
      role="tablist"
      aria-label="Service groups"
      className="flex flex-wrap items-end justify-center gap-x-8 gap-y-2 border-b border-border px-6"
    >
      {GROUPS.map((g, i) => {
        const isActive = i === active;
        return (
          <button
            key={g.label}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => select(i)}
            className={`-mb-px flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 pb-4 text-sm font-semibold tracking-tight transition-colors ${
              isActive
                ? "border-brand text-brand"
                : "border-transparent text-foreground/55 hover:text-foreground"
            }`}
          >
            <g.Icon size={17} />
            {g.label}
          </button>
        );
      })}
    </div>
  );

  const cards = (
    <AnimatePresence mode="wait">
      <motion.ul
        key={group.label}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="flex flex-wrap justify-center gap-5"
      >
        {group.services.map((service) => (
          <li key={service.n} className="w-full sm:w-80 lg:w-96">
            <article className="card-surface group h-full overflow-hidden transition-transform duration-300 hover:-translate-y-1">
              <div className="relative aspect-video overflow-hidden bg-linear-to-br from-brand/15 to-brand-strong/10">
                {service.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={service.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <service.Icon
                    size={40}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-brand transition-transform duration-500 group-hover:scale-110"
                  />
                )}
              </div>
              <div className="p-6 text-center">
                <span className="font-mono text-xs font-bold text-brand">{service.n}</span>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">{service.title}</h3>
                <p className="mt-1.5 text-sm text-muted">{service.desc}</p>
              </div>
            </article>
          </li>
        ))}
      </motion.ul>
    </AnimatePresence>
  );

  return (
    <section
      id="gw-mod-services"
      aria-labelledby="services-headline"
      className="relative isolate border-b border-border bg-background text-foreground"
    >
      {isDesktop ? (
        // Desktop: header scrolls in, then the tabs pin under the nav and the
        // cards step through groups on scroll.
        <>
          <div className="w-full px-6 pt-24 pb-14 sm:px-8 lg:px-12">{header}</div>
          <div
            ref={pinRef}
            className="relative"
            style={{ height: `calc(100vh - ${NAV_H}px + ${GROUPS.length * STEP_VH}vh)` }}
          >
            <div
              className="sticky flex flex-col overflow-hidden"
              style={{ top: NAV_H, height: `calc(100vh - ${NAV_H}px)` }}
            >
              {/* Pinned tab bar with full-width underline. */}
              <div className="relative z-10 bg-background/90 pt-4 backdrop-blur">
                {tabs}
              </div>
              {/* Cards fill the space below, centered, with the shower behind. */}
              <div className="relative flex flex-1 items-center justify-center px-6">
                <BinaryShower className="-z-10 opacity-60 mask-[radial-gradient(ellipse_75%_70%_at_50%_45%,#000,transparent_85%)]" />
                {cards}
              </div>
            </div>
          </div>
        </>
      ) : (
        // Mobile: normal flow with sticky tabs, click to switch.
        <div className="relative w-full px-6 py-24 sm:px-8 sm:py-28">
          <BinaryShower className="-z-10 opacity-60 mask-[radial-gradient(ellipse_75%_65%_at_50%_40%,#000,transparent_85%)]" />
          {header}
          <div className="sticky z-40 mt-12 -mx-6 bg-background/90 pt-3 backdrop-blur sm:-mx-8" style={{ top: NAV_H }}>
            {tabs}
          </div>
          <div className="mt-8">{cards}</div>
        </div>
      )}
    </section>
  );
}
