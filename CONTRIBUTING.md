# Contributing to Is This Gov Cooked?

Thanks for helping make this project better. Here's how.

---

## Verifying the Data

Every figure in `lib/data.ts` and `lib/pm-data.ts` has a comment or source reference. To verify a figure:

1. Find the figure in the relevant `lib/` file.
2. The comment or `sources` array shows the source URL and the specific document/table.
3. Access the source directly (all sources are publicly available).
4. If the figure is wrong, open an issue with:
   - The incorrect value
   - The correct value
   - The source document (URL)
   - The specific page/table/section

We will:

- Respond within 48 hours
- Publish the evidence publicly in the issue
- Update the data if your correction is verified
- Credit you in the commit message

---

## On Political Neutrality in Contributions

We will reject PRs that:

- Apply different methodologies to different parties
- Remove data that makes one party look bad
- Add data that makes one party look good without equivalent treatment for the other
- Change the AI system prompt to be more favourable to any political position

We will accept PRs that:

- Correct factual errors with primary source citations
- Apply the same methodology change to **all** parties equally
- Improve accessibility or user experience
- Add new data years as they become available
- Improve technical performance

The methodology has to be the same for everyone. Leave your party card at the door.

---

## Data Verification (Summary)

If you find a data error:

1. Open a GitHub issue
2. Include the correct figure
3. Include the source document URL and page number
4. We'll fix it within 48 hours

The data lives in `lib/data.ts` (CFS, Fair Centre, fiscal scores) and `lib/pm-data.ts` (Cooked Metre). Every figure should be traceable to an official document.

---

## Adding New Data

As new CFS documents are released (usually December each year), the main task is adding:

- New year to all arrays in `lib/data.ts`
- New entry in `fiscalScores`, `yearDetails`, `politicalLean`
- New ANAO audit finding counts
- Updated forward estimates

For the Cooked Metre, new data may require updates to `lib/pm-data.ts` (scores, sources, explanations). See AGENT.md for the data contract.

---

## Code Contributions

- Fork the repo
- Create a feature branch: `git checkout -b feature/my-improvement`
- Make your changes
- Test: `npm run build` must pass with zero errors
- Open a PR with a clear description

---

## Methodology Disputes

The Fair Centre methodology and Cooked Metre are documented in README.md and PHILOSOPHY.md. If you believe the methodology is flawed, open a GitHub Discussion (not an issue). We welcome rigorous debate — the goal is the most defensible, unbiased analysis possible. Any change to methodology must apply to all parties equally.

---

## What We Won't Accept

- Changes that favour one party over another without clear data justification
- Removal of data that makes either party look bad
- Changes to the AI system prompt that introduce political bias

---

## Code of Conduct

Be direct. Be evidence-based. Leave your party affiliation at the door.
