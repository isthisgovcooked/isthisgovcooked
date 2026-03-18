# The Philosophy Behind Is This Gov Cooked?

This document is for journalists, researchers, policy staff, and anyone who wants to understand the project's intellectual foundations. Same voice as the site: direct, evidence-based, no fluff.

---

## The Information Gap in Australian Democracy

Australians vote in a democracy where the most important inputs to government performance — the actual financial accounts, the auditor's concerns, the gap between what was promised and what was delivered — are either buried in documents nobody reads or reported only through the frame of the government of the day. The information needed to hold power to account exists. It is not accessible. This project exists to close that gap by making primary sources readable and by applying a single, transparent methodology to everyone.

---

## Why Primary Sources Matter

Interpretation is cheap. Anyone can have an opinion. What is scarce is the raw material: the audited accounts, the budget tables, the ANAO findings. We do not add a layer of punditry. We add a layer of *structure* — same categories, same formulas, same sources — so that you can compare year to year and government to government without having to trust our judgment. Where we do make a choice (e.g. the Fair Centre baseline, or the Cooked Metre weights), we document it and apply it identically. You can disagree with the choice; you cannot say we applied it differently to different parties.

---

## The Problem With Media Coverage of Economic Data

When a government announces a budget, journalists have approximately three hours to process 1,200+ pages of Budget Papers before the evening news deadline. The result is that coverage is almost entirely based on the press release — the interpretation the government itself provides.

The ANAO audit reports — which contain the independent auditor's concerns about capitalisation decisions, asset valuations, and accounting practices — are released months later, after the news cycle has moved on. They are almost never covered.

The Commonwealth Consolidated Financial Statements — the actual audited accounts of the Australian Government — are released in November or December each year. They contain the reconciliation between what was promised in the budget and what actually happened. They contain the disclosure of superannuation actuarial movements that can shift net worth by $95 billion in a single year. They are essentially never covered.

This is not a criticism of journalists. It's a structural problem. Complex financial documents + tight deadlines + the need to be accessible to a general audience = simplified narratives that miss the most important detail. This project exists to close that gap. Not by being journalists. By being a permanent, searchable, cited database of the primary sources.

---

## Our Approach to Political Neutrality

We do not have a view on whether higher or lower immigration is good. We do not have a view on climate policy or social policy. We do have a view on three things: (1) The numbers should be public and readable. (2) Governments should be held to what they actually said and did. (3) The same methodology should apply to everyone. So when we score "immigration," we score accountability to *own-stated* forecasts and the measurable impact on housing and per-capita outcomes — not whether migration is good or bad. When we score "deception," we use fact-check databases and promise trackers that apply the same standard to every PM. Neutrality here means *equal treatment*, not the absence of judgment. We judge whether the books are clear, whether promises were kept, and whether the numbers match the rhetoric. We do not judge which party you should vote for.

---

## The Fair Centre Methodology: Full Explanation

The Fair Centre is a baseline for what a fiscally centrist, evidence-based government would do — revenue and expense as a share of GDP, cash balance, debt trajectory — derived from long-run Australian averages, OECD peer averages, and independent structural estimates (e.g. PBO). We then score each year's actual outcome against that baseline. A year can be "left of centre" (higher revenue/spend than the baseline) or "right of centre" (lower). The most centrist year in our 8-year window is 2018-19. Neither major party "wins" on this measure across the full period; Coalition years ran structurally below-centre revenue (deficits even before COVID); Labor years ran above-centre revenue from commodity windfalls but spent most of it. The methodology is in `lib/data.ts`; the numbers are reproducible from the same sources we cite.

**Baseline sources (weighted):** The Fair Centre baseline is derived from three external sources — it does *not* use the midpoint between what Labor and Coalition delivered as a source. Sources: OECD peer average for comparable nations (Canada, NZ, UK, Germany) 60% weight; Australia's own long-run pre-2016 averages (1996–2016) 30% weight; Parliamentary Budget Office structural estimates 10% weight. The party midpoint was tested during methodology development and found to push the "centre" above structurally sustainable levels — both parties have delivered above-average spending relative to OECD peers. The OECD-weighted baseline is more defensible as a true external reference point.

