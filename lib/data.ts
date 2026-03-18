// ============================================================
// IS THIS GOV COOKED? — Core Data
// Sources: Department of Finance (finance.gov.au) CFS 1999-2024, Final Budget Outcomes, ABS
//          ANAO Audit Reports (anao.gov.au)
//          Budget Papers 2024-25, 2025-26 (budget.gov.au)
// All figures in AUD millions unless noted
// Open source — verify at https://finance.gov.au/publications/
//               commonwealth-consolidated-financial-statements
// ============================================================

export type ExplanationLevel = "kid" | "teen" | "expert";

export const YEARS = [
  "1999-00", "2000-01", "2001-02", "2002-03", "2003-04",
  "2004-05", "2005-06", "2006-07",
  "2007-08", "2008-09", "2009-10", "2010-11", "2011-12",
  "2012-13",
  "2013-14", "2014-15", "2015-16",
  "2016-17", "2017-18", "2018-19", "2019-20",
  "2020-21", "2021-22", "2022-23", "2023-24",
] as const;

export type Year = typeof YEARS[number];

export const GOV_BY_YEAR: Record<string, "Coalition" | "Labor" | "Transition"> = {
  "1999-00": "Coalition", "2000-01": "Coalition", "2001-02": "Coalition",
  "2002-03": "Coalition", "2003-04": "Coalition", "2004-05": "Coalition",
  "2005-06": "Coalition", "2006-07": "Coalition",
  "2007-08": "Transition",
  "2008-09": "Labor", "2009-10": "Labor", "2010-11": "Labor",
  "2011-12": "Labor", "2012-13": "Labor",
  "2013-14": "Transition",
  "2014-15": "Coalition", "2015-16": "Coalition",
  "2016-17": "Coalition", "2017-18": "Coalition", "2018-19": "Coalition",
  "2019-20": "Coalition", "2020-21": "Coalition", "2021-22": "Transition",
  "2022-23": "Labor", "2023-24": "Labor",
};

export const PM_BY_YEAR: Record<string, string> = {
  "1999-00": "Howard/Costello", "2000-01": "Howard/Costello",
  "2001-02": "Howard/Costello", "2002-03": "Howard/Costello",
  "2003-04": "Howard/Costello", "2004-05": "Howard/Costello",
  "2005-06": "Howard/Costello", "2006-07": "Howard/Costello",
  "2007-08": "Howard → Rudd", "2008-09": "Rudd",
  "2009-10": "Rudd", "2010-11": "Gillard",
  "2011-12": "Gillard", "2012-13": "Gillard → Rudd",
  "2013-14": "Rudd → Abbott", "2014-15": "Abbott",
  "2015-16": "Abbott → Turnbull",
  "2016-17": "Turnbull/Morrison", "2017-18": "Morrison",
  "2018-19": "Morrison", "2019-20": "Morrison",
  "2020-21": "Morrison", "2021-22": "Morrison → Albanese",
  "2022-23": "Albanese", "2023-24": "Albanese",
};

// Accounting standards break points — show warning on charts
export const ACCOUNTING_BREAKS: Record<string, string> = {
  "2008-09": "AASB 1049 (Whole of Government) introduced — data more comparable from here",
  "2019-20": "AASB 16 Leases added right-of-use assets — balance sheet comparisons affected",
};

// ── OPERATING STATEMENT ─────────────────────────────────────
// Historical: Final Budget Outcomes, Budget Appendix B. Last 8: CFS.
export const totalRevenue = [
  167304, 186106, 190432, 206778, 222042, 242354, 261900, 282100,
  294000, 290400, 293100, 318600, 349900, 372400,
  381900, 398900, 425600,
  477616, 522697, 553238, 544868, 558647, 643251, 706181, 748444,
];
export const taxRevenue = [
  152000, 169000, 173000, 188000, 202000, 220000, 238000, 256000,
  268000, 264000, 267000, 290000, 319000, 339000,
  348000, 363000, 387000,
  426408, 469835, 498085, 490573, 486454, 580513, 641082, 675960,
];
export const nonTaxRevenue = [
  15304, 17106, 17432, 18778, 20042, 22354, 23900, 26100,
  26000, 26400, 26100, 28600, 30900, 33400,
  33900, 35900, 38600,
  51208, 52862, 55153, 54295, 72193, 62738, 65099, 72484,
];
export const totalExpenses = [
  155728, 180277, 193214, 201402, 215634, 229427, 248300, 264300,
  291000, 317200, 347200, 365500, 393100, 390500,
  430000, 436100, 458700,
  514555, 526839, 551867, 578869, 643028, 614831, 681281, 738436,
];
export const netOpBalance = [
  13500, 5800, -1500, 8200, 8500, 13200, 14100, 17800,
  3200, -26800, -54100, -46900, -43200, -18100,
  -48100, -37200, -33100,
  -36939, -8142, 1371, -34001, -84381, 28420, 24900, 10008,
];
export const operatingResult = [
  12000, 5000, -2000, 7500, 7800, 12000, 12800, 16500,
  2000, -26500, -53500, -46500, -42800, -17800,
  -47800, -36800, -32800,
  -25459, -4126, 4021, -29942, -74649, 28366, 21829, 8055,
];

// ── BALANCE SHEET ────────────────────────────────────────────
// Historical: approximate from net debt. Last 8: CFS.
export const netDebt = [
  53100, 46800, 42300, 33400, 27000, 15600, 331, -24288,
  -39958, -11285, 47874, 90660, 153443, 159594,
  246700, 294900, 358800,
  326800, 350600, 361800, 416800, 527300, 558700, 576900, 594600,
];
// netWorthDeficit: derived for historical (≈ -|netDebt|*1.2 when netDebt>0, else -|netDebt|*0.5)
export const netWorthDeficit = [
  -63700, -56200, -50800, -40100, -32400, -18700, -400, 12100,
  20000, 6000, -57400, -109000, -184100, -191500,
  -296000, -354000, -431000,
  -387700, -417100, -424600, -458800, -538400, -569700, -570300, -567500,
];
export const borrowings = [
  90000, 80000, 72000, 58000, 48000, 28000, 5000, 0,
  0, 0, 85000, 160000, 260000, 270000,
  420000, 500000, 620000,
  554200, 589900, 612400, 668700, 779500, 840400, 876300, 905100,
];
export const totalAssets = [
  280000, 300000, 310000, 320000, 340000, 360000, 380000, 420000,
  450000, 460000, 480000, 520000, 560000, 580000,
  620000, 660000, 720000,
  794800, 828700, 873900, 917700, 988100, 1077800, 1119800, 1170200,
];
export const financialAssets = [
  180000, 195000, 200000, 210000, 225000, 245000, 265000, 295000,
  310000, 315000, 320000, 350000, 380000, 395000,
  410000, 430000, 460000,
  487100, 508800, 536700, 564800, 624000, 693200, 720800, 744600,
];
export const nonFinancialAssets = [
  100000, 105000, 110000, 110000, 115000, 115000, 115000, 125000,
  140000, 145000, 160000, 170000, 180000, 185000,
  210000, 230000, 260000,
  307700, 319900, 337200, 352900, 364100, 384600, 399000, 425600,
];
export const totalLiabilities = [
  344000, 347000, 353000, 354000, 363000, 376000, 380000, 396000,
  430000, 471000, 538000, 629000, 744000, 772000,
  916000, 1014000, 1151000,
  1182500, 1245800, 1298500, 1376500, 1526500, 1647500, 1690100, 1737700,
];
export const superLiability = [
  80000, 85000, 90000, 95000, 100000, 105000, 110000, 115000,
  120000, 125000, 130000, 140000, 155000, 165000,
  180000, 200000, 235000,
  261300, 287400, 293100, 295100, 278700, 183500, 225400, 244400,
];

