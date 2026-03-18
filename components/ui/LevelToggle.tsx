"use client";
import { useLevel } from "@/lib/level-context";
import type { ExplanationLevel } from "@/lib/data";

const LEVELS: { id: ExplanationLevel; label: string }[] = [
  { id: "kid",    label: "Plain English" },
  { id: "teen",   label: "Straight Talk" },
  { id: "expert", label: "Deep Dive" },
];

export default function LevelToggle() {
  const { level, setLevel } = useLevel();

  return (
    <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-700 rounded-full p-1">
      {LEVELS.map((l) => (
        <button
          key={l.id}
          onClick={() => setLevel(l.id)}
          className={`
            flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-mono font-bold
            transition-all duration-200 whitespace-nowrap
            ${level === l.id ? "bg-red-600 text-white" : "text-zinc-500 hover:text-zinc-200"}
          `}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
