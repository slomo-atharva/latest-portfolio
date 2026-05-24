import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CircleDot,
  Layers3,
  Route,
  Sparkle,
} from "lucide-react";
import { type CaseStudy } from "@/data/case-studies";
import { heroCopy } from "@/data/hero";
import {
  projectToneStyles,
  type ProjectToneStyle,
} from "@/lib/project-tones";

type CaseStudyPageProps = {
  caseStudy: CaseStudy;
};

export function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  const { project } = caseStudy;
  const tone = projectToneStyles[project.tone];

  return (
    <main className="bg-[var(--paper)] text-[var(--ink)]">
      <CaseStudyHeader />

      <section
        className="relative isolate overflow-hidden px-5 pb-14 pt-24 sm:px-8 sm:pb-20 sm:pt-28 lg:px-12"
        id="top"
      >
        <div className="hero-dot-grid absolute inset-x-0 top-0 -z-20 h-full opacity-50" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_72%_24%,rgb(223_238_255_/_0.64),transparent_34%),linear-gradient(180deg,rgb(255_255_255_/_0.78),rgb(248_250_252_/_0.96))]"
        />

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-end lg:gap-12">
          <div>
            <Link
              className="group inline-flex h-10 items-center gap-2 rounded-[8px] border border-[rgb(226_232_240_/_0.78)] bg-[rgb(255_255_255_/_0.72)] px-3 text-sm font-medium text-[var(--ink-soft)] shadow-[0_12px_28px_rgb(15_23_42_/_0.06)] transition duration-300 hover:-translate-y-0.5 hover:text-[var(--ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--paper)]"
              href="/#work"
            >
              <ArrowLeft
                aria-hidden="true"
                className="h-4 w-4 transition duration-300 group-hover:-translate-x-0.5"
                strokeWidth={2.3}
              />
              Selected work
            </Link>

            <div className="mt-10 flex flex-wrap items-center gap-2 text-xs font-medium text-[var(--muted)]">
              <span>Case study</span>
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${tone.marker}`}
              />
              <span>{project.category}</span>
              <span
                aria-hidden="true"
                className="h-1 w-1 rounded-full bg-[rgb(112_112_120_/_0.52)]"
              />
              <span>{project.year}</span>
            </div>

            <h1 className="mt-5 max-w-4xl text-[clamp(2.45rem,8vw,5.7rem)] font-semibold leading-[0.94] tracking-normal text-[var(--ink)]">
              {project.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-light leading-8 text-[var(--ink-soft)] sm:text-xl sm:leading-9">
              {caseStudy.headline}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <HeroStat label="Client" value={project.client} />
              <HeroStat label="Role" value={project.role} />
              <HeroStat label="Scope" value={project.scope.join(", ")} />
            </div>
          </div>

          <CaseStudyHeroVisual caseStudy={caseStudy} />
        </div>
      </section>

      <section className="px-5 pb-12 sm:px-8 sm:pb-16 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {caseStudy.snapshot.map((item) => (
            <article
              className={`rounded-[8px] border bg-[rgb(255_255_255_/_0.76)] p-5 shadow-[0_16px_44px_rgb(15_23_42_/_0.07)] backdrop-blur-sm ${tone.border}`}
              key={item.label}
            >
              <p className={`text-xs font-medium uppercase tracking-normal ${tone.accentText}`}>
                {item.label}
              </p>
              <p className="mt-3 text-sm font-light leading-7 text-[var(--ink-soft)]">
                {item.value}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:gap-14">
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <p className="inline-flex items-center gap-2 rounded-full border border-[rgb(226_232_240_/_0.72)] bg-[rgb(255_255_255_/_0.72)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] shadow-[0_10px_28px_rgb(15_23_42_/_0.06)]">
              <Route
                aria-hidden="true"
                className={`h-3.5 w-3.5 ${tone.accentText}`}
                strokeWidth={2.35}
              />
              Story spine
            </p>

            <h2 className="mt-5 max-w-md text-[clamp(2rem,5vw,3.65rem)] font-semibold leading-[0.98] tracking-normal text-[var(--ink)]">
              A short case study built around the actual decisions.
            </h2>

            <p className="mt-5 max-w-md text-base font-light leading-8 text-[var(--ink-soft)]">
              {caseStudy.deck}
            </p>
          </aside>

          <div className="grid gap-5">
            <StoryBand
              eyebrow="Problem"
              title="What made the work hard"
              toneClass={tone.accentText}
            >
              {caseStudy.problem}
            </StoryBand>
            <StoryBand
              eyebrow="Approach"
              title="How the story was shaped"
              toneClass={tone.accentText}
            >
              {caseStudy.storyIntro}
            </StoryBand>
            <StoryBand
              eyebrow="Outcome"
              title="Where the work landed"
              toneClass={tone.accentText}
            >
              {caseStudy.outcome}
            </StoryBand>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <SectionIntro
          eyebrow="The friction"
          title="The page should earn attention by showing what was actually broken."
          description="Instead of writing a long process essay, this section turns the messy parts of the project into specific tensions the design had to solve."
        />

        <div className="mx-auto mt-8 grid max-w-6xl gap-4 md:grid-cols-3">
          {caseStudy.frictions.map((friction, index) => (
            <article
              className="rounded-[8px] border border-[rgb(226_232_240_/_0.76)] bg-[rgb(255_255_255_/_0.74)] p-5 shadow-[0_16px_44px_rgb(15_23_42_/_0.07)] backdrop-blur-sm"
              key={friction.title}
            >
              <span
                className={`grid h-9 w-9 place-items-center rounded-[8px] text-sm font-semibold ${tone.marker}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 text-xl font-semibold leading-6 text-[var(--ink)]">
                {friction.title}
              </h3>
              <p className="mt-3 text-sm font-light leading-7 text-[var(--ink-soft)]">
                {friction.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-normal text-[var(--muted)]">
                Process
              </p>
              <h2 className="mt-4 max-w-xl text-[clamp(2rem,5vw,3.55rem)] font-semibold leading-[0.98] tracking-normal text-[var(--ink)]">
                Keep the method visible, but do not make it the whole story.
              </h2>
            </div>

            <div className="grid gap-3">
              {caseStudy.process.map((step) => (
                <article
                  className="grid gap-4 rounded-[8px] border border-[rgb(226_232_240_/_0.76)] bg-[rgb(255_255_255_/_0.7)] p-4 shadow-[0_14px_40px_rgb(15_23_42_/_0.06)] backdrop-blur-sm sm:grid-cols-[4rem_1fr] sm:p-5"
                  key={step.phase}
                >
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-[8px] text-sm font-semibold ${tone.marker}`}
                  >
                    {step.phase}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold leading-6 text-[var(--ink)]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm font-light leading-7 text-[var(--ink-soft)]">
                      {step.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <SectionIntro
          eyebrow="Key decisions"
          title="Issue, decision, result: the fastest way to show how you think."
          description="This is the core storytelling pattern. It gives enough depth to prove judgment without forcing the reader through every meeting, wireframe, and edge case."
        />

        <div className="mx-auto mt-8 grid max-w-6xl gap-5">
          {caseStudy.decisions.map((decision) => (
            <article
              className="grid gap-5 rounded-[8px] border border-[rgb(226_232_240_/_0.8)] bg-[rgb(255_255_255_/_0.76)] p-5 shadow-[0_18px_52px_rgb(15_23_42_/_0.08)] backdrop-blur-sm lg:grid-cols-3 lg:p-6"
              key={decision.issue}
            >
              <DecisionColumn
                eyebrow="Issue"
                iconClass="text-[#9b4772]"
                text={decision.issue}
              />
              <DecisionColumn
                eyebrow="Decision"
                iconClass={tone.accentText}
                text={decision.decision}
              />
              <DecisionColumn
                eyebrow="Result"
                iconClass="text-[#336d48]"
                text={decision.result}
              />
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 lg:grid-cols-2">
            <ComparisonPanel
              items={caseStudy.beforeAfter.beforeItems}
              title={caseStudy.beforeAfter.beforeTitle}
              variant="before"
            />
            <ComparisonPanel
              items={caseStudy.beforeAfter.afterItems}
              title={caseStudy.beforeAfter.afterTitle}
              variant="after"
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <SectionIntro
          eyebrow="Final direction"
          title="Show the strongest moments, not every screen."
          description="A case study can feel rich with four to six important moments. The goal is to make the solution understandable at a glance, then let captions do the thinking."
        />

        <div className="mx-auto mt-8 grid max-w-6xl gap-5 md:grid-cols-2">
          {caseStudy.finalMoments.map((moment, index) => (
            <article
              className="overflow-hidden rounded-[8px] border border-[rgb(226_232_240_/_0.78)] bg-[rgb(255_255_255_/_0.74)] shadow-[0_18px_52px_rgb(15_23_42_/_0.08)] backdrop-blur-sm"
              key={moment.title}
            >
              <MiniScreen index={index} toneClass={tone} title={moment.title} />
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-semibold leading-6 text-[var(--ink)]">
                  {moment.title}
                </h3>
                <p className="mt-3 text-sm font-light leading-7 text-[var(--ink-soft)]">
                  {moment.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {moment.tags.map((tag) => (
                    <li
                      className="rounded-full border border-[rgb(226_232_240_/_0.74)] bg-[rgb(248_250_252_/_0.78)] px-3 py-1 text-xs font-normal text-[var(--ink-soft)]"
                      key={tag}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <div>
            <p className="text-xs font-medium uppercase tracking-normal text-[var(--muted)]">
              Impact
            </p>
            <h2 className="mt-4 text-[clamp(2rem,5vw,3.55rem)] font-semibold leading-[0.98] tracking-normal text-[var(--ink)]">
              Make the value clear without pretending every project has public metrics.
            </h2>
            <p className="mt-5 text-base font-light leading-8 text-[var(--ink-soft)]">
              {caseStudy.reflection}
            </p>
          </div>

          <div className="grid gap-4">
            {caseStudy.impact.map((item) => (
              <article
                className={`rounded-[8px] border bg-[rgb(255_255_255_/_0.76)] p-5 shadow-[0_16px_44px_rgb(15_23_42_/_0.07)] backdrop-blur-sm ${tone.border}`}
                key={item.label}
              >
                <p className={`text-sm font-semibold leading-6 ${tone.accentText}`}>
                  {item.label}
                </p>
                <p className="mt-2 text-base font-light leading-8 text-[var(--ink-soft)]">
                  {item.value}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-16 pt-8 sm:px-8 sm:pb-20 lg:px-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-[8px] border border-[rgb(226_232_240_/_0.76)] bg-[rgb(255_255_255_/_0.76)] p-5 shadow-[0_18px_52px_rgb(15_23_42_/_0.08)] backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-xs font-medium uppercase tracking-normal text-[var(--muted)]">
              Case study pattern
            </p>
            <p className="mt-2 max-w-2xl text-base font-light leading-7 text-[var(--ink-soft)]">
              Short enough to finish, structured enough to prove the thinking,
              and visual enough to avoid the newspaper problem.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] border border-[var(--ink)] bg-[var(--ink)] px-4 text-sm font-medium text-[var(--paper-bright)] shadow-[0_14px_34px_rgb(15_23_42_/_0.12)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#242428] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--paper)]"
              href="/#work"
            >
              More work
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              className="inline-flex h-11 items-center justify-center rounded-[8px] border border-[rgb(226_232_240_/_0.84)] bg-[rgb(255_255_255_/_0.76)] px-4 text-sm font-medium text-[var(--ink)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--paper-bright)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--paper)]"
              href="#top"
            >
              Back to top
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function CaseStudyHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[rgb(226_232_240_/_0.62)] bg-[rgb(248_250_252_/_0.78)] px-5 py-3 shadow-[0_12px_36px_rgb(15_23_42_/_0.06)] backdrop-blur-xl sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-5">
        <Link
          aria-label="Go to portfolio home"
          className="inline-flex items-center transition duration-300 hover:translate-x-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--paper)]"
          href="/"
        >
          <Image
            alt={heroCopy.logoAlt}
            className="h-8 w-auto sm:h-9"
            height={490}
            priority
            src="/aa-logo.svg"
            width={682}
          />
        </Link>

        <nav aria-label="Case study navigation" className="flex items-center gap-4">
          <Link
            className="hidden h-9 items-center rounded-[6px] px-1 text-sm font-medium leading-none text-[var(--ink-soft)] transition duration-300 hover:-translate-y-0.5 hover:text-[var(--ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--paper)] sm:inline-flex"
            href="/#work"
          >
            Work
          </Link>
          <Link
            className="inline-flex h-9 items-center rounded-[6px] px-1 text-sm font-medium leading-none text-[var(--ink-soft)] transition duration-300 hover:-translate-y-0.5 hover:text-[var(--ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--paper)]"
            href="#footer"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}

function CaseStudyHeroVisual({ caseStudy }: CaseStudyPageProps) {
  const { project } = caseStudy;
  const tone = projectToneStyles[project.tone];

  return (
    <div
      className={`relative isolate min-h-[30rem] overflow-hidden rounded-[8px] border border-[rgb(226_232_240_/_0.78)] p-5 sm:p-7 ${tone.canvas} ${tone.glow}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(20_20_22_/_0.06)_1px,transparent_1px),linear-gradient(0deg,rgb(20_20_22_/_0.045)_1px,transparent_1px)] bg-[length:36px_36px]"
      />
      <div
        aria-hidden="true"
        className={`absolute inset-y-0 right-0 -z-10 w-2/5 ${tone.wash}`}
      />

      <div className="flex h-full flex-col justify-between gap-8">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-normal text-[var(--muted)]">
              {project.client}
            </p>
            <Image
              alt={`${project.client} logo`}
              className={`mt-3 max-w-full object-contain opacity-[0.88] mix-blend-multiply ${project.logo.className}`}
              height={project.logo.height}
              priority
              sizes="(min-width: 1024px) 240px, 190px"
              src={project.logo.src}
              width={project.logo.width}
            />
          </div>

          <span
            className={`grid h-11 w-11 flex-none place-items-center rounded-[8px] shadow-[0_12px_28px_rgb(15_23_42_/_0.12)] ${tone.marker}`}
          >
            <Sparkle aria-hidden="true" className="h-4 w-4" strokeWidth={2.35} />
          </span>
        </div>

        <div className="rounded-[8px] border border-[rgb(255_255_255_/_0.72)] bg-[rgb(255_255_255_/_0.48)] p-4 shadow-[0_18px_48px_rgb(15_23_42_/_0.1)] backdrop-blur-md">
          <div className="flex items-center justify-between gap-4 border-b border-[rgb(226_232_240_/_0.7)] pb-3">
            <div className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${tone.marker}`} />
              <span className="text-xs font-medium text-[var(--ink-soft)]">
                Story map
              </span>
            </div>
            <span className="rounded-full border border-[rgb(226_232_240_/_0.74)] bg-[rgb(255_255_255_/_0.62)] px-2.5 py-1 text-[0.7rem] font-medium text-[var(--muted)]">
              Skimmable depth
            </span>
          </div>

          <div className="mt-4 grid gap-3">
            {caseStudy.snapshot.map((item, index) => (
              <div
                className="grid grid-cols-[2.5rem_1fr] gap-3 rounded-[8px] border border-[rgb(226_232_240_/_0.58)] bg-[rgb(255_255_255_/_0.48)] p-3"
                key={item.label}
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-[8px] text-xs font-semibold ${index === 1 ? tone.marker : "bg-[rgb(248_250_252_/_0.86)] text-[var(--muted)]"}`}
                >
                  {index + 1}
                </span>
                <div>
                  <p className="text-xs font-medium text-[var(--ink)]">
                    {item.label}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs font-light leading-5 text-[var(--ink-soft)]">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[1.2fr_0.8fr_1fr] gap-3">
          {[0, 1, 2].map((item) => (
            <span
              aria-hidden="true"
              className="h-16 rounded-[8px] border border-[rgb(255_255_255_/_0.7)] bg-[rgb(255_255_255_/_0.38)] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.54)] backdrop-blur-sm"
              key={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <dl className="rounded-[8px] border border-[rgb(226_232_240_/_0.72)] bg-[rgb(255_255_255_/_0.72)] p-4 shadow-[0_12px_34px_rgb(15_23_42_/_0.06)] backdrop-blur-sm">
      <dt className="text-xs font-medium uppercase tracking-normal text-[var(--muted)]">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-light leading-6 text-[var(--ink-soft)]">
        {value}
      </dd>
    </dl>
  );
}

function StoryBand({
  children,
  eyebrow,
  title,
  toneClass,
}: {
  children: React.ReactNode;
  eyebrow: string;
  title: string;
  toneClass: string;
}) {
  return (
    <article className="rounded-[8px] border border-[rgb(226_232_240_/_0.78)] bg-[rgb(255_255_255_/_0.74)] p-5 shadow-[0_16px_46px_rgb(15_23_42_/_0.07)] backdrop-blur-sm sm:p-6">
      <p className={`text-xs font-medium uppercase tracking-normal ${toneClass}`}>
        {eyebrow}
      </p>
      <h3 className="mt-3 text-2xl font-semibold leading-[1.05] tracking-normal text-[var(--ink)]">
        {title}
      </h3>
      <p className="mt-4 text-base font-light leading-8 text-[var(--ink-soft)]">
        {children}
      </p>
    </article>
  );
}

function SectionIntro({
  description,
  eyebrow,
  title,
}: {
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mx-auto max-w-6xl">
      <p className="text-xs font-medium uppercase tracking-normal text-[var(--muted)]">
        {eyebrow}
      </p>
      <div className="mt-4 grid gap-5 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
        <h2 className="max-w-3xl text-[clamp(2rem,5vw,3.65rem)] font-semibold leading-[0.98] tracking-normal text-[var(--ink)]">
          {title}
        </h2>
        <p className="max-w-2xl text-base font-light leading-8 text-[var(--ink-soft)] lg:justify-self-end">
          {description}
        </p>
      </div>
    </div>
  );
}

function DecisionColumn({
  eyebrow,
  iconClass,
  text,
}: {
  eyebrow: string;
  iconClass: string;
  text: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <CircleDot
          aria-hidden="true"
          className={`h-4 w-4 ${iconClass}`}
          strokeWidth={2.35}
        />
        <p className="text-xs font-medium uppercase tracking-normal text-[var(--muted)]">
          {eyebrow}
        </p>
      </div>
      <p className="mt-3 text-sm font-light leading-7 text-[var(--ink-soft)]">
        {text}
      </p>
    </div>
  );
}

function ComparisonPanel({
  items,
  title,
  variant,
}: {
  items: string[];
  title: string;
  variant: "before" | "after";
}) {
  const isAfter = variant === "after";

  return (
    <article
      className={`overflow-hidden rounded-[8px] border bg-[rgb(255_255_255_/_0.74)] shadow-[0_18px_52px_rgb(15_23_42_/_0.08)] backdrop-blur-sm ${
        isAfter
          ? "border-[rgb(51_109_72_/_0.24)]"
          : "border-[rgb(155_71_114_/_0.24)]"
      }`}
    >
      <div
        className={`relative h-56 overflow-hidden ${
          isAfter
            ? "bg-[linear-gradient(135deg,rgb(223_247_223_/_0.92),rgb(255_255_255_/_0.82))]"
            : "bg-[linear-gradient(135deg,rgb(245_215_234_/_0.9),rgb(255_255_255_/_0.82))]"
        }`}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgb(20_20_22_/_0.06)_1px,transparent_1px),linear-gradient(0deg,rgb(20_20_22_/_0.045)_1px,transparent_1px)] bg-[length:32px_32px]"
        />
        <div className="absolute inset-x-5 top-5 rounded-[8px] border border-[rgb(255_255_255_/_0.7)] bg-[rgb(255_255_255_/_0.5)] p-4 shadow-[0_14px_38px_rgb(15_23_42_/_0.1)] backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="h-3 w-28 rounded-full bg-[rgb(20_20_22_/_0.13)]" />
            <span
              className={`h-8 w-8 rounded-[8px] ${
                isAfter ? "bg-[#336d48]" : "bg-[#9b4772]"
              }`}
            />
          </div>
          <div className="mt-5 grid gap-2">
            <span className="h-3 rounded-full bg-[rgb(20_20_22_/_0.12)]" />
            <span className="h-3 w-3/4 rounded-full bg-[rgb(20_20_22_/_0.1)]" />
            <span className="h-3 w-1/2 rounded-full bg-[rgb(20_20_22_/_0.08)]" />
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <h3 className="text-2xl font-semibold leading-[1.05] text-[var(--ink)]">
          {title}
        </h3>
        <ul className="mt-5 grid gap-3">
          {items.map((item) => (
            <li className="flex gap-3 text-sm font-light leading-7 text-[var(--ink-soft)]" key={item}>
              <Check
                aria-hidden="true"
                className={`mt-1 h-4 w-4 flex-none ${
                  isAfter ? "text-[#336d48]" : "text-[#9b4772]"
                }`}
                strokeWidth={2.35}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function MiniScreen({
  index,
  title,
  toneClass,
}: {
  index: number;
  title: string;
  toneClass: ProjectToneStyle;
}) {
  return (
    <div className={`relative h-60 overflow-hidden ${toneClass.canvas}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgb(20_20_22_/_0.055)_1px,transparent_1px),linear-gradient(0deg,rgb(20_20_22_/_0.04)_1px,transparent_1px)] bg-[length:32px_32px]"
      />

      <div className="absolute inset-x-5 top-5 rounded-[8px] border border-[rgb(255_255_255_/_0.72)] bg-[rgb(255_255_255_/_0.58)] p-4 shadow-[0_18px_48px_rgb(15_23_42_/_0.11)] backdrop-blur-md">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-normal text-[var(--muted)]">
              Moment {String(index + 1).padStart(2, "0")}
            </p>
            <p className="mt-1 line-clamp-1 text-sm font-semibold text-[var(--ink)]">
              {title}
            </p>
          </div>
          <span
            className={`grid h-9 w-9 flex-none place-items-center rounded-[8px] ${toneClass.marker}`}
          >
            <Layers3 aria-hidden="true" className="h-4 w-4" strokeWidth={2.35} />
          </span>
        </div>

        <div className="mt-5 grid grid-cols-[0.78fr_1.22fr] gap-3">
          <div className="grid gap-2">
            {[0, 1, 2, 3].map((item) => (
              <span
                aria-hidden="true"
                className="h-8 rounded-[8px] border border-[rgb(226_232_240_/_0.58)] bg-[rgb(248_250_252_/_0.62)]"
                key={item}
              />
            ))}
          </div>
          <div className="grid gap-2">
            <span className={`h-3 rounded-full ${toneClass.rail}`} />
            <span className="h-20 rounded-[8px] border border-[rgb(226_232_240_/_0.58)] bg-[rgb(248_250_252_/_0.62)]" />
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((item) => (
                <span
                  aria-hidden="true"
                  className="h-12 rounded-[8px] border border-[rgb(226_232_240_/_0.54)] bg-[rgb(255_255_255_/_0.54)]"
                  key={item}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