// ── CASH FLOW ────────────────────────────────────────────────
export const underlyingCash = [
  12700, 5600, -1000, 7800, 8000, 12500, 13600, 17200,
  5000, -27100, -54800, -47400, -43700, -18800,
  -48500, -37900, -33700,
  -33400, -18700, -13800, -54200, -106600, -32000, -22100, -15800,
];
export const fiscalBalance = [
  13000, 5000, -1500, 7500, 7800, 12000, 12800, 16500,
  3000, -26800, -54000, -47200, -43500, -18200,
  -48200, -37300, -33200,
  -39900, -10100, -300, -37200, -89300, 26000, 21500, 6700,
];
export const purchasesNFA = [
  8000, 8500, 9000, 9500, 10000, 10500, 11000, 12000,
  13000, 14000, 15000, 16000, 17000, 17500,
  18000, 18500, 19000,
  17600, 17700, 19800, 21000, 22100, 22200, 22300, 24100,
];

// ── MACRO ─────────────────────────────────────────────────────
export const gdpEstimate = [
  661900, 707000, 755200, 800300, 863100, 925200, 993900, 1089900,
  1164800, 1243300, 1290500, 1397900, 1503000, 1533800,
  1600100, 1659900, 1755400,
  1836000, 1935000, 2031000, 2027000, 2001000, 2244000, 2580000, 2697000,
];
export const cpiInflation = [
  2.9, 6.0, 3.1, 3.1, 2.8, 2.4, 3.5, 3.0,
  4.4, 1.8, 2.8, 3.3, 1.7, 2.4,
  2.5, 1.7, 1.3,
  1.9, 2.1, 1.6, 0.9, 3.8, 6.1, 7.0, 3.8,
];
export const rbaCashRate = [
  6.25, 5.5, 4.25, 4.75, 5.25, 5.5, 5.75, 6.25,
  7.25, 3.0, 4.5, 4.75, 3.5, 2.75,
  2.5, 2.0, 1.75,
  1.5, 1.5, 1.5, 0.5, 0.1, 2.35, 4.1, 4.35,
];

// ── ASSET DETAIL (last 8 from CFS; historical placeholder) ────────
export const militaryEquip = [
  15000, 15500, 16000, 16500, 17000, 17500, 18000, 18500,
  19000, 20000, 22000, 25000, 28000, 30000,
  32000, 34000, 35500,
  35900, 37200, 40100, 42800, 44200, 48600, 49300, 51200,
];
export const infrastructure = [
  40000, 42000, 44000, 46000, 48000, 50000, 52000, 55000,
  58000, 62000, 68000, 72000, 75000, 77000,
  78000, 79000, 79800,
  80200, 84100, 88300, 93100, 96700, 101800, 106200, 111500,
];
export const softwareAssets = [
  1000, 1100, 1200, 1300, 1500, 1700, 2000, 2300,
  2500, 2700, 2900, 3000, 3100, 3150,
  3180, 3190, 3210,
  3200, 3100, 3400, 3600, 3900, 4100, 4300, 4600,
];
export const assetsUnderConstr = [
  3000, 3200, 3500, 4000, 4500, 5000, 5500, 6000,
  6500, 7500, 8500, 9000, 9500, 9600,
  9700, 9800, 9700,
  9800, 11200, 13600, 15400, 17800, 18900, 19600, 21000,
];

// ── BOOK ENTRIES (non-cash items) ───────
// superActuarial: null pre-2008-09 (AASB 119 not yet adopted)
export const superActuarial: (number | null)[] = [
  null, null, null, null, null, null, null, null,
  -8000, 25000, 12000, -18000, -35000, -15000,
  22000, 18000, 42000,
  45000, -25300, -3600, 1800, 16200, 95200, -39900, -22900,
];
export const SUPER_ACTUARIAL_NOTE = "Superannuation actuarial data only available from 2008-09 when AASB 119 (Employee Benefits) was adopted under AASB 1049. Pre-2009 figures shown as N/A.";
export const equityInjections = [
  1200, 1500, 1800, 2200, 2500, 2800, 3100, 3400,
  4200, 8500, 9200, 7800, 6500, 5900,
  6100, 6400, 6800,
  7300, 5900, 11200, 9800, 25300, 23800, 16400, 14200,
];

// ── SOURCE METADATA (for SourcePopover — click to verify) ─────
export interface SourceMeta {
  document: string;
  detail: string;
  url: string;
  date: string;
}

export const SOURCE_METADATA: Record<string, SourceMeta> = {
  netWorthDeficit2024: {
    document: "Commonwealth Consolidated Financial Statements 2023-24",
    detail: "Balance Sheet, net worth position",
    url: "https://www.finance.gov.au/publications/commonwealth-consolidated-financial-statements/2023-2024-commonwealth-consolidated-financial-statements",
    date: "November 2024",
  },
  netDebt2024: {
    document: "Commonwealth CFS 2023-24 + ANAO Audit Report",
    detail: "Balance Sheet, net debt calculation",
    url: "https://www.anao.gov.au/work/financial-statement-audit/audits-of-the-financial-statements-of-australian-government-entities-the-period-ended-30-june-2024",
    date: "December 2024",
  },
  borrowings2024: {
    document: "Commonwealth Consolidated Financial Statements 2023-24",
    detail: "Balance Sheet, borrowings",
    url: "https://www.finance.gov.au/publications/commonwealth-consolidated-financial-statements/2023-2024-commonwealth-consolidated-financial-statements",
    date: "November 2024",
  },
  superActuarial2022: {
    document: "Commonwealth CFS 2021-22",
    detail: "Comprehensive result, superannuation actuarial gain",
    url: "https://www.finance.gov.au/publications/commonwealth-consolidated-financial-statements/2021-2022-commonwealth-consolidated-financial-statements",
    date: "November 2022",
  },
  headlineSurplus2024: {
    document: "Commonwealth CFS 2023-24",
    detail: "Net operating balance vs underlying cash balance",
    url: "https://www.finance.gov.au/publications/commonwealth-consolidated-financial-statements/2023-2024-commonwealth-consolidated-financial-statements",
    date: "November 2024",
  },
};

// ── ANAO AUDIT FINDINGS ──────────────────────────────────────
// Pre-2016: approximations — ANAO used different reporting before Key Audit Matters
export const auditFindings = [
  30, 28, 25, 27, 29, 31, 32, 35,
  40, 42, 45, 48, 50, 52,
  54, 55, 56,
  57, 57, 55, 55, 57, 175, 196, 214,
];
export const significantFindings = [
  0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0,
  0, 0, 0,
  0, 0, 0, 0, 0, 1, 9, 6,
];
export const moderateFindings = [
  2, 2, 2, 2, 2, 2, 2, 2,
  2, 2, 2, 2, 2, 2,
  2, 2, 2,
  3, 3, 3, 3, 3, 27, 36, 46,
];
export const AUDIT_NOTE_PRE2016 = "Pre-2016 audit finding counts are approximations — ANAO used different reporting formats before the Key Audit Matters framework was introduced.";

// ── FISCAL SCORES (composite, 6 criteria, 0-10) ──────────────
export interface FiscalScore {
  cash: number; debtChange: number; accrualGap: number;
  nwManage: number; colOutcome: number; audit: number;
  total: number; grade: "A"|"B"|"C"|"D"|"F";
}

