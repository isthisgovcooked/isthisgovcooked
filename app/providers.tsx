"use client";
import { LevelProvider } from "@/lib/level-context";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <LevelProvider>{children}</LevelProvider>;
}
