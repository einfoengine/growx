"use client";

import { useState } from "react";
import { ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="mx-auto mt-12 max-w-4xl space-y-4">
      {items.map((item, i) => {
        const isOpen = openId === item.id;
        const num = String(i + 1).padStart(2, "0");

        return (
          <div
            key={item.id}
            className={`group overflow-hidden rounded-2xl border bg-background transition-colors ${
              isOpen ? "border-brand/50" : "border-border hover:border-foreground/25"
            }`}
          >
            <button
              type="button"
              id={`${item.id}-trigger`}
              aria-expanded={isOpen}
              aria-controls={`${item.id}-panel`}
              onClick={() => toggle(item.id)}
              className="flex w-full cursor-pointer items-center gap-4 px-5 py-5 text-left sm:gap-5 sm:px-6 sm:py-6"
            >
              {/* Number, in its own bordered box, inline with the title. */}
              <span
                aria-hidden="true"
                className="shrink-0 rounded-lg border border-border px-2.5 py-1.5 font-mono text-xs font-semibold text-muted"
              >
                {num}
              </span>
              <span className="flex-1 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                {item.question}
              </span>
              {/* Arrow, in its own bordered box. */}
              <span
                aria-hidden="true"
                className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  isOpen
                    ? "rotate-180 border-brand text-brand"
                    : "border-border text-foreground/70 group-hover:border-foreground/30"
                }`}
              >
                <ArrowDown size={18} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${item.id}-panel`}
                  role="region"
                  aria-labelledby={`${item.id}-trigger`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-6 sm:px-6 sm:pb-7">
                    <p className="max-w-3xl border-t border-border pt-5 text-sm leading-relaxed text-muted sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