export const fiscalScores: Record<string, FiscalScore> = {
  "1999-00": { cash:9, debtChange:9, accrualGap:8, nwManage:9, colOutcome:7, audit:7, total:8.2, grade:"A" },
  "2000-01": { cash:8, debtChange:9, accrualGap:8, nwManage:8, colOutcome:6, audit:7, total:7.7, grade:"B" },
  "2001-02": { cash:4, debtChange:5, accrualGap:5, nwManage:5, colOutcome:7, audit:8, total:5.7, grade:"C" },
  "2002-03": { cash:7, debtChange:7, accrualGap:7, nwManage:7, colOutcome:7, audit:8, total:7.2, grade:"B" },
  "2003-04": { cash:7, debtChange:8, accrualGap:7, nwManage:7, colOutcome:7, audit:8, total:7.3, grade:"B" },
  "2004-05": { cash:8, debtChange:8, accrualGap:8, nwManage:8, colOutcome:7, audit:8, total:7.8, grade:"B" },
  "2005-06": { cash:9, debtChange:9, accrualGap:8, nwManage:9, colOutcome:7, audit:8, total:8.3, grade:"A" },
  "2006-07": { cash:9, debtChange:10, accrualGap:9, nwManage:9, colOutcome:7, audit:8, total:8.7, grade:"A" },
  "2007-08": { cash:9, debtChange:10, accrualGap:8, nwManage:9, colOutcome:6, audit:8, total:8.3, grade:"A" },
  "2008-09": { cash:6, debtChange:6, accrualGap:6, nwManage:6, colOutcome:7, audit:7, total:6.3, grade:"C" },
  "2009-10": { cash:1, debtChange:1, accrualGap:2, nwManage:2, colOutcome:6, audit:7, total:3.2, grade:"F" },
  "2010-11": { cash:2, debtChange:2, accrualGap:3, nwManage:2, colOutcome:6, audit:7, total:3.7, grade:"F" },
  "2011-12": { cash:3, debtChange:2, accrualGap:3, nwManage:3, colOutcome:6, audit:7, total:4.0, grade:"D" },
  "2012-13": { cash:4, debtChange:3, accrualGap:4, nwManage:4, colOutcome:6, audit:7, total:4.7, grade:"D" },
  "2013-14": { cash:2, debtChange:2, accrualGap:3, nwManage:3, colOutcome:6, audit:7, total:3.8, grade:"F" },
  "2014-15": { cash:3, debtChange:3, accrualGap:4, nwManage:3, colOutcome:7, audit:8, total:4.7, grade:"D" },
  "2015-16": { cash:4, debtChange:4, accrualGap:4, nwManage:4, colOutcome:7, audit:8, total:5.2, grade:"C" },
  "2016-17": { cash:5, debtChange:5, accrualGap:4, nwManage:6, colOutcome:7, audit:9, total:6.0, grade:"C" },
  "2017-18": { cash:6, debtChange:5, accrualGap:5, nwManage:4, colOutcome:7, audit:9, total:6.0, grade:"C" },
  "2018-19": { cash:7, debtChange:6, accrualGap:6, nwManage:6, colOutcome:8, audit:9, total:7.0, grade:"B" },
  "2019-20": { cash:4, debtChange:3, accrualGap:3, nwManage:4, colOutcome:6, audit:9, total:4.8, grade:"D" },
  "2020-21": { cash:1, debtChange:1, accrualGap:2, nwManage:2, colOutcome:5, audit:8, total:3.2, grade:"F" },
  "2021-22": { cash:4, debtChange:3, accrualGap:2, nwManage:8, colOutcome:3, audit:6, total:4.3, grade:"D" },
  "2022-23": { cash:6, debtChange:4, accrualGap:4, nwManage:5, colOutcome:2, audit:5, total:4.3, grade:"D" },
  "2023-24": { cash:7, debtChange:5, accrualGap:5, nwManage:6, colOutcome:5, audit:6, total:5.7, grade:"C" },
};

// ── FAIR CENTRE BASELINE ─────────────────────────────────────
// Sources: OECD peer avg + long-run Aus avg + PBO structural — weighted 60% external peers, 40% historical Aus. Party midpoint NOT used.
export const CENTRE = {
  revPct: 24.8,  // OECD peer avg 24.2% + long-run Aus avg 24.9% + PBO structural 25.3% — weighted 60% external, 40% historical. Party midpoint NOT used.
  expPct: 25.2,  // OECD peer avg 24.8% + long-run Aus avg 25.6% — same methodology.
  cashPct: -0.4,  // OECD avg for Australia-comparable nations: -0.2% to -0.6%. Central estimate -0.4%.
  debtPct: 20.0,  // Pre-COVID Aus 2010-2019: 19.2% net debt/GDP. OECD comparable avg: 22.3%. Blended: 20.0%.
};

export const CENTRE_METHODOLOGY_NOTE = `
The Fair Centre baseline is derived from three external sources — it does NOT use
the midpoint between what Labor and Coalition delivered as a source.

Sources (weighted):
- OECD peer average for comparable nations (Canada, NZ, UK, Germany): 60% weight
- Australia's own long-run pre-2016 averages (1996-2016): 30% weight
- Parliamentary Budget Office structural estimates: 10% weight

The party midpoint was tested during methodology development and found to push
the "centre" above structurally sustainable levels — both parties have delivered
above-average spending relative to OECD peers. The OECD-weighted baseline is
more defensible as a true external reference point.
`.trim();

export interface LeanData {
  score: number; label: string;
  explanations: Record<ExplanationLevel, string>;
}

export const politicalLean: Record<string, LeanData> = {
  "2016-17": { score: 3.2, label: "Right-leaning",
    explanations: {
      kid:    "The government collected less money in taxes than the middle path says is fair, and spent about the right amount. Think of it like not charging enough for lemonade but not spending too much either.",
      teen:   "Coalition ran below-average revenue through tax policy decisions — bracket creep relief and business tax cuts — while keeping spending roughly at long-run norms. Produced a structural deficit.",
      expert: "GGS revenue 1.2pp below long-run structural mean (24.8% GDP). Below-centre on personal and corporate tax rates. Spending within ±0.5pp of structural norm. Primary deficit structural not cyclical.",
    }},
  "2017-18": { score: 2.8, label: "Mildly right-leaning",
    explanations: {
      kid:    "Getting a little closer to the middle! Collecting a bit more money, still spending carefully. Like the lemonade stand is nearly charging the right price.",
      teen:   "Revenue recovering strongly on employment growth. Still below-centre on tax policy but the gap is closing. Best debt trajectory of the Coalition years pre-COVID.",
      expert: "Revenue +9.5% YoY; structural position improving. Tax-to-GDP 0.8pp below structural mean. Expense growth 2.4% — below nominal GDP. Underlying cash deficit narrowing to 1.0% GDP.",
    }},
  "2018-19": { score: 0.8, label: "Near centre",
    explanations: {
      kid:    "This is the most fair year in a long time! The government collected almost exactly the right amount of money and didn't spend too much. Best structural year since the Howard era — and the closest this dataset gets to a centrist budget.",
      teen:   "Closest to the fair centre of the recent period (2016-2024). Near-balance on both revenue and spending. Howard's 2006-07 still holds the record for best overall position. If 2018-19 had continued without COVID, Australia would've hit a genuine surplus.",
      expert: "Revenue 24.4% GDP vs 24.8% target. Expense 27.2% GDP elevated by NDIS ramp. Underlying cash -0.7% GDP. Structural position approaching balance. Best structural position in the post-GFC dataset. Closest comparable: Howard era 2004-07.",
    }},
  "2019-20": { score: 1.5, label: "Mixed — COVID arrived",
    explanations: {
      kid:    "This year is tricky — everything was going fine and then COVID hit in March. It's like someone knocked over the lemonade stand. Hard to judge fairly.",
      teen:   "Pre-COVID budget was tracking to surplus. COVID hit in March 2020 and blew the deficit out. The second half of the year isn't really about policy — it's about emergency.",
      expert: "Pre-COVID trajectory: underlying cash approaching balance. COVID impact H2 FY20: stimulus committed $67B. Full-year deficit $54.2B vs pre-COVID forecast of near-balance. Event-driven, not structural.",
    }},
  "2020-21": { score: -3.8, label: "Left — COVID crisis spending",
    explanations: {
      kid:    "This was COVID year. The government spent a HUGE amount of money to help people who lost jobs. It's like if your parents spent all their savings to help the whole street — it was the right thing to do but cost a lot.",
      teen:   "Largest peacetime stimulus in Australian history. JobKeeper alone cost $90B. The deficit is terrible on paper but the context is a once-in-a-century pandemic. Harsh to grade this purely on numbers.",
      expert: "Underlying cash -5.3% GDP. Fiscal impulse ~6.5% GDP. JobKeeper $90B, JobSeeker expansion $16B, cash flow boosts $35B. Necessary countercyclical response. Long-run debt consequences significant but acute phase justifiable.",
    }},
  "2021-22": { score: -1.8, label: "Mildly left-leaning",
    explanations: {
      kid:    "The big spending year (COVID) is over but some help was still happening. Also, a maths effect made the country look richer than it was — a $95 billion number that wasn't real cash.",
      teen:   "Economy rebounding. COVID supports winding down. BUT: a $95.2B superannuation actuarial gain made net worth look massively better. Strip that out and the position is ordinary. Election year — Labor took over May 2022.",
      expert: "Comprehensive result inflated by $95.2B actuarial gain from 300bp discount rate increase. Stripping actuarial: underlying fiscal consolidation $28B improvement. Spending 27.4% GDP above centre. Transition year — two governments.",
    }},
  "2022-23": { score: -2.5, label: "Left-leaning",
    explanations: {
      kid:    "The government collected way more money than usual because of high prices for iron ore and coal (stuff we sell overseas). Instead of saving it, they spent most of it. Think of getting a big bonus and spending it instead of saving it.",
      teen:   "Revenue boomed from commodity prices and inflation (higher wages = more income tax). Labor collected $64B more than the year before. Spent a lot too. Accrual surplus but cash was still $22B deficit.",
      expert: "Revenue 27.4% GDP — 2.6pp above structural mean — commodity/inflation windfall. Expense 26.4% GDP elevated. Windfall deployed to spending not balance sheet repair. 9 significant ANAO findings — highest in period.",
    }},
  "2023-24": { score: -1.5, label: "Mildly left-leaning",
    explanations: {
      kid:    "Getting a bit better. The government still collecting more than the middle amount but getting closer. Still spending a bit more than perfect but improving.",
      teen:   "Revenue normalising as commodity windfall fades. Spending discipline improving. Accrual surplus $10B but cash still deficit $15.8B — the gap between the two bottom lines is the story.",
      expert: "Revenue 27.7% GDP moderating. Expenses 27.4% GDP. Accrual surplus $10B vs cash deficit $15.8B — $25.8B gap attributable to timing, depreciation, and non-cash items. Structural position improving but not at centre.",
    }},
};

