"use client";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, ReferenceLine,
} from "recharts";
import {
  YEARS, totalRevenue, totalExpenses, netOpBalance, underlyingCash,
  netDebt, netWorthDeficit, gdpEstimate, cpiInflation, rbaCashRate,
  FWD_YEARS, FWD_NET_DEBT, FWD_CASH, FWD_EXP_GDP, GOV_BY_YEAR,
  ACCOUNTING_BREAKS,
} from "@/lib/data";

const shortYear = (y: string) => y.replace("20", "'");

const CHART_BG   = "transparent";
const GRID_COLOR = "#27272a";
const AXIS_COLOR = "#52525b";
const FONT_STYLE = { fontFamily: "'Space Mono', monospace", fontSize: 10, fill: "#71717a" };

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 p-3 font-mono text-xs">
        <p className="text-zinc-300 mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.name} style={{ color: p.color }}>
            {p.name}: {typeof p.value === "number" && Math.abs(p.value) > 100
              ? `$${p.value.toFixed(0)}B`
              : `${p.value}%`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ── Revenue vs Expenses ──────────────────────────────────────
export function RevExpChart() {
  const data = YEARS.map((y, i) => ({
    year: shortYear(y),
    Revenue: +(totalRevenue[i]/1000).toFixed(1),
    Expenses: +(totalExpenses[i]/1000).toFixed(1),
    gov: GOV_BY_YEAR[y],
  }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data} barGap={2}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
        <XAxis dataKey="year" tick={FONT_STYLE} axisLine={false} tickLine={false} />
        <YAxis tick={FONT_STYLE} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}B`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
        <Legend wrapperStyle={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#71717a" }} />
        {Object.keys(ACCOUNTING_BREAKS).map((yr) => (
          <ReferenceLine key={yr} x={shortYear(yr)} stroke="#e8a020" strokeDasharray="4 2" label={{ value: "⚠ Standards", fill: "#e8a020", fontSize: 8, fontFamily: "Space Mono" }} />
        ))}
        <Bar dataKey="Revenue" fill="#1a7a3a" radius={[2,2,0,0]} isAnimationActive={false} />
        <Bar dataKey="Expenses" fill="#d42b2b" radius={[2,2,0,0]} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── Cash vs Operating Balance ────────────────────────────────
export function CashVsOpChart() {
  const data = YEARS.map((y, i) => ({
    year: shortYear(y),
    "Accrual Balance": +(netOpBalance[i]/1000).toFixed(1),
    "Cash Balance": +(underlyingCash[i]/1000).toFixed(1),
  }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} />
        <XAxis dataKey="year" tick={FONT_STYLE} axisLine={false} tickLine={false} />
        <YAxis tick={FONT_STYLE} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}B`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#71717a" }} />
        <ReferenceLine y={0} stroke="#52525b" strokeDasharray="4 2" />
        {Object.keys(ACCOUNTING_BREAKS).map((yr) => (
          <ReferenceLine key={yr} x={shortYear(yr)} stroke="#e8a020" strokeDasharray="4 2" label={{ value: "⚠ Standards", fill: "#e8a020", fontSize: 8, fontFamily: "Space Mono" }} />
        ))}
        <Line dataKey="Accrual Balance" stroke="#e8a020" dot={{ r:4 }} strokeWidth={2} isAnimationActive={false} />
        <Line dataKey="Cash Balance" stroke="#d42b2b" dot={{ r:4 }} strokeWidth={2} strokeDasharray="5 3" isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ── Net Worth Deficit ────────────────────────────────────────
export function NetWorthChart() {
  const data = YEARS.map((y, i) => ({
    year: shortYear(y),
    "Net Worth Deficit": +(Math.abs(netWorthDeficit[i])/1000).toFixed(0),
  }));
  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
        <XAxis dataKey="year" tick={FONT_STYLE} axisLine={false} tickLine={false} />
        <YAxis tick={FONT_STYLE} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}B`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill:"rgba(255,255,255,0.03)" }} />
        {Object.keys(ACCOUNTING_BREAKS).map((yr) => (
          <ReferenceLine key={yr} x={shortYear(yr)} stroke="#e8a020" strokeDasharray="4 2" label={{ value: "⚠ Standards", fill: "#e8a020", fontSize: 8, fontFamily: "Space Mono" }} />
        ))}
        <Bar dataKey="Net Worth Deficit" fill="#d42b2b" radius={[2,2,0,0]} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── GDP % chart ──────────────────────────────────────────────
export function GdpChart() {
  const data = YEARS.map((y, i) => ({
    year: shortYear(y),
    "Revenue %": +((totalRevenue[i]/gdpEstimate[i])*100).toFixed(1),
    "Expenses %": +((totalExpenses[i]/gdpEstimate[i])*100).toFixed(1),
    "Cash %": +((underlyingCash[i]/gdpEstimate[i])*100).toFixed(1),
    "Centre Rev": 24.8,
    "Centre Exp": 25.2,
  }));
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} />
        <XAxis dataKey="year" tick={FONT_STYLE} axisLine={false} tickLine={false} />
        <YAxis tick={FONT_STYLE} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`} domain={[22,35]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#71717a" }} />
        <ReferenceLine y={0} stroke="#52525b" strokeDasharray="4 2" />
        {Object.keys(ACCOUNTING_BREAKS).map((yr) => (
          <ReferenceLine key={yr} x={shortYear(yr)} stroke="#e8a020" strokeDasharray="4 2" label={{ value: "⚠ Standards", fill: "#e8a020", fontSize: 8, fontFamily: "Space Mono" }} />
        ))}
        <Line dataKey="Revenue %" stroke="#1a7a3a" dot={{ r:3 }} strokeWidth={2} isAnimationActive={false} />
        <Line dataKey="Expenses %" stroke="#d42b2b" dot={{ r:3 }} strokeWidth={2} isAnimationActive={false} />
        <Line dataKey="Cash %" stroke="#e8a020" dot={{ r:3 }} strokeWidth={2} strokeDasharray="5 3" isAnimationActive={false} />
        <Line dataKey="Centre Rev" stroke="#1a7a3a" strokeDasharray="3 3" dot={false} strokeWidth={1} strokeOpacity={0.5} isAnimationActive={false} />
        <Line dataKey="Centre Exp" stroke="#d42b2b" strokeDasharray="3 3" dot={false} strokeWidth={1} strokeOpacity={0.5} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ── Forward Debt Trajectory ──────────────────────────────────
export function ForwardDebtChart() {
  const data = FWD_YEARS.map((y, i) => ({
    year: y.replace("20","'"),
    "Net Debt $B": FWD_NET_DEBT[i],
    isForecast: i >= 8,
  }));
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
        <XAxis dataKey="year" tick={FONT_STYLE} axisLine={false} tickLine={false} />
        <YAxis tick={FONT_STYLE} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}B`} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill:"rgba(255,255,255,0.03)" }} />
        <ReferenceLine x="'24-25(e)" stroke="#e8a020" strokeDasharray="4 2" label={{ value:"FORECAST →", fill:"#e8a020", fontSize:9, fontFamily:"Space Mono" }} />
        <Bar dataKey="Net Debt $B" radius={[2,2,0,0]} fill="#d42b2b" label={false} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ── Inflation + Debt ─────────────────────────────────────────
export function DebtInflChart() {
  const data = YEARS.map((y, i) => ({
    year: shortYear(y),
    "Net Debt $B": +(netDebt[i]/1000).toFixed(0),
    "CPI %": cpiInflation[i],
    "RBA Rate %": rbaCashRate[i],
  }));
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} />
        <XAxis dataKey="year" tick={FONT_STYLE} axisLine={false} tickLine={false} />
        <YAxis yAxisId="left" tick={FONT_STYLE} axisLine={false} tickLine={false} tickFormatter={v=>`$${v}B`} />
        <YAxis yAxisId="right" orientation="right" tick={FONT_STYLE} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontFamily:"'Space Mono',monospace", fontSize:10, color:"#71717a" }} />
        {Object.keys(ACCOUNTING_BREAKS).map((yr) => (
          <ReferenceLine key={yr} x={shortYear(yr)} stroke="#e8a020" strokeDasharray="4 2" label={{ value: "⚠ Standards", fill: "#e8a020", fontSize: 8, fontFamily: "Space Mono" }} />
        ))}
        <Line yAxisId="left" dataKey="Net Debt $B" stroke="#d42b2b" dot={{ r:3 }} strokeWidth={2} isAnimationActive={false} />
        <Line yAxisId="right" dataKey="CPI %" stroke="#e8a020" dot={{ r:3 }} strokeWidth={2} strokeDasharray="5 3" isAnimationActive={false} />
        <Line yAxisId="right" dataKey="RBA Rate %" stroke="#5577cc" dot={{ r:3 }} strokeWidth={2} strokeDasharray="2 3" isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ── Lean score chart (2016-17 onwards; pre-2016 no data) ─────
export function LeanChart() {
  const scores: Record<string, number | null> = {
    "2016-17": 3.2, "2017-18": 2.8, "2018-19": 0.8, "2019-20": 1.5,
    "2020-21": -3.8, "2021-22": -1.8, "2022-23": -2.5, "2023-24": -1.5,
  };
  const data = YEARS.map(y => ({
    year: shortYear(y),
    Score: scores[y] ?? null,
    gov: GOV_BY_YEAR[y],
  }));
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={GRID_COLOR} vertical={false} />
        <XAxis dataKey="year" tick={FONT_STYLE} axisLine={false} tickLine={false} />
        <YAxis tick={FONT_STYLE} axisLine={false} tickLine={false} domain={[-5, 5]} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
        <ReferenceLine y={0} stroke="#e8a020" strokeWidth={2} label={{ value: "CENTRE", fill: "#e8a020", fontSize: 9, fontFamily: "Space Mono" }} />
        <Bar dataKey="Score" radius={[2, 2, 0, 0]} fill="#888" label={false} isAnimationActive={false} />
      </BarChart>
    </ResponsiveContainer>
  );
}
