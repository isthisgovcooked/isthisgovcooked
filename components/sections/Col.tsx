"use client";
import Section from "@/components/ui/Section";
import type { NextSectionProp } from "@/components/ui/Section";
import Explainer from "@/components/ui/Explainer";
import { DebtInflChart } from "@/components/charts/Charts";
import type { ExplanationLevel } from "@/lib/data";

const COL_CARDS: {
  icon: string;
  title: string;
  accentColor: string;
  explanations: Record<ExplanationLevel, string>;
}[] = [
  {
    icon: "🏠",
    title: "Your Mortgage",
    accentColor: "border-red-700",
    explanations: {
      kid:  "When the government borrows lots of money, it makes interest rates go up for everyone — including your parents' home loan. Australia's government net debt went from NEGATIVE (they had net savings) in 2007 to $595B in 2024. Howard paid it off. Every government since has borrowed it back. That's why mortgage repayments got so expensive.",
      teen: "Government borrowing competes with households for available money. Net debt was eliminated by 2006-07 (Howard) then rebuilt to $595B by 2024. The RBA raised rates 13 times 2022-23. Every 1% on a $600K mortgage = $6,000/year extra. Not all from govt debt — but it's a contributor.",
      expert: "Fiscal-monetary interaction: elevated government borrowing increases demand for loanable funds, contributing to yield curve pressure. Net debt: -$24B (2006-07) to $595B (2024). ACGB issuance 2020-24 approx $500B — largest in peacetime. RBA quantitative tightening from Nov 2023. Mortgage stress: 1pp rate increase on median $600K loan = $6,000pa additional servicing.",
    },
  },
  {
    icon: "📈",
    title: "Inflation",
    accentColor: "border-red-700",
    explanations: {
      kid:  "When the government puts a LOT of extra money into the economy (like during COVID), prices go up because there's too much money chasing the same amount of stuff. That's why everything got more expensive from 2022.",
      teen: "2020-21: $107B deficit pumped into economy. Combined with supply chain disruptions = textbook inflation setup. CPI peaked 8.4% (Dec 2022). The COVID stimulus was necessary — but the inflation aftermath was predictable. The RBA had to raise rates to fix it.",
      expert: "Fiscal impulse 2020-21: ~6.5% GDP. Demand-side stimulus concurrent with supply chain disruption (COVID) produced excess demand inflation. Trimmed mean CPI peaked 6.8% Q4 2022. RBA tightening cycle: 425bp over 13 months. Fiscal consolidation 2022-24 assisted disinflation — UCB improved $75B over 2 years.",
    },
  },
  {
    icon: "💸",
    title: "Future Tax Burden",
    accentColor: "border-amber-700",
    explanations: {
      kid:  "Every dollar the government borrows today, someone has to pay back later — probably you when you're older. Interest on the debt is now over $25 billion a year. That's money that can't be spent on hospitals or schools.",
      teen: "Government interest payments: ~$17B in 2017, over $25B in 2024, forecast $35B+ by 2028. That's structural spending that grows regardless of who wins elections. To fund it: higher future taxes, lower services, or more borrowing. No fourth option.",
      expert: "Debt servicing costs: net interest payments rising from 0.5% GDP (2024-25) to projected 0.9% GDP (2027-28). Structural spending item — not cyclical. Gross debt ~$940B at 4.3% average yield = ~$40B annual interest. Fiscal space for discretionary spending narrows as debt service grows. Intergenerational incidence: present deficit = future tax liability.",
    },
  },
  {
    icon: "🏗️",
    title: "Equity Injections & Market Distortion",
    accentColor: "border-amber-700",
    explanations: {
      kid:  "The government gives billions to businesses it owns (like NBN, airports). When government businesses get cheap money that private companies can't access, it makes the market less fair. That can slow down new businesses that might make things cheaper for you.",
      teen: "$14-25B per year in equity injections to govt enterprises. When a government competitor gets subsidised capital, private businesses can't compete fairly. This can reduce private investment — which is what ultimately drives productivity and lower prices.",
      expert: "Off-budget equity injections distort capital allocation: GBEs receiving concessional capital (sovereign guarantee implicit) crowd out private sector competition. CEFC, ARENA, NRF — policy allocation rather than risk-adjusted returns. Productivity spillovers negative if investments displace higher-return private activity. KPMG, EY flagged $85B forward estimate as material fiscal misrepresentation.",
    },
  },
  {
    icon: "👴",
    title: "Superannuation Liability",
    accentColor: "border-zinc-700",
    explanations: {
      kid:  "The government owes $244 billion to public servants for their retirement. This has to be paid somehow — either from savings (the Future Fund), future taxes, or more borrowing. It's like a huge credit card bill that keeps growing.",
      teen: "Defined benefit super liability: $244B (2024). Funded partly by Future Fund (~$200B). Gap is unfunded. As rates rise, the liability falls on paper — but the cash obligation doesn't change. Long-run it requires either Future Fund outperformance or additional funding.",
      expert: "Defined benefit obligation (AASB 119): $244B at June 2024. Future Fund balance ~$200B — partial offset. Unfunded component ~$44B. Actuarial assumptions: discount rate 4.3% (2024) — 100bp shift produces ~$25B liability movement. Cash obligation fixed regardless of accounting value. Long-run sustainability requires Future Fund real returns >3.5%pa.",
    },
  },
  {
    icon: "✅",
    title: "What's Actually Working",
    accentColor: "border-emerald-700",
    explanations: {
      kid:  "It's not all bad news! Australia's debt compared to other countries is still pretty low. The bulk-billing fix means more free doctor visits. And the government is trying to build more houses which should help with rent and house prices eventually.",
      teen: "Australia's gross debt at 37% of GDP is low vs US (120%), Japan (250%), UK (100%). The Medicare bulk-billing investment addresses a real structural issue. Non-compete ban is good economic policy. Future Fund provides genuine buffer against super liability. Not cooked — but trending in the wrong direction.",
      expert: "Relative fiscal position: Australia sovereign AAA-rated, gross debt 37% GDP vs G7 average ~130%. Future Fund provides $200B+ buffer. 2022-24 fiscal consolidation: structural improvement $75B UCB over 2yr. Productivity initiatives (non-compete, HELP threshold) positive structural signal. Risk: forward estimates show deterioration reversing gains from 2022-24 consolidation.",
    },
  },
];

