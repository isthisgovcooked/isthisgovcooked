"use client";

import { motion } from "framer-motion";

interface GaugeProps {
  /** Final score 0–100 (after deception multiplier) */
  value: number;
  /** Label e.g. "Cooked", "Well Cooked" */
  label: string;
  /** Optional Tailwind class for label text colour (e.g. text-amber-400) */
  labelClassName?: string;
  /** Raw score before deception multiplier */
  rawScore?: number;
  /** Deception add-on e.g. +8 for "adds 8 points" */
  deceptionAdd?: number;
  /** Source confidence A/B/C — shown as High/Medium/Low */
  confidence?: "A" | "B" | "C";
  className?: string;
}

const MOTION = { type: "spring" as const, stiffness: 70, damping: 22 };

// Needle: vertical line (points up at 0deg). Score 0 = left (-90deg), 50 = up (0deg), 100 = right (90deg)
function valueToDegrees(value: number): number {
  const clamped = Math.max(0, Math.min(100, value));
  return -90 + (clamped / 100) * 180;
}

// Gradient along arc: 0-20 green, 20-40 lighter green, 40-60 amber, 60-75 orange, 75-100 red
const ARC_COLORS = [
  { offset: 0, color: "#1a7a3a" },
  { offset: 20, color: "#5aaa2a" },
  { offset: 40, color: "#e8a020" },
  { offset: 60, color: "#e05010" },
  { offset: 75, color: "#d42b2b" },
  { offset: 100, color: "#d42b2b" },
];

const R = 140;
const CX = 150;
const CY = 150;

const CONFIDENCE_LABEL: Record<"A" | "B" | "C", string> = {
  A: "High",
  B: "Medium",
  C: "Low",
};

export default function Gauge({
  value,
  label,
  labelClassName,
  rawScore,
  deceptionAdd,
  confidence,
  className = "",
}: GaugeProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const needleAngle = valueToDegrees(clamped);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="relative w-[300px] max-w-[min(300px,85vw)] aspect-[2/1]">
        <svg
          viewBox="0 0 300 150"
          className="w-full h-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="gauge-arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              {ARC_COLORS.map(({ offset, color }) => (
                <stop key={offset} offset={`${offset}%`} stopColor={color} />
              ))}
            </linearGradient>
          </defs>
          {/* Semicircle arc (180°) — path from left (0) to right (100) */}
          <path
            d={`M ${CX - R} ${CY} A ${R} ${R} 0 0 1 ${CX + R} ${CY}`}
            fill="none"
            stroke="url(#gauge-arc-gradient)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Center dot (needle pivot) */}
          <circle cx={CX} cy={CY} r={4} fill="#333" />
        </svg>
        {/* Needle: rotates 0.8s ease. 0° = left (score 0), 180° = right (score 100) */}
        <div
          className="absolute left-1/2 top-1/2 w-0 h-0 pointer-events-none"
          style={{
            transform: `translate(-50%, -50%) rotate(${needleAngle}deg)`,
            transition: "transform 0.8s ease-out",
          }}
        >
          <div
            className="w-[3px] h-[132px] bg-white rounded-full shadow-lg -translate-y-full"
            style={{ maxHeight: "min(132px, 38vw)" }}
          />
        </div>

        {/* Center display: score + label + raw | deception */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-6">
          <motion.span
            key={value}
            initial={{ opacity: 0.7, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="font-display text-5xl sm:text-6xl leading-none text-white"
          >
            {Math.round(clamped)}
          </motion.span>
          <span className={`font-display text-sm sm:text-base uppercase tracking-widest mt-1 ${labelClassName ?? "text-zinc-400"}`}>
            {label}
          </span>
          {rawScore != null && deceptionAdd != null && (
            <span className="font-mono text-xs text-zinc-500 mt-2">
              Raw: {Math.round(rawScore)} | Deception adds: +{Math.round(deceptionAdd)}
            </span>
          )}
          {confidence && (
            <span
              className="font-mono text-xs text-zinc-600 mt-1"
              title="Source confidence refers to data availability, not the score"
            >
              Source confidence: {CONFIDENCE_LABEL[confidence]}
            </span>
          )}
        </div>
      </div>

      {/* Outer labels */}
      <div className="w-full max-w-[300px] flex justify-between px-2 mt-1 font-mono text-[10px] text-zinc-500 uppercase">
        <span>Not Cooked</span>
        <span>Getting Warm</span>
        <span>Cooked</span>
      </div>
    </div>
  );
}
