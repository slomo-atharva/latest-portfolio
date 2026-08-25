import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudyById } from "@/data/case-studies";
import { CaseStudyPage } from "@/components/sections/case-study/case-study-page";
import { SiteFooter } from "@/components/sections/site-footer";
import { isUnlocked } from "@/lib/case-access";

type CaseStudyRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    id: caseStudy.project.id,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyRouteProps): Promise<Metadata> {
  const { id } = await params;
  const caseStudy = getCaseStudyById(id);

  if (!caseStudy) {
    return {
      title: "Case study not found | Akshay",
    };
  }

  return {
    title: `${caseStudy.project.title} | Case Study`,
    description: caseStudy.deck,
  };
}

export default async function Page({ params }: CaseStudyRouteProps) {
  const { id } = await params;
  const caseStudy = getCaseStudyById(id);

  if (!caseStudy) {
    notFound();
  }

  // Read on the server so the gated sections are never sent to the browser.
  const unlocked = await isUnlocked();

  return (
    <>
      <CaseStudyPage caseStudy={caseStudy} locked={!unlocked} />
      <SiteFooter homeAnchors />
    </>
  );
}
