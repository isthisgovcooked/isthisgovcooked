#!/usr/bin/env npx tsx
/**
 * Fetch ANAO audit findings (financial statement audit).
 */
import { DATA_SOURCES } from "../../lib/agent/config";

const anao = DATA_SOURCES.find((s) => s.id === "anao_audit");
console.error("GovCooked Agent: fetch-anao (stub) — would fetch", anao?.url);
process.stdout.write(JSON.stringify({ fetched: false, source: "anao_audit" }));
