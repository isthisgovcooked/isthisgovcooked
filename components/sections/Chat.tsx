"use client";
import { useState, useRef, useEffect } from "react";
import { useLevel } from "@/lib/level-context";

interface Message { role: "user" | "ai"; content: string; }

// Worker URL — set in .env.local for dev, .env.production for deploy
const PROXY_URL = process.env.NEXT_PUBLIC_CHAT_PROXY_URL
               ?? "http://localhost:8787"; // wrangler dev default

const DAILY_LIMIT = 10;
const STORAGE_KEY = "govcooked_msg_count";

// Get today's message count from localStorage (client only)
function getTodayCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return 0;
    const { date, count } = JSON.parse(stored);
    const today = new Date().toISOString().split("T")[0];
    return date === today ? count : 0;
  } catch {
    return 0;
  }
}

function incrementCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const today = new Date().toISOString().split("T")[0];
    const newCount = getTodayCount() + 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: newCount }));
    return newCount;
  } catch {
    return 0;
  }
}

const SUGGESTIONS = [
  "Which PM had the best fiscal record?",
  "How did Howard eliminate Australia's debt?",
  "Was the GFC spending justified?",
  "Compare Morrison vs Albanese on cost of living",
  "What's the real 2026-27 deficit after off-budget?",
  "Rate all 7 PMs from best to worst",
  "Why is Albanese's immigration score so high?",
  "What is the Cooked Metre and how does it work?",
];

export default function ChatSection() {
  const { level } = useLevel();

  const [messages, setMessages] = useState<Message[]>([{
    role: "ai",
    content: "G'day. I'm the GovCooked AI. 25 years of Australian government data loaded — Howard to Albanese. Ask me anything. No spin, no party loyalty, no fluff.",
  }]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const [rateLimited, setRateLimited] = useState(false);

  const bottomRef  = useRef<HTMLDivElement>(null);
  const isFirst    = useRef(true);
  const history    = useRef<{ role: string; content: string }[]>([]);

  // Hydration-safe: init count client-side only
  useEffect(() => {
    setMsgCount(getTodayCount());
  }, []);

  // Scroll chat box (not page) on new messages
  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return; }
    const box = bottomRef.current?.closest(".chat-scroll-container") as HTMLElement | null;
    if (box) box.scrollTop = box.scrollHeight;
    else bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages]);

  const remaining = Math.max(0, DAILY_LIMIT - msgCount);

  const levelNote = level === "kid"
    ? " (Respond like I'm 12 — simple words, short sentences, no jargon.)"
    : level === "expert"
      ? " (Full technical detail — accounting terminology, specific citations, be precise.)"
      : "";

  async function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;

    if (msgCount >= DAILY_LIMIT) {
      setRateLimited(true);
      return;
    }

    const newCount = incrementCount();
    setMsgCount(newCount);

    setMessages(m => [...m, { role: "user", content: msg }]);
    setInput("");
    setLoading(true);

    history.current.push({ role: "user", content: msg });

    try {
      const res = await fetch(PROXY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages:  history.current,
          levelNote: levelNote || undefined,
        }),
      });

      const data = await res.json();

      // Rate limited by server
      if (res.status === 429 || data.error === "rate_limited") {
        setRateLimited(true);
        setMessages(m => [...m, {
          role: "ai",
          content: "You've reached the 10 message daily limit — this keeps the service free for everyone. Come back tomorrow for more questions.",
        }]);
        setLoading(false);
        return;
      }

      if (data.error) {
        setMessages(m => [...m, { role: "ai", content: `Error: ${data.error}` }]);
      } else {
        history.current.push({ role: "assistant", content: data.reply });
        setMessages(m => [...m, { role: "ai", content: data.reply }]);
      }

    } catch (e: unknown) {
      setMessages(m => [...m, {
        role: "ai",
        content: "Connection error. The AI service may be temporarily unavailable — try again in a moment.",
      }]);
    }

    setLoading(false);
  }

  return (
    <section id="chat" className="py-20 border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="font-mono text-xs text-red-500 uppercase tracking-widest mb-2">
          // Ask The Data — 25 Years, 7 PMs, No Spin
        </div>

        <h2 className="font-display text-5xl md:text-7xl leading-none text-white mb-4">
          ASK THE AI.<br />
          GET STRAIGHT ANSWERS.
        </h2>

        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-zinc-400 text-sm max-w-xl">
            25 years of Australian government financial data loaded. Ask anything.
            No spin, no party loyalty, no API key required.
            {level === "kid"    && " 🧒 Plain English mode on."}
            {level === "expert" && " 📊 Expert mode on."}
          </p>

          {/* Message counter */}
          <div className={`font-mono text-xs border px-3 py-1.5 shrink-0
            ${remaining <= 2
              ? "border-red-900 text-red-400"
              : "border-zinc-800 text-zinc-500"}`}
          >
            {rateLimited
              ? "Daily limit reached — resets midnight"
              : `${remaining} of ${DAILY_LIMIT} free messages remaining today`
            }
          </div>
        </div>

        {/* Suggestions */}
        <div className="flex flex-wrap gap-2 mb-4">
          {SUGGESTIONS.map(s => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              disabled={loading || rateLimited}
              className="font-mono text-xs border border-zinc-800 text-zinc-500
                px-3 py-1.5 hover:border-zinc-600 hover:text-zinc-300
                transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="chat-scroll-container border border-zinc-800 bg-black
          h-96 overflow-y-auto p-4 mb-3 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] p-3 text-sm leading-relaxed
                ${m.role === "user"
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
                Analysing 25 years of data...
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
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
            placeholder={
              rateLimited
                ? "Daily limit reached — come back tomorrow"
                : "Ask about any PM, any year, any budget trick..."
            }
            disabled={rateLimited}
            className="flex-1 bg-black border border-zinc-800 text-zinc-200
              font-mono text-xs px-4 py-3 outline-none focus:border-red-800
              placeholder:text-zinc-700 disabled:opacity-40 disabled:cursor-not-allowed"
          />
          <button
            type="button"
            onClick={() => send()}
            disabled={loading || rateLimited || !input.trim()}
            className="bg-red-700 hover:bg-red-600 disabled:bg-zinc-800
              text-white font-mono text-xs uppercase tracking-widest
              px-6 py-3 transition-colors"
          >
            {loading ? "..." : "Ask →"}
          </button>
        </div>

        <p className="font-mono text-xs text-zinc-700 mt-3">
          Free — powered by Groq (Llama 3.1). 10 questions/day keeps it free for everyone.
          Data: Commonwealth CFS 1999-2024, ANAO, ABS.
          <a
            href="https://github.com/isthisgovcooked/isthisgovcooked"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 hover:text-zinc-400 transition-colors"
          >
            Verify the AI prompt →
          </a>
        </p>
      </div>
    </section>
  );
}
