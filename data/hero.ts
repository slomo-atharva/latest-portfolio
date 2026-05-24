import type { CSSProperties } from "react";

export type HeroNote = {
  id: string;
  text: string;
  tone: "cream" | "pink" | "blue" | "mint";
  className: string;
  style: CSSProperties;
};

export const heroCopy = {
  logoAlt: "AA logo",
  title: ["MAKING THINGS", "MAKE SENSE."],
  currentPrefix: "Designing AI & Strategic experiences at",
  currentCompany: "Gravity one",
  reflection: [
    "someone lost sleep over that button.",
    "argued for that empty space.",
    "killed a feature nobody needed.",
    "that someone is usually me.",
  ],
  primaryAction: "Work",
  selectedWorkAction: "View clients & work",
  secondaryAction: "Clients",
  zeroNonsenseAction: "Praise",
};

export const heroNotes: HeroNote[] = [
  {
    id: "palette",
    text: "clarity before beauty. always.",
    tone: "cream",
    className:
      "right-[4%] top-[13%] flex h-[4.75rem] w-[4.75rem] text-[10px] opacity-90 sm:right-[7%] sm:top-[14%] sm:h-[6.25rem] sm:w-[6.25rem] sm:text-[12px] lg:right-[9%] lg:top-[17%] lg:h-[8.25rem] lg:w-[8.25rem] lg:text-[16px]",
    style: {
      "--rotate": "5deg",
    } as CSSProperties,
  },
  {
    id: "story",
    text: "assumptions are just unrun research",
    tone: "pink",
    className:
      "left-[4%] bottom-[18%] flex h-[4.75rem] w-[4.75rem] text-[10px] opacity-85 sm:left-[6%] sm:bottom-[20%] sm:h-[6.25rem] sm:w-[6.25rem] sm:text-[12px] lg:bottom-[21%] lg:h-[8.25rem] lg:w-[8.25rem] lg:text-[16px]",
    style: {
      "--rotate": "-4deg",
    } as CSSProperties,
  },
  {
    id: "pace",
    text: "good feedback hurts a little. that's how you know",
    tone: "blue",
    className:
      "left-[5%] top-[22%] flex h-[4.5rem] w-[4.5rem] text-[9px] opacity-85 sm:left-[18%] sm:top-[16%] sm:h-[5.9rem] sm:w-[5.9rem] sm:text-[11px] lg:left-[20%] lg:top-[17%] lg:h-[7.75rem] lg:w-[7.75rem] lg:text-[15px]",
    style: {
      "--rotate": "-6deg",
    } as CSSProperties,
  },
  {
    id: "move",
    text: "fast got faster.\njudgment stayed human.",
    tone: "cream",
    className:
      "right-[5%] bottom-[14%] flex h-[4.75rem] w-[4.75rem] text-[10px] opacity-85 sm:right-[7%] sm:bottom-[13%] sm:h-[6.25rem] sm:w-[6.25rem] sm:text-[12px] lg:bottom-[11%] lg:h-[8.25rem] lg:w-[8.25rem] lg:text-[16px]",
    style: {
      "--rotate": "-5deg",
    } as CSSProperties,
  },
  {
    id: "meaning",
    text: "everything is artificial\nuntil someone means it.",
    tone: "mint",
    className:
      "left-[40%] top-[8%] flex h-[4.75rem] w-[4.75rem] text-[9px] opacity-85 sm:left-[43%] sm:top-[9%] sm:h-[6.25rem] sm:w-[6.25rem] sm:text-[11px] lg:left-[44%] lg:top-[10%] lg:h-[8.25rem] lg:w-[8.25rem] lg:text-[15px]",
    style: {
      "--rotate": "3deg",
    } as CSSProperties,
  },
];
