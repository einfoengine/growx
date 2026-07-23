import type { ReactNode } from "react";

/* ── Step illustrations ────────────────────────────────────────
   Same visual language as the GrowthPillars card art ("What we take off your
   plate"): white cards with low-opacity ink lines and emerald-gradient accents
   on a light ground. All decorative (aria-hidden). One per process step, in
   step order; viewBox matches the GrowthPillars art so proportions feel like
   one family. */

/** 01 — Book a partner call: a scheduled video call, two seats, 30-min pill. */
function CallArt() {
  return (
    <svg viewBox="0 0 240 168" fill="none" aria-hidden="true" className="h-full w-full">
      <defs>
        <linearGradient id="pj-brand-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#10b981" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
      </defs>

      {/* Call window. */}
      <rect x="34" y="30" width="140" height="104" rx="14" fill="#ffffff" stroke="rgba(10,10,10,0.09)" />
      {/* Window chrome dots. */}
      <circle cx="50" cy="44" r="3" fill="rgba(10,10,10,0.14)" />
      <circle cx="60" cy="44" r="3" fill="rgba(10,10,10,0.14)" />
      <circle cx="70" cy="44" r="3" fill="rgba(10,10,10,0.14)" />

      {/* You — big tile. */}
      <rect x="46" y="56" width="72" height="64" rx="10" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.28)" />
      <circle cx="82" cy="78" r="9" fill="rgba(10,10,10,0.28)" />
      <path d="M67 104 a15 12 0 0 1 30 0z" fill="rgba(10,10,10,0.28)" />

      {/* growX — small tile, brand. */}
      <rect x="126" y="56" width="40" height="38" rx="8" fill="url(#pj-brand-a)" />
      <circle cx="146" cy="70" r="6" fill="#ffffff" opacity="0.9" />
      <path d="M136 88 a10 8 0 0 1 20 0z" fill="#ffffff" opacity="0.9" />

      {/* Mic + camera controls. */}
      <circle cx="138" cy="110" r="8" fill="rgba(10,10,10,0.07)" />
      <rect x="135.5" y="105.5" width="5" height="7" rx="2.5" fill="rgba(10,10,10,0.4)" />
      <path d="M134 111 a4 4 0 0 0 8 0 M138 115 v2.5" stroke="rgba(10,10,10,0.4)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <circle cx="158" cy="110" r="8" fill="rgba(10,10,10,0.07)" />
      <rect x="152.5" y="106.5" width="8" height="7" rx="2" fill="rgba(10,10,10,0.4)" />
      <path d="M160.5 109 l3.5 -2 v6 l-3.5 -2z" fill="rgba(10,10,10,0.4)" />

      {/* 30-min pill, straddling the window edge. */}
      <g>
        <rect x="156" y="26" width="56" height="22" rx="11" fill="url(#pj-brand-a)" />
        <circle cx="169" cy="37" r="6" fill="none" stroke="#ffffff" strokeWidth="1.6" />
        <path d="M169 33.5 v3.5 l2.5 1.5" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <text x="180" y="41" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
          30m
        </text>
      </g>

      {/* Calendar check, bottom-left. */}
      <g>
        <rect x="26" y="118" width="34" height="30" rx="7" fill="#ffffff" stroke="rgba(10,10,10,0.12)" />
        <line x1="26" y1="127" x2="60" y2="127" stroke="rgba(10,10,10,0.12)" />
        <path d="M36 136 l4 4 8 -8" stroke="url(#pj-brand-a)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* Sparkle. */}
      <path d="M206 120 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill="#10b981" opacity="0.5" />
    </svg>
  );
}

