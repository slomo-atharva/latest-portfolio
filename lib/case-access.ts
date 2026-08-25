import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ACCESS_COOKIE = "cs_access";
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function casePassword(): string {
  return process.env.CASE_STUDY_PASSWORD ?? "Open";
}

function accessSecret(): string {
  return process.env.CASE_ACCESS_SECRET ?? `case-access:${casePassword()}`;
}

/**
 * The cookie value handed out after a correct password. It is an HMAC, so it
 * cannot be forged by hand in devtools the way a plain "unlocked=1" could be.
 */
export function accessToken(): string {
  return createHmac("sha256", accessSecret()).update("unlocked").digest("hex");
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
  return typeof candidate === "string" && constantTimeEquals(candidate, casePassword());
}

export async function isUnlocked(): Promise<boolean> {
  const value = (await cookies()).get(ACCESS_COOKIE)?.value;

  return typeof value === "string" && constantTimeEquals(value, accessToken());
}
