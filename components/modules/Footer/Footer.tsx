import Link from "next/link";
import Logo from "@/components/elements/Logo";
import MouseGlow from "@/components/elements/MouseGlow";
import CtaBanner from "@/components/modules/CtaBanner";
import { getFooter, getSite } from "@/lib/content";
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
  const [data, site] = await Promise.all([getFooter(), getSite()]);
  const year = new Date().getFullYear();

  return (
    <footer
      id={data.id}
      className="mt-auto w-full bg-(--footer-bg) text-(--footer-fg) relative overflow-hidden"
    >
      <CtaBanner />
      <MouseGlow />
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"
      />
      <div className="container-1200 py-16 relative z-10">
        <div
          id={`${data.id}-top`}
          className="grid gap-10 lg:grid-cols-12 lg:gap-12 pb-12 border-b border-white/10"
        >
          <div id={`${data.id}-brand`} className="lg:col-span-4">
            <Logo id="el-logo-footer" tone="light" width={150} />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-(--footer-muted)">
              {data.brandBlurb}
            </p>
          </div>

          <nav
            id={`${data.id}-cols`}
            aria-label="Footer"
            className="lg:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-4"
          >
            {data.columns.map((col) => (
              <div key={col.id} id={col.id}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.id}>
                      <Link
                        id={link.id}
                        href={link.href}
                        className="text-sm text-(--footer-muted) hover:text-white transition-colors"
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
            <div id={`${data.id}-legal`} className="flex items-center gap-5 text-xs">
              {data.legal.map((link) => (
                <Link
                  key={link.id}
                  id={link.id}
                  href={link.href}
                  className="text-(--footer-muted) hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

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
                    aria-label={s.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full text-(--footer-muted) hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <Glyph className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
