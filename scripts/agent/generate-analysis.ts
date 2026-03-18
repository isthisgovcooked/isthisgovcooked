#!/usr/bin/env npx tsx
/**
 * Generate full Budget Day analysis using Claude and BUDGET_DAY_ANALYSIS_PROMPT.
 * Reads budget raw data from fetch-budget output or env. Writes analysis JSON
 * and optionally patches lib/data.ts + yearDetails.
 */
const budgetYear = process.env.BUDGET_YEAR || "2025-26";
console.error("GovCooked Agent: generate-analysis (stub) —", budgetYear);
// TODO: read raw budget data, call Anthropic BUDGET_DAY_ANALYSIS_PROMPT, parse JSON,
// then output analysis and/or patch data.ts
process.stdout.write(JSON.stringify({ yearKey: budgetYear, headline: "(stub)", scores: {} }));
process.exit(0);
