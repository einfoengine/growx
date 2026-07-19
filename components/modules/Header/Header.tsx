import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/elements/Logo";
import { getHeader, getServices } from "@/lib/content";
import MobileMenu from "./MobileMenu";
import HeaderShell from "./HeaderShell";
import ServicesMegaMenu from "./ServicesMegaMenu";

export default async function Header() {
  const [data, services] = await Promise.all([getHeader(), getServices()]);

  return (
    <HeaderShell>
      <div id={data.id} className="container-1200 flex h-16 items-center justify-between gap-6">
        {/* Two logo tones - only one shows per bar theme */}
        <span className="group-data-[theme=dark]/nav:hidden">
          <Logo id="el-logo-header" tone="dark" width={140} eager />
        </span>
        <span className="hidden group-data-[theme=dark]/nav:block">
          <Logo id="el-logo-header-light" tone="light" width={140} eager />
        </span>

        {/* The menu floats bare; the glass treatment lives on the whole bar
            (HeaderShell) and only appears once the page is scrolled. */}
        <nav
          id={`${data.id}-nav`}
          aria-label="Primary"
          className="hidden lg:flex items-center gap-8"
        >
          <ul className="flex items-center gap-8">
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

        <div className="hidden lg:flex">
          <Link
            id={data.cta.id}
            href={data.cta.href}
            // Logo-gradient fill: outside the pill this is the one
            // brand-colored anchor at the top right, legible over any section.
            className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-black/10 transition-[filter] hover:brightness-110"
          >
            {data.cta.label}
            <ArrowRight
              size={15}
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <MobileMenu
          id={`${data.id}-mobile`}
          nav={data.nav}
          cta={data.cta}
        />
      </div>
    </HeaderShell>
  );
}
