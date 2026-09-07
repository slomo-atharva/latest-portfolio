import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3, Sparkle } from "lucide-react";
import { showcaseProjects, type ShowcaseProject } from "@/data/projects";
import { projectToneStyles } from "@/lib/project-tones";

export function SelectedProjectsSection() {
  return (
    <section
      aria-labelledby="selected-projects-title"
      className="relative isolate overflow-hidden bg-[var(--paper)] px-5 py-12 text-[var(--ink)] sm:px-8 sm:py-14 lg:px-12"
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
      className={`group relative flex h-full min-h-[31rem] flex-col overflow-hidden rounded-[8px] border transition duration-500 ease-out ${
        isActive
          ? "cursor-pointer border-[rgb(226_232_240_/_0.9)] bg-[var(--paper-bright)] shadow-[0_1px_2px_rgb(15_23_42_/_0.04),0_18px_50px_rgb(15_23_42_/_0.07)] hover:-translate-y-1.5 hover:border-[rgb(203_213_225_/_0.9)] hover:shadow-[0_1px_2px_rgb(15_23_42_/_0.05),0_30px_70px_rgb(15_23_42_/_0.13)] focus-within:ring-2 focus-within:ring-[var(--blue)] focus-within:ring-offset-4 focus-within:ring-offset-[var(--paper)]"
          : "cursor-default border-[rgb(226_232_240_/_0.8)] bg-[rgb(248_250_252_/_0.7)] shadow-[0_1px_2px_rgb(15_23_42_/_0.03)]"
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
        <div className="flex items-center gap-2.5 text-xs font-medium text-[var(--muted)]">
          <span>{project.category}</span>
          <span
            aria-hidden="true"
            className="h-1 w-1 flex-none rounded-full bg-[rgb(148_163_184_/_0.7)]"
          />
          <span>{isActive ? project.year : "Coming soon"}</span>
        </div>

        <h3
          className="mt-4 text-[1.55rem] font-semibold leading-[1.1] tracking-normal text-[var(--ink)] sm:text-[1.7rem]"
          id={titleId}
        >
          {project.title}
        </h3>

        <p className="mt-3.5 text-sm font-light leading-7 text-[var(--ink-soft)]">
          {project.summary}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.scope.map((item) => (
            <li
              className="rounded-full border border-[rgb(226_232_240_/_0.9)] bg-[rgb(248_250_252_/_0.8)] px-2.5 py-1 text-[0.72rem] font-normal leading-5 text-[var(--ink-soft)] transition duration-500 group-hover:border-[rgb(203_213_225_/_0.9)]"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-7">
          <div className="flex items-center justify-between gap-4 border-t border-[rgb(226_232_240_/_0.8)] pt-5">
            <p className="text-xs font-light leading-5 text-[var(--muted)]">
              {isActive ? project.role : "Write-up coming soon"}
            </p>
            <span
              className={`grid h-9 w-9 flex-none place-items-center rounded-full transition duration-500 ${
                isActive
                  ? `${tone.marker} group-hover:scale-105`
                  : "bg-[rgb(226_232_240)] text-[var(--muted)]"
              }`}
            >
              {isActive ? (
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2.3}
                />
              ) : (
                <Clock3 aria-hidden="true" className="h-4 w-4" strokeWidth={2.3} />
              )}
            </span>
          </div>
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
      className={`relative isolate flex h-[13.75rem] min-h-[13.75rem] flex-col justify-between overflow-hidden border-b p-5 sm:h-[14.75rem] sm:min-h-[14.75rem] sm:p-6 ${
        isActive
          ? `border-[rgb(226_232_240_/_0.72)] ${tone.canvas}`
          : "border-[rgb(226_232_240_/_0.8)] bg-[linear-gradient(140deg,rgb(241_245_249_/_0.92),rgb(248_250_252_/_0.86))]"
      }`}
    >
      <div
        aria-hidden="true"
        className="hero-dot-grid absolute inset-0 -z-10 opacity-50"
      />
      <div
        aria-hidden="true"
        className="absolute -right-20 -top-24 -z-10 h-56 w-56 rounded-full bg-[rgb(255_255_255_/_0.62)] opacity-70 blur-3xl transition duration-700 group-hover:opacity-100"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-[linear-gradient(180deg,transparent,rgb(255_255_255_/_0.46))]"
      />

      <div className="flex min-w-0 flex-col gap-3.5">
        <span className="truncate text-[0.68rem] font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
          {project.client}
        </span>
        {isActive ? (
          <Image
            alt={`${project.client} logo`}
            className={`max-w-full object-contain opacity-90 mix-blend-multiply transition duration-500 group-hover:opacity-100 ${project.logo.className}`}
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

      <div className="grid gap-3.5">
        <div
          aria-hidden="true"
          className={`h-1 rounded-full ${
            isActive ? tone.rail : "bg-[rgb(203_213_225_/_0.8)]"
          }`}
        />
        <ul className="flex flex-wrap gap-1.5">
          {isActive ? (
            project.highlights.map((highlight) => (
              <li
                className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(255_255_255_/_0.8)] bg-[rgb(255_255_255_/_0.62)] px-2.5 py-1 text-[0.7rem] font-medium leading-5 text-[var(--ink-soft)] shadow-[0_1px_2px_rgb(15_23_42_/_0.04)] backdrop-blur-sm"
                key={highlight}
              >
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 flex-none rounded-full ${tone.marker}`}
                />
                {highlight}
              </li>
            ))
          ) : (
            <li className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(226_232_240_/_0.9)] bg-[rgb(255_255_255_/_0.58)] px-2.5 py-1 text-[0.7rem] font-medium leading-5 text-[var(--muted)]">
              <Clock3 aria-hidden="true" className="h-3 w-3" strokeWidth={2.35} />
              Write-up in progress
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
