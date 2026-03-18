"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import type { NextSectionProp } from "@/components/ui/Section";
import { YEARS, GOV_BY_YEAR, PM_BY_YEAR, fiscalScores, underlyingCash, netDebt, gdpEstimate, cpiInflation } from "@/lib/data";
import { ALL_PMS, PM_SCORES, FACTOR_LABELS } from "@/lib/pm-data";

const gradeColors: Record<string,string> = {
  A:"text-emerald-400", B:"text-emerald-400", C:"text-amber-400",
  D:"text-orange-500",  F:"text-red-500",
};

const govTag = {
  Coalition:  <span className="text-blue-400 font-mono text-xs uppercase tracking-wider">Coalition</span>,
  Labor:      <span className="text-red-400 font-mono text-xs uppercase tracking-wider">Labor</span>,
  Transition: <span className="text-amber-400 font-mono text-xs uppercase tracking-wider">Transition</span>,
};

const keyIssues: Record<string,string> = {
  "2016-17": "Structural deficit, super trick softened it",
  "2017-18": "Narrowing fast — super loss hit net worth",
  "2018-19": "Best structural position — near balance",
  "2019-20": "COVID arrived — trajectory broke",
  "2020-21": "Worst year — COVID stimulus peak",
  "2021-22": "$95B super accounting gain — misleading",
  "2022-23": "Revenue boom, 9 audit findings, inflation peak",
  "2023-24": "Improving — but cash still deficit, debt costs rising",
};

const medals = ["🥇","🥈","🥉","","","","",""];

// PM rankings by Cooked Metre overall score (ascending = best first)
const PM_RANKINGS = ALL_PMS.map((p) => {
  const data = PM_SCORES[p.id];
  if (!data) return null;
  const entries = Object.entries(data.factors).filter(([_, v]) => typeof v.score === "number");
  const best = entries.length ? entries.reduce((a, b) => (a[1].score <= b[1].score ? a : b)) : ["—", { score: 0 }];
  const worst = entries.length ? entries.reduce((a, b) => (a[1].score >= b[1].score ? a : b)) : ["—", { score: 0 }];
  return {
    id: p.id,
    name: p.name,
    party: p.party,
    term: p.term,
    finalScore: data.finalScore,
    grade: data.overallGrade,
    bestFactor: best[0],
    bestScore: (best[1] as { score: number }).score,
    worstFactor: worst[0],
    worstScore: (worst[1] as { score: number }).score,
  };
}).filter(Boolean) as Array<{
  id: string; name: string; party: string; term: string;
  finalScore: number; grade: string; bestFactor: string; bestScore: number; worstFactor: string; worstScore: number;
}>;

PM_RANKINGS.sort((a, b) => a.finalScore - b.finalScore);

