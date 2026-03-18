"use client";
import { useState, useEffect } from "react";
import Section from "@/components/ui/Section";
import type { NextSectionProp } from "@/components/ui/Section";
import Explainer from "@/components/ui/Explainer";
import StatCard from "@/components/ui/StatCard";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { RevExpChart, CashVsOpChart, NetWorthChart } from "@/components/charts/Charts";
import {
  YEARS, GOV_BY_YEAR, PM_BY_YEAR, fiscalScores, yearDetails,
  totalRevenue, totalExpenses, netOpBalance, underlyingCash,
  netDebt, netWorthDeficit, gdpEstimate, cpiInflation, rbaCashRate,
  auditFindings, significantFindings, superActuarial, equityInjections,
} from "@/lib/data";

const gradeColors: Record<string,string> = {
  A:"text-emerald-400", B:"text-emerald-400", C:"text-amber-400",
  D:"text-orange-500",  F:"text-red-500",
};

const govColors: Record<string,string> = {
  Coalition:  "text-blue-400 border-blue-800",
  Labor:      "text-red-400 border-red-800",
  Transition: "text-amber-400 border-amber-800",
};

const ERA_FILTERS: { label: string; years: string[] | null }[] = [
  { label: "All Years", years: null },
  { label: "Howard (1999–2007)", years: ["1999-00", "2000-01", "2001-02", "2002-03", "2003-04", "2004-05", "2005-06", "2006-07"] },
  { label: "Rudd/Gillard (2007–2013)", years: ["2007-08", "2008-09", "2009-10", "2010-11", "2011-12", "2012-13"] },
  { label: "Abbott/Turnbull (2013–2018)", years: ["2013-14", "2014-15", "2015-16", "2016-17", "2017-18"] },
  { label: "Morrison/Albanese (2018–2024)", years: ["2018-19", "2019-20", "2020-21", "2021-22", "2022-23", "2023-24"] },
];

