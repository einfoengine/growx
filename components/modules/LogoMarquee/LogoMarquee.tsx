import type React from "react";
import { getLogoMarquee } from "@/lib/content";

const DARK_TOKENS = {
  "--background": "#070707",
  "--foreground": "#fafafa",
  "--muted": "#a1a1aa",
  "--border": "rgba(255,255,255,0.12)",
  "--surface": "#101010",
} as React.CSSProperties;

/** Demo brand colours — placeholders until the real logo images are uploaded. */
const BRAND_COLORS: Record<string, string> = {
  Vidiosa: "#8b5cf6",
  "GHL Video": "#ef4444",
  "GHL Animation Studio": "#f59e0b",
  "Biz-Topper": "#3b82f6",
  "Social-X": "#ec4899",
};

export default async function LogoMarquee() {
  const data = await getLogoMarquee();

  return (
    <section
      id={`gw-${data.id}`}
      aria-label={data.label}
      data-nav-theme="dark"
      className="relative overflow-hidden border-y border-border bg-background py-14 text-foreground sm:py-16"
      style={DARK_TOKENS}
    >
      <div className="container-1200">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-white/40">
          {data.label}
        </p>

        {/* Colourful demo logos — replace each block with an <img src=… /> later */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:mt-11 sm:gap-x-14">
          {data.items.map((name) => {
            const color = BRAND_COLORS[name] ?? "#10b981";
            return (
              <div key={name} className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="h-7 w-7 shrink-0 rounded-lg"
                  style={{ backgroundColor: color }}
                />
                <span
                  className="whitespace-nowrap text-lg font-bold tracking-tight sm:text-xl"
                  style={{ color }}
                >
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
