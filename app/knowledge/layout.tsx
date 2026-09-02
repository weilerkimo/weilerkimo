import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${geist.variable} min-h-screen bg-white text-[#0a0a0a]`} style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
      <header className="border-b border-black/8 px-8 py-4 flex items-center justify-between">
        <nav className="flex items-center gap-6 text-sm font-medium text-[#0a0a0a]">
          <a href="/knowledge" className="hover:text-black/50 transition-colors">Knowledge</a>
          <a href="/dashboard" className="hover:text-black/50 transition-colors">Dashboard</a>
        </nav>
        <a href="/" className="text-xs text-black/30 hover:text-black/60 transition-colors">
          weilerkimo.com ↗
        </a>
      </header>
      <main>{children}</main>
    </div>
  );
}
