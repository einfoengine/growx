"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, ArrowLeft } from "lucide-react";
import { useModalA11y } from "@/lib/hooks/useModalA11y";
import { HOW_IT_WORKS_STEPS as STEPS } from "@/components/modules/HowItWorks/steps";

// Open-state IS the URL hash, read as an external store (same pattern as
// BookingModal): any `#how-it-works` link anywhere on the site opens it, SSR
// renders closed, and a deep link just works. pushState does not fire
// `hashchange`, so writers dispatch HASH_EVENT after each pushState.
const HASH = "#how-it-works";
const HASH_EVENT = "gx-hiw-hash";

function subscribeHash(cb: () => void) {
  window.addEventListener("hashchange", cb);
  window.addEventListener(HASH_EVENT, cb);
  return () => {
    window.removeEventListener("hashchange", cb);
    window.removeEventListener(HASH_EVENT, cb);
  };
}
const getHashSnapshot = () => window.location.hash === HASH;
const getServerSnapshot = () => false;

const stepVariants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 40 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -40 }),
};

/** Steps the visitor through the four-step "how it works" story one card at a
 *  time. Fired by the hero's "How it works" button (a `#how-it-works` link) and
 *  reuses the exact step data the home-page timeline renders. */
export default function HowItWorksModal() {
  const isOpen = useSyncExternalStore(subscribeHash, getHashSnapshot, getServerSnapshot);
  const [[idx, dir], setStep] = useState<[number, number]>([0, 1]);
  const panelRef = useModalA11y<HTMLDivElement>({ open: isOpen, onClose: close });

  // Intercept any same-origin `#how-it-works` link and open the modal.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a");
      if (link && link.hash === HASH && link.origin === window.location.origin) {
        e.preventDefault();
        window.history.pushState(null, "", HASH);
        window.dispatchEvent(new Event(HASH_EVENT));
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // Closing rewinds to the first step, so the next open always starts fresh
  // (done here rather than in an effect, which the compiler disallows).
  function close() {
    setStep([0, 1]);
    window.history.pushState(null, "", window.location.pathname);
    window.dispatchEvent(new Event(HASH_EVENT));
  }

  const go = (next: number) =>
    setStep(([cur]) => (next < 0 || next >= STEPS.length ? [cur, dir] : [next, next > cur ? 1 : -1]));

  // Last step hands off to the partner call — the journey's real first step
  // (accounts are activated on the call while portal signup is pre-launch).
  // Setting location.hash fires hashchange, which closes this modal (its hash
  // no longer matches) and opens BookingModal in the same gesture.
  const bookCall = () => {
    close();
    window.location.hash = "#book";
  };

  const step = STEPS[idx];
  const isLast = idx === STEPS.length - 1;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
          className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm sm:p-6"
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="hiw-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            data-nav-theme="dark" data-dark-surface
            className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-foreground text-background shadow-2xl shadow-black/50 focus:outline-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4 shrink-0">
              <h2
                id="hiw-modal-title"
                className="font-label text-[11px] font-semibold uppercase tracking-widest text-brand"
              >
                How it works
              </h2>
              <button
                onClick={close}
                aria-label="Close"
                className="-mr-1.5 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-text"
              >
                <X size={20} />
              </button>
            </div>

            {/* Progress segments (also jump to a step) */}
            <div className="flex items-center gap-2 px-6 pt-6 shrink-0">
              {STEPS.map((s, i) => (
                <button
                  key={s.n}
                  onClick={() => go(i)}
                  aria-label={`Go to step ${i + 1}`}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    i <= idx ? "bg-brand" : "bg-white/15"
                  }`}
                />
              ))}
            </div>

            {/* Step */}
            <div className="relative min-h-56 overflow-hidden px-6 py-8">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={idx}
                  custom={dir}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <span className="font-mono text-5xl font-bold text-gradient-brand">{step.n}</span>
                  <h3 className="mt-4 text-2xl font-bold tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/70">{step.desc}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer nav */}
            <div className="flex items-center justify-between gap-3 border-t border-white/10 px-6 py-4 shrink-0">
              <button
                onClick={() => go(idx - 1)}
                disabled={idx === 0}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition hover:text-white disabled:pointer-events-none disabled:opacity-0"
              >
                <ArrowLeft size={16} aria-hidden="true" /> Back
              </button>
              {isLast ? (
                <button onClick={bookCall} className="btn btn-brand">
                  Book your partner call
                  <ArrowRight size={16} className="ml-1.5" aria-hidden="true" />
                </button>
              ) : (
                <button onClick={() => go(idx + 1)} className="btn btn-brand">
                  Next
                  <ArrowRight size={16} className="ml-1.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
