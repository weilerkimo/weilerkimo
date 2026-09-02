export default function KnowledgePage() {
  return (
    <div className="min-h-screen bg-[#F2F0EB] p-8">
      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-16">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-black/40 font-[family-name:var(--font-mono)] mb-1">
              Private
            </p>
            <h1 className="text-2xl font-bold tracking-tight">Knowledge Base</h1>
          </div>
          <a
            href="/"
            className="text-[10px] tracking-[0.2em] uppercase text-black/40 font-[family-name:var(--font-mono)] hover:text-black transition-colors"
          >
            ← Home
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: "Business", count: 0, href: "/knowledge/business" },
            { label: "Finance", count: 0, href: "/knowledge/finance" },
            { label: "Investments", count: 0, href: "/knowledge/investments" },
            { label: "Math / ML", count: 0, href: "/knowledge/math-ml" },
            { label: "Grafik", count: 0, href: "/knowledge/grafik" },
            { label: "Python", count: 0, href: "/knowledge/python" },
          ].map((cat) => (
            <a
              key={cat.label}
              href={cat.href}
              className="flex items-center justify-between p-5 border border-black/10 rounded-lg hover:border-black/30 hover:bg-black/[0.02] transition-all"
            >
              <span className="text-sm font-medium">{cat.label}</span>
              <span className="text-[10px] tracking-[0.15em] uppercase text-black/30 font-[family-name:var(--font-mono)]">
                {cat.count} Nodes
              </span>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
}
