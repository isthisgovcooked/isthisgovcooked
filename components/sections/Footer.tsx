import Subscribe from "@/components/ui/Subscribe";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 py-12 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="font-mono text-xs text-red-500 uppercase tracking-widest mb-3">
              // ISTHISGOVCOOKED.COM.AU
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed">
              A public accountability project. Politically independent.
              Not affiliated with any party, government body, or media organisation.
            </p>
            <div className="mt-6">
              <Subscribe />
            </div>
          </div>
          <div>
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">
              Data Sources
            </div>
            <ul className="space-y-2">
              {[
                ["Commonwealth CFS 1999–2024 (25 years)", "https://finance.gov.au/publications/commonwealth-consolidated-financial-statements"],
                ["ANAO Audit Reports", "https://anao.gov.au/work/financial-statement-audit"],
                ["Budget Papers 2024-25 & 2025-26", "https://budget.gov.au"],
                ["Historical CFS Dataset (data.gov.au)", "https://data.gov.au/data/dataset/australian-government-consolidated-financial-statements-tables-and-data"],
              ].map(([label, url]) => (
                <li key={label}>
                  <a href={url} target="_blank" rel="noopener noreferrer"
                    className="font-mono text-xs text-zinc-600 hover:text-zinc-300 transition-colors">
                    → {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">
              Open Source
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed mb-3">
              View the code, verify the data, check the AI prompt.
              Everything is transparent. Find an error? Raise a GitHub issue.
            </p>
            <a href="https://github.com/isthisgovcooked/isthisgovcooked"
              target="_blank" rel="noopener noreferrer"
              className="font-mono text-xs text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-600 px-3 py-2 inline-block transition-colors">
              → View on GitHub
            </a>
          </div>
        </div>
        <div className="border-t border-zinc-900 pt-6 space-y-1">
          <p className="font-mono text-xs text-zinc-700">
            All figures from Commonwealth Consolidated Financial Statements 1999-2000 to 2023-24, Final Budget Outcomes, Budget Papers 2024-25 and 2025-26, and ABS historical data. 25 years of verified data. Open source — verify everything.
          </p>
          <p className="font-mono text-xs text-zinc-700">
            Data: Department of Finance (finance.gov.au) and ANAO (anao.gov.au). Open source — verify everything.
          </p>
        </div>
      </div>
    </footer>
  );
}
