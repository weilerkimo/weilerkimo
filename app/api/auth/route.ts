import { NextRequest, NextResponse } from "next/server";
import speakeasy from "speakeasy";

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  if (!code || typeof code !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const valid = speakeasy.totp.verify({
    secret: process.env.TOTP_SECRET!,
    encoding: "base32",
    token: code.replace(/\s/g, ""),
    window: 1,
  });

  if (!valid) {
    return NextResponse.json({ error: "Invalid code" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("wk-access", process.env.PRIVATE_ACCESS_SECRET!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return res;
}