export default function RankingsSection({ nextSection }: { nextSection?: NextSectionProp }) {
  const [viewMode, setViewMode] = useState<"year" | "pm">("year");
  const sorted = [...YEARS].sort((a,b) => fiscalScores[b].total - fiscalScores[a].total);

  return (
    <Section
      id="rankings"
      tag="// Government Rankings — 25 Years"
      title="WHO RAN IT BETTER?"
      intro="All 25 years ranked (1999-2024). Plus: all 7 Prime Ministers ranked overall. No political bias — just the data. The same methodology applied to everyone, equally. Note: context matters — 2020-21's F grade was COVID, not ideology."
      dark
      accent="red"
      nextSection={nextSection}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest">View by</span>
        <button
          type="button"
          onClick={() => setViewMode("year")}
          className={`font-mono text-xs px-3 py-1.5 rounded border transition-colors ${viewMode === "year" ? "bg-amber-900 border-amber-600 text-white" : "border-zinc-700 text-zinc-400 hover:border-zinc-600"}`}
        >
          Year
        </button>
        <button
          type="button"
          onClick={() => setViewMode("pm")}
          className={`font-mono text-xs px-3 py-1.5 rounded border transition-colors ${viewMode === "pm" ? "bg-amber-900 border-amber-600 text-white" : "border-zinc-700 text-zinc-400 hover:border-zinc-600"}`}
        >
          Prime Minister
        </button>
      </div>

      <div className="border-l-4 border-amber-600 bg-amber-950/20 p-4 mb-8">
        <div className="font-mono text-xs text-amber-400 uppercase tracking-widest mb-1">Grading Methodology</div>
        <p className="text-zinc-400 text-sm">
          {viewMode === "year" ? (
            <>Six criteria, 0–10 each: (1) Cash balance as % GDP, (2) Net debt trajectory, (3) Accrual vs cash gap,
            (4) Net worth management adjusted for actuarial swings, (5) Inflation and cost of living outcomes,
            (6) ANAO audit findings severity. Average → A–F grade.
            <strong className="text-white"> This grades fiscal management, not policy quality.</strong>
            <span className="block mt-2 text-zinc-500">Note: Years before 2008-09 use pre-AASB 1049 accounting. Comparable on cash measures but some balance sheet items differ. See methodology.</span></>
          ) : (
            <>Prime Ministers ranked by Cooked Metre overall score (0–100). Lower = better. Same 8 factors + deception multiplier as the Cooked Metre section. Best/worst factor show each PM&apos;s strongest and weakest area.</>
          )}
        </p>
      </div>

      <div className="overflow-x-auto">
        {viewMode === "year" ? (
          <table className="w-full font-mono text-xs">
            <thead>
              <tr className="border-b border-zinc-800">
                {["Rank","Year","Gov","Grade","Score /10","Cash % GDP","Debt % GDP","Inflation","Key Issue"].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-zinc-500 uppercase tracking-widest font-normal whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((year, rank) => {
                const i = YEARS.indexOf(year as any);
                const s = fiscalScores[year];
                const gov = GOV_BY_YEAR[year] as keyof typeof govTag;
                const cashPct = (underlyingCash[i]/gdpEstimate[i]*100).toFixed(1);
                const debtPct = (netDebt[i]/gdpEstimate[i]*100).toFixed(1);
                return (
                  <tr key={year} className="border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors">
                    <td className="py-4 px-3">
                      <span className="font-display text-2xl text-zinc-600">{rank+1}</span>
                      {medals[rank] && <span className="ml-1 text-base">{medals[rank]}</span>}
                    </td>
                    <td className="py-4 px-3 text-zinc-300 whitespace-nowrap">{year}</td>
                    <td className="py-4 px-3">{govTag[gov]}<br/><span className="text-zinc-600 text-[10px]">{PM_BY_YEAR[year]}</span></td>
                    <td className="py-4 px-3">
                      <span className={`font-display text-3xl ${gradeColors[s.grade]}`}>{s.grade}</span>
                    </td>
                    <td className="py-4 px-3">
                      <div>{s.total}/10</div>
                      <div className="w-16 h-1 bg-zinc-800 mt-1">
                        <div
                          className={`h-full ${s.total>=7?"bg-emerald-500":s.total>=5?"bg-amber-500":"bg-red-500"}`}
                          style={{ width:`${s.total*10}%` }}
                        />
                      </div>
                    </td>
                    <td className={`py-4 px-3 ${parseFloat(cashPct)<0?"text-red-400":"text-emerald-400"}`}>{cashPct}%</td>
                    <td className={`py-4 px-3 ${parseFloat(debtPct)>25?"text-red-400":"text-amber-400"}`}>{debtPct}%</td>
                    <td className={`py-4 px-3 ${cpiInflation[i]>4?"text-red-400":cpiInflation[i]>2.5?"text-amber-400":"text-emerald-400"}`}>
                      {cpiInflation[i]}%
                    </td>
                    <td className="py-4 px-3 text-zinc-500 max-w-xs">{keyIssues[year] ?? "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <table className="w-full font-mono text-xs">
            <thead>
              <tr className="border-b border-zinc-800">
                {["Rank","PM","Party","Term","Score","Grade","Best Factor","Worst Factor"].map(h => (
                  <th key={h} className="text-left py-3 px-3 text-zinc-500 uppercase tracking-widest font-normal whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PM_RANKINGS.map((row, rank) => (
                <tr key={row.id} className="border-b border-zinc-900 hover:bg-zinc-900/50 transition-colors">
                  <td className="py-4 px-3">
                    <span className="font-display text-2xl text-zinc-600">{rank + 1}</span>
                    {medals[rank] && <span className="ml-1 text-base">{medals[rank]}</span>}
                  </td>
                  <td className="py-4 px-3 text-zinc-300 whitespace-nowrap">{row.name}</td>
                  <td className="py-4 px-3">
                    {row.party === "Coalition (Liberal)" ? govTag.Coalition : row.party === "Labor" ? govTag.Labor : <span className="text-zinc-500">{row.party}</span>}
                  </td>
                  <td className="py-4 px-3 text-zinc-500 max-w-[140px] truncate" title={row.term}>{row.term}</td>
                  <td className="py-4 px-3">
                    <div className={row.finalScore >= 70 ? "text-red-400" : row.finalScore >= 50 ? "text-amber-400" : "text-emerald-400"}>
                      {Math.round(row.finalScore)}/100
                    </div>
                    <div className="w-16 h-1 bg-zinc-800 mt-1">
                      <div
                        className={`h-full ${row.finalScore < 40 ? "bg-emerald-500" : row.finalScore < 60 ? "bg-amber-500" : "bg-red-500"}`}
                        style={{ width: `${Math.min(100, row.finalScore)}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <span className={gradeColors[row.grade] ?? "text-zinc-400"}>{row.grade}</span>
                  </td>
                  <td className="py-4 px-3 text-zinc-500 text-[10px]">{FACTOR_LABELS[row.bestFactor] ?? row.bestFactor} ({row.bestScore})</td>
                  <td className="py-4 px-3 text-zinc-500 text-[10px]">{FACTOR_LABELS[row.worstFactor] ?? row.worstFactor} ({row.worstScore})</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Section>
  );
}
