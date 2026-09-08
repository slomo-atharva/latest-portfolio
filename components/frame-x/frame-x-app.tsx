"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  Folder,
  FolderPlus,
  Lock,
  Play,
  Trash2,
  Upload,
} from "lucide-react";

import { AuthedImage } from "./authed-image";
import { Presenter, type PresenterSlide } from "./presenter";

type Entry = {
  folder: string[];
  isMarker: boolean;
  name: string;
  path: string;
  size: number;
  uploadedAt: string;
};

const surface =
  "rounded-[10px] border border-[var(--line)] bg-[var(--paper-bright)]";

export function FrameXApp() {
  const [token, setToken] = useState<string | null>(null);

  if (!token) {
    return <Lockscreen onUnlock={setToken} />;
  }

  return <Browser onLock={() => setToken(null)} token={token} />;
}

function Lockscreen({ onUnlock }: { onUnlock: (token: string) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  return (
    <main className="grid min-h-svh place-items-center bg-[var(--paper)] px-5">
      <form
        className={`${surface} w-full max-w-sm p-7`}
        onSubmit={async (event) => {
          event.preventDefault();
          setBusy(true);
          setError(null);

          try {
            const response = await fetch("/api/frame-x/session", {
              body: JSON.stringify({ password: value }),
              headers: { "Content-Type": "application/json" },
              method: "POST",
            });
            const data = await response.json();

            if (!response.ok) {
              throw new Error(data.error ?? "That is not it.");
            }

            onUnlock(data.token);
          } catch (caught) {
            setError(caught instanceof Error ? caught.message : "That is not it.");
            setValue("");
          } finally {
            setBusy(false);
          }
        }}
      >
        <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
          <Lock aria-hidden="true" className="h-3.5 w-3.5" />
          Frame X
        </span>
        <h1 className="mt-4 text-2xl font-semibold tracking-tight text-[var(--ink)]">
          Locked
        </h1>
        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
          Screens that never made it into a case study. The password is asked
          every time, and nothing is remembered between visits.
        </p>

        <input
          autoComplete="off"
          autoFocus
          className="mt-6 h-11 w-full rounded-[8px] border border-[var(--line)] bg-[var(--paper)] px-3 text-sm text-[var(--ink)] outline-none focus:border-[var(--blue)]"
          name="frame-x-password"
          onChange={(event) => setValue(event.target.value)}
          placeholder="Password"
          type="password"
          value={value}
        />

        {error ? (
          <p className="mt-3 text-sm text-[#a8392a]">{error}</p>
        ) : null}

        <button
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--ink)] px-5 text-sm font-medium text-[var(--paper-bright)] transition hover:bg-[#2a2a2e] disabled:opacity-50"
          disabled={busy || !value}
          type="submit"
        >
          {busy ? "Checking" : "Unlock"}
        </button>

        <Link
          className="mt-5 inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--ink)]"
          href="/"
        >
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
          Back to the portfolio
        </Link>
      </form>
    </main>
  );
}

