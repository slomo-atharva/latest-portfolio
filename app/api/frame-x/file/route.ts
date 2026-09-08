import { requestIsAuthorised, unauthorised } from "@/lib/frame-x/access";
import { getStore, joinPath, safeSegment } from "@/lib/frame-x/store";

export async function DELETE(request: Request) {
  if (!requestIsAuthorised(request)) return unauthorised();

  try {
    const { path } = (await request.json()) as { path?: unknown };

    if (!Array.isArray(path) || !path.length) {
      return Response.json({ error: "Invalid path" }, { status: 400 });
    }

    const store = await getStore();
    await store.del([joinPath((path as string[]).map(safeSegment))]);

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Could not delete" },
      { status: 400 },
    );
  }
}

export const runtime = "nodejs";
