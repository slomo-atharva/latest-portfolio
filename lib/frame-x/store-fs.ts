import "server-only";

import { mkdir, readFile, readdir, rename, rm, stat, writeFile } from "node:fs/promises";
import { dirname, join, resolve, sep } from "node:path";

import type { FrameXStore, StoredFile, StoredItem } from "./store";

/**
 * Development store. Vercel's runtime filesystem is read only, so this is
 * never the production path; it exists so the whole flow can be built and
 * exercised locally before a Blob store exists.
 */
const BASE = resolve(process.cwd(), ".frame-x-store");

function toDisk(path: string): string {
  const full = resolve(BASE, path);

  // resolve() has already flattened any "..", so anything outside BASE is a bug.
  if (full !== BASE && !full.startsWith(BASE + sep)) {
    throw new Error("Path escapes the store");
  }

  return full;
}

async function walk(dir: string, prefix: string, out: StoredItem[]) {
  let entries;

  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }

  const base = prefix.replace(/\/+$/, "");

  for (const entry of entries) {
    // The caller passes a trailing slash on prefixes; joining naively produced
    // "frame-x//name", which corrupted every path derived from it.
    const childPath = base ? `${base}/${entry.name}` : entry.name;

    if (entry.isDirectory()) {
      await walk(join(dir, entry.name), childPath, out);
      continue;
    }

    const info = await stat(join(dir, entry.name));
    out.push({
      path: childPath,
      size: info.size,
      uploadedAt: info.mtime.toISOString(),
    });
  }
}

const types: Record<string, string> = {
  avif: "image/avif",
  gif: "image/gif",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  webp: "image/webp",
};

function contentTypeFor(path: string): string {
  return types[path.split(".").pop()?.toLowerCase() ?? ""] ?? "application/octet-stream";
}

export const fsStore: FrameXStore = {
  async list(prefix) {
    const out: StoredItem[] = [];
    await walk(toDisk(prefix), prefix, out);

    return out;
  },

  async put(path, body, _contentType) {
    const disk = toDisk(path);
    await mkdir(dirname(disk), { recursive: true });
    await writeFile(disk, body);
  },

  async get(path): Promise<StoredFile | null> {
    try {
      const disk = toDisk(path);
      const body = await readFile(disk);

      return {
        body: new Uint8Array(body),
        contentType: contentTypeFor(path),
        size: body.byteLength,
      };
    } catch {
      return null;
    }
  },

  async del(paths) {
    await Promise.all(
      paths.map((path) => rm(toDisk(path), { force: true, recursive: true })),
    );
  },

  async move(from, to) {
    const target = toDisk(to);
    await mkdir(dirname(target), { recursive: true });
    await rename(toDisk(from), target);
  },
};
