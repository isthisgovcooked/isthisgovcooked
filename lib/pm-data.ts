// ============================================================
// COOKED METRE v2 — 7 PMs (1999–2024), 8 factors, deception multiplier
// Per-capita economics; immigration as accountability factor.
// ============================================================

import type { ExplanationLevel } from "@/lib/data";

export interface Source {
  name: string;
  url: string;
  date: string;
  dataPoint: string;
  verified?: boolean;
}

export interface FactorScore {
  rawScore: number;
  confidence: "A" | "B" | "C";
  sources: Source[];
  lastDataPoint: string;
  trend: "improving" | "worsening" | "stable";
  explanations: Record<ExplanationLevel, string>;
}

export interface PMScore {
  pmId: string;
  name: string;
  party: string;
  period: string;
  lastUpdated: string;
  dataVersion: string;
  scores: Record<string, FactorScore>;
  deceptionScore: number;
  deceptionMultiplier: number;
  rawScore: number;
  finalScore: number;
  label: string;
  grade: string;
}

// Weights sum to 100%. "economic" = Economic Management (same as legacy economicReality).
export const FACTOR_WEIGHTS: Record<string, number> = {
  economic: 18,
  costOfLiving: 18,
  fiscal: 15,
  immigration: 12,
  wages: 10,
  deception: 15,
  governance: 7,
  longTermDamage: 5,
};

export const FACTOR_IDS = Object.keys(FACTOR_WEIGHTS);

export const FACTOR_LABELS: Record<string, string> = {
  economic: "Economic Management",
  costOfLiving: "Cost of Living",
  fiscal: "Fiscal Responsibility",
  immigration: "Immigration Management",
  wages: "Wages & Workers",
  deception: "Honesty & Deception",
  governance: "Governance & Integrity",
  longTermDamage: "Long-term Damage",
};

export const DECEPTION_MULTIPLIER_CAP = 0.3;

export interface ContextBanner {
  trigger: string;
  title: string;
  body: string;
  severity: "info" | "warning";
}

// ── PM definitions (all 7) ─────────────────────────────────
export interface PMDefinition {
  id: string;
  name: string;
  party: string;
  treasurer: string;
  term: string;
  dataYears: string[];
  isCurrentPM: boolean;
  photo: string | null;
  keyFact: string;
  note?: string;
}

export const ALL_PMS: PMDefinition[] = [
  {
    id: "Howard",
    name: "John Howard",
    party: "Coalition (Liberal)",
    treasurer: "Peter Costello",
    term: "Mar 1996 – Dec 2007",
    dataYears: ["1999-00", "2000-01", "2001-02", "2002-03", "2003-04", "2004-05", "2005-06", "2006-07"],
    isCurrentPM: false,
    photo: null,
    keyFact: "Only PM to eliminate net government debt — went to -$24B (net asset) in 2006-07",
  },
  {
    id: "Rudd",
    name: "Kevin Rudd",
    party: "Labor",
    treasurer: "Wayne Swan",
    term: "Dec 2007 – Jun 2010, Jun–Sep 2013",
    dataYears: ["2007-08", "2008-09", "2009-10", "2012-13"],
    note: "Served two non-consecutive terms. GFC response was his defining legacy.",
    isCurrentPM: false,
    photo: null,
    keyFact: "Delivered Australia's GFC stimulus — one of two OECD nations to avoid recession",
  },
  {
    id: "Gillard",
    name: "Julia Gillard",
    party: "Labor",
    treasurer: "Wayne Swan",
    term: "Jun 2010 – Jun 2013",
    dataYears: ["2010-11", "2011-12"],
    note: "First female Australian PM. Governed with minority government after 2010 hung parliament.",
    isCurrentPM: false,
    photo: null,
    keyFact: "Introduced carbon tax, NDIS, Gonski education reforms — all while holding minority government",
  },
  {
    id: "Abbott",
    name: "Tony Abbott",
    party: "Coalition (Liberal)",
    treasurer: "Joe Hockey",
    term: "Sep 2013 – Sep 2015",
    dataYears: ["2013-14", "2014-15"],
    isCurrentPM: false,
    photo: null,
    keyFact: "Declared 'budget emergency' — but Senate blocked most austerity measures; deficit persisted",
  },
  {
    id: "Turnbull",
    name: "Malcolm Turnbull",
    party: "Coalition (Liberal)",
    treasurer: "Scott Morrison",
    term: "Sep 2015 – Aug 2018",
    dataYears: ["2015-16", "2016-17", "2017-18"],
    isCurrentPM: false,
    photo: null,
    keyFact: "Inherited structural deficit; never delivered promised surplus",
  },
  {
    id: "Morrison",
    name: "Scott Morrison",
    party: "Coalition (Liberal)",
    treasurer: "Josh Frydenberg",
    term: "Aug 2018 – May 2022",
    dataYears: ["2018-19", "2019-20", "2020-21", "2021-22"],
    isCurrentPM: false,
    photo: null,
    keyFact: "COVID pandemic; record peacetime deficit $107B; secret ministries; Robodebt RC findings",
  },
  {
    id: "Albanese",
    name: "Anthony Albanese",
    party: "Labor",
    treasurer: "Jim Chalmers",
    term: "May 2022 – present",
    dataYears: ["2021-22", "2022-23", "2023-24"],
    isCurrentPM: true,
    photo: null,
    keyFact: "Record immigration 690K above own forecast; Stage 3 tax cut reversal; $85B off-budget",
  },
];

// ── Factor entry (from task: score 0–100, trend, note) ─────
export interface PMFactorEntry {
  score: number;
  trend?: "improving" | "worsening" | "stable";
  note: string;
}

