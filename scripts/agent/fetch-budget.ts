#!/usr/bin/env npx tsx
/**
 * Fetch Budget Papers for a given year. Used on Budget Day workflow.
 * Env: BUDGET_URL, BUDGET_YEAR, ANTHROPIC_API_KEY (optional for fetch-only).
 */
const budgetUrl = process.env.BUDGET_URL || "https://budget.gov.au";
const budgetYearEnv = process.env.BUDGET_YEAR || "2025-26";
console.error("GovCooked Agent: fetch-budget (stub) —", budgetYearEnv, budgetUrl);
// TODO: fetch budget.gov.au, extract key tables (BP1), output raw text/JSON for generate-analysis
process.stdout.write(JSON.stringify({ year: budgetYearEnv, url: budgetUrl, raw: "" }));
