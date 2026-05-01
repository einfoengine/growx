"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Clock, Calendar } from "lucide-react";

const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM",
  "03:00 PM", "04:00 PM", "05:00 PM",
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function buildCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const cells: { date: Date | null; current: boolean }[] = [];

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, daysInPrev - i), current: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), current: true });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ date: new Date(year, month + 1, d), current: false });
  }
  return cells;
}

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const calendarDays = buildCalendarDays(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isPastOrToday = (date: Date) => date <= today;
  const isSelected = (date: Date) => selectedDate?.toDateString() === date.toDateString();
  const isToday = (date: Date) => date.toDateString() === today.toDateString();

  useEffect(() => {
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
    window.history.pushState(null, "", window.location.pathname);
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col bg-background"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Book a Discovery Call
              </h2>
              <p className="mt-0.5 text-sm text-muted">
                Let&apos;s discuss your growth potential. Fill in your details and pick a time.
              </p>
            </div>
            <button
              onClick={close}
              className="rounded-full p-2 text-muted hover:bg-white/10 hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X size={22} />
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
            {/* Left: Form */}
            <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 lg:px-14 lg:py-10">
              <form className="mx-auto max-w-xl space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Full Name <span className="text-brand">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address <span className="text-brand">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="text-sm font-medium text-foreground">
                      WhatsApp Number <span className="text-brand">*</span>
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      required
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
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
                      className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
                      placeholder="https://yourcompany.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="social" className="text-sm font-medium text-foreground">
                    Social Profile <span className="text-muted font-normal">(LinkedIn / Twitter)</span>
                  </label>
                  <input
                    type="url"
                    id="social"
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium text-foreground">
                    Anything else we should know?
                  </label>
                  <textarea
                    id="notes"
                    rows={5}
                    className="w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand resize-none transition-colors"
                    placeholder="Tell us a bit about your current challenges and goals..."
                  />
                </div>

                {/* Selected summary */}
                <AnimatePresence>
                  {selectedDate && selectedTime && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="rounded-xl border border-brand/30 bg-brand/5 px-4 py-3 flex items-center gap-3"
                    >
                      <Calendar size={16} className="text-brand shrink-0" />
                      <span className="text-sm text-foreground">
                        <span className="font-medium">{selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
                        {" at "}
                        <span className="font-medium">{selectedTime}</span>
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={!selectedDate || !selectedTime}
                  className="w-full rounded-xl bg-brand px-4 py-4 text-sm font-semibold text-black transition-all hover:scale-[1.02] hover:bg-[#059669] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {selectedDate && selectedTime ? "Confirm Booking" : "Select a Date & Time to Continue"}
                </button>
              </form>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px bg-border shrink-0" />
            <div className="lg:hidden h-px bg-border shrink-0" />

            {/* Right: Calendar */}
            <div className="w-full lg:w-[480px] xl:w-[520px] shrink-0 overflow-y-auto bg-surface px-6 py-8 sm:px-8 lg:py-10">
              {/* Month navigator */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-xl border border-border text-muted hover:text-foreground hover:bg-white/5 transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-base font-semibold text-foreground">
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </span>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-xl border border-border text-muted hover:text-foreground hover:bg-white/5 transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {DAY_NAMES.map(d => (
                  <div key={d} className="text-center text-xs font-medium text-muted py-1">
                    {d}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-y-1">
                {calendarDays.map((cell, i) => {
                  if (!cell.date) return <div key={i} />;
                  const past = isPastOrToday(cell.date);
                  const sel = isSelected(cell.date);
                  const tod = isToday(cell.date);

                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={past || !cell.current}
                      onClick={() => {
                        setSelectedDate(cell.date);
                        setSelectedTime(null);
                      }}
                      className={[
                        "relative mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all",
                        !cell.current ? "opacity-20 cursor-default" :
                        past ? "text-muted/40 cursor-not-allowed" :
                        sel ? "bg-brand text-black shadow-md scale-105" :
                        tod ? "border border-brand/50 text-brand hover:bg-brand/10" :
                        "text-foreground hover:bg-white/8"
                      ].join(" ")}
                    >
                      {cell.date.getDate()}
                    </button>
                  );
                })}
              </div>

              {/* Time slots */}
              <AnimatePresence>
                {selectedDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    className="mt-8"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Clock size={16} className="text-brand" />
                      <span className="text-sm font-semibold text-foreground">
                        Available times for{" "}
                        {selectedDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2.5">
                      {TIME_SLOTS.map(time => {
                        const sel = selectedTime === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedTime(time)}
                            className={[
                              "rounded-xl border px-2 py-2.5 text-sm font-medium transition-all",
                              sel
                                ? "border-brand bg-brand text-black shadow-md scale-105"
                                : "border-border bg-background text-muted hover:border-white/20 hover:text-foreground",
                            ].join(" ")}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!selectedDate && (
                <p className="mt-8 text-center text-sm text-muted">
                  Pick a date above to see available time slots.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