export default function OverviewSection({ nextSection }: { nextSection?: NextSectionProp }) {
  const [selected, setSelected] = useState<string>("2023-24");
  const [eraFilter, setEraFilter] = useState<string[] | null>(null);

  useEffect(() => {
    const handler = (e: Event) => setSelected((e as CustomEvent<string>).detail);
    window.addEventListener("selectYear", handler);
    return () => window.removeEventListener("selectYear", handler);
  }, []);
  const i = YEARS.indexOf(selected as any);
  const score = fiscalScores[selected];
  const detail = yearDetails[selected];
  const gov = GOV_BY_YEAR[selected];
  const bn = (v: number) => `${v >= 0 ? "+" : "-"}$${(Math.abs(v)/1000).toFixed(1)}B`;
  const pct = (v: number, b: number) => `${(v/b*100).toFixed(1)}%`;

  const historicalContext = [
    { period: "Howard/Costello (1996–2007)", result: "11 consecutive surpluses", context: "Benefited from commodity boom, asset sales (Telstra), and strong global growth. Net debt eliminated by 2006. However: bracket creep not returned, GST introduced.", borderClass: "border-emerald-700" },
    { period: "Rudd/Gillard (2007–2013)", result: "GFC deficits then partial recovery", context: "GFC stimulus (2008-09) widely credited with avoiding recession. Peak deficit -4.2% GDP (2009-10). Recovery slower than forecast. Structural deficit emerged from middle years.", borderClass: "border-amber-700" },
    { period: "Abbott/Turnbull early (2013–2016)", result: "Deficit persisted despite 'budget emergency' rhetoric", context: "Promised surplus in first year. Never delivered. Debt ceiling raised. 2014 budget widely seen as politically undeliverable — Senate blocked key measures. Deficit remained ~2% GDP.", borderClass: "border-amber-700" },
  ];

  return (
    <Section id="overview" tag="// 25 Years of Data — 1999-2024" title="PICK A YEAR. SEE THE TRUTH." dark nextSection={nextSection}>
      {/* Historical context — collapsible */}
      <details className="border border-zinc-800 mb-6 rounded overflow-hidden">
        <summary className="font-mono text-xs text-zinc-500 uppercase tracking-widest p-4 cursor-pointer hover:text-zinc-300 bg-zinc-900/30">
          📚 Historical context — How does this compare to the 20 years before?
        </summary>
        <div className="p-5 border-t border-zinc-800 bg-zinc-950">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {historicalContext.map((h) => (
              <div key={h.period} className={`border-l-2 pl-4 ${h.borderClass}`}>
                <div className="font-mono text-xs text-zinc-400 mb-1">{h.period}</div>
                <div className={`font-display text-lg mb-2 ${h.borderClass === "border-emerald-700" ? "text-emerald-400" : "text-amber-400"}`}>{h.result}</div>
                <p className="text-zinc-500 text-xs leading-relaxed">{h.context}</p>
              </div>
            ))}
          </div>
          <p className="text-zinc-600 text-xs">
            Source: ABS data.gov.au historical CFS series (1995-96 onwards).
            Full historical data available at:{" "}
            <a href="https://data.gov.au/data/dataset/australian-government-consolidated-financial-statements-tables-and-data" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-300 underline">data.gov.au ↗</a>
          </p>
        </div>
      </details>

      {/* Era filter */}
      <div className="flex flex-wrap gap-2 mb-3">
        {ERA_FILTERS.map((era) => (
          <button
            key={era.label}
            type="button"
            onClick={() => setEraFilter(era.years)}
            className={`font-mono text-[10px] px-3 py-1 border transition-all ${
              (era.years === null && eraFilter === null) || (era.years !== null && eraFilter !== null && JSON.stringify(era.years) === JSON.stringify(eraFilter))
                ? "bg-zinc-700 border-zinc-600 text-white"
                : "border-zinc-800 text-zinc-600 hover:text-zinc-300"
            }`}
          >
            {era.label}
          </button>
        ))}
      </div>
      {/* Year tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {(eraFilter ? YEARS.filter((y) => eraFilter.includes(y)) : YEARS).map((y) => {
          const g = GOV_BY_YEAR[y];
          const isActive = y === selected;
          return (
            <button
              key={y}
              onClick={() => setSelected(y)}
              className={`
                font-mono text-xs px-3 py-1.5 border transition-all duration-150
                ${isActive
                  ? g === "Coalition" ? "bg-blue-900 border-blue-600 text-white"
                    : g === "Labor"   ? "bg-red-900 border-red-600 text-white"
                    : "bg-amber-900 border-amber-600 text-white"
                  : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
                }
              `}
            >
              {y}
            </button>
          );
        })}
      </div>

      {/* Year detail */}
      {i >= 0 && score && (
        <div id="yearDetail" className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-800 mb-8" style={{ minHeight: "420px" }}>
          {/* Left: summary */}
          <div className="bg-zinc-950 p-6">
            <div className={`font-mono text-xs uppercase tracking-widest mb-3 ${govColors[gov].split(" ")[0]}`}>
              {selected} — {gov} — {PM_BY_YEAR[selected]}
            </div>
            <div className="font-display text-3xl text-white mb-2">
              {detail?.headline ?? "Year summary"}
            </div>
            {detail && (
              <div className="mb-4">
                <Explainer explanations={detail.explanations} />
              </div>
            )}
            {detail?.keyFlag && (
              <div className="border-l-4 border-amber-500 bg-amber-950/30 p-4">
                <div className="font-mono text-xs text-amber-400 uppercase tracking-widest mb-1">⚠ Key Flag</div>
                <p className="text-zinc-300 text-sm">{detail.keyFlag}</p>
              </div>
            )}
            {detail?.bookTricks && detail.bookTricks.length > 0 && (
              <div className="mt-4">
                <div className="font-mono text-xs text-red-500 uppercase tracking-widest mb-3">
                  ⚠ What they did to the books this year
                </div>
                <div className="space-y-3">
                  {detail.bookTricks.map((trick, idx) => (
                    <div key={idx} className="border border-zinc-800 bg-black p-4 rounded">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="font-mono text-xs text-red-400 font-bold uppercase tracking-wide">
                          {trick.name}
                        </div>
                        <div className="font-mono text-xs text-amber-400 shrink-0">
                          {trick.amount}
                        </div>
                      </div>
                      <Explainer explanations={trick.explanations} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: report card */}
          <div className="bg-zinc-950 p-6">
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">Fiscal Report Card</div>
            <div className="flex items-center gap-4 mb-5">
              <div className={`font-display text-7xl leading-none ${gradeColors[score.grade]}`}>
                {score.grade}
              </div>
              <div>
                <div className="font-mono text-xs text-zinc-500 uppercase">Composite Score</div>
                <div className="font-display text-3xl text-white">{score.total}/10</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {([
                ["Cash Discipline", score.cash],
                ["Debt Management", score.debtChange],
                ["Accrual Honesty", score.accrualGap],
                ["Net Worth", score.nwManage],
                ["Cost of Living", score.colOutcome],
                ["Audit Compliance", score.audit],
              ] as [string, number][]).map(([label, val]) => (
                <div key={label} className="bg-black p-2">
                  <div className="font-mono text-[9px] text-zinc-500 uppercase mb-1 leading-tight">{label}</div>
                  <div className="h-1 bg-zinc-800 mb-1">
                    <div
                      className={`h-full ${val>=7?"bg-emerald-500":val>=5?"bg-amber-500":"bg-red-500"}`}
                      style={{ width: `${val*10}%` }}
                    />
                  </div>
                  <div className={`font-mono text-xs ${val>=7?"text-emerald-400":val>=5?"text-amber-400":"text-red-400"}`}>
                    {val}/10
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stat grid */}
      {i >= 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-zinc-800 mb-12">
          <StatCard value={`$${(totalRevenue[i]/1000).toFixed(0)}B`} label="Total Revenue" color="green" size="sm" note={pct(totalRevenue[i],gdpEstimate[i])+" of GDP"} />
          <StatCard value={`$${(totalExpenses[i]/1000).toFixed(0)}B`} label="Total Expenses" color="red" size="sm" note={pct(totalExpenses[i],gdpEstimate[i])+" of GDP"} />
          <StatCard value={bn(netOpBalance[i])} label="Accrual Balance" color={netOpBalance[i]>=0?"green":"red"} size="sm" />
          <StatCard value={bn(underlyingCash[i])} label="Cash Balance" color={underlyingCash[i]>=0?"green":"red"} size="sm" note={pct(underlyingCash[i],gdpEstimate[i])+" GDP"} />
          <StatCard value={`$${(netDebt[i]/1000).toFixed(0)}B`} label="Net Debt" color="red" size="sm" note={pct(netDebt[i],gdpEstimate[i])+" GDP"} />
          <StatCard value={`${cpiInflation[i]}%`} label="CPI Inflation" color={cpiInflation[i]>4?"red":cpiInflation[i]>2.5?"amber":"green"} size="sm" note={`RBA: ${rbaCashRate[i]}%`} />
          <StatCard value={`${auditFindings[i]}`} label="ANAO Findings" color={auditFindings[i]>100?"red":auditFindings[i]>60?"amber":"green"} size="sm" note={`${significantFindings[i]} significant`} />
          <StatCard value={superActuarial[i] != null ? `${superActuarial[i]!>=0?"+":""}$${(superActuarial[i]!/1000).toFixed(0)}B` : "N/A"} label="Super Actuarial" color="amber" size="sm" note={superActuarial[i] == null ? "Pre-2009 N/A" : "Non-cash book entry"} />
          <StatCard value={`$${(equityInjections[i]/1000).toFixed(1)}B`} label="Equity Injections" color="amber" size="sm" note="Off-P&L spending" />
          <StatCard value={`-$${(Math.abs(netWorthDeficit[i])/1000).toFixed(0)}B`} label="Net Worth Position" color="red" size="sm" />
          <StatCard value={`$${(Math.abs(netOpBalance[i]-underlyingCash[i])/1000).toFixed(1)}B`} label="Accrual vs Cash Gap" color="amber" size="sm" note="Between 2 bottom lines" />
          <StatCard value={`$${(rbaCashRate[i])}%`} label="RBA Cash Rate" color="white" size="sm" />
        </div>
      )}

      {/* Charts */}
      <AnimateOnScroll delay={100}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-800 mb-4">
          <div className="bg-zinc-950 p-5">
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">Revenue vs Expenses ($Billions)</div>
            <RevExpChart />
          </div>
          <div className="bg-zinc-950 p-5">
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">Accrual Balance vs Cash Balance ($Billions)</div>
            <CashVsOpChart />
          </div>
        </div>
      </AnimateOnScroll>
      <AnimateOnScroll delay={150}>
        <div className="bg-zinc-950 border border-zinc-800 p-5">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">Net Worth Deficit — How Deep in the Hole ($Billions — bigger = worse)</div>
          <NetWorthChart />
        </div>
      </AnimateOnScroll>
    </Section>
  );
}
