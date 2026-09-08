import { requestIsAuthorised, unauthorised } from "@/lib/frame-x/access";
import {
  FOLDER_MARKER,
  getStore,
  joinPath,
  safeSegment,
} from "@/lib/frame-x/store";

function readPath(value: unknown): string[] {
  if (!Array.isArray(value) || value.some((part) => typeof part !== "string")) {
    throw new Error("Invalid folder");
  }

  return (value as string[]).map(safeSegment);
}

/** Create. An empty folder is held open by a marker object. */
export async function POST(request: Request) {
  if (!requestIsAuthorised(request)) return unauthorised();

  try {
    const { path } = (await request.json()) as { path?: unknown };
    const segments = readPath(path);
    const store = await getStore();
    await store.put(
      `${joinPath(segments)}/${FOLDER_MARKER}`,
      new Uint8Array(0),
      "application/x-frame-x-folder",
    );

    return Response.json({ ok: true, path: segments });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Could not create" },
      { status: 400 },
    );
  }
}

/** Rename: every object under the old prefix moves to the new one. */
export async function PATCH(request: Request) {
  if (!requestIsAuthorised(request)) return unauthorised();

  try {
    const { path, name } = (await request.json()) as {
      path?: unknown;
      name?: unknown;
    };
    const segments = readPath(path);
    const nextName = safeSegment(String(name ?? ""));
    const from = `${joinPath(segments)}/`;
    const to = `${joinPath([...segments.slice(0, -1), nextName])}/`;

    if (from === to) {
      return Response.json({ ok: true });
    }

    const store = await getStore();
    const items = await store.list(from);

    if (!items.length) {
      return Response.json({ error: "Folder not found" }, { status: 404 });
    }

    for (const item of items) {
      await store.move(item.path, `${to}${item.path.slice(from.length)}`);
    }

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Could not rename" },
      { status: 400 },
    );
  }
}

/** Delete the folder and everything under it. */
export async function DELETE(request: Request) {
  if (!requestIsAuthorised(request)) return unauthorised();

  try {
    const { path } = (await request.json()) as { path?: unknown };
    const segments = readPath(path);

    if (!segments.length) {
      return Response.json({ error: "Cannot delete the root" }, { status: 400 });
    }

    const prefix = `${joinPath(segments)}/`;
    const store = await getStore();
    const items = await store.list(prefix);
    await store.del(items.map((item) => item.path));

    return Response.json({ ok: true, removed: items.length });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Could not delete" },
      { status: 400 },
    );
  }
}

export const runtime = "nodejs";
