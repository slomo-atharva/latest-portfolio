import { ClientLogosSection } from "@/components/sections/client-logos-section";
import { HeroSection } from "@/components/sections/hero-section";
import { SelectedProjectsSection } from "@/components/sections/selected-projects-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function Home() {
  return (
    <main className="landing-scroll-experience h-svh overflow-y-auto">
      <HeroSection />
      <ClientLogosSection />
      <SelectedProjectsSection />
      <TestimonialsSection />
      <SiteFooter />
    </main>
  );
}
