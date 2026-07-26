"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Play, Sparkles, X } from "lucide-react";
import type { Service, ServiceMedia } from "./servicesData";

type ServiceDetailModalProps = {
  service: Service | null;
  /** Dismiss via close button, backdrop, or Escape. Parent restores focus. */
  onClose: () => void;
  /** Dismiss because the user is booking — hand the scroll lock to BookingModal. */
  onBook: () => void;
};

export default function ServiceDetailModal({
  service,
  onClose,
  onBook,
}: ServiceDetailModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [seenService, setSeenService] = useState(service);
  const panelRef = useRef<HTMLDivElement>(null);
  // When true, the scroll release keeps `overflow: hidden` instead of clearing
  // it — used when handing off to BookingModal, which locks scroll itself on a
  // capture-phase click that fires before this modal unmounts.
  const skipRestoreRef = useRef(false);
  // Latest onClose, read via a ref so the focus/keydown effect can depend only
  // on `service` and never re-run (yanking focus) on unrelated re-renders.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Client-only portal gate: render nothing until mounted so SSR matches the
  // first client render (standard createPortal pattern, see MobileMenu).
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Reset the gallery to the first item when a different service opens —
  // adjusted during render to avoid a setState-in-effect cascade.
  if (service !== seenService) {
    setSeenService(service);
    setActiveIdx(0);
  }

  // Lock body scroll while a service is open. The lock is RELEASED when the
  // exit animation finishes (releaseScroll, via AnimatePresence.onExitComplete)
  // rather than the instant `service` clears, so the page can't scroll behind
  // the modal during its fade-out.
  useEffect(() => {
    if (service) document.body.style.overflow = "hidden";
  }, [service]);

  // Safety net: never leave the page scroll-locked if the modal unmounts
  // entirely (e.g. a route change) while open.
  useEffect(
    () => () => {
      document.body.style.overflow = "unset";
    },
    [],
  );

  // Focus the first control on open, trap Tab within the panel, close on Escape.
  useEffect(() => {
    if (!service) return;
    const panel = panelRef.current;
    if (!panel) return;

    const getFocusable = () =>
      panel.querySelectorAll<HTMLElement>(
        'a[href],button:not([disabled]),video,[tabindex]:not([tabindex="-1"])',
      );

    // Focus the first focusable control (not the tabIndex=-1 container) so the
    // very first Shift+Tab wraps to the end instead of escaping the dialog.
    (getFocusable()[0] ?? panel).focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeEl = document.activeElement;
      const outside = !panel.contains(activeEl);
      if (e.shiftKey && (activeEl === first || outside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (activeEl === last || outside)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [service]);

  if (!mounted) return null;

  const media: ServiceMedia[] =
    service?.media ??
    (service?.image ? [{ type: "image", src: service.image, alt: service.title }] : []);
  const active = media[activeIdx] ?? media[0];

  const handleBook = () => {
    // BookingModal's capture-phase handler already opened + locked scroll.
    skipRestoreRef.current = true;
    onBook();
  };

  // Runs after the exit animation completes. On the book hand-off, BookingModal
  // owns the lock, so keep `overflow: hidden`; otherwise restore scrolling.
  const releaseScroll = () => {
    document.body.style.overflow = skipRestoreRef.current ? "hidden" : "unset";
    skipRestoreRef.current = false;
  };

  return createPortal(
    <AnimatePresence onExitComplete={releaseScroll}>
      {service && (
        <motion.div
          id="gw-service-detail-modal"
          key="svc-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-90 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="svc-modal-title"
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="card-surface relative flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-border focus:outline-none"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-4 shrink-0">
              <div className="min-w-0">
                <p className="font-mono text-xs font-bold text-brand">{service.n}</p>
                <h2
                  id="svc-modal-title"
                  className="mt-1 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
                >
                  {service.title}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="shrink-0 rounded-full p-2 text-muted transition-colors hover:bg-white/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scroll body */}
            <div className="flex-1 overflow-y-auto">
              {/* Media gallery */}
              {media.length > 0 && (
                <div className="px-6 pt-4">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
                    {active.type === "video" ? (
                      <video
                        key={active.src}
                        controls
                        playsInline
                        preload="none"
                        poster={active.poster}
                        className="h-full w-full bg-black object-contain"
                      >
                        <source src={active.src} />
                      </video>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={active.src}
                        alt={active.alt ?? service.title}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>

                  {media.length > 1 && (
                    <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                      {media.map((m, i) => (
                        <button
                          key={`${m.src}-${i}`}
                          type="button"
                          onClick={() => setActiveIdx(i)}
                          aria-label={m.type === "video" ? `Show video ${i + 1}` : `View image ${i + 1}`}
                          aria-current={i === activeIdx}
                          className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition ${
                            i === activeIdx ? "ring-brand" : "ring-transparent hover:ring-border"
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={m.poster ?? m.src}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                          {m.type === "video" && (
                            <span className="absolute inset-0 grid place-items-center bg-black/40">
                              <Play size={16} className="text-white" />
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="px-6 pt-6 pb-6">
                <p className="text-sm leading-relaxed text-muted">{service.long}</p>

                <p className="eyebrow mt-6 text-brand">What your client receives</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {service.checklist.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-snug">
                      <Check size={15} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>

                {service.highlights && service.highlights.length > 0 && (
                  <>
                    <p className="eyebrow mt-7 text-brand">Why growX</p>
                    <ul className="mt-3 space-y-3">
                      {service.highlights.map((h) => (
                        <li key={h.title} className="flex items-start gap-2.5">
                          <Sparkles
                            size={15}
                            className="mt-0.5 shrink-0 text-brand"
                            aria-hidden="true"
                          />
                          <span className="text-sm leading-snug">
                            <span className="font-semibold text-foreground">{h.title}. </span>
                            <span className="text-muted">{h.body}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>

            {/* Footer: book the call, or go straight to the priced catalog —
                the visitor who opened a specific service is the most
                stage-4-ready person on the page. */}
            <div className="flex flex-col gap-2 border-t border-border bg-background/95 px-6 py-4 shrink-0 backdrop-blur sm:flex-row">
              {/* Anchor (not button) so BookingModal's capture-phase handler fires. */}
              <a
                href="#book"
                onClick={handleBook}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-brand px-4 py-3.5 text-sm font-semibold text-black transition-all hover:scale-[1.01] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                Book a meeting
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
              <a
                href="/pricing"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-4 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                See pricing &amp; order
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
