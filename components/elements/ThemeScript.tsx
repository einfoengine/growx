import Script from "next/script";

/**
 * No-flash theme bootstrap. Sets `<html data-theme>` from the persisted choice
 * BEFORE hydration (next/script beforeInteractive — injected into the initial
 * server HTML and executed ahead of any Next.js code), so the page never
 * flashes the wrong theme on load.
 *
 * Default is "dark" (the site's designed look); a persisted "light" choice wins.
 * The matching interactive control is <ThemeToggle>. Keep the storage key
 * (`growx-theme`) in sync between the two.
 */
export default function ThemeScript() {
  const js = `(function(){try{var t=localStorage.getItem('growx-theme');document.documentElement.dataset.theme=(t==='light'||t==='dark')?t:'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();`;
  return (
    <Script id="growx-theme-bootstrap" strategy="beforeInteractive">
      {js}
    </Script>
  );
}
