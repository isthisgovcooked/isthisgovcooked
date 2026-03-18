"use client";

import { useState } from "react";
import Section from "@/components/ui/Section";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import { useLevel } from "@/lib/level-context";

interface Inputs {
  mortgageBalance: number;
  weeklyRent: number;
  grossIncome: number;
  weeklyGroceries: number;
  isRenter: boolean;
}

const lineColor: Record<string, string> = {
  red: "text-red-400",
  amber: "text-amber-400",
  zinc: "text-zinc-400",
};

export default function PersonalCalc() {
  const { level } = useLevel();
  const [inputs, setInputs] = useState<Inputs>({
    mortgageBalance: 600000,
    weeklyRent: 600,
    grossIncome: 90000,
    weeklyGroceries: 250,
    isRenter: false,
  });
  const [calculated, setCalculated] = useState(false);

  const calc = () => {
    const mortgageCost = inputs.isRenter
      ? 0
      : Math.round(inputs.mortgageBalance * 0.005);

    const rentCost = inputs.isRenter
      ? Math.round(inputs.weeklyRent * 52 * 0.132)
      : 0;

    const wageLoss = Math.round(inputs.grossIncome * 0.038);

    const groceryCost = Math.round(inputs.weeklyGroceries * 52 * 0.25 * 0.163);

    const energyCost = 124;

    const total = mortgageCost + rentCost + wageLoss + groceryCost + energyCost;
    const perWeek = Math.round(total / 52);
    const perDay = Math.round(total / 365);

    return {
      mortgageCost,
      rentCost,
      wageLoss,
      groceryCost,
      energyCost,
      total,
      perWeek,
      perDay,
    };
  };

  const results = calculated ? calc() : null;

  const levelNote = {
    kid:
      "This calculator shows how the government's decisions about money affected your family's budget. These are estimates — the real number might be a bit higher or lower.",
    teen:
      "Estimates use RBA fiscal analysis, CoreLogic rental data, and ABS CPI. Conservative figures — actual impact may be higher. Government decisions are one factor among several.",
    expert:
      "Methodology: mortgage impact uses RBA-estimated fiscal contribution of 0.5pp to tightening cycle. Rental impact uses demand-side attribution from RBA FSR modelling (40% of excess rental CPI). Wage loss uses WPI-CPI differential 2022-24 (ABS 6345.0, 6401.0). Food inflation at 25% fiscal attribution. All figures are central estimates; uncertainty bands ±30%.",
  };

  const resultLines: { label: string; amount: number; color: string }[] = [];
  if (results) {
    if (!inputs.isRenter && results.mortgageCost > 0) {
      resultLines.push({
        label: "Extra mortgage repayments (rate rise contribution)",
        amount: results.mortgageCost,
        color: "red",
      });
    }
    if (inputs.isRenter && results.rentCost > 0) {
      resultLines.push({
        label: "Extra rent (immigration demand pressure)",
        amount: results.rentCost,
        color: "red",
      });
    }
    resultLines.push({
      label: "Real wage loss (wages below inflation)",
      amount: results.wageLoss,
      color: "amber",
    });
    resultLines.push({
      label: "Extra grocery costs (fiscal inflation)",
      amount: results.groceryCost,
      color: "amber",
    });
    resultLines.push({
      label: "Extra energy costs",
      amount: results.energyCost,
      color: "zinc",
    });
  }

  return (
    <Section
      id="calculator"
      tag="// Your Personal Impact"
      title="WHAT DID THIS COST YOU?"
      intro="Enter your situation. See how government decisions hit your wallet — in actual dollars."
      dark
      accent="amber"
    >
      <AnimateOnScroll>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-zinc-800 mb-6">
          <div className="bg-zinc-950 p-6">
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">
              Your Situation
            </div>

            <div className="flex gap-2 mb-5">
              {["Homeowner / Mortgagee", "Renter"].map((label, i) => (
                <button
                  key={label}
                  onClick={() => setInputs((p) => ({ ...p, isRenter: i === 1 }))}
                  className={`font-mono text-xs px-3 py-2 border transition-all flex-1 ${
                    (inputs.isRenter ? i === 1 : i === 0)
                      ? "bg-amber-900 border-amber-600 text-white"
                      : "border-zinc-800 text-zinc-500 hover:border-zinc-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {!inputs.isRenter && (
                <label className="block">
                  <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
                    Mortgage balance: ${inputs.mortgageBalance.toLocaleString()}
                  </div>
                  <input
                    type="range"
                    min={100000}
                    max={2000000}
                    step={50000}
                    value={inputs.mortgageBalance}
                    onChange={(e) =>
                      setInputs((p) => ({ ...p, mortgageBalance: +e.target.value }))
                    }
                    className="w-full accent-red-600"
                  />
                  <div className="flex justify-between font-mono text-xs text-zinc-600 mt-1">
                    <span>$100K</span>
                    <span>$2M</span>
                  </div>
                </label>
              )}

              {inputs.isRenter && (
                <label className="block">
                  <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
                    Weekly rent: ${inputs.weeklyRent}
                  </div>
                  <input
                    type="range"
                    min={200}
                    max={1500}
                    step={25}
                    value={inputs.weeklyRent}
                    onChange={(e) =>
                      setInputs((p) => ({ ...p, weeklyRent: +e.target.value }))
                    }
                    className="w-full accent-red-600"
                  />
                  <div className="flex justify-between font-mono text-xs text-zinc-600 mt-1">
                    <span>$200</span>
                    <span>$1,500</span>
                  </div>
                </label>
              )}

              <label className="block">
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
                  Annual income: ${inputs.grossIncome.toLocaleString()}
                </div>
                <input
                  type="range"
                  min={30000}
                  max={300000}
                  step={5000}
                  value={inputs.grossIncome}
                  onChange={(e) =>
                    setInputs((p) => ({ ...p, grossIncome: +e.target.value }))
                  }
                  className="w-full accent-red-600"
                />
                <div className="flex justify-between font-mono text-xs text-zinc-600 mt-1">
                  <span>$30K</span>
                  <span>$300K</span>
                </div>
              </label>

              <label className="block">
                <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
                  Weekly groceries: ${inputs.weeklyGroceries}
                </div>
                <input
                  type="range"
                  min={50}
                  max={600}
                  step={25}
                  value={inputs.weeklyGroceries}
                  onChange={(e) =>
                    setInputs((p) => ({ ...p, weeklyGroceries: +e.target.value }))
                  }
                  className="w-full accent-red-600"
                />
                <div className="flex justify-between font-mono text-xs text-zinc-600 mt-1">
                  <span>$50</span>
                  <span>$600</span>
                </div>
              </label>
            </div>

            <button
              onClick={() => setCalculated(true)}
              className="w-full mt-5 bg-amber-700 hover:bg-amber-600 text-white font-mono text-xs uppercase tracking-widest py-3 transition-colors"
            >
              Calculate My Impact →
            </button>
          </div>

          <div className="bg-zinc-950 p-6">
            {!results ? (
              <div className="h-full flex items-center justify-center min-h-[200px]">
                <p className="font-mono text-xs text-zinc-600 text-center">
                  Enter your details and click Calculate
                </p>
              </div>
            ) : (
              <>
                <div className="font-mono text-xs text-amber-400 uppercase tracking-widest mb-4">
                  Estimated annual cost of government decisions on your budget
                </div>

                <div className="font-display text-6xl text-red-500 mb-1">
                  ${results.total.toLocaleString()}
                </div>
                <div className="font-mono text-xs text-zinc-500 mb-5">
                  = ${results.perWeek}/week = ${results.perDay}/day
                </div>

                <div className="space-y-2 mb-5">
                  {resultLines.map(({ label, amount, color }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center py-2 border-b border-zinc-900"
                    >
                      <span className="font-mono text-xs text-zinc-400 pr-4">
                        {label}
                      </span>
                      <span
                        className={`font-mono text-sm font-bold shrink-0 ${lineColor[color]}`}
                      >
                        +${amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-l-4 border-amber-700 bg-amber-950/20 p-4">
                  <p className="text-zinc-300 text-xs leading-relaxed">
                    {levelNote[level]}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="font-mono text-xs text-zinc-600">
          Sources: RBA Financial Stability Review, ABS CPI (6401.0), ABS WPI
          (6345.0), CoreLogic/REIA rental data. Conservative central estimates.
          ±30% uncertainty band.{" "}
          <a
            href="https://github.com/isthisgovcooked/isthisgovcooked/blob/main/lib/calculator-methodology.md"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-300 underline"
          >
            Full methodology →
          </a>
        </div>
      </AnimateOnScroll>
    </Section>
  );
}
