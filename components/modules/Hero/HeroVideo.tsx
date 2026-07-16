"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type Props = {
  videoId: string;
  title?: string;
};

/** Ambient hero VSL: the YouTube embed autoplays muted and loops like a
 *  background film — no play button, no controls. Sound is opt-in via the
 *  toggle at the bottom left, driven through the IFrame API's postMessage
 *  commands (enablejsapi=1), so no extra YouTube script is loaded. */
export default function HeroVideo({ videoId, title = "growX" }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage(
      JSON.stringify({
        event: "command",
        func: muted ? "unMute" : "mute",
        args: "",
      }),
      "*"
    );
    setMuted((m) => !m);
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-surface shadow-xl shadow-black/6">
      <iframe
        ref={iframeRef}
        className="absolute inset-0 h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
      <button
        type="button"
        onClick={toggleSound}
        aria-label={muted ? "Unmute video" : "Mute video"}
        aria-pressed={!muted}
        className="absolute bottom-4 left-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-brand text-black shadow-lg transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:bottom-6 sm:left-6"
      >
        {muted ? (
          <VolumeX size={18} aria-hidden="true" />
        ) : (
          <Volume2 size={18} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
