import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kimo Weiler — Designer",
  description: "Design / Branding / Web. St. Gallen, CH.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={geistMono.variable}>
      <body className="min-h-screen bg-[#F2F0EB] text-black antialiased">
        {children}
      </body>
    </html>
  );
}
