import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock3 } from "lucide-react";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { getMediumPosts } from "@/lib/medium";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getMediumPosts()).find((item) => item.slug === slug);

  if (!post) {
    return {
      title: "Story not found | Akshay",
    };
  }

  return {
    title: `${post.title} | Akshay`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = (await getMediumPosts()).find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-svh bg-[var(--paper-bright)]" id="top">
      <SiteHeader logoHref="/#top" sectionHrefPrefix="/" showHomeLink />

      <article className="bg-[var(--paper-bright)] px-5 pb-16 pt-24 text-[var(--ink)] sm:px-8 sm:pb-20 sm:pt-28 lg:px-12">
        <div className="mx-auto max-w-[44rem] py-8 sm:py-10">
          <Link
            className="group inline-flex h-10 items-center gap-2 rounded-[8px] px-1 text-sm font-medium text-[var(--ink-soft)] transition duration-300 hover:-translate-x-0.5 hover:text-[var(--ink)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--paper)]"
            href="/blog"
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4 transition duration-300 group-hover:-translate-x-0.5" strokeWidth={2.3} />
            All writing
          </Link>

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[var(--muted)]">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[rgb(112_112_120_/_0.52)]" />
              <span className="inline-flex items-center gap-1.5">
                <Clock3 aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={2.2} />
                {post.readingTime}
              </span>
            </div>
            <h1 className="mt-5 text-[clamp(2.2rem,4.4vw,3.65rem)] font-semibold leading-[1.02] tracking-normal text-[var(--ink)]">
              {post.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base font-light leading-7 text-[var(--ink-soft)] sm:text-lg sm:leading-8">
              {post.excerpt}
            </p>
          </div>

          {post.coverImage ? (
            <div className="relative mt-8 aspect-[16/8.5] overflow-hidden rounded-[8px] border border-[rgb(226_232_240_/_0.82)] bg-[rgb(248_250_252_/_0.76)]">
              <Image alt="" className="object-cover" fill priority sizes="(min-width: 1024px) 768px, 100vw" src={post.coverImage} />
            </div>
          ) : null}

          <div className="mt-8 border-t border-[rgb(226_232_240_/_0.82)] pt-8 sm:mt-10 sm:pt-9">
            <div className="space-y-5 text-base font-light leading-8 text-[var(--ink-soft)] sm:text-[1.05rem] sm:leading-8">
              {post.body.map((paragraph, index) => (
                <p key={`${post.slug}-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3 border-t border-[rgb(226_232_240_/_0.82)] pt-5 text-sm font-light leading-6 text-[var(--muted)]">
            <BookOpen aria-hidden="true" className="h-4 w-4 flex-none text-[var(--blue)]" strokeWidth={2.2} />
            Originally published on Medium. Kept here so the reading stays in one place.
          </div>
        </div>
      </article>

      <SiteFooter homeAnchors />
    </main>
  );
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}
