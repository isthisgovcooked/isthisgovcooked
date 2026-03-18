#!/usr/bin/env npx tsx
/**
 * Recalculate scores from new data. Reads stdin or env for fetch output.
 * Optionally calls Claude (WEEKLY_DATA_UPDATE_PROMPT) and then patches lib/data.ts.
 * In CI we only run this after fetch-abs; create-pr creates the PR.
 */
console.error("GovCooked Agent: score-update (stub) — no score changes applied");
// TODO: read fetch output, call Anthropic with WEEKLY_DATA_UPDATE_PROMPT if ANTHROPIC_API_KEY set,
// then diff fiscalScores and optionally write lib/data.ts (or output patch for create-pr)
process.exit(0);
