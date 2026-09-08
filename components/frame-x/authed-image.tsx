"use client";

import { useEffect, useState } from "react";

/**
 * Images are private, so they cannot be loaded with a plain src: the request
 * has to carry the unlock token. Fetch it, hand the browser an object URL,
 * and revoke it on the way out so nothing leaks between renders.
 */
export function useAuthedImage(path: string, token: string) {
  const [url, setUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let objectUrl: string | null = null;
    let cancelled = false;

    (async () => {
      try {
        const response = await fetch(
          `/api/frame-x/asset?path=${encodeURIComponent(path)}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (!response.ok) {
          throw new Error("Could not load");
        }

        const blob = await response.blob();

        if (cancelled) {
          return;
        }

        objectUrl = URL.createObjectURL(blob);
        setUrl(objectUrl);
      } catch {
        if (!cancelled) {
          setFailed(true);
        }
      }
    })();

    return () => {
      cancelled = true;

      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [path, token]);

  return { failed, url };
}

export function AuthedImage({
  alt,
  className,
  path,
  token,
}: {
  alt: string;
  className?: string;
  path: string;
  token: string;
}) {
  const { failed, url } = useAuthedImage(path, token);

  if (failed) {
    return (
      <div className="grid h-full w-full place-items-center bg-[var(--line)] text-xs text-[var(--muted)]">
        Could not load
      </div>
    );
  }

  if (!url) {
    return <div className="h-full w-full animate-pulse bg-[var(--line)]" />;
  }

  // eslint-disable-next-line @next/next/no-img-element -- object URL from a
  // private, token-checked fetch; the image optimizer cannot reach it.
  return <img alt={alt} className={className} src={url} />;
}
