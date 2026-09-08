import { requestIsAuthorised, unauthorised } from "@/lib/frame-x/access";
import { getStore, joinPath, safeSegment } from "@/lib/frame-x/store";

const ALLOWED = new Set([
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
]);

/**
 * Vercel caps a function request body at 4.5MB, so anything larger cannot
 * reach this route at all. Reject it here with a message rather than letting
 * the platform return an opaque 413.
 */
const MAX_BYTES = 4 * 1024 * 1024;

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
    const folderPath = joinPath(segments);

    // Same-named files silently replaced each other, so uploading exports from
    // two sources quietly lost screens. Suffix instead, the way a desktop does.
    const existing = new Set(
      (await store.list(`${folderPath}/`)).map((item) =>
        item.path.slice(folderPath.length + 1),
      ),
    );

    const uniqueName = (name: string) => {
      if (!existing.has(name)) {
        return name;
      }

      const dot = name.lastIndexOf(".");
      const stem = dot > 0 ? name.slice(0, dot) : name;
      const ext = dot > 0 ? name.slice(dot) : "";

      for (let n = 2; n < 500; n += 1) {
        const candidate = `${stem} (${n})${ext}`;

        if (!existing.has(candidate)) {
          return candidate;
        }
      }

      return `${stem} (${Date.now()})${ext}`;
    };

    const saved: string[] = [];
    const skipped: { name: string; reason: string }[] = [];

    for (const file of files) {
      if (!ALLOWED.has(file.type)) {
        skipped.push({ name: file.name, reason: "not an image" });
        continue;
      }

      if (file.size > MAX_BYTES) {
        skipped.push({ name: file.name, reason: "over 4MB" });
        continue;
      }

      const name = uniqueName(safeSegment(file.name));
      const bytes = new Uint8Array(await file.arrayBuffer());
      await store.put(`${folderPath}/${name}`, bytes, file.type);
      existing.add(name);
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
