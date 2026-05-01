import Image from "next/image";
import Eyebrow from "@/components/elements/Eyebrow";

const PORTFOLIO_ITEMS = [
  { src: "/assets/portfolio/web-1.png", title: "Web Design" },
  { src: "/assets/portfolio/social-1.png", title: "Social Media Design" },
  { src: "/assets/portfolio/web-2.png", title: "Web Development" },
  { src: "/assets/portfolio/social-2.png", title: "Social Media Marketing" },
  { src: "/assets/portfolio/web-3.png", title: "UI/UX Design" },
];

export default function PortfolioCarousel() {
  return (
    <section className="relative overflow-hidden bg-background pt-24">
      <div className="container-1200 mb-16 text-center">
        <Eyebrow text="Our Work" />
        <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Recent Projects
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg">
          A showcase of our high-converting web experiences and engaging social media campaigns.
        </p>
      </div>

      <div className="relative flex w-full overflow-hidden">
        {/* Gradients for fading edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-background to-transparent z-10" />
        
        <div className="flex w-fit animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]">
          {[...Array(2)].map((_, groupIndex) => (
            <div key={groupIndex} className="flex shrink-0 items-center">
              {PORTFOLIO_ITEMS.map((item, index) => (
                <div 
                  key={`${groupIndex}-${index}`} 
                  className="group relative h-[300px] w-[450px] sm:h-[450px] sm:w-[650px] overflow-hidden border-y border-r border-border bg-surface"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 p-8 sm:p-10 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-2xl font-semibold text-white tracking-tight">{item.title}</p>
                    <span className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-brand px-6 text-xs font-semibold text-black transition-transform hover:scale-105">
                      View Project
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
