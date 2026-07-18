"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail } from "lucide-react";
import { useModalA11y } from "@/lib/hooks/useModalA11y";
import { GHL_BOOKING_URL, GHL_EMBED_SCRIPT } from "@/lib/config/conversion";

// Open-state IS the URL hash, read as an external store: no setState-in-effect,
// SSR renders closed, and the initial `#book` deep link just falls out of the
// first client snapshot. pushState does not fire `hashchange`, so writers
// dispatch HASH_EVENT after every pushState.
const HASH_EVENT = "gx-book-hash";

function subscribeHash(cb: () => void) {
  window.addEventListener("hashchange", cb);
  window.addEventListener(HASH_EVENT, cb);
  return () => {
    window.removeEventListener("hashchange", cb);
    window.removeEventListener(HASH_EVENT, cb);
  };
}
const getHashSnapshot = () => window.location.hash === "#book";
const getServerSnapshot = () => false;

/** Booking modal: any `#book` link anywhere on the site opens it. The body is
 *  the LIVE HighLevel "growX Partnership Call" calendar embedded directly, so
 *  a booking made here lands in the CRM with confirmation and reminder emails
 *  firing from the calendar itself — no dead-end form in front of it. */
export default function BookingModal() {
  const isOpen = useSyncExternalStore(subscribeHash, getHashSnapshot, getServerSnapshot);

  // Escape, Tab trap, focus move/restore and the body scroll lock all live here.
  const panelRef = useModalA11y<HTMLDivElement>({ open: isOpen, onClose: close });

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (link) {
        const href = link.getAttribute("href");
        if (href === "#book" || href === "/#book") {
          e.preventDefault();
          window.history.pushState(null, "", "#book");
          window.dispatchEvent(new Event(HASH_EVENT));
        }
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  // HighLevel's embed helper resizes the iframe to the widget's content.
  // Injected once, on first open, so it costs nothing until someone books.
  useEffect(() => {
    if (!isOpen) return;
    if (document.querySelector(`script[src="${GHL_EMBED_SCRIPT}"]`)) return;
    const s = document.createElement("script");
    s.src = GHL_EMBED_SCRIPT;
    s.async = true;
    document.body.appendChild(s);
  }, [isOpen]);

  // ServiceDetailModal hands its scroll lock to us: when the user clicks its
  // "Book a meeting" anchor it deliberately leaves `overflow: hidden` on <body>
  // (see its `skipRestoreRef`) so the page can't scroll during the hand-off, and
  // expects us to clear it. Our own lock is `position: fixed` (useModalA11y), so
  // that leftover `overflow` is ours to release — nothing else owns it.
  useEffect(() => {
    if (isOpen) return;
    document.body.style.overflow = "";
  }, [isOpen]);

  function close() {
    window.history.pushState(null, "", window.location.pathname);
    window.dispatchEvent(new Event(HASH_EVENT));
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex flex-col bg-background focus:outline-none"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0">
            <div>
              <h2
                id="booking-modal-title"
                className="text-xl font-bold tracking-tight text-foreground sm:text-2xl"
              >
                Book a partnership call
              </h2>
              <p className="mt-0.5 text-sm text-muted">
                30 minutes with our founding team. No pitch deck, no pressure.
              </p>
            </div>
            <button
              onClick={close}
              className="rounded-full p-2 text-muted hover:bg-white/10 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-text"
              aria-label="Close"
            >
              <X size={22} />
            </button>
          </div>

          {/* Body: the live HighLevel calendar. Picking a slot books it — the
              calendar sends the confirmation and reminders itself. */}
          <div className="flex-1 overflow-y-auto bg-surface">
            <iframe
              src={GHL_BOOKING_URL}
              title="growX Partnership Call booking calendar"
              id="gx-booking-calendar"
              className="h-full min-h-160 w-full border-0"
              scrolling="auto"
            />
          </div>

          {/* Fallback for anyone the widget fails for. */}
          <div className="flex items-center justify-center gap-2 border-t border-border px-6 py-3 text-sm text-muted shrink-0">
            <Mail size={15} aria-hidden="true" className="text-brand" />
            Trouble booking? Email{" "}
            <a href="mailto:hi@growx.studio" className="link">
              hi@growx.studio
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
