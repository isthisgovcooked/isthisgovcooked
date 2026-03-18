# 🇦🇺 Is This Gov Cooked?

**[isthisgovcooked.com.au](https://isthisgovcooked.com.au)** — 25 years of Australian Government Finances, explained for everyone.

From Howard's debt-free Australia to today's $595B net debt. 7 Prime Ministers. All scored on the same algorithm. No spin. No party loyalty. Just the numbers.

---

## What This Is

A public accountability tool that:

- **Shows 25 years of verified financial data** (1999-2000 to 2023-24) from the Department of Finance's Commonwealth Consolidated Financial Statements, Final Budget Outcomes, and ABS data
- **Scores all 7 Prime Ministers** (Howard through Albanese) on 8 identical factors using a transparent, challengeable algorithm
- **Exposes 5 accounting strategies** that every government uses to make the books look better — with specific examples from each era
- **Reverse-engineers a "Fair Centre" baseline** — what evidence-based centrist governance would actually look like, scored against all 25 years
- **Covers forward estimates** from the 2024-25 and 2025-26 Budgets — what's locked in through 2028-29
- **Connects government decisions to your cost of living** — mortgages, inflation, rent, wages, future taxes
- **Includes an AI chatbot** powered by Claude with all 25 years of data loaded — ask anything
- **Presents everything at 3 levels**: Plain English / Straight Talk / Deep Dive

### The Cooked Metre

Every PM from Howard to Albanese scored on:
- Economic management (per capita, not headline)
- Cost of living outcomes
- Fiscal responsibility
- Immigration management vs own forecasts
- Wages & workers
- Honesty & accountability (acts as a multiplier)
- Governance & integrity
- Long-term damage

**Deception is a multiplier** — not just another factor. A PM who manages well but lies about it gets penalised across all scores.

Current scores: Howard 39 | Turnbull 44 | Rudd 51 | Gillard 58 | Abbott 65 | Albanese 68 | Morrison 72

All methodology documented and challengeable via GitHub Issues.

---

## The Problem

Australians are making political decisions based on how the media *frames* numbers, not the numbers themselves. The news says "the government delivered a surplus." Nobody explains that the accrual surplus was $10B but the cash deficit was $15.8B. Nobody explains what a surplus is. Nobody explains the $85B in off-budget spending that doesn't appear in the headline figure. Politicians cite whichever number makes them look best; the opposition cites a different number. Both numbers are technically real. Neither tells the full story.

When a government announces a budget, journalists have roughly three hours to process 1,200+ pages of Budget Papers before the evening deadline. Coverage is almost entirely based on the press release — the interpretation the government provides. The ANAO audit reports — which flag concerns about capitalisation decisions, asset valuations, and accounting practices — are released months later, after the news cycle has moved on. They are almost never covered. The Commonwealth Consolidated Financial Statements, which contain the reconciliation between what was promised and what actually happened (and disclosures like the $95B superannuation actuarial movement), are released in November or December. They are essentially never covered.

The result: Australians vote based on vibes, media spin, and which politician they find least annoying — not on what actually happened to the country's finances, cost of living, or long-term trajectory. This site exists to fix that.

---

## Funding & Independence

This site is self-funded by its creator. There is no advertising. No political donations. No government funding. No corporate backing.

Running costs: approximately $10–20/month (Cloudflare Pages hosting, domain registration). No revenue is generated from this site.

The AI chatbot requires users to provide their own Anthropic API key. No API keys are stored on any server associated with this project.

All code is open source and publicly auditable on GitHub. All data is from publicly available government documents.

If this changes — if the project ever accepts funding from any source — it will be disclosed on the About page and here immediately and prominently.

---

## Getting Started

```bash
git clone https://github.com/isthisgovcooked/isthisgovcooked.git
cd isthisgovcooked
npm install
npm run dev
```

Runs at `http://localhost:3000`. Production build: `npm run build`.

The AI chatbot is free for all users — powered by Groq (Llama 3.1) via a Cloudflare Worker proxy. No API key required from users. See `worker/chat-proxy.js` for the proxy setup and `components/sections/Chat.tsx` for the frontend.

---

## How It's Built

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Motion:** Framer Motion
- **Data:** `lib/data.ts` (CFS, fiscal scores, Fair Centre), `lib/pm-data.ts` (Cooked Metre)

---

## The Fair Centre Methodology

Documented in `lib/data.ts`. The baseline is built from three external sources (party midpoint is *not* used):

1. OECD peer averages (Canada, NZ, UK, Germany) — 60% weight
2. Australia's long-run pre-2016 averages (1996–2016) — 30% weight
3. Parliamentary Budget Office structural estimates — 10% weight

Centre targets: revenue 24.8% GDP, expense 25.2% GDP, cash balance −0.4% GDP, net debt &lt;20% GDP. Political lean runs from −10 (left of centre) to +10 (right of centre); 0 = centrist. Implementation: `CENTRE`, `CENTRE_METHODOLOGY_NOTE`, `politicalLean`, `fiscalScores` in `lib/data.ts`.

---

## The Cooked Metre Methodology

The Cooked Metre scores Prime Ministers on eight factors. **The same algorithm is applied to every PM — no special cases.**

**Formula:**

1. **Raw score** = weighted average of 8 factors (each 0–100, higher = worse):
   - Economic Reality 18%, Cost of Living 18%, Fiscal 15%, Immigration 12%, Wages 10%, Deception 15%, Governance 7%, Long-term Damage 5%.

2. **Deception multiplier** = 1 + (deception_score / 100 × 0.30).  
   Deception can add up to 30% to the final score (a lying PM gets their *entire* score bumped, not just one sub-score).

3. **Final score** = min(100, raw_score × deception_multiplier).

Implemented in `lib/pm-data.ts`: `FACTOR_WEIGHTS`, `computeDeceptionMultiplier()`, `computeFinalScore()`. Economic metrics are **per capita** (GDP per capita, not headline GDP). Immigration is scored on **accountability to own-stated forecasts** and housing/per-capita impact — not on whether migration is "good" or "bad." See [PHILOSOPHY.md](PHILOSOPHY.md) for rationale.

---

## Data Sources

| Source | URL |
|--------|-----|
| Commonwealth Consolidated Financial Statements 1999–2024 (25 years) | https://finance.gov.au/publications/commonwealth-consolidated-financial-statements |
| ANAO Financial Statement Audit | https://www.anao.gov.au/work/financial-statement-audit |
| Budget Papers | https://budget.gov.au |
| Historical CFS (data.gov.au) | https://data.gov.au/data/dataset/australian-government-consolidated-financial-statements-tables-and-data |
| ABS National Accounts (per capita) | https://www.abs.gov.au/statistics/economy/national-accounts/australian-national-accounts-national-income-expenditure-and-product/latest-release |
| ABS CPI | https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia/latest-release |
| ABS Wage Price Index | https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/wage-price-index-australia/latest-release |
| ABS Overseas Migration | https://www.abs.gov.au/statistics/people/population/overseas-migration/latest-release |
| RMIT ABC FactLab | https://www.rmit.edu.au/about/schools-colleges/media-and-communication/journalism/factlab |
| ABC Fact Check | https://www.abc.net.au/news/factcheck |
| Robodebt Royal Commission | https://www.royalcommission.gov.au/robodebt |

Figures in `lib/data.ts` and `lib/pm-data.ts` reference these sources. Verify any claim by following the citation.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Summary:

- **Data errors:** Open an issue with the correct figure, source URL, and page/table. We fix within 48 hours and credit you.
- **Methodology changes:** Must apply to *all* parties equally. No PRs that favour one side or remove data that disadvantages one side.
- **Code:** Fork, branch, `npm run build` must pass, open a PR.

---

## Open Source Commitment

You should never have to trust us. You should be able to verify us. Every data point is cited. The AI prompt is in the source. The scoring algorithms are in the repo. If a politician or journalist claims we're wrong, they can raise an issue like anyone else; we'll publish the evidence and update the data if they're correct.

---

## License

MIT — see [LICENSE](LICENSE). Australian Government data used under applicable open data terms (e.g. data.gov.au, CC BY where stated).

---

## Disclaimer

This project is not affiliated with the Australian Government, any political party, or any media organisation. All data is from official public documents. Fiscal scores and the Cooked Metre are produced by a single, documented methodology applied identically to all parties. Reasonable people may apply different weightings. If you believe any data is incorrect, raise a GitHub issue with the source document and we will correct it.
