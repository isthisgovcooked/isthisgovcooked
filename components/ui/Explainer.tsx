"use client";
import { useLevel } from "@/lib/level-context";
import type { ExplanationLevel } from "@/lib/data";

interface ExplainerProps {
  explanations: Record<ExplanationLevel, string>;
  className?: string;
}

const levelStyles: Record<ExplanationLevel, string> = {
  kid:    "text-emerald-300",
  teen:   "text-zinc-200",
  expert: "text-blue-300",
};

export default function Explainer({ explanations, className = "" }: ExplainerProps) {
  const { level } = useLevel();
  return (
    <p className={`text-sm leading-relaxed transition-all duration-300 ${levelStyles[level]} ${className}`}>
      {explanations[level]}
    </p>
  );
}
