import { ArrowDown, Sparkle } from "lucide-react";
import { heroCopy } from "@/data/hero";
import { ActionLink } from "@/components/ui/action-link";
import { HeroHeadline } from "@/components/motion/hero-headline";
import { HoverEyes } from "@/components/motion/hover-eyes";
import { HeroStickyNotes } from "@/components/sections/hero-sticky-notes";
import { SiteHeader } from "@/components/sections/site-header";

export function HeroSection() {
  const reflectionBand = heroCopy.reflection.join(" ");

  return (
    <>
      <SiteHeader />

      <section
        className="landing-snap-panel relative isolate min-h-svh overflow-hidden bg-[var(--paper)] text-[var(--ink)]"
        id="top"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.94),rgba(248,250,252,0.78)_45%,rgba(248,250,252,0.94)_78%)]" />
        <div className="hero-dot-grid absolute inset-x-0 top-0 h-full opacity-65" />

        <HeroStickyNotes />

        <div className="relative z-20 mx-auto flex min-h-svh w-full max-w-5xl items-center justify-center px-6 py-28 sm:px-10">
          <div className="relative flex w-full max-w-5xl flex-col items-center text-center">
            <HeroHeadline
              className="max-w-5xl text-[clamp(2.35rem,9.5vw,3.4rem)] font-semibold leading-[0.98] tracking-normal text-[var(--ink)] drop-shadow-[0_16px_44px_rgba(15,23,42,0.08)] sm:text-[clamp(3.8rem,6vw,5.25rem)]"
              lines={heroCopy.title}
            />

            <div className="mt-7 w-full max-w-[22rem] text-sm font-light leading-7 text-[var(--ink-soft)] sm:max-w-2xl sm:text-base">
              <p className="w-full">
                <span className="block sm:inline">
                  {heroCopy.currentPrefix}
                </span>
                <span className="mx-1 inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--paper-bright)] px-2.5 py-1 text-sm font-medium text-[var(--ink)] shadow-[0_12px_26px_rgba(15,23,42,0.08)]">
                  <span className="grid h-5 w-5 place-items-center rounded-md bg-[var(--purple)]">
                    <Sparkle
                      aria-hidden="true"
                      className="h-3.5 w-3.5 text-[var(--paper-bright)]"
                      strokeWidth={2.4}
                    />
                  </span>
                  {heroCopy.currentCompany}
                </span>
                .
              </p>
            </div>

            <div className="mt-6 flex justify-center sm:mt-7">
              <HoverEyes
                className="relative inline-flex"
                data-eye-target="selected-work-button"
                eyeClassName="top-[-1.45rem]"
                eyeSizeClassName="text-[2.1rem]"
              >
                <ActionLink
                  className="group inline-flex h-12 min-w-[12.75rem] gap-2 rounded-[8px] border-[rgb(20_20_22_/_0.86)] px-5 text-sm shadow-[0_18px_44px_rgb(15_23_42_/_0.14)] sm:h-12 sm:px-6"
                  href="#clients"
                >
                  <span>{heroCopy.selectedWorkAction}</span>
                  <span className="grid h-6 w-6 place-items-center rounded-[6px] bg-[rgb(255_255_255_/_0.14)] transition duration-300 group-hover:translate-y-0.5">
                    <ArrowDown
                      aria-hidden="true"
                      className="h-3.5 w-3.5"
                      strokeWidth={2.35}
                    />
                  </span>
                </ActionLink>
              </HoverEyes>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-4 z-30 px-4 sm:bottom-7 sm:px-8">
          <div className="mx-auto flex max-w-6xl justify-center">
            <div className="relative isolate flex max-w-full items-center gap-3 overflow-hidden rounded-[8px] border border-[rgb(226_232_240_/_0.62)] bg-[rgb(255_255_255_/_0.72)] px-3 py-2.5 shadow-[0_18px_50px_rgba(15,23,42,0.11)] backdrop-blur-xl sm:px-4">
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(223_238_255_/_0.34),transparent_31%,rgb(245_215_234_/_0.3)_68%,rgb(255_246_168_/_0.24))]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-4 top-1 -z-10 h-px bg-[linear-gradient(90deg,transparent,rgb(109_74_255_/_0.24),transparent)]"
              />

              <span className="grid h-7 w-7 flex-none place-items-center rounded-[6px] bg-[var(--paper-bright)] text-[var(--purple)] shadow-[0_8px_18px_rgba(15,23,42,0.1)]">
                <Sparkle
                  aria-hidden="true"
                  className="h-3.5 w-3.5"
                  strokeWidth={2.35}
                />
              </span>

              <p
                className="min-w-0 truncate text-[0.76rem] font-light leading-none tracking-normal text-[var(--ink-soft)] sm:text-sm"
                title={reflectionBand}
              >
                {heroCopy.reflection.map((line, index) => (
                  <span className="inline" key={line}>
                    {index > 0 ? (
                      <span
                        aria-hidden="true"
                        className="mx-2 inline-block h-1 w-1 rounded-full bg-[var(--purple)] align-middle opacity-65"
                      />
                    ) : null}
                    {line}
                  </span>
                ))}
              </p>

              <span
                aria-hidden="true"
                className="hidden h-7 w-12 flex-none rounded-[6px] bg-[repeating-linear-gradient(90deg,rgb(20_20_22_/_0.09)_0_1px,transparent_1px_7px)] opacity-45 sm:block"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
