import Image from "next/image";
import Link from "next/link";
import { heroCopy } from "@/data/hero";

const navLinkClass =
  "h-9 items-center justify-center rounded-[6px] px-1 text-sm font-medium leading-none text-[var(--ink-soft)] transition duration-300 hover:-translate-y-0.5 hover:text-[var(--ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--paper)]";

type SiteHeaderProps = {
  logoHref?: string;
  sectionHrefPrefix?: string;
};

export function SiteHeader({
  logoHref = "#top",
  sectionHrefPrefix = "",
}: SiteHeaderProps) {
  const sectionHref = (hash: string) => `${sectionHrefPrefix}${hash}`;

  return (
    <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          className="group inline-flex items-center transition duration-300 hover:translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--paper)]"
          href={logoHref}
          aria-label="Go to portfolio home"
        >
          <Image
            alt={heroCopy.logoAlt}
            className="h-9 w-auto transition duration-300 group-hover:scale-[1.02] sm:h-11"
            height={490}
            priority
            src="/aa-logo.svg"
            width={682}
          />
        </Link>
      </div>

      <nav
        aria-label="Primary navigation"
        className="flex items-center gap-4 sm:gap-6"
      >
        <Link
          className={`hidden sm:inline-flex ${navLinkClass}`}
          href={sectionHref("#clients")}
        >
          {heroCopy.secondaryAction}
        </Link>
        <Link
          className={`hidden sm:inline-flex ${navLinkClass}`}
          href={sectionHref("#praise")}
        >
          {heroCopy.zeroNonsenseAction}
        </Link>
        <Link className={`inline-flex ${navLinkClass}`} href={sectionHref("#work")}>
          <span className="sm:hidden">Work</span>
          <span className="hidden sm:inline">{heroCopy.primaryAction}</span>
        </Link>
        <Link className={`inline-flex ${navLinkClass}`} href="/blog">
          Blog
        </Link>
        <Link className={`inline-flex ${navLinkClass}`} href="/about">
          About
        </Link>
      </nav>
    </header>
  );
}
