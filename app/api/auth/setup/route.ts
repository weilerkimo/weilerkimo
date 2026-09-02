import { NextResponse } from "next/server";
import speakeasy from "speakeasy";

export async function GET() {
  const secret = process.env.TOTP_SECRET!;
  const issuer = process.env.TOTP_ISSUER ?? "WK-OS";
  const account = process.env.TOTP_ACCOUNT ?? "kimo";

  const uri = speakeasy.otpauthURL({
    secret,
    label: account,
    issuer,
    encoding: "base32",
  });

  return NextResponse.json({ uri, secret });
}
