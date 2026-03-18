import type { Metadata } from "next";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Explainer from "@/components/ui/Explainer";
import Subscribe from "@/components/ui/Subscribe";
import { ABOUT_SECTIONS, ABOUT_FINAL_STATEMENT } from "@/lib/about-content";
import { CENTRE_METHODOLOGY_NOTE } from "@/lib/data";

export const metadata: Metadata = {
  title: "About | Is This Gov Cooked?",
  description:
    "25 years of Commonwealth Consolidated Financial Statements (1999-2000 to 2023-24), audited by the ANAO, explained in plain English. The Cooked Metre for all 7 Prime Ministers from Howard to Albanese. The Fair Centre comparison across the full 25-year period. Forward estimates showing what's locked in through 2028-29. An unbiased AI you can ask anything.",
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className="min-h-screen bg-black text-white pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="font-mono text-xs text-red-500 uppercase tracking-widest mb-6">
            // ABOUT
          </div>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl leading-tight text-white mb-12">
            Why we built this
          </h1>

          {ABOUT_SECTIONS.map((section, i) => (
            <section key={i} className="mb-16">
              <h2 className="font-display text-2xl sm:text-3xl text-white mb-6 leading-tight">
                {section.headline}
              </h2>
              <div className="text-zinc-300">
                <Explainer
                  explanations={section.body}
                  className="text-base sm:text-lg leading-relaxed max-w-3xl"
                />
              </div>
            </section>
          ))}

          {/* Funding & Independence */}
          <div className="border border-zinc-700 p-6 mb-8 rounded">
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">
              Funding & Independence
            </div>
            <div className="space-y-2 text-sm text-zinc-400 leading-relaxed">
              <p>This site is self-funded by its creator. There is no advertising. No political donations. No government funding. No corporate backing.</p>
              <p>Running costs: approximately $10–20/month (Cloudflare Pages hosting, domain registration). No revenue is generated from this site.</p>
              <p>The AI chatbot requires users to provide their own Anthropic API key. No API keys are stored on any server associated with this project.</p>
              <p>All code is open source and publicly auditable on GitHub. All data is from publicly available government documents.</p>
              <p className="text-zinc-500">If this changes — if the project ever accepts funding from any source — it will be disclosed here immediately and prominently.</p>
            </div>
          </div>

          {/* Fair Centre methodology note */}
          <div className="border border-zinc-700 p-6 mb-8 rounded">
            <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-3">
              Fair Centre baseline — methodology
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line">{CENTRE_METHODOLOGY_NOTE}</p>
          </div>

          {/* How you can help — CTA links */}
          <section className="mb-16">
            <div className="flex flex-wrap gap-4 mt-6">
              <a
                href="https://github.com/isthisgovcooked/isthisgovcooked"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-red-400 hover:text-red-300 uppercase tracking-wider border border-red-800 hover:border-red-600 px-4 py-2 transition-colors"
              >
                → View on GitHub
              </a>
              <a
                href="https://github.com/isthisgovcooked/isthisgovcooked/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-zinc-400 hover:text-white uppercase tracking-wider border border-zinc-700 hover:border-zinc-500 px-4 py-2 transition-colors"
              >
                → Raise an Issue
              </a>
              <a
                href="https://github.com/isthisgovcooked/isthisgovcooked/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-zinc-400 hover:text-white uppercase tracking-wider border border-zinc-700 hover:border-zinc-500 px-4 py-2 transition-colors"
              >
                → Read CONTRIBUTING.md
              </a>
            </div>
          </section>

          {/* Subscribe */}
          <div className="border-t border-zinc-800 pt-12 mb-12">
            <Subscribe />
          </div>

          {/* Final statement */}
          <blockquote className="border-t border-zinc-800 pt-16 text-center">
            <p className="font-display text-2xl sm:text-3xl md:text-4xl leading-snug text-white max-w-2xl mx-auto">
              {ABOUT_FINAL_STATEMENT}
            </p>
          </blockquote>
        </div>
      </main>
      <Footer />
    </>
  );
}
