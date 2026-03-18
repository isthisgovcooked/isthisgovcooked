"use client";
import { useState } from "react";
import Section from "@/components/ui/Section";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import ShareButton from "@/components/ui/ShareButton";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  realAnswer: string;
  explanation: string;
  source: string;
  sourceUrl: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "What is Australia's government net worth deficit as of June 2024?",
    options: ["$57 billion", "$167 billion", "$567 billion", "$5.67 trillion"],
    correctIndex: 2,
    realAnswer: "−$567.5 billion",
    explanation: "Australia's total government liabilities exceed its assets by $567.5 billion. This has grown from $388 billion in 2016-17. It means if you wound up the government today, the debts would outweigh the assets by over half a trillion dollars.",
    source: "Commonwealth Consolidated Financial Statements 2023-24",
    sourceUrl: "https://www.finance.gov.au/publications/commonwealth-consolidated-financial-statements/2023-2024-commonwealth-consolidated-financial-statements",
  },
  {
    id: 2,
    question: "In 2021-22, a single accounting entry improved Australia's net worth by $95 billion — without any real money changing hands. What was it?",
    options: [
      "The government sold assets worth $95B",
      "Interest rates rose, reducing the superannuation liability on paper",
      "The RBA printed $95B",
      "Export revenues hit a record high",
    ],
    correctIndex: 1,
    realAnswer: "Superannuation actuarial gain: $95.2 billion",
    explanation: "When the RBA raised interest rates, the 'discount rate' used to calculate the government's superannuation liability also rose. A higher discount rate means the present value of future obligations falls. This mechanical calculation produced a $95.2B 'gain' — the largest single non-cash entry in Australian government accounting history. Not one dollar was actually earned.",
    source: "ANAO Audits of Financial Statements 2021-22",
    sourceUrl: "https://www.anao.gov.au/work/financial-statement-audit/audits-the-financial-statements-australian-government-entities-the-period-ended-30-june-2022",
  },
  {
    id: 3,
    question: "The 2023-24 budget reported a $10 billion surplus. What was the actual cash balance that year?",
    options: [
      "+$10 billion surplus (cash and accrual were the same)",
      "+$2 billion (slightly less but still positive)",
      "−$15.8 billion cash deficit",
      "−$54 billion",
    ],
    correctIndex: 2,
    realAnswer: "−$15.8 billion underlying cash deficit",
    explanation: "The $10B 'surplus' is the accrual measure — it includes non-cash items like depreciation, actuarial movements, and timing differences. The underlying cash balance (actual money in vs out) was −$15.8B. A $25.8B gap between the number politicians quote and the harder-to-manipulate cash figure.",
    source: "Commonwealth CFS 2023-24, Dept of Finance",
    sourceUrl: "https://www.finance.gov.au/publications/commonwealth-consolidated-financial-statements/2023-2024-commonwealth-consolidated-financial-statements",
  },
  {
    id: 4,
    question: "How much did Australia's net overseas migration exceed the government's own forecast over the three years 2022-23 to 2024-25?",
    options: [
      "About 50,000 people above forecast",
      "About 200,000 people above forecast",
      "About 690,000 people above forecast",
      "It was actually below forecast",
    ],
    correctIndex: 2,
    realAnswer: "~690,000 people above the government's own forecasts",
    explanation: "The Albanese government forecast approximately 200,000 NOM per year. Actual outcomes: 538,000 (2022-23), 446,000 (2023-24), 306,000 (2024-25). Three-year total: 1,290,000 vs ~600,000 forecast = 690,000 above target. This accountability gap contributed to the rental vacancy rate falling to 1.6% (critically low) and rents rising ~18% over the same period.",
    source: "ABS Overseas Migration 2024-25",
    sourceUrl: "https://www.abs.gov.au/statistics/people/population/overseas-migration/latest-release",
  },
  {
    id: 5,
    question: "Australia's gross government debt will reach what level by 2028-29 according to the government's own 2025-26 Budget forecasts?",
    options: [
      "$400 billion",
      "$700 billion",
      "$940 billion",
      "$1.22 trillion",
    ],
    correctIndex: 3,
    realAnswer: "$1.22 trillion by 2028-29",
    explanation: "The 2025-26 Budget papers (Budget Paper No.1) project gross debt reaching $1.22 trillion by 2028-29. This is the first time Australian government gross debt will exceed $1 trillion. Net debt (liabilities minus selected assets) is projected at $768 billion. At 4.3% average borrowing rate, annual interest costs will exceed $35 billion — more than the entire annual defence budget.",
    source: "Budget Paper No.1 2025-26, Treasury",
    sourceUrl: "https://budget.gov.au",
  },
];

