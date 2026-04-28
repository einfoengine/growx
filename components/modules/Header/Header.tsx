import Link from "next/link";
import Logo from "@/components/elements/Logo";
import { getHeader } from "@/lib/content";
import MobileMenu from "./MobileMenu";

export default async function Header() {
  const data = await getHeader();

  return (
    <header
      id={data.id}
      className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md"
    >
      <div className="container-1200 flex h-16 items-center justify-between gap-6">
        <Logo id="el-logo-header" tone="dark" width={140} eager />

        <nav
          id={`${data.id}-nav`}
          aria-label="Primary"
          className="hidden lg:flex items-center gap-8"
        >
          <ul className="flex items-center gap-8">
            {data.nav.map((item) => (
              <li key={item.id}>
                <Link
                  id={item.id}
                  href={item.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
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
    </header>
  );
}
