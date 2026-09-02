import Image from "next/image";
import { Maximize2 } from "lucide-react";

import type { CaseStudyChapter, CaseStudyMedia } from "@/data/case-studies";
import type { ProjectToneStyle } from "@/lib/project-tones";

import { caseCardChrome, caseEyebrow } from "./case-study-chrome";

/**
 * Renders a case study written as chapters rather than assembled from the
 * templated sections. Chapter headings, order, and count are specific to the
 * project, so nothing here reads from a per-project lookup table.
 */
export function CaseStudyChapters({
  chapters,
  tone,
}: {
  chapters: CaseStudyChapter[];
  tone: ProjectToneStyle;
}) {
  return (
    <>
      {chapters.map((chapter, index) => (
        <ChapterSection
          chapter={chapter}
          index={index}
          key={chapter.id}
          tone={tone}
        />
      ))}
    </>
  );
}

function ChapterSection({
  chapter,
  index,
  tone,
}: {
  chapter: CaseStudyChapter;
  index: number;
  tone: ProjectToneStyle;
}) {
  const isGallery = chapter.layout === "gallery";

  return (
    <section
      className="case-study-snap-section scroll-mt-24 py-14 sm:py-16"
      id={chapter.id}
    >
      <header className="grid gap-5">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className={`block h-[3px] w-10 rounded-full ${tone.marker}`}
          />
          <span className={caseEyebrow}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h2 className="max-w-3xl text-3xl font-medium leading-[1.14] tracking-normal text-[var(--case-ink)] sm:text-4xl">
          {chapter.title}
        </h2>
      </header>

      {chapter.body && chapter.body.length > 0 ? (
        <div className="mt-8 grid max-w-[44rem] gap-5">
          {chapter.body.map((paragraph) => (
            <p
              className="text-base font-light leading-8 text-[var(--case-ink-soft)] sm:text-lg sm:leading-9"
              key={paragraph.slice(0, 48)}
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : null}

      {chapter.pull ? (
        <blockquote
          className={`mt-10 max-w-2xl border-l-2 pl-6 ${tone.border}`}
        >
          <p className="text-2xl font-light leading-[1.35] tracking-normal text-[var(--case-ink)] sm:text-3xl">
            {chapter.pull}
          </p>
        </blockquote>
      ) : null}

      {chapter.media && chapter.media.length > 0 ? (
        isGallery ? (
          <ChapterGallery media={chapter.media} tone={tone} />
        ) : (
          <ChapterFigure media={chapter.media} tone={tone} />
        )
      ) : null}
    </section>
  );
}

/**
 * One artefact, sitting under the copy at full width. Boards carry their own
 * titles and the chapter has already said what they are, so `label` is used
 * only as the accessible name for the open-full-size link, never as a caption.
 */
function ChapterFigure({
  media,
  tone,
}: {
  media: CaseStudyMedia[];
  tone: ProjectToneStyle;
}) {
  return (
    <div className={`mt-10 rounded-[10px] p-3 sm:p-5 ${tone.canvas}`}>
      <div className="grid gap-4">
        {media.map((item) => {
          // The content column runs well over 1000px on a wide screen, which is
          // far too large for an artefact. Cap against the 44rem reading
          // measure instead: a little wider than the copy, never full-bleed.
          // Portrait boards get a tighter cap because width drives their height.
          const isPortrait = item.height > item.width;

          return (
            <figure
              className={`mx-auto w-full ${
                isPortrait ? "max-w-[36rem]" : "max-w-[52rem]"
              }`}
              key={item.src}
            >
              <MediaFrame
                item={item}
                sizes={
                  isPortrait
                    ? "(min-width: 1024px) 576px, 94vw"
                    : "(min-width: 1024px) 832px, 94vw"
                }
              />
            </figure>
          );
        })}
      </div>
    </div>
  );
}

/** Product screens, each carrying a caption that does the explaining. */
function ChapterGallery({
  media,
  tone,
}: {
  media: CaseStudyMedia[];
  tone: ProjectToneStyle;
}) {
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2">
      {media.map((item) => (
        <figure
          className={`${caseCardChrome} flex min-w-0 flex-col overflow-hidden`}
          key={item.src}
        >
          <div className={`p-3 sm:p-4 ${tone.canvas}`}>
            <div
              className={
                item.height > item.width ? "mx-auto w-[68%] min-w-0" : "min-w-0"
              }
            >
              <MediaFrame
                item={item}
                sizes={
                  item.height > item.width
                    ? "(min-width: 1280px) 354px, (min-width: 768px) 58vw, 64vw"
                    : "(min-width: 1280px) 520px, (min-width: 768px) 86vw, 94vw"
                }
              />
            </div>
          </div>
          <figcaption className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
            {item.label ? (
              <span className={`${caseEyebrow} ${tone.accentText}`}>
                {item.label}
              </span>
            ) : null}
            <span className="text-sm font-light leading-7 text-[var(--case-ink-soft)]">
              {item.caption}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function MediaFrame({ item, sizes }: { item: CaseStudyMedia; sizes: string }) {
  if (item.pending) {
    return <PendingMedia item={item} />;
  }

  return (
    <div className="overflow-hidden rounded-[7px] border border-[rgb(255_255_255_/_0.82)] bg-[var(--case-surface)] shadow-[0_18px_44px_rgb(24_32_43_/_0.13)]">
      <a
        aria-label={`Open ${item.label ?? "artefact"} at full size`}
        className="group relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-2"
        href={item.src}
        rel="noreferrer"
        target="_blank"
        title="Open full size"
      >
        <Image
          alt={item.alt}
          className="block h-auto w-full"
          height={item.height}
          loading="lazy"
          sizes={sizes}
          src={item.src}
          width={item.width}
        />
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-[7px] border border-[rgb(223_227_232_/_0.9)] bg-[rgb(253_253_255_/_0.9)] text-[var(--case-ink)] opacity-100 shadow-[0_10px_26px_rgb(24_32_43_/_0.12)] backdrop-blur-sm transition duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
          <Maximize2 aria-hidden="true" className="h-4 w-4" strokeWidth={2.2} />
        </span>
      </a>
    </div>
  );
}

/**
 * Placeholder for an artefact that has not been exported yet. Keeps the page
 * shape honest instead of shipping a broken image.
 */
function PendingMedia({ item }: { item: CaseStudyMedia }) {
  return (
    <div
      className="grid min-h-56 place-items-center rounded-[7px] border border-dashed border-[var(--case-line)] bg-[var(--case-surface-muted)] p-8"
      style={{ aspectRatio: `${item.width} / ${item.height}` }}
    >
      <p className="max-w-sm text-center text-sm font-light leading-7 text-[var(--case-muted)]">
        {item.label ?? "Artefact"} — image to come.
      </p>
    </div>
  );
}
