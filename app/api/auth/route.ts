import { NextRequest, NextResponse } from "next/server";
import { TOTP } from "otplib";

const totp = new TOTP();

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  if (!code || typeof code !== "string") {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const secret = process.env.TOTP_SECRET!;
  const valid = totp.verify({ token: code.replace(/\s/g, ""), secret });

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
