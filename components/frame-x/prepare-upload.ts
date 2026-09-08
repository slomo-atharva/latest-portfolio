/**
 * A serverless function will not accept a request body over about 4.5MB, and a
 * Figma export at 2x is routinely larger than that. Rather than refusing those
 * screens, shrink them in the browser first.
 *
 * Nothing is touched unless it has to be: a file already inside the limit and
 * within the edge cap is uploaded exactly as it came off disk.
 */
const MAX_BYTES = 3.6 * 1024 * 1024;
const MAX_EDGE = 2800;
const QUALITIES = [0.92, 0.85, 0.75, 0.6];

export type Prepared = {
  file: File;
  resized: boolean;
};

/** Animation would be flattened, and vectors do not belong on a canvas. */
function canRedraw(type: string): boolean {
  return type === "image/png" || type === "image/jpeg" || type === "image/webp";
}

function withExtension(name: string, extension: string): string {
  const dot = name.lastIndexOf(".");

  return `${dot > 0 ? name.slice(0, dot) : name}.${extension}`;
}

async function toBlob(
  canvas: HTMLCanvasElement,
  quality: number,
): Promise<Blob | null> {
  return new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(blob), "image/webp", quality),
  );
}

export async function prepareForUpload(file: File): Promise<Prepared> {
  if (file.size <= MAX_BYTES && !canRedraw(file.type)) {
    return { file, resized: false };
  }

  if (!canRedraw(file.type)) {
    return { file, resized: false };
  }

  let bitmap: ImageBitmap;

  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return { file, resized: false };
  }

  const longest = Math.max(bitmap.width, bitmap.height);
  const scale = longest > MAX_EDGE ? MAX_EDGE / longest : 1;

  // Already small enough in both senses, so leave the original alone.
  if (scale === 1 && file.size <= MAX_BYTES) {
    bitmap.close();

    return { file, resized: false };
  }

  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);

  const context = canvas.getContext("2d");

  if (!context) {
    bitmap.close();

    return { file, resized: false };
  }

  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  for (const quality of QUALITIES) {
    const blob = await toBlob(canvas, quality);

    if (blob && blob.size <= MAX_BYTES) {
      return {
        file: new File([blob], withExtension(file.name, "webp"), {
          type: "image/webp",
        }),
        resized: true,
      };
    }
  }

  // Every quality step was still too big. Send the original and let the server
  // say so, rather than quietly uploading something unrecognisable.
  return { file, resized: false };
}