export default function BudgetQuiz() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(5).fill(null));
  const [revealed, setRevealed] = useState<boolean[]>(Array(5).fill(false));
  const [finished, setFinished] = useState(false);

  const q = QUESTIONS[currentQ];
  const hasAnswered = answers[currentQ] !== null;
  const isCorrect = answers[currentQ] === q.correctIndex;
  const score = answers.filter((a, i) => a === QUESTIONS[i].correctIndex).length;

  const selectAnswer = (idx: number) => {
    if (hasAnswered) return;
    const newAnswers = [...answers];
    newAnswers[currentQ] = idx;
    setAnswers(newAnswers);
    const newRevealed = [...revealed];
    newRevealed[currentQ] = true;
    setRevealed(newRevealed);
  };

  const next = () => {
    if (currentQ < QUESTIONS.length - 1) setCurrentQ(currentQ + 1);
    else setFinished(true);
  };

  const restart = () => {
    setCurrentQ(0);
    setAnswers(Array(5).fill(null));
    setRevealed(Array(5).fill(false));
    setFinished(false);
  };

  const scoreLabel = score <= 1 ? "Most Australians score this. The media doesn't cover these numbers."
    : score <= 2 ? "Better than average. You've been paying closer attention than most."
    : score <= 3 ? "Above average. You're the kind of person who reads past the headline."
    : score <= 4 ? "Impressive. You actually follow government finances."
    : "Near perfect. You've done the reading. Not many Australians have.";

  return (
    <Section
      id="quiz"
      tag="// Budget Knowledge Quiz"
      title="HOW MUCH DO YOU ACTUALLY KNOW?"
      intro="5 questions about real government numbers. Most Australians get 1 or 2 right. The rest trust the media to tell them."
      dark
      accent="red"
    >
      <AnimateOnScroll>
        {!finished ? (
          <div className="max-w-2xl" style={{ minHeight: "480px" }}>
            {/* Progress */}
            <div className="flex gap-1 mb-6">
              {QUESTIONS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 transition-colors rounded ${
                    i < currentQ
                      ? answers[i] === QUESTIONS[i].correctIndex
                        ? "bg-emerald-500"
                        : "bg-red-700"
                      : i === currentQ
                      ? "bg-amber-500"
                      : "bg-zinc-800"
                  }`}
                />
              ))}
            </div>

            <div className="font-mono text-xs text-zinc-500 mb-3">
              Question {currentQ + 1} of {QUESTIONS.length}
            </div>

            <h3 className="text-lg font-medium text-white mb-6 leading-snug">{q.question}</h3>

            <div className="space-y-2 mb-6">
              {q.options.map((opt, idx) => {
                let style = "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200";
                if (hasAnswered) {
                  if (idx === q.correctIndex) style = "border-emerald-700 bg-emerald-950/30 text-emerald-300";
                  else if (idx === answers[currentQ]) style = "border-red-700 bg-red-950/30 text-red-300";
                  else style = "border-zinc-900 text-zinc-600";
                }
                return (
                  <button
                    key={idx}
                    onClick={() => selectAnswer(idx)}
                    disabled={hasAnswered}
                    className={`w-full text-left p-4 border font-mono text-sm transition-all rounded ${style}`}
                  >
                    {String.fromCharCode(65 + idx)}. {opt}
                  </button>
                );
              })}
            </div>

            {hasAnswered && (
              <AnimateOnScroll direction="up">
                <div className={`border-l-4 p-4 mb-4 rounded-r ${isCorrect ? "border-emerald-700 bg-emerald-950/20" : "border-red-700 bg-red-950/20"}`}>
                  <div className={`font-mono text-xs uppercase tracking-widest mb-2 ${isCorrect ? "text-emerald-400" : "text-red-400"}`}>
                    {isCorrect ? "✓ Correct" : "✗ Incorrect"} — Real answer: {q.realAnswer}
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-2">{q.explanation}</p>
                  <a
                    href={q.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-zinc-500 hover:text-zinc-300 underline"
                  >
                    Source: {q.source} ↗
                  </a>
                </div>
                <button
                  onClick={next}
                  className="w-full bg-red-800 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-widest py-3 transition-colors rounded"
                >
                  {currentQ < QUESTIONS.length - 1 ? "Next Question →" : "See Results →"}
                </button>
              </AnimateOnScroll>
            )}
          </div>
        ) : (
          <AnimateOnScroll>
            <div className="max-w-xl">
              <div
                className="font-display text-7xl mb-2"
                style={{
                  color: score >= 4 ? "#1a7a3a" : score >= 2 ? "#e8a020" : "#d42b2b",
                }}
              >
                {score}/5
              </div>
              <div className="font-mono text-sm text-zinc-400 mb-4">{scoreLabel}</div>

              {/* Score breakdown */}
              <div className="space-y-2 mb-6">
                {QUESTIONS.map((question, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className={`font-mono text-xs mt-0.5 ${answers[i] === question.correctIndex ? "text-emerald-400" : "text-red-400"}`}>
                      {answers[i] === question.correctIndex ? "✓" : "✗"}
                    </span>
                    <span className="font-mono text-xs text-zinc-500 leading-relaxed">{question.question.substring(0, 70)}...</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={restart}
                  className="flex-1 border border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200 font-mono text-xs uppercase tracking-widest py-3 transition-colors rounded"
                >
                  Try Again
                </button>
                <div className="flex-1">
                  <ShareButton
                    text={`I scored ${score}/5 on the Australian government budget quiz. Most Australians score 1-2. The numbers the media never shows you.`}
                    className="w-full py-3 text-center block"
                  />
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        )}
      </AnimateOnScroll>
    </Section>
  );
}
