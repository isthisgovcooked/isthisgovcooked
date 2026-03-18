"use client";

import { useState, useRef, useEffect } from "react";

export interface Source {
  document: string;
  detail: string;
  url: string;
  date: string;
}

interface Props {
  source: Source;
  children: React.ReactNode;
}

export default function SourcePopover({ source, children }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="cursor-pointer hover:opacity-70 transition-opacity"
      >
        {children}
      </button>
      {open && (
        <div className="absolute z-50 bottom-full left-0 mb-2 w-72 bg-zinc-900 border border-zinc-700 p-3 shadow-2xl">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
            Source
          </div>
          <div className="font-mono text-xs text-white mb-1">{source.document}</div>
          <div className="font-mono text-xs text-zinc-400 mb-2">
            {source.detail} — {source.date}
          </div>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-red-400 hover:text-red-300 underline"
          >
            → Verify directly ↗
          </a>
        </div>
      )}
    </div>
  );
}
