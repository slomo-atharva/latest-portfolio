import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MediumPost } from "@/lib/medium";

type WritingFeedProps = {
  compact?: boolean;
  posts: MediumPost[];
};

export function WritingFeed({ compact = false, posts }: WritingFeedProps) {
  return (
    <ol className="border-y border-[rgb(226_232_240_/_0.88)]">
      {posts.map((post) => (
        <li
          className="border-b border-[rgb(226_232_240_/_0.78)] last:border-b-0"
          key={post.slug}
        >
          <Link
            aria-label={`Read ${post.title}`}
            className="group grid gap-3 py-5 transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--paper-bright)] sm:grid-cols-[8.25rem_minmax(0,1fr)_auto] sm:items-center sm:gap-7 sm:py-6"
            href={`/blog/${post.slug}`}
          >
            <div className="flex items-center gap-2 text-xs font-medium text-[var(--muted)] sm:block sm:space-y-1.5">
              <time className="block" dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
              <span className="block text-[var(--ink-soft)]">{post.readingTime}</span>
            </div>

            <div className="min-w-0">
              <h3
                className={`font-semibold leading-[1.12] tracking-normal text-[var(--ink)] transition duration-300 group-hover:text-[var(--blue)] ${
                  compact
                    ? "text-lg sm:text-xl"
                    : "text-xl sm:text-[1.55rem]"
                }`}
              >
                {post.title}
              </h3>
              <p
                className={`mt-2 max-w-2xl font-light leading-6 text-[var(--ink-soft)] ${
                  compact
                    ? "line-clamp-1 text-sm"
                    : "line-clamp-2 text-sm sm:text-base sm:leading-7"
                }`}
              >
                {post.excerpt}
              </p>
            </div>

            <span className="hidden h-9 w-9 place-items-center rounded-full border border-[rgb(226_232_240_/_0.86)] text-[var(--ink-soft)] transition duration-300 group-hover:translate-x-1 group-hover:border-[rgb(33_58_143_/_0.28)] group-hover:text-[var(--blue)] sm:grid">
              <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={2.1} />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
