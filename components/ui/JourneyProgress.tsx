"use client";
import { useEffect, useState } from "react";

const JOURNEY_STEPS = [
  { id: "hero",        label: "The Hook",      emoji: "🎯" },
  { id: "overview",    label: "The Reality",   emoji: "📊" },
  { id: "strategies",  label: "The Tricks",    emoji: "🃏" },
  { id: "rankings",    label: "The Verdict",   emoji: "🏆" },
  { id: "faircentre",  label: "The Fair Test", emoji: "⚖️" },
  { id: "forward",     label: "What's Coming", emoji: "⚠️" },
  { id: "col",         label: "Your Wallet",   emoji: "💰" },
  // { id: "chat",        label: "Ask Anything",  emoji: "🤖" }, — temporarily hidden
];

export default function JourneyProgress() {
  const [current, setCurrent] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [hasMargin, setHasMargin] = useState(false);

  // Only show when scrolled past hero AND there's enough left margin
  useEffect(() => {
    const check = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.4);
      // Content container max-w-7xl = 1280px. Need viewport >= 1340px
      // to have at least 30px margin on each side for the dots
      setHasMargin(window.innerWidth >= 1340);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  // Track which section is in view
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    JOURNEY_STEPS.forEach((step, idx) => {
      const el = document.getElementById(step.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setCurrent(idx);
        },
        { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Don't render at all unless there's margin AND user has scrolled
  if (!scrolled || !hasMargin) return null;

  return (
    <div
      className="fixed z-40 flex flex-col justify-center gap-3"
      style={{
        // Position in the true left margin — between viewport edge and content
        // Content container: max-w-7xl (1280px) centered
        // Left margin = (viewport - 1280) / 2; dots in the middle of that margin
        left: "max(8px, calc((100vw - min(100vw, 1280px)) / 2 / 2))",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      {JOURNEY_STEPS.map((step, idx) => (
        <button
          key={step.id}
          type="button"
          onClick={() => {
            const el = document.getElementById(step.id);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          title={step.label}
          className="group flex items-center gap-2 focus:outline-none"
        >
          {/* The dot */}
          <div
            className={`rounded-full transition-all duration-300 shrink-0 ${
              idx === current
                ? "w-2.5 h-2.5 bg-red-500"
                : idx < current
                ? "w-1.5 h-1.5 bg-zinc-500"
                : "w-1.5 h-1.5 bg-zinc-800"
            }`}
          />
          {/* Label — only shows on hover, appears to the RIGHT of the dot */}
          <span
            className={`
              font-mono text-[10px] whitespace-nowrap
              bg-zinc-950 border border-zinc-800 px-2 py-0.5
              opacity-0 group-hover:opacity-100 transition-opacity duration-150
              pointer-events-none
              ${idx === current ? "text-red-400" : "text-zinc-500"}
            `}
          >
            {step.label}
          </span>
        </button>
      ))}
    </div>
  );
}
