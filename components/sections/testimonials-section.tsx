import { Quote, Sparkle } from "lucide-react";
import {
  praiseCopy,
  testimonials,
  type Testimonial,
  type TestimonialTone,
} from "@/data/testimonials";

type ToneStyle = {
  avatar: string;
  badge: string;
  bloom: string;
  mark: string;
};

const toneStyles: Record<TestimonialTone, ToneStyle> = {
  blue: {
    avatar: "bg-[var(--blue)] text-[var(--paper-bright)]",
    badge:
      "border-[rgb(33_58_143_/_0.2)] bg-[rgb(223_238_255_/_0.6)] text-[var(--blue)]",
    bloom: "bg-[rgb(223_238_255_/_0.8)]",
    mark: "text-[rgb(33_58_143_/_0.35)]",
  },
  gold: {
    avatar: "bg-[#9a6b19] text-[var(--paper-bright)]",
    badge:
      "border-[rgb(197_151_43_/_0.32)] bg-[rgb(255_246_168_/_0.55)] text-[#9a6b19]",
    bloom: "bg-[rgb(255_246_168_/_0.72)]",
    mark: "text-[rgb(154_107_25_/_0.35)]",
  },
};

export function TestimonialsSection() {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="landing-snap-panel relative isolate overflow-hidden bg-[var(--paper)] px-5 pb-10 pt-20 text-[var(--ink)] sm:px-8 sm:pb-12 sm:pt-24 lg:px-12"
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

        <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-2">
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

  return (
    <figure className="group relative isolate flex h-full flex-col overflow-hidden rounded-[8px] border border-[rgb(226_232_240_/_0.9)] bg-[var(--paper-bright)] p-6 shadow-[0_1px_2px_rgb(15_23_42_/_0.04),0_18px_50px_rgb(15_23_42_/_0.07)] transition duration-500 ease-out hover:-translate-y-1.5 hover:border-[rgb(203_213_225_/_0.9)] hover:shadow-[0_1px_2px_rgb(15_23_42_/_0.05),0_28px_66px_rgb(15_23_42_/_0.12)] sm:p-8">
      <div
        aria-hidden="true"
        className={`absolute -right-16 -top-20 -z-10 h-48 w-48 rounded-full opacity-70 blur-3xl transition duration-700 group-hover:opacity-100 ${tone.bloom}`}
      />

      <div className="flex flex-1 flex-col justify-center">
        <Quote
          aria-hidden="true"
          className={`h-8 w-8 flex-none ${tone.mark}`}
          strokeWidth={1.5}
        />

        <blockquote className="mt-5">
          <p className="text-base font-light leading-7 text-[var(--ink)] sm:text-lg sm:leading-8">
            {testimonial.quote}
          </p>
        </blockquote>
      </div>

      <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-[rgb(226_232_240_/_0.8)] pt-5">
        <span
          className={`grid h-11 w-11 flex-none place-items-center rounded-full text-sm font-medium ${tone.avatar}`}
        >
          {testimonial.initials}
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium leading-5 text-[var(--ink)]">
            {testimonial.author}
          </p>
          <p className="mt-1 text-xs font-light leading-5 text-[var(--muted)]">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>

        <div className="flex flex-col items-start gap-1.5 sm:items-end">
          <span
            className={`rounded-full border px-2.5 py-1 text-[0.7rem] font-medium leading-5 ${tone.badge}`}
          >
            {testimonial.badge}
          </span>
          <span className="text-[0.7rem] font-light leading-5 text-[var(--muted)]">
            {testimonial.date}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
