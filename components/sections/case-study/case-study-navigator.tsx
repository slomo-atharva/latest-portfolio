"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export type SectionSpecNav = {
  id: string;
  name: string;
};

export function CaseStudyNavigator({
  sectionSpecs,
}: {
  sectionSpecs: SectionSpecNav[];
}) {
  const [activeId, setActiveId] = useState<string>(sectionSpecs[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    sectionSpecs.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionSpecs]);

  return (
    <aside className="hidden self-stretch xl:block">
      <nav
        aria-label="Case study map"
        className="sticky top-[4.5rem] flex h-[calc(100svh-4.5rem)] flex-col border-r border-[var(--case-line)] bg-[var(--case-paper)] px-4 py-6"
      >
        <div>
          <p className="text-[0.68rem] font-medium uppercase tracking-normal text-[var(--case-muted)]">
            Case map
          </p>
        </div>

        <ol className="mt-6 grid gap-1.5">
          {sectionSpecs.map((section) => {
            const isActive = activeId === section.id;
            return (
              <li key={section.id}>
                <Link
                  className={`group grid grid-cols-[0.75rem_1fr] items-center gap-3 rounded-[8px] border px-3 py-2.5 text-xs leading-5 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--case-paper)] ${
                    isActive
                      ? "border-[var(--case-line)] bg-[var(--case-surface)] font-medium text-[var(--case-ink)] shadow-[var(--case-shadow-soft)]"
                      : "border-transparent text-[var(--case-muted)] hover:border-[var(--case-line-soft)] hover:bg-[var(--case-surface-muted)] hover:text-[var(--case-ink)]"
                  }`}
                  href={`#${section.id}`}
                >
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 rounded-full transition duration-300 ${
                      isActive
                        ? "bg-[var(--blue)] shadow-[0_0_0_4px_rgb(223_238_255_/_0.82)]"
                        : "bg-[var(--case-line)] group-hover:bg-[var(--case-muted)]"
                    }`}
                  />
                  <span>{section.name}</span>
                </Link>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}
