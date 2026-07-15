"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Clock, Calendar, Mail } from "lucide-react";
import { useModalA11y } from "@/lib/hooks/useModalA11y";

// NOTE: These are NOT real availability — it's a static 9am–5pm list with no
// scheduler behind it. A slot showing here means nothing about whether anyone is
// actually free, which is why picking one can't confirm a booking.
// TODO: Replace with live availability from the scheduler (Cal.com, Calendly,
// Google Calendar freebusy, …) and gate the slots on the selected date.
const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM",
  "03:00 PM", "04:00 PM", "05:00 PM",
];

const FIELD_CLASS =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted transition-colors focus:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-text";

/** Visual asterisk for sighted users; screen readers get real words instead. */
function RequiredMark() {
  return (
    <>
      <span aria-hidden="true" className="text-brand">*</span>
      <span className="sr-only">(required)</span>
    </>
  );
}

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
  // There's no scheduler to submit to, so "submitted" only ever means "we told
  // the user the truth about that".
  const [submitted, setSubmitted] = useState(false);

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

  // Escape, Tab trap, focus move/restore and the body scroll lock all live here.
  const panelRef = useModalA11y<HTMLDivElement>({ open: isOpen, onClose: close });

  useEffect(() => {
    if (window.location.hash === "#book") setIsOpen(true);

    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (link) {
        const href = link.getAttribute("href");
        if (href === "#book" || href === "/#book") {
          e.preventDefault();
          window.history.pushState(null, "", "#book");
          setIsOpen(true);
          setSubmitted(false);
        }
      }
    };

    const handleHashChange = () => {
      const open = window.location.hash === "#book";
      setIsOpen(open);
      if (open) setSubmitted(false);
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

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
    setIsOpen(false);
    setSubmitted(false);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send this to the scheduler (see TIME_SLOTS) and only then show a real
    // confirmation. There's no endpoint yet, so the form must not imply one.
    setSubmitted(true);
  };

  // Pre-fills what the user already picked so re-typing it is optional.
  const bookingMailto = `mailto:hi@growx.studio?subject=${encodeURIComponent(
    "Discovery call request",
  )}${
    selectedDate && selectedTime
      ? `&body=${encodeURIComponent(
          `I'd like to book a discovery call on ${selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })} at ${selectedTime}.`,
        )}`
      : ""
  }`;

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
          className="fixed inset-0 z-[100] flex flex-col bg-background focus:outline-none"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4 shrink-0">
            <div>
              <h2
                id="booking-modal-title"
                className="text-xl font-bold tracking-tight text-foreground sm:text-2xl"
              >
                Book a discovery call
              </h2>
              <p className="mt-0.5 text-sm text-muted">
                Let&apos;s discuss your growth potential. Fill in your details and pick a time.
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

          {/* Body */}
          <div className="flex flex-1 overflow-hidden flex-col lg:flex-row">
            {/* Left: Form */}
            <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10 lg:px-14 lg:py-10">
              <form className="mx-auto max-w-xl space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Full Name <RequiredMark />
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className={FIELD_CLASS}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address <RequiredMark />
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className={FIELD_CLASS}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="text-sm font-medium text-foreground">
                      WhatsApp Number <RequiredMark />
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      required
                      className={FIELD_CLASS}
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
                      name="website"
                      className={FIELD_CLASS}
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
                    name="social"
                    className={FIELD_CLASS}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="notes" className="text-sm font-medium text-foreground">
                    Anything else we should know?
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={5}
                    className={`${FIELD_CLASS} resize-none`}
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

                {/* Honest end state: nothing was booked, because there's nothing
                    to book against yet. Say so and hand over a real address. */}
                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      role="status"
                      className="flex items-start gap-3 rounded-xl border border-border bg-surface px-4 py-3.5"
                    >
                      <Mail size={16} className="mt-0.5 shrink-0 text-brand-text" aria-hidden="true" />
                      <p className="text-sm text-muted">
                        <span className="font-medium text-foreground">
                          Online booking isn&apos;t live yet — nothing has been sent.
                        </span>{" "}
                        Email{" "}
                        <a
                          href={bookingMailto}
                          className="font-medium text-brand-text underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-text"
                        >
                          hi@growx.studio
                        </a>{" "}
                        with your preferred time and we&apos;ll confirm a slot that genuinely works.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={!selectedDate || !selectedTime}
                  className="w-full rounded-xl bg-brand px-4 py-4 text-sm font-semibold text-black transition-all hover:scale-[1.02] hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-text disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {selectedDate && selectedTime ? "Request This Time" : "Select a Date & Time to Continue"}
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
                  className="p-2 rounded-xl border border-border text-muted hover:text-foreground hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-text"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="text-base font-semibold text-foreground">
                  {MONTH_NAMES[viewMonth]} {viewYear}
                </span>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-xl border border-border text-muted hover:text-foreground hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-text"
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
                        "relative mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-text",
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
                      {/* Not "Available times" — nothing here is checked against
                          a real calendar (see TIME_SLOTS). */}
                      <span className="text-sm font-semibold text-foreground">
                        Preferred times for{" "}
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
                              "rounded-xl border px-2 py-2.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-text",
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
                  Pick a date above to choose a time.
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