/** 02 — Order at fixed prices: the service menu, fixed price chips, one added. */
function OrderArt() {
  return (
    <svg viewBox="0 0 240 168" fill="none" aria-hidden="true" className="h-full w-full">
      <defs>
        <linearGradient id="pj-brand-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#10b981" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
      </defs>

      {/* Menu card. */}
      <rect x="36" y="26" width="150" height="116" rx="14" fill="#ffffff" stroke="rgba(10,10,10,0.09)" />

      {/* Three service rows with fixed-price chips; middle row selected. */}
      {[
        { y: 50, w: 56, price: "$490", on: false },
        { y: 84, w: 70, price: "$990", on: true },
        { y: 118, w: 48, price: "$290", on: false },
      ].map((row) => (
        <g key={row.y}>
          <rect x="50" y={row.y - 10} width="10" height="10" rx="3" fill={row.on ? "url(#pj-brand-b)" : "rgba(16,185,129,0.18)"} />
          <rect x="68" y={row.y - 9} width={row.w} height="6" rx="3" fill={row.on ? "rgba(16,185,129,0.28)" : "rgba(10,10,10,0.1)"} />
          <rect x="68" y={row.y + 1} width="38" height="5" rx="2.5" fill="rgba(10,10,10,0.07)" />
          {/* Fixed price chip. */}
          <rect x="142" y={row.y - 11} width="34" height="17" rx="8.5" fill={row.on ? "url(#pj-brand-b)" : "rgba(10,10,10,0.06)"} />
          <text
            x="159"
            y={row.y + 1}
            textAnchor="middle"
            fill={row.on ? "#ffffff" : "rgba(10,10,10,0.45)"}
            fontSize="9"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            {row.price}
          </text>
        </g>
      ))}

      {/* Added-to-order tag, straddling the card. */}
      <g>
        <circle cx="196" cy="84" r="15" fill="url(#pj-brand-b)" />
        <path d="M189 84 l5 5 9 -10" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>

      {/* No-quotes note: crossed-out chat, bottom-left. */}
      <g opacity="0.7">
        <rect x="24" y="120" width="40" height="24" rx="10" fill="rgba(10,10,10,0.06)" />
        <line x1="32" y1="132" x2="56" y2="132" stroke="rgba(10,10,10,0.3)" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="28" y1="142" x2="60" y2="122" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Sparkle. */}
      <path d="M206 34 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill="#10b981" opacity="0.5" />
    </svg>
  );
}

/** 03 — We produce: task board in motion — one shipped, one in progress, gear. */
function ProduceArt() {
  return (
    <svg viewBox="0 0 240 168" fill="none" aria-hidden="true" className="h-full w-full">
      <defs>
        <linearGradient id="pj-brand-c" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#10b981" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
      </defs>

      {/* Board card. */}
      <rect x="30" y="30" width="150" height="112" rx="16" fill="#ffffff" stroke="rgba(10,10,10,0.09)" />

      {/* Task rows with progress bars. */}
      {[
        { y: 54, p: 1, done: true },
        { y: 88, p: 0.65, done: false },
        { y: 122, p: 0.3, done: false },
      ].map((row) => (
        <g key={row.y}>
          {row.done ? (
            <>
              <circle cx="52" cy={row.y} r="9" fill="url(#pj-brand-c)" />
              <path d={`M47.5 ${row.y} l3 3 5 -6`} stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </>
          ) : (
            <circle cx="52" cy={row.y} r="8.5" fill="none" stroke="rgba(16,185,129,0.4)" strokeWidth="2" strokeDasharray={row.p > 0.5 ? "0" : "3 3"} />
          )}
          <rect x="70" y={row.y - 8} width="86" height="6" rx="3" fill="rgba(10,10,10,0.08)" />
          <rect x="70" y={row.y - 8} width={86 * row.p} height="6" rx="3" fill={row.done ? "rgba(16,185,129,0.28)" : "url(#pj-brand-c)"} />
          <rect x="70" y={row.y + 2} width="52" height="5" rx="2.5" fill="rgba(10,10,10,0.07)" />
        </g>
      ))}

      {/* Gear — the fulfillment engine, straddling the edge (same as pillars). */}
      <g transform="translate(184 44)" stroke="url(#pj-brand-c)" strokeWidth="3" strokeLinecap="round">
        <circle cx="0" cy="0" r="15" fill="#ffffff" />
        <circle cx="0" cy="0" r="6" fill="none" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i * Math.PI) / 4;
          return (
            <line
              key={i}
              x1={Math.cos(a) * 15}
              y1={Math.sin(a) * 15}
              x2={Math.cos(a) * 21}
              y2={Math.sin(a) * 21}
            />
          );
        })}
      </g>

      {/* Sparkles. */}
      <path d="M28 120 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill="#10b981" opacity="0.55" />
      <path d="M200 122 l1.5 3.5 3.5 1.5 -3.5 1.5 -1.5 3.5 -1.5 -3.5 -3.5 -1.5 3.5 -1.5z" fill="#10b981" opacity="0.4" />
    </svg>
  );
}