---

## The Cooked Metre: Why Deception Is a Multiplier, Not a Factor

A government that is incompetent but honest is less dangerous than a government that is competent but deceptive. With incompetence, the democratic system can respond — voters and the press can see the failure and react. With deception, voters cannot respond because they do not have accurate information. So we do not just add "deception" as another 15% factor. We use it as a *multiplier* on the whole score: the more a PM breaks promises or makes misleading statements (as measured by fact-checkers and promise trackers), the more their entire score is bumped up. Mathematically: final = min(100, raw × (1 + deception/100 × 0.30)). That way, a PM who is both bad on the substance and deceptive gets a higher score than one who is bad on the substance but relatively honest. The formula is the same for every PM. No special cases.

---

## The Immigration Factor: Why It's Scored on Accountability, Not Policy

We are not scoring whether high or low immigration is good for Australia. We are scoring whether the government *did what it said it would do* and whether the outcome was consistent with the housing and per-capita capacity it claimed to plan for. If a government forecasts ~200,000 NOM and delivers 538,000, and dwelling completions and vacancy rates show a severe shortage, that is a measurable gap between stated and actual. It affects living standards (rents, congestion, per-capita GDP) regardless of your view on optimal migration. So we score: (1) deviation from own-stated NOM forecasts, (2) GDP per capita and housing/per-capita outcomes. We do not score cultural or social dimensions. We do not take a position on the "right" level of immigration. The Morrison period gets a lower immigration score in part because COVID closed borders — we state that as context, not as a credit to "good" immigration management. The Albanese period scores high on this factor because the gap between forecast and actual is large and well documented (ABS, Budget Papers). The framing is: accountability to own targets and to measurable capacity, not ideology.

---

## The Three-Level Explanation System

Not everyone wants the same depth. So every explanation on the site exists at three levels: Plain English (anyone can follow), Straight Talk (facts and numbers without heavy jargon), and Deep Dive (technical terms, source citations, enough to argue with an economist). The same underlying data; you choose the depth. This is implemented via a global level toggle and `Explainer` components keyed by level. We do not dumb down the data at the Plain English level — we simplify the language. The numbers stay the same.

---

## On Open Source as a Democratic Tool

The moment you have to *trust* us, we've failed. So everything is verifiable: code on GitHub, data with source URLs, algorithms documented, AI prompt in the repo. If a politician or journalist says we got something wrong, they can open an issue like anyone else. We publish the evidence and update the data if they're correct. That is how accountability should work — not "trust the experts," but "check the experts." Open source is the mechanism. The commitment is: you never have to take our word for it.

---

## What We're Building Toward

We are building an AI agent that will update the site automatically when new data is released (ABS, RBA, fact-check DBs, Budget Papers). The agent will open a pull request; a human will review and merge. The goal is a permanent, living, maintained public record — always current, always cited. Not a media project. Infrastructure. The same way roads and electricity are infrastructure, accurate primary-source financial data should be infrastructure too. It should just exist. For everyone. For free. See [AGENT.md](AGENT.md) for the technical roadmap.

---

## Limitations and Known Gaps in the Data

We are honest about what we don't know:

- **Lags.** Economic outcomes often take years to show up. Assigning causation to a single government is hard.
- **Counterfactuals.** We cannot know what an alternative government would have done. We can only compare to the baseline and to history.
- **Global factors.** Blaming a PM for global inflation has limits. We note context (e.g. COVID, terms of trade) where relevant.
- **The Cooked Metre is a model.** All models are wrong; some are useful. Ours is useful if it is transparent, source-cited, and applied equally. It will be challenged — we welcome that. If you have better data or a fairer formula, open a Discussion or a PR. The methodology will evolve if the case is made in public.
