"use client";
import { useState } from "react";

export default function Subscribe() {
  const [submitted, setSubmitted] = useState(false);

  const subscribe = () => {
    const subject = encodeURIComponent("Subscribe to GovCooked Updates");
    const body = encodeURIComponent(
      "Hi, I'd like to receive updates when isthisgovcooked.com.au publishes new data.\n\n" +
      "I understand this is a free service and I can unsubscribe any time by replying STOP."
    );
    window.open(`mailto:updates@isthisgovcooked.com.au?subject=${subject}&body=${body}`);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="border border-zinc-800 p-5 rounded">
      <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">
        Get notified when the data updates
      </div>
      <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
        New budget? New ANAO findings? New ABS data? We&apos;ll send you a plain-English
        summary — no spam, no marketing, just the update.
      </p>
      <button
        onClick={subscribe}
        className={`font-mono text-xs uppercase tracking-widest px-4 py-2 border transition-colors rounded ${
          submitted
            ? "border-emerald-700 text-emerald-400"
            : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200"
        }`}
      >
        {submitted ? "✓ Email client opened" : "→ Subscribe to updates"}
      </button>
      <div className="font-mono text-xs text-zinc-700 mt-2">
        No account needed. Unsubscribe any time. Not sold to anyone.
      </div>
    </div>
  );
}
