"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { AuthedImage } from "./authed-image";

export type PresenterSlide = {
  name: string;
  path: string;
};

/**
 * Full screen slideshow. Arrow keys or the edge buttons move, Escape leaves,
 * and the chrome fades out while the pointer is still, so during an interview
 * the screen is the only thing on the wall.
 */
export function Presenter({
  index,
  onClose,
  onIndexChange,
  slides,
  title,
  token,
}: {
  index: number;
  onClose: () => void;
  onIndexChange: (next: number) => void;
  slides: PresenterSlide[];
  title: string;
  token: string;
}) {
  const [idle, setIdle] = useState(false);

  const go = useCallback(
    (delta: number) => {
      onIndexChange((index + delta + slides.length) % slides.length);
    },
    [index, onIndexChange, slides.length],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowRight" || event.key === " ") {
        event.preventDefault();
        go(1);
      }

      if (event.key === "ArrowLeft") {
        go(-1);
      }
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [go, onClose]);

  useEffect(() => {
    let timer = window.setTimeout(() => setIdle(true), 2400);

    const wake = () => {
      setIdle(false);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setIdle(true), 2400);
    };

    document.addEventListener("pointermove", wake);

    return () => {
      document.removeEventListener("pointermove", wake);
      window.clearTimeout(timer);
    };
  }, []);

  const current = slides[index];

  if (!current) {
    return null;
  }

  const chrome = idle ? "opacity-0" : "opacity-100";

  return (
    <div className="fixed inset-0 z-[120] flex flex-col bg-[#0d0e11]">
      <div
        className={`flex items-center justify-between gap-4 px-5 py-4 transition-opacity duration-500 ${chrome}`}
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[rgb(253_253_255_/_0.92)]">
            {title}
          </p>
          <p className="mt-0.5 truncate text-xs text-[rgb(253_253_255_/_0.5)]">
            {current.name} &#183; {index + 1} of {slides.length}
          </p>
        </div>
        <button
          aria-label="Close presentation"
          className="grid h-10 w-10 flex-none place-items-center rounded-full border border-[rgb(253_253_255_/_0.22)] text-[rgb(253_253_255_/_0.9)] transition hover:bg-[rgb(253_253_255_/_0.12)]"
          onClick={onClose}
          type="button"
        >
          <X aria-hidden="true" className="h-5 w-5" />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-6 sm:px-16">
        <AuthedImage
          alt={current.name}
          className="max-h-full max-w-full object-contain"
          key={current.path}
          path={current.path}
          token={token}
        />

        {slides.length > 1 ? (
          <>
            <button
              aria-label="Previous screen"
              className={`absolute left-2 grid h-12 w-12 place-items-center rounded-full text-[rgb(253_253_255_/_0.85)] transition hover:bg-[rgb(253_253_255_/_0.12)] sm:left-4 ${chrome}`}
              onClick={() => go(-1)}
              type="button"
            >
              <ChevronLeft aria-hidden="true" className="h-7 w-7" />
            </button>
            <button
              aria-label="Next screen"
              className={`absolute right-2 grid h-12 w-12 place-items-center rounded-full text-[rgb(253_253_255_/_0.85)] transition hover:bg-[rgb(253_253_255_/_0.12)] sm:right-4 ${chrome}`}
              onClick={() => go(1)}
              type="button"
            >
              <ChevronRight aria-hidden="true" className="h-7 w-7" />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
