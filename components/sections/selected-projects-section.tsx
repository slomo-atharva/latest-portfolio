import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkle } from "lucide-react";
import { selectedProjects, type SelectedProject } from "@/data/projects";
import { projectToneStyles } from "@/lib/project-tones";

export function SelectedProjectsSection() {
  const [featuredProject, ...supportingProjects] = selectedProjects;

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

        <FeaturedProjectCard project={featuredProject} />

        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          {supportingProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjectCard({ project }: { project: SelectedProject }) {
  const tone = projectToneStyles[project.tone];
  const titleId = `project-title-${project.id}`;

  return (
    <article className="group relative mt-7 grid cursor-pointer overflow-hidden rounded-[8px] border border-[rgb(226_232_240_/_0.82)] bg-[rgb(255_255_255_/_0.74)] shadow-[0_22px_70px_rgb(15_23_42_/_0.12)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_82px_rgb(15_23_42_/_0.16)] focus-within:ring-2 focus-within:ring-[var(--blue)] focus-within:ring-offset-4 focus-within:ring-offset-[var(--paper)] lg:mt-9 lg:grid-cols-[0.98fr_1.02fr]">
      <Link
        aria-labelledby={titleId}
        className="absolute inset-0 z-20 rounded-[8px] focus:outline-none"
        href={`/case-studies/${project.id}#top`}
      >
        <span className="sr-only">
          Read case study for {project.client}: {project.title}
        </span>
      </Link>

      <div className="flex min-h-[28rem] flex-col p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[var(--muted)]">
          <span>{project.category}</span>
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full bg-[var(--purple)] opacity-60"
          />
          <span>{project.year}</span>
        </div>

        <h3
          className="mt-8 max-w-xl text-[clamp(2rem,5vw,3.55rem)] font-semibold leading-none tracking-normal text-[var(--ink)]"
          id={titleId}
        >
          {project.title}
        </h3>

        <p className="mt-6 max-w-xl text-base font-light leading-8 text-[var(--ink-soft)] sm:text-lg">
          {project.summary}
        </p>

        <dl className="mt-8 grid gap-5 sm:grid-cols-[0.95fr_1.05fr]">
          <div>
            <dt className="text-xs font-medium uppercase tracking-normal text-[var(--muted)]">
              Role
            </dt>
            <dd className="mt-2 text-sm font-light leading-6 text-[var(--ink-soft)]">
              {project.role}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-normal text-[var(--muted)]">
              Focus
            </dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {project.scope.map((item) => (
                <span
                  className="rounded-full border border-[rgb(226_232_240_/_0.74)] bg-[rgb(248_250_252_/_0.8)] px-3 py-1 text-xs font-normal text-[var(--ink-soft)]"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <div className="mt-auto pt-8">
          <div className="flex items-center justify-between gap-4 border-t border-[rgb(226_232_240_/_0.72)] pt-5">
            <p className="max-w-[18rem] text-sm font-light leading-6 text-[var(--muted)]">
              {project.highlights.join(" / ")}
            </p>
            <span
              className={`grid h-10 w-10 flex-none place-items-center rounded-[8px] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${tone.marker}`}
            >
              <ArrowUpRight
                aria-hidden="true"
                className="h-4 w-4"
                strokeWidth={2.3}
              />
            </span>
          </div>
        </div>
      </div>

      <ProjectVisual featured project={project} />
    </article>
  );
}

function ProjectCard({ project }: { project: SelectedProject }) {
  const tone = projectToneStyles[project.tone];
  const titleId = `project-title-${project.id}`;

  return (
    <article className="group relative flex h-full min-h-[31rem] cursor-pointer flex-col overflow-hidden rounded-[8px] border border-[rgb(226_232_240_/_0.8)] bg-[rgb(255_255_255_/_0.7)] shadow-[0_18px_56px_rgb(15_23_42_/_0.08)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_68px_rgb(15_23_42_/_0.13)] focus-within:ring-2 focus-within:ring-[var(--blue)] focus-within:ring-offset-4 focus-within:ring-offset-[var(--paper)]">
      <Link
        aria-labelledby={titleId}
        className="absolute inset-0 z-20 rounded-[8px] focus:outline-none"
        href={`/case-studies/${project.id}#top`}
      >
        <span className="sr-only">
          Read case study for {project.client}: {project.title}
        </span>
      </Link>

      <ProjectVisual project={project} />

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4 text-xs font-medium text-[var(--muted)]">
          <span>{project.category}</span>
          <span>{project.year}</span>
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
            {project.role}
          </p>
          <span
            className={`grid h-9 w-9 flex-none place-items-center rounded-[8px] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${tone.marker}`}
          >
            <ArrowUpRight
              aria-hidden="true"
              className="h-4 w-4"
              strokeWidth={2.3}
            />
          </span>
        </div>
      </div>
    </article>
  );
}

function ProjectVisual({
  featured = false,
  project,
}: {
  featured?: boolean;
  project: SelectedProject;
}) {
  const tone = projectToneStyles[project.tone];
  const visualSizeClass = featured
    ? "min-h-[14rem] border-t sm:min-h-[16rem] lg:min-h-full lg:border-l lg:border-t-0"
    : "h-[15.75rem] min-h-[15.75rem] border-b sm:h-[16.25rem] sm:min-h-[16.25rem]";

  return (
    <div
      className={`relative isolate flex overflow-hidden border-[rgb(226_232_240_/_0.72)] p-5 sm:p-7 ${visualSizeClass} ${tone.canvas}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(20_20_22_/_0.06)_1px,transparent_1px),linear-gradient(0deg,rgb(20_20_22_/_0.045)_1px,transparent_1px)] bg-[length:34px_34px]"
      />
      <div
        aria-hidden="true"
        className={`absolute inset-y-0 right-0 -z-10 w-2/5 ${tone.wash}`}
      />

      <div className="relative flex h-full w-full flex-col justify-between">
        <div className="flex items-start justify-between gap-5">
          <div className="flex h-[5.5rem] min-w-0 max-w-[72%] flex-col gap-3 overflow-hidden">
            <span className="truncate text-xs font-medium uppercase tracking-normal text-[var(--muted)]">
              {project.client}
            </span>
            <Image
              alt={`${project.client} logo`}
              className={`max-w-full object-contain opacity-[0.88] mix-blend-multiply transition duration-300 group-hover:opacity-100 ${project.logo.className}`}
              height={project.logo.height}
              sizes={
                featured
                  ? "(min-width: 1024px) 240px, 180px"
                  : "(min-width: 1024px) 190px, 170px"
              }
              src={project.logo.src}
              width={project.logo.width}
            />
          </div>

          <span
            className={`grid h-9 w-9 flex-none place-items-center rounded-[8px] shadow-[0_10px_24px_rgb(15_23_42_/_0.12)] ${tone.marker}`}
          >
            <Sparkle
              aria-hidden="true"
              className="h-4 w-4"
              strokeWidth={2.35}
            />
          </span>
        </div>

        <div className="grid gap-3">
          <div
            aria-hidden="true"
            className={`h-2.5 rounded-full shadow-[0_10px_26px_rgb(15_23_42_/_0.09)] ${tone.rail}`}
          />
          <div className="grid grid-cols-[1.2fr_0.8fr_1fr] gap-3">
            {[0, 1, 2].map((item) => (
              <span
                aria-hidden="true"
                className="h-16 rounded-[8px] border border-[rgb(255_255_255_/_0.7)] bg-[rgb(255_255_255_/_0.38)] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.54)] backdrop-blur-sm transition duration-300 group-hover:-translate-y-0.5"
                key={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
