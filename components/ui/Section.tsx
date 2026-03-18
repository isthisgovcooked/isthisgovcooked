"use client";
import { ReactNode } from "react";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

export interface NextSectionProp {
  label: string;
  href: string;
  teaser: string;
}

interface SectionProps {
  id?: string;
  tag: string;
  title: string;
  intro?: string;
  children: ReactNode;
  dark?: boolean;
  accent?: "red" | "amber" | "green";
  nextSection?: NextSectionProp;
}

const accentColors = {
  red:   "text-red-500 border-red-800",
  amber: "text-amber-400 border-amber-800",
  green: "text-emerald-400 border-emerald-800",
};

export default function Section({
  id, tag, title, intro, children, dark = false, accent = "red", nextSection,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-20 border-t ${accentColors[accent].split(" ")[1]} ${dark ? "bg-zinc-950" : "bg-black"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <AnimateOnScroll direction="left" delay={0}>
            <div className={`font-mono text-xs uppercase tracking-widest mb-2 ${accentColors[accent].split(" ")[0]}`}>
              {tag}
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll direction="up" delay={100}>
            <h2 className="font-display text-5xl md:text-7xl leading-none text-white mb-4">
              {title}
            </h2>
          </AnimateOnScroll>
          {intro && (
            <AnimateOnScroll direction="up" delay={200}>
              <p className="text-zinc-400 text-base max-w-2xl leading-relaxed">{intro}</p>
            </AnimateOnScroll>
          )}
        </div>
        {children}
        {nextSection && (
          <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="font-mono text-xs text-zinc-600 uppercase tracking-widest mb-1">
                Next →
              </div>
              <div className="font-mono text-sm text-zinc-400">{nextSection.teaser}</div>
            </div>
            <button
              type="button"
              onClick={() => {
                const el = document.querySelector(nextSection.href);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="font-mono text-xs border border-zinc-700 text-zinc-400 hover:border-red-700 hover:text-red-400 px-4 py-2 transition-colors shrink-0"
            >
              {nextSection.label} →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
