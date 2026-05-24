import Image from "next/image";
import { Sparkle } from "lucide-react";
import { clientLogos } from "@/data/clients";

export function ClientLogosSection() {
  return (
    <section
      aria-labelledby="client-logos-title"
      className="landing-snap-panel relative isolate overflow-hidden bg-[var(--paper)] px-5 py-12 text-[var(--ink)] sm:px-8 sm:py-16 lg:px-12"
      id="clients"
    >
      <div className="hero-dot-grid absolute inset-0 -z-10 opacity-25" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(226_232_240_/_0.72),transparent)]"
      />

      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-4">
          <h2
            className="inline-flex items-center gap-2 rounded-full border border-[rgb(226_232_240_/_0.78)] bg-[rgb(255_255_255_/_0.78)] px-3.5 py-2 text-sm font-normal leading-none tracking-normal text-[var(--muted)] shadow-[0_10px_26px_rgb(15_23_42_/_0.06)] backdrop-blur-sm"
            id="client-logos-title"
          >
            <Sparkle
              aria-hidden="true"
              className="h-3.5 w-3.5 text-[var(--purple)]"
              strokeWidth={2.35}
            />
            Designed for
          </h2>
          <div
            aria-hidden="true"
            className="h-px flex-1 bg-[linear-gradient(90deg,rgb(226_232_240_/_0.86),transparent)]"
          />
        </div>

        <div className="relative mt-6 overflow-hidden rounded-[8px] border border-[rgb(226_232_240_/_0.78)] bg-[rgb(255_255_255_/_0.58)] shadow-[0_22px_70px_rgb(15_23_42_/_0.09)] backdrop-blur-xl">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(105deg,rgb(223_238_255_/_0.2),transparent_32%,rgb(245_215_234_/_0.22)_68%,rgb(255_246_168_/_0.18))]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-6 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(109_74_255_/_0.28),rgb(245_215_234_/_0.3),transparent)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-16 bg-[linear-gradient(90deg,rgb(248_250_252_/_0.92),transparent)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-16 bg-[linear-gradient(270deg,rgb(248_250_252_/_0.92),transparent)]"
          />

          <ul
            aria-label="Client logos"
            className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
          >
            {clientLogos.map((client) => (
              <li
                className="group relative flex h-28 min-w-0 items-center justify-center border-r border-b border-[rgb(226_232_240_/_0.56)] px-5 transition duration-300 even:border-r-0 last:col-span-2 last:border-b-0 sm:even:border-r sm:last:col-span-1 sm:[&:nth-child(3n)]:border-r-0 lg:h-32 lg:border-b-0 lg:even:border-r lg:[&:nth-child(3n)]:border-r lg:last:border-r-0"
                key={client.name}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-2 rounded-[8px] bg-[rgb(255_255_255_/_0.42)] opacity-0 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.74)] transition duration-300 group-hover:opacity-100"
                />
                <span
                  className={`relative flex max-w-full items-center justify-center transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-[1.02] ${client.className}`}
                >
                  <Image
                    alt={`${client.name} logo`}
                    className="h-auto max-h-full w-auto max-w-full object-contain opacity-[0.82] mix-blend-multiply transition duration-300 group-hover:opacity-100"
                    height={client.height}
                    sizes="(min-width: 1024px) 180px, (min-width: 640px) 220px, 210px"
                    src={client.src}
                    width={client.width}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
