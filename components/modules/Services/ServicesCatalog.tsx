"use client";

import { useRef, useState } from "react";
import ServiceDetailModal from "./ServiceDetailModal";
import { GROUPS, type Service } from "./servicesData";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import Eyebrow from "@/components/elements/Eyebrow";
import Button from "@/components/elements/Button";

// Flatten the tab groups into a single ordered list (S01…S12) — the catalog
// now shows every service at once instead of stepping through groups.
const SERVICES: Service[] = GROUPS.flatMap((g) => g.services);

// Diamond nodes cap the interior grid crossings. A cell earns a node on its
// bottom-right corner only when it has both a right and a bottom neighbour —
// on the outer right/bottom edge it would be a stray half-node, so it's
// suppressed (this also keeps the last row and last cell clean). "Interior"
// depends on the column count, which reflows 1→2→3→4 across breakpoints (base
// is a single column with no crossings, so nodes are hidden there). The node
// is pinned to the real cell corner (not a percentage), so it stays exactly on
// the join even though the rows are auto-height and therefore unequal.
//
// These must be COMPLETE literal class strings: Tailwind scans source for whole
// utilities, so building `${bp}:block` by interpolation would leave the sm:/md:
// variants uncompiled. Indexed by the 3 breakpoint bits (sm=4, md=2, lg=1).
const DIAMOND_VISIBILITY = [
  "hidden sm:hidden md:hidden lg:hidden", // 0  ·  ·  ·
  "hidden sm:hidden md:hidden lg:block",  // 1  ·  ·  L
  "hidden sm:hidden md:block lg:hidden",  // 2  ·  M  ·
  "hidden sm:hidden md:block lg:block",   // 3  ·  M  L
  "hidden sm:block md:hidden lg:hidden",  // 4  S  ·  ·
  "hidden sm:block md:hidden lg:block",   // 5  S  ·  L
  "hidden sm:block md:block lg:hidden",   // 6  S  M  ·
  "hidden sm:block md:block lg:block",    // 7  S  M  L
];

function diamondVisibility(index: number, total: number): string {
  const sm = index % 2 !== 1 && index < total - 2 ? 4 : 0;
  const md = index % 3 !== 2 && index < total - 3 ? 2 : 0;
  const lg = index % 4 !== 3 && index < total - 4 ? 1 : 0;
  return DIAMOND_VISIBILITY[sm + md + lg];
}

export default function ServicesCatalog() {
  const [detailService, setDetailService] = useState<Service | null>(null);
  // The element that opened the modal, so focus can return to it on close.
  const triggerRef = useRef<HTMLElement | null>(null);

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

  return (
    <section
      id="gw-mod-services"
      aria-labelledby="services-headline"
      className="relative isolate border-b border-border bg-background text-foreground"
    >
      {/* Decorative grid backdrop. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(10,10,10,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.05)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_75%_70%_at_50%_45%,#000,transparent_85%)]"
      />

      <div className="container-1200 px-6 py-20 sm:px-8 sm:py-24">
        <ScrollFadeIn delay={0.1}>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow text="Full-stack catalog" />
            <h2
              id="services-headline"
              className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
            >
              Every service you sell,{" "}
              <span className="text-gradient-brand">delivered under your brand.</span>
            </h2>
            <p className="mt-5 text-base text-muted sm:text-lg">
              Freelancer patchworks miss deadlines, drift off-brand, and cap
              what you can sell. One in-house team covers all twelve under
              fixed pricing, so every ask becomes revenue, not a scramble.
            </p>
          </div>
        </ScrollFadeIn>

        {/* Every service in one view: icon, title, one-line description.
            One bordered block, not separate cards: a real 1px border draws the
            outer frame (rounded-xl → crisp rounded corners, unlike a bg-clip
            frame which leaves a square subpixel nub under overflow-hidden), and
            the interior seams are the container's bg-border showing through 1px
            gaps (gap-px). overflow-hidden clips the corner cells to the round.
            Each interior seam-crossing is capped by a small diamond pinned to
            the owning cell's real bottom-right corner, so it lands exactly on
            the join even though the rows are auto-height. */}
        <ScrollFadeIn delay={0.2}>
          <ul className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {SERVICES.map((service, i) => (
              <li key={service.n} className="relative">
                <button
                  type="button"
                  onClick={() => openService(service)}
                  aria-label={`View details for ${service.title}`}
                  className="group flex h-full w-full flex-col bg-background p-6 text-left transition-colors hover:bg-surface focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 transition-colors group-hover:bg-brand/15">
                    <service.Icon size={18} className="text-brand" />
                  </span>
                  <h3 className="mt-4 text-base font-semibold leading-snug tracking-tight text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-muted">
                    {service.desc}
                  </p>
                </button>
                {/* Diamond centred on this cell's bottom-right corner — the
                    exact interior crossing. z-10 lifts it above later cells'
                    fills; the <li> keeps z-auto so the node paints in the
                    grid's stacking context and never hides behind a neighbour. */}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute bottom-0 right-0 z-10 h-2 w-2 translate-x-1/2 translate-y-1/2 rotate-45 border border-border bg-background ${diamondVisibility(i, SERVICES.length)}`}
                />
              </li>
            ))}
          </ul>
        </ScrollFadeIn>

        {/* Route the price-motivated visitor to the working buy flow — the
            "fixed pricing" claim above is demonstrated on /pricing, not here. */}
        <div className="mt-12 text-center">
          <Button label="See fixed prices in the catalog" href="/pricing" variant="secondary" />
        </div>
      </div>

      <ServiceDetailModal
        service={detailService}
        onClose={closeDetail}
        onBook={handleBook}
      />
    </section>
  );
}
