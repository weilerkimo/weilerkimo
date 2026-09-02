export default function DashboardPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 py-16">
      <div className="mb-12">
        <p className="text-xs text-black/40 uppercase tracking-widest mb-3">WK Capital</p>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: "Portfolio", value: "~980 CHF", sub: "Interactive Brokers" },
          { label: "Unrealized P/L", value: "+160 CHF", sub: "+16.3% seit Start" },
          { label: "Paper Trades", value: "0 aktiv", sub: "Noch keine Trades" },
        ].map((stat) => (
          <div key={stat.label} className="py-5 border-t border-black/10">
            <p className="text-xs text-black/40 uppercase tracking-widest mb-2">{stat.label}</p>
            <p className="text-xl font-semibold text-[#0a0a0a] mb-1">{stat.value}</p>
            <p className="text-xs text-black/40">{stat.sub}</p>
          </div>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-1">
        {[
          { label: "Knowledge Base", sub: "Wissen, Strategien, Notizen", href: "/knowledge" },
          { label: "Quant Research", sub: "Python Scripts, Backtests", href: "/knowledge/math-ml" },
          { label: "Investments", sub: "Thesen, Watchlists", href: "/knowledge/investments" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center justify-between py-4 px-5 rounded-lg hover:bg-black/[0.03] transition-colors group"
          >
            <div>
              <p className="font-medium text-[#0a0a0a] mb-0.5">{item.label}</p>
              <p className="text-sm text-black/40">{item.sub}</p>
            </div>
            <span className="text-black/20 group-hover:text-black/50 transition-colors text-lg">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
