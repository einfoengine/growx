"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
    <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-background">
      {items.map((item, i) => {
        const isOpen = openId === item.id;
        
        return (
          <div key={item.id} className={`group ${i > 0 ? "border-t border-border" : ""}`}>
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full cursor-pointer items-start justify-between gap-6 px-6 py-5 text-left text-base font-medium text-foreground transition-colors sm:px-8 sm:py-6 sm:text-lg"
            >
              <span>{item.question}</span>
              <span
                aria-hidden="true"
                className={`mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--brand-soft) text-brand transition-transform duration-300 ${
                  isOpen ? "rotate-45 bg-brand text-black" : ""
                }`}
              >
                <Plus size={14} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2 sm:px-8 sm:pb-7">
                    <p className="max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
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
