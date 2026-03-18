"use client";
import { useState } from "react";
import Section from "@/components/ui/Section";
import type { NextSectionProp } from "@/components/ui/Section";
import Explainer from "@/components/ui/Explainer";
import { GdpChart, LeanChart } from "@/components/charts/Charts";
import { YEARS, GOV_BY_YEAR, PM_BY_YEAR, politicalLean, CENTRE } from "@/lib/data";

const LEAN_DATA: Record<string, { score: number; label: string; fiscalDiscipline: number; taxFair: number; spendFair: number; intergen: number; col: number; centristDiff: string }> = {
  "1999-00": { score: 1.2, label: "Near centre", fiscalDiscipline: 9, taxFair: 6, spendFair: 6, intergen: 9, col: 7, centristDiff: "Near perfect fiscal position. Some middle-class welfare beginning. Best year in dataset for fiscal responsibility." },
  "2000-01": { score: 1.8, label: "Mildly right-leaning", fiscalDiscipline: 8, taxFair: 5, spendFair: 6, intergen: 8, col: 5, centristDiff: "GST introduced — revenue structure changed. CPI 6% spike (one-off). Surpluses maintained." },
  "2001-02": { score: 2.2, label: "Mildly right-leaning", fiscalDiscipline: 5, taxFair: 5, spendFair: 6, intergen: 6, col: 7, centristDiff: "9/11 caused small deficit — first in Howard era. External shock not policy failure." },
  "2002-03": { score: 1.5, label: "Near centre", fiscalDiscipline: 8, taxFair: 5, spendFair: 6, intergen: 7, col: 7, centristDiff: "Returning to surplus. Near centrist on most measures." },
  "2003-04": { score: 1.5, label: "Near centre", fiscalDiscipline: 8, taxFair: 5, spendFair: 6, intergen: 7, col: 7, centristDiff: "Consistent surplus. Middle-class welfare (FTB, private health rebate) building." },
  "2004-05": { score: 2.0, label: "Mildly right-leaning", fiscalDiscipline: 8, taxFair: 4, spendFair: 6, intergen: 8, col: 7, centristDiff: "Tax cuts skewed to higher earners. Surplus strong." },
  "2005-06": { score: 1.8, label: "Mildly right-leaning", fiscalDiscipline: 9, taxFair: 4, spendFair: 6, intergen: 9, col: 7, centristDiff: "Approaching structural balance. Revenue 25.4% GDP — right on centre." },
  "2006-07": { score: 1.5, label: "Near centre", fiscalDiscipline: 10, taxFair: 5, spendFair: 6, intergen: 10, col: 7, centristDiff: "Best year in dataset. Net debt eliminated. Near-perfect intergenerational score." },
  "2007-08": { score: 1.2, label: "Near centre", fiscalDiscipline: 9, taxFair: 5, spendFair: 6, intergen: 9, col: 6, centristDiff: "Howard's final year then Rudd. Strong surplus pre-GFC. Transition year." },
  "2008-09": { score: -1.5, label: "Mildly left", fiscalDiscipline: 5, taxFair: 6, spendFair: 7, intergen: 5, col: 7, centristDiff: "GFC transition. Stimulus appropriate but shifted position left." },
  "2009-10": { score: -3.5, label: "Left — GFC crisis", fiscalDiscipline: 2, taxFair: 6, spendFair: 7, intergen: 2, col: 6, centristDiff: "GFC stimulus peak. Necessary but $54B deficit. Similar to COVID 2020-21 context — crisis not ideology." },
  "2010-11": { score: -2.8, label: "Left-leaning", fiscalDiscipline: 3, taxFair: 6, spendFair: 7, intergen: 3, col: 6, centristDiff: "Post-GFC recovery spending. Carbon price beginning. Structural deficit locked in from stimulus." },
  "2011-12": { score: -2.2, label: "Mildly left-leaning", fiscalDiscipline: 4, taxFair: 6, spendFair: 7, intergen: 4, col: 6, centristDiff: "Carbon price live. NDIS planned. Revenue writedowns beginning from falling commodity prices." },
  "2012-13": { score: -2.5, label: "Left-leaning", fiscalDiscipline: 4, taxFair: 6, spendFair: 7, intergen: 4, col: 7, centristDiff: "Revenue writedown crisis. Surplus promises abandoned. Structural deficit clearly established." },
  "2013-14": { score: 2.5, label: "Mildly right-leaning", fiscalDiscipline: 3, taxFair: 4, spendFair: 4, intergen: 3, col: 6, centristDiff: "Abbott 'budget emergency' — austerity rhetoric not matched by outcomes (Senate blocked). Carbon repeal begun." },
  "2014-15": { score: 3.0, label: "Right-leaning", fiscalDiscipline: 3, taxFair: 4, spendFair: 4, intergen: 4, col: 7, centristDiff: "2014 budget austerity — blocked by Senate. Carbon price repealed. Most right-leaning budget in dataset outside of Howard's structural surplus years." },
  "2015-16": { score: 2.2, label: "Mildly right-leaning", fiscalDiscipline: 4, taxFair: 5, spendFair: 5, intergen: 5, col: 7, centristDiff: "Abbott → Turnbull transition. Budget trajectory slowly improving." },
  "2016-17": { score: 3.2, label: "Right-leaning", fiscalDiscipline: 5, taxFair: 4, spendFair: 5, intergen: 5, col: 8, centristDiff: "A centrist govt would have raised ~$18B more revenue, closing tax loopholes rather than cutting rates. Cash deficit $9.6B smaller." },
  "2017-18": { score: 2.8, label: "Mildly right-leaning", fiscalDiscipline: 6, taxFair: 5, spendFair: 5, intergen: 6, col: 8, centristDiff: "Near-centre. Centrist approach: $9.8B more revenue, $3.2B less spending. Cash deficit $6.6B smaller. Cumulative debt $12B lower." },
  "2018-19": { score: 0.8, label: "Near centre ✓", fiscalDiscipline: 8, taxFair: 6, spendFair: 6, intergen: 8, col: 8, centristDiff: "Closest year to centre. Minor adjustments. If this trajectory continued without COVID, Australia would have hit genuine surplus by 2020." },
  "2019-20": { score: 1.5, label: "Mixed — COVID arrived", fiscalDiscipline: 4, taxFair: 5, spendFair: 6, intergen: 4, col: 7, centristDiff: "Pre-COVID was near-identical to centrist. COVID blew the trajectory. Not a policy failure — an external shock." },
  "2020-21": { score: -3.8, label: "Left — COVID crisis", fiscalDiscipline: 2, taxFair: 6, spendFair: 7, intergen: 2, col: 6, centristDiff: "Crisis response. Centrist govt same response but: tighter means testing, faster wind-down. Modelled saving: $50B smaller deficit, $55B less new debt." },
  "2021-22": { score: -1.8, label: "Mildly left-leaning", fiscalDiscipline: 4, taxFair: 5, spendFair: 6, intergen: 3, col: 3, centristDiff: "Post-COVID wind-down slower than centrist approach. $14B less spending would have left $11.8B less cash deficit." },
  "2022-23": { score: -2.5, label: "Left-leaning", fiscalDiscipline: 5, taxFair: 6, spendFair: 6, intergen: 5, col: 2, centristDiff: "Revenue $18.5B above centre — windfall. Centrist: use it to pay down debt not expand spending. Cash deficit could have been $10.3B surplus." },
  "2023-24": { score: -1.5, label: "Mildly left-leaning", fiscalDiscipline: 6, taxFair: 6, spendFair: 6, intergen: 6, col: 5, centristDiff: "Above-centre revenue and spending. Centrist: convert cash deficit to $7.1B surplus. The full 25-year centrist path would have left cumulative debt $200B+ lower, with the Howard surpluses invested and post-GFC recovery faster." },
};

