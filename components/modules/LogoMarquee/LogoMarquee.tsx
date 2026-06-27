import type React from "react";
import LogoCloud from "./LogoCloud";
import { getLogoMarquee } from "@/lib/content";

const DARK_TOKENS = {
  "--background": "#070707",
  "--foreground": "#fafafa",
  "--muted": "#a1a1aa",
  "--border": "rgba(255,255,255,0.12)",
  "--surface": "#101010",
} as React.CSSProperties;

export default async function LogoMarquee() {
  const data = await getLogoMarquee();

  return (
    <section
      id={`gw-${data.id}`}
      aria-label={data.label}
      data-nav-theme="dark"
      className="relative overflow-hidden border-y border-border bg-background py-16 text-foreground sm:py-20"
      style={DARK_TOKENS}
    >
      <div className="container-1200">
        <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-white/40">
          {data.label}
        </p>

        <div className="mt-10 sm:mt-12">
          <LogoCloud logos={data.items} />
        </div>
      </div>
    </section>
  );
}
