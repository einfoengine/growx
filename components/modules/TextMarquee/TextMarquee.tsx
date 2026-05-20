import React from "react";

const ITEMS = [
  "Web Design",
  "Development",
  "Social Media Works",
  "SEO Optimization",
  "App Development",
  "Brand Identity",
];

export default function TextMarquee() {
  return (
    <section id="gw-mod-text-marquee" className="relative overflow-hidden border-y border-border bg-background sm:py-12">
      <div className="relative flex w-full overflow-hidden mask-[linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="flex w-fit animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused]">
          {[...Array(4)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex shrink-0 items-center">
              {ITEMS.map((item, index) => (
                <div key={`${groupIndex}-${index}`} className="flex items-center">
                  <span className="mx-8 whitespace-nowrap font-semibold uppercase tracking-widest text-foreground/40">
                    {item}
                  </span>
                  <span className="text-foreground/20 font-black">✦</span>
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
