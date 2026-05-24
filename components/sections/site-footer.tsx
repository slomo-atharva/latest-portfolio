import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkle } from "lucide-react";
import { footerCopy } from "@/data/footer";
import { heroCopy } from "@/data/hero";

const footerLinkClass =
  "inline-flex h-9 items-center rounded-[6px] px-1 text-sm font-medium leading-none text-[rgb(255_255_255_/_0.72)] transition duration-300 hover:-translate-y-0.5 hover:text-[var(--paper-bright)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--note-blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--navy)]";

type SiteFooterProps = {
  homeAnchors?: boolean;
};

export function SiteFooter({ homeAnchors = false }: SiteFooterProps) {
  const year = new Date().getFullYear();
  const resolveHref = (href: string) => {
    if (!homeAnchors || href === "#top" || !href.startsWith("#")) {
      return href;
    }

    return `/${href}`;
  };

  return (
    <footer
      aria-labelledby="footer-title"
      className="landing-snap-panel relative isolate overflow-hidden bg-[var(--navy)] px-5 py-10 text-[var(--paper-bright)] sm:px-8 sm:py-12 lg:px-12"
      id="footer"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(135deg,rgb(23_27_47_/_0.98),rgb(33_58_143_/_0.92)_48%,rgb(20_20_22_/_0.96))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(255_255_255_/_0.045)_1px,transparent_1px),linear-gradient(0deg,rgb(255_255_255_/_0.035)_1px,transparent_1px)] bg-[length:34px_34px] opacity-70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(255_255_255_/_0.34),rgb(223_238_255_/_0.44),transparent)]"
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[rgb(255_255_255_/_0.16)] bg-[rgb(255_255_255_/_0.08)] px-3 py-1.5 text-xs font-medium text-[rgb(255_255_255_/_0.72)] shadow-[0_14px_36px_rgb(8_10_20_/_0.24)] backdrop-blur-sm">
              <Sparkle
                aria-hidden="true"
                className="h-3.5 w-3.5 text-[var(--note-blue)]"
                strokeWidth={2.35}
              />
              {footerCopy.kicker}
            </p>

            <h2
              className="mt-4 max-w-2xl text-[clamp(1.85rem,3.6vw,3rem)] font-semibold leading-[1.04] tracking-normal"
              id="footer-title"
            >
              {footerCopy.title}
            </h2>

            <p className="mt-4 max-w-xl text-sm font-light leading-7 text-[rgb(255_255_255_/_0.74)] sm:text-base">
              {footerCopy.description}
            </p>
          </div>

          <div className="flex flex-col justify-between gap-5 lg:items-end lg:pt-1 lg:text-right">
            <div>
              <p className="max-w-md text-sm font-light leading-6 text-[rgb(255_255_255_/_0.7)]">
                {footerCopy.availability}
              </p>

              <ul className="mt-4 flex flex-wrap gap-2 lg:justify-end">
                {footerCopy.signals.map((signal) => (
                  <li
                    className="rounded-full border border-[rgb(255_255_255_/_0.16)] bg-[rgb(255_255_255_/_0.08)] px-3 py-1.5 text-xs font-normal text-[rgb(255_255_255_/_0.76)]"
                    key={signal}
                  >
                    {signal}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                className="group inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-[var(--paper-bright)] bg-[var(--paper-bright)] px-4 text-sm font-medium text-[var(--navy)] shadow-[0_18px_44px_rgb(8_10_20_/_0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--note-blue)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--note-blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--navy)]"
                href={resolveHref(footerCopy.primaryAction.href)}
              >
                <span>{footerCopy.primaryAction.label}</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2.35}
                />
              </Link>

              <Link
                className="inline-flex h-11 items-center justify-center rounded-[8px] border border-[rgb(255_255_255_/_0.18)] bg-[rgb(255_255_255_/_0.08)] px-4 text-sm font-medium text-[var(--paper-bright)] transition duration-300 hover:-translate-y-0.5 hover:bg-[rgb(255_255_255_/_0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--note-blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--navy)]"
                href={resolveHref(footerCopy.secondaryAction.href)}
              >
                {footerCopy.secondaryAction.label}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-t border-[rgb(255_255_255_/_0.14)] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <Link
            aria-label="Back to top"
            className="inline-flex w-fit items-center transition duration-300 hover:translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--note-blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--navy)]"
            href="#top"
          >
            <Image
              alt={heroCopy.logoAlt}
              className="h-9 w-auto brightness-0 invert-[0.96] sepia-[0.08] saturate-[0.5] transition duration-300 hover:scale-[1.02] sm:h-10"
              height={490}
              src="/aa-logo.svg"
              width={682}
            />
          </Link>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-center"
          >
            {footerCopy.links.map((link) => (
              <Link
                className={footerLinkClass}
                href={resolveHref(link.href)}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <p className="text-sm font-light leading-6 text-[rgb(255_255_255_/_0.58)] sm:text-right">
            &copy; {year} Siddhant. {footerCopy.signature}
          </p>
        </div>
      </div>
    </footer>
  );
}
