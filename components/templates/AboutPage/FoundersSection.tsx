"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Briefcase, Check, GraduationCap, X } from "lucide-react";
import Image from "next/image";
import type { Founder } from "@/lib/content";

const AVATAR_BG: Record<string, string> = {
  emerald: "bg-emerald-100 text-emerald-600",
  violet:  "bg-violet-100 text-violet-600",
  amber:   "bg-amber-100 text-amber-600",
  blue:    "bg-blue-100 text-blue-600",
  rose:    "bg-rose-100 text-rose-600",
  cyan:    "bg-cyan-100 text-cyan-600",
  indigo:  "bg-indigo-100 text-indigo-600",
};

const PLATFORM_LABELS: Record<string, string> = {
  linkedin:  "LinkedIn",
  twitter:   "Twitter / X",
  instagram: "Instagram",
};

type Props = { founders: Founder[] };

export default function FoundersSection({ founders }: Props) {
  const [active, setActive] = useState<Founder | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const modal = (
    <AnimatePresence>
      {active && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-55 bg-black/50 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0 }}
              className="relative w-full max-w-2xl max-h-[90dvh] overflow-y-auto bg-background border border-border shadow-2xl"
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center bg-background/80 text-muted hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Modal header - image strip */}
              <div className="flex items-center gap-0 border-b border-border">
                <div className={`relative h-28 w-28 shrink-0 overflow-hidden ${AVATAR_BG[active.avatarColor] ?? "bg-gray-100 text-gray-600"}`}>
                  {active.image ? (
                    <Image src={active.image} alt={active.name} fill className="object-cover object-top" />
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold">
                      {active.initials}
                    </span>
                  )}
                </div>
                <div className="flex-1 px-6 py-5">
                  <h3 className="text-xl font-semibold text-foreground">{active.name}</h3>
                  <p className="mt-0.5 text-sm font-medium text-brand">{active.role}</p>
                  {active.socials.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-3">
                      {active.socials.map((s) => (
                        <a
                          key={s.platform}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted underline underline-offset-2 hover:text-foreground transition-colors"
                        >
                          {PLATFORM_LABELS[s.platform] ?? s.platform}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="px-8 py-6">
                <p className="text-sm leading-relaxed text-muted">{active.bio}</p>
              </div>

              <div className="border-t border-border" />

              {/* Qualifications */}
              <div className="px-8 py-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap size={14} className="text-brand" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted">Qualifications</span>
                </div>
                <ul className="space-y-2">
                  {active.qualifications.map((q) => (
                    <li key={q} className="flex items-start gap-2.5">
                      <Check size={12} className="mt-0.5 shrink-0 text-brand" />
                      <span className="text-sm text-foreground/80">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border" />

              {/* Experience */}
              <div className="px-8 py-6">
                <div className="flex items-center gap-2 mb-5">
                  <Briefcase size={14} className="text-brand" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted">Experience</span>
                </div>
                <ol className="relative space-y-5 border-l border-border pl-6">
                  {active.experience.map((e) => (
                    <li key={e.id} className="relative">
                      <span className="absolute -left-[25px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border border-border bg-surface" />
                      <p className="text-sm font-semibold text-foreground">{e.role}</p>
                      <p className="text-xs text-muted">{e.company} · {e.period}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className="grid grid-cols-1 border border-border sm:grid-cols-3 divide-y divide-border sm:divide-y-0 sm:divide-x sm:divide-border overflow-hidden">
        {founders.map((f) => {
          const bgClass = AVATAR_BG[f.avatarColor] ?? "bg-gray-100 text-gray-600";
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setActive(f)}
              className="group flex flex-col w-full text-center cursor-pointer transition-colors hover:bg-surface"
            >
              {/* Photo - fills full width of the card, no padding */}
              <div className={`relative w-full aspect-4/3 overflow-hidden ${bgClass}`}>
                {f.image ? (
                  <Image
                    src={f.image}
                    alt={f.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center text-5xl font-bold transition-transform duration-300 group-hover:scale-110">
                    {f.initials}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex flex-col items-center gap-3 px-6 py-6">
                <div>
                  <p className="text-base font-semibold text-foreground">{f.name}</p>
                  <p className="mt-0.5 text-sm text-muted">{f.role}</p>
                </div>

                {f.socials.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-3">
                    {f.socials.map((s) => (
                      <span
                        key={s.platform}
                        onClick={(e) => { e.stopPropagation(); window.open(s.url, "_blank", "noopener noreferrer"); }}
                        className="text-xs text-muted underline underline-offset-2 hover:text-foreground transition-colors"
                      >
                        {PLATFORM_LABELS[s.platform] ?? s.platform}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-xs text-brand opacity-0 group-hover:opacity-100 transition-opacity">
                  View profile →
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {mounted && createPortal(modal, document.body)}
    </>
  );
}
