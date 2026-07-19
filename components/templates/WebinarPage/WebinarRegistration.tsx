"use client";

import { useEffect, useSyncExternalStore } from "react";
import { ArrowRight, CalendarClock, Clock } from "lucide-react";
import Button from "@/components/elements/Button";
import {
  GHL_EMBED_SCRIPT,
  WEBINAR_REGISTRATION_URL,
} from "@/lib/config/conversion";

// A ticking clock as an external store. getSnapshot returns whole seconds so
// repeated calls within the same second compare equal (primitive-by-value),
// which keeps useSyncExternalStore from looping. SSR + first client render
// get 0, so the countdown shows a stable placeholder until hydration.
function subscribe(cb: () => void) {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
}
function getSnapshot() {
  return Math.floor(Date.now() / 1000);
}
function getServerSnapshot() {
  return 0;
}

type Unit = { label: string; value: number };

function splitRemaining(ms: number): Unit[] {
  const total = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];
}

type Props = {
  startsAt: string;
  dateLabel: string;
  durationLabel: string;
};

export default function WebinarRegistration({
  startsAt,
  dateLabel,
  durationLabel,
}: Props) {
  const nowSec = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // HighLevel's embed helper resizes the registration iframe to its content.
  // Injected once, only when a form URL is actually configured.
  useEffect(() => {
    if (!WEBINAR_REGISTRATION_URL) return;
    if (document.querySelector(`script[src="${GHL_EMBED_SCRIPT}"]`)) return;
    const s = document.createElement("script");
    s.src = GHL_EMBED_SCRIPT;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const target = new Date(startsAt).getTime();
  const mounted = nowSec !== 0;
  // Before hydration nowSec is 0, so remaining is a large positive number and
  // the values render as "--" placeholders (mounted gate below).
  const remaining = target - nowSec * 1000;
  const hasEnded = mounted && remaining <= 0;
  const units = splitRemaining(remaining);

  return (
    <div
      id="gw-webinar-register"
      className="rounded-3xl border border-border bg-surface p-6 sm:p-8"
    >
      <div className="flex flex-col gap-1.5 text-sm">
        <span className="inline-flex items-center gap-2 font-medium text-foreground">
          <CalendarClock size={16} className="text-brand" aria-hidden="true" />
          {dateLabel}
        </span>
        <span className="inline-flex items-center gap-2 text-muted">
          <Clock size={16} className="text-brand" aria-hidden="true" />
          {durationLabel}
        </span>
      </div>

      {/* Countdown */}
      {!hasEnded && (
        <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-3">
          {units.map((u) => (
            <div
              key={u.label}
              className="rounded-xl border border-border bg-background px-2 py-3 text-center"
            >
              <span className="block font-mono text-2xl font-bold tabular-nums tracking-tight text-foreground sm:text-3xl">
                {mounted ? String(u.value).padStart(2, "0") : "--"}
              </span>
              <span className="mt-1 block text-[11px] uppercase tracking-[0.14em] text-muted">
                {u.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Registration surface */}
      <div className="mt-6">
        {hasEnded ? (
          <div className="text-center">
            <p className="text-sm text-muted">
              This live session has ended. Book a partner call and we will walk
              you through the same playbook one to one.
            </p>
            <div className="mt-4 flex justify-center">
              <Button
                label="Book a partner call"
                href="#book"
                icon={<ArrowRight size={15} />}
              />
            </div>
          </div>
        ) : WEBINAR_REGISTRATION_URL ? (
          <iframe
            src={WEBINAR_REGISTRATION_URL}
            title="Scale Without Hiring webinar registration"
            id="gx-webinar-form"
            className="min-h-125 w-full rounded-xl border-0 bg-background"
            scrolling="no"
          />
        ) : (
          <div className="text-center">
            <Button
              label="Save my seat"
              href="#book"
              icon={<ArrowRight size={15} />}
              fullWidth
            />
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Seats are limited and confirmed personally to keep the room
              useful. Request yours and we will send the join link.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
