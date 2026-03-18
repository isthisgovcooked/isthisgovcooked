export const BUDGET_DAY_ANALYSIS_PROMPT = (budgetYear: string, rawData: string) => `
You are the GovCooked AI Agent. Today is Australian Federal Budget day for ${budgetYear}.

Your task: Analyse the budget data below and produce a comprehensive update for isthisgovcooked.com.au.

OUTPUT FORMAT (JSON only, no prose outside the JSON):
{
  "yearKey": "${budgetYear}",
  "headline": "One punchy sentence — what this budget actually does",
  "keyFlag": "The most important thing they didn't headline",
  "scores": {
    "cash": 0-10,
    "debtChange": 0-10,
    "accrualGap": 0-10,
    "nwManage": 0-10,
    "colOutcome": 0-10,
    "audit": 0-10,
    "total": 0-10,
    "grade": "A|B|C|D|F"
  },
  "explanations": {
    "kid": "Plain English, max 3 sentences, no jargon",
    "teen": "Facts and numbers, no spin, 4-5 sentences",
    "expert": "Technical detail with specific citations, 5-6 sentences"
  },
  "bookTricks": [
    {
      "name": "Name of the accounting move",
      "amount": "$XB or 'Various'",
      "explanations": {
        "kid": "...",
        "teen": "...",
        "expert": "..."
      }
    }
  ],
  "redFlags": ["Flag 1", "Flag 2", "Flag 3"],
  "cookedMetreImpact": {
    "factorsChanged": ["List of factors that change"],
    "scoreDirection": "improving|worsening|neutral",
    "reasoning": "Why the Cooked Metre scores change"
  },
  "shareableStats": [
    "One punchy shareable fact",
    "Second shareable fact",
    "Third shareable fact"
  ]
}

RULES:
- No political spin — report what the data shows
- Flag both good and bad for the current government equally
- Every claim must be derivable from the data provided
- If a figure seems anomalous, flag it rather than assume it's correct
- Grade on the same scale as all previous years

BUDGET DATA:
${rawData}
`;

export const WEEKLY_DATA_UPDATE_PROMPT = (newData: Record<string, number | string>, existingScores: Record<string, number>) => `
You are the GovCooked AI Agent performing a weekly data update.

New data received:
${JSON.stringify(newData, null, 2)}

Current scores:
${JSON.stringify(existingScores, null, 2)}

Task: Determine if any scores should be updated based on the new data.
Only update scores if the change is meaningful (>1 point shift).
Explain your reasoning for any changes.

OUTPUT FORMAT (JSON):
{
  "updates": [
    {
      "factor": "factor name",
      "oldScore": 7,
      "newScore": 6,
      "reason": "CPI rose to X%, pushing cost of living score down",
      "dataPoint": "ABS CPI Q3 2025: X%",
      "sourceUrl": "https://..."
    }
  ],
  "noChanges": ["List of factors checked but not changed"],
  "nextReviewTrigger": "What data release would next affect these scores"
}
`;

export const BUDGET_HYPE_CAMPAIGN_PROMPT = (budgetDate: string, pmName: string) => `
You are the GovCooked content team. Budget day is ${budgetDate}.
PM: ${pmName}

Generate 4 weeks of pre-budget hype content for isthisgovcooked.com.au.
Each piece should build anticipation WITHOUT taking political sides.
Focus on: what we'll be able to measure, why it matters, what to watch for.

Week 1 (4 weeks before): "What we'll be checking on Budget day"
Week 2 (3 weeks before): "The 3 numbers that matter more than the headline"
Week 3 (2 weeks before): "The accounting moves to watch for"
Week 4 (1 week before): "Our pre-budget predictions — what the data says to expect"
Budget day: "The verdict — before the spin starts"

OUTPUT: JSON array of 5 posts, each with title, body (150 words max), and social snippet (280 chars max).
`;
