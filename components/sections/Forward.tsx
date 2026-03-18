"use client";
import { useState } from "react";
import Section from "@/components/ui/Section";
import type { NextSectionProp } from "@/components/ui/Section";
import Explainer from "@/components/ui/Explainer";
import StatCard from "@/components/ui/StatCard";
import CountUp from "@/components/ui/CountUp";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { ForwardDebtChart, DebtInflChart } from "@/components/charts/Charts";
import DataCalendar from "@/components/ui/DataCalendar";
import { budgets } from "@/lib/data";

const typeIcons: Record<string, string> = { spending:"💸", tax:"✂️", saving:"💰", offbudget:"🕳️" };
const typeColors: Record<string, string> = { spending:"text-red-400", tax:"text-amber-400", saving:"text-emerald-400", offbudget:"text-red-300" };
const leanDot: Record<string, string> = { left:"🔴", centre:"🟡", right:"🔵" };

export default function ForwardSection({ nextSection }: { nextSection?: NextSectionProp }) {
  const [selected, setSelected] = useState("2025-26");
  const budget = budgets.find(b => b.year === selected)!;
  const leanColor = budget.leanScore < -2 ? "text-red-400" : budget.leanScore > 2 ? "text-blue-400" : "text-emerald-400";

  return (
    <Section
      id="forward"
      tag="// Forward Estimates 2025-2029 — What's Locked In"
      title="THIS IS WHAT'S COMING."
      intro="The 2024-25 and 2025-26 budgets have locked in the next four years. These are the government's own numbers — not speculation."
      dark
      accent="red"
      nextSection={nextSection}
    >
      {/* Big numbers */}
      <AnimateOnScroll delay={100}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-red-900/30 border border-red-900 mb-10">
          <StatCard value={<CountUp end={42.1} prefix="$" suffix="B" decimals={1} duration={1200} />} label="Deficit 2025-26" note="Up from $27.6B this year" color="red" shareText="2025-26 Budget deficit: $42.1B. Government's own forecast. Source: Budget Papers." />
          <StatCard value={<CountUp end={1.22} prefix="$" suffix="T" decimals={2} duration={1200} />} label="Gross debt by 2028-29" note="First $1 trillion ever" color="red" shareText="Gross debt by 2028-29: $1.22 trillion — first $1T ever. Source: Budget Papers forward estimates." />
          <StatCard value={<CountUp end={236} prefix="$" suffix="B" duration={1200} />} label="Cumulative deficit 4 years" note="Government's own forecast" color="red" shareText="Cumulative deficit over 4 years (gov forecast): $236B. Source: Budget Papers." />
          <StatCard value={<CountUp end={85} prefix="$" suffix="B" duration={1200} />} label="Off-budget spending 4 years" note="Doesn't show in deficit" color="red" shareText="Off-budget spending over 4 years: $85B — doesn't show in headline deficit. Source: Budget Papers 2025-26." />
          <StatCard value={<CountUp end={28.5} suffix="%" decimals={1} duration={1200} />} label="Spending as % GDP" note="Peak next year. Was 24.1% in 2018-19" color="amber" shareText="Spending as % GDP peaks at 28.5% (2025-26). Was 24.1% in 2018-19. Source: Budget Papers." />
          <StatCard value={<CountUp end={0.9} suffix="%" decimals={1} duration={1200} />} label="Interest payments peak % GDP" note="2027-28. Was 0.3% pre-COVID" color="amber" shareText="Interest payments peak at 0.9% GDP (2027-28). Was 0.3% pre-COVID. Source: Budget Papers." />
        </div>
      </AnimateOnScroll>

      {/* Budget selector */}
      <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">Select A Budget</div>
      <div className="flex gap-2 mb-8">
        {budgets.map(b => (
          <button
            key={b.year}
            onClick={() => setSelected(b.year)}
            className={`font-mono text-xs px-4 py-2 border transition-all
              ${selected === b.year
                ? "bg-red-900 border-red-600 text-white"
                : "border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300"
              }`}
          >
            {b.year} Budget
          </button>
        ))}
      </div>

      {/* Budget detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-800 mb-8" style={{ minHeight: "500px" }}>
        <div className="bg-zinc-950 p-6">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
            Delivered: {budget.delivered}
          </div>
          <div className="font-display text-3xl text-white mb-2">{budget.title}</div>
          <div className={`font-display text-xl mb-4 ${leanColor}`}>{budget.leanLabel}</div>
          <Explainer explanations={budget.explanations} className="mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-zinc-800">
            <StatCard value={`-$${(Math.abs(budget.deficit)/1000).toFixed(1)}B`} label="Cash Deficit" color="red" size="sm" />
            <StatCard value={`$${(budget.grossDebt/1000).toFixed(0)}B`} label="Gross Debt" color="red" size="sm" />
            <StatCard value={`$${(budget.netDebt/1000).toFixed(0)}B`} label="Net Debt" color="red" size="sm" note={`~${(budget.netDebt/budget.grossDebt*100).toFixed(0)}% of gross`} />
            <StatCard value={`$${(budget.offBudget/1000).toFixed(0)}B`} label="Off-Budget" note="Not in headline" color="amber" size="sm" />
            <StatCard value={`${budget.expGdpPct}%`} label="Spending % GDP" note="Centre: 25.2%" color={budget.expGdpPct > 26 ? "red" : "amber"} size="sm" />
            <StatCard value={`${budget.revGdpPct}%`} label="Revenue % GDP" note="Centre: 24.8%" color="amber" size="sm" />
          </div>
        </div>

        {/* Red flags */}
        <div className="bg-zinc-950 p-6">
          <div className="font-mono text-xs text-red-500 uppercase tracking-widest mb-4">⚠ Red Flags — Things They Didn't Shout About</div>
          <div className="space-y-3">
            {budget.redFlags.map((flag, i) => (
              <div key={i} className="flex gap-3">
                <div className="font-display text-2xl text-zinc-700 shrink-0">{String(i+1).padStart(2,"0")}</div>
                <p className="text-zinc-300 text-sm leading-relaxed">{flag}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key measures */}
      <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">Key Budget Measures — What They Actually Do</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800 mb-10">
        {budget.keyMeasures.map((m, i) => (
          <div key={i} className="bg-zinc-950 p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-start gap-2">
                <span className="text-lg shrink-0">{typeIcons[m.type]}</span>
                <div className={`font-mono text-xs font-bold ${typeColors[m.type]}`}>{m.name}</div>
              </div>
              <span className="text-lg shrink-0" title={`${m.lean}-of-centre`}>{leanDot[m.lean]}</span>
            </div>
            <div className="font-mono text-xs text-amber-400 mb-2">Cost: {m.cost}</div>
            <Explainer explanations={m.explanations} />
          </div>
        ))}
      </div>

      {/* Charts */}
      <AnimateOnScroll delay={100}>
        <div className="bg-zinc-950 border border-zinc-800 p-5 mb-4">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">
            Debt Trajectory — Historical + Forward Estimates to 2028-29 ($Billions Net Debt)
          </div>
        <div className="flex gap-4 mb-3 font-mono text-xs text-zinc-600">
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-600 inline-block" /> Historical</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 bg-amber-500 inline-block opacity-60" /> Forecast</span>
        </div>
        <ForwardDebtChart />
        </div>
      </AnimateOnScroll>

      <AnimateOnScroll delay={150}>
        <div className="bg-zinc-950 border border-zinc-800 p-5 mb-4">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">Net Debt vs CPI Inflation vs RBA Cash Rate — The Connection</div>
          <DebtInflChart />
        </div>
      </AnimateOnScroll>

      {/* Fair centre take */}
      <div className="border-l-4 border-amber-700 bg-amber-950/20 p-5">
        <div className="font-mono text-xs text-amber-400 uppercase tracking-widest mb-2">🎯 Fair Centre Assessment</div>
        <p className="text-zinc-300 text-sm leading-relaxed">
          A centrist government managing these forecasts would: <strong>(1)</strong> Accept the $42B 2025-26 deficit as largely locked in.{" "}
          <strong>(2)</strong> Commit to a credible path back to structural balance by 2029-30 — the current forecasts don't show this.{" "}
          <strong>(3)</strong> Cap off-budget equity injections at $15B/year not $21B/year.{" "}
          <strong>(4)</strong> Stage tax cuts conditional on returning to balance — not announce them while running deficits.{" "}
          <strong className="text-white">Net: forward estimates are left-of-centre on spending, right-of-centre on tax, and the combination produces a structural deficit neither side is being honest about.</strong>
        </p>
      </div>

      <DataCalendar />
    </Section>
  );
}
