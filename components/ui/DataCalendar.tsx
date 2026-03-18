"use client";
import { useState } from "react";

type ReleaseStatus = "released" | "upcoming" | "estimated";

interface DataRelease {
  label:     string;
  date:      string;
  status:    ReleaseStatus;
  source:    string;
  url:       string;
  what:      string;
  why:       string;
}

const DATA_RELEASES: DataRelease[] = [
  {
    label:  "2023-24 CFS",
    date:   "12 Dec 2024",
    status: "released",
    source: "Dept of Finance",
    url:    "https://www.finance.gov.au/publications/commonwealth-consolidated-financial-statements/2023-2024-commonwealth-consolidated-financial-statements",
    what:   "Full accrual financial statements for year ended 30 June 2024",
    why:    "Source for all 2023-24 figures on this site",
  },
  {
    label:  "2024-25 Final Budget Outcome",
    date:   "29 Sep 2025",
    status: "released",
    source: "Dept of Finance",
    url:    "https://www.finance.gov.au/publications/final-budget-outcome",
    what:   "Cash-basis outcome for 2024-25 — the real bottom line",
    why:    "First official 2024-25 cash figures — updates the Cooked Metre",
  },
  {
    label:  "2024-25 CFS",
    date:   "11 Dec 2025",
    status: "released",
    source: "Dept of Finance + ANAO",
    url:    "https://www.finance.gov.au/publications/commonwealth-consolidated-financial-statements/2024-2025-commonwealth-consolidated-financial-statements",
    what:   "Full accrual accounts for 2024-25 including ANAO audit opinion",
    why:    "Adds 2024-25 accrual data, super actuarial, net worth, ANAO findings",
  },
  {
    label:  "2026-27 Federal Budget",
    date:   "12 May 2026",
    status: "upcoming",
    source: "Treasurer Jim Chalmers",
    url:    "https://budget.gov.au",
    what:   "Annual budget — forward estimates, new spending, tax measures",
    why:    "🚨 Budget night — we publish the verdict within 1 hour",
  },
  {
    label:  "2025-26 Final Budget Outcome",
    date:   "~late Sep 2026",
    status: "estimated",
    source: "Dept of Finance",
    url:    "https://www.finance.gov.au/publications/final-budget-outcome",
    what:   "Cash outcome for the current financial year (ending 30 Jun 2026)",
    why:    "First real numbers for 2025-26 — tests if the budget forecasts held",
  },
  {
    label:  "2025-26 CFS",
    date:   "~mid Dec 2026",
    status: "estimated",
    source: "Dept of Finance + ANAO",
    url:    "https://www.finance.gov.au/publications/commonwealth-consolidated-financial-statements",
    what:   "Full accrual statements for year ending 30 June 2026",
    why:    "Adds 2025-26 to the 25-year dataset — Nemo Claw auto-processes",
  },
  {
    label:  "ABS CPI — Mar 2026 quarter",
    date:   "~30 Apr 2026",
    status: "estimated",
    source: "ABS 6401.0",
    url:    "https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia/latest-release",
    what:   "Consumer Price Index — measures inflation",
    why:    "Updates cost-of-living factor in real time",
  },
  {
    label:  "ABS WPI — Mar 2026 quarter",
    date:   "~21 May 2026",
    status: "estimated",
    source: "ABS 6345.0",
    url:    "https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/wage-price-index-australia/latest-release",
    what:   "Wage Price Index — measures wage growth",
    why:    "Updates wages factor — are real wages recovering?",
  },
];

const STATUS_STYLE: Record<ReleaseStatus, string> = {
  released: "text-emerald-400 border-emerald-900",
  upcoming: "text-red-400 border-red-900 bg-red-950/20",
  estimated: "text-amber-400 border-amber-900",
};

const STATUS_LABEL: Record<ReleaseStatus, string> = {
  released: "✓ Released",
  upcoming: "🚨 Confirmed",
  estimated: "~ Estimated",
};

export default function DataCalendar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-12 border-t border-zinc-900 pt-8">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-left group"
      >
        <div>
          <div className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-1">
            When does the data drop?
          </div>
          <div className="font-display text-2xl text-white">
            Official Release Calendar
          </div>
        </div>
        <div className={`font-mono text-zinc-600 text-sm transition-transform ${open ? "rotate-180" : ""}`}>
          ▼
        </div>
      </button>

      {open && (
        <div className="mt-6 space-y-px bg-zinc-900">
          {DATA_RELEASES.map((release) => (
            <div
              key={release.label}
              className={`bg-zinc-950 p-4 flex flex-col sm:flex-row items-start gap-4
                ${release.status === "upcoming" ? "border-l-4 border-red-700" : "border-l-4 border-transparent"}`}
            >
              <div className="shrink-0 w-48">
                <div className={`font-mono text-xs border px-2 py-0.5 inline-block mb-1 ${STATUS_STYLE[release.status]}`}>
                  {STATUS_LABEL[release.status]}
                </div>
                <div className="font-mono text-sm text-zinc-300 font-bold">{release.date}</div>
                <div className="font-mono text-xs text-zinc-600">{release.source}</div>
              </div>

              <div className="flex-1">
                <div className="font-mono text-sm text-white font-bold mb-1">{release.label}</div>
                <div className="font-mono text-xs text-zinc-500 mb-1">{release.what}</div>
                <div className="font-mono text-xs text-zinc-600">
                  <span className="text-zinc-500">Why it matters: </span>{release.why}
                </div>
              </div>

              <a
                href={release.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-zinc-600 hover:text-zinc-300 transition-colors shrink-0 whitespace-nowrap"
              >
                Source ↗
              </a>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="mt-4 font-mono text-xs text-zinc-700">
          Pattern: Final Budget Outcome releases ~late September each year.
          CFS releases ~mid December each year. Budget night: second Tuesday of May.
          Estimated dates based on consistent historical release pattern —
          actual dates announced by Treasurer/Finance Minister.
        </div>
      )}
    </div>
  );
}