function Browser({ onLock, token }: { onLock: () => void; token: string }) {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [path, setPath] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [renaming, setRenaming] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [blocked, setBlocked] = useState<string | null>(null);
  const [order, setOrder] = useState<Record<string, string[]>>({});
  const [dragFrom, setDragFrom] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const [slideIndex, setSlideIndex] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const authed = useMemo(
    () => ({ Authorization: `Bearer ${token}` }),
    [token],
  );

  const refresh = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/frame-x/tree", { headers: authed });

      if (response.status === 401) {
        onLock();

        return;
      }

      const data = await response.json();

      if (!response.ok) {
        setBlocked(data.error ?? "Storage is unavailable.");
        setEntries([]);

        return;
      }

      setBlocked(null);
      setEntries(data.entries ?? []);
      setOrder(data.order ?? {});
    } finally {
      setLoading(false);
    }
  }, [authed, onLock]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const here = path.join("/");

  const folders = useMemo(() => {
    const names = new Set<string>();

    for (const entry of entries) {
      const parent = entry.folder.slice(0, path.length).join("/");

      if (parent === here && entry.folder.length > path.length) {
        names.add(entry.folder[path.length]);
      }
    }

    return [...names].sort((a, b) => a.localeCompare(b));
  }, [entries, here, path.length]);

  /**
   * Saved order first, in the order it was saved. Anything not in the manifest
   * is a new upload and lands at the end, alphabetically, rather than jumping
   * into the middle of a sequence that was arranged on purpose.
   */
  const files = useMemo(() => {
    const rank = new Map((order[here] ?? []).map((name, i) => [name, i]));

    return entries
      .filter((entry) => !entry.isMarker && entry.folder.join("/") === here)
      .sort((a, b) => {
        const left = rank.get(a.name);
        const right = rank.get(b.name);

        if (left !== undefined && right !== undefined) return left - right;
        if (left !== undefined) return -1;
        if (right !== undefined) return 1;

        return a.name.localeCompare(b.name);
      });
  }, [entries, here, order]);

  const slides: PresenterSlide[] = useMemo(
    () =>
      files.map((file) => ({
        name: file.name,
        path: [...path, file.name].join("/"),
      })),
    [files, path],
  );

  const call = useCallback(
    async (url: string, method: string, body: unknown) => {
      const response = await fetch(url, {
        body: JSON.stringify(body),
        headers: { ...authed, "Content-Type": "application/json" },
        method,
      });

      if (response.status === 401) {
        onLock();

        throw new Error("Locked");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }

      return data;
    },
    [authed, onLock],
  );

  const upload = useCallback(
    async (list: FileList | File[]) => {
      const form = new FormData();
      form.append("folder", here);

      for (const file of Array.from(list)) {
        form.append("files", file);
      }

      setBusy("Uploading");

      try {
        const response = await fetch("/api/frame-x/upload", {
          body: form,
          headers: authed,
          method: "POST",
        });

        if (response.status === 401) {
          onLock();

          return;
        }

        await refresh();
      } finally {
        setBusy(null);
      }
    },
    [authed, here, onLock, refresh],
  );

  const reorder = useCallback(
    (from: number, to: number) => {
      if (from === to) {
        return;
      }

      const names = files.map((file) => file.name);
      const [moved] = names.splice(from, 1);
      names.splice(to, 0, moved);

      // Optimistic: the grid should follow the drop, not the round trip.
      setOrder((previous) => ({ ...previous, [here]: names }));

      void call("/api/frame-x/order", "PUT", { folder: path, names }).catch(
        (caught: unknown) =>
          setError(caught instanceof Error ? caught.message : null),
      );
    },
    [call, files, here, path],
  );

  return (
    <main className="min-h-svh bg-[var(--paper)] px-5 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <button
              className="font-medium text-[var(--ink)] hover:underline"
              onClick={() => setPath([])}
              type="button"
            >
              Frame X
            </button>
            {path.map((segment, index) => (
              <span className="flex items-center gap-2" key={segment + index}>
                <ChevronRight
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-[var(--muted)]"
                />
                <button
                  className="text-[var(--ink-soft)] hover:underline"
                  onClick={() => setPath(path.slice(0, index + 1))}
                  type="button"
                >
                  {segment}
                </button>
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {path.length > 0 && !blocked ? (
              <>
                <button
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--paper-bright)] px-3.5 text-xs font-medium text-[var(--ink)] transition hover:bg-[var(--line)]"
                  onClick={() => fileInput.current?.click()}
                  type="button"
                >
                  <Upload aria-hidden="true" className="h-3.5 w-3.5" />
                  Upload
                </button>
                <button
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[var(--ink)] px-3.5 text-xs font-medium text-[var(--paper-bright)] transition hover:bg-[#2a2a2e] disabled:opacity-40"
                  disabled={!slides.length}
                  onClick={() => setSlideIndex(0)}
                  type="button"
                >
                  <Play aria-hidden="true" className="h-3.5 w-3.5" />
                  Present
                </button>
              </>
            ) : null}
            {blocked ? null : (
              <button
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--paper-bright)] px-3.5 text-xs font-medium text-[var(--ink)] transition hover:bg-[var(--line)]"
                onClick={() => {
                  setError(null);
                  setCreating(true);
                }}
                type="button"
              >
                <FolderPlus aria-hidden="true" className="h-3.5 w-3.5" />
                New folder
              </button>
            )}
            <button
              className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs text-[var(--muted)] transition hover:text-[var(--ink)]"
              onClick={onLock}
              type="button"
            >
              <Lock aria-hidden="true" className="h-3.5 w-3.5" />
              Lock
            </button>
          </div>
        </header>

        <input
          accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
          className="hidden"
          multiple
          onChange={(event) => {
            if (event.target.files?.length) {
              void upload(event.target.files);
            }

            event.target.value = "";
          }}
          ref={fileInput}
          type="file"
        />

        <section
          className={`mt-7 rounded-[12px] border-2 border-dashed p-5 transition ${
            dragging
              ? "border-[var(--blue)] bg-[rgb(223_238_255_/_0.4)]"
              : "border-transparent"
          }`}
          onDragLeave={() => setDragging(false)}
          onDragOver={(event) => {
            if (path.length === 0 || !event.dataTransfer.types.includes("Files")) {
              return;
            }

            event.preventDefault();
            setDragging(true);
          }}
          onDrop={(event) => {
            event.preventDefault();
            setDragging(false);

            if (path.length > 0 && event.dataTransfer.files.length) {
              void upload(event.dataTransfer.files);
            }
          }}
        >
          {blocked ? (
            <div className={`${surface} mx-auto max-w-lg p-6 text-center`}>
              <p className="text-sm font-medium text-[var(--ink)]">
                Nowhere to put things yet
              </p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                {blocked}
              </p>
            </div>
          ) : null}

          {loading && !blocked ? (
            <p className="py-16 text-center text-sm text-[var(--muted)]">
              Opening
            </p>
          ) : null}

          {!loading && !blocked && !creating && folders.length === 0 && files.length === 0 ? (
            <p className="py-16 text-center text-sm text-[var(--muted)]">
              {path.length === 0
                ? "No folders yet. Make one for a project."
                : "Empty. Drop screens here, or use Upload."}
            </p>
          ) : null}

          {folders.length > 0 || creating ? (
            <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {creating ? (
                <li className={`${surface} p-4`}>
                  <input
                    autoFocus
                    className="w-full rounded-[6px] border border-[var(--line)] px-2 py-1 text-sm outline-none focus:border-[var(--blue)]"
                    onBlur={() => setCreating(false)}
                    onKeyDown={async (event) => {
                      if (event.key === "Escape") {
                        setCreating(false);

                        return;
                      }

                      if (event.key !== "Enter") {
                        return;
                      }

                      const name = event.currentTarget.value.trim();
                      setCreating(false);

                      if (!name) {
                        return;
                      }

                      try {
                        await call("/api/frame-x/folder", "POST", {
                          path: [...path, name],
                        });
                        await refresh();
                      } catch (caught) {
                        setError(
                          caught instanceof Error ? caught.message : null,
                        );
                      }
                    }}
                    placeholder="Folder name"
                  />
                  <p className="mt-2 text-[0.7rem] text-[var(--muted)]">
                    Enter to create, Escape to cancel
                  </p>
                </li>
              ) : null}
              {folders.map((name) => (
                <li className={`${surface} group p-4`} key={name}>
                  {renaming === name ? (
                    <input
                      autoFocus
                      className="w-full rounded-[6px] border border-[var(--line)] px-2 py-1 text-sm"
                      defaultValue={name}
                      onBlur={() => setRenaming(null)}
                      onKeyDown={async (event) => {
                        if (event.key === "Escape") {
                          setRenaming(null);
                        }

                        if (event.key === "Enter") {
                          const next = event.currentTarget.value.trim();
                          setRenaming(null);

                          if (next && next !== name) {
                            try {
                              await call("/api/frame-x/folder", "PATCH", {
                                name: next,
                                path: [...path, name],
                              });
                              await refresh();
                            } catch (caught) {
                              setError(
                                caught instanceof Error ? caught.message : null,
                              );
                            }
                          }
                        }
                      }}
                    />
                  ) : (
                    <button
                      className="flex w-full items-center gap-2.5 text-left"
                      onClick={() => setPath([...path, name])}
                      type="button"
                    >
                      <Folder
                        aria-hidden="true"
                        className="h-5 w-5 flex-none text-[var(--blue)]"
                      />
                      <span className="truncate text-sm font-medium text-[var(--ink)]">
                        {name}
                      </span>
                    </button>
                  )}

                  <div
                    className={`mt-3 flex flex-wrap gap-3 text-[0.7rem] text-[var(--muted)] transition group-hover:opacity-100 ${
                      confirming === `folder:${name}` ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <button
                      className="hover:text-[var(--ink)]"
                      onClick={() => setRenaming(name)}
                      type="button"
                    >
                      Rename
                    </button>
                    {confirming === `folder:${name}` ? (
                      <>
                        <button
                          className="font-medium text-[#a8392a]"
                          onClick={async () => {
                            setConfirming(null);

                            try {
                              await call("/api/frame-x/folder", "DELETE", {
                                path: [...path, name],
                              });
                              await refresh();
                            } catch (caught) {
                              setError(
                                caught instanceof Error ? caught.message : null,
                              );
                            }
                          }}
                          type="button"
                        >
                          Delete it and everything inside
                        </button>
                        <button
                          className="hover:text-[var(--ink)]"
                          onClick={() => setConfirming(null)}
                          type="button"
                        >
                          Keep
                        </button>
                      </>
                    ) : (
                      <button
                        className="hover:text-[#a8392a]"
                        onClick={() => setConfirming(`folder:${name}`)}
                        type="button"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : null}

          {files.length > 1 ? (
            <p className="mb-3 mt-6 text-xs text-[var(--muted)]">
              Drag a screen to change where it falls in the presentation.
            </p>
          ) : null}

          {files.length > 0 ? (
            <ul
              className={`grid gap-4 sm:grid-cols-3 lg:grid-cols-4 ${
                folders.length && files.length < 2 ? "mt-6" : ""
              }`}
            >
              {files.map((file, index) => (
                <li
                  className={`${surface} group overflow-hidden transition ${
                    dragFrom === index ? "opacity-40" : ""
                  } ${
                    dragOver === index && dragFrom !== index
                      ? "ring-2 ring-[var(--blue)]"
                      : ""
                  }`}
                  draggable
                  key={file.path}
                  onDragEnd={() => {
                    setDragFrom(null);
                    setDragOver(null);
                  }}
                  onDragOver={(event) => {
                    if (dragFrom === null) {
                      return;
                    }

                    // Stop the upload zone from claiming an internal drag.
                    event.preventDefault();
                    event.stopPropagation();
                    setDragOver(index);
                  }}
                  onDragStart={(event) => {
                    event.dataTransfer.effectAllowed = "move";
                    setDragFrom(index);
                  }}
                  onDrop={(event) => {
                    if (dragFrom === null) {
                      return;
                    }

                    event.preventDefault();
                    event.stopPropagation();
                    reorder(dragFrom, index);
                    setDragFrom(null);
                    setDragOver(null);
                  }}
                >
                  <button
                    className="block aspect-[4/3] w-full cursor-grab overflow-hidden bg-[var(--line)] active:cursor-grabbing"
                    onClick={() => setSlideIndex(index)}
                    type="button"
                  >
                    <AuthedImage
                      alt={file.name}
                      className="h-full w-full object-cover"
                      path={[...path, file.name].join("/")}
                      token={token}
                    />
                  </button>
                  <div className="flex items-center justify-between gap-2 px-3 py-2.5">
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="flex-none text-[0.65rem] tabular-nums text-[var(--muted)]">
                        {index + 1}
                      </span>
                      <span className="truncate text-xs text-[var(--ink-soft)]">
                        {file.name}
                      </span>
                    </span>
                    {confirming === `file:${file.name}` ? (
                      <span className="flex flex-none items-center gap-2 text-[0.7rem]">
                        <button
                          className="font-medium text-[#a8392a]"
                          onClick={async () => {
                            setConfirming(null);

                            try {
                              await call("/api/frame-x/file", "DELETE", {
                                path: [...path, file.name],
                              });
                              await refresh();
                            } catch (caught) {
                              setError(
                                caught instanceof Error ? caught.message : null,
                              );
                            }
                          }}
                          type="button"
                        >
                          Delete
                        </button>
                        <button
                          className="text-[var(--muted)] hover:text-[var(--ink)]"
                          onClick={() => setConfirming(null)}
                          type="button"
                        >
                          Keep
                        </button>
                      </span>
                    ) : (
                      <button
                        aria-label={`Delete ${file.name}`}
                        className="flex-none text-[var(--muted)] opacity-0 transition hover:text-[#a8392a] group-hover:opacity-100"
                        onClick={() => setConfirming(`file:${file.name}`)}
                        type="button"
                      >
                        <Trash2 aria-hidden="true" className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </section>

        {busy ? (
          <p className="mt-4 text-center text-xs text-[var(--muted)]">{busy}</p>
        ) : null}

        {error ? (
          <p className="mt-4 text-center text-xs text-[#a8392a]">
            {error}{" "}
            <button
              className="underline"
              onClick={() => setError(null)}
              type="button"
            >
              Dismiss
            </button>
          </p>
        ) : null}
      </div>

      {slideIndex !== null && slides.length ? (
        <Presenter
          index={Math.min(slideIndex, slides.length - 1)}
          onClose={() => setSlideIndex(null)}
          onIndexChange={setSlideIndex}
          slides={slides}
          title={path[path.length - 1] ?? "Frame X"}
          token={token}
        />
      ) : null}
    </main>
  );
}
