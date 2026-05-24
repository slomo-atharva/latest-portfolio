import type { HeroNote } from "@/data/hero";
import type { CSSProperties } from "react";

type FloatingNoteProps = {
  note: HeroNote;
};

type StickyNoteSurfaceProps = {
  text: string;
  tone: HeroNote["tone"];
  className?: string;
  style?: CSSProperties;
};

export function StickyNoteSurface({
  className = "",
  style,
  text,
  tone,
}: StickyNoteSurfaceProps) {
  return (
    <div
      aria-hidden="true"
      className={`breeze-note items-center justify-center rounded-[5px] px-2.5 pt-5 pb-2.5 text-[var(--ink)] sm:px-4 sm:pt-7 sm:pb-4 lg:px-5 lg:pt-9 lg:pb-5 ${className}`}
      data-tone={tone}
      style={style}
    >
      <span aria-hidden="true" className="sticky-note-curl" />
      {text ? <p className="sticky-note-text font-normal">{text}</p> : null}
    </div>
  );
}

export function FloatingNote({ note }: FloatingNoteProps) {
  return (
    <StickyNoteSurface
      className={`absolute z-20 ${note.className}`}
      style={note.style}
      text={note.text}
      tone={note.tone}
    />
  );
}
