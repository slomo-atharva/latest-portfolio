import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WritingFeed } from "@/components/sections/writing-feed";
import { getMediumPosts, mediumProfile } from "@/lib/medium";

export async function BlogPreviewSection() {
  const posts = (await getMediumPosts()).slice(0, 3);

  return (
    <section
      aria-labelledby="writing-title"
      className="landing-snap-panel border-y border-[rgb(226_232_240_/_0.78)] bg-[var(--paper-bright)] px-5 py-12 text-[var(--ink)] sm:px-8 sm:py-14 lg:px-12"
      id="writing"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 border-b border-[rgb(226_232_240_/_0.88)] pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--muted)]">
              Writing
            </p>
            <h2
              className="mt-3 text-[clamp(2rem,3.2vw,2.75rem)] font-semibold leading-[1.04] tracking-normal text-[var(--ink)]"
              id="writing-title"
            >
              Notes from the work.
            </h2>
            <p className="mt-3 max-w-xl text-sm font-light leading-6 text-[var(--ink-soft)] sm:text-base">
              Product thinking, small experiments, and things worth keeping track of.
            </p>
          </div>

          <Link
            className="group inline-flex h-10 w-fit items-center gap-2 text-sm font-medium text-[var(--ink)] transition duration-300 hover:text-[var(--blue)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--paper-bright)]"
            href="/blog"
          >
            All writing
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5"
              strokeWidth={2.2}
            />
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="mt-1">
            <WritingFeed compact posts={posts} />
          </div>
        ) : (
          <div className="mt-6 border-y border-[rgb(226_232_240_/_0.84)] py-6">
            <p className="text-sm font-light leading-7 text-[var(--ink-soft)]">
              New notes from {mediumProfile.handle} will appear here automatically.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
