"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import MagneticTiltCard from "./MagneticTiltCard";
import ServiceDetailModal from "./ServiceDetailModal";
import { GROUPS, type Service } from "./servicesData";
import { useActiveWhenVisible } from "@/lib/hooks/useActiveWhenVisible";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import Eyebrow from "@/components/elements/Eyebrow";
import Button from "@/components/elements/Button";

const NAV_H = 72; // floating header: 8px top gap + h-16 bar
const STEP_VH = 48; // scroll distance allotted per group while pinned

// Vertical slide: the incoming group rises in from below while the outgoing
// one exits upward (reversed when stepping backwards), so the whole
// full-width content area slides up on every tab change.
const slideVariants = {
  enter: (dir: number) => ({ y: dir * 90, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir: number) => ({ y: dir * -90, opacity: 0 }),
};

export default function ServicesCatalog() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);
  const [detailService, setDetailService] = useState<Service | null>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  // Mirror of `active` for the rAF loop, so it can derive direction without
  // re-subscribing every index change.
  const activeRef = useRef(0);
  // The element that opened the modal, so focus can return to it on close.
  const triggerRef = useRef<HTMLElement | null>(null);
  const group = GROUPS[active];
  // `enabled` must track isDesktop: the pin track only renders on desktop, so
  // on the first pass pinRef.current is null with nothing to observe.
  const trackActive = useActiveWhenVisible(pinRef, { enabled: isDesktop });

  const commit = (idx: number) => {
    if (idx === activeRef.current) return;
    setDirection(idx > activeRef.current ? 1 : -1);
    activeRef.current = idx;
    setActive(idx);
  };

  // Enable the scroll-jack only on large screens.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Map the pin track's scroll position → active group index. The rAF loop is
  // parked whenever the track is off-screen or the tab is hidden.
  useEffect(() => {
    if (!trackActive) return;

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
        commit(idx);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [trackActive]);

  // Tab click: on desktop, scroll to that group's slice of the pin track.
  const select = (idx: number) => {
    const el = pinRef.current;
    if (!isDesktop || !el) {
      commit(idx);
      return;
    }
    const stage = window.innerHeight - NAV_H;
    const travel = el.offsetHeight - stage;
    const topPage = el.getBoundingClientRect().top + window.scrollY;
    const targetP = (idx + 0.5) / GROUPS.length;
    window.scrollTo({ top: topPage - NAV_H + targetP * travel, behavior: "smooth" });
  };

  const openService = (service: Service) => {
    triggerRef.current = document.activeElement as HTMLElement | null;
    setDetailService(service);
  };
  const closeDetail = () => {
    setDetailService(null);
    triggerRef.current?.focus();
  };
  // Booking: BookingModal owns the scroll lock from here, so don't restore focus.
  const handleBook = () => setDetailService(null);

  // Only the header reveals. The pin track below must NOT get an animating
  // transform ancestor: a translateY would skew the rAF loop's rect reads and
  // constrain the sticky stage.
  const header = (
    <ScrollFadeIn delay={0.1}>
    <div className="mx-auto max-w-3xl text-center">
      <Eyebrow text="Full-stack catalog" />
      <h2
        id="services-headline"
        className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
      >
        Every service you sell, delivered under your brand.
      </h2>
      <p className="mt-5 text-base text-muted sm:text-lg">
        Web, funnels, search, paid media, content, social, and video, plus full
        HighLevel services. Productized with fixed pricing and clear SLAs,
        ordered in one click, delivered 100% white-label. One accountable
        in-house team, not a marketplace of gigs.
      </p>
    </div>
    </ScrollFadeIn>
  );

  // Pinned tab bar. Stays on the section's light background as a fixed anchor
  // regardless of the card-area color below it, so it never loses contrast.
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
    <AnimatePresence mode="wait" custom={direction} initial={false}>
      <motion.ul
        key={group.label}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="mx-auto flex w-full flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-5"
      >
        {group.services.map((service) => {
          const extra = service.checklist.length - 3;
          return (
            <li
              key={service.n}
              className="aspect-7/9 w-full max-w-sm sm:w-auto sm:max-w-108 sm:flex-1 sm:basis-0"
            >
              <MagneticTiltCard className="h-full w-full">
              {/* The whole card opens the detail modal — clicks on the inner
                  buttons are theirs, so bubbling is filtered. */}
              <article
                onClick={(e) => {
                  if ((e.target as HTMLElement).closest("button")) return;
                  openService(service);
                }}
                className="group relative h-full w-full cursor-pointer overflow-hidden rounded-2xl border border-border bg-surface"
              >
                {/* Full-bleed image acts as the card background. */}
                {service.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={service.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-brand/15 to-brand-strong/10">
                    <service.Icon size={48} className="text-brand" />
                  </div>
                )}

                {/* Legibility scrim fading to the background over the lower area. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-background from-25% via-background/85 to-transparent"
                />

                {/* Copy sits over the clean lower part of the image. */}
                <div className="absolute inset-x-0 bottom-0 flex flex-col p-5 text-left">
                  <span className="font-mono text-[11px] font-bold text-brand">{service.n}</span>

                  <div className="mt-1 flex items-start justify-between gap-2">
                    <h3 className="min-w-0 text-base font-semibold leading-snug tracking-tight text-foreground lg:text-[17px]">
                      {service.title}
                    </h3>
                    <button
                      type="button"
                      onClick={() => openService(service)}
                      aria-label={`View details for ${service.title}`}
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border bg-background/70 text-muted backdrop-blur transition-colors hover:border-brand hover:bg-brand/10 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-200 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>

                  <p className="mt-1.5 line-clamp-2 text-xs leading-snug text-muted">
                    {service.desc}
                  </p>

                  <ul className="mt-3 space-y-1.5">
                    {service.checklist.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[13px] leading-snug">
                        <Check size={14} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                        <span className="text-foreground/80">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {extra > 0 && (
                    <button
                      type="button"
                      onClick={() => openService(service)}
                      className="mt-2 self-start rounded text-xs font-medium text-brand transition-colors hover:text-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      +{extra} more
                    </button>
                  )}
                </div>
              </article>
              </MagneticTiltCard>
            </li>
          );
        })}
      </motion.ul>
    </AnimatePresence>
  );

  // Dual grid backdrops crossfade with the stage: black hairlines on the
  // light stops, white hairlines on the dark ones.
  const grid = (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(10,10,10,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.05)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_75%_70%_at_50%_45%,#000,transparent_85%)]"
    />
  );

  return (
    <section
      id="gw-mod-services"
      aria-labelledby="services-headline"
      className="relative isolate border-b border-border bg-background text-foreground"
    >
      {grid}
      {isDesktop ? (
        // Desktop: header scrolls in, then the tabs pin under the nav and the
        // groups step through on scroll, each slide rising up into place.
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
              {/* Pinned tab bar. transform-gpu isolates its backdrop-blur so
                  it does not shimmer while cards slide behind it. */}
              <div className="relative z-10 transform-gpu bg-background/90 pt-4 backdrop-blur backface-hidden">{tabs}</div>
              <div className="relative flex flex-1 items-center overflow-hidden">
                <div className="container-1200">{cards}</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        // Mobile: normal flow with sticky tabs, click to switch.
        <div className="relative w-full px-6 py-24 sm:px-8 sm:py-28">
          {header}
          <div
            className="sticky z-40 mt-12 -mx-6 transform-gpu bg-background/90 pt-3 backdrop-blur backface-hidden sm:-mx-8"
            style={{ top: NAV_H }}
          >
            {tabs}
          </div>
          <div className="mt-8 overflow-hidden">{cards}</div>
        </div>
      )}

      {/* Route the price-motivated visitor to the working buy flow — the
          "fixed pricing" claim above is demonstrated on /pricing, not here. */}
      <div className="relative pb-20 pt-2 text-center sm:pb-24">
        <Button label="See fixed prices in the catalog" href="/pricing" variant="secondary" />
      </div>

      <ServiceDetailModal
        service={detailService}
        onClose={closeDetail}
        onBook={handleBook}
      />
    </section>
  );
}
