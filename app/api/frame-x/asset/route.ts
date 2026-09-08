import { requestIsAuthorised, unauthorised } from "@/lib/frame-x/access";
import { getStore, joinPath, safeSegment } from "@/lib/frame-x/store";

/**
 * Streams one image after checking the token. The client fetches this with an
 * Authorization header and turns the response into an object URL, so no
 * credential ever appears in a URL and nothing is reachable without unlocking.
 */
export async function GET(request: Request) {
  if (!requestIsAuthorised(request)) return unauthorised();

  const raw = new URL(request.url).searchParams.get("path") ?? "";
  const segments = raw.split("/").filter(Boolean);

  if (!segments.length) {
    return Response.json({ error: "Invalid path" }, { status: 400 });
  }

  const store = await getStore();
  const file = await store.get(joinPath(segments.map(safeSegment)));

  if (!file) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  const body =
    file.body instanceof Uint8Array
      ? new Blob([file.body as BlobPart])
      : file.body;

  return new Response(body as BodyInit, {
    headers: {
      "Cache-Control": "private, max-age=300",
      "Content-Type": file.contentType,
    },
  });
}

export const runtime = "nodejs";