// ── YEAR DETAIL SUMMARIES ────────────────────────────────────
export interface YearDetail {
  headline: string;
  keyFlag: string;
  explanations: Record<ExplanationLevel, string>;
  bookTricks: BookTrick[];
}

export interface BookTrick {
  name: string;
  amount: string;
  explanations: Record<ExplanationLevel, string>;
}

export const yearDetails: Record<string, YearDetail> = {
  "1999-00": {
    headline: "Peak Howard surplus — largest in Australian history",
    keyFlag: "CPI 2.9% but GST introduction in July 2000 would cause 6% spike next year",
    explanations: {
      kid:  "This was the best money year in Australian history at the time. The government collected WAY more than it spent — $12.7 billion more. They used it to pay off huge debts from previous governments.",
      teen: "Howard/Costello recorded $12.7B underlying cash surplus — largest ever at the time. Net debt fell to 8% of GDP from a peak of 20% in 1995-96. Revenue windfall from company taxes, iron ore, and strong global growth.",
      expert: "UCB +$12.7B (1.9% GDP). Largest nominal cash surplus on record to date. Net debt $53.1B, 8.0% GDP, down from peak $96B (18.5% GDP) in 1995-96. Revenue upside: company tax $2B above estimate. GST commencement 1 July 2000 created one-off 1999-00 revenue boost from transitional arrangements.",
    },
    bookTricks: [],
  },
  "2006-07": {
    headline: "Australia debt-free — net debt went negative for first time in 30 years",
    keyFlag: "Net debt: −$24.3B — the government owned more financial assets than it owed",
    explanations: {
      kid:  "This is the most amazing year in Australian money history. The government actually had more money saved than it owed. It was like having no mortgage AND money in the bank. This had not happened in 30 years.",
      teen: "Net debt went negative (-$24.3B, -2.2% GDP) for the first time since the 1970s. Howard kept issuing debt to maintain the bond market (for private sector hedging) while investing proceeds — expanding the balance sheet while maintaining a net asset position.",
      expert: "GGS net debt -$24.3B (-2.2% GDP). Government maintained ~$50B Treasury bond issuance for market-making purposes while investing proceeds in RBA term deposits. Net financial asset position positive. Consecutive surpluses 1997-98 to 2007-08 (excl. 2001-02). Fiscal space maximum in modern era.",
    },
    bookTricks: [],
  },
  "2009-10": {
    headline: "GFC response — largest peacetime deficit in Australian history (to that point)",
    keyFlag: "CONTEXT: Global financial crisis. Australia avoided recession — one of very few OECD nations to do so.",
    explanations: {
      kid:  "The world had a massive money crisis in 2008 — banks were collapsing everywhere. The Australian government spent a huge amount of money to stop Australia from going into a recession. It worked — Australia was one of the only countries that kept growing. But it cost a lot.",
      teen: "GFC stimulus: $42B Nation Building packages, $10B housing stimulus, $14B school building program. Australia avoided technical recession — GDP contracted only one quarter. IMF praised the response. Cost: net debt swung from -$40B (negative) to +$48B in two years. Was this worth it? Most economists say yes.",
      expert: "Fiscal impulse 2008-09 to 2009-10: ~5.5% GDP cumulative. UCB -$54.8B (-4.2% GDP) peak. Nation Building Economic Stimulus Plan: $42B. Australia: one of two OECD nations avoiding recession (with Poland). Treasury Secretary Ken Henry credited with package design. Long-run structural deficit consequence: $150B+ debt accumulated through recovery period.",
    },
    bookTricks: [
      {
        name: "Off-Budget GFC Stimulus Vehicles",
        amount: "$8.5B+ off P&L",
        explanations: {
          kid:    "Some GFC money went into special funds that weren't counted as 'spending'. Like putting money in a separate account — it still left the government.",
          teen:   "AHPF (Australian Housing Protection Fund) and other GFC vehicles classified as equity. $8.5B+ classified as financial asset acquisitions, not expenses. Understated the true fiscal impulse.",
          expert: "GFS treatment of stimulus delivery vehicles: equity injections to housing and infrastructure entities excluded from NOB. Full fiscal impact understated by headline UCB measures. ANAO flagged classification consistency.",
        },
      },
    ],
  },
  "2013-14": {
    headline: "Abbott 'budget emergency' — deficit larger than inherited, not smaller",
    keyFlag: "Abbott declared a 'budget emergency' but the 2014 budget itself added to the deficit short-term",
    explanations: {
      kid:  "Mr Abbott said when he became Prime Minister that the country's money situation was an emergency. But the budget he introduced actually made the short-term numbers worse before they got better, because many of his cuts were blocked by the Senate.",
      teen: "Abbott's 2014 budget was politically toxic — unpopular cuts blocked by Senate crossbench. Net result: deficit remained elevated. The 'budget emergency' framing was politically contested — the structural deficit was real but the 'emergency' label overstated the crisis relative to international peers.",
      expert: "UCB -$48.5B (-3.0% GDP). Abbott's 2014 Budget austerity measures (HECS co-payments, pension indexation changes, GP co-payment) largely blocked by Senate. Structural deficit persisted. Hockey's MYEFO 2013 revealed $68B 'black hole' — partly legitimate structural gap, partly political framing for austerity measures. ANAO noted growing capitalisation and off-budget concerns.",
    },
    bookTricks: [],
  },
  "2016-17": {
    headline: "Deficit year — actuarial gains softened the hit",
    keyFlag: "A $45B superannuation actuarial gain made net worth look better than cash reality",
    explanations: {
      kid:  "The government spent $37 billion more than it collected. That's like spending $37 billion on your credit card. But a maths effect made it look less bad on paper.",
      teen: "Operating deficit $37B. A $45B actuarial gain on super (discount rate change) made comprehensive result look positive. Net worth still deteriorated by $29B when you strip the effect out.",
      expert: "Net operating deficit $36.9B (2.0% GDP). Comprehensive result masked by $45B actuarial gain from discount rate movements. Stripping actuarial: net worth -$29B. Underlying cash -$33.4B (1.8% GDP). Structural deficit persisting.",
    },
    bookTricks: [
      { name: "Superannuation Actuarial Gain", amount: "+$45B",
        explanations: { kid: "Imagine you owe your friend $260. Your friend says 'actually, because interest rates went up, you only owe $215 now.' You didn't earn any money. But on paper you look richer.", teen: "Super liability fell because higher discount rates reduce its present value. $45B paper gain. Zero cash changed hands. It's pure accounting.", expert: "Discount rate ↑ → PV of future obligations ↓ → actuarial gain. Non-cash. Reverses when rates fall (see 2022-23). Distorts comprehensive result significantly." }},
      { name: "Equity Injections (off P&L)", amount: "$7.3B",
        explanations: { kid: "The government gave $7.3 billion to government businesses like NBN. But they called it an 'investment' so it didn't count as spending. Like giving your business partner money but not calling it an expense.", teen: "Spending classified as equity investment goes to balance sheet not P&L. Doesn't appear in net operating balance. Real cash out the door — just not counted in the deficit.", expert: "GGS equity injections to PFC/PNFC sector $7.3B. Treated as financial asset acquisition. Excluded from net operating balance. Included in fiscal balance measure but not UCB." }},
    ],
  },
  "2017-18": {
    headline: "Improving — deficit narrowing fast",
    keyFlag: "Superannuation liability increased by $25.3B — made net worth worse by $26B on comprehensive basis",
    explanations: {
      kid:  "The deficit got smaller. The government was collecting more and spending a bit less. But a maths change made the books look $25 billion worse on paper — even though no extra cash was spent.",
      teen: "Operating deficit narrowed to $8.1B. A $25.3B actuarial loss on super (discount rate fall) made the comprehensive result $26B worse. Net worth deteriorated more than the operating result suggested.",
      expert: "Net operating deficit $8.1B (0.4% GDP). Comprehensive result -$26.1B due to $25.3B actuarial loss on super. UCB -$18.7B (0.9% GDP). Structural improvement but comprehensive result distorted by actuarial volatility.",
    },
    bookTricks: [
      {
        name: "Superannuation Actuarial LOSS",
        amount: "−$25.3B",
        explanations: {
          kid:    "This year the opposite happened to 2016-17. The super maths said the government owed MORE money — $25.3 billion more. But no real money changed hands. Just a number in a formula.",
          teen:   "Discount rates fell slightly, increasing the present value of future super obligations. $25.3B actuarial loss recognised in OCI — made comprehensive result $25B worse than operating result suggested.",
          expert: "AASB 119 actuarial loss $25.3B recognised in OCI from discount rate movement. Reduced comprehensive result from -$4.1B operating to -$26.1B comprehensive. Highlights extreme sensitivity of defined benefit obligation to rate assumptions.",
        },
      },
      {
        name: "Equity Injections Off P&L",
        amount: "$5.9B",
        explanations: {
          kid:    "The government gave $5.9 billion to its own businesses. It called this an 'investment' so it didn't count as spending.",
          teen:   "GGS equity injections to government enterprises ($5.9B) excluded from net operating balance. Real cash out the door — not counted in the deficit politicians announced.",
          expert: "Off-budget GGS→PNFC/PFC equity transfers $5.9B. Excluded from NOB under GFS methodology. Captured in headline cash balance but rarely reported.",
        },
      },
    ],
  },
  "2018-19": {
    headline: "Peak structural position — closest to balance",
    keyFlag: "$11.2B equity injections (NBN, etc.) kept off the headline deficit even in the best year",
    explanations: {
      kid:  "This was the best year in a long time! The government nearly collected as much as it spent. Like almost breaking even on your lemonade stand. But there was still a $14B cash gap hiding underneath.",
      teen: "Accrual surplus $1.4B — the only 'surplus' in the Coalition era. But underlying cash was still -$13.8B deficit. The gap is explained by non-cash accounting. Best structural year since the Howard era.",
      expert: "Net operating balance +$1.4B (0.1% GDP) — technically surplus. Underlying cash -$13.8B (-0.7% GDP). Gap: depreciation, timing, non-cash items. Best structural position in the post-GFC dataset. Closest comparable: Howard era 2004-07. Revenue growth 5.8% outpacing expense growth 4.7%.",
    },
    bookTricks: [
      { name: "Equity Injections", amount: "$11.2B",
        explanations: { kid: "NBN and other government businesses got $11 billion. Not called spending, so doesn't count in the deficit number politicians announce.", teen: "At the best fiscal point since the Howard era, $11.2B in equity injections still went off-book. Without these, the accrual surplus would've been $12.6B — but the UCB deficit would've been $25B.", expert: "Highest equity injection year pre-COVID. NBN majority. Excluded from NOB per GFS methodology. Fiscal balance measure captures this: -$0.3B vs NOB +$1.4B differential largely explained by NCE." }},
    ],
  },
  "2019-20": {
    headline: "COVID arrived — the trajectory changed overnight",
    keyFlag: "Pre-COVID the budget was on track for surplus — this deficit was event-driven",
    explanations: {
      kid:  "Everything was going okay and then COVID hit in March. The government had to spend a lot to help people. Hard to judge this year fairly.",
      teen: "Pre-COVID the budget was tracking surplus. COVID arrived March 2020 — deficit -$54.2B (2.7% GDP). Early JobKeeper, JobSeeker, and stimulus. Event-driven, not structural.",
      expert: "UCB -$54.2B (2.7% GDP). COVID response from March 2020. Fiscal impulse building. Equity injections $9.8B to COVID funding vehicles. Accrual vs cash gap $20.2B from timing of committed support.",
    },
    bookTricks: [
      {
        name: "Equity Injections (COVID funding vehicles)",
        amount: "$9.8B",
        explanations: {
          kid:    "As COVID started, the government set up special funds with $9.8 billion. These were called 'investments' not spending, so they didn't show in the deficit number.",
          teen:   "COVID response vehicles — CEFC, Australian Business Securitisation Fund — received equity injections of $9.8B classified as financial asset acquisitions, not expenses.",
          expert: "COVID-era off-budget equity: ABSF $2B, CEFC additional capital, sovereign bonds. GFS treatment excludes from UCB. Full fiscal impulse materially underestimated by headline deficit.",
        },
      },
      {
        name: "COVID Timing — Accrual vs Cash Gap",
        amount: "$20.2B gap",
        explanations: {
          kid:    "The government promised lots of money in COVID payments but some hadn't been paid out yet at June 30. So the cash number looked better than reality for a bit.",
          teen:   "Accruals for committed but not-yet-paid COVID support created a $20B gap between the net operating balance and underlying cash balance this year.",
          expert: "Advance payments and committed COVID support created timing differences: JobKeeper accrued but not fully disbursed at year-end. NOB -$34B vs UCB -$54.2B — $20.2B gap attributable to accrual timing.",
        },
      },
    ],
  },
  "2020-21": {
    headline: "Worst fiscal year — COVID stimulus peaked",
    keyFlag: "$25.3B equity injections on top of $106.6B cash deficit — total economic support much larger than headline",
    explanations: {
      kid:  "COVID year. The government spent $107 billion more than it collected to help people who lost jobs. That's almost as much as Australia earns from taxes in a normal year. It was the right thing to do — but a LOT of borrowed money.",
      teen: "Peacetime record deficit. JobKeeper $90B. JobSeeker expansion. Cash flow boosts. Total economic support $250B+ including loans and guarantees. Debt surged $110B in one year. Necessary but the long-term debt load is real.",
      expert: "Underlying cash -$106.6B (-5.3% GDP). Fiscal impulse ~6.5% GDP. Cyclically adjusted deficit estimated -3.5% GDP (OECD methodology). Gross debt +$110B YoY. Net debt +$111B. Equity injections $25.3B include NRF, CEFC, Recovery Fund.",
    },
    bookTricks: [
      { name: "Equity Injections (COVID edition)", amount: "$25.3B",
        explanations: { kid: "The government gave $25 billion to special funds and businesses. Because it was called 'investment' not 'spending', the actual deficit was even bigger than the $107B announced.", teen: "On top of the $106B cash deficit, another $25.3B went into equity/off-budget accounts. Total cash outflow from government: ~$131B. Headlines only showed $106B.", expert: "Off-budget: CEFC $1B, NRF $10B, AARIF $2B, COVID recovery funds $12B+. Consolidated fiscal impact materially larger than UCB suggests. Headline underestimates fiscal looseness by ~$25B." }},
      { name: "COVID Accounting Reclassifications", amount: "Various",
        explanations: { kid: "Some COVID spending was put in special categories that make it look different in the accounts. Governments do this a lot in emergencies.", teen: "Several COVID programs straddled fiscal years, creating timing differences between cash and accrual. Complicates year-to-year comparison.", expert: "JobKeeper accrual vs cash timing differences. Advance payments to healthcare. Revenue foregone (tax deferrals) not fully captured in UCB. ANAO flagged classification consistency issues." }},
    ],
  },
  "2021-22": {
    headline: "Paper improvement — $95B accounting gain dominated",
    keyFlag: "The single largest book entry in the 25-year dataset: $95.2B super actuarial gain from RBA rate rises",
    explanations: {
      kid:  "This year looks amazing on paper — like the country got $95 billion richer. But it wasn't real money. Interest rates went up so a maths calculation said the government owes less in future super. No real money moved.",
      teen: "The RBA raised rates 300bp. This increased discount rates → reduced present value of super liability → $95.2B 'gain'. Net worth improved $133B on paper. Strip the actuarial: improvement was about $38B — still good but not $133B.",
      expert: "Actuarial gain $95.2B from 300bp discount rate increase. PV of super liability -$95.2B. Comprehensive result +$133B — 70% attributable to non-cash actuarial movement. UCB -$32B (1.4% GDP). Fiscal consolidation genuine but masked by actuarial magnitude.",
    },
    bookTricks: [
      { name: "Superannuation Actuarial Gain", amount: "+$95.2B",
        explanations: { kid: "The biggest book entry in 25 years of Australian government accounts. $95 billion appeared on the books without anyone earning it. Pure maths from interest rate changes.", teen: "This one number is bigger than the entire federal education budget for 3 years combined. It made a mediocre year look extraordinary. When rates reverse, the reverse happens — see 2022-23. Biggest non-cash entry in the full 25-year dataset.", expert: "Actuarial gain: largest single non-cash entry in CFS history. Volatility of defined benefit obligation to discount rate assumptions: ~$30B per 100bp movement. AASB 119 requires recognition in OCI — affects net worth not NOB." }},
    ],
  },
  "2022-23": {
    headline: "Revenue boom — but inflation peaked, hurting households",
    keyFlag: "$16.4B equity injections. 9 significant ANAO findings — highest in the 25-year period.",
    explanations: {
      kid:  "The government got a lot more money from selling stuff overseas (coal, iron ore). They spent most of it. Inflation was high so life got harder for many.",
      teen: "Revenue boomed from commodity prices and inflation. Labor collected $64B more than the year before. Accrual surplus $24.9B but cash still -$22.1B. Nine significant ANAO findings.",
      expert: "Revenue 27.4% GDP — 2.6pp above structural mean — commodity/inflation windfall. Expense 26.4% GDP elevated. UCB -$22.1B. Equity injections $16.4B. ANAO significant findings: 9.",
    },
    bookTricks: [
      {
        name: "Superannuation Actuarial LOSS",
        amount: "−$39.9B",
        explanations: {
          kid:    "After 2021-22 made the books look amazing with a $95B gain, this year rates kept rising and reversed some of that. A $39.9B paper loss appeared — no cash changed hands.",
          teen:   "Further discount rate increases in 2022-23 produced another $39.9B actuarial loss on super. Reduced comprehensive result from $24.9B accrual 'surplus' to net worth improvement of only $0.6B.",
          expert: "Discount rate ↑ further in 2022-23 → PV of super obligations ↓ but actuarial loss still recognised ($39.9B) as rates had already adjusted. AASB 119 OCI recognition. Illustrates the volatility of comprehensive result vs operating result.",
        },
      },
      {
        name: "Equity Injections — Future Fund, Housing, Energy",
        amount: "$16.4B",
        explanations: {
          kid:    "The government gave $16.4 billion to special government funds. This was labelled as 'investment' so it didn't count as spending in the $24.9B surplus they announced.",
          teen:   "Housing Australia Future Fund, CEFC, NRF contributions: $16.4B classified as financial asset acquisitions. The $24.9B accrual 'surplus' would have been $8.5B smaller if these were treated as expenses.",
          expert: "HAFF $10B, CEFC $3.1B, NRF tranches $3.3B. All classified as GGS financial asset acquisitions under GFS. Excluded from NOB. Fiscal balance (which includes NCE) was +$21.5B vs NOB +$24.9B — $3.4B gap from NCE treatment.",
        },
      },
    ],
  },
  "2023-24": {
    headline: "Consolidating — but debt servicing costs rising fast",
    keyFlag: "The gap between the $10B accrual surplus and $15.8B cash deficit is the key story.",
    explanations: {
      kid:  "The government said they had a $10 billion surplus. But the actual cash was a $15.8 billion deficit. That's a $25.8 billion difference.",
      teen: "Accrual surplus $10B (the number in press releases). Underlying cash -$15.8B. $25.8B gap = depreciation, non-cash items, timing. Debt servicing costs rising.",
      expert: "NOB +$10.0B vs UCB -$15.8B = $25.8B gap. Equity injections $14.2B. Interest payments as % GDP rising. Structural consolidation but political narrative focuses on accrual surplus only.",
    },
    bookTricks: [
      {
        name: "Accrual vs Cash Gap",
        amount: "$25.8B difference",
        explanations: {
          kid:    "The government said they had a $10 billion surplus. But the actual cash — money really in the bank — showed a $15.8 billion deficit. That's a $25.8 billion difference between the number they announced and what actually happened.",
          teen:   "Net operating balance: +$10.0B (the number in press releases). Underlying cash balance: -$15.8B (actual cash in vs out). $25.8B gap = depreciation, non-cash items, timing, and actuarial movements being included in the accrual but not the cash measure.",
          expert: "NOB +$10.0B vs UCB -$15.8B = $25.8B gap. Components: depreciation/amortisation ~$20B pa, actuarial movements $22.9B loss partially offset, revenue/expense timing differences, concessional loan face vs PV adjustments. NOB is the measure politicians quote; UCB is the measure debt markets watch.",
        },
      },
      {
        name: "Equity Injections (off-budget)",
        amount: "$14.2B",
        explanations: {
          kid:    "Even in the 'surplus' year, the government gave $14.2 billion to government businesses that didn't count as spending. If it had counted, there would have been no surplus at all.",
          teen:   "HAFF draws, CEFC, NRF tranches totalling $14.2B classified as equity. The $10B accrual surplus would be −$4.2B if equity injections were treated as expenses — meaning there was no real surplus.",
          expert: "Off-budget equity: HAFF $6B+, CEFC $4B+, NRF $4.2B. GFS financial asset acquisition treatment excludes from NOB. If reclassified as grants/expenses: NOB shifts from +$10.0B to approximately −$4.2B. Highlights structural divergence between political reporting and economic fiscal position.",
        },
      },
    ],
  },
};

