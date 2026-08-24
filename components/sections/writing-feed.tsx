import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { MediumPost } from "@/lib/medium";
import type { ProjectTone } from "@/data/projects";
import { projectToneStyles, type ProjectToneStyle } from "@/lib/project-tones";

type WritingFeedProps = {
  compact?: boolean;
  posts: MediumPost[];
};

const toneCycle: ProjectTone[] = ["violet", "blue", "mint", "rose"];

function toneForIndex(index: number): ProjectToneStyle {
  return projectToneStyles[toneCycle[index % toneCycle.length]];
}

const cardChrome =
  "group relative flex h-full flex-col overflow-hidden rounded-[8px] border border-[rgb(226_232_240_/_0.9)] bg-[var(--paper-bright)] shadow-[0_1px_2px_rgb(15_23_42_/_0.04),0_14px_40px_rgb(15_23_42_/_0.06)] transition duration-500 ease-out hover:-translate-y-1.5 hover:border-[rgb(203_213_225_/_0.9)] hover:shadow-[0_1px_2px_rgb(15_23_42_/_0.05),0_26px_62px_rgb(15_23_42_/_0.12)] focus-within:ring-2 focus-within:ring-[var(--blue)] focus-within:ring-offset-4 focus-within:ring-offset-[var(--paper)]";

export function WritingFeed({ compact = false, posts }: WritingFeedProps) {
  if (compact) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <ArticleCard
            dense
            key={post.slug}
            post={post}
            tone={toneForIndex(index)}
          />
        ))}
      </div>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <div className="grid gap-5">
      {featured ? <FeaturedCard post={featured} tone={toneForIndex(0)} /> : null}

      {rest.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, index) => (
            <ArticleCard
              key={post.slug}
              post={post}
              tone={toneForIndex(index + 1)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function FeaturedCard({
  post,
  tone,
}: {
  post: MediumPost;
  tone: ProjectToneStyle;
}) {
  return (
    <article className={`${cardChrome} lg:grid lg:grid-cols-[1.02fr_0.98fr] lg:items-stretch`}>
      <ReadLink post={post} />

      <PostCover
        post={post}
        sizes="(min-width: 1024px) 620px, 94vw"
        tone={tone}
        variant="featured"
      />

      <div className="flex flex-col justify-center p-6 sm:p-8">
        <span
          className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.08em] ${tone.softFill} ${tone.accentText} ${tone.border}`}
        >
          Latest
        </span>

        <PostMeta post={post} />

        <h3 className="mt-3 text-2xl font-semibold leading-[1.14] tracking-normal text-[var(--ink)] transition duration-500 group-hover:text-[var(--blue)] sm:text-[1.9rem]">
          {post.title}
        </h3>

        <p className="mt-4 line-clamp-3 text-sm font-light leading-7 text-[var(--ink-soft)] sm:text-base">
          {post.excerpt}
        </p>

        <ReadAffordance />
      </div>
    </article>
  );
}

function ArticleCard({
  dense = false,
  post,
  tone,
}: {
  dense?: boolean;
  post: MediumPost;
  tone: ProjectToneStyle;
}) {
  return (
    <article className={cardChrome}>
      <ReadLink post={post} />

      <PostCover
        dense={dense}
        post={post}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 46vw, 92vw"
        tone={tone}
        variant="card"
      />

      <div className={`flex flex-1 flex-col ${dense ? "p-4 sm:p-5" : "p-5"}`}>
        <PostMeta dense={dense} post={post} />

        <h3
          className={`mt-2.5 font-semibold leading-[1.22] tracking-normal text-[var(--ink)] transition duration-500 group-hover:text-[var(--blue)] ${
            dense ? "text-base sm:text-lg" : "text-lg sm:text-xl"
          }`}
        >
          {post.title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm font-light leading-6 text-[var(--ink-soft)]">
          {post.excerpt}
        </p>

        <ReadAffordance dense={dense} />
      </div>
    </article>
  );
}

function PostCover({
  dense = false,
  post,
  sizes,
  tone,
  variant,
}: {
  dense?: boolean;
  post: MediumPost;
  sizes: string;
  tone: ProjectToneStyle;
  variant: "featured" | "card";
}) {
  const isFeatured = variant === "featured";

  return (
    <div
      className={`relative isolate overflow-hidden border-b border-[rgb(226_232_240_/_0.8)] ${tone.canvas} ${
        isFeatured
          ? "aspect-[16/10] lg:aspect-auto lg:border-b-0 lg:border-r"
          : dense
            ? "aspect-[16/9]"
            : "aspect-[16/10]"
      }`}
    >
      <div
        aria-hidden="true"
        className="hero-dot-grid absolute inset-0 z-0 opacity-50"
      />

      {post.coverImage ? (
        <Image
          alt=""
          className="relative z-10 object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          fill
          sizes={sizes}
          src={post.coverImage}
        />
      ) : (
        <div className="relative z-10 grid h-full place-items-center">
          <span
            className={`grid h-12 w-12 place-items-center rounded-full border bg-[rgb(255_255_255_/_0.7)] ${tone.accentText} ${tone.border}`}
          >
            <BookOpen aria-hidden="true" className="h-5 w-5" strokeWidth={2.1} />
          </span>
        </div>
      )}
    </div>
  );
}

function PostMeta({
  dense = false,
  post,
}: {
  dense?: boolean;
  post: MediumPost;
}) {
  return (
    <div
      className={`flex items-center gap-2.5 text-xs font-medium text-[var(--muted)] ${
        dense ? "mt-0" : "mt-5"
      }`}
    >
      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      <span
        aria-hidden="true"
        className="h-1 w-1 flex-none rounded-full bg-[rgb(148_163_184_/_0.7)]"
      />
      <span>{post.readingTime}</span>
    </div>
  );
}

function ReadAffordance({ dense = false }: { dense?: boolean }) {
  return (
    <span
      className={`mt-auto inline-flex items-center gap-2 text-xs font-medium text-[var(--ink)] ${
        dense ? "pt-4" : "pt-6"
      }`}
    >
      Read
      <ArrowRight
        aria-hidden="true"
        className="h-3.5 w-3.5 transition duration-500 group-hover:translate-x-1"
        strokeWidth={2.2}
      />
    </span>
  );
}

function ReadLink({ post }: { post: MediumPost }) {
  return (
    <Link
      className="absolute inset-0 z-30 rounded-[8px] focus:outline-none"
      href={`/blog/${post.slug}`}
    >
      <span className="sr-only">Read {post.title}</span>
    </Link>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
