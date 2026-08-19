import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, Sparkle } from "lucide-react";
import { showcaseProjects, type ShowcaseProject } from "@/data/projects";
import { projectToneStyles } from "@/lib/project-tones";

export function SelectedProjectsSection() {
  return (
    <section
      aria-labelledby="selected-projects-title"
      className="landing-snap-panel relative isolate overflow-hidden bg-[var(--paper)] px-5 py-12 text-[var(--ink)] sm:px-8 sm:py-14 lg:px-12"
      id="work"
    >
      <div className="hero-dot-grid absolute inset-x-0 top-0 -z-10 h-full opacity-35" />

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[rgb(226_232_240_/_0.8)] bg-[rgb(255_255_255_/_0.76)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] shadow-[0_10px_28px_rgb(15_23_42_/_0.07)]">
              <Sparkle
                aria-hidden="true"
                className="h-3.5 w-3.5 text-[var(--purple)]"
                strokeWidth={2.35}
              />
              Selected projects
            </p>

            <h2
              className="mt-4 text-[clamp(1.85rem,4vw,3rem)] font-semibold leading-[1.04] tracking-normal text-[var(--ink)]"
              id="selected-projects-title"
            >
              Selected work.
            </h2>
          </div>
        </div>

        <div className="mt-7 grid auto-rows-fr items-stretch gap-5 md:grid-cols-2">
          {showcaseProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: ShowcaseProject }) {
  const tone = projectToneStyles[project.tone];
  const titleId = `project-title-${project.id}`;
  const isActive = project.availability === "active";

  return (
    <article
      className={`group relative flex h-full min-h-[31rem] flex-col overflow-hidden rounded-[8px] border backdrop-blur-xl transition duration-500 ${
        isActive
          ? "cursor-pointer border-[rgb(226_232_240_/_0.8)] bg-[rgb(255_255_255_/_0.7)] shadow-[0_18px_56px_rgb(15_23_42_/_0.08)] hover:-translate-y-1 hover:shadow-[0_24px_68px_rgb(15_23_42_/_0.13)] focus-within:ring-2 focus-within:ring-[var(--blue)] focus-within:ring-offset-4 focus-within:ring-offset-[var(--paper)]"
          : "cursor-default border-[rgb(203_213_225_/_0.88)] bg-[rgb(241_245_249_/_0.68)] shadow-[0_14px_40px_rgb(71_85_105_/_0.06)]"
      }`}
    >
      {isActive ? (
        <Link
          aria-labelledby={titleId}
          className="absolute inset-0 z-20 rounded-[8px] focus:outline-none"
          href={`/case-studies/${project.id}#top`}
        >
          <span className="sr-only">
            Read case study for {project.client}: {project.title}
          </span>
        </Link>
      ) : null}

      <ProjectVisual project={project} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4 text-xs font-medium text-[var(--muted)]">
          <span>{project.category}</span>
          <span>{isActive ? project.year : "Coming soon"}</span>
        </div>

        <h3
          className="mt-5 text-2xl font-semibold leading-[1.02] tracking-normal text-[var(--ink)]"
          id={titleId}
        >
          {project.title}
        </h3>

        <p className="mt-4 text-sm font-light leading-7 text-[var(--ink-soft)]">
          {project.summary}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.scope.map((item) => (
            <li
              className="rounded-full border border-[rgb(226_232_240_/_0.72)] bg-[rgb(248_250_252_/_0.76)] px-2.5 py-1 text-[0.72rem] font-normal leading-5 text-[var(--ink-soft)]"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between gap-4 pt-7">
          <p className="text-xs font-light leading-5 text-[var(--muted)]">
            {isActive ? project.role : "Write-up coming soon"}
          </p>
          <span
            className={`grid h-9 w-9 flex-none place-items-center rounded-[8px] ${
              isActive
                ? tone.marker
                : "bg-[rgb(203_213_225)] text-[var(--muted)]"
            } ${
              isActive
                ? "transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                : ""
            }`}
          >
            {isActive ? (
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={2.3}
              />
            ) : (
              <Clock3 aria-hidden="true" className="h-4 w-4" strokeWidth={2.3} />
            )}
          </span>
        </div>
      </div>
    </article>
  );
}

function ProjectVisual({ project }: { project: ShowcaseProject }) {
  const tone = projectToneStyles[project.tone];
  const isActive = project.availability === "active";

  return (
    <div
      className={`relative isolate flex h-[15.75rem] min-h-[15.75rem] overflow-hidden border-b border-[rgb(226_232_240_/_0.72)] p-5 sm:h-[16.25rem] sm:min-h-[16.25rem] sm:p-7 ${
        isActive
          ? tone.canvas
          : "bg-[linear-gradient(135deg,rgb(241_245_249_/_0.94),rgb(248_250_252_/_0.9)_48%,rgb(226_232_240_/_0.76))]"
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(20_20_22_/_0.06)_1px,transparent_1px),linear-gradient(0deg,rgb(20_20_22_/_0.045)_1px,transparent_1px)] bg-[length:34px_34px]"
      />
      <div
        aria-hidden="true"
        className={`absolute inset-y-0 right-0 -z-10 w-2/5 ${
          isActive
            ? tone.wash
            : "bg-[linear-gradient(90deg,transparent,rgb(100_116_139_/_0.08))]"
        }`}
      />

      <div className="relative flex h-full w-full flex-col justify-between">
        <div className="flex items-start justify-between gap-5">
          <div className="flex h-[5.5rem] min-w-0 max-w-[72%] flex-col gap-3 overflow-hidden">
            <span className="truncate text-xs font-medium uppercase tracking-normal text-[var(--muted)]">
              {project.client}
            </span>
            {isActive ? (
              <Image
                alt={`${project.client} logo`}
                className={`max-w-full object-contain opacity-[0.88] mix-blend-multiply transition duration-300 group-hover:opacity-100 ${project.logo.className}`}
                height={project.logo.height}
                sizes="(min-width: 1280px) 190px, (min-width: 768px) 210px, 170px"
                src={project.logo.src}
                width={project.logo.width}
              />
            ) : (
              <span className="text-sm font-normal text-[var(--muted)]">
                I’ll write about it soon.
              </span>
            )}
          </div>

          <span
            className={`grid h-9 w-9 flex-none place-items-center rounded-[8px] ${
              isActive
                ? `shadow-[0_10px_24px_rgb(15_23_42_/_0.12)] ${tone.marker}`
                : "bg-[rgb(203_213_225)] text-[var(--muted)]"
            }`}
          >
            {isActive ? (
              <Sparkle
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={2.35}
              />
            ) : (
              <Clock3 aria-hidden="true" className="h-4 w-4" strokeWidth={2.35} />
            )}
          </span>
        </div>

        <div className="grid gap-3">
          <div
            aria-hidden="true"
            className={`h-2.5 rounded-full ${
              isActive
                ? `shadow-[0_10px_26px_rgb(15_23_42_/_0.09)] ${tone.rail}`
                : "bg-[rgb(203_213_225_/_0.88)]"
            }`}
          />
          <div className="grid grid-cols-[1.2fr_0.8fr_1fr] gap-3">
            {[0, 1, 2].map((item) => (
              <span
                aria-hidden="true"
                className={`h-16 rounded-[8px] border backdrop-blur-sm ${
                  isActive
                    ? "border-[rgb(255_255_255_/_0.7)] bg-[rgb(255_255_255_/_0.38)] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.54)] transition duration-300 group-hover:-translate-y-0.5"
                    : "border-[rgb(203_213_225_/_0.8)] bg-[rgb(226_232_240_/_0.42)]"
                }`}
                key={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
