import type { Metadata } from "next";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { WritingFeed } from "@/components/sections/writing-feed";
import { getMediumPosts, mediumProfile } from "@/lib/medium";

export const metadata: Metadata = {
  title: "Writing | Akshay",
  description: "Notes on product design, systems thinking, and making complex things clearer.",
};

export default async function BlogPage() {
  const posts = await getMediumPosts();

  return (
    <main className="min-h-svh bg-[var(--paper-bright)]" id="top">
      <SiteHeader logoHref="/#top" sectionHrefPrefix="/" showHomeLink />

      <section className="bg-[var(--paper-bright)] px-5 pb-16 pt-24 text-[var(--ink)] sm:px-8 sm:pb-20 sm:pt-28 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl border-b border-[rgb(226_232_240_/_0.88)] pb-8 pt-8 sm:pb-10 sm:pt-10">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
              Writing
            </p>
            <h1 className="mt-3 text-[clamp(2.2rem,4.2vw,3.65rem)] font-semibold leading-[1.02] tracking-normal text-[var(--ink)]">
              Product notes, plainly put.
            </h1>
            <p className="mt-4 max-w-2xl text-sm font-light leading-7 text-[var(--ink-soft)] sm:text-base">
              Published on Medium and collected here: experiments, product direction, clear systems, and the details that make an interface hold together.
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="mt-1 max-w-4xl">
              <WritingFeed posts={posts} />
            </div>
          ) : (
            <div className="max-w-3xl border-y border-[rgb(226_232_240_/_0.84)] py-6">
              <h2 className="text-lg font-semibold leading-7 text-[var(--ink)]">Writing is on its way.</h2>
              <p className="mt-2 text-sm font-light leading-7 text-[var(--ink-soft)]">
                This page refreshes from {mediumProfile.handle}&rsquo;s Medium feed automatically. Please check back shortly.
              </p>
            </div>
          )}
        </div>
      </section>

      <SiteFooter homeAnchors />
    </main>
  );
}