/** 04 — Deliver under your brand: the handoff doc wearing the agency's badge. */
function DeliverArt() {
  return (
    <svg viewBox="0 0 240 168" fill="none" aria-hidden="true" className="h-full w-full">
      <defs>
        <linearGradient id="pj-brand-d" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#10b981" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
      </defs>

      {/* Delivered doc. */}
      <rect x="52" y="26" width="112" height="116" rx="14" fill="#ffffff" stroke="rgba(10,10,10,0.09)" />
      {/* "Your brand" badge on the doc header. */}
      <circle cx="76" cy="50" r="10" fill="url(#pj-brand-d)" />
      <path d="M76 44 l1.8 4 4.2 1.8 -4.2 1.8 -1.8 4 -1.8 -4 -4.2 -1.8 4.2 -1.8z" fill="#ffffff" />
      <rect x="94" y="42" width="52" height="6" rx="3" fill="rgba(10,10,10,0.14)" />
      <rect x="94" y="52" width="34" height="5" rx="2.5" fill="rgba(10,10,10,0.08)" />

      {/* Doc body lines. */}
      <rect x="68" y="72" width="80" height="5" rx="2.5" fill="rgba(10,10,10,0.08)" />
      <rect x="68" y="84" width="66" height="5" rx="2.5" fill="rgba(10,10,10,0.08)" />
      <rect x="68" y="96" width="74" height="5" rx="2.5" fill="rgba(10,10,10,0.08)" />
      {/* Approved stamp row. */}
      <rect x="68" y="112" width="44" height="16" rx="8" fill="rgba(16,185,129,0.14)" stroke="rgba(16,185,129,0.35)" />
      <path d="M76 120 l3 3 6 -7" stroke="#047857" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />

      {/* Send — paper plane up-right, off the doc. */}
      <g>
        <path d="M162 74 l44 -18 -14 40 -10 -14 -20 -8z" fill="url(#pj-brand-d)" />
        <path d="M182 82 l24 -26" stroke="#ffffff" strokeWidth="1.6" opacity="0.8" />
      </g>
      {/* Motion dashes. */}
      <path d="M150 60 h12 M144 70 h10" stroke="rgba(16,185,129,0.5)" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 6" />

      {/* Client heart, bottom-right. */}
      <g>
        <circle cx="186" cy="126" r="13" fill="#ffffff" stroke="rgba(10,10,10,0.1)" />
        <path
          d="M186 132 c-5 -3.6 -7.5 -6.4 -7.5 -9.2 a4 4 0 0 1 7.5 -1.8 a4 4 0 0 1 7.5 1.8 c0 2.8 -2.5 5.6 -7.5 9.2z"
          fill="url(#pj-brand-d)"
        />
      </g>

      {/* Sparkle. */}
      <path d="M40 118 l2 5 5 2 -5 2 -2 5 -2 -5 -5 -2 5 -2z" fill="#10b981" opacity="0.5" />
    </svg>
  );
}

/** In step order — indexed against data/modules/process.json's steps. */
export const STEP_ART: ReactNode[] = [
  <CallArt key="call" />,
  <OrderArt key="order" />,
  <ProduceArt key="produce" />,
  <DeliverArt key="deliver" />,
];
