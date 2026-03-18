"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import type { ExplanationLevel } from "@/lib/data";

interface LevelContextType {
  level: ExplanationLevel;
  setLevel: (l: ExplanationLevel) => void;
}

const LevelContext = createContext<LevelContextType>({
  level: "teen",
  setLevel: () => {},
});

export function LevelProvider({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState<ExplanationLevel>("teen");
  return (
    <LevelContext.Provider value={{ level, setLevel }}>
      {children}
    </LevelContext.Provider>
  );
}

export const useLevel = () => useContext(LevelContext);
