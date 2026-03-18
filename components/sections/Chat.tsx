"use client";
import { useState, useRef, useEffect } from "react";
import { useLevel } from "@/lib/level-context";
import Subscribe from "@/components/ui/Subscribe";

interface Message { role: "user" | "ai"; content: string; }

const SYSTEM_PROMPT = `You are the GovCooked AI — an unbiased Australian government financial analyst on isthisgovcooked.com.au.

RULES:
- Be DIRECT. No preamble. Answer immediately.
- Be UNBIASED. Call out ALL parties equally — Labor, Coalition, all PMs.
- Use PLAIN ENGLISH. Explain jargon when needed.
- Quote SPECIFIC NUMBERS. Never be vague.
- Under 250 words unless the question demands more.
- No fluff. No disclaimers. No "great question!".

SITE SCOPE: 25 years of data (1999-2024) + forward estimates to 2028-29.
7 Prime Ministers: Howard (1999-2007), Rudd (2007-10, 2013), Gillard (2010-13),
Abbott (2013-15), Turnbull (2015-18), Morrison (2018-22), Albanese (2022-present).

KEY HISTORICAL DATA — HOWARD ERA (Coalition, surplus years):
Net debt ELIMINATED by 2006-07 (went to -$24B net asset). 9 consecutive surpluses.
Largest surplus in history: 1999-2000 ($12.7B cash). Net debt peak was $96B in 1995-96.
Cooked Metre score: 39/100 ("A Bit Warm") — best in dataset.

GFC ERA — RUDD/GILLARD (Labor, 2007-2013):
GFC stimulus: $42B — Australia avoided recession (one of 2 OECD nations to do so).
Peak deficit: -$54.8B (2009-10, -4.2% GDP). Structural deficit locked in.
Rudd Cooked Metre: 51. Gillard Cooked Metre: 58.

RECENT ERA — ABBOTT/TURNBULL/MORRISON (Coalition, 2013-2022):
Abbott: 'budget emergency' — 2014 budget blocked by Senate, deficit persisted.
Morrison: COVID $107B deficit (necessary). Robodebt RC: unlawful. Secret ministries.
Morrison Cooked Metre: 72/100 ("Cooked") — highest in dataset.

CURRENT — ALBANESE (Labor, 2022-present):
Immigration: 690,000 ABOVE own forecast over 3 years. Rents +18%.
Accrual surpluses but cash deficits. $85B off-budget forward estimates.
GDP per capita NEGATIVE 6 consecutive quarters — growth was population, not productivity.
Stage 3 tax cuts: promised 100+ times → reversed.
Albanese Cooked Metre: 68/100 ("Cooked").

KEY FISCAL DATA — RECENT 8 YEARS (AUD millions):
Underlying Cash Balance: 2016-17:-33,400 | 2017-18:-18,700 | 2018-19:-13,800 | 2019-20:-54,200 | 2020-21:-106,600 | 2021-22:-32,000 | 2022-23:-22,100 | 2023-24:-15,800
Net Op Balance (Accrual): -36,939 / -8,142 / +1,371 / -34,001 / -84,381 / +28,420 / +24,900 / +10,008
Net Debt ($B): 327 / 351 / 362 / 417 / 527 / 559 / 577 / 595
CPI Inflation: 1.9% / 2.1% / 1.6% / 0.9% / 3.8% / 6.1% / 7.0% / 3.8%
ANAO Findings: 57/57/55/55/57/175/196/214 (significant: 0/0/0/0/0/1/9/6)

FORWARD ESTIMATES (2025-26 Budget):
Cash Deficit 2025-26: -$42.1B | Gross debt by 2028-29: $1.22T (first $1T ever)
Off-budget spending: $85B over 4yr (doesn't appear in headline deficit)
Spending % GDP peaks 28.5% next year — highest since WWII excluding COVID

COOKED METRE SCORES (0=not cooked, 100=absolutely cooked):
Howard: 39 | Rudd: 51 | Gillard: 58 | Abbott: 65 | Turnbull: 44 | Morrison: 72 | Albanese: 68
Method: 8 factors, weighted avg, then deception multiplier (up to +30% penalty for dishonesty)
Key: Morrison highest due to Robodebt RC findings + secret ministries (documented facts, not opinion)
Key: Albanese 68 mainly from immigration accountability gap (690K above own forecast)

5 KEY BOOK TRICKS (both parties use all of these):
1. Superannuation actuarial swings — non-cash, up to ±$95B (2021-22 biggest — $95.2B gain)
2. Equity injections off-P&L — $5B-$85B/yr hidden from headline deficit
3. Capitalisation choices — ANAO flagged every year
4. Accrual vs cash gap — $10-50B difference annually (politicians quote accrual)
5. Military asset valuation — $51B+ with no market price check, ANAO KAM every year

FAIR CENTRE BASELINE: Revenue 24.8% GDP, Expenses 25.2% GDP
Howard years: near-centre fiscally. Both Labor and Coalition since 2013: left-of-centre on spending.
Most centrist year in 25-year dataset: 2006-07 (Howard, net debt eliminated, fiscally sound).
Most centrist in the 2016-2024 subset: 2018-19 (near-balance, least book tricks).

CONTEXT RULES (apply these always):
- COVID (2020-21 Morrison): necessary crisis spending — not ideology. Same as GFC (2009-10 Rudd).
- Global inflation (2022-23 Albanese): 60-70% was global supply-chain driven per RBA. Score proportionally.
- Immigration factor: scored on ACCOUNTABILITY TO OWN FORECASTS — not a statement about immigration policy.
- Howard surpluses: partly exceptional tailwinds (mining boom, China demand) — note this context.
- Robodebt scores: based on Royal Commission findings — a formal legal process, not political opinion.`;

