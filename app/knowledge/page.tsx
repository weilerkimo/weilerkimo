export default function KnowledgePage() {
  const categories = [
    { label: "Business", description: "Geschäftsmodelle, WK Capital, Strategie", href: "/knowledge/business" },
    { label: "Finance", description: "Märkte, Konzepte, Makro", href: "/knowledge/finance" },
    { label: "Investments", description: "Strategien, Watchlists, Thesen", href: "/knowledge/investments" },
    { label: "Math / ML", description: "Quant, Statistik, Neural Nets", href: "/knowledge/math-ml" },
    { label: "Grafik", description: "Lehre, Typografie, Design-Theorie", href: "/knowledge/grafik" },
    { label: "Python", description: "Code, Scripts, CS50P", href: "/knowledge/python" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-8 py-16">
      <div className="mb-12">
        <p className="text-xs text-black/40 uppercase tracking-widest mb-3">Knowledge Base</p>
        <h1 className="text-3xl font-semibold">Wissensnetzwerk</h1>
      </div>

      <div className="space-y-1">
        {categories.map((cat) => (
          <a
            key={cat.label}
            href={cat.href}
            className="flex items-center justify-between py-4 px-5 rounded-lg hover:bg-black/[0.03] transition-colors group"
          >
            <div>
              <p className="font-medium text-[#0a0a0a] mb-0.5">{cat.label}</p>
              <p className="text-sm text-black/40">{cat.description}</p>
            </div>
            <span className="text-black/20 group-hover:text-black/50 transition-colors text-lg">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
