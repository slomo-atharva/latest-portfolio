import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CircleDot,
  Compass,
  Layers3,
  Sparkle,
} from "lucide-react";
import {
  aboutCapabilities,
  aboutExperience,
  aboutFacts,
  aboutIntro,
  aboutPrinciples,
  type AboutCapability,
  type AboutExperience,
  type AboutFact,
  type AboutPrinciple,
} from "@/data/about";

const panelClass =
  "rounded-[8px] border border-[rgb(226_232_240_/_0.82)] bg-[rgb(255_255_255_/_0.72)] shadow-[0_18px_56px_rgb(15_23_42_/_0.07)] backdrop-blur-xl";

const eyebrowClass =
  "text-xs font-medium uppercase tracking-normal text-[var(--muted)]";

export function AboutMeSection() {
  return (
    <section
      aria-labelledby="about-title"
      className="relative isolate overflow-hidden bg-[var(--paper)] px-5 pb-16 pt-24 text-[var(--ink)] sm:px-8 sm:pb-20 sm:pt-28 lg:px-12"
      id="about"
    >
      <div className="hero-dot-grid absolute inset-0 -z-20 opacity-[0.14]" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_80%_20%,rgb(223_238_255_/_0.72),transparent_32%),radial-gradient(circle_at_18%_18%,rgb(245_215_234_/_0.38),transparent_26%),linear-gradient(180deg,rgb(253_253_255_/_0.94),rgb(251_252_254_/_0))]"
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid min-h-[calc(100svh-5rem)] items-start gap-9 py-12 sm:py-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-[rgb(226_232_240_/_0.86)] bg-[rgb(255_255_255_/_0.78)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] shadow-[0_10px_28px_rgb(15_23_42_/_0.06)]">
              <Sparkle
                aria-hidden="true"
                className="h-3.5 w-3.5 text-[var(--purple)]"
                strokeWidth={2.35}
              />
              {aboutIntro.kicker}
            </p>

            <h1
              className="mt-6 max-w-[42rem] text-[clamp(2.55rem,5.4vw,4.3rem)] font-semibold leading-[0.97] tracking-normal text-[var(--ink)]"
              id="about-title"
            >
              {aboutIntro.title}
            </h1>

            <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-[var(--ink-soft)] sm:text-xl sm:leading-9">
              {aboutIntro.lead}
            </p>

            <p className="mt-7 max-w-2xl border-l border-[rgb(226_232_240_/_0.9)] pl-5 text-sm font-light leading-7 text-[var(--ink-soft)] sm:text-base sm:leading-8">
              {aboutIntro.paragraphs[0]}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-[8px] border border-[rgb(20_20_22_/_0.86)] bg-[var(--ink)] px-5 text-sm font-medium text-[var(--paper-bright)] shadow-[0_18px_44px_rgb(15_23_42_/_0.14)] transition duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--paper)]"
                href="/#work"
              >
                Selected work
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={2.35}
                />
              </Link>
              <Link
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-[8px] border border-[rgb(226_232_240_/_0.86)] bg-[rgb(255_255_255_/_0.78)] px-5 text-sm font-medium text-[var(--ink)] transition duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--paper)]"
                href="#experience"
              >
                Experience
                <ArrowDown
                  aria-hidden="true"
                  className="h-4 w-4 transition duration-300 group-hover:translate-y-0.5"
                  strokeWidth={2.35}
                />
              </Link>
            </div>
          </div>

          <ProfilePanel />
        </div>

        <section
          aria-labelledby="about-capabilities-title"
          className="grid gap-8 border-t border-[rgb(226_232_240_/_0.82)] py-14 sm:py-16 lg:grid-cols-[0.36fr_0.64fr] lg:gap-14"
          id="what-i-do"
        >
          <SectionIntro
            eyebrow="What I do"
            title="Useful structure for messy product work."
          >
            I usually sit where product direction, user understanding, and
            detailed interface design meet.
          </SectionIntro>

          <div className={`${panelClass} divide-y divide-[rgb(226_232_240_/_0.76)]`}>
            {aboutCapabilities.map((capability, index) => (
              <CapabilityRow
                capability={capability}
                index={index}
                key={capability.title}
              />
            ))}
          </div>
        </section>

        <section
          aria-labelledby="about-experience-title"
          className="grid gap-8 border-t border-[rgb(226_232_240_/_0.82)] py-14 sm:py-16 lg:grid-cols-[0.36fr_0.64fr] lg:gap-14"
          id="experience"
        >
          <SectionIntro
            eyebrow="Experience"
            title="Recent work across serious, complex products."
          >
            {aboutIntro.current}
          </SectionIntro>

          <div className={`${panelClass} divide-y divide-[rgb(226_232_240_/_0.76)] overflow-hidden`}>
            {aboutExperience.map((item) => (
              <ExperienceRow item={item} key={item.label} />
            ))}
          </div>
        </section>

        <section
          aria-labelledby="about-principles-title"
          className="grid gap-8 border-t border-[rgb(226_232_240_/_0.82)] pt-14 sm:pt-16 lg:grid-cols-[0.36fr_0.64fr] lg:gap-14"
        >
          <SectionIntro
            eyebrow="How I work"
            title="Calm, practical, and a little obsessive about clarity."
          >
            The work should feel thoughtful without asking people to notice the
            design before they notice the product.
          </SectionIntro>

          <div className="divide-y divide-[rgb(226_232_240_/_0.82)]">
            {aboutPrinciples.map((principle, index) => (
              <PrincipleRow
                index={index}
                key={principle.id}
                principle={principle}
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function ProfilePanel() {
  return (
    <aside
      aria-label="Akshay profile snapshot"
      className={`${panelClass} overflow-hidden`}
    >
      <div className="flex items-start justify-between gap-4 border-b border-[rgb(226_232_240_/_0.78)] bg-[rgb(248_250_252_/_0.74)] p-5 sm:p-6">
        <div>
          <p className={eyebrowClass}>Profile snapshot</p>
          <p className="mt-2 max-w-xs text-sm font-light leading-6 text-[var(--ink-soft)]">
            A compact read of the kind of product problems I usually work on.
          </p>
        </div>
        <span className="grid h-11 w-11 flex-none place-items-center rounded-[8px] bg-[var(--note-blue)] text-[var(--blue)] shadow-[0_10px_24px_rgb(15_23_42_/_0.09)]">
          <Compass aria-hidden="true" className="h-5 w-5" strokeWidth={2.35} />
        </span>
      </div>

      <div className="relative min-h-[14rem] overflow-hidden border-b border-[rgb(226_232_240_/_0.78)] px-5 py-5 sm:px-6">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgb(20_20_22_/_0.055)_1px,transparent_1px),linear-gradient(0deg,rgb(20_20_22_/_0.04)_1px,transparent_1px)] bg-[length:32px_32px]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(90deg,transparent,rgb(223_238_255_/_0.6))]"
        />

        <div className="relative z-10 flex h-full min-h-[12rem] flex-col justify-between">
          <div className="flex items-start justify-between gap-5">
            <div className="grid h-16 w-24 place-items-center rounded-[8px] border border-[rgb(226_232_240_/_0.8)] bg-[rgb(255_255_255_/_0.72)] shadow-[0_14px_34px_rgb(15_23_42_/_0.08)] backdrop-blur-md">
              <Image
                alt="AA logo"
                className="h-9 w-auto opacity-80"
                height={490}
                priority
                src="/aa-logo.svg"
                width={682}
              />
            </div>
            <div className="text-right">
              <p className={eyebrowClass}>Mode</p>
              <p className="mt-2 text-sm font-medium leading-6 text-[var(--ink)]">
                Strategy to UI
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            <div className="grid grid-cols-[0.72fr_1.28fr] gap-3">
              <VisualTile label="Research" />
              <VisualTile label="Structure" featured />
            </div>
            <div className="grid grid-cols-[1.18fr_0.82fr] gap-3">
              <VisualTile label="Prototype" featured />
              <VisualTile label="Ship" />
            </div>
          </div>
        </div>
      </div>

      <dl className="divide-y divide-[rgb(226_232_240_/_0.76)]">
        {aboutFacts.map((fact) => (
          <FactRow fact={fact} key={fact.label} />
        ))}
      </dl>
    </aside>
  );
}

