"use client";
// Live budget analysis page — activated on budget day
// Normal state: "Next budget: TBD" with subscribe option
// Active state: Live analysis streaming in as agent processes

import Link from "next/link";

function CountdownToNextBudget() {
  // Next federal budget typically May (or March in election years)
  const nextBudget = new Date(new Date().getFullYear(), 4, 1); // May 1
  if (nextBudget < new Date()) nextBudget.setFullYear(nextBudget.getFullYear() + 1);
  const days = Math.ceil((nextBudget.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-4xl md:text-6xl text-white mb-4">
        Next Federal Budget
      </h1>
      <p className="font-mono text-2xl md:text-4xl text-amber-400 mb-2">
        {days > 0 ? `${days} days` : "TBD"}
      </p>
      <p className="text-zinc-400 text-sm max-w-md mb-8">
        We’ll run the numbers as soon as the budget drops — before the spin starts.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <a
          href="/#overview"
          className="font-mono text-sm px-4 py-2 border border-zinc-600 text-zinc-300 hover:border-amber-500 hover:text-amber-400 transition-colors"
        >
          View 25 years of data
        </a>
        <span className="font-mono text-zinc-600 text-sm self-center">Subscribe (coming soon)</span>
      </div>
    </div>
  );
}

function LiveBudgetAnalysis() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl md:text-4xl text-white mb-2">
        Budget Day — Live Analysis
      </h1>
      <p className="font-mono text-sm text-amber-400 mb-8">
        Verdict before the spin starts. Updated as the agent processes the papers.
      </p>
      <div className="border border-zinc-700 bg-zinc-950 p-6 rounded">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-zinc-800 rounded w-3/4" />
          <div className="h-4 bg-zinc-800 rounded w-full" />
          <div className="h-4 bg-zinc-800 rounded w-5/6" />
          <p className="font-mono text-xs text-zinc-500 pt-4">
            When BUDGET_LIVE is active, the agent runs and this section is replaced with the full breakdown (headline, key flag, kid/teen/expert explanations, book tricks, red flags).
          </p>
        </div>
      </div>
      <Link href="/#overview" className="inline-block font-mono text-sm text-amber-400 hover:text-amber-300 mt-6">
        ← Back to main site
      </Link>
    </div>
  );
}

export default function BudgetLivePage() {
  const isBudgetLive = process.env.NEXT_PUBLIC_BUDGET_LIVE === "true";

  return (
    <div className="bg-zinc-950 min-h-screen text-zinc-300">
      <header className="border-b border-zinc-800 py-4 px-6">
        <Link href="/" className="font-mono text-sm text-zinc-500 hover:text-white">
          ← isthisgovcooked.com.au
        </Link>
      </header>
      {isBudgetLive ? <LiveBudgetAnalysis /> : <CountdownToNextBudget />}
    </div>
  );
}
