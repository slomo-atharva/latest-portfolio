import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Frame X access.
 *
 * Deliberately unlike the case study gate. That one sets a 30 day cookie;
 * this one issues a short lived token that the browser only ever holds in
 * memory, so closing or reloading the page asks for the password again.
 */
const TOKEN_TTL_MS = 3 * 60 * 60 * 1000;

function password(): string {
  return process.env.FRAME_X_PASSWORD ?? "Wonderful";
}

function secret(): string {
  return process.env.FRAME_X_SECRET ?? `frame-x:${password()}`;
}

function sign(expiresAt: number): string {
  return createHmac("sha256", secret()).update(String(expiresAt)).digest("hex");
}

function constantTimeEquals(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}

export function passwordMatches(candidate: unknown): boolean {
  return (
    typeof candidate === "string" && constantTimeEquals(candidate, password())
  );
}

export function issueToken(): { token: string; expiresAt: number } {
  const expiresAt = Date.now() + TOKEN_TTL_MS;

  return { token: `${expiresAt}.${sign(expiresAt)}`, expiresAt };
}

export function tokenIsValid(token: string | null | undefined): boolean {
  if (typeof token !== "string") {
    return false;
  }

  const [rawExpiry, signature] = token.split(".");
  const expiresAt = Number(rawExpiry);

  if (!Number.isFinite(expiresAt) || !signature || expiresAt < Date.now()) {
    return false;
  }

  return constantTimeEquals(signature, sign(expiresAt));
}

/** Every Frame X route reads the token from the Authorization header. */
export function requestIsAuthorised(request: Request): boolean {
  const header = request.headers.get("authorization") ?? "";

  return tokenIsValid(header.replace(/^Bearer\s+/i, "").trim());
}

export function unauthorised(): Response {
  return Response.json({ error: "Not unlocked" }, { status: 401 });
}