function VisualTile({
  featured = false,
  label,
}: {
  featured?: boolean;
  label: string;
}) {
  return (
    <div
      className={`flex h-14 items-center justify-between gap-3 rounded-[8px] border px-4 text-sm font-medium shadow-[inset_0_1px_0_rgb(255_255_255_/_0.56)] ${
        featured
          ? "border-[rgb(109_74_255_/_0.24)] bg-[rgb(255_255_255_/_0.66)] text-[var(--ink)]"
          : "border-[rgb(226_232_240_/_0.72)] bg-[rgb(255_255_255_/_0.42)] text-[var(--ink-soft)]"
      }`}
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className={`h-2.5 w-2.5 rounded-full ${
          featured ? "bg-[var(--purple)]" : "bg-[rgb(112_112_120_/_0.42)]"
        }`}
      />
    </div>
  );
}

function SectionIntro({
  children,
  eyebrow,
  title,
}: {
  children: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className={eyebrowClass}>{eyebrow}</p>
      <h2
        className="mt-4 max-w-md text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.04] tracking-normal text-[var(--ink)]"
        id={
          eyebrow === "What I do"
            ? "about-capabilities-title"
            : eyebrow === "Experience"
              ? "about-experience-title"
              : "about-principles-title"
        }
      >
        {title}
      </h2>
      <p className="mt-5 max-w-md text-base font-light leading-8 text-[var(--ink-soft)]">
        {children}
      </p>
    </div>
  );
}

