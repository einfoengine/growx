import React from "react";
import ModuleTitle from "@/components/elements/ModuleTitle";

const ITEMS = [
  "Web Design",
  "Development",
  "Social Media Works",
  "SEO Optimization",
  "App Development",
  "Brand Identity",
];

export default function TextMarquee({ moduleTitle }: { moduleTitle?: string } = {}) {
  return (
    <section
      id="gw-mod-text-marquee"
      aria-label="What we do"
      className="relative overflow-hidden border-y border-border bg-background py-6 sm:py-12"
    >
      {moduleTitle && <ModuleTitle id="gw-text-marquee-module-title">{moduleTitle}</ModuleTitle>}
      <div className="relative flex w-full overflow-hidden mask-[linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-fit animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
          {[...Array(4)].map((_, groupIndex) => (
            // The track renders the list 4× purely so it can loop seamlessly.
            // Only the first copy is exposed; the rest are duplicates and would
            // otherwise make a screen reader announce every service 4 times.
            <div
              key={groupIndex}
              aria-hidden={groupIndex > 0 ? "true" : undefined}
              className="flex shrink-0 items-center"
            >
              {ITEMS.map((item, index) => (
                <div key={`${groupIndex}-${index}`} className="flex items-center">
                  <span className="mx-8 whitespace-nowrap font-semibold uppercase tracking-widest text-muted">
                    {item}
                  </span>
                  {/* Decorative separator — without aria-hidden this is
                      announced as "black four-pointed star" between every item. */}
                  <span aria-hidden="true" className="text-foreground/20 font-black">
                    ✦
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
