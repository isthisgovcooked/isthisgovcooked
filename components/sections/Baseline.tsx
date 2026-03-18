"use client";
import Section from "@/components/ui/Section";
import type { NextSectionProp } from "@/components/ui/Section";
import { GdpChart } from "@/components/charts/Charts";
import {
  YEARS, GOV_BY_YEAR, totalRevenue, totalExpenses,
  underlyingCash, netDebt, gdpEstimate, equityInjections, CENTRE,
} from "@/lib/data";

export default function BaselineSection({ nextSection }: { nextSection?: NextSectionProp }) {
  const adjustedCash = YEARS.map((_, i) =>
    +((underlyingCash[i] - equityInjections[i]) / 1000).toFixed(1)
  );
  const reportedCash = YEARS.map((_, i) =>
    +(underlyingCash[i] / 1000).toFixed(1)
  );
  const debtPct = YEARS.map((_, i) =>
    +((netDebt[i] / gdpEstimate[i]) * 100).toFixed(1)
  );

  return (
    <Section
      id="baseline"
      tag="// Apples to Apples — 25 Years"
      title="THE REAL BASELINE."
      intro="To compare years fairly you need to strip out accounting tricks and measure everything as a % of GDP. A $50B deficit in 2017 is very different to one in 2024 — the economy grew. Here's the level playing field."
      dark
      accent="amber"
      nextSection={nextSection}
    >
      {/* Why % GDP matters */}
      <div className="border-l-4 border-amber-500 bg-amber-950/20 p-5 mb-8">
        <div className="font-mono text-xs text-amber-400 uppercase tracking-widest mb-2">Why % of GDP Matters</div>
        <p className="text-zinc-400 text-sm leading-relaxed">
          A 1% of GDP difference is about <strong className="text-white">$27 billion</strong> in 2024 terms.
          When governments grow from managing a $1.8T economy to a $2.7T economy,
          raw dollar comparisons are meaningless. The fair measure is always relative to the size of the economy.
        </p>
      </div>

      {/* GDP chart */}
      <div className="bg-zinc-950 border border-zinc-800 p-5 mb-4">
        <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1">
          Revenue, Expenses & Cash Balance as % of GDP — with Fair Centre targets (dashed)
        </div>
        <div className="flex flex-wrap gap-4 mb-4 font-mono text-xs text-zinc-600">
          <span><span className="text-emerald-500">■</span> Revenue %</span>
          <span><span className="text-red-500">■</span> Expenses %</span>
          <span><span className="text-amber-400">■</span> Cash Balance %</span>
          <span><span className="text-zinc-500">- -</span> Fair Centre targets</span>
        </div>
        <GdpChart />
      </div>

      {/* Adjusted cash vs reported */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-800 mb-8">
        <div className="bg-zinc-950 p-5">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">
            Reported Cash Balance vs Adjusted for Equity Injections ($Billions)
          </div>
          <div className="space-y-3">
            {YEARS.map((y, i) => {
              const rep = reportedCash[i];
              const adj = adjustedCash[i];
              const gov = GOV_BY_YEAR[y];
              return (
                <div key={y} className="flex items-center gap-3">
                  <div className="font-mono text-xs text-zinc-500 w-16 shrink-0">{y}</div>
                  <div className={`font-mono text-[10px] w-14 shrink-0 ${gov==="Labor"?"text-red-400":"text-blue-400"}`}>
                    {gov === "Transition" ? "Trans." : gov}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-3 bg-zinc-900 relative overflow-hidden">
                        <div
                          className={`absolute top-0 bottom-0 right-0 ${rep < 0 ? "bg-amber-600" : "bg-emerald-600"}`}
                          style={{ width: `${Math.min(Math.abs(rep) / 1.2, 100)}%` }}
                        />
                      </div>
                      <span className={`font-mono text-xs ${rep < 0 ? "text-amber-400" : "text-emerald-400"}`}>
                        {rep >= 0 ? "+" : ""}{rep}B reported
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-3 bg-zinc-900 relative overflow-hidden">
                        <div
                          className={`absolute top-0 bottom-0 right-0 ${adj < 0 ? "bg-red-700" : "bg-emerald-800"}`}
                          style={{ width: `${Math.min(Math.abs(adj) / 1.2, 100)}%` }}
                        />
                      </div>
                      <span className={`font-mono text-xs ${adj < 0 ? "text-red-400" : "text-emerald-400"}`}>
                        {adj >= 0 ? "+" : ""}{adj}B incl. equity
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 font-mono text-xs text-zinc-600">
            "Incl. equity" = reported cash balance minus equity injections to govt enterprises.
            This is the closest measure to total cash leaving the government.
          </div>
        </div>

        {/* Net debt as % GDP */}
        <div className="bg-zinc-950 p-5">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">
            Net Debt as % of GDP — vs Fair Centre Target (&lt;20%)
          </div>
          <div className="space-y-3">
            {YEARS.map((y, i) => {
              const pct = debtPct[i];
              const barW = Math.min((pct / 35) * 100, 100);
              const col = pct > 25 ? "bg-red-600" : pct > 20 ? "bg-amber-500" : "bg-emerald-600";
              return (
                <div key={y} className="flex items-center gap-3">
                  <div className="font-mono text-xs text-zinc-500 w-16 shrink-0">{y}</div>
                  <div className="flex-1 h-5 bg-zinc-900 relative">
                    <div className={`absolute top-1 bottom-1 left-0 ${col}`} style={{ width: `${barW}%` }} />
                    {/* Centre line at 20% */}
                    <div className="absolute top-0 bottom-0 bg-amber-500/40" style={{ left: `${(20/35)*100}%`, width: "1px" }} />
                  </div>
                  <div className={`font-mono text-xs w-14 text-right ${pct > 25 ? "text-red-400" : pct > 20 ? "text-amber-400" : "text-emerald-400"}`}>
                    {pct}%
                  </div>
                </div>
              );
            })}
            <div className="flex items-center gap-3 mt-2 font-mono text-xs text-zinc-600">
              <div className="w-16" />
              <div className="flex-1 text-center">
                <span className="text-amber-500/60">│ </span>Fair Centre target: 20%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Baseline finding */}
      <div className="border-l-4 border-amber-600 bg-amber-950/20 p-5">
        <div className="font-mono text-xs text-amber-400 uppercase tracking-widest mb-2">📊 Baseline Finding</div>
        <p className="text-zinc-300 text-sm leading-relaxed">
          When you remove equity injections and measure against GDP,{" "}
          <strong>Across the full 25-year period, genuine structural cash surpluses were only achieved in the Howard years (1997-98 to 2007-08, excluding 2001-02). Every government since the GFC has run structural deficits.</strong>{" "}
          The 2022-23 and 2023-24 accrual "surpluses" were real improvements, but on a cash basis after
          equity injections, both years were still in deficit. Net debt as % of GDP has exceeded the
          Fair Centre target of 20% since 2019-20, peaking at 26.4% in 2021-22. The structural position
          worsened significantly 2019–2022 and has been recovering since — but has not returned to
          the pre-COVID baseline.
        </p>
      </div>
    </Section>
  );
}
