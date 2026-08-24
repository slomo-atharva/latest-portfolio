import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CircleDot,
  Compass,
  Sparkle,
} from "lucide-react";
import {
  aboutCapabilities,
  aboutExperience,
  aboutFacts,
  aboutIntro,
  aboutPrinciples,
  type AboutCapability,
  type AboutFact,
  type AboutRole,
  type AboutPrinciple,
} from "@/data/about";
import { clientLogos } from "@/data/clients";

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
        className="absolute inset-x-0 top-0 -z-10 h-[38rem] bg-[radial-gradient(58rem_30rem_at_76%_0%,rgb(223_238_255_/_0.55),transparent_62%),radial-gradient(46rem_26rem_at_10%_2%,rgb(245_215_234_/_0.26),transparent_60%),linear-gradient(180deg,rgb(253_253_255_/_0.9),rgb(251_252_254_/_0))]"
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-10 py-10 sm:py-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
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

          <div className="grid gap-5">
            {aboutExperience.map((role) => (
              <RoleCard key={role.id} role={role} />
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

      <div className="relative isolate overflow-hidden border-b border-[rgb(226_232_240_/_0.78)] px-5 py-6 sm:px-6">
        <div
          aria-hidden="true"
          className="hero-dot-grid absolute inset-0 -z-10 opacity-40"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgb(223_238_255_/_0.46),transparent_48%,rgb(245_215_234_/_0.3))]"
        />

        <div className="flex items-center justify-between gap-4">
          <p className={eyebrowClass}>Worked with</p>
          <span className="text-xs font-light leading-5 text-[var(--muted)]">
            Government &amp; enterprise
          </span>
        </div>

        <ul className="mt-6 grid grid-cols-2 items-center gap-x-5 gap-y-5 sm:grid-cols-3">
          {clientLogos.map((client) => (
            <li
              className="flex h-9 items-center justify-center"
              key={client.name}
            >
              <Image
                alt={`${client.name} logo`}
                className="h-auto max-h-9 w-auto max-w-full object-contain opacity-[0.82] mix-blend-multiply"
                height={client.height}
                sizes="140px"
                src={client.src}
                width={client.width}
              />
            </li>
          ))}
        </ul>
      </div>

      <dl className="divide-y divide-[rgb(226_232_240_/_0.76)]">
        {aboutFacts.map((fact) => (
          <FactRow fact={fact} key={fact.label} />
        ))}
      </dl>
    </aside>
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
    <article className="grid gap-4 p-5 sm:grid-cols-[3rem_1fr] sm:gap-5 sm:p-6">
      <span className="grid h-10 w-10 place-items-center rounded-[8px] bg-[var(--note-mint)] text-sm font-medium text-[#336d48]">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="min-w-0">
        <h3 className="text-xl font-medium leading-7 tracking-normal text-[var(--ink)]">
          {capability.title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm font-light leading-7 text-[var(--ink-soft)] sm:text-base sm:leading-8">
          {capability.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-2">
          {capability.points.map((point) => (
            <li
              className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(226_232_240_/_0.9)] bg-[rgb(248_250_252_/_0.8)] px-2.5 py-1 text-xs font-normal leading-5 text-[var(--ink-soft)]"
              key={point}
            >
              <Check
                aria-hidden="true"
                className="h-3 w-3 flex-none text-[var(--purple)]"
                strokeWidth={2.6}
              />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function RoleCard({ role }: { role: AboutRole }) {
  return (
    <article className={`${panelClass} overflow-hidden`}>
      <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3 border-b border-[rgb(226_232_240_/_0.78)] bg-[rgb(248_250_252_/_0.6)] p-5 sm:p-6">
        <div className="min-w-0">
          {role.isCurrent ? (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgb(51_109_72_/_0.24)] bg-[var(--note-mint)] px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.08em] text-[#336d48]">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#336d48]"
              />
              Now
            </span>
          ) : null}

          <h3
            className={`text-xl font-medium leading-7 tracking-normal text-[var(--ink)] sm:text-2xl ${
              role.isCurrent ? "mt-3" : ""
            }`}
          >
            {role.title}
          </h3>
          <p className="mt-1.5 flex flex-wrap items-center gap-2 text-sm font-light text-[var(--ink-soft)]">
            <span className="font-medium text-[var(--ink)]">{role.company}</span>
            <span
              aria-hidden="true"
              className="h-1 w-1 flex-none rounded-full bg-[rgb(148_163_184_/_0.7)]"
            />
            {role.employmentType}
          </p>
        </div>

        <div className="sm:text-right">
          <p className="text-sm font-medium leading-6 text-[var(--ink)]">
            {role.period}
          </p>
          <p className="mt-0.5 text-xs font-light leading-5 text-[var(--muted)]">
            {role.duration}
          </p>
        </div>
      </header>

      <ul className="divide-y divide-[rgb(226_232_240_/_0.7)]">
        {role.engagements.map((engagement) => (
          <li className="p-5 sm:p-6" key={engagement.client}>
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h4 className="flex items-center gap-2.5 text-base font-medium leading-6 text-[var(--ink)]">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 flex-none rounded-full bg-[var(--purple)]"
                />
                {engagement.client}
              </h4>
              {engagement.context ? (
                <span className="text-xs font-light leading-5 text-[var(--muted)]">
                  {engagement.context}
                </span>
              ) : null}
            </div>

            <p className="mt-2.5 max-w-3xl pl-4 text-sm font-light leading-7 text-[var(--ink-soft)]">
              {engagement.description}
            </p>

            {engagement.metrics ? (
              <ul className="mt-3.5 flex flex-wrap gap-2 pl-4">
                {engagement.metrics.map((metric) => (
                  <li
                    className="rounded-full border border-[rgb(33_58_143_/_0.18)] bg-[rgb(223_238_255_/_0.6)] px-2.5 py-1 text-xs font-medium leading-5 text-[var(--blue)]"
                    key={metric}
                  >
                    {metric}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>

      {role.sideProject || role.skills ? (
        <div className="grid gap-4 border-t border-[rgb(226_232_240_/_0.78)] bg-[rgb(248_250_252_/_0.5)] p-5 sm:p-6">
          {role.sideProject ? (
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <p className={eyebrowClass}>Side project</p>
              <p className="text-sm font-medium text-[var(--ink)]">
                {role.sideProject.name}
              </p>
              <p className="text-sm font-light text-[var(--ink-soft)]">
                {role.sideProject.description}
              </p>
            </div>
          ) : null}

          {role.skills ? (
            <div className="flex flex-wrap items-center gap-2">
              <p className={`${eyebrowClass} mr-1`}>Key skills</p>
              {role.skills.map((skill) => (
                <span
                  className="rounded-full border border-[rgb(226_232_240_/_0.9)] bg-[var(--paper-bright)] px-2.5 py-1 text-xs font-normal leading-5 text-[var(--ink-soft)]"
                  key={skill}
                >
                  {skill}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
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
