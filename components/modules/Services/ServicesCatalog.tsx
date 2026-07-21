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
              Every service you sell, delivered under your brand.
            </h2>
            <p className="mt-5 text-base text-muted sm:text-lg">
              Web, funnels, search, paid media, content, social, and video, plus
              full HighLevel services. Productized with fixed pricing and clear
              SLAs, ordered in one click, delivered 100% white-label.
            </p>
          </div>
        </ScrollFadeIn>

        {/* Every service in one view: icon, title, one-line description. */}
        <ScrollFadeIn delay={0.2}>
          <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {SERVICES.map((service) => (
              <li key={service.n}>
                <button
                  type="button"
                  onClick={() => openService(service)}
                  aria-label={`View details for ${service.title}`}
                  className="group flex h-full w-full flex-col rounded-2xl border border-border bg-surface p-5 text-left transition-colors hover:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
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