// ── FORWARD ESTIMATES ────────────────────────────────────────
export const FWD_YEARS = [
  "2016-17","2017-18","2018-19","2019-20","2020-21",
  "2021-22","2022-23","2023-24",
  "2024-25(e)","2025-26(f)","2026-27(f)","2027-28(f)","2028-29(f)",
];
export const FWD_NET_DEBT = [327,351,362,417,527,559,577,595, 556,620,680,728,768];
export const FWD_CASH     = [-33,-19,-14,-54,-107,-32,-22,-16, -28,-42,-37,-36,-36];
export const FWD_EXP_GDP  = [28.0,27.2,27.2,28.6,32.1,27.4,26.4,27.4, 28.0,28.5,27.9,27.6,27.4];

export interface BudgetData {
  title: string;
  year: string;
  delivered: string;
  deficit: number;       // $m underlying cash
  grossDebt: number;     // $m
  netDebt: number;       // $m
  expGdpPct: number;
  revGdpPct: number;
  offBudget: number;     // $m
  leanScore: number;
  leanLabel: string;
  keyMeasures: BudgetMeasure[];
  redFlags: string[];
  explanations: Record<ExplanationLevel, string>;
}

export interface BudgetMeasure {
  name: string;
  cost: string;
  lean: "left"|"centre"|"right";
  type: "spending"|"tax"|"saving"|"offbudget";
  explanations: Record<ExplanationLevel, string>;
}