export interface PMScoreData {
  factors: Record<string, PMFactorEntry>;
  rawScore: number;
  deceptionScore: number;
  deceptionMultiplier: number;
  finalScore: number;
  finalLabel: string;
  overallGrade: string;
  contextBanners: Array<{ title: string; body: string; severity: "info" | "warning" }>;
  explanations: Record<ExplanationLevel, string>;
}

// Default sources for factor cards (when not from RMIT/ANAO)
const S: Record<string, Source> = {
  absGdp: { name: "ABS National Accounts", url: "https://www.abs.gov.au/statistics/economy/national-accounts/australian-national-accounts-national-income-expenditure-and-product/latest-release", date: "2024", dataPoint: "GDP per capita", verified: true },
  absWpi: { name: "ABS Wage Price Index", url: "https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/wage-price-index-australia/latest-release", date: "2024", dataPoint: "WPI", verified: true },
  absCpi: { name: "ABS CPI", url: "https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia/latest-release", date: "2024", dataPoint: "CPI", verified: true },
  financeCfs: { name: "Commonwealth CFS", url: "https://finance.gov.au/publications/commonwealth-consolidated-financial-statements", date: "2016-24", dataPoint: "Cash, debt", verified: true },
  anao: { name: "ANAO", url: "https://www.anao.gov.au/", date: "Ongoing", dataPoint: "Audit findings", verified: true },
  rmitFact: { name: "RMIT ABC FactLab", url: "https://www.rmit.edu.au/about/schools-colleges/media-and-communication/journalism/factlab", date: "Ongoing", dataPoint: "Promise/misleading ratings", verified: true },
  absNom: { name: "ABS Overseas Migration", url: "https://www.abs.gov.au/statistics/people/population/overseas-migration/latest-release", date: "2024", dataPoint: "NOM", verified: true },
  budget: { name: "Budget Papers", url: "https://budget.gov.au", date: "2022-25", dataPoint: "Forecasts", verified: true },
};

function toFactorScore(fe: PMFactorEntry, fid: string): FactorScore {
  const note = fe.note || "";
  return {
    rawScore: fe.score,
    confidence: "B",
    sources: fid === "economic" ? [S.absGdp] : fid === "costOfLiving" ? [S.absCpi] : fid === "fiscal" ? [S.financeCfs, S.anao] : fid === "immigration" ? [S.absNom, S.budget] : fid === "wages" ? [S.absWpi, S.absCpi] : fid === "deception" ? [S.rmitFact] : fid === "governance" ? [S.anao] : [S.financeCfs],
    lastDataPoint: note.slice(0, 80) + (note.length > 80 ? "…" : ""),
    trend: fe.trend ?? "stable",
    explanations: {
      kid: note.length > 120 ? note.slice(0, 120) + "…" : note,
      teen: note,
      expert: note,
    },
  };
}

function dataToPMScore(id: string, def: PMDefinition, data: PMScoreData): PMScore {
  const scores: Record<string, FactorScore> = {};
  for (const fid of FACTOR_IDS) {
    const fe = data.factors[fid];
    if (fe) scores[fid] = toFactorScore(fe, fid);
  }
  return {
    pmId: id,
    name: def.name,
    party: def.party,
    period: def.term,
    lastUpdated: "2025-03-18",
    dataVersion: "2.0.0",
    scores,
    deceptionScore: data.deceptionScore,
    deceptionMultiplier: data.deceptionMultiplier,
    rawScore: data.rawScore,
    finalScore: data.finalScore,
    label: getScoreLabel(data.finalScore),
    grade: data.overallGrade,
  };
}

/** Cooked Metre label: higher score = more cooked = worse. */
export function getScoreLabel(score: number): string {
  if (score <= 20) return "Squeaky Clean";
  if (score <= 35) return "A Bit Warm";
  if (score <= 50) return "Getting Cooked";
  if (score <= 64) return "Half Cooked";
  if (score <= 79) return "COOKED";
  if (score <= 89) return "Well Cooked";
  return "BURNT TO A CRISP";
}

/** Hex colour for score (green = clean, red = cooked). */
export function getScoreColour(score: number): string {
  if (score <= 20) return "#22c55e";   // green-500
  if (score <= 35) return "#84cc16";   // lime-500
  if (score <= 50) return "#eab308";   // yellow-500
  if (score <= 64) return "#f97316";   // orange-500
  if (score <= 79) return "#ef4444";   // red-500
  if (score <= 89) return "#dc2626";   // red-600
  return "#991b1b";                     // red-800
}

export function computeDeceptionMultiplier(deceptionScore: number): number {
  return 1 + (deceptionScore / 100) * DECEPTION_MULTIPLIER_CAP;
}

export function computeFinalScore(rawScore: number, deceptionMultiplier: number): number {
  return Math.min(100, Math.round(rawScore * deceptionMultiplier * 10) / 10);
}

