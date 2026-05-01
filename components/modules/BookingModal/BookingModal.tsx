"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const NEXT_14_DAYS = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1); // start from tomorrow
    return d;
  });

  const TIME_SLOTS = ["09:00 AM", "10:00 AM", "11:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

  useEffect(() => {
    // Check initial hash on load
    if (window.location.hash === "#book") {
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    }

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (link) {
        const href = link.getAttribute("href");
        if (href === "#book" || href === "/#book") {
          e.preventDefault();
          window.history.pushState(null, "", "#book");
          setIsOpen(true);
          document.body.style.overflow = "hidden";
        }
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === "#book") {
        setIsOpen(true);
        document.body.style.overflow = "hidden";
      } else {
        setIsOpen(false);
        document.body.style.overflow = "unset";
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    window.addEventListener("hashchange", handleHashChange);
    
    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
      window.removeEventListener("hashchange", handleHashChange);
      document.body.style.overflow = "unset";
    };
  }, []);

  const close = () => {
    window.location.hash = "";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-surface p-6 shadow-2xl sm:p-10"
          >
            <button
              onClick={close}
              className="absolute right-6 top-6 rounded-full p-2 text-muted hover:bg-white/10 hover:text-foreground transition-colors z-10"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Book a Discovery Call
              </h2>
              <p className="mt-2 text-sm text-muted">
                Let's discuss your growth potential. Fill out the details below and select a time.
              </p>
            </div>

            <form className="flex flex-col lg:flex-row gap-8 lg:gap-12" onSubmit={(e) => e.preventDefault()}>
              {/* Left Column: Form Fields */}
              <div className="flex-1 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="text-sm font-medium text-foreground">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      required
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="website" className="text-sm font-medium text-foreground">
                      Website URL
                    </label>
                    <input
                      type="url"
                      id="website"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                      placeholder="https://yourcompany.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="social" className="text-sm font-medium text-foreground">
                    Social Profile (LinkedIn/Twitter)
                  </label>
                  <input
                    type="url"
                    id="social"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label htmlFor="notes" className="text-sm font-medium text-foreground">
                    Anything else we should know?
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                    placeholder="Tell us a bit about your current challenges and goals..."
                  />
                </div>
              </div>

              {/* Right Column: Scheduling */}
              <div className="flex-1 flex flex-col space-y-6 rounded-3xl border border-white/5 bg-background/50 p-6">
                <div className="space-y-4">
                  <label className="text-base font-semibold text-foreground">Select a Date & Time *</label>
                  
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide mask-[linear-gradient(to_right,black_90%,transparent)]">
                    {NEXT_14_DAYS.map((date, i) => {
                      const isSelected = selectedDate?.toDateString() === date.toDateString();
                      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
                      const dayNum = date.getDate();
                      const monthName = date.toLocaleDateString("en-US", { month: "short" });
                      
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setSelectedDate(date)}
                          className={`flex shrink-0 flex-col items-center justify-center rounded-2xl border px-4 py-3 min-w-[76px] transition-all ${
                            isSelected 
                              ? "border-brand bg-brand/10 text-brand scale-105 shadow-[0_0_15px_rgba(var(--brand),0.2)]" 
                              : "border-border bg-surface text-muted hover:border-white/20 hover:text-foreground"
                          }`}
                        >
                          <span className="text-xs font-medium uppercase tracking-wider opacity-80">{dayName}</span>
                          <span className="text-2xl font-bold my-0.5">{dayNum}</span>
                          <span className="text-[10px] uppercase tracking-widest opacity-80">{monthName}</span>
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {selectedDate && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-3 gap-3">
                          {TIME_SLOTS.map((time) => {
                            const isSelected = selectedTime === time;
                            return (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setSelectedTime(time)}
                                className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                                  isSelected
                                    ? "border-brand bg-brand text-black shadow-md"
                                    : "border-border bg-surface text-muted hover:border-white/20 hover:text-foreground"
                                }`}
                              >
                                {time}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-auto pt-8">
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-brand px-4 py-4 text-sm font-semibold text-black transition-transform hover:scale-[1.02] hover:bg-[#059669]"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
