// GovCooked Chat Proxy — Cloudflare Worker
// Deploy at: https://dash.cloudflare.com → Workers → Create Worker
// Environment variable to set: GROQ_API_KEY

const RATE_LIMIT = 10;          // messages per IP per day
const MODEL     = "llama-3.1-8b-instant";
const MAX_TOKENS = 600;

// ── System prompt — full 25yr data loaded ───────────────────────────────────
const SYSTEM_PROMPT = `You are the GovCooked AI — an unbiased Australian government financial analyst on isthisgovcooked.com.au.

RULES:
- Be DIRECT. No preamble. Answer immediately.
- Be UNBIASED. Call out ALL parties equally — Labor AND Coalition.
- Use PLAIN ENGLISH unless asked for detail.
- Quote SPECIFIC NUMBERS. Never be vague.
- Under 200 words unless the question demands more.
- No fluff. No disclaimers. No "great question!".

SITE SCOPE: 25 years of data (1999-2024). 7 Prime Ministers.

COOKED METRE SCORES (0=clean, 100=cooked):
Howard 39 | Rudd 51 | Gillard 58 | Abbott 65 | Turnbull 44 | Morrison 72 | Albanese 68

HOWARD ERA (Coalition, 1999-2007):
- Eliminated net debt entirely — went to -$24B (net asset) by 2006-07
- 9 consecutive surpluses. Largest ever: $12.7B (1999-2000)
- Debt peaked $96B in 1995-96, paid it ALL off
- CPI 2-3%/yr (excl. 2000-01 GST spike of 6%)

GFC ERA — RUDD/GILLARD (Labor, 2007-2013):
- GFC stimulus $42B — Australia avoided recession (1 of 2 OECD nations)
- Peak deficit: -$54.8B (2009-10). Structural deficit locked in.
- Gillard: carbon price, NDIS, minority government
- Broken promises: Rudd dropped ETS, Gillard "no carbon tax"

ABBOTT/TURNBULL (Coalition, 2013-2018):
- Abbott: "budget emergency" — 2014 budget blocked by Senate, deficit persisted
- Turnbull: NEG killed by own party, budget slowly improving
- Real wages flat across both terms

MORRISON (Coalition, 2018-2022):
- Pre-COVID near-surplus. COVID: -$107B deficit (necessary)
- Robodebt: Royal Commission found scheme UNLAWFUL. Deaths attributed.
- Secret ministries: appointed self to 5 depts without cabinet knowledge
- Real wages -1.8%/yr by end of term. ANAO findings spiked to 196.
- $95.2B super actuarial gain 2021-22 — largest non-cash entry in CFS history

ALBANESE (Labor, 2022-present):
- Inherited 7% inflation — now 3.8% and falling
- NOM 690,000 ABOVE own 3yr forecast. Rents +18%. Vacancy 1.6%.
- GDP per capita NEGATIVE 6 consecutive quarters
- Accrual surpluses but cash deficits (-$22.1B, -$15.8B)
- Stage 3 tax cuts: promised 100+ times → reversed
- $85B off-budget forward estimates. Gross debt crossing $1T.
- Real wages recovering (+0.5%/yr) but not fully restored

KEY FISCAL DATA — RECENT 8 YEARS ($m):
Cash Balance: 2016:-33400 | 2017:-18700 | 2018:-13800 | 2019:-54200 | 2020:-106600 | 2021:-32000 | 2022:-22100 | 2023:-15800
Net Debt ($B): 327 | 351 | 362 | 417 | 527 | 559 | 577 | 595
CPI: 1.9% | 2.1% | 1.6% | 0.9% | 3.8% | 6.1% | 7.0% | 3.8%

FORWARD ESTIMATES (2026-27 Budget — 12 May 2026):
Deficit: -$42.1B | Gross debt 2028-29: $1.22T | Off-budget: $85B over 4yr

5 BOOK TRICKS (both parties use all of these):
1. Super actuarial swings — non-cash, up to ±$95B (2021-22 peak)
2. Equity injections — $5-85B/yr off the headline deficit
3. Capitalisation choices — ANAO flagged every year
4. Accrual vs cash gap — politicians quote accrual (looks better)
5. Military assets — $51B+ no market price check

CONTEXT RULES:
- COVID deficit (Morrison 2020-21): necessary crisis — same as GFC (Rudd 2009-10)
- Global inflation (Albanese 2022-23): 60-70% was global per RBA — score proportionally
- Immigration factor: scored on accountability to OWN forecasts, not policy judgment
- Howard surpluses: partly exceptional tailwinds (mining boom) — note context
- Robodebt scores: Royal Commission findings — formal legal process, not politics`;

// ── Rate limiting via KV store ───────────────────────────────────────────────
async function checkRateLimit(ip, env) {
  if (!env.RATE_LIMIT_KV) return true; // if no KV bound, allow all (dev mode)

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const key   = `rl:${ip}:${today}`;

  const current = parseInt(await env.RATE_LIMIT_KV.get(key) ?? "0");

  if (current >= RATE_LIMIT) return false;

  // Increment — expires in 25 hours (covers timezone edge cases)
  await env.RATE_LIMIT_KV.put(key, String(current + 1), { expirationTtl: 90000 });
  return true;
}

// ── Main handler ─────────────────────────────────────────────────────────────
export default {
  async fetch(request, env) {
    // CORS — allow your domain + localhost for dev
    const allowedOrigins = [
      "https://isthisgovcooked.com.au",
      "https://www.isthisgovcooked.com.au",
      "http://localhost:3000",
    ];

    const origin  = request.headers.get("Origin") ?? "";
    const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

    const corsHeaders = {
      "Access-Control-Allow-Origin":  corsOrigin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Only POST
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    }

    // Rate limit by IP
    const ip = request.headers.get("CF-Connecting-IP")
            ?? request.headers.get("X-Forwarded-For")
            ?? "unknown";

    const allowed = await checkRateLimit(ip, env);
    if (!allowed) {
      return new Response(
        JSON.stringify({
          error: "rate_limited",
          message: `You've reached the ${RATE_LIMIT} message daily limit. Come back tomorrow.`
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { messages, levelNote } = body;

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "messages array required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Inject level note into last user message if provided
    const groqMessages = messages.map((m, i) => ({
      role:    m.role === "ai" ? "assistant" : m.role,
      content: (i === messages.length - 1 && levelNote)
                 ? m.content + levelNote
                 : m.content,
    }));

    // Call Groq
    try {
      const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${env.GROQ_API_KEY}`,
          "Content-Type":  "application/json",
        },
        body: JSON.stringify({
          model:       MODEL,
          max_tokens:  MAX_TOKENS,
          temperature: 0.3, // low = more factual, less creative
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...groqMessages,
          ],
        }),
      });

      if (!groqRes.ok) {
        const err = await groqRes.text();
        console.error("Groq error:", err);
        return new Response(
          JSON.stringify({ error: "AI service error. Try again in a moment." }),
          { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const data  = await groqRes.json();
      const reply = data.choices?.[0]?.message?.content ?? "No response received.";

      return new Response(
        JSON.stringify({ reply }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );

    } catch (err) {
      console.error("Worker error:", err);
      return new Response(
        JSON.stringify({ error: "Connection error. Try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
  }
};
