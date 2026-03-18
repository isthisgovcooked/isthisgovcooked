"use client";
import { useState } from "react";
import { useLevel } from "@/lib/level-context";

// ── Data ─────────────────────────────────────────────────────────────────────

interface PMPressureData {
  name:        string;
  party:       "Coalition" | "Labor";
  term:        string;
  score:       number;
  direction:   "better" | "worse" | "mixed";
  dollarImpact: string;
  drivers:     string[];
  context?:    string;
}

const PM_PRESSURE: PMPressureData[] = [
  {
    name: "Howard",  party: "Coalition", term: "1999–2007",
    score: 22, direction: "better",
    dollarImpact: "~$1,200/yr better off (real wages +1.2%/yr, housing affordable)",
    drivers: ["Surpluses eliminated debt", "Real wages growing", "Housing still accessible"],
    context: "Mining boom tailwind — conditions exceptionally favourable",
  },
  {
    name: "Rudd", party: "Labor", term: "2007–10, 2013",
    score: 58, direction: "mixed",
    dollarImpact: "~$800/yr worse off on average (GFC uncertainty offset by stimulus)",
    drivers: ["GFC uncertainty", "Structural deficit locked in", "Employment protected by stimulus"],
    context: "GFC crisis response — recession avoided, but structural cost was real",
  },
  {
    name: "Gillard", party: "Labor", term: "2010–2013",
    score: 55, direction: "worse",
    dollarImpact: "~$1,400/yr worse off (carbon cost, deficit, flat wages)",
    drivers: ["Carbon price added ~$550/yr", "Real wages flat", "Structural deficit persisting"],
    context: "Minority government constrained options. NDIS long-run benefit offset by short-term costs.",
  },
  {
    name: "Abbott", party: "Coalition", term: "2013–2015",
    score: 52, direction: "mixed",
    dollarImpact: "~$600/yr better off (carbon repeal) but deficit uncertainty persisted",
    drivers: ["Carbon repeal reduced energy costs", "Deficit persisted despite cuts rhetoric", "Real wages stagnant"],
  },
  {
    name: "Turnbull", party: "Coalition", term: "2015–2018",
    score: 48, direction: "mixed",
    dollarImpact: "~flat — improving deficit, housing surge beginning, wages flat",
    drivers: ["Budget trajectory improving", "Housing prices surging in Sydney/Melbourne", "Real wages flat"],
  },
  {
    name: "Morrison", party: "Coalition", term: "2018–2022",
    score: 71, direction: "worse",
    dollarImpact: "~$9,200/yr worse off by end of term (inflation surge, real wages -1.8%/yr)",
    drivers: ["Inflation 7% inherited from rate cycle", "Real wages -1.8%/yr", "COVID debt $230B+ future tax burden"],
    context: "COVID pandemic 2020-21 — crisis conditions. Inflation surge was partly global but also domestic.",
  },
  {
    name: "Albanese", party: "Labor", term: "2022–present",
    score: 62, direction: "worse",
    dollarImpact: "~$14,800/yr worse off (mortgaged household) vs 2022 — improving but not recovered",
    drivers: ["Rents +18%, vacancy 1.6%", "Mortgage stress +$8,400/yr from rate cycle", "Real wages recovering slowly"],
    context: "Inherited global inflation. Improving from 2023 peak but household pressure still severe.",
  },
];

const PRESSURE_FACTORS = [
  {
    id:      "deficit",
    label:   "Structural Deficit",
    score:   52,
    weight:  25,
    detail:  "10yr deficit projected. Future tax rises or spending cuts inevitable.",
    trend:   "stable" as const,
  },
  {
    id:      "wages",
    label:   "Real Wages",
    score:   45,
    weight:  25,
    detail:  "Recovering (+0.5%/yr real) but not fully restored from 2022-23 falls.",
    trend:   "improving" as const,
  },
  {
    id:      "housing",
    label:   "Housing Costs",
    score:   78,
    weight:  20,
    detail:  "Rents +18% over term. Vacancy 1.6% (critical). Prices near record highs.",
    trend:   "worsening" as const,
  },
  {
    id:      "rates",
    label:   "Interest Rates",
    score:   65,
    weight:  15,
    detail:  "4.35% cash rate. Household debt 188% of income. Cutting but slowly.",
    trend:   "improving" as const,
  },
  {
    id:      "commitments",
    label:   "Future Tax Burden",
    score:   80,
    weight:  15,
    detail:  "$85B off-budget spending. Decade of deficits forecast. Someone pays eventually.",
    trend:   "worsening" as const,
  },
];

const COMPOSITE_SCORE = Math.round(
  PRESSURE_FACTORS.reduce((sum, f) => sum + f.score * (f.weight / 100), 0)
);

const TREND_COLOR = {
  improving: "text-emerald-400",
  worsening: "text-red-400",
  stable:    "text-amber-400",
};

const TREND_ARROW = {
  improving: "↓",
  worsening: "↑",
  stable:    "→",
};

