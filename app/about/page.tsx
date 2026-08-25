import type { Metadata } from "next";
import { AboutMeSection } from "@/components/sections/about-me-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export const metadata: Metadata = {
  title: "About Akshay | Product Designer",
  description:
    "About Akshay, a product designer working across AI, UX strategy, information architecture, and clear interface systems.",
};

export default function AboutPage() {
  return (
    <main className="min-h-svh bg-[var(--paper)]" id="top">
      <SiteHeader logoHref="/#top" sectionHrefPrefix="/" />
      <AboutMeSection />
      <SiteFooter homeAnchors />
    </main>
  );
}
