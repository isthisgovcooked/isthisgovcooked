"use client";
import { useState } from "react";

interface Props {
  text: string;
  className?: string;
}

export default function ShareButton({ text, className = "" }: Props) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const shareText = `${text}\n\nVerify at isthisgovcooked.com.au`;
    try {
      if (navigator.share) {
        await navigator.share({ text: shareText });
      } else {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  };

  return (
    <button
      onClick={share}
      className={`font-mono text-xs border border-zinc-800 text-zinc-600 hover:border-zinc-600 hover:text-zinc-300 px-2 py-1 transition-colors ${className}`}
    >
      {copied ? "✓ Copied" : "↗ Share"}
    </button>
  );
}
