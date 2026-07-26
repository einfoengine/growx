"use client";

import { useSyncExternalStore } from "react";
import Script from "next/script";

// IDs come from env so no tracking ships until they exist.
// TODO(launch): set both in .env.local / hosting env — see .env.example.
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const CONSENT_KEY = "gx-consent";
const CONSENT_EVENT = "gx-consent-change";

// localStorage as an external store: SSR renders the "ssr" branch (nothing),
// the client snapshot takes over after hydration, and choose() notifies
// subscribers so the component re-renders without setState-in-effect.
function subscribe(cb: () => void) {
  window.addEventListener(CONSENT_EVENT, cb);
  return () => window.removeEventListener(CONSENT_EVENT, cb);
}
function getSnapshot(): "granted" | "denied" | "unset" {
  const v = localStorage.getItem(CONSENT_KEY);
  return v === "granted" || v === "denied" ? v : "unset";
}
function getServerSnapshot(): "ssr" {
  return "ssr";
}

/** Analytics loader + cookie consent. UK/EU traffic makes consent mandatory
 *  (Meta pixel = marketing cookies), so the trackers only load after an
 *  explicit accept, and the choice persists. Renders nothing when no IDs are
 *  configured. */
export default function Analytics() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (!GA_ID && !PIXEL_ID) return null;
  if (consent === "ssr") return null;

  const choose = (value: "granted" | "denied") => {
    localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event(CONSENT_EVENT));
  };

  return (
    <>
      {consent === "granted" && GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}

      {consent === "granted" && PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');`}
        </Script>
      )}

      {consent === "unset" && (
        <div
          id="el-analytics"
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-4 bottom-4 z-90 mx-auto max-w-lg rounded-2xl border border-border bg-background/95 p-5 shadow-2xl shadow-black/15 backdrop-blur-xl"
        >
          <p className="text-sm text-foreground">Cookies, briefly</p>
          <p className="mt-1.5 text-xs leading-relaxed text-muted">
            We use cookies to measure what works and to reach you with relevant
            content. No tracking runs until you accept. See our{" "}
            <a href="/privacy" className="text-brand underline underline-offset-2 hover:text-brand-strong">
              Privacy Policy
            </a>
            .
          </p>
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => choose("granted")}
              className="rounded-full bg-gradient-brand px-5 py-2 text-xs font-semibold text-black transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-text"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => choose("denied")}
              className="rounded-full border border-border px-5 py-2 text-xs font-medium text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-text"
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