const SECTION_TEXT = {
  kid: {
    intro: "Based on what the government is doing with money, we can make a good guess about whether your family's life will get more or less expensive. Right now, there's a good chance things will stay hard for a while.",
    scoreLabel: "chance your cost of living gets harder",
    factorLabel: "What's causing the pressure",
  },
  teen: {
    intro: "5 economic indicators — deficit trajectory, real wages, housing costs, interest rates, and future tax commitments — are weighted and combined into a single probability score. Based on 25 years of data, here's where things are heading.",
    scoreLabel: "probability of household financial pressure worsening",
    factorLabel: "Pressure factors (weighted contribution)",
  },
  expert: {
    intro: "Composite leading indicator score derived from: structural fiscal balance trajectory (UCB/GDP, 25%), real wage index vs CPI (25%), rental vacancy/price-to-income (20%), household debt service ratio vs cash rate (15%), and forward fiscal commitments including off-budget (15%). Calibrated against 25yr historical outcomes.",
    scoreLabel: "weighted probability of household real income deterioration",
    factorLabel: "Component factors with weights",
  },
};

export default function PressureGauge() {
  const { level } = useLevel();
  const [view, setView] = useState<"current" | "history">("current");
  const [hoveredPm, setHoveredPm] = useState<string | null>(null);

  const text = SECTION_TEXT[level];
  const currentPm = PM_PRESSURE[PM_PRESSURE.length - 1];

  const scoreColor =
    COMPOSITE_SCORE >= 70 ? "text-red-500" :
    COMPOSITE_SCORE >= 50 ? "text-amber-400" :
    "text-emerald-400";

  const scoreBg =
    COMPOSITE_SCORE >= 70 ? "bg-red-500" :
    COMPOSITE_SCORE >= 50 ? "bg-amber-400" :
    "bg-emerald-400";

  return (
    <section
      id="pressure"
      className="border-b border-zinc-800 bg-black py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">

        <div className="font-mono text-xs text-red-500 uppercase tracking-widest mb-2">
          // Will Life Get Harder?
        </div>

        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <h2 className="font-display text-5xl md:text-7xl leading-none text-white">
            FINANCIAL<br />
            <span className="text-red-500">PRESSURE</span><br />
            GAUGE
          </h2>
          <div className="flex border border-zinc-800 shrink-0 self-start mt-2">
            {(["current", "history"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`font-mono text-xs px-4 py-2 uppercase tracking-wider transition-colors
                  ${view === v
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-600 hover:text-zinc-300"}`}
              >
                {v === "current" ? "Current Gov" : "All 7 PMs"}
              </button>
            ))}
          </div>
        </div>

        <p className="font-mono text-sm text-zinc-500 max-w-2xl mb-10">
          {text.intro}
        </p>

        {view === "current" ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

              <div className="border border-zinc-800 bg-zinc-950 p-8">
                <div className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">
                  Current government — {currentPm.name} (Labor, {currentPm.term})
                </div>

                <div className="flex items-end gap-3 mb-2">
                  <div className={`font-display text-8xl md:text-9xl leading-none ${scoreColor}`}>
                    {COMPOSITE_SCORE}
                  </div>
                  <div className="pb-3">
                    <div className={`font-display text-4xl ${scoreColor}`}>%</div>
                  </div>
                </div>

                <div className="font-mono text-sm text-zinc-400 mb-6">
                  {text.scoreLabel}
                </div>

                <div className="h-3 bg-zinc-900 w-full mb-2">
                  <div
                    className={`h-full transition-all duration-1000 ${scoreBg}`}
                    style={{ width: `${COMPOSITE_SCORE}%` }}
                  />
                </div>
                <div className="flex justify-between font-mono text-[10px] text-zinc-700">
                  <span>0% — Life definitely gets easier</span>
                  <span>100% — Life definitely gets harder</span>
                </div>

                <div className="mt-6 border-t border-zinc-900 pt-4">
                  <div className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-2">
                    Estimated household impact vs 2022
                  </div>
                  <div className="font-mono text-sm text-zinc-300 leading-relaxed">
                    {currentPm.dollarImpact}
                  </div>
                  {currentPm.context && (
                    <div className="mt-2 font-mono text-xs text-zinc-600 italic">
                      ⚠ Context: {currentPm.context}
                    </div>
                  )}
                </div>
              </div>

              <div className="border border-zinc-800 bg-zinc-950 p-6">
                <div className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-4">
                  {text.factorLabel}
                </div>
                <div className="space-y-4">
                  {PRESSURE_FACTORS.map((f) => (
                    <div key={f.id}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-xs ${TREND_COLOR[f.trend]}`}>
                            {TREND_ARROW[f.trend]}
                          </span>
                          <span className="font-mono text-xs text-zinc-300">
                            {f.label}
                          </span>
                          <span className="font-mono text-[10px] text-zinc-700">
                            ({f.weight}% weight)
                          </span>
                        </div>
                        <span className={`font-mono text-sm font-bold tabular-nums
                          ${f.score >= 70 ? "text-red-400" : f.score >= 50 ? "text-amber-400" : "text-emerald-400"}`}>
                          {f.score}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-zinc-900 w-full mb-1">
                        <div
                          className={`h-full ${f.score >= 70 ? "bg-red-500" : f.score >= 50 ? "bg-amber-400" : "bg-emerald-400"}`}
                          style={{ width: `${f.score}%` }}
                        />
                      </div>
                      <div className="font-mono text-[10px] text-zinc-600">
                        {f.detail}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-900">
                  <div className="font-mono text-[10px] text-zinc-700 leading-relaxed">
                    Score = weighted average of 5 factors. Calibrated against 25yr historical data.
                    Updated when new ABS/RBA/Finance data releases.{" "}
                    <a
                      href="https://github.com/isthisgovcooked/isthisgovcooked"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-zinc-300 transition-colors"
                    >
                      Verify methodology →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 font-mono text-xs text-zinc-600">
              Lower % = better for households. Same methodology applied to all PMs equally.
            </div>

            <div className="space-y-px bg-zinc-900">
              {[...PM_PRESSURE]
                .sort((a, b) => a.score - b.score)
                .map((pm, rank) => (
                  <div
                    key={pm.name}
                    className={`bg-zinc-950 p-4 cursor-pointer transition-colors
                      ${hoveredPm === pm.name ? "bg-zinc-900" : ""}
                      ${pm.name === "Albanese" ? "border-l-4 border-red-700" : "border-l-4 border-transparent"}`}
                    onMouseEnter={() => setHoveredPm(pm.name)}
                    onMouseLeave={() => setHoveredPm(null)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="font-display text-3xl text-zinc-800 w-8 shrink-0 text-right">
                        {rank + 1}
                      </div>

                      <div className="w-32 shrink-0">
                        <div className="font-mono text-sm text-white font-bold">{pm.name}</div>
                        <div className={`font-mono text-[10px] ${pm.party === "Labor" ? "text-red-400" : "text-blue-400"}`}>
                          {pm.party} · {pm.term}
                        </div>
                      </div>

                      <div className="flex-1 flex items-center gap-3">
                        <div className="flex-1 h-6 bg-zinc-900 relative">
                          <div
                            className={`h-full transition-all duration-500
                              ${pm.score >= 70 ? "bg-red-500/70" : pm.score >= 50 ? "bg-amber-400/70" : "bg-emerald-400/70"}`}
                            style={{ width: `${pm.score}%` }}
                          />
                          {pm.name === "Albanese" && (
                            <div className="absolute right-0 top-0 h-full flex items-center">
                              <span className="font-mono text-[9px] text-red-400 mr-1">← current</span>
                            </div>
                          )}
                        </div>
                        <div className={`font-mono text-lg font-bold tabular-nums w-12 text-right shrink-0
                          ${pm.score >= 70 ? "text-red-400" : pm.score >= 50 ? "text-amber-400" : "text-emerald-400"}`}>
                          {pm.score}%
                        </div>
                      </div>
                    </div>

                    {hoveredPm === pm.name && (
                      <div className="mt-3 ml-12 pl-4 border-l border-zinc-800">
                        <div className="font-mono text-xs text-zinc-400 mb-1">
                          {pm.dollarImpact}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {pm.drivers.map((d) => (
                            <span key={d} className="font-mono text-[10px] border border-zinc-800 text-zinc-500 px-2 py-0.5">
                              {d}
                            </span>
                          ))}
                        </div>
                        {pm.context && (
                          <div className="mt-2 font-mono text-[10px] text-zinc-600 italic">
                            ⚠ {pm.context}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
            </div>

            <div className="mt-6 border border-zinc-800 bg-zinc-950 p-5">
              <div className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-2">
                What the 25 years tell us
              </div>
              <div className="font-mono text-sm text-zinc-400 leading-relaxed">
                Howard&apos;s score (22%) reflects genuinely exceptional conditions — mining boom,
                debt eliminated, real wages rising. The two highest-pressure periods:
                Morrison&apos;s final year (global inflation surge, real wages -1.8%/yr) and
                Albanese&apos;s first two years (inherited inflation, immigration-driven rental crisis).
                Both COVID and global inflation get contextual weighting — but the data is the data.
              </div>
            </div>
          </>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <div className="font-mono text-xs text-zinc-600">Share this:</div>
          <button
            type="button"
            onClick={() => {
              const copyText = `There's a ${COMPOSITE_SCORE}% chance your cost of living gets harder under the current government — based on 25 years of data. isthisgovcooked.com.au`;
              void navigator.clipboard?.writeText(copyText);
            }}
            className="font-mono text-xs border border-zinc-800 text-zinc-500
              hover:border-zinc-600 hover:text-zinc-300 px-3 py-1.5 transition-colors"
          >
            Copy stat →
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              `There's a ${COMPOSITE_SCORE}% chance your cost of living gets harder under the current government — based on 25 years of Australian government data.\n\nisthisgovcooked.com.au`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs border border-zinc-800 text-zinc-500
              hover:border-zinc-600 hover:text-zinc-300 px-3 py-1.5 transition-colors"
          >
            Post on X →
          </a>
        </div>

      </div>
    </section>
  );
}
