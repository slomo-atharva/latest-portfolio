import "server-only";

import type { FrameXStore, StoredFile } from "./store";

/**
 * Production store, backed by a PRIVATE Vercel Blob store.
 *
 * Private mode is the point: read access requires authentication and the
 * bytes are delivered through our own route handler, so nothing is reachable
 * by URL alone. A store's access mode is fixed at creation, so this only
 * works against a store that was created as private.
 *
 * The SDK is imported lazily so it is only pulled in when a store exists.
 */
const ACCESS = "private" as const;

async function sdk() {
  return import("@vercel/blob");
}

export const blobStore: FrameXStore = {
  async list(prefix) {
    const { list } = await sdk();
    const out: { path: string; size: number; uploadedAt: string }[] = [];
    let cursor: string | undefined;

    do {
      const page = await list({ cursor, limit: 1000, prefix });

      for (const blob of page.blobs) {
        out.push({
          path: blob.pathname,
          size: blob.size,
          uploadedAt: new Date(blob.uploadedAt).toISOString(),
        });
      }

      cursor = page.cursor;
    } while (cursor);

    return out;
  },

  async put(path, body, contentType) {
    const { put } = await sdk();
    await put(path, Buffer.from(body), {
      access: ACCESS,
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType,
    });
  },

  async get(path): Promise<StoredFile | null> {
    const { get } = await sdk();

    try {
      const result = await get(path, { access: ACCESS });

      if (!result || result.statusCode !== 200) {
        return null;
      }

      return {
        body: result.stream,
        contentType: result.blob.contentType || "application/octet-stream",
        size: result.blob.size ?? 0,
      };
    } catch {
      return null;
    }
  },

  async del(paths) {
    const { del } = await sdk();

    if (paths.length) {
      await del(paths);
    }
  },

  async move(from, to) {
    const { rename } = await sdk();
    await rename(from, to, { access: ACCESS });
  },
};