// ── PM_SCORES: full 7-PM dataset (task) ─────────────────────
export const PM_SCORES: Record<string, PMScoreData> = {
  Howard: {
    factors: {
      economic:      { score: 72, trend: "improving", note: "Strong GDP growth ~3.5%/yr avg, low unemployment falling 8%→4.2%, real wages +1.2%/yr. However: productivity growth slowed in later years, housing affordability began deteriorating." },
      costOfLiving:  { score: 35, trend: "stable", note: "CPI 2-3% mostly, with 6% spike in 2000-01 from GST introduction (one-off). Housing prices surged — Sydney median doubled 2000-2007. Low COL score partially reflects this." },
      fiscal:        { score: 15, trend: "improving", note: "Best fiscal record of any PM in dataset. 9 of 10 years in surplus. Net debt eliminated by 2006-07 (went to -$24B net asset). Set the benchmark." },
      immigration:   { score: 28, trend: "stable", note: "NOM ~100,000-140,000/yr — at or below forecast. Housing supply broadly kept pace. Vacancy rates 2-3%. No accountability gap on immigration forecasts." },
      wages:         { score: 30, trend: "improving", note: "Real wages grew 1.0-1.5%/yr on average. WorkChoices (2006) controversial — reduced worker protections, though real wages continued rising. Strong employment growth." },
      deception:     { score: 38, note: "Children overboard affair (2001) — misled parliament on asylum seeker intelligence. WMD in Iraq — supported false intelligence. GST 'never ever' reversal. But: delivered core economic promises. RMIT tracking not available pre-2013." },
      governance:    { score: 30, trend: "stable", note: "No federal ICAC established. Tampa affair — turned back refugees amid controversy. Children overboard — parliamentary misleading. But: stable governance, few ministerial scandals by modern standards." },
      longTermDamage:{ score: 32, trend: "worsening", note: "Left structural spending commitments (middle-class welfare, private health rebates) that complicated later budgets. Housing affordability crisis began on his watch. Positive: Future Fund established 2006." },
    },
    rawScore: 35,
    deceptionScore: 38,
    deceptionMultiplier: 1.114,
    finalScore: 39,
    finalLabel: "Getting Cooked",
    overallGrade: "B",
    contextBanners: [
      { title: "Favourable economic conditions", body: "Howard governed during an exceptional global commodity boom — China's industrialisation drove iron ore and coal prices to record highs, delivering windfall tax revenue. The GFC occurred after his term. His fiscal surpluses reflect both good management AND exceptional tailwinds. The same methodology applied in far more difficult economic conditions would produce different raw scores.", severity: "info" },
      { title: "GST introduction — one-off inflation", body: "The 10% GST introduced 1 July 2000 caused a one-off CPI spike of ~3% in 2000-01. This was a known, temporary effect of tax reform — not ongoing inflation. The cost-of-living score for 2000-01 reflects this spike. Howard's underlying COL management excluding the GST transition was relatively strong.", severity: "info" },
    ],
    explanations: {
      kid: "Mr Howard was Prime Minister for a very long time — 11 years. During his time, Australia made so much money that the government paid off all its debts and actually had money left over. That had never happened before. But house prices started getting really expensive, which made things harder for younger people.",
      teen: "Howard's fiscal record is the best in our dataset — 9 consecutive surpluses, net debt eliminated by 2006-07 (first time in 30 years). Strong economic conditions (mining boom, China demand) helped massively. Housing affordability declined sharply. Children overboard affair was a serious parliamentary misleading. Overall: genuinely strong economic management in favourable conditions.",
      expert: "UCB surplus average +1.1% GDP pa over term. Net debt eliminated 2006-07 (-2.2% GDP). Structural fiscal position: genuine surplus, not resource-rent illusion — revenue-to-GDP ratio 25-26% GDP. WorkChoices: real wages continued rising despite reduced protections. GST reform structurally sound but politically costly. Housing price-to-income ratio Sydney: 4.5x (2000) → 8.5x (2007). Negative structural legacy: middle-class welfare spending embedded. Positive: Future Fund established 2006 ($60B seed).",
    },
  },

  Rudd: {
    factors: {
      economic:      { score: 52, trend: "worsening", note: "First term: strong pre-GFC growth then managed downturn. GDP contracted one quarter only — remarkable. Post-GFC recovery strong. However: mining boom drove much of the strength, not policy." },
      costOfLiving:  { score: 40, trend: "stable", note: "CPI spiked 4.4% in 2007-08 (pre-GFC) then fell sharply post-GFC. Housing prices dipped then recovered. Cost of living pressures moderate — lower than later years." },
      fiscal:        { score: 62, trend: "worsening", note: "GFC stimulus turned surpluses into deficits. UCB: -4.2% GDP (2009-10). Necessary crisis response — OECD praised Australia's response. But structural deficit persisted after stimulus period." },
      immigration:   { score: 35, trend: "stable", note: "NOM ~180,000-250,000/yr — elevated but managed. Housing stress beginning but not critical. Offshore processing removed (2008) causing surge in arrivals — political and fiscal cost." },
      wages:         { score: 42, trend: "stable", note: "Real wages flat to slightly positive during GFC. Fair Work Act 2009 strengthened worker protections. Mining boom lifted wages in resource states." },
      deception:     { score: 45, note: "Climate/ETS shelving (2010) — explicitly broke promise to legislate. Immigration detention — reversed Howard policy then reinstated elements. CPRS was central policy promise abandoned. Rudd overthrow of own government — chaotic leadership style undermined trust." },
      governance:    { score: 40, trend: "stable", note: "Sorry apology to Stolen Generations (2008) — significant positive. Pink batts program: poor implementation, 4 deaths, $2.8B waste. School Building Program: BER value-for-money concerns. GFC stimulus delivery issues." },
      longTermDamage:{ score: 50, trend: "worsening", note: "Structural deficit created by GFC response took a decade to address. NBN conception without proper cost-benefit — grew to $51B. ETS abandonment destabilised climate policy for a decade." },
    },
    rawScore: 45,
    deceptionScore: 45,
    deceptionMultiplier: 1.135,
    finalScore: 51,
    finalLabel: "Half Cooked",
    overallGrade: "C",
    contextBanners: [
      { title: "GFC context — global financial crisis", body: "2008-09 to 2009-10 saw the worst global financial crisis since the Great Depression. Australia's fiscal response (stimulus spending) converted surplus to deficit. Most economists credit the $42B stimulus with preventing recession — Australia and Poland were the only OECD nations to avoid it. The deficit scores for this period reflect necessary crisis response, not mismanagement.", severity: "info" },
      { title: "Two terms — mostly scored on first term", body: "Rudd's second term lasted only 87 days (Jun-Sep 2013). His scores primarily reflect the 2007-2010 first term where the GFC response was the defining event. The 2013 data year (2012-13) is Gillard's budget with Rudd returning only for the election campaign.", severity: "info" },
    ],
    explanations: {
      kid: "Mr Rudd became Prime Minister when a big world money crisis hit. He spent a huge amount of money quickly to stop Australia from going into a recession — it worked, but it cost a lot. He also said sorry to Aboriginal Australians for past wrongs, which was a very important moment. He then lost his job to Julia Gillard, came back briefly, then lost the election.",
      teen: "Rudd's GFC response is his legacy. The $42B stimulus worked — Australia avoided recession when almost every other developed country didn't. But it created a structural deficit that took years to fix. The ETS abandonment (promising then dumping carbon pricing) was a major broken promise that destabilised Australian climate policy for over a decade.",
      expert: "GFC fiscal impulse: 5.5% GDP over 2008-10. UCB peak deficit -4.2% GDP (2009-10). Nation Building packages: $42B. BER: $16.2B (ANAO found 97% value-for-money — better than media reporting suggests but genuine waste identified). NBN: initial NBN Co structure created governance problems that persisted. ETS: policy promise abandoned April 2010 — significant credibility damage that contributed to leadership spill.",
    },
  },

  Gillard: {
    factors: {
      economic:      { score: 55, trend: "stable", note: "Mining boom continuation. GDP growth positive but slowing. Dutch disease effects — high AUD hurt manufacturing. Minority government constrained fiscal flexibility." },
      costOfLiving:  { score: 48, trend: "worsening", note: "Carbon tax introduced July 2012 added ~$550/year to average household costs (compensated via tax cuts/payments for lower earners). Rising energy costs began. Housing starting to stress." },
      fiscal:        { score: 65, trend: "stable", note: "Deficit persisted despite promised return to surplus. Swan announced then abandoned multiple surplus commitments. Revenue writedowns from falling commodity prices. Structural deficit locked in from GFC era." },
      immigration:   { score: 38, trend: "worsening", note: "NOM elevated ~200-250K. Pacific Solution dismantled then Gillard re-introduced offshore processing (2012) after boats surged. Policy inconsistency created fiscal and social costs." },
      wages:         { score: 45, trend: "stable", note: "Real wages flat. Aged care and hospitality minimum wages increased. Mining boom still lifting overall wages. Gender pay gap addressed through equal pay case decisions." },
      deception:     { score: 52, note: "Carbon tax: 'There will be no carbon tax under a government I lead' — the most famous broken promise in recent Australian politics. Surplus promises: announced then abandoned 4 times. Leadership stability: deposed Rudd then lost to him." },
      governance:    { score: 42, trend: "stable", note: "First female PM — historic. Gonski education reform: evidence-based, well-designed but not fully funded. NDIS: landmark achievement. Minority government with crossbench — complex but functional." },
      longTermDamage:{ score: 48, trend: "stable", note: "Carbon price established structural mechanism (repealed by Abbott). NDIS created significant long-run fiscal commitment (ongoing). Gonski partially implemented. Structural deficit continued." },
    },
    rawScore: 50,
    deceptionScore: 52,
    deceptionMultiplier: 1.156,
    finalScore: 58,
    finalLabel: "Half Cooked",
    overallGrade: "C",
    contextBanners: [
      { title: "Minority government context", body: "Gillard governed with a one-seat minority, requiring support from Greens and independents for every piece of legislation. This constrained fiscal options significantly and made governing unusually difficult. The NDIS and carbon price were passed despite this constraint — a significant legislative achievement.", severity: "info" },
      { title: "Carbon tax — the famous broken promise", body: "Gillard's 'no carbon tax' statement is the most cited broken promise in modern Australian politics. The actual policy (a fixed-price carbon mechanism transitioning to an ETS) was designed with economists and was broadly sound policy. The political promise was the problem, not the policy. Abbott repealed it in 2014.", severity: "info" },
    ],
    explanations: {
      kid: "Ms Gillard was Australia's first female Prime Minister. She had a very hard job because she didn't have enough people in Parliament to vote for her — she had to convince other MPs to support each law. She started the NDIS (which helps people with disabilities) and a tax on pollution. But she had said she wouldn't do the pollution tax, which hurt her.",
      teen: "Gillard governed a minority parliament — every vote was a negotiation. Significant achievements: NDIS, Gonski reforms, carbon mechanism. Major credibility damage: 'no carbon tax' broken promise was politically fatal. Four abandoned surplus commitments. Deposed by Rudd she had deposed — leadership chaos undermined her real policy record.",
      expert: "Minority government: Greens confidence-and-supply + 3 independents. NDIS: $22B pa by 2019-20 (ongoing fiscal commitment). Carbon mechanism: $23/tonne fixed, legislated ETS transition — economically efficient but politically toxic. Revenue writedowns 2011-13: $170B cumulative. Surplus commitments: 2012-13 budget forecast surplus $1.5B → revised to deficit $19.4B → abandoned. Structural fiscal position worsened through term.",
    },
  },

  Abbott: {
    factors: {
      economic:      { score: 55, trend: "stable", note: "End of mining boom hit revenue hard. GDP growth positive but sluggish. RBA cutting rates (2.0% by 2015). Unemployment rising 5.7%→6.3%. 'No surprises' economic management claim not delivered." },
      costOfLiving:  { score: 45, trend: "improving", note: "Carbon tax repeal (July 2014) reduced electricity costs temporarily. Fuel excise restored. Dairy, meat prices stable. Housing affordability continuing to worsen in Sydney/Melbourne." },
      fiscal:        { score: 68, trend: "worsening", note: "2014 budget: most politically toxic in modern history. GP co-payment, university deregulation, welfare cuts — all blocked by Senate. Deficit persisted despite 'budget emergency' rhetoric. Hockey's $68B 'black hole' claim later questioned by Treasury." },
      immigration:   { score: 42, trend: "stable", note: "Operation Sovereign Borders — boat arrivals effectively stopped. NOM managed to ~200-230K. More controlled than predecessors. Humanitarian intake reduced." },
      wages:         { score: 55, trend: "worsening", note: "Real wages stagnant. Mining bust hit wages in resources sector. WorkChoices not revived but Fair Work amendments reduced some worker protections. Unemployment rising." },
      deception:     { score: 60, note: "Most pre-election promises listed then broken or modified in first budget: no cuts to health, education, ABC, SBS — all cut. Petrol excise: said 'no new taxes' then restored fuel excise. Commission of Audit: announced cuts far beyond election commitments. 'No surprises, no excuses' government — widely seen as failed." },
      governance:    { score: 55, trend: "worsening", note: "Knights and Dames controversy (reinstated then abandoned after Prince Philip knighthood). National Security laws expanded. Asylum seeker policy — effective on arrivals but ethically contested. Knifed by own party 2015." },
      longTermDamage:{ score: 55, trend: "stable", note: "Carbon price repealed — set back climate policy. 2014 budget scarred Australian political landscape — made future budget repair politically toxic. Defence white paper underfunded. Positive: budget repair agenda was structurally necessary even if politically delivered poorly." },
    },
    rawScore: 55,
    deceptionScore: 60,
    deceptionMultiplier: 1.18,
    finalScore: 65,
    finalLabel: "COOKED",
    overallGrade: "D",
    contextBanners: [
      { title: "Budget emergency — context on the rhetoric", body: "Abbott and Hockey declared a 'budget emergency' to justify 2014 austerity. Treasury's own modelling showed debt was sustainable — the structural deficit was real but not an emergency by international standards. The political framing overplayed the crisis to justify cuts that proved politically undeliverable.", severity: "info" },
      { title: "Senate blocked most cuts", body: "Many of Abbott's 2014 budget measures — GP co-payment, university deregulation, welfare changes — were blocked by a hostile Senate crossbench. The deficit that persisted through his term reflects partly policy failure and partly parliamentary obstruction of his stated agenda.", severity: "info" },
    ],
    explanations: {
      kid: "Mr Abbott became Prime Minister saying the country's money was in an emergency. He made a budget with lots of cuts to hospitals, universities and the ABC. But Parliament said no to most of them. He also undid the pollution tax. He was then removed by his own team and replaced by Mr Turnbull.",
      teen: "Abbott's political downfall was self-inflicted: 'no surprises' government delivered the most politically toxic budget in decades. Pre-election 'no cuts' promises were broken in the first budget. Senate blocked most measures. Carbon price repeal was his major economic act — economists generally opposed it. Removed by his own party after 2 years.",
      expert: "Pre-election commitments vs outcomes: health ($7B 10yr), education ($30B 10yr), ABC/SBS cuts contradicted direct commitments. Hockey MYEFO: $68B structural deficit — Treasury disputed methodology. 2014 Budget: $36B savings over 4yr, of which ~$20B blocked by Senate. UCB deteriorated 2013-14 to -3.0% GDP. Carbon repeal: ETS mechanism replaced by Direct Action ($2.55B) — economists near-universally opposed on efficiency grounds.",
    },
  },

  Turnbull: {
    factors: {
      economic:      { score: 45, trend: "improving", note: "Improving economic conditions. GDP growth recovering. Unemployment falling slowly. Real wages flat but trending to positive. Company tax cut proposed but not fully delivered." },
      costOfLiving:  { score: 38, trend: "stable", note: "CPI 1.9-2.1% — well within band. Housing prices surging in Sydney/Melbourne through 2016-17. Energy prices rising due to gas market dysfunction." },
      fiscal:        { score: 52, trend: "improving", note: "Deficit narrowing. 2018-19 on track for surplus (delivered under Morrison). Equity injections elevated. ANAO findings stable." },
      immigration:   { score: 30, trend: "stable", note: "NOM ~230,000/yr — managed, within forecast. Offshore processing maintained. No significant immigration accountability gap." },
      wages:         { score: 40, trend: "stable", note: "Real wages flat. Wage theft laws introduced. Penalty rate cuts by Fair Work Commission — Coalition did not oppose. Productivity low." },
      deception:     { score: 34, note: "Limited significant deception documented by fact-checkers. NBN cost overruns not adequately disclosed. Backpacker tax backflip. Energy policy instability — NEG abandoned under internal pressure." },
      governance:    { score: 45, trend: "stable", note: "Marriage equality — postal survey rather than direct vote. NEG: evidence-based climate policy abandoned due to internal party pressure. SSM delivered. Removed by Morrison leadership spill." },
      longTermDamage:{ score: 40, trend: "stable", note: "NBN cost overruns locked in. Energy policy vacuum created by NEG abandonment persisted. Structural deficit continued. Positive: NBN connections expanded significantly." },
    },
    rawScore: 40,
    deceptionScore: 34,
    deceptionMultiplier: 1.102,
    finalScore: 44,
    finalLabel: "Getting Cooked",
    overallGrade: "C",
    contextBanners: [],
    explanations: {
      kid: "Mr Turnbull was Prime Minister for nearly 3 years. He tried to fix the electricity situation but his own team stopped him. The budget was slowly getting better. He was removed by Mr Morrison in a leadership spill.",
      teen: "Turnbull's NEG (National Energy Guarantee) was actually well-designed climate/energy policy — killed by internal Liberal party conservatives. Budget trajectory improving. Real wages flat. Housing surge in his term laid groundwork for affordability crisis. Removed despite improving economic conditions.",
      expert: "UCB improving: -1.8% GDP (2015-16) to -1.0% (2017-18). NEG: modelled to reduce household energy bills $120-150/yr — abandoned due to internal party pressure Aug 2018, 2 days before leadership spill. NBN: FTTC/HFC mix vs original FTTH — capital cost $51B, ongoing structural limitation. Structural deficit trending to balance: on track for Morrison's 2018-19 near-surplus.",
    },
  },

  Morrison: {
    factors: {
      economic:      { score: 58, trend: "stable", note: "Pre-COVID: strong. COVID: managed downturn better than most. Post-COVID: supply chain + inflation emerging. GDP per capita negative end of term." },
      costOfLiving:  { score: 72, trend: "worsening", note: "CPI surged to 5.1% by end of term. Rents up 6-8%/yr. Housing prices surged during COVID low-rate era. Energy costs rising. Real wages -1.8%/yr by 2021-22." },
      fiscal:        { score: 62, trend: "worsening", note: "COVID: $107B deficit (necessary). Pre-COVID: near-surplus. Equity injections record high. ANAO findings spiked (175 findings in 2021-22)." },
      immigration:   { score: 35, trend: "stable", note: "COVID: borders closed, NOM near zero. Pre-COVID: NOM ~240K — managed. Post-COVID surge beginning late 2021 — borders reopened." },
      wages:         { score: 58, trend: "worsening", note: "Real wages fell 1.8%/yr by 2021-22. Wage theft was major issue — laws not adequately strengthened. Aged care wages scandal." },
      deception:     { score: 61, note: "Robodebt: claimed scheme was 'legal' — Royal Commission found unlawful. Secret ministries: appointed self to 5 departments without cabinet knowledge — Solicitor-General found legal but undermined responsible government. 'I don't hold a hose' (bushfires). RAT availability claims. 42% of tracked promises broken." },
      governance:    { score: 78, trend: "worsening", note: "Robodebt RC: 2,000+ unlawful debts, deaths attributed, PM office warned. Secret ministries: unprecedented. Sports rorts. Leppington triangle. ICAC delays despite commitments. National crisis response (bushfires, COVID, floods) management failures." },
      longTermDamage:{ score: 65, trend: "worsening", note: "COVID debt $230B+ — real and necessary but long-run cost. Housing crisis foundations: HomeBuilder pumped demand without supply. NDIS growth not addressed. Climate policy effectively abandoned for term." },
    },
    rawScore: 61,
    deceptionScore: 61,
    deceptionMultiplier: 1.183,
    finalScore: 72,
    finalLabel: "COOKED",
    overallGrade: "D",
    contextBanners: [
      { title: "COVID-19 context — 2020–2022", body: "Morrison governed through Australia's most significant peacetime crisis. The $107B 2020-21 deficit reflects necessary emergency spending — JobKeeper, JobSeeker expansion, healthcare. Many decisions that look poor in hindsight (RAT availability, hotel quarantine) were made under genuine uncertainty. The Cooked Metre's governance and deception scores reflect documented facts — Robodebt RC findings, the Solicitor-General's opinion on secret ministries — not partisan judgment.", severity: "info" },
      { title: "Robodebt Royal Commission findings", body: "The Royal Commission into Robodebt (2023) found the scheme was unlawful, that senior officials including those in the PM's office were warned it was legally questionable, and that approximately 2,030 compliance actions were issued after a customer's death. These are the findings of a formal Royal Commission — not political opinion. They directly inform the governance and deception scores.", severity: "warning" },
    ],
    explanations: {
      kid: "Mr Morrison was Prime Minister during COVID. He spent a lot of money to help people who lost their jobs — that was the right thing to do. But there were also some serious problems: the government sent 750,000 wrong debt letters to people (Robodebt) and said it was legal when it wasn't, and Mr Morrison secretly gave himself extra jobs in government without telling anyone.",
      teen: "Morrison's COVID response was broadly competent — Australia managed the pandemic reasonably well overall. But the documented governance failures are serious: Robodebt Royal Commission found the scheme unlawful with deaths attributed. Secret ministries were legally unprecedented. 42% broken promises. $95B super accounting trick made 2021-22 look better than it was. History will likely judge him harshly on Robodebt specifically.",
      expert: "UCB: -0.7% GDP (2018-19, near balance) → -5.3% GDP (2020-21, COVID). Robodebt RC: scheme unlawful per Federal Court. 2,030+ compliance actions post-customer death. PM's office warned of legal issues. Secret ministries: DISER, Treasury, Finance, Home Affairs, Health — Solicitor-General found powers vested but practice undermined Westminster conventions. ANAO findings: 175 (2021-22), 196 (2022-23) — highest since KAM framework introduced. Super actuarial gain $95.2B: largest non-cash entry in CFS history, inflated comprehensive result.",
    },
  },

  Albanese: {
    factors: {
      economic:      { score: 62, trend: "improving", note: "GDP positive but per-capita NEGATIVE for 6 consecutive quarters (longest since 1980s). Growth driven by population, not productivity. Productivity negative. Unemployment 3.9%→4.2% — still low. Real wages recovering but not fully restored." },
      costOfLiving:  { score: 72, trend: "improving", note: "Inherited 7% inflation, peaked 8.4% Dec 2022. Now 3.8% and falling. Rents +18% over term. Housing prices high. Energy rebates provided. Mortgage stress elevated from rate cycle." },
      fiscal:        { score: 50, trend: "improving", note: "Accrual surpluses 2022-23, 2023-24 — but cash deficits both years. $85B off-budget forward estimates. Deficit returning 2024-25. Revenue windfall from commodity/inflation — structural position not reformed." },
      immigration:   { score: 78, trend: "worsening", note: "NOM 690,000 above own 3-year forecast. Peaked 538K (2022-23) vs forecast ~200K. GDP per capita negative: population growth masking productivity contraction. Rental vacancy 1.6% (critical). Rents +18%." },
      wages:         { score: 52, trend: "improving", note: "Real wages: -2.1% then +0.8% partial recovery. Minimum wage above CPI. FWC decisions increased low-paid workers' wages. Per capita purchasing power still below 2022 levels." },
      deception:     { score: 47, note: "Stage 3 tax cuts: promised 100+ times explicitly → reversed. Real wages promise: explicitly broken (wages below pre-election levels for first 18 months). $275 electricity reduction: not delivered. Murray-Darling 450GL: 27.5GL delivered (6%). Immigration: claimed within forecast — 690K above forecast. 21% of tracked promises broken, but quality of broken promises high." },
      governance:    { score: 42, trend: "stable", note: "NACC established (significant positive). FOI compliance: declined despite transparency promise. Robodebt apology and response: appropriate. Some transparency gap on immigration figures." },
      longTermDamage:{ score: 60, trend: "worsening", note: "$85B off-budget forward estimates. Housing shortfall deepening. GDP per capita trajectory. Positive: Medicare bulk billing investment, non-compete clause ban, renewable energy investment." },
    },
    rawScore: 60,
    deceptionScore: 47,
    deceptionMultiplier: 1.141,
    finalScore: 68,
    finalLabel: "COOKED",
    overallGrade: "D",
    contextBanners: [
      { title: "Global inflation context — 2022–2023", body: "The inflation surge Albanese inherited (7%+ CPI) was primarily a global phenomenon. The RBA estimates 60-70% of Australia's excess inflation was supply-chain and global energy driven. The domestic fiscal contribution is estimated at 30-40% of excess inflation. Cost-of-living scores reflect this proportional attribution, not full responsibility for global conditions.", severity: "info" },
      { title: "Immigration accountability note", body: "The immigration factor scores accountability to the government's OWN stated forecasts — not a judgment on whether immigration is good or bad policy. The government forecast ~200,000 NOM/year. Actual was 538,000 in 2022-23 (169% above forecast). The 690,000 cumulative over-run against own targets over 3 years is what's scored. Some post-COVID rebound was structurally inevitable regardless of policy.", severity: "info" },
    ],
    explanations: {
      kid: "Mr Albanese has been Prime Minister since 2022. When he started, everything was getting expensive really fast. He brought in two years where the government collected more money than it spent — but the real cash in the bank was still negative. A lot more people moved to Australia than the government expected, which made it harder to find somewhere to live and pushed up rents.",
      teen: "Albanese inherited 7% inflation and has brought it down to 3.8%. Accrual surpluses were delivered — but cash position was still deficit. The most significant issue: 690,000 more people arrived than the government's own forecast, directly contributing to rental crisis. Stage 3 tax cut reversal was the most explicitly repeated broken promise in recent Australian politics.",
      expert: "UCB: -$22.1B (2022-23), -$15.8B (2023-24) vs NOB surpluses +$24.9B, +$10.0B. Revenue: commodity/inflation windfall +$100B+ over 2yr. NOM: 538K (2022-23) vs forecast ~200K (+169%); 446K (2023-24); 306K (2024-25). GDP per capita: -1.6% from 2022 peak (ABS 5206.0). Productivity: -0.4%/yr (ABS 5260.0). Stage 3: promised >100 occasions, redesigned (more progressive but promise broken). RMIT: 21% broken, weighted significance: high (Stage 3, real wages, electricity).",
    },
  },
};

