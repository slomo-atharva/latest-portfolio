import { requestIsAuthorised, unauthorised } from "@/lib/frame-x/access";
import {
  NOT_CONFIGURED,
  getStore,
  readOrder,
  safeSegment,
  storeIsReady,
  writeOrder,
} from "@/lib/frame-x/store";

/** Saves the presentation order for one folder. */
export async function PUT(request: Request) {
  if (!requestIsAuthorised(request)) return unauthorised();

  if (!storeIsReady()) {
    return Response.json({ error: NOT_CONFIGURED }, { status: 503 });
  }

  try {
    const { folder, names } = (await request.json()) as {
      folder?: unknown;
      names?: unknown;
    };

    if (!Array.isArray(folder) || !Array.isArray(names)) {
      return Response.json({ error: "Invalid order" }, { status: 400 });
    }

    const key = (folder as string[]).map(safeSegment).join("/");
    const ordered = (names as unknown[])
      .filter((name): name is string => typeof name === "string")
      .map(safeSegment);

    const store = await getStore();
    const manifest = await readOrder(store);
    manifest[key] = ordered;
    await writeOrder(store, manifest);

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Could not save order" },
      { status: 400 },
    );
  }
}

export const runtime = "nodejs";
