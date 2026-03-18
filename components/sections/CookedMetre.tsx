"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import Gauge from "@/components/ui/Gauge";
import Explainer from "@/components/ui/Explainer";
import {
  OVERALL_AVERAGE,
  getPMById,
  getScoreLabel,
  getScoreColour,
  getAlgorithmDescription,
  IMMIGRATION_FRAMING,
  FACTOR_IDS,
  FACTOR_LABELS,
  FACTOR_WEIGHTS,
  PM_CONTEXT_BANNERS,
  DECEPTION_DATA,
  ALL_PMS,
  type PMScore,
  type FactorScore,
} from "@/lib/pm-data";

const FACTOR_OPTIONS = [
  { id: "overall", label: "Overall Cooked Score" },
  { id: "economic", label: "Economic Management" },
  { id: "costOfLiving", label: "Cost of Living" },
  { id: "fiscal", label: "Fiscal Responsibility" },
  { id: "immigration", label: "Immigration Management" },
  { id: "wages", label: "Wages & Workers" },
  { id: "deception", label: "Honesty & Deception" },
  { id: "governance", label: "Governance & Integrity" },
  { id: "longTermDamage", label: "Long-term Damage" },
];

function TrendIcon({ trend }: { trend: "improving" | "worsening" | "stable" }) {
  if (trend === "improving") return <span className="text-emerald-400" aria-label="Improving">↓</span>;
  if (trend === "worsening") return <span className="text-red-400" aria-label="Worsening">↑</span>;
  return <span className="text-zinc-500" aria-label="Stable">→</span>;
}

