import { requestIsAuthorised, unauthorised } from "@/lib/frame-x/access";
import { getStore, joinPath, safeSegment } from "@/lib/frame-x/store";

const ALLOWED = new Set([
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

const MAX_BYTES = 12 * 1024 * 1024;

export async function POST(request: Request) {
  if (!requestIsAuthorised(request)) return unauthorised();

  try {
    const form = await request.formData();
    const raw = form.get("folder");
    const segments = (typeof raw === "string" && raw ? raw.split("/") : []).map(
      safeSegment,
    );
    const files = form.getAll("files").filter((f): f is File => f instanceof File);

    if (!files.length) {
      return Response.json({ error: "No files" }, { status: 400 });
    }

    const store = await getStore();
    const saved: string[] = [];
    const skipped: string[] = [];

    for (const file of files) {
      if (!ALLOWED.has(file.type) || file.size > MAX_BYTES) {
        skipped.push(file.name);
        continue;
      }

      const name = safeSegment(file.name);
      const bytes = new Uint8Array(await file.arrayBuffer());
      await store.put(`${joinPath(segments)}/${name}`, bytes, file.type);
      saved.push(name);
    }

    return Response.json({ saved, skipped });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 },
    );
  }
}

export const runtime = "nodejs";
