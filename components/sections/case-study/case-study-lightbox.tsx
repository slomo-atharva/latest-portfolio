"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import type { CaseStudyMedia } from "@/data/case-studies";

/** Long enough to see the fade, short enough not to feel like a wait. */
const CLOSE_MS = 180;

const defaultFrame =
  "overflow-hidden rounded-[7px] border border-[rgb(255_255_255_/_0.82)] bg-[var(--case-surface)] shadow-[0_18px_44px_rgb(24_32_43_/_0.13)]";

/**
 * A case study image that expands into an overlay rather than a new tab.
 *
 * Inside the overlay the image fits the viewport by default and toggles to its
 * intrinsic width on click, so the detail boards stay readable the way the
 * old open-in-new-tab behaviour allowed.
 */
export function ExpandableMedia({
  frameClassName = defaultFrame,
  item,
  priority = false,
  sizes,
}: {
  frameClassName?: string;
  item: CaseStudyMedia;
  priority?: boolean;
  sizes: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const close = useCallback(() => {
    setShown(false);
    window.setTimeout(() => {
      setOpen(false);
      setZoomed(false);
    }, CLOSE_MS);
  }, []);

  // Paint the overlay transparent first so the fade has somewhere to start.
  useEffect(() => {
    if (!open) {
      return;
    }

    const frame = requestAnimationFrame(() => setShown(true));

    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.focus();
    };
  }, [close, open]);

  const caption = item.label ?? item.caption ?? item.alt;

  return (
    <>
      <div className={frameClassName}>
        <button
          aria-label={`Expand ${item.label ?? "image"}`}
          className="group relative block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-2"
          onClick={() => setOpen(true)}
          ref={triggerRef}
          type="button"
        >
          <Image
            alt={item.alt}
            className="block h-auto w-full"
            height={item.height}
            loading={priority ? "eager" : "lazy"}
            priority={priority}
            sizes={sizes}
            src={item.src}
            width={item.width}
          />
          <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-[7px] border border-[rgb(223_227_232_/_0.9)] bg-[rgb(253_253_255_/_0.9)] text-[var(--case-ink)] opacity-100 shadow-[0_10px_26px_rgb(24_32_43_/_0.12)] backdrop-blur-sm transition duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
            <Maximize2 aria-hidden="true" className="h-4 w-4" strokeWidth={2.2} />
          </span>
        </button>
      </div>

      {mounted && open
        ? createPortal(
            <div
              aria-label={caption}
              aria-modal="true"
              className={`fixed inset-0 z-[100] flex flex-col bg-[rgb(16_17_20_/_0.88)] backdrop-blur-md transition-opacity duration-200 motion-reduce:transition-none ${
                shown ? "opacity-100" : "opacity-0"
              }`}
              onClick={close}
              role="dialog"
            >
              <div className="flex items-start justify-between gap-6 px-4 py-4 sm:px-6">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-[rgb(253_253_255_/_0.94)]">
                    {item.label ?? "Full size"}
                  </p>
                  <p className="mt-0.5 text-xs font-light text-[rgb(253_253_255_/_0.55)]">
                    {zoomed ? "Click the image to fit" : "Click the image to zoom"}
                    <span className="hidden sm:inline"> &#183; Esc to close</span>
                  </p>
                </div>
                <button
                  aria-label="Close"
                  className="grid h-10 w-10 flex-none place-items-center rounded-full border border-[rgb(253_253_255_/_0.22)] text-[rgb(253_253_255_/_0.9)] transition duration-200 hover:bg-[rgb(253_253_255_/_0.12)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(253_253_255_/_0.6)]"
                  onClick={(event) => {
                    event.stopPropagation();
                    close();
                  }}
                  ref={closeRef}
                  type="button"
                >
                  <X aria-hidden="true" className="h-5 w-5" strokeWidth={2.1} />
                </button>
              </div>

              <div
                className={`flex min-h-0 flex-1 px-4 pb-6 sm:px-6 ${
                  zoomed
                    ? "overflow-auto"
                    : "items-center justify-center overflow-hidden"
                }`}
              >
                <button
                  aria-label={zoomed ? "Fit image to screen" : "Zoom to full size"}
                  className={`m-auto block flex-none rounded-[8px] transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(253_253_255_/_0.6)] motion-reduce:transition-none ${
                    zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                  } ${shown ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    setZoomed((value) => !value);
                  }}
                  style={zoomed ? { width: item.width } : undefined}
                  type="button"
                >
                  <Image
                    alt={item.alt}
                    className={
                      zoomed
                        ? "block h-auto w-full max-w-none rounded-[8px]"
                        : "block h-auto max-h-[calc(100vh-9rem)] w-auto max-w-[min(94vw,1680px)] rounded-[8px] object-contain"
                    }
                    height={item.height}
                    quality={92}
                    sizes="100vw"
                    src={item.src}
                    width={item.width}
                  />
                </button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