// Build PM_CONTEXT_BANNERS from PM_SCORES (trigger: "always" for display)
export const PM_CONTEXT_BANNERS: Record<string, ContextBanner[]> = {};
for (const pm of ALL_PMS) {
  const data = PM_SCORES[pm.id];
  if (data?.contextBanners?.length) {
    PM_CONTEXT_BANNERS[pm.id] = data.contextBanners.map((b) => ({
      trigger: "always",
      title: b.title,
      body: b.body,
      severity: b.severity,
    }));
  }
}

// Deception data — RMIT/FactLab only for recent PMs; placeholders for earlier
export const DECEPTION_DATA: Record<
  string,
  {
    promises: { tracked: number; broken: number; brokenPct: number; source: string; significantBreaches?: string[]; sourceUrl?: string };
    factChecks: { rated: number; misleadingOrFalse: number; misleadingPct: number; confidenceNote: string; source: string; significantMisleading?: string[] };
  }
> = {
  Howard: {
    promises: { tracked: 0, broken: 0, brokenPct: 0, source: "RMIT tracking not available pre-2013" },
    factChecks: { rated: 0, misleadingOrFalse: 0, misleadingPct: 0, confidenceNote: "N/A", source: "RMIT FactLab from 2013" },
  },
  Rudd: {
    promises: { tracked: 0, broken: 0, brokenPct: 0, source: "RMIT tracking not available pre-2013" },
    factChecks: { rated: 0, misleadingOrFalse: 0, misleadingPct: 0, confidenceNote: "N/A", source: "RMIT FactLab from 2013" },
  },
  Gillard: {
    promises: { tracked: 0, broken: 0, brokenPct: 0, source: "RMIT tracking not available pre-2016" },
    factChecks: { rated: 0, misleadingOrFalse: 0, misleadingPct: 0, confidenceNote: "N/A", source: "RMIT FactLab from 2016" },
  },
  Abbott: {
    promises: { tracked: 0, broken: 0, brokenPct: 0, source: "RMIT tracking not available for Abbott period" },
    factChecks: { rated: 0, misleadingOrFalse: 0, misleadingPct: 0, confidenceNote: "N/A", source: "RMIT FactLab" },
  },
  Turnbull: {
    promises: { tracked: 52, broken: 16, brokenPct: 30.8, source: "RMIT ABC Fact Check 2016-18 tracking" },
    factChecks: { rated: 38, misleadingOrFalse: 14, misleadingPct: 36.8, confidenceNote: "Small sample (n=38). Wider uncertainty band.", source: "RMIT FactLab / ABC Fact Check 2016-18" },
  },
  Morrison: {
    promises: { tracked: 87, broken: 34, brokenPct: 39.1, source: "RMIT ABC Fact Check 2018-22 tracking" },
    factChecks: { rated: 87, misleadingOrFalse: 45, misleadingPct: 51.7, confidenceNote: "Large sample (n=87). Higher confidence.", source: "RMIT FactLab / ABC Fact Check 2018-22" },
  },
  Albanese: {
    promises: {
      tracked: 66, broken: 14, brokenPct: 21.2, source: "RMIT ABC Election Promise Tracker 2022-25",
      sourceUrl: "https://www.rmit.edu.au/about/schools-colleges/media-and-communication/journalism/factlab",
      significantBreaches: ["Stage 3 tax cuts (promised 100+ times)", "Real wages above pre-election levels", "$275 electricity reduction", "Murray-Darling 450GL"],
    },
    factChecks: {
      rated: 64, misleadingOrFalse: 24, misleadingPct: 37.5, confidenceNote: "Medium sample (n=64). Moderate confidence.", source: "RMIT FactLab / ABC Fact Check 2022-25",
      significantMisleading: ["Immigration 'within forecast' (690K above target)", "Real wages 'up' (per capita purchasing power still below 2022)", "$275 electricity reduction 'delivered'"],
    },
  },
};

