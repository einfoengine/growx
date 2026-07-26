"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { GHL_BOOKING_URL, GHL_EMBED_SCRIPT } from "@/lib/config/conversion";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import ModuleTitle from "@/components/elements/ModuleTitle";

const POINTS = [
  "A 30-minute call with our founding team",
  "We pinpoint where fulfillment is capping your growth",
  "A straight answer on whether we're a fit",
  "No pitch deck, and no commitment to book",
];

/** Closing conversion section: the live HighLevel partnership-call calendar,
 *  framed with the pitch on the left. The iframe + GHL script only load once
 *  the section nears the viewport, so it never weighs down the initial page.
 *  The booking modal still handles every other "Book a call" CTA. */
export default function BookingSection({
  moduleTitle,
  noPaddingTop,
}: { moduleTitle?: string; noPaddingTop?: boolean } = {}) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Latch to loaded the first time the calendar nears the viewport. setState
  // fires from the observer callback, not synchronously in the effect body.
  useEffect(() => {
    if (loaded) return;
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          io.disconnect();
        }
      },
      { rootMargin: "500px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;
    if (document.querySelector(`script[src="${GHL_EMBED_SCRIPT}"]`)) return;
    const s = document.createElement("script");
    s.src = GHL_EMBED_SCRIPT;
    s.async = true;
    document.body.appendChild(s);
  }, [loaded]);

  return (
    <section
      id="gw-mod-book"
      // Stays black in BOTH themes — the close matches the home CtaBanner
      // standard (strongest contrast at the moment of action).
      data-nav-theme="dark"
      className="relative isolate overflow-hidden bg-foreground text-background"
    >
      {/* Emerald bloom + faint grid, matching the site's dark CTA treatment. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 mask-[radial-gradient(ellipse_65%_60%_at_50%_0%,#000,transparent_80%)]"
      >
        <div className="absolute -top-40 left-1/2 h-130 w-[760px] -translate-x-1/2 rounded-full bg-(--brand-soft) blur-[140px]" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent_85%)]"
      />

      <div
        className={`container-1200 ${noPaddingTop ? "pb-24 pt-0 sm:pb-28 lg:pb-32" : "py-24 sm:py-28 lg:py-32"}`}
      >
        {moduleTitle && <ModuleTitle id="gw-booking-section-module-title">{moduleTitle}</ModuleTitle>}
        {/* Top: the pitch, centered */}
        <ScrollFadeIn delay={0.1}>
          <div className="mx-auto max-w-2xl text-center">
            <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap items-start justify-center gap-x-8 gap-y-3">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/15">
                    <Check size={12} strokeWidth={3} className="text-brand" aria-hidden="true" />
                  </span>
                  <span className="text-sm leading-relaxed text-white/80 sm:text-[15px]">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollFadeIn>

        {/* Bottom: the live calendar, framed */}
        <ScrollFadeIn delay={0.25}>
          <div
            ref={sentinelRef}
            className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl shadow-black/40 sm:mt-14"
          >
            {loaded ? (
              <iframe
                src={GHL_BOOKING_URL}
                title="growX Partnership Call booking calendar"
                id="gw-home-booking-calendar"
                className="h-168 w-full border-0"
                scrolling="auto"
                // Cross-origin widget can't be styled directly; invert its
                // rendered pixels to fake a dark theme, hue-rotate to keep
                // colors roughly true.
                style={{ filter: "invert(1) hue-rotate(180deg)" }}
              />
            ) : (
              <div className="grid h-168 place-items-center text-sm text-white/50">
                Loading the calendar…
              </div>
            )}
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}
