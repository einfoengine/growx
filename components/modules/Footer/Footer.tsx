import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import Logo from "@/components/elements/Logo";
import MouseGlow from "@/components/elements/MouseGlow";
import CtaBanner from "@/components/modules/CtaBanner";
import SectionTitle from "@/components/modules/SectionTitle/SectionTitle";
import FooterWatermark from "./FooterWatermark";
import { getCtaBanner, getFooter, getSite } from "@/lib/content";
import type { SocialIcon } from "@/lib/content";

type SocialGlyphProps = { className?: string };

function LinkedInGlyph({ className }: SocialGlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function InstagramGlyph({ className }: SocialGlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookGlyph({ className }: SocialGlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.494v-9.294H9.691v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
    </svg>
  );
}

function YouTubeGlyph({ className }: SocialGlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const SOCIAL_GLYPHS: Record<SocialIcon, (p: SocialGlyphProps) => React.ReactElement> = {
  linkedin: LinkedInGlyph,
  instagram: InstagramGlyph,
  facebook: FacebookGlyph,
  youtube: YouTubeGlyph,
};

export default async function Footer() {
  const [data, site, ctaBanner] = await Promise.all([getFooter(), getSite(), getCtaBanner()]);
  const year = new Date().getFullYear();

  return (
    <footer
      id={data.id}
      // `overflow-clip` (not `hidden`) still clips the glow bleed but doesn't
      // create a scroll container, which would break the sticky watermark below.
      className="mt-auto w-full bg-(--footer-bg) text-(--footer-fg) relative overflow-clip"
    >
      {/* Hero-family backdrop: the same scene image as the hero, under a heavy
          overlay so the footer content stays fully legible. Theme pair — dark
          scene + near-black wash normally, light scene + white wash in light
          mode. Sits at the very back (z-0); every content block above is
          positioned. (CtaBanner keeps its own solid band by design.) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-dark.png"
          alt=""
          loading="lazy"
          className="h-full w-full object-cover object-center light:hidden"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-white.png"
          alt=""
          loading="lazy"
          className="hidden h-full w-full object-cover object-center light:block"
        />
        {/* Hero-style scrim (not a flat wash): solid at the seams, open in the
            middle so the scene actually shows through. */}
        <div className="absolute inset-0 light:hidden bg-[linear-gradient(to_bottom,rgba(10,10,10,0.94)_0%,rgba(10,10,10,0.55)_45%,rgba(10,10,10,0.78)_100%)]" />
        <div className="hidden light:block absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.6)_45%,rgba(255,255,255,0.82)_100%)]" />
      </div>
      <CtaBanner
        data={ctaBanner}
        title={
          <SectionTitle
            id="gw-cta-banner-title"
            eyebrow={ctaBanner.eyebrow}
            headline={ctaBanner.headline.parts}
            sub={ctaBanner.sub}
          />
        }
      />
      <MouseGlow />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[48px_48px]"
      />
      {/* Brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/3 z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/10 blur-[130px]"
      />
      {/* CtaBanner ends in ~128px of its own padding and this block opens with
          64px more, on an identical near-black background — without a rule the
          two zones read as one dead void. The divider matches the one under the
          nav grid below. */}
      <div className="container-1200 relative z-10 border-t border-white/10 pt-16 pb-10">
        {/* Glass panel: the semi-transparent fill + backdrop blur read against
            the grid, glow, and the sticky watermark sliding underneath. */}
        <div
          id={`${data.id}-top`}
          className="grid gap-10 rounded-2xl border border-white/10 bg-white/4 p-8 backdrop-blur-md sm:p-10 lg:grid-cols-12 lg:gap-12"
        >
          <div id={`${data.id}-brand`} className="lg:col-span-4">
            {/* Theme pair: white logo on the dark footer, black on the light one. */}
            <span className="light:hidden">
              <Logo id="el-logo-footer" tone="light" width={150} />
            </span>
            <span className="hidden light:block">
              <Logo id="el-logo-footer-dark" tone="dark" width={150} />
            </span>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-(--footer-muted)">
              {data.brandBlurb}
            </p>

            {/* Email is the one contact channel that actually reaches a human
                today, so it gets its own line rather than sitting third in a
                link column at the same weight as a nav item. */}
            <a
              id={`${data.id}-email`}
              href={`mailto:${site.email}`}
              className="group mt-6 inline-flex items-center gap-2.5 text-base font-semibold text-(--footer-fg) transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:text-lg"
            >
              <Mail size={18} className="shrink-0 text-brand" aria-hidden="true" />
              {site.email}
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="shrink-0 text-(--footer-muted) transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
              />
            </a>
            <p className="mt-2 text-xs text-(--footer-muted)">
              We reply within one business day.
            </p>

            <span className="mt-6 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-(--footer-fg)">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-brand opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-brand" />
              </span>
              Available for new partners
            </span>
          </div>

          <nav
            id={`${data.id}-cols`}
            aria-label="Footer"
            className="lg:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {data.columns.map((col) => (
              <div key={col.id} id={col.id}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-(--footer-fg)">
                  {col.title}
                </h3>
                {/* py on the link (not the li) grows the tap target to ~28px
                    without the looser rhythm that padding the row would give. */}
                <ul className="mt-3 space-y-1">
                  {col.links.map((link) => (
                    <li key={link.id}>
                      <Link
                        id={link.id}
                        href={link.href}
                        className="link-underline inline-block py-1 text-sm text-(--footer-muted) transition-colors hover:text-(--footer-fg) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div
          id={`${data.id}-bottom`}
          className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-xs text-(--footer-muted)">
            © {year} {site.legalName}. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {data.legal.length > 0 && (
              <div id={`${data.id}-legal`} className="flex items-center gap-5 text-xs">
                {data.legal.map((link) => (
                  <Link
                    key={link.id}
                    id={link.id}
                    href={link.href}
                    className="link-underline text-(--footer-muted) hover:text-(--footer-fg) transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            <div id={`${data.id}-social`} className="flex items-center gap-3">
              {site.social.map((s) => {
                const Glyph = SOCIAL_GLYPHS[s.icon];
                return (
                  <a
                    key={s.id}
                    id={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} (opens in a new tab)`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-(--footer-muted) transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand/10 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <Glyph className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Giant brand watermark, revealed with a slow parallax as you reach the
          end of the page (see FooterWatermark). */}
      <FooterWatermark name={site.name} />
    </footer>
  );
}
