export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#F2F0EB] p-8">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-16">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-black/40 font-[family-name:var(--font-mono)] mb-1">
              Private
            </p>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          </div>
          <a
            href="/"
            className="text-[10px] tracking-[0.2em] uppercase text-black/40 font-[family-name:var(--font-mono)] hover:text-black transition-colors"
          >
            ← Home
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          {[
            { label: "Portfolio", value: "~980 CHF", sub: "Interactive Brokers" },
            { label: "Unrealized P/L", value: "+160 CHF", sub: "seit Start" },
            { label: "Strategien", value: "0 aktiv", sub: "Paper Trading" },
          ].map((stat) => (
            <div key={stat.label} className="p-5 border border-black/10 rounded-lg">
              <p className="text-[10px] tracking-[0.15em] uppercase text-black/40 font-[family-name:var(--font-mono)] mb-2">
                {stat.label}
              </p>
              <p className="text-xl font-semibold mb-1">{stat.value}</p>
              <p className="text-xs text-black/40">{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="border border-black/10 rounded-lg p-5">
          <p className="text-[10px] tracking-[0.15em] uppercase text-black/40 font-[family-name:var(--font-mono)] mb-4">
            Quant Research
          </p>
          <p className="text-sm text-black/50">Noch keine Strategien hinterlegt — Python-Scripts kommen hier.</p>
        </div>

      </div>
    </div>
  );
}