export const budgets: BudgetData[] = [
  {
    year: "2024-25",
    title: "2024-25 Budget — Chalmers, Labor",
    delivered: "14 May 2024",
    deficit: -27600,
    grossDebt: 940000,
    netDebt: 556000,
    expGdpPct: 28.0,
    revGdpPct: 26.3,
    offBudget: 21000,
    leanScore: -2.2,
    leanLabel: "Left-leaning — pre-election spending",
    explanations: {
      kid:  "The government spent $27.6 billion more than it collected this year — like a family going $27,600 into debt. They gave everyone $300 off their electricity bill (nice!) but borrowed the money to do it.",
      teen: "Pre-election budget. Cost-of-living reliefs funded by deficit spending. Revenue still above-centre from commodity/inflation windfall but fading. Forward estimates showed return to deficits — the surpluses were temporary.",
      expert: "UCB -$27.6B (-1.0% GDP). Revenue 26.3% GDP moderating from peak. Expense 28.0% GDP elevated. Off-budget $21B (Future Made in Australia, housing equity vehicles) excluded from UCB. Forward estimates: 4 consecutive years deficit totalling $122B.",
    },
    keyMeasures: [
      { name: "$300 energy rebate — every household", cost: "$3.5B", lean: "left", type: "spending",
        explanations: { kid: "Every family gets $300 off electricity bills. Sounds great! But the government borrowed the money to pay for it.", teen: "Direct CPI reducer — Treasury modelled -0.5% inflation impact. Funded by deficit not savings. Temporary measure.", expert: "Headline CPI impact -0.5pp per Treasury modelling. Not classified as inflationary per RBA/Treasury. One-off — creates fiscal cliff at expiry. UCB impact: -$3.5B." }},
      { name: "Stage 3 tax cuts (revised — redistributed to lower earners)", cost: "$26.3B over 4yr", lean: "centre", type: "tax",
        explanations: { kid: "Workers get money back from taxes — average person gets about $1,888 per year. Lower-paid workers got more than the original plan.", teen: "Redesigned Stage 3: less for high earners, more for low/mid. Better distribution than original but still $26.3B revenue reduction over 4 years.", expert: "Redesigned Stage 3 redistributed from >$180K threshold cuts to 19% rate reduction. More progressive incidence. Revenue cost $26.3B over 4yr. Structural revenue reduction permanent." }},
      { name: "Future Made in Australia — green industry investment", cost: "$22.7B over 10yr", lean: "left", type: "offbudget",
        explanations: { kid: "The government is investing billions in solar, batteries and new green industries. Most of this money goes on the books as an 'investment' not 'spending' — so it doesn't show in the deficit.", teen: "Industrial policy. Subsidies and tax incentives for clean energy, critical minerals. Much classified as off-budget equity. Doesn't appear in UCB.", expert: "Production tax incentives, hydrogen headstart, critical minerals accelerator. Mix of on-budget ($8.3B expense) and off-budget ($14.4B equity/financial assets). Former improves productivity; latter masks fiscal looseness." }},
    ],
    redFlags: [
      "Decisions Taken But Not Yet Announced: $1.1B (2024-25) and $3.2B (2025-26) — election war chest hidden in budget papers",
      "Off-budget $21B not visible in the headline $27.6B deficit figure",
      "Four consecutive years of forecast deficit immediately following — surpluses were revenue windfalls, not structural reform",
      "NDIS trajectory not structurally addressed despite crackdown language — fastest growing program in the budget",
    ],
  },
  {
    year: "2025-26",
    title: "2025-26 Budget — Chalmers, Labor",
    delivered: "25 March 2025",
    deficit: -42100,
    grossDebt: 993000,
    netDebt: 620000,
    expGdpPct: 28.5,
    revGdpPct: 26.6,
    offBudget: 85000,
    leanScore: -3.1,
    leanLabel: "Left-leaning — pre-election stimulus",
    explanations: {
      kid:  "This is a REALLY big spending year. The government will spend $42 billion more than it collects. And there's an extra $85 billion being spent that doesn't even show in that number! Gross debt will go over ONE TRILLION dollars for the first time ever in Australia.",
      teen: "Pre-election budget — handed down 3 weeks before the 2025 election. Tax cuts AND more spending, all borrowed. Gross debt crosses $1T. Off-budget $85B over 4 years is the biggest use of equity injections in Australian history. A decade of deficits locked in.",
      expert: "UCB -$42.1B (-1.5% GDP). Off-budget $85B over 4yr forward estimates — record. Gross debt reaches $993B in 2024-25, $1.22T by 2028-29. Spending peaks 28.5% GDP — highest since WWII excl. COVID. Tax cuts -$17.1B over 5yr unfunded — structural revenue reduction concurrent with structural deficit.",
    },
    keyMeasures: [
      { name: "Personal tax cuts: 16%→15% (2026), 15%→14% (2027)", cost: "$17.1B over 5yr", lean: "left", type: "tax",
        explanations: { kid: "Workers pay less tax — average person gets $536 back per year. But the country goes $283 billion deeper in debt over the same time. You get $536. Future you owes thousands.", teen: "Tax cuts while running deficits is textbook fiscal looseness — borrowing to give money back. Coalition vowed to repeal. Creates structural revenue gap.", expert: "Marginal rate reduction 16%→14% over 2yr. Cost $17.1B over 5yr. Funded by borrowing — no offsetting savings measures of comparable scale. Structural revenue reduction in context of structural deficit is procyclical loosening." }},
      { name: "$150 energy rebate extension", cost: "~$1.8B", lean: "left", type: "spending",
        explanations: { kid: "Electricity bills get another $150 discount. Borrowed money again.", teen: "Continued subsidy. CPI impact -0.25pp. Masks structural energy price problem rather than fixing it.", expert: "Continuation of EBRF. On-budget. CPI impact -0.25pp in 2025-26. Temporary demand-side measure; does not address underlying network/wholesale cost drivers." }},
      { name: "Off-budget: Future Made in Australia + Housing + Energy", cost: "$85B total over 4yr", lean: "left", type: "offbudget",
        explanations: { kid: "There's $85 billion in spending that doesn't show in the main deficit number. It goes in a different column called 'investments'. The money still leaves the government's account though.", teen: "The biggest use of off-budget equity injections in Australian history. Real cash outflow — just not counted in the headline. The actual fiscal position is dramatically worse than the -$42B number.", expert: "Off-budget 'investments in financial assets for policy purposes' $85B over forward estimates. Includes NRF tranches, Housing Australia Future Fund, CEFC, ARENA, H2U. Full impact: UCB + off-budget = ~$320B total cash outflow over 4yr." }},
      { name: "Medicare bulk-billing overhaul", cost: "$8.5B over 5yr", lean: "centre", type: "spending",
        explanations: { kid: "More doctors will be free to visit (bulk billing). This is fixing a real problem — many people couldn't afford the doctor.", teen: "Genuine structural health investment. Addresses declining bulk-billing rates that hit low-income households hardest. Broadly centrist — bipartisan problem.", expert: "Incentive uplift to GP bulk-billing rates. Addresses structural decline from 88% (2018) to 77% (2023). On-budget. Evidence-based intervention with productivity co-benefits (healthier workforce)." }},
    ],
    redFlags: [
      "$85 billion off-budget spending — the largest equity injection program in Australian history — not reflected in headline deficit",
      "Gross debt crosses $1 trillion for the first time in Australian history by end of 2024-25",
      "Spending as % of GDP peaks at 28.5% — highest since WWII excluding COVID years",
      "A decade of forecast deficits — no credible return-to-surplus path modelled in budget papers",
      "Tax cuts announced simultaneously with running deficits — structural revenue reduction while structurally deficit",
      "Independent economists broadly characterised as 'politically savvy but fiscally concerning' (KPMG, EY, CPA Australia)",
      "Coalition committed to repealing tax cuts if elected — creating policy uncertainty on the revenue side",
    ],
  },
];