export default function ColSection({ nextSection }: { nextSection?: NextSectionProp }) {
  return (
    <Section
      id="col"
      tag="// Your Wallet — How It Hits You"
      title="HOW IT HITS YOUR HIP POCKET."
      intro="Budget decisions aren't abstract. Every dollar borrowed, every equity injection, every interest payment has a real-world impact on prices, rates, and what things cost you."
      dark
      accent="red"
      nextSection={nextSection}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-zinc-800 mb-10">
        {COL_CARDS.map((card) => (
          <div key={card.title} className={`bg-zinc-950 p-6 border-t-2 ${card.accentColor}`}>
            <div className="text-3xl mb-3">{card.icon}</div>
            <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-3">
              {card.title}
            </div>
            <Explainer explanations={card.explanations} />
          </div>
        ))}
      </div>

      <div className="bg-zinc-950 border border-zinc-800 p-5 mb-8">
        <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-4">
          Net Debt Growth vs CPI Inflation vs RBA Cash Rate — The Connection
        </div>
        <DebtInflChart />
      </div>

      <div className="border-l-4 border-red-700 bg-red-950/20 p-5">
        <div className="font-mono text-xs text-red-400 uppercase tracking-widest mb-2">🔑 The Bottom Line</div>
        <p className="text-zinc-300 text-sm leading-relaxed">
          The single biggest cost-of-living driver from government finances is{" "}
          <strong>the 2020-21 COVID spending surge</strong> — necessary, but with real consequences.
          The $107B deficit pumped money into an economy that couldn't supply enough goods.
          Combined with global supply chain disruptions, this contributed directly to the
          2022-23 inflation surge (8.4% peak CPI) and forced the RBA to raise rates 13 times.
          Every mortgage holder felt that directly. This wasn't wasteful spending — it was a
          crisis response. But understanding the mechanism helps you see why the{" "}
          <strong>$85B off-budget forward pipeline</strong> carries inflation risk if the economy
          doesn't have the capacity to absorb it.
        </p>
      </div>
    </Section>
  );
}
