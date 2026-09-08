import { issueToken, passwordMatches } from "@/lib/frame-x/access";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  const password = (body as { password?: unknown } | null)?.password;

  if (!passwordMatches(password)) {
    return Response.json({ error: "That is not it." }, { status: 401 });
  }

  return Response.json(issueToken());
}
