export default function Home() {
  return (
    <div className="min-h-screen relative flex flex-col p-6 md:p-8 bg-[#F2F0EB]">

      {/* Top Bar */}
      <div className="flex justify-between items-start w-full">
        <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-black/60 font-[family-name:var(--font-mono)]">
          Portfolio — Coming Soon
        </p>
        <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-black/60 font-[family-name:var(--font-mono)]">
          St. Gallen / CH
        </p>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col justify-center mt-8">
        <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-black font-[family-name:var(--font-mono)] mb-4 flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-black" />
          Currently Building
        </p>
        <h1
          className="text-[20vw] md:text-[18vw] font-black leading-[0.85] tracking-tighter uppercase text-black"
          style={{ fontFamily: "'Arial Black', 'Helvetica Neue', Impact, sans-serif" }}
        >
          Weiler<br />Kimo
        </h1>
        <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-black/60 font-[family-name:var(--font-mono)] mt-6">
          Design / Branding / Web
        </p>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end w-full mt-8">
        <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-black/60 font-[family-name:var(--font-mono)]">
          KW @2026
        </p>
        <div className="text-right">
          <p className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-black/40 font-[family-name:var(--font-mono)] mb-1">
            Contact
          </p>
          <a
            href="mailto:weiler.kimo@weilerkimo.com"
            className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-black font-[family-name:var(--font-mono)] hover:text-black/60 transition-colors"
          >
            weiler.kimo@weilerkimo.com
          </a>
        </div>
      </div>

    </div>
  );
}
