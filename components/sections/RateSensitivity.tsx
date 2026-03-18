"use client";
import { useState } from "react";
import Section from "@/components/ui/Section";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

// Base data (sourced from RBA, budget papers)
const BASE = {
  grossDebt: 940,         // $B — 2024-25 budget
  netDebt: 556,           // $B — 2024-25
  avgBorrowingRate: 4.3,  // % — 10yr ACGB yield assumption
  govtInterestPayments: 25.4, // $B/yr current
  medianMortgage: 600,    // $K — ABS Housing Finance
  avgBusinessLoan: 450,   // $K — RBA SME lending
  renterPercent: 32,      // % of Australians who rent
};

export default function RateSensitivity() {
  const [rateDelta, setRateDelta] = useState(0);    // pp change
  const [mortgageSize, setMortgageSize] = useState(600); // $K

  // Calculations
  const newGovtInterest = BASE.govtInterestPayments + (BASE.grossDebt * rateDelta / 100);
  const extraGovtInterest = newGovtInterest - BASE.govtInterestPayments;
  const extraMortgageCost = Math.round(mortgageSize * 1000 * rateDelta / 100);
  const extraMortgageWeek = Math.round(extraMortgageCost / 52);
  const extraBusinessCost = Math.round(BASE.avgBusinessLoan * 1000 * rateDelta / 100);

  // Per-Australian impact of govt interest change
  const perAussie = Math.round((extraGovtInterest * 1e9) / 26_000_000);

  return (
    <Section
      id="rate-sensitivity"
      tag="// Interest Rate Impact"
      title="WHAT RATES ACTUALLY MEAN."
      intro="Debt doesn't care who's in government. Every $1 of government debt has an interest cost. Here's what rate movements mean in real numbers."
      dark
      accent="amber"
    >
      <AnimateOnScroll>
        {/* Rate change slider */}
        <div className="bg-zinc-950 border border-zinc-800 p-6 mb-4 rounded">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">
            Change the RBA cash rate from current 4.35%
          </div>
          <div className="flex items-center gap-4 mb-2">
            <span className="font-mono text-xs text-zinc-600 shrink-0">−2pp</span>
            <input
              type="range"
              min={-2}
              max={3}
              step={0.25}
              value={rateDelta}
              onChange={(e) => setRateDelta(Number(e.target.value))}
              className="flex-1 w-full accent-red-600"
            />
            <span className="font-mono text-xs text-zinc-600 shrink-0">+3pp</span>
          </div>
          <div className="text-center font-display text-3xl mb-1" style={{
            color: rateDelta > 0 ? "#d42b2b" : rateDelta < 0 ? "#1a7a3a" : "#888",
          }}>
            {rateDelta > 0 ? "+" : ""}{rateDelta.toFixed(2)}pp
          </div>
          <div className="text-center font-mono text-xs text-zinc-500">
            New rate: {(4.35 + rateDelta).toFixed(2)}%
          </div>
        </div>

        {/* Results grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-zinc-800 mb-4 rounded overflow-hidden">
          <div className="bg-zinc-950 p-5">
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
              Government interest payments
            </div>
            <div className="font-display text-4xl mb-1" style={{
              color: extraGovtInterest > 0 ? "#d42b2b" : extraGovtInterest < 0 ? "#1a7a3a" : "#888",
            }}>
              ${newGovtInterest.toFixed(1)}B/yr
            </div>
            <div className="font-mono text-xs text-zinc-500">
              {extraGovtInterest > 0 ? "+" : ""}${Math.abs(extraGovtInterest).toFixed(1)}B vs current
            </div>
            <div className="font-mono text-xs text-zinc-600 mt-2">
              = ${Math.abs(perAussie).toLocaleString()} {extraGovtInterest > 0 ? "more" : "less"} per Australian
            </div>
            <div className="font-mono text-xs text-zinc-700 mt-1">
              Must come from: higher taxes / less services / more borrowing
            </div>
          </div>

          <div className="bg-zinc-950 p-5">
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
              Your ${mortgageSize}K mortgage
            </div>
            <div className="font-display text-4xl mb-1" style={{
              color: extraMortgageCost > 0 ? "#d42b2b" : extraMortgageCost < 0 ? "#1a7a3a" : "#888",
            }}>
              {extraMortgageCost > 0 ? "+" : ""}${Math.abs(extraMortgageCost).toLocaleString()}/yr
            </div>
            <div className="font-mono text-xs text-zinc-500">
              = {extraMortgageCost > 0 ? "+" : ""}${Math.abs(extraMortgageWeek).toLocaleString()}/week
            </div>
            <div className="mt-3">
              <div className="font-mono text-xs text-zinc-600 mb-1">Your mortgage size:</div>
              <input
                type="range"
                min={100}
                max={2000}
                step={50}
                value={mortgageSize}
                onChange={(e) => setMortgageSize(Number(e.target.value))}
                className="w-full accent-red-600"
              />
              <div className="flex justify-between font-mono text-xs text-zinc-700">
                <span>$100K</span>
                <span>$2M</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-950 p-5">
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
              Average small business ($450K loan)
            </div>
            <div className="font-display text-4xl mb-1" style={{
              color: extraBusinessCost > 0 ? "#d42b2b" : extraBusinessCost < 0 ? "#1a7a3a" : "#888",
            }}>
              {extraBusinessCost > 0 ? "+" : ""}${Math.abs(extraBusinessCost).toLocaleString()}/yr
            </div>
            <div className="font-mono text-xs text-zinc-500">
              Extra loan servicing cost
            </div>
            <div className="font-mono text-xs text-zinc-600 mt-2">
              Economy-wide effect: Higher rates slow investment, reduce hiring,
              increase business failures.
            </div>
          </div>
        </div>

        {/* Key insight */}
        <div className="border-l-4 border-amber-700 bg-amber-950/20 p-4 rounded-r">
          <div className="font-mono text-xs text-amber-400 uppercase tracking-widest mb-2">
            Why this matters for government debt
          </div>
          <p className="text-zinc-300 text-sm leading-relaxed">
            Australia&apos;s gross government debt is ${BASE.grossDebt}B (2024-25). At the current
            4.3% average borrowing rate, interest costs are ~${BASE.govtInterestPayments}B/year.
            Every 1pp rate rise adds ~$9.4B to annual interest costs — money that must come
            from higher taxes, reduced services, or more borrowing. This structural cost grows
            as debt grows, regardless of which party is in power.
          </p>
          <p className="text-zinc-400 text-xs mt-2">
            Source: Budget Paper No.1 2025-26, RBA Financial Stability Review, ABS Housing Finance Statistics
          </p>
        </div>
      </AnimateOnScroll>
    </Section>
  );
}