// Build PMScore[] for getPMById and OVERALL_AVERAGE
const PM_SCORES_ARRAY: PMScore[] = ALL_PMS.map((def) => dataToPMScore(def.id, def, PM_SCORES[def.id]!));

export function getPMById(id: string): PMScore | null {
  if (id === "overall") return OVERALL_AVERAGE;
  const normalised = id.charAt(0).toUpperCase() + id.slice(1).toLowerCase();
  const found = PM_SCORES_ARRAY.find((p) => p.pmId === normalised);
  return found ?? null;
}

export function getOverallAverageScore(): PMScore {
  const n = PM_SCORES_ARRAY.length;
  const avgRaw = PM_SCORES_ARRAY.reduce((s, p) => s + p.rawScore, 0) / n;
  const avgDec = PM_SCORES_ARRAY.reduce((s, p) => s + p.deceptionScore, 0) / n;
  const mult = computeDeceptionMultiplier(avgDec);
  const finalScore = computeFinalScore(avgRaw, mult);
  const scores: Record<string, FactorScore> = {} as Record<string, FactorScore>;
  for (const fid of FACTOR_IDS) {
    const first = PM_SCORES_ARRAY[0].scores[fid];
    const avg = PM_SCORES_ARRAY.reduce((s, p) => s + (p.scores[fid]?.rawScore ?? 0), 0) / n;
    scores[fid] = {
      ...(first ?? { rawScore: 0, confidence: "B", sources: [], lastDataPoint: "", trend: "stable", explanations: { kid: "", teen: "", expert: "" } }),
      rawScore: Math.round(avg * 10) / 10,
      lastDataPoint: `Average of ${n} PMs`,
      trend: "stable",
      explanations: {
        kid: `Average score across all ${n} Prime Ministers for this factor.`,
        teen: `Overall average across all ${n} PMs (Howard to Albanese). Same weights and formula.`,
        expert: "Arithmetic mean of raw scores; deception multiplier applied to average.",
      },
    };
  }
  return {
    pmId: "overall",
    name: "Overall Average",
    party: "—",
    period: "1999–present",
    lastUpdated: PM_SCORES_ARRAY[0].lastUpdated,
    dataVersion: PM_SCORES_ARRAY[0].dataVersion,
    scores,
    deceptionScore: Math.round(avgDec * 10) / 10,
    deceptionMultiplier: mult,
    rawScore: Math.round(avgRaw * 10) / 10,
    finalScore: Math.round(finalScore * 10) / 10,
    label: getScoreLabel(finalScore),
    grade: "-",
  };
}

export const OVERALL_AVERAGE = getOverallAverageScore();

/** Immigration factor framing */
export const IMMIGRATION_FRAMING =
  "This factor measures whether immigration was planned and managed to align with Australia's housing and infrastructure capacity — based on the government's own stated targets vs actual outcomes. It does not take a position on optimal migration levels.";

export function getAlgorithmDescription(): string {
  const step1 = "Step 1: Raw score = weighted average of 8 factors (0–100 each, higher = worse).";
  const step2 = "Step 2: Deception multiplier = 1 + (deception score ÷ 100 × 0.30).";
  const step3 = "Step 3: Final score = min(100, raw score × deception multiplier).";
  const weights = Object.entries(FACTOR_WEIGHTS)
    .map(([k, v]) => `${FACTOR_LABELS[k]} ${v}%`)
    .join(", ");
  return `${step1} ${step2} ${step3} Weights: ${weights}. Deception can add up to 30% to the final score. Same formula for all PMs.`;
}
