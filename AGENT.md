# GovCooked AI Agent — "Nemo Claw"

## What It Does
An automated Claude-powered agent that keeps isthisgovcooked.com.au current
without human data entry. Named after the vision of a claw that grabs data
from the internet and verifies it.

## Current Status
Phase 1 — Manual (current): Data updated manually each year
Phase 2 — Semi-automated (next): Agent fetches quarterly ABS/RBA data
Phase 3 — Budget Day (6 months): Agent generates full analysis within hours
Phase 4 — Full automation (12 months): Weekly scraping + scoring + PR creation

## Budget Day Workflow

When Budget is announced (usually May, sometimes March):

### 2 Hours Before (hype build)
Tweet/post: "Budget drops in 2 hours. Here's what we'll be checking..."

### During Budget Speech
Agent is pre-loaded with the budget data PDF

### Within 30 Minutes of Budget
Agent generates full analysis via Claude Opus
Team reviews PR (10-15 min review)
Merge → site updates automatically

### Within 1 Hour
Post: "The verdict — before the spin starts"
Share individual stats as images
AI chatbot updated with new data

## Data Sources Monitored
See lib/agent/config.ts for full list

## How to Trigger Manually
Go to GitHub Actions → "GovCooked Agent — BUDGET DAY"
Enter budget year and URL
Click "Run workflow"

## Review Process
Agent NEVER auto-merges. Always creates a PR.
A human must review and approve before any data goes live.
This is non-negotiable — the agent can make errors.

## Adding New Data Sources
1. Add to DATA_SOURCES in lib/agent/config.ts
2. Create fetcher in scripts/agent/
3. Update score-update.ts to use new data
4. Test with workflow_dispatch
