import Link from "next/link";
import { Handshake } from "lucide-react";
import Logo from "@/components/elements/Logo";
import { getHeader, getServices } from "@/lib/content";
import MobileMenu from "./MobileMenu";
import HeaderShell from "./HeaderShell";
import ServicesMegaMenu from "./ServicesMegaMenu";
import PortalLoginLink from "./PortalLoginLink";
import ThemeToggle from "@/components/elements/ThemeToggle";

export default async function Header() {
  const [data, services] = await Promise.all([getHeader(), getServices()]);

  return (
    <HeaderShell>
      <div id={data.id} className="container-1200 flex h-16 items-center justify-between gap-6">
        {/* Two logo tones - only one shows per bar theme */}
        {/* Theme pair via CSS (not the bar's JS state): white logo on the
            dark site, black logo on the light site — correct from the very
            first paint, immune to hydration/state timing. */}
        <span className="light:hidden">
          <Logo id="el-logo-header-light" tone="light" width={140} eager />
        </span>
        <span className="hidden light:block">
          <Logo id="el-logo-header" tone="dark" width={140} eager />
        </span>

        {/* The menu floats bare; the glass treatment lives on the whole bar
            (HeaderShell) and only appears once the page is scrolled. */}
        {/* gap tightens at lg so the 8-item nav + login + CTA fit a 1024px
            viewport without wrapping; roomier again from xl up. */}
        <nav
          id={`${data.id}-nav`}
          aria-label="Primary"
          className="hidden lg:flex items-center gap-5 xl:gap-8"
        >
          <ul className="flex items-center gap-5 xl:gap-8">
            {data.nav.map((item) =>
              item.children ? (
                <ServicesMegaMenu key={item.id} item={item} services={services} />
              ) : (
                <li key={item.id}>
                  <Link
                    id={item.id}
                    href={item.href}
                    className="link-underline text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Right side: cart (always visible), then desktop login + CTA, then
            the mobile menu trigger. */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Glass icon controls (theme + portal) and the labeled partner CTA.
              Theme toggle stays visible everywhere; portal + partner join from
              lg up (below lg they live in the mobile drawer). */}
          <ThemeToggle />
          <div className="hidden lg:flex items-center gap-2">
            <PortalLoginLink iconOnly />
            <Link
              id={data.cta.id}
              href={data.cta.href}
              // "Become a partner": the one brand-colored control at the top
              // right — solid logo-gradient fill, handshake glyph + label.
              className="group inline-flex h-10 items-center gap-2 rounded-full border border-border/60 bg-gradient-brand px-4 text-sm font-semibold text-black shadow-lg shadow-black/10 transition-[filter] hover:brightness-110"
            >
              <Handshake
                size={17}
                aria-hidden="true"
                className="transition-transform group-hover:scale-110"
              />
              {data.cta.label}
            </Link>
          </div>

          <MobileMenu
            id={`${data.id}-mobile`}
            nav={data.nav}
            cta={data.cta}
          />
        </div>
      </div>
    </HeaderShell>
  );
}