function FactRow({ fact }: { fact: AboutFact }) {
  return (
    <div className="grid gap-3 p-4 sm:grid-cols-[0.4fr_0.6fr] sm:p-5">
      <dt className={eyebrowClass}>{fact.label}</dt>
      <dd>
        <p className="text-base font-medium leading-7 tracking-normal text-[var(--ink)]">
          {fact.value}
        </p>
        <p className="mt-1.5 text-sm font-light leading-6 text-[var(--ink-soft)]">
          {fact.detail}
        </p>
      </dd>
    </div>
  );
}

function CapabilityRow({
  capability,
  index,
}: {
  capability: AboutCapability;
  index: number;
}) {
  return (
    <article className="grid gap-5 p-5 sm:grid-cols-[3.5rem_1fr] sm:p-6 lg:grid-cols-[3.5rem_0.95fr_1.05fr]">
      <div className="flex items-center gap-3 sm:block">
        <span className="grid h-10 w-10 place-items-center rounded-[8px] bg-[var(--note-mint)] text-[#336d48]">
          <Layers3 aria-hidden="true" className="h-4 w-4" strokeWidth={2.35} />
        </span>
        <p className="text-sm font-medium leading-6 text-[var(--muted)] sm:mt-4">
          {String(index + 1).padStart(2, "0")}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-medium leading-7 tracking-normal text-[var(--ink)]">
          {capability.title}
        </h3>
        <p className="mt-3 text-sm font-light leading-7 text-[var(--ink-soft)] sm:text-base sm:leading-8">
          {capability.description}
        </p>
      </div>

      <ul className="flex flex-wrap gap-2 lg:justify-end">
        {capability.points.map((point) => (
          <li
            className="inline-flex h-9 items-center gap-2 rounded-full border border-[rgb(226_232_240_/_0.78)] bg-[rgb(248_250_252_/_0.72)] px-3 text-sm font-normal text-[var(--ink)]"
            key={point}
          >
            <Check
              aria-hidden="true"
              className="h-3.5 w-3.5 flex-none text-[var(--purple)]"
              strokeWidth={2.35}
            />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}

function ExperienceRow({ item }: { item: AboutExperience }) {
  return (
    <article className="grid gap-4 p-5 sm:grid-cols-[7rem_1fr] sm:p-6">
      <p className={eyebrowClass}>{item.label}</p>
      <div>
        <h3 className="text-xl font-medium leading-7 tracking-normal text-[var(--ink)]">
          {item.title}
        </h3>
        <p className="mt-3 text-sm font-light leading-7 text-[var(--ink-soft)] sm:text-base sm:leading-8">
          {item.description}
        </p>
      </div>
    </article>
  );
}

function PrincipleRow({
  index,
  principle,
}: {
  index: number;
  principle: AboutPrinciple;
}) {
  return (
    <article className="grid gap-4 py-6 first:pt-0 last:pb-0 sm:grid-cols-[4rem_1fr]">
      <p className="flex items-center gap-2 text-sm font-medium leading-6 text-[var(--muted)]">
        <CircleDot
          aria-hidden="true"
          className="h-4 w-4 text-[var(--purple)]"
          strokeWidth={2.35}
        />
        {String(index + 1).padStart(2, "0")}
      </p>
      <div>
        <h3 className="text-xl font-medium leading-7 tracking-normal text-[var(--ink)]">
          {principle.title}
        </h3>
        <p className="mt-3 text-sm font-light leading-7 text-[var(--ink-soft)] sm:text-base sm:leading-8">
          {principle.description}
        </p>
      </div>
    </article>
  );
}
