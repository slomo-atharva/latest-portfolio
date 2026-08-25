import { NextResponse } from "next/server";
import {
  ACCESS_COOKIE,
  ACCESS_MAX_AGE,
  accessToken,
  passwordMatches,
} from "@/lib/case-access";

export async function POST(request: Request) {
  let payload: { password?: unknown };

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!passwordMatches(payload.password)) {
    return NextResponse.json(
      { error: "That password is not right." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set({
    name: ACCESS_COOKIE,
    value: accessToken(),
    httpOnly: true,
    maxAge: ACCESS_MAX_AGE,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
