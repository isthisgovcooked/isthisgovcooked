export type ExplanationLevel = "kid" | "teen" | "expert";

export interface FiscalScoreInput {
  cash: number;
  debtChange: number;
  accrualGap: number;
  nwManage: number;
  colOutcome: number;
  audit: number;
  total: number;
  grade: "A" | "B" | "C" | "D" | "F";
}

export interface BudgetDayAnalysis {
  yearKey: string;
  headline: string;
  keyFlag: string;
  scores: FiscalScoreInput;
  explanations: Record<ExplanationLevel, string>;
  bookTricks: Array<{
    name: string;
    amount: string;
    explanations: Record<ExplanationLevel, string>;
  }>;
  redFlags: string[];
  cookedMetreImpact: {
    factorsChanged: string[];
    scoreDirection: "improving" | "worsening" | "neutral";
    reasoning: string;
  };
  shareableStats: string[];
}

export interface WeeklyUpdateResult {
  updates: Array<{
    factor: string;
    oldScore: number;
    newScore: number;
    reason: string;
    dataPoint: string;
    sourceUrl: string;
  }>;
  noChanges: string[];
  nextReviewTrigger: string;
}

export interface DataSourceConfig {
  id: string;
  name: string;
  url: string;
  apiEndpoint?: string;
  frequency: string;
  factorAffected: string[];
  lastFetched: string | null;
  budgetDayTrigger?: boolean;
}
