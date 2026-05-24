import type { ProjectTone } from "@/data/projects";

export type ProjectToneStyle = {
  canvas: string;
  marker: string;
  rail: string;
  wash: string;
  accentText: string;
  softFill: string;
  border: string;
  glow: string;
};

export const projectToneStyles: Record<ProjectTone, ProjectToneStyle> = {
  violet: {
    canvas:
      "bg-[linear-gradient(135deg,rgb(238_233_255_/_0.96),rgb(255_255_255_/_0.9)_46%,rgb(223_238_255_/_0.88))]",
    marker: "bg-[var(--purple)] text-[var(--paper-bright)]",
    rail: "bg-[linear-gradient(90deg,rgb(109_74_255_/_0.85),rgb(245_215_234_/_0.72),rgb(33_58_143_/_0.74))]",
    wash: "bg-[linear-gradient(90deg,transparent,rgb(109_74_255_/_0.14))]",
    accentText: "text-[var(--purple)]",
    softFill: "bg-[rgb(238_233_255_/_0.72)]",
    border: "border-[rgb(109_74_255_/_0.22)]",
    glow: "shadow-[0_24px_74px_rgb(109_74_255_/_0.14)]",
  },
  blue: {
    canvas:
      "bg-[linear-gradient(135deg,rgb(223_238_255_/_0.98),rgb(255_255_255_/_0.88)_48%,rgb(229_241_255_/_0.92))]",
    marker: "bg-[var(--blue)] text-[var(--paper-bright)]",
    rail: "bg-[linear-gradient(90deg,rgb(33_58_143_/_0.86),rgb(111_164_216_/_0.72),rgb(223_238_255_/_0.88))]",
    wash: "bg-[linear-gradient(90deg,transparent,rgb(33_58_143_/_0.12))]",
    accentText: "text-[var(--blue)]",
    softFill: "bg-[rgb(223_238_255_/_0.78)]",
    border: "border-[rgb(33_58_143_/_0.2)]",
    glow: "shadow-[0_24px_74px_rgb(33_58_143_/_0.12)]",
  },
  mint: {
    canvas:
      "bg-[linear-gradient(135deg,rgb(223_247_223_/_0.98),rgb(255_255_255_/_0.9)_46%,rgb(240_248_230_/_0.9))]",
    marker: "bg-[#336d48] text-[var(--paper-bright)]",
    rail: "bg-[linear-gradient(90deg,rgb(51_109_72_/_0.86),rgb(223_247_223_/_0.9),rgb(255_246_168_/_0.86))]",
    wash: "bg-[linear-gradient(90deg,transparent,rgb(51_109_72_/_0.12))]",
    accentText: "text-[#336d48]",
    softFill: "bg-[rgb(223_247_223_/_0.76)]",
    border: "border-[rgb(51_109_72_/_0.22)]",
    glow: "shadow-[0_24px_74px_rgb(51_109_72_/_0.13)]",
  },
  rose: {
    canvas:
      "bg-[linear-gradient(135deg,rgb(245_215_234_/_0.98),rgb(255_255_255_/_0.9)_48%,rgb(255_246_168_/_0.62))]",
    marker: "bg-[#9b4772] text-[var(--paper-bright)]",
    rail: "bg-[linear-gradient(90deg,rgb(155_71_114_/_0.82),rgb(245_215_234_/_0.82),rgb(255_246_168_/_0.78))]",
    wash: "bg-[linear-gradient(90deg,transparent,rgb(155_71_114_/_0.12))]",
    accentText: "text-[#9b4772]",
    softFill: "bg-[rgb(245_215_234_/_0.72)]",
    border: "border-[rgb(155_71_114_/_0.22)]",
    glow: "shadow-[0_24px_74px_rgb(155_71_114_/_0.13)]",
  },
};