function MethodologyPanel() {
  const [multiplierCap, setMultiplierCap] = useState(0.30);
  const [expanded, setExpanded] = useState(false);

  const recalc = (cap: number) => {
    const scores: Record<string, { raw: number; deception: number }> = {};
    ALL_PMS.forEach((p) => {
      const data = getPMById(p.id);
      if (data) scores[p.id] = { raw: data.rawScore, deception: data.deceptionScore };
    });
    return Object.entries(scores).map(([pm, s]) => ({
      pm,
      raw: s.raw,
      final: Math.min(100, Math.round(s.raw * (1 + (s.deception / 100) * cap))),
      deceptionAdj: Math.round(s.raw * (1 + (s.deception / 100) * cap)) - s.raw,
    }));
  };

  const results = recalc(multiplierCap);

  return (
    <div className="border border-zinc-800 mt-6 rounded overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 font-mono text-xs text-zinc-500 hover:text-zinc-300 transition-colors bg-zinc-900/30"
      >
        <span>📐 HOW IS THIS CALCULATED? — Full methodology + sensitivity analysis</span>
        <span>{expanded ? "▲ collapse" : "▼ expand"}</span>
      </button>

      {expanded && (
        <div className="border-t border-zinc-800 p-5 bg-zinc-950">
          <div className="font-mono text-xs text-amber-400 uppercase tracking-widest mb-3">The Formula</div>
          <div className="bg-black p-4 font-mono text-xs text-zinc-300 mb-4 leading-relaxed rounded">
            <div>Step 1: raw_score = weighted average of 8 factors (0–100 each)</div>
            <div>Step 2: deception_multiplier = 1 + (deception_score ÷ 100 × CAP)</div>
            <div>Step 3: final_score = min(100, raw_score × deception_multiplier)</div>
            <div className="mt-2 text-zinc-500">CAP = {multiplierCap.toFixed(2)} (adjustable below)</div>
          </div>

          <div className="font-mono text-xs text-amber-400 uppercase tracking-widest mb-3">Factor Weights</div>
          <div className="grid grid-cols-2 gap-1 mb-4">
            {[
              ["Economic (per capita)", "18%"],
              ["Cost of Living", "18%"],
              ["Fiscal Management", "15%"],
              ["Immigration vs Forecast", "12%"],
              ["Wages & Workers", "10%"],
              ["Deception (multiplier source)", "15%"],
              ["Governance & Integrity", "7%"],
              ["Long-term Damage", "5%"],
            ].map(([factor, weight]) => (
              <div key={factor} className="flex justify-between bg-black p-2 rounded">
                <span className="font-mono text-xs text-zinc-400">{factor}</span>
                <span className="font-mono text-xs text-amber-400">{weight}</span>
              </div>
            ))}
          </div>

          <div className="font-mono text-xs text-amber-400 uppercase tracking-widest mb-3">
            Sensitivity Analysis — Adjust the deception multiplier cap
          </div>
          <div className="mb-2">
            <div className="flex justify-between font-mono text-xs text-zinc-500 mb-1">
              <span>Cap: {(multiplierCap * 100).toFixed(0)}% max deception penalty</span>
              <span>
                {multiplierCap < 0.20 ? "Very lenient on deception"
                  : multiplierCap < 0.30 ? "Moderate"
                  : multiplierCap < 0.40 ? "Current setting (default)"
                  : "Strict — deception heavily penalised"}
              </span>
            </div>
            <input
              type="range"
              min={0.1}
              max={0.5}
              step={0.05}
              value={multiplierCap}
              onChange={(e) => setMultiplierCap(Number(e.target.value))}
              className="w-full accent-red-600"
            />
            <div className="flex justify-between font-mono text-xs text-zinc-600 mt-1">
              <span>10% (lenient)</span>
              <span>30% (default)</span>
              <span>50% (strict)</span>
            </div>
          </div>

          <div className="mt-4">
            <table className="w-full font-mono text-xs">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left py-2 text-zinc-500">PM</th>
                  <th className="text-right py-2 text-zinc-500">Raw score</th>
                  <th className="text-right py-2 text-zinc-500">Deception adds</th>
                  <th className="text-right py-2 text-zinc-500">Final score</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.pm} className="border-b border-zinc-900">
                    <td className="py-2 text-zinc-300">{r.pm}</td>
                    <td className="py-2 text-right text-zinc-400">{r.raw}</td>
                    <td className="py-2 text-right text-amber-400">+{r.deceptionAdj}</td>
                    <td className={`py-2 text-right font-bold ${r.final >= 60 ? "text-red-400" : r.final >= 40 ? "text-amber-400" : "text-emerald-400"}`}>
                      {r.final}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-2 text-zinc-600 text-xs">
              Note: ordering changes with different caps. No cap setting makes any PM &quot;not cooked&quot; —
              the data range is too consistent.
            </div>
          </div>

          <div className="mt-4 border-l-4 border-zinc-700 pl-4">
            <div className="font-mono text-xs text-zinc-500 mb-1">Think the methodology is wrong?</div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Raise a GitHub issue with your proposed alternative weighting and evidence.
              We&apos;ll publish the debate and update if your argument is stronger.
            </p>
            <a
              href="https://github.com/isthisgovcooked/isthisgovcooked/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-red-400 hover:text-red-300 mt-1 inline-block"
            >
              → Raise a methodology challenge ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CookedMetre() {
  const [pmId, setPmId] = useState("Albanese");
  const [factorId, setFactorId] = useState("overall");
  const [showAlgorithm, setShowAlgorithm] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [compareMode, setCompareMode] = useState(false);

  const pm = getPMById(pmId) ?? OVERALL_AVERAGE;
  const isOverallFactor = factorId === "overall";
  const displayScore = isOverallFactor ? pm.finalScore : (pm.scores[factorId]?.rawScore ?? 0);
  const label = isOverallFactor ? pm.label : getScoreLabel(displayScore);
  const factorScore: FactorScore | null = isOverallFactor ? null : pm.scores[factorId] ?? null;
  const confidence = factorScore?.confidence;
  const rawScore = isOverallFactor ? pm.rawScore : undefined;
  const deceptionAdd = isOverallFactor ? Math.round((pm.finalScore - pm.rawScore) * 10) / 10 : undefined;

  const showImmigrationFraming = factorId === "immigration";
  const bannerKey = pmId === "overall" ? null : pmId;
  const contextBanners = bannerKey ? (PM_CONTEXT_BANNERS[bannerKey] ?? []).filter(
    (b) => b.trigger === "always" || (b.trigger === "immigration" && factorId === "immigration") || (b.trigger === "tenure")
  ) : [];

  return (
    <section
      id="cooked-metre"
      className="min-h-screen flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-red-900"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
        <span className="font-display text-[15vw] text-red-950/25 leading-none tracking-widest">COOKED METRE</span>
      </div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="font-mono text-xs text-red-500 uppercase tracking-widest mb-4">
          // COOKED METRE v2 — Per-capita economics · Deception multiplier · 8 factors
        </div>
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight text-white mb-2">
          Is this PM cooked?
        </h2>
        <p className="text-zinc-400 text-base mb-8 max-w-2xl">
          Pick a Prime Minister and a factor. Raw score = weighted average of 8 factors. Final score = raw × deception multiplier (lying PMs get bumped up). Same formula for all.
        </p>

        {/* Symmetric context banners for all PMs */}
        {contextBanners.map((banner, i) => (
          <div
            key={i}
            className={`border-l-4 p-4 mb-4 rounded-r ${
              banner.severity === "warning"
                ? "border-amber-600 bg-amber-950/20"
                : "border-blue-700 bg-blue-950/20"
            }`}
          >
            <div className={`font-mono text-xs uppercase tracking-widest mb-1 ${
              banner.severity === "warning" ? "text-amber-400" : "text-blue-400"
            }`}>
              ℹ {banner.title}
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed">{banner.body}</p>
          </div>
        ))}
        {showImmigrationFraming && (
          <div className="mb-6 p-4 border border-zinc-600 bg-zinc-900/50 rounded">
            <p className="text-zinc-300 text-sm">{IMMIGRATION_FRAMING}</p>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-2">Select PM</label>
            <select
              value={pmId}
              onChange={(e) => setPmId(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 text-white font-mono text-sm px-4 py-3 rounded focus:outline-none focus:border-red-600"
            >
              <optgroup label="Current">
                <option value="Albanese">Albanese (Labor, 2022–present) ← Current PM</option>
              </optgroup>
              <optgroup label="Recent — Coalition">
                <option value="Morrison">Morrison (Coalition, 2018–2022)</option>
                <option value="Turnbull">Turnbull (Coalition, 2015–2018)</option>
                <option value="Abbott">Abbott (Coalition, 2013–2015)</option>
              </optgroup>
              <optgroup label="Labor 2007–2013">
                <option value="Gillard">Gillard (Labor, 2010–2013)</option>
                <option value="Rudd">Rudd (Labor, 2007–2010, 2013)</option>
              </optgroup>
              <optgroup label="Howard Era">
                <option value="Howard">Howard (Coalition, 1999–2007)</option>
              </optgroup>
              <optgroup label="Average">
                <option value="overall">Overall Average (all 7 PMs)</option>
              </optgroup>
            </select>
          </div>
          <div className="flex-1">
            <label className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-2">Factor</label>
            <select
              value={factorId}
              onChange={(e) => setFactorId(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-700 text-white font-mono text-sm px-4 py-3 rounded focus:outline-none focus:border-red-600"
            >
              {FACTOR_OPTIONS.map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`font-mono text-xs px-3 py-1.5 rounded border transition-colors ${
              compareMode ? "bg-amber-900 border-amber-600 text-white" : "border-zinc-700 text-zinc-400 hover:border-zinc-600"
            }`}
          >
            Compare all PMs
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {FACTOR_OPTIONS.map((o) => (
            <button
              key={o.id}
              onClick={() => setFactorId(o.id)}
              className={`font-mono text-xs px-3 py-1.5 rounded border transition-colors ${
                factorId === o.id ? "bg-red-900 border-red-600 text-white" : "border-zinc-700 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>

        {/* Gauge(s) */}
        {compareMode ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
            {ALL_PMS.map((pmDef) => {
              const p = getPMById(pmDef.id);
              if (!p) return null;
              const val = isOverallFactor ? p.finalScore : (p.scores[factorId]?.rawScore ?? 0);
              const lab = isOverallFactor ? p.label : getScoreLabel(val);
              const raw = isOverallFactor ? p.rawScore : undefined;
              const add = isOverallFactor ? Math.round((p.finalScore - p.rawScore) * 10) / 10 : undefined;
              return (
                <button
                  key={p.pmId}
                  type="button"
                  onClick={() => { setPmId(p.pmId); setCompareMode(false); }}
                  className="bg-zinc-950 border border-zinc-800 p-3 text-center hover:border-zinc-600 transition-colors rounded"
                >
                  <div className={`font-display text-3xl mb-1 ${getScoreColour(val)}`}>{Math.round(val)}</div>
                  <div className="font-mono text-xs text-zinc-500">{pmDef.id}</div>
                  <div className="font-mono text-[9px] text-zinc-700">{pmDef.party === "Coalition (Liberal)" ? "Coalition" : pmDef.party}</div>
                  <div className="font-mono text-[9px] text-zinc-700 truncate" title={pmDef.term}>{pmDef.term.split("–")[0].trim()}</div>
                </button>
              );
            })}
          </div>
        ) : (
          <Gauge value={displayScore} label={label} labelClassName={getScoreColour(displayScore)} rawScore={rawScore} deceptionAdd={deceptionAdd} confidence={confidence} className="mb-8" />
        )}

        <MethodologyPanel />

        {/* Below gauge: 2-col — PM card + Deception explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8" style={{ minHeight: "360px" }}>
          <div className="bg-zinc-900/80 border border-zinc-800 rounded p-5">
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1">PM summary</div>
            <div className="font-display text-xl text-white">{pm.name}</div>
            <div className="font-mono text-xs text-zinc-400 mt-1">{pm.party} · {pm.period}</div>
            {isOverallFactor && (
              <div className="mt-3 font-mono text-xs text-zinc-500 space-y-1">
                <p>Raw score: {pm.rawScore}</p>
                <p>Deception adjustment: +{Math.round((pm.finalScore - pm.rawScore) * 10) / 10}</p>
                <p>Final score: {pm.finalScore}</p>
                <p>Grade: {pm.grade}</p>
              </div>
            )}
          </div>
          <div className="bg-zinc-900/80 border border-zinc-800 rounded p-5">
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1">Deception multiplier</div>
            <p className="text-sm text-zinc-300">
              A PM who breaks promises or makes misleading statements gets their entire score bumped up. Multiplier = 1 + (deception score ÷ 100 × 0.30). So deception can add up to 30% to the final score. We show both raw and final so you can see the effect.
            </p>
                {bannerKey && DECEPTION_DATA[bannerKey] && (factorId === "deception" || isOverallFactor) && (
              <div className="mt-3 font-mono text-xs text-zinc-500">
                Based on n={DECEPTION_DATA[bannerKey].factChecks.rated} rated statements — Confidence:{" "}
                {DECEPTION_DATA[bannerKey].factChecks.rated > 70 ? "A" : DECEPTION_DATA[bannerKey].factChecks.rated >= 40 ? "B" : "C"}
                {" "}
                <a
                  href={("sourceUrl" in DECEPTION_DATA[bannerKey].promises && DECEPTION_DATA[bannerKey].promises.sourceUrl) ? DECEPTION_DATA[bannerKey].promises.sourceUrl as string : "https://www.rmit.edu.au/about/schools-colleges/media-and-communication/journalism/factlab"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-zinc-500 hover:text-zinc-300 underline"
                >
                  Source ↗
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Factor breakdown — horizontal bars for all 8 factors */}
        {!compareMode && (
          <div className="mb-8">
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">Factor breakdown</div>
            <div className="space-y-3">
              {FACTOR_IDS.map((fid) => {
                const fs = pm.scores[fid];
                const v = fs?.rawScore ?? 0;
                const w = FACTOR_WEIGHTS[fid] ?? 0;
                return (
                  <div key={fid} className="flex items-center gap-3">
                    <div className="w-32 sm:w-40 shrink-0 font-mono text-xs text-zinc-400">{FACTOR_LABELS[fid]}</div>
                    <div className="flex-1 h-5 bg-zinc-900 rounded overflow-hidden">
                      <div
                        className="h-full rounded transition-all duration-500"
                        style={{
                          width: `${v}%`,
                          background: v <= 20 ? "#1a7a3a" : v <= 40 ? "#e8a020" : v <= 60 ? "#e05010" : "#d42b2b",
                        }}
                      />
                    </div>
                    <div className="w-10 font-mono text-xs text-zinc-500 text-right">{Math.round(v)}</div>
                    <div className="w-8 font-mono text-xs text-zinc-600">{w}%</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {factorScore && (
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 mb-4">
            <TrendIcon trend={factorScore.trend} />
            <span>Trend: {factorScore.trend}</span>
            <span className="text-zinc-600">·</span>
            <span>Latest: {factorScore.lastDataPoint}</span>
          </div>
        )}

        {factorScore && (
          <div className="mb-8 p-5 bg-zinc-900/80 border border-zinc-800 rounded">
            <Explainer explanations={factorScore.explanations} />
          </div>
        )}

        <div className="border border-zinc-800 rounded overflow-hidden mb-6">
          <button
            onClick={() => setShowAlgorithm(!showAlgorithm)}
            className="w-full flex items-center justify-between font-mono text-xs text-zinc-400 uppercase tracking-widest px-4 py-3 bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors"
          >
            How is this calculated?
            {showAlgorithm ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showAlgorithm && (
            <div className="px-4 py-4 bg-zinc-950 border-t border-zinc-800 text-sm text-zinc-300 space-y-3">
              <p>{getAlgorithmDescription()}</p>
              <p className="font-mono text-xs text-zinc-500">
                Weights: {Object.entries(FACTOR_WEIGHTS).map(([k, w]) => `${FACTOR_LABELS[k] ?? k} ${w}%`).join(", ")}.
              </p>
            </div>
          )}
        </div>

        <div className="border border-zinc-800 rounded overflow-hidden">
          <button
            onClick={() => setShowSources(!showSources)}
            className="w-full flex items-center justify-between font-mono text-xs text-zinc-400 uppercase tracking-widest px-4 py-3 bg-zinc-900/50 hover:bg-zinc-800/50 transition-colors"
          >
            Sources
            {showSources ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          {showSources && factorScore && (
            <div className="px-4 py-4 bg-zinc-950 border-t border-zinc-800 space-y-2">
              {factorScore.sources.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-sm text-zinc-300 hover:text-white group">
                  <ExternalLink className="w-4 h-4 shrink-0 mt-0.5 text-zinc-500 group-hover:text-red-500" />
                  <span><strong className="text-zinc-200">{s.name}</strong> — {s.dataPoint} ({s.date})</span>
                </a>
              ))}
            </div>
          )}
          {showSources && isOverallFactor && (
            <div className="px-4 py-4 bg-zinc-950 border-t border-zinc-800 text-sm text-zinc-500">
              Final score = weighted average of 8 factors × deception multiplier. See each factor&apos;s Sources for data links.
            </div>
          )}
        </div>

        <p className="mt-8 font-mono text-xs text-zinc-600">
          Data version {pm.dataVersion} · Last updated {pm.lastUpdated} · Algorithm identical for all PMs
        </p>
      </div>
    </section>
  );
}
