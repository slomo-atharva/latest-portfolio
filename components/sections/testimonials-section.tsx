import { Award, Quote, Rocket, Sparkle } from "lucide-react";
import {
  praiseCopy,
  testimonials,
  type Testimonial,
  type TestimonialTone,
} from "@/data/testimonials";

type ToneStyle = {
  badge: string;
  glow: string;
  icon: string;
  rail: string;
};

const toneStyles: Record<TestimonialTone, ToneStyle> = {
  blue: {
    badge: "border-[rgb(111_164_216_/_0.36)] bg-[rgb(223_238_255_/_0.62)]",
    glow: "bg-[radial-gradient(circle_at_0%_0%,rgb(223_238_255_/_0.66),transparent_34%),radial-gradient(circle_at_100%_100%,rgb(109_74_255_/_0.08),transparent_32%)]",
    icon: "bg-[var(--blue)] text-[var(--paper-bright)]",
    rail: "bg-[linear-gradient(180deg,rgb(111_164_216_/_0.72),rgb(109_74_255_/_0.38))]",
  },
  gold: {
    badge: "border-[rgb(197_151_43_/_0.34)] bg-[rgb(255_246_168_/_0.58)]",
    glow: "bg-[radial-gradient(circle_at_0%_0%,rgb(255_246_168_/_0.58),transparent_34%),radial-gradient(circle_at_100%_100%,rgb(245_215_234_/_0.1),transparent_32%)]",
    icon: "bg-[#9a6b19] text-[var(--paper-bright)]",
    rail: "bg-[linear-gradient(180deg,rgb(197_151_43_/_0.72),rgb(154_107_25_/_0.38))]",
  },
};

export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="landing-snap-panel relative isolate overflow-hidden bg-[var(--paper)] px-5 py-10 text-[var(--ink)] sm:px-8 sm:py-12 lg:px-12"
      id="praise"
    >
      <div className="hero-dot-grid absolute inset-0 -z-10 opacity-30" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(226_232_240_/_0.78),transparent)]"
      />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-12">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[rgb(226_232_240_/_0.8)] bg-[rgb(255_255_255_/_0.76)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] shadow-[0_10px_28px_rgb(15_23_42_/_0.07)] backdrop-blur-sm">
              <Sparkle
                aria-hidden="true"
                className="h-3.5 w-3.5 text-[var(--purple)]"
                strokeWidth={2.35}
              />
              {praiseCopy.kicker}
            </p>

            <h2
              className="mt-4 max-w-lg text-[clamp(1.65rem,3.2vw,2.45rem)] font-semibold leading-[1.05] tracking-normal text-[var(--ink)]"
              id="testimonials-title"
            >
              {praiseCopy.title}
            </h2>
          </div>

          <p className="max-w-xl text-sm font-light leading-7 text-[var(--ink-soft)] sm:text-base">
            {praiseCopy.description}
          </p>
        </div>

        <div className="mt-7 grid items-stretch gap-4 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const tone = toneStyles[testimonial.tone];
  const Icon = testimonial.tone === "blue" ? Rocket : Award;

  return (
    <article className="group relative isolate flex h-full min-h-[21rem] flex-col overflow-hidden rounded-[8px] border border-[rgb(226_232_240_/_0.86)] bg-[var(--paper-bright)] p-4 shadow-[0_18px_50px_rgb(15_23_42_/_0.08),inset_0_1px_0_rgb(255_255_255_/_0.92)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_66px_rgb(15_23_42_/_0.12),inset_0_1px_0_rgb(255_255_255_/_0.92)] sm:p-5">
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 opacity-[0.72] ${tone.glow}`}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgb(255_255_255_/_0.92),rgb(255_255_255_/_0.74)_48%,rgb(248_250_252_/_0.64))]"
      />
      <div
        aria-hidden="true"
        className={`absolute left-0 top-0 h-full w-1 ${tone.rail}`}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-5 top-0 -z-10 h-px bg-[linear-gradient(90deg,transparent,rgb(255_255_255_/_0.9),transparent)]"
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span className={`grid h-10 w-10 flex-none place-items-center rounded-[8px] shadow-[0_12px_30px_rgb(15_23_42_/_0.12)] ${tone.icon}`}>
            <Icon
              aria-hidden="true"
              className="h-4 w-4"
              strokeWidth={2.25}
            />
          </span>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold leading-5 text-[var(--ink)] sm:text-base">
              {testimonial.author}
            </h3>
            <p className="mt-0.5 text-xs font-light leading-5 text-[var(--muted)] sm:text-sm">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>

        <span className="hidden text-xs font-light leading-5 text-[var(--muted)] sm:inline">
          {testimonial.date}
        </span>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium text-[var(--ink-soft)] ${tone.badge}`}
        >
          <Quote
            aria-hidden="true"
            className="h-3.5 w-3.5"
            strokeWidth={2.25}
          />
          {testimonial.badge}
        </span>
        <span className="text-xs font-light leading-5 text-[var(--muted)] sm:hidden">
          {testimonial.date}
        </span>
      </div>

      <blockquote className="mb-5 mt-4">
        <p className="text-sm font-light leading-6 text-[var(--ink)] sm:text-[0.95rem] sm:leading-7">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>

      <div className="mt-auto flex items-center justify-between gap-4 border-t border-[rgb(226_232_240_/_0.76)] pt-4">
        <p className="text-xs font-medium uppercase tracking-normal text-[var(--muted)]">
          Keka praise
        </p>
        <span className="grid h-9 w-9 place-items-center rounded-[8px] border border-[rgb(226_232_240_/_0.74)] bg-[rgb(255_255_255_/_0.64)] text-xs font-semibold text-[var(--ink-soft)] shadow-[inset_0_1px_0_rgb(255_255_255_/_0.78)]">
          {testimonial.initials}
        </span>
      </div>
    </article>
  );
}
