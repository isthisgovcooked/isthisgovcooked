import Link from "next/link";

export default function WhyStrip() {
  return (
    <section className="bg-zinc-950 border-y border-zinc-800 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono text-xs text-red-500 uppercase tracking-widest mb-3">
          // WHY THIS EXISTS
        </div>
        <p className="font-display text-2xl sm:text-3xl leading-tight text-white mb-4">
          The media talks about the numbers. Politicians argue about the numbers.
          Nobody shows you the actual numbers.
        </p>
        <p className="font-mono text-sm text-zinc-400 leading-relaxed mb-4">
          This site is the actual numbers. Verified. Sourced. Explained three ways.
          No ads. No agenda. No party loyalty.
        </p>
        <p className="font-mono text-sm text-zinc-400 leading-relaxed mb-6">
          Just the facts — and what they mean for your mortgage, your rent,
          your groceries, and the country your kids inherit.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/about"
            className="font-mono text-xs text-red-400 hover:text-red-300 uppercase tracking-wider border border-red-800 hover:border-red-600 px-4 py-2 transition-colors"
          >
            → Read the full story
          </Link>
          <Link
            href="/#overview"
            className="font-mono text-xs text-zinc-400 hover:text-white uppercase tracking-wider border border-zinc-700 hover:border-zinc-500 px-4 py-2 transition-colors"
          >
            → View the data
          </Link>
        </div>
      </div>
    </section>
  );
}
