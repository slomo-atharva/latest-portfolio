const mediumProfileUrl = "https://medium.com/@Kris025";
const mediumFeedUrl = "https://medium.com/feed/@Kris025";

const allowedMediaHosts = new Set([
  "cdn-images-1.medium.com",
  "miro.medium.com",
]);

export type MediumPost = {
  author: string;
  coverImage: string | null;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  slug: string;
  title: string;
  body: string[];
};

export const mediumProfile = {
  handle: "@Kris025",
  url: mediumProfileUrl,
};

export async function getMediumPosts(): Promise<MediumPost[]> {
  try {
    const response = await fetch(mediumFeedUrl, {
      headers: {
        "User-Agent": "Akshay Portfolio Blog Reader/1.0",
      },
      next: {
        revalidate: 3600,
      },
    });

    if (!response.ok) {
      return [];
    }

    return parseMediumFeed(await response.text());
  } catch {
    return [];
  }
}

function parseMediumFeed(feed: string): MediumPost[] {
  return [...feed.matchAll(/<item>([\s\S]*?)<\/item>/gi)]
    .map((match) => toMediumPost(match[1]))
    .filter((post): post is MediumPost => post !== null)
    .slice(0, 24);
}

function toMediumPost(item: string): MediumPost | null {
  const title = toPlainText(getFeedValue(item, "title"));
  const articleUrl = toSafeArticleUrl(getFeedValue(item, "link"));
  const content = getFeedValue(item, "content:encoded");

  if (!title || !articleUrl || !content) {
    return null;
  }

  const body = toParagraphs(content);

  return {
    author: toPlainText(getFeedValue(item, "dc:creator")) || mediumProfile.handle,
    body,
    coverImage: findCoverImage(content),
    excerpt:
      toPlainText(getFeedValue(item, "description")) || body[0] || "Read the full story.",
    publishedAt: toIsoDate(getFeedValue(item, "pubDate")),
    readingTime: getReadingTime(body),
    slug: getArticleSlug(articleUrl),
    title,
  };
}

function getFeedValue(item: string, tag: string): string {
  const escapedTag = tag.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
  const match = item.match(
    new RegExp(`<${escapedTag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${escapedTag}>`, "i"),
  );

  return unwrapCdata(match?.[1] ?? "");
}

function unwrapCdata(value: string): string {
  return value.replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/i, "$1").trim();
}

function toParagraphs(content: string): string[] {
  const text = content
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<(?:br|hr)\s*\/?>/gi, "\n")
    .replace(/<\/(?:p|h[1-6]|li|blockquote|pre|figure|figcaption|div|section|article)>/gi, "\n\n")
    .replace(/<[^>]+>/g, "");

  return decodeHtmlEntities(text)
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

function toPlainText(value: string): string {
  return decodeHtmlEntities(value.replace(/<[^>]+>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtmlEntities(value: string): string {
  const namedEntities: Record<string, string> = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return value.replace(/&(?:#(x[\da-fA-F]+|\d+)|([a-zA-Z]+));/g, (entity, numeric, named) => {
    if (named) {
      return namedEntities[named.toLowerCase()] ?? entity;
    }

    const value = numeric.toLowerCase().startsWith("x")
      ? Number.parseInt(numeric.slice(1), 16)
      : Number.parseInt(numeric, 10);

    return Number.isSafeInteger(value) ? String.fromCodePoint(value) : entity;
  });
}

function toSafeArticleUrl(value: string): URL | null {
  try {
    const url = new URL(value.trim());

    if (url.protocol !== "https:" || !url.hostname.endsWith("medium.com")) {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}

function findCoverImage(content: string): string | null {
  const imageMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);

  if (!imageMatch) {
    return null;
  }

  try {
    const imageUrl = new URL(decodeHtmlEntities(imageMatch[1]));

    return imageUrl.protocol === "https:" && allowedMediaHosts.has(imageUrl.hostname)
      ? imageUrl.toString()
      : null;
  } catch {
    return null;
  }
}

function getArticleSlug(articleUrl: URL): string {
  const finalPathSegment = articleUrl.pathname.split("/").filter(Boolean).at(-1) ?? "story";
  const normalized = finalPathSegment
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  return normalized || `story-${createStableId(articleUrl.toString())}`;
}

function createStableId(value: string): string {
  let hash = 0;

  for (const character of value) {
    hash = (hash * 31 + character.charCodeAt(0)) | 0;
  }

  return Math.abs(hash).toString(36);
}

function toIsoDate(value: string): string {
  const date = new Date(value);

  return Number.isNaN(date.valueOf()) ? new Date(0).toISOString() : date.toISOString();
}

function getReadingTime(paragraphs: string[]): string {
  const wordCount = paragraphs.join(" ").trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 220));

  return `${minutes} min read`;
}
