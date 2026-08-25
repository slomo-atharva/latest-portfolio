"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { ArrowRight, Lock, LoaderCircle } from "lucide-react";
import type { ProjectToneStyle } from "@/lib/project-tones";

type CaseStudyLockProps = {
  sections: string[];
  tone: ProjectToneStyle;
};

const bar = "rounded-full bg-[var(--case-line-soft)]";
const block = "rounded-[10px] bg-[var(--case-surface)] shadow-[0_1px_2px_rgb(24_32_43_/_0.05)]";

/**
 * Stand-in shapes only. The real sections are never sent to the browser while
 * the case study is locked, so there is nothing here to un-blur.
 */
function LockedShapes() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none space-y-14 blur-[7px] [mask-image:linear-gradient(180deg,#000_0%,#000_58%,transparent_100%)]"
    >
      {[0, 1, 2].map((section) => (
        <div className="space-y-6" key={section}>
          <div className="space-y-3">
            <span className={`block h-[3px] w-10 ${bar}`} />
            <span className={`block h-9 w-[42%] ${bar}`} />
            <span className={`block h-3 w-[28%] ${bar}`} />
          </div>

          {section === 1 ? (
            <div className="grid gap-4 sm:grid-cols-3">
              {[0, 1, 2, 3, 4, 5].map((card) => (
                <div className={`${block} space-y-3 p-5`} key={card}>
                  <span className={`block h-8 w-8 rounded-full bg-[var(--case-surface-muted)]`} />
                  <span className={`block h-3.5 w-3/4 ${bar}`} />
                  <span className={`block h-2.5 w-full ${bar}`} />
                  <span className={`block h-2.5 w-5/6 ${bar}`} />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className={`${block} space-y-3 p-6`}>
                <span className={`block h-3 w-1/3 ${bar}`} />
                <span className={`block h-2.5 w-full ${bar}`} />
                <span className={`block h-2.5 w-11/12 ${bar}`} />
                <span className={`block h-2.5 w-4/5 ${bar}`} />
                <span className={`block h-2.5 w-2/3 ${bar}`} />
              </div>
              <div className="space-y-4">
                {[0, 1, 2].map((row) => (
                  <div className={`${block} flex items-start gap-4 p-5`} key={row}>
                    <span className="h-9 w-9 flex-none rounded-full bg-[var(--case-surface-muted)]" />
                    <span className="flex-1 space-y-2.5">
                      <span className={`block h-2.5 w-full ${bar}`} />
                      <span className={`block h-2.5 w-4/5 ${bar}`} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function CaseStudyLock({ sections, tone }: CaseStudyLockProps) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "checking" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const password = new FormData(event.currentTarget).get("password");

    setStatus("checking");
    setError("");

    try {
      const response = await fetch("/api/case-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const result: { ok?: boolean; error?: string } = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error ?? "That password is not right.");
      }

      // The gated sections render on the server, so re-request the page now
      // that the access cookie is set.
      router.refresh();
    } catch (submitError) {
      setStatus("error");
      setError(
        submitError instanceof Error
          ? submitError.message
          : "That password is not right.",
      );
    }
  }

  return (
    <section className="relative isolate scroll-mt-24 pt-12" id="locked">
      <LockedShapes />

      <div className="absolute inset-0 flex justify-center px-1">
        <div className="sticky top-[22vh] h-fit w-full max-w-3xl">
          <div className="relative isolate overflow-hidden rounded-[12px] bg-[rgb(253_253_255_/_0.82)] p-6 shadow-[0_2px_6px_rgb(24_32_43_/_0.06),0_28px_70px_rgb(24_32_43_/_0.16)] backdrop-blur-xl sm:p-8">
            <div
              aria-hidden="true"
              className={`absolute -right-24 -top-28 -z-10 h-64 w-64 rounded-full opacity-70 blur-3xl ${tone.softFill}`}
            />

            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`grid h-10 w-10 place-items-center rounded-full ${tone.softFill} ${tone.accentText}`}
              >
                <Lock aria-hidden="true" className="h-4 w-4" strokeWidth={2.2} />
              </span>
              <p className="text-[0.68rem] font-medium uppercase tracking-normal text-[var(--case-muted)]">
                {sections.length} more sections
              </p>
            </div>

            <h2 className="mt-5 max-w-xl text-xl font-medium leading-tight tracking-normal text-[var(--case-ink)] sm:text-2xl">
              There is a lot more here — it is just under NDA.
            </h2>

            <p className="mt-3 max-w-xl text-sm font-light leading-7 text-[var(--case-ink-soft)]">
              The detail stays private under NDA. Ask me for the password.
            </p>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {sections.map((section) => (
                <li
                  className="rounded-full bg-[var(--case-surface-muted)] px-2.5 py-1 text-[0.7rem] font-medium leading-5 text-[var(--case-ink-soft)]"
                  key={section}
                >
                  {section}
                </li>
              ))}
            </ul>

            <form
              className="mt-6 flex flex-wrap items-start gap-3"
              noValidate
              onSubmit={handleSubmit}
            >
              <div className="min-w-[12rem] flex-1">
                <label className="sr-only" htmlFor="case-password">
                  Password
                </label>
                <input
                  autoComplete="off"
                  className="h-11 w-full rounded-[8px] bg-[var(--case-surface)] px-3.5 text-sm font-light text-[var(--case-ink)] shadow-[inset_0_0_0_1px_rgb(24_32_43_/_0.08)] outline-none transition duration-300 placeholder:text-[var(--case-muted)] focus:shadow-[inset_0_0_0_2px_rgb(33_58_143_/_0.45)]"
                  id="case-password"
                  name="password"
                  placeholder="Enter password"
                  required
                  type="password"
                />
              </div>

              <button
                className="group inline-flex h-11 flex-none items-center justify-center gap-2 rounded-[8px] bg-[var(--case-ink)] px-5 text-sm font-medium text-[#fdfdff] transition duration-300 hover:-translate-y-0.5 hover:bg-[#242424] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--case-paper)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                disabled={status === "checking"}
                type="submit"
              >
                {status === "checking" ? (
                  <>
                    <LoaderCircle
                      aria-hidden="true"
                      className="h-4 w-4 animate-spin"
                      strokeWidth={2.35}
                    />
                    Checking
                  </>
                ) : (
                  <>
                    Unlock
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5"
                      strokeWidth={2.35}
                    />
                  </>
                )}
              </button>
            </form>

            <p
              aria-live="polite"
              className="mt-3 min-h-5 text-xs font-light leading-5 text-[#9b4772]"
            >
              {status === "error" ? error : null}
            </p>

            <p className="text-xs font-light leading-5 text-[var(--case-muted)]">
              One unlock opens every case study here for 30 days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
