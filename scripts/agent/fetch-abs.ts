#!/usr/bin/env npx tsx
/**
 * Fetch latest ABS data (CPI, WPI, GDP, NOM).
 * Writes raw JSON to stdout or a temp file for score-update.ts to consume.
 */
import { DATA_SOURCES } from "../../lib/agent/config";

const absSources = DATA_SOURCES.filter((s) => s.id.startsWith("abs_"));
console.error("GovCooked Agent: fetch-abs (stub) — would fetch", absSources.map((s) => s.id).join(", "));
// TODO: call ABS API, normalize to annual/quarterly series, output JSON
process.stdout.write(JSON.stringify({ fetched: [], sources: absSources.map((s) => s.id) }));
