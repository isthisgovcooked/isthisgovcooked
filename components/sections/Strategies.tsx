"use client";
import { useState } from "react";
import Section from "@/components/ui/Section";
import Explainer from "@/components/ui/Explainer";
import { bookStrategies } from "@/lib/data";
import type { NextSectionProp } from "@/components/ui/Section";

const STRATEGY_PEAK_YEAR: Record<string, string> = {
  super:      "2021-22",
  equity:     "2020-21",
  capitalise: "2018-19",
  accrual:    "2023-24",
  military:   "2023-24",
};

export default function StrategiesSection({ nextSection }: { nextSection?: NextSectionProp }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <Section
      id="strategies"
      tag="// Accounting Strategies — Used by Every Government Since 1999"
      title="5 TRICKS THEY USE."
      intro="These aren't illegal and they aren't new. Every government since Howard has used them. The tricks got bigger as debt grew. Click any to see how it works."
      dark
      accent="red"
      nextSection={nextSection}
    >
      <div className="space-y-px bg-zinc-900 rounded overflow-hidden">
        {bookStrategies.map((s, idx) => {
          const isOpen = expanded === s.id;
          return (
            <div
              key={s.id}
              className={`bg-zinc-950 transition-all ${isOpen ? "border-l-4 border-red-700" : "border-l-4 border-transparent hover:border-zinc-700"}`}
            >
              <button
                type="button"
                onClick={() => setExpanded(isOpen ? null : s.id)}
                className="w-full flex items-start justify-between p-5 text-left group"
              >
                <div className="flex items-start gap-4">
                  <div className="font-display text-5xl text-zinc-800 leading-none shrink-0 group-hover:text-zinc-700 transition-colors">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="font-mono text-sm text-red-500 font-bold uppercase tracking-wide mb-1">
                      {s.title}
                    </div>
                    <div className="font-mono text-xs text-zinc-600">
                      Impact: {s.impact}
                    </div>
                  </div>
                </div>
                <div className={`font-mono text-xs text-zinc-600 shrink-0 ml-4 mt-1 transition-transform ${isOpen ? "rotate-180" : ""}`}>
                  ▼
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5">
                  <div className="border-t border-zinc-900 pt-4 mb-4">
                    <Explainer explanations={s.explanations} />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="font-mono text-xs text-zinc-600">
                      Most visible: {s.yearsAffected}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById("overview");
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                        window.dispatchEvent(
                          new CustomEvent("selectYear", { detail: STRATEGY_PEAK_YEAR[s.id] })
                        );
                      }}
                      className="font-mono text-xs text-amber-400 hover:text-amber-300 border border-amber-900 hover:border-amber-700 px-3 py-1.5 transition-colors w-fit"
                    >
                      See {STRATEGY_PEAK_YEAR[s.id]} example →
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
