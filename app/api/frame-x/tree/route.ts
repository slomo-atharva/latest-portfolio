import { requestIsAuthorised, unauthorised } from "@/lib/frame-x/access";
import { FOLDER_MARKER, ROOT, getStore } from "@/lib/frame-x/store";

/** One flat listing; the client folds it into a tree. */
export async function GET(request: Request) {
  if (!requestIsAuthorised(request)) {
    return unauthorised();
  }

  const store = await getStore();
  const items = await store.list(`${ROOT}/`);

  const entries = items.map((item) => {
    const segments = item.path.slice(ROOT.length + 1).split("/");
    const name = segments[segments.length - 1];

    return {
      folder: segments.slice(0, -1),
      isMarker: name === FOLDER_MARKER,
      name,
      path: item.path,
      size: item.size,
      uploadedAt: item.uploadedAt,
    };
  });

  return Response.json({ entries });
}
