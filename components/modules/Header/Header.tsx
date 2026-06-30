import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Logo from "@/components/elements/Logo";
import { getHeader } from "@/lib/content";
import MobileMenu from "./MobileMenu";
import HeaderShell from "./HeaderShell";

export default async function Header() {
  const data = await getHeader();

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

        <nav
          id={`${data.id}-nav`}
          aria-label="Primary"
          className="hidden lg:flex items-center gap-8"
        >
          <ul className="flex items-center gap-8">
            {data.nav.map((item) =>
              item.children ? (
                <li key={item.id} className="relative group">
                  <Link
                    id={item.id}
                    href={item.href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-200 group-hover:rotate-180"
                    />
                  </Link>

                  {/* Dropdown panel */}
                  <div
                    id={`${item.id}-dropdown`}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200"
                  >
                    <ul className="min-w-56 rounded-xl border border-border bg-background p-1.5 shadow-lg shadow-black/5">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            id={child.id}
                            href={child.href}
                            className="block rounded-lg px-3.5 py-2.5 text-sm text-foreground/70 hover:bg-surface hover:text-foreground transition-colors"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.id}>
                  <Link
                    id={item.id}
                    href={item.href}
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
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
            className="inline-flex items-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:opacity-90 transition-opacity"
          >
            {data.cta.label}
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
