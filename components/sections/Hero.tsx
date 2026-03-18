"use client";
import StatCard from "@/components/ui/StatCard";
import CountUp from "@/components/ui/CountUp";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import SourcePopover from "@/components/ui/SourcePopover";
import { useLevel } from "@/lib/level-context";
import { SOURCE_METADATA } from "@/lib/data";

const heroText = {
  kid:    "25 years of government money — from Howard's surpluses to today's debt. Explained so anyone can understand. No big words. Just the truth about what happened to Australia's money and the 7 Prime Ministers who were in charge.",
  teen:   "25 years of budgets, debt, and accounting tricks — in plain English. No spin. No party loyalty. 7 Prime Ministers scored on the same algorithm. Just the numbers and what they mean for your wallet.",
  expert: "25 fiscal years of Commonwealth Consolidated Financial Statements (1999-2024), ANAO audit findings, and forward estimates — analysed against structural benchmarks across 7 administrations with political bias detection and deception-weighted scoring.",
};

export default function Hero() {
  const { level } = useLevel();

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-red-900">
      {/* Background watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span className="font-display text-[20vw] text-red-950/30 leading-none tracking-widest">
          COOKED?
        </span>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Tag */}
        <div className="font-mono text-xs text-red-500 uppercase tracking-widest mb-6 flex items-center gap-2">
          <span className="opacity-60">//</span>
          <span>isthisgovcooked.com.au — Australian Government Finances — 1999–2024 — 7 Prime Ministers — Public Accountability</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-[14vw] sm:text-[12vw] md:text-[10vw] leading-[0.85] text-white mb-8">
          IS THIS<br />
          <span className="text-red-500">GOV</span><br />
          COOKED?
        </h1>

        {/* Intro */}
        <p className="text-zinc-400 text-lg max-w-2xl mb-12 leading-relaxed transition-all duration-300">
          {heroText[level]}
        </p>

        {/* Key stats */}
        <AnimateOnScroll delay={200} direction="none">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800">
            <StatCard
              value={
                <SourcePopover source={SOURCE_METADATA.netWorthDeficit2024}>
                  <CountUp end={567} prefix="$" suffix="B" duration={1600} />
                </SourcePopover>
              }
              label="Net worth deficit as of June 2024"
              color="red"
              shareText="Australia's government net worth deficit: -$567 billion as of June 2024. Source: Commonwealth Consolidated Financial Statements (Dept of Finance)."
            />
            <StatCard
              value={
                <SourcePopover source={SOURCE_METADATA.borrowings2024}>
                  <CountUp end={905} prefix="$" suffix="B" duration={1600} />
                </SourcePopover>
              }
              label="Government borrowings 2024"
              color="red"
              shareText="Australian Government borrowings: $905 billion (2024). Source: Commonwealth CFS, ANAO audit."
            />
            <StatCard
              value={
                <SourcePopover source={SOURCE_METADATA.netWorthDeficit2024}>
                  <CountUp end={595} prefix="$" suffix="B" duration={1600} />
                </SourcePopover>
              }
              label="Net debt in 2024 — vs ZERO in 2006-07"
              color="red"
              note="Howard eliminated debt. It's all come back."
              shareText="Australia's net debt: $595B (2024). Howard eliminated net debt by 2006-07 (went to -$24B net asset). Source: Commonwealth CFS."
            />
            <StatCard
              value={
                <SourcePopover source={SOURCE_METADATA.headlineSurplus2024}>
                  <CountUp end={7} duration={1600} />
                </SourcePopover>
              }
              label="Prime Ministers scored on identical criteria"
              color="white"
              note="Howard to Albanese — same algorithm, no exceptions"
              shareText="7 Prime Ministers (Howard to Albanese) scored on the Cooked Metre — same 8 factors and deception multiplier for all. Source: isthisgovcooked.com.au."
            />
          </div>
        </AnimateOnScroll>

        <div className="mt-12 flex flex-col items-start gap-4">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("overview");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="group flex items-center gap-3 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <span className="w-8 h-8 border border-zinc-700 group-hover:border-red-700 flex items-center justify-center transition-colors text-base animate-bounce">
              ↓
            </span>
            <span className="uppercase tracking-widest">Start the story — see 25 years of data</span>
          </button>

          <div className="flex flex-wrap gap-2 font-mono text-xs text-zinc-600">
            <span>25 years of data</span>
            <span>·</span>
            <span>100% verified sources</span>
            <span>·</span>
            <span>~8 min read</span>
          </div>
        </div>
      </div>
    </section>
  );
}
