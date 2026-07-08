"use client";

import { useState } from "react";
import { Play } from "lucide-react";

type Props = {
  videoId: string;
  /** Poster image path. Falls back to the YouTube thumbnail if it fails to load. */
  thumbnail: string;
  title?: string;
};

/** Lightweight YouTube facade: shows a poster with a play button and only
 *  loads the (heavy) YouTube iframe once the user clicks play. */
export default function HeroVideo({ videoId, thumbnail, title = "growX" }: Props) {
  const [playing, setPlaying] = useState(false);
  const fallback = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-black/[0.06]">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full cursor-pointer"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnail}
            onError={(e) => {
              const img = e.currentTarget;
              if (img.src !== fallback) img.src = fallback;
            }}
            alt=""
            className="h-full w-full object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-brand text-background shadow-lg transition-transform duration-300 group-hover:scale-110"
          >
            <Play size={26} className="ml-1 fill-current" />
          </span>
        </button>
      )}
    </div>
  );
}