export default function FairCentreSection({ nextSection }: { nextSection?: NextSectionProp }) {
  const [selected, setSelected] = useState("2023-24");
  const lean = LEAN_DATA[selected];
  const plData = politicalLean[selected];
  const hasLeanData = lean != null && plData != null;
  const leanColor = hasLeanData ? (lean.score < -2 ? "text-red-400" : lean.score > 2 ? "text-blue-400" : "text-emerald-400") : "text-zinc-500";

  return (
    <Section
      id="faircentre"
      tag="// The Fair Centre Engine — 1999-2024"
      title="WHAT WOULD A FAIR BUDGET LOOK LIKE?"
      intro="Every government leans left or right. This is the political bias detector — built from four independent data sources, no ideology."
      accent="amber"
      nextSection={nextSection}
    >
      {/* Baseline */}
      <div className="border-l-4 border-amber-500 bg-amber-950/20 p-5 mb-8">
        <div className="font-mono text-xs text-amber-400 uppercase tracking-widest mb-2">How The Centre Is Calculated</div>
        <p className="text-zinc-400 text-sm mb-3">
          Four independent sources: (1) Australia's long-run revenue/expense averages as % of GDP, (2) OECD peer averages (Canada, NZ, UK, Germany), (3) Parliamentary Budget Office structural estimates, (4) midpoint between what each party actually delivered. Where all four converge — that's the centre.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-zinc-700">
          {[
            ["Revenue Target", `${CENTRE.revPct}% GDP`],
            ["Expenses Target", `${CENTRE.expPct}% GDP`],
            ["Cash Balance", `${CENTRE.cashPct}% GDP`],
            ["Net Debt", `<${CENTRE.debtPct}% GDP`],
            ["Welfare Spend", "35% expenses"],
            ["Defence Spend", "1.9% GDP"],
          ].map(([l,v]) => (
            <div key={l} className="bg-zinc-950 p-3">
              <div className="font-mono text-[9px] text-zinc-500 uppercase mb-1">{l}</div>
              <div className="font-mono text-sm text-amber-400">{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Lean meters — only years with Fair Centre data (2016-17 onwards) */}
      <div className="mb-8">
        <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">Political Lean — Left (−10) to Right (+10) vs Centre (0) — 1999-2024</div>
        <div className="space-y-2">
          {YEARS.map((y) => {
            const l = LEAN_DATA[y];
            const g = GOV_BY_YEAR[y];
            if (!l) {
              return (
                <button
                  key={y}
                  onClick={() => setSelected(y)}
                  className={`w-full flex items-center gap-3 p-2 transition-colors text-left ${y === selected ? "bg-zinc-800" : "hover:bg-zinc-900"}`}
                >
                  <div className="font-mono text-xs text-zinc-500 w-16 text-right shrink-0">{y}</div>
                  <div className={`font-mono text-[10px] uppercase w-16 shrink-0 ${g==="Labor"?"text-red-400":g==="Coalition"?"text-blue-400":"text-amber-400"}`}>
                    {g}
                  </div>
                  <div className="flex-1 h-5 bg-zinc-900 relative border border-zinc-800" />
                  <div className="font-mono text-[10px] text-zinc-600 w-24 shrink-0">No lean data</div>
                </button>
              );
            }
            const barLeft = l.score < 0;
            const barW = Math.abs(l.score) / 10 * 50;
            const col = l.score < -2 ? "bg-red-600" : l.score > 2 ? "bg-blue-600" : "bg-emerald-600";
            return (
              <button
                key={y}
                onClick={() => setSelected(y)}
                className={`w-full flex items-center gap-3 p-2 transition-colors text-left ${y === selected ? "bg-zinc-800" : "hover:bg-zinc-900"}`}
              >
                <div className="font-mono text-xs text-zinc-500 w-16 text-right shrink-0">{y}</div>
                <div className={`font-mono text-[10px] uppercase w-16 shrink-0 ${g==="Labor"?"text-red-400":g==="Coalition"?"text-blue-400":"text-amber-400"}`}>
                  {g}
                </div>
                <div className="flex-1 h-5 bg-zinc-900 relative border border-zinc-800">
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-amber-500/50" />
                  <div
                    className={`absolute top-1 bottom-1 ${col} opacity-80`}
                    style={{ [barLeft?"right":"left"]:"50%", width:`${barW}%` }}
                  />
                </div>
                <div className={`font-mono text-xs w-24 shrink-0 ${l.score<-2?"text-red-400":l.score>2?"text-blue-400":"text-emerald-400"}`}>
                  {l.score>0?"+":""}{l.score} {l.label.split(" ")[0]}
                </div>
              </button>
            );
          })}
          <div className="flex items-center gap-3 pt-1">
            <div className="w-32" />
            <div className="flex-1 flex justify-between font-mono text-[9px] text-zinc-600">
              <span>◄ MORE LEFT</span><span className="text-amber-500/60">■ CENTRE</span><span>MORE RIGHT ►</span>
            </div>
          </div>
        </div>
      </div>

      {/* Selected year detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-800 mb-8">
        <div className="bg-zinc-950 p-6">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">{selected} — {GOV_BY_YEAR[selected]} — {PM_BY_YEAR[selected]}</div>
          {hasLeanData ? (
            <>
              <div className={`font-display text-4xl mb-2 ${leanColor}`}>{lean!.label}</div>
              <div className="font-display text-xl text-zinc-400 mb-4">Lean Score: {lean!.score>0?"+":""}{lean!.score} / 10</div>
              {plData && <Explainer explanations={plData.explanations} />}
            </>
          ) : (
            <p className="text-zinc-500 text-sm">Full multi-level explanations (Plain English / Straight Talk / Deep Dive) are available from 2016-17. Lean scores and centrist comparison are shown for all 25 years in the chart above.</p>
          )}
        </div>
        <div className="bg-zinc-950 p-6">
          {hasLeanData ? (
            <>
              <div className="font-mono text-xs text-amber-400 uppercase tracking-widest mb-3">If A Centrist Government Ran This Year</div>
              <div className="border-l-4 border-amber-700 bg-amber-950/20 p-4 mb-4">
                <p className="text-zinc-300 text-sm">{lean!.centristDiff}</p>
              </div>
              <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">Fairness Dimensions (10 = most centrist/fair)</div>
              <div className="grid grid-cols-5 gap-1">
                {[
                  ["Fiscal", lean!.fiscalDiscipline],
                  ["Tax Fair", lean!.taxFair],
                  ["Spend Fair", lean!.spendFair],
                  ["Future Gen", lean!.intergen],
                  ["Cost of Life", lean!.col],
                ].map(([l,v]) => (
                  <div key={l as string} className="bg-black p-2 text-center">
                    <div className="font-mono text-[9px] text-zinc-500 mb-1 leading-tight">{l}</div>
                    <div className={`font-display text-xl ${(v as number)>=7?"text-emerald-400":(v as number)>=5?"text-amber-400":"text-red-400"}`}>{v}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-zinc-500 text-sm">Select a year to see centrist comparison. Years from 2016-17 onward include full multi-level explanations.</p>
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-800 mb-4">
        <div className="bg-zinc-950 p-5">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">Revenue & Expenses vs Fair Centre Target (% GDP)</div>
          <GdpChart />
        </div>
        <div className="bg-zinc-950 p-5">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">Political Lean Score By Year (Negative = Left, Positive = Right)</div>
          <LeanChart />
        </div>
      </div>

      {/* Finding */}
      <div className="border-l-4 border-emerald-700 bg-emerald-950/20 p-5">
        <div className="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-2">✅ The Fair Centre Finding</div>
        <p className="text-zinc-300 text-sm leading-relaxed">
          <strong>Neither party has consistently governed from the centre.</strong> Coalition years (2016–2022) ran
          structurally below-centre revenue — tax cuts produced structural deficits even pre-COVID.
          Labor years (2022–2024) ran above-centre revenue from commodity/inflation windfalls, with above-centre
          spending — producing accrual surpluses but still cash deficits.
          {" "}<strong>The most centrist year: 2018-19</strong> — the year nobody talks about.
          The centrist gap has widened over time. In the Howard years, Australia was near or above-centre fiscally. Since 2013, both parties have governed left-of-centre on spending relative to the OECD structural benchmark.
        </p>
      </div>
    </Section>
  );
}
