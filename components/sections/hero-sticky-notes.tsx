"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
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

/** They get funnier the more you refuse to accept it. */
const quips = [
  "gotcha. knew you'd try that.",
  "still stuck. nice try though.",
  "it is really not going anywhere.",
  "you are persistent. i respect it.",
  "we could genuinely do this all day.",
  "ok. this is just our thing now.",
];

const DRAG_THRESHOLD = 5;
const TUG_DAMPING = 0.16;
const TUG_LIMIT = 11;
const QUIP_MS = 2600;

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

/** Pull toward the cursor, but only ever a little. */
function damp(delta: number) {
  const pulled = delta * TUG_DAMPING;

  return Math.max(-TUG_LIMIT, Math.min(TUG_LIMIT, pulled));
}

export function HeroStickyNotes() {
  const [tug, setTug] = useState<{ id: string; x: number; y: number } | null>(
    null,
  );
  const [quip, setQuip] = useState<{ id: string; text: string; key: number } | null>(
    null,
  );
  const origin = useRef<{ id: string; x: number; y: number } | null>(null);
  const caught = useRef(false);
  const attempts = useRef(0);

  useEffect(() => {
    if (!quip) {
      return;
    }

    const timer = window.setTimeout(() => setQuip(null), QUIP_MS);

    return () => window.clearTimeout(timer);
  }, [quip]);

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>, id: string) => {
      origin.current = { id, x: event.clientX, y: event.clientY };
      caught.current = false;

      // Throws if the pointer is no longer active; the joke works without it.
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        // ignored
      }
    },
    [],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>, id: string) => {
      const start = origin.current;

      if (!start || start.id !== id) {
        return;
      }

      const dx = event.clientX - start.x;
      const dy = event.clientY - start.y;

      if (!caught.current && Math.hypot(dx, dy) > DRAG_THRESHOLD) {
        caught.current = true;
        const text = quips[attempts.current % quips.length];
        attempts.current += 1;
        setQuip({ id, text, key: Date.now() });
      }

      if (caught.current) {
        setTug({ id, x: damp(dx), y: damp(dy) });
      }
    },
    [],
  );

  const release = useCallback(() => {
    origin.current = null;
    caught.current = false;
    setTug(null);
  }, []);

  return (
    // Above the hero content column, which is also z-20 and comes later in
    // the DOM, so notes overlapping it were unreachable. Still below the
    // z-30 ticker. The container stays pointer-events-none, so only the
    // notes themselves sit in front of anything.
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[25] overflow-hidden"
    >
      {heroNotes.map((note) => {
        const landing = landingProfiles[note.id];
        const pulling = tug?.id === note.id ? tug : null;
        const saying = quip?.id === note.id ? quip : null;

        const interaction = {
          onPointerCancel: release,
          onPointerDown: (event: ReactPointerEvent<HTMLDivElement>) =>
            onPointerDown(event, note.id),
          onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) =>
            onPointerMove(event, note.id),
          onPointerUp: release,
        };

        // The tug rides its own wrapper: both the landing frame and the note
        // surface already animate their own transforms.
        const tugStyle = {
          transform: pulling
            ? `translate3d(${pulling.x}px, ${pulling.y}px, 0) rotate(${pulling.x * 0.08}deg)`
            : undefined,
        } as CSSProperties;

        const body = (
          <>
            <div
              className="sticky-note-tug pointer-events-auto h-full w-full cursor-grab active:cursor-grabbing"
              style={tugStyle}
              {...interaction}
            >
              <StickyNoteSurface
                className={
                  landing ? "sticky-note-stick flex h-full w-full" : undefined
                }
                style={landing ? undefined : note.style}
                text={note.text}
                tone={note.tone}
              />
            </div>
            {saying ? (
              <p className="sticky-note-quip" key={saying.key}>
                {saying.text}
              </p>
            ) : null}
          </>
        );

        if (!landing) {
          return (
            <div className={`absolute z-20 ${note.className}`} key={note.id}>
              {body}
            </div>
          );
        }

        return (
          <div
            className={`sticky-note-landing absolute z-20 ${note.className}`}
            key={note.id}
            style={getLandingStyle(landing)}
          >
            <span aria-hidden="true" className="sticky-note-gust" />
            {body}
          </div>
        );
      })}
    </div>
  );
}
