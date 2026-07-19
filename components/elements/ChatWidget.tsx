"use client";

import { useEffect } from "react";
import Script from "next/script";
import { GHL_CHAT_WIDGET } from "@/lib/config/conversion";

// GHL renders its launcher inside an OPEN shadow root, so we can inject a
// style into it to reshape the default circular bubble into an on-brand
// rounded-square with the chat glyph. If GHL ever renames the class this
// simply no-ops and their default launcher shows — nothing breaks.
const LAUNCHER_STYLE = `
.lc_text-widget--bubble{
  border-radius:16px !important;
  background:linear-gradient(135deg,#10b981 0%,#059669 100%) !important;
  box-shadow:0 12px 28px -8px rgba(16,185,129,.55) !important;
  border:none !important;
}
.lc_text-widget--bubble .icon,
.lc_text-widget--bubble svg{ color:#fff !important; fill:#fff !important; }
`;

/** HighLevel chat widget (floating support bubble), loaded site-wide and
 *  lazy-loaded so it never competes with the initial render. Once its shadow
 *  DOM is ready, we restyle the launcher to a branded rounded-square. */
export default function ChatWidget() {
  useEffect(() => {
    let tries = 0;
    const iv = window.setInterval(() => {
      tries += 1;
      const root = document.querySelector("chat-widget")?.shadowRoot;
      if (root?.querySelector(".lc_text-widget--bubble")) {
        if (!root.querySelector("#gw-chat-launcher")) {
          const style = document.createElement("style");
          style.id = "gw-chat-launcher";
          style.textContent = LAUNCHER_STYLE;
          root.appendChild(style);
        }
        window.clearInterval(iv);
      } else if (tries > 60) {
        window.clearInterval(iv); // give up after ~30s; keep GHL's default
      }
    }, 500);
    return () => window.clearInterval(iv);
  }, []);

  return (
    <Script
      src={GHL_CHAT_WIDGET.loaderSrc}
      data-resources-url={GHL_CHAT_WIDGET.resourcesUrl}
      data-widget-id={GHL_CHAT_WIDGET.widgetId}
      strategy="lazyOnload"
    />
  );
}
