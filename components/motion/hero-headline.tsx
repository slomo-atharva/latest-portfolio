"use client";

import { HoverEyes } from "@/components/motion/hover-eyes";

type HeroHeadlineProps = {
  className?: string;
  lines: string[];
  watchWord?: string;
};

export function HeroHeadline({
  className = "",
  lines,
  watchWord = "THINGS",
}: HeroHeadlineProps) {
  const [firstLine, ...remainingLines] = lines;
  const watchWordIndex = firstLine?.indexOf(watchWord) ?? -1;

  return (
    <h1 className={className}>
      {firstLine ? (
        <span className="block" key={firstLine}>
          {watchWordIndex >= 0 ? (
            <>
              {firstLine.slice(0, watchWordIndex)}
              <HoverEyes
                className="relative inline-block cursor-default"
                data-eye-target="hero-title-things"
              >
                <span className="relative z-0">{watchWord}</span>
              </HoverEyes>
              {firstLine.slice(watchWordIndex + watchWord.length)}
            </>
          ) : (
            firstLine
          )}
        </span>
      ) : null}
      {remainingLines.map((line) => (
        <span className="block" key={line}>
          {line}
        </span>
      ))}
    </h1>
  );
}
