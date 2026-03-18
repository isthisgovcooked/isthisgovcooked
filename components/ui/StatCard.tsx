"use client";
import { ReactNode } from "react";
import ShareButton from "@/components/ui/ShareButton";

interface StatCardProps {
  value: string | ReactNode;
  label: string;
  note?: string;
  color?: "red" | "amber" | "green" | "blue" | "white";
  size?: "sm" | "md" | "lg";
  shareText?: string;
}

const colorMap = {
  red:   "text-red-500",
  amber: "text-amber-400",
  green: "text-emerald-400",
  blue:  "text-blue-400",
  white: "text-white",
};

const sizeMap = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-5xl md:text-6xl",
};

export default function StatCard({
  value, label, note,
  color = "red", size = "md", shareText,
}: StatCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-5 flex flex-col gap-1">
      <div className={`font-display leading-none ${colorMap[color]} ${sizeMap[size]}`}>
        {value}
      </div>
      <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest leading-tight mt-1">
        {label}
      </div>
      {note && (
        <div className="font-mono text-xs text-zinc-600 mt-0.5">{note}</div>
      )}
      {shareText && (
        <div className="mt-2 flex justify-end">
          <ShareButton text={shareText} />
        </div>
      )}
    </div>
  );
}
