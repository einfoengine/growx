"use client";

import { useEffect, useState } from "react";

/** Crossfade slideshow: shows one portfolio image at a time and advances to the
 *  next on a fixed interval, fading between them. Stacked <img>s (all preloaded)
 *  toggle opacity, so the swap is a clean dissolve rather than a scroll.
 *  Decorative → the wrapper is aria-hidden. */
export default function PortfolioSlideshow({
  images,
  interval = 4200,
  className = "",
}: {
  images: string[];
  /** Milliseconds each image is shown before advancing. */
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  return (
    <div id={`gw-portfolio-slideshow-${images[0]?.split("/").pop()?.replace(/\.\w+$/, "") ?? "0"}`} aria-hidden="true" className={`absolute inset-0 -z-10 ${className}`}>
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
}
