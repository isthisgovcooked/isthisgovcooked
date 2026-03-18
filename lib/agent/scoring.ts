/**
 * Scoring logic shared by site and agent.
 * Site uses precomputed fiscalScores in lib/data.ts.
 * Agent uses this to derive scores from raw data or to validate changes.
 */
import type { FiscalScoreInput } from "./types";

export function roundTotal(scores: Omit<FiscalScoreInput, "total" | "grade">): number {
  const { cash, debtChange, accrualGap, nwManage, colOutcome, audit } = scores;
  return Math.round((cash + debtChange + accrualGap + nwManage + colOutcome + audit) * 10 / 6) / 10;
}

export function gradeFromTotal(total: number): FiscalScoreInput["grade"] {
  if (total >= 8.5) return "A";
  if (total >= 7) return "B";
  if (total >= 5.5) return "C";
  if (total >= 4) return "D";
  return "F";
}

export function toFiscalScore(scores: Omit<FiscalScoreInput, "total" | "grade">): FiscalScoreInput {
  const total = roundTotal(scores);
  const grade = gradeFromTotal(total);
  return { ...scores, total, grade };
}
