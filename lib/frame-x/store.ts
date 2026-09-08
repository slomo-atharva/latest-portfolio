import "server-only";

/**
 * Frame X storage.
 *
 * Production uses a private Vercel Blob store: reads require authentication
 * and files are delivered through our own route rather than a public URL.
 * Local development uses a gitignored folder on disk, because Vercel's
 * runtime filesystem is read only and a dev machine's is not.
 *
 * Folders are path prefixes rather than rows in a database. An empty folder
 * is held open by a single marker object so it survives a page refresh.
 */

export const ROOT = "frame-x";
export const FOLDER_MARKER = ".folder";

export type StoredItem = {
  path: string;
  size: number;
  uploadedAt: string;
};

export type StoredFile = {
  body: ReadableStream<Uint8Array> | Uint8Array;
  contentType: string;
  size: number;
};

export type FrameXStore = {
  list: (prefix: string) => Promise<StoredItem[]>;
  put: (path: string, body: Uint8Array, contentType: string) => Promise<void>;
  get: (path: string) => Promise<StoredFile | null>;
  del: (paths: string[]) => Promise<void>;
  move: (from: string, to: string) => Promise<void>;
};

/**
 * Rejects anything that could climb out of ROOT rather than quietly rewriting
 * it. Sanitising silently turned "../../etc" into a folder named ".etc",
 * which is contained but is not what anyone asked for.
 */
export function safeSegment(segment: string): string {
  const trimmed = String(segment ?? "").trim();

  if (!trimmed || trimmed.length > 120) {
    throw new Error("A name is required");
  }

  if (/[/\\]/.test(trimmed)) {
    throw new Error("Names cannot contain slashes");
  }

  if (trimmed.includes("..")) {
    throw new Error("Names cannot contain '..'");
  }

  if (trimmed.startsWith(".")) {
    throw new Error("Names cannot start with a dot");
  }

  return trimmed;
}

export function joinPath(segments: string[]): string {
  return [ROOT, ...segments.map(safeSegment)].join("/");
}

let cached: FrameXStore | null = null;

export async function getStore(): Promise<FrameXStore> {
  if (cached) {
    return cached;
  }

  const hasBlob = Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ?? process.env.BLOB_STORE_ID,
  );

  cached = hasBlob
    ? (await import("./store-blob")).blobStore
    : (await import("./store-fs")).fsStore;

  return cached;
}
