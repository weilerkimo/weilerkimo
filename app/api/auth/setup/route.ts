import { NextResponse } from "next/server";
import { TOTP } from "otplib";

const totp = new TOTP();

export async function GET() {
  const secret = process.env.TOTP_SECRET!;
  const issuer = process.env.TOTP_ISSUER ?? "WK-OS";
  const account = process.env.TOTP_ACCOUNT ?? "kimo";

  const uri = totp.toURI({ label: account, secret, issuer });

  return NextResponse.json({ uri, secret });
}
