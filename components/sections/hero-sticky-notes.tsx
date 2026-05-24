import type { CSSProperties } from "react";
import { heroNotes } from "@/data/hero";
import { StickyNoteSurface } from "@/components/ui/floating-note";

type LandingProfile = {
  x: number;
  y: number;
  rotate: number;
  delay: number;
  duration: number;
  opacity: number;
};

const landingProfiles: Record<string, LandingProfile> = {
  palette: {
    x: 236,
    y: -118,
    rotate: 17,
    delay: 0.34,
    duration: 1.12,
    opacity: 0.9,
  },
  story: {
    x: -248,
    y: 88,
    rotate: -18,
    delay: 0.72,
    duration: 1.14,
    opacity: 0.85,
  },
  pace: {
    x: -224,
    y: -112,
    rotate: -16,
    delay: 0.52,
    duration: 1.08,
    opacity: 0.85,
  },
  move: {
    x: 252,
    y: 78,
    rotate: 18,
    delay: 0.94,
    duration: 1.16,
    opacity: 0.85,
  },
  meaning: {
    x: 12,
    y: -162,
    rotate: 11,
    delay: 1.08,
    duration: 1.1,
    opacity: 0.85,
  },
};

function getLandingStyle(landing: LandingProfile): CSSProperties {
  const direction = landing.x >= 0 ? 1 : -1;

  return {
    "--gust-end-x": `${direction * 18}px`,
    "--gust-rotate": `${direction * -5}deg`,
    "--gust-start-x": `${direction * 132}px`,
    "--land-delay": `${landing.delay}s`,
    "--land-duration": `${landing.duration}s`,
    "--land-impact-rotate": `${direction * -1.4}deg`,
    "--land-mid-rotate": `${landing.rotate * 0.36}deg`,
    "--land-mid-x": `${landing.x * 0.34}px`,
    "--land-mid-y": `${landing.y * 0.42}px`,
    "--land-opacity": landing.opacity,
    "--land-rebound-rotate": `${direction * 0.7}deg`,
    "--land-rotate": `${landing.rotate}deg`,
    "--land-x": `${landing.x}px`,
    "--land-y": `${landing.y}px`,
  } as CSSProperties;
}

export function HeroStickyNotes() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
    >
      {heroNotes.map((note) => {
        const landing = landingProfiles[note.id];

        if (!landing) {
          return (
            <StickyNoteSurface
              className={`absolute z-20 ${note.className}`}
              key={note.id}
              style={note.style}
              text={note.text}
              tone={note.tone}
            />
          );
        }

        return (
          <div
            className={`sticky-note-landing absolute z-20 ${note.className}`}
            key={note.id}
            style={getLandingStyle(landing)}
          >
            <span aria-hidden="true" className="sticky-note-gust" />
            <StickyNoteSurface
              className="sticky-note-stick flex h-full w-full"
              style={note.style}
              text={note.text}
              tone={note.tone}
            />
          </div>
        );
      })}
    </div>
  );
}
