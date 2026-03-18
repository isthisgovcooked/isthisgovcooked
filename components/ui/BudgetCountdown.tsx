"use client";
import { useEffect, useState } from "react";

// ── Configurable event dates ──────────────────────────────────────────────────
const EVENTS = [
  {
    id:        "budget-2026",
    label:     "2026–27 Federal Budget",
    date:      new Date("2026-05-12T19:30:00+10:00"), // 7:30pm AEST
    type:      "budget" as const,
    who:       "Treasurer Jim Chalmers",
    teaser:    "Gross debt crosses $1 trillion for the first time. We'll publish the verdict before the spin starts.",
    checkList: [
      "Headline deficit vs real cash deficit",
      "Off-budget spending not in the headline",
      "Super actuarial movements",
      "Equity injections",
      "GDP per capita vs headline GDP",
    ],
  },
  {
    id:        "fbo-2026",
    label:     "2025–26 Final Budget Outcome",
    date:      new Date("2026-09-30T09:00:00+10:00"), // ~late Sep
    type:      "data" as const,
    who:       "Department of Finance",
    teaser:    "The real cash figures — what actually came in and went out in 2025-26.",
    checkList: [],
  },
  {
    id:        "cfs-2026",
    label:     "2025–26 Consolidated Financial Statements",
    date:      new Date("2026-12-11T09:00:00+10:00"), // ~mid Dec
    type:      "data" as const,
    who:       "Dept of Finance + ANAO audit",
    teaser:    "Full accrual accounts including super actuarial, ANAO findings, net worth.",
    checkList: [],
  },
];

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export default function BudgetCountdown() {
  const now = Date.now();
  const nextUpcoming = EVENTS.find((e) => e.date.getTime() > now);
  const pastBudget = EVENTS.find((e) => e.type === "budget" && e.date.getTime() <= now);

  // After budget night has passed, show "Budget delivered" state
  if (pastBudget) {
    const nextLabel = nextUpcoming?.label ?? "2025–26 Final Budget Outcome ~Sep 2026";
    return (
      <div className="border-b border-emerald-900 bg-emerald-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-emerald-400 uppercase tracking-widest mb-1">
                ✓ Budget delivered — {pastBudget.label}
              </div>
              <div className="font-mono text-sm text-zinc-400">
                Analysis published. Next: {nextLabel}
              </div>
            </div>
            <a
              href="#forward"
              className="font-mono text-xs border border-emerald-800 text-emerald-400
                hover:border-emerald-600 px-3 py-1.5 transition-colors shrink-0 whitespace-nowrap"
            >
              Read the verdict →
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Show countdown to next upcoming event (or first event if all past — shouldn't happen with pastBudget check)
  const nextEvent = nextUpcoming ?? EVENTS[0];
  const isBudgetEvent = nextEvent.type === "budget";

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Set initial value only on client — avoids SSR/client mismatch
    setTimeLeft(getTimeLeft(nextEvent.date));
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(nextEvent.date));
    }, 1000);
    return () => clearInterval(timer);
  }, [nextEvent.date.getTime()]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const nowPills = Date.now();

  return (
    <div className={`border-b ${isBudgetEvent ? "border-red-900 bg-red-950/40" : "border-zinc-800 bg-zinc-950"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">

        {/* Main countdown row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

          {/* Left: label + date */}
          <div>
            <div className={`font-mono text-xs uppercase tracking-widest mb-1 ${isBudgetEvent ? "text-red-400" : "text-zinc-500"}`}>
              {isBudgetEvent ? "🚨 Next Budget Night" : "📊 Next Data Release"}
            </div>
            <div className="font-display text-xl sm:text-2xl text-white leading-tight">
              {nextEvent.label}
            </div>
            <div className="font-mono text-xs text-zinc-500 mt-0.5">
              {nextEvent.date.toLocaleDateString("en-AU", {
                weekday: "long", day: "numeric", month: "long", year: "numeric",
              })} — {nextEvent.who}
            </div>
          </div>

          {/* Right: countdown clock */}
          <div className="flex items-end gap-1 shrink-0">
            {[
              { value: timeLeft?.days    ?? null, unit: "days" },
              { value: timeLeft?.hours   ?? null, unit: "hrs" },
              { value: timeLeft?.minutes ?? null, unit: "min" },
              { value: timeLeft?.seconds ?? null, unit: "sec" },
            ].map(({ value, unit }, i) => (
              <div key={unit} className="flex items-end gap-1">
                {i > 0 && <span className="font-mono text-zinc-700 text-xl mb-1.5">:</span>}
                <div className="text-center">
                  <div className={`font-display text-3xl sm:text-4xl leading-none tabular-nums
                    ${isBudgetEvent ? "text-red-400" : "text-zinc-300"}`}>
                    {value === null
                      ? "--"
                      : unit === "days" ? String(value) : pad(value)}
                  </div>
                  <div className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest mt-0.5">
                    {unit}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teaser + expand */}
        <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-xs text-zinc-500 max-w-xl">
            {nextEvent.teaser}
          </p>

          {isBudgetEvent && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="font-mono text-xs border border-zinc-700 text-zinc-400
                hover:border-red-700 hover:text-red-400 px-3 py-1.5 transition-colors shrink-0 whitespace-nowrap"
            >
              {expanded ? "Hide" : "What we'll be checking ↓"}
            </button>
          )}
        </div>

        {/* Expandable checklist */}
        {expanded && isBudgetEvent && nextEvent.checkList.length > 0 && (
          <div className="mt-4 border-t border-zinc-900 pt-4">
            <div className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-2">
              On budget night we check:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {nextEvent.checkList.map((item, i) => (
                <div key={i} className="flex items-start gap-2 font-mono text-xs text-zinc-400">
                  <span className="text-red-600 shrink-0 mt-0.5">→</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 font-mono text-xs text-zinc-600">
              We publish the plain-English verdict within 1 hour of the Treasurer sitting down.{" "}
              <a href="#chat" className="text-red-500 hover:text-red-300 transition-colors">
                Ask the AI anything →
              </a>
            </div>
          </div>
        )}

        {/* Upcoming events pills */}
        <div className="mt-3 flex flex-wrap gap-2">
          {EVENTS.map((event) => {
            const isPast = event.date.getTime() <= nowPills;
            const isNext = event.id === nextEvent.id;
            return (
              <div
                key={event.id}
                className={`font-mono text-[10px] px-2 py-1 border transition-colors
                  ${isPast
                    ? "border-zinc-900 text-zinc-700 line-through"
                    : isNext
                      ? event.type === "budget"
                        ? "border-red-800 text-red-400 bg-red-950/30"
                        : "border-zinc-700 text-zinc-400"
                      : "border-zinc-900 text-zinc-600"
                  }`}
              >
                {event.type === "budget" ? "🗓 " : "📋 "}
                {event.label} —{" "}
                {event.date.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