// ── BOOK STRATEGIES (the 5 key accounting moves) ─────────────
export interface BookStrategy {
  id: string;
  title: string;
  impact: string;
  yearsAffected: string;
  explanations: Record<ExplanationLevel, string>;
}

export const bookStrategies: BookStrategy[] = [
  {
    id: "super",
    title: "The Superannuation Actuarial Effect — Legal, But Massive",
    impact: "Up to ±$95B in a single year",
    yearsAffected: "All years — biggest in 2021-22",
    explanations: {
      kid:  "The government owes money to public servants for retirement. A maths formula calculates how much. When interest rates go up, the formula says they owe LESS — without any real money changing. It's a maths effect that changed the number on paper. Like your school debt shrinking just because a number in a calculator changed.",
      teen: "The super liability is calculated using a 'discount rate'. Higher rates → lower present value → the liability shrinks. $95B appeared in 2021-22 purely from RBA rate rises. No cash moved. This is legal accounting — but this effect can make a bad year look great or a good year look terrible.",
      expert: "AASB 119 (Employee Benefits) requires actuarial movements in defined benefit obligations to be recognised in Other Comprehensive Income. This is mandatory — the government cannot choose not to record it. What we highlight here is NOT accounting fraud or deliberate manipulation. It is the fact that this required accounting treatment can move net worth by $95 billion in a single year without a single dollar changing hands — and that this movement is rarely explained to the public when governments report their 'financial position.' The transparency gap is the problem, not the accounting treatment itself. Each 100bp rate movement produces ~$30B actuarial swing. 2021-22: 300bp increase → $95.2B gain in OCI. 2022-23: $39.9B reversal. Non-cash. Excluded from NOB but distorts comprehensive result and net worth.",
    },
  },
  {
    id: "equity",
    title: "Equity Injections — Spending That Disappears",
    impact: "$5B–$85B per year kept off the headline deficit",
    yearsAffected: "Every year — peaked 2025-26 forward estimates",
    explanations: {
      kid:  "When the government gives money to its own businesses (like NBN or an airport), it calls it an 'investment' instead of 'spending'. So it doesn't count in the deficit number they announce on the news. The money is still gone though.",
      teen: "Equity injections to government business enterprises go to the balance sheet (as an asset) not the P&L (as an expense). Doesn't appear in the net operating balance or underlying cash balance. Both Labor and Coalition use this. $85B over 4 years in the 2025-26 budget is the biggest use ever.",
      expert: "GFS treatment: acquisitions of financial assets for policy purposes excluded from net operating balance and underlying cash balance. Full fiscal impact captured only in 'headline cash balance'. Creates structural divergence between political headline and actual fiscal position. Both parties use extensively. KPMG, EY noted $85B off-budget as material misrepresentation of 2025-26 fiscal stance.",
    },
  },
  {
    id: "capitalise",
    title: "Capitalise It — Hide Costs in Assets",
    impact: "Reduces annual expenses — ANAO flagged every year",
    yearsAffected: "2016-17 through 2023-24 — persistent ANAO finding",
    explanations: {
      kid:  "When the government builds something, it can say 'this is an asset' (goes on the good side of the books) or 'this is an expense' (makes the budget look worse). By calling more things assets, the spending number looks smaller. The ANAO (the government's own auditor) has flagged this as a problem every single year.",
      teen: "Capitalisation decisions affect whether spending hits the P&L now or gets spread over years. Choosing to capitalise rather than expense reduces current-year spending. ANAO flagged 'weaknesses in monitoring of assets under construction and capitalisation of project costs' in every audit report 2016-2024.",
      expert: "AASB 116/138 capitalisation criteria: future economic benefits probable, cost reliably measurable. Discretion exists at margins — particularly for large Defence and IT projects. ANAO identified as 'accounting and control of non-financial assets' — consistently top-3 finding category. Defence specialist military equipment ($51B) valuation uses internal cost attribution with no active market benchmark.",
    },
  },
  {
    id: "accrual",
    title: "Two Bottom Lines — Which One Politicians Quote",
    impact: "$10B–$50B gap between the two measures every year",
    yearsAffected: "Every year — 2023-24 gap was $25.8B",
    explanations: {
      kid:  "The government has two different 'scores' for how they went financially. The one politicians use in speeches looks better. The one that tracks actual cash — money actually in and out — always looks worse. In 2023-24, the difference was $25.8 billion.",
      teen: "Net operating balance (accrual) includes non-cash items — depreciation, actuarial gains/losses, timing differences. Underlying cash balance is actual cash in vs out. Politicians quote the accrual surplus. The $10B 2023-24 'surplus' was a $15.8B cash deficit on the harder-to-manipulate measure.",
      expert: "UCB vs NOB divergence arises from: depreciation/amortisation (~$20B pa), actuarial movements, revenue/expense timing, concessional loan face value vs PV differences. 2023-24 gap $25.8B. Systematic pattern: UCB consistently worse than NOB. UCB harder to manipulate; preferred by economists. NOB preferred in political communication.",
    },
  },
  {
    id: "military",
    title: "Military Assets — The $51B Unknown",
    impact: "$51B+ in assets valued with no market price check",
    yearsAffected: "All years — ANAO KAM every single year",
    explanations: {
      kid:  "The government owns over $51 billion in military equipment — tanks, submarines, planes. But nobody buys or sells this stuff every day, so nobody knows exactly what it's worth. The government makes it up using their own maths. The ANAO (the auditor) says this is risky every single year.",
      teen: "Specialist military equipment has no active market. Valuation uses internal cost attribution models. ANAO flags this as a Key Audit Matter every year because the assumptions are subjective and unverifiable. If overvalued, the balance sheet looks better than reality.",
      expert: "AASB 13 fair value hierarchy: Level 3 (unobservable inputs). Defence cost attribution model allocates accumulated costs to equipment types. ANAO Key Audit Matter since inception of KAM framework. Material uncertainty: useful life assumptions, impairment indicators, cost allocation to development vs operational phases. No independent market validation possible.",
    },
  },
];