const SUGGESTIONS = [
  "Which PM had the best fiscal record?",
  "How did Howard eliminate Australia's debt?",
  "Was the GFC spending justified?",
  "Compare Morrison vs Albanese on cost of living",
  "What's the real 2025-26 deficit after off-budget spending?",
  "Rate all 7 PMs from best to worst",
  "Why is Australia's net worth still negative after Howard's surpluses?",
  "How does the Cooked Metre score work?",
];

export default function ChatSection() {
  const { level } = useLevel();
  const [apiKey, setApiKey] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role:"ai", content:"G'day. I'm the GovCooked AI. **25 years** of Australian government data loaded — from Howard's surpluses to today's debt. **7 Prime Ministers** scored. Ask me anything — I'll give it to you straight. No spin, no party loyalty, no fluff." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const history = useRef<{ role:string; content:string }[]>([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const chatBox = bottomRef.current?.closest(".chat-scroll-container");
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    } else {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages]);

  const levelNote = level === "kid"
    ? " (Explain like I'm 12 — simple words, analogies, no jargon.)"
    : level === "expert"
    ? " (I want full technical detail — use proper accounting/economic terminology.)"
    : "";

  async function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    if (!apiKey) {
      setMessages(m => [...m, { role:"ai", content:"⚠ Enter your Anthropic API key above. It stays in your browser only — never stored or sent anywhere except Anthropic's API directly." }]);
      return;
    }

    const fullMsg = msg + levelNote;
    setMessages(m => [...m, { role:"user", content:msg }]);
    setInput("");
    setLoading(true);
    history.current.push({ role:"user", content:fullMsg });

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "x-api-key":apiKey,
          "anthropic-version":"2023-06-01",
          "anthropic-dangerous-direct-browser-access":"true",
        },
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:800,
          system:SYSTEM_PROMPT,
          messages:history.current,
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text ?? (data.error?.message ? `Error: ${data.error.message}` : "Something went wrong.");
      history.current.push({ role:"assistant", content:reply });
      setMessages(m => [...m, { role:"ai", content:reply }]);
    } catch(e:any) {
      setMessages(m => [...m, { role:"ai", content:`Connection error: ${e.message}. Check API key.` }]);
    }
    setLoading(false);
  }

  return (
    <section id="chat" className="py-20 border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="font-mono text-xs text-red-500 uppercase tracking-widest mb-2">// Ask The Data — 25 Years, 7 PMs, No Spin</div>
        <h2 className="font-display text-5xl md:text-7xl leading-none text-white mb-4">ASK THE AI.<br />GET STRAIGHT ANSWERS.</h2>
        <p className="text-zinc-400 text-sm mb-8 max-w-xl">
          25 years of Australian government financial data loaded. All 7 PMs scored on identical criteria. Ask anything. It won't fluff around, take sides, or give you spin.
          {level === "kid" && " 🧒 Kid mode: answers in simple language."}
          {level === "expert" && " 📊 Expert mode: full technical detail."}
        </p>

        {/* API key */}
        <div className="flex items-center gap-3 mb-6 p-4 border border-zinc-800 bg-black">
          <label className="font-mono text-xs text-zinc-500 uppercase tracking-widest shrink-0">API Key:</label>
          <input
            type="password"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="sk-ant-... (stays in your browser only)"
            className="flex-1 bg-transparent border-0 outline-none text-zinc-300 font-mono text-xs placeholder:text-zinc-700"
          />
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 mb-6">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              onClick={() => send(s)}
              className="font-mono text-xs border border-zinc-800 text-zinc-500 px-3 py-1.5 hover:border-zinc-600 hover:text-zinc-300 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="chat-scroll-container border border-zinc-800 bg-black h-96 overflow-y-auto p-4 mb-3 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role==="user"?"justify-end":"justify-start"}`}>
              <div className={`max-w-[85%] p-3 text-sm leading-relaxed
                ${m.role==="user"
                  ? "bg-zinc-900 border border-zinc-700 text-zinc-300 font-mono text-xs"
                  : "border-l-4 border-red-700 bg-red-950/20 text-zinc-200"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="border-l-4 border-red-700 bg-red-950/20 p-3 text-zinc-500 italic text-sm">
                Analysing the data...
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Ask about the budget, debt, book tricks, cost of living..."
            className="flex-1 bg-black border border-zinc-800 text-zinc-200 font-mono text-xs px-4 py-3 outline-none focus:border-red-800 placeholder:text-zinc-700"
          />
          <button
            onClick={() => send()}
            disabled={loading}
            className="bg-red-700 hover:bg-red-600 disabled:bg-zinc-800 text-white font-mono text-xs uppercase tracking-widest px-6 py-3 transition-colors"
          >
            Send →
          </button>
        </div>

        <p className="font-mono text-xs text-zinc-700 mt-3">
          Get an API key at console.anthropic.com — your key never leaves your browser.
          Open source: verify the AI prompt in <code>components/sections/Chat.tsx</code>
        </p>

        <div className="mt-6">
          <Subscribe />
        </div>
      </div>
    </section>
  );
}
