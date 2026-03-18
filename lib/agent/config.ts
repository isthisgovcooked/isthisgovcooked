export const AGENT_VERSION = "1.0.0";

export const DATA_SOURCES = [
  {
    id: "abs_cpi",
    name: "ABS Consumer Price Index",
    url: "https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia/latest-release",
    apiEndpoint: "https://api.data.abs.gov.au/data/CPI/1.10001.10.10.Q?startPeriod=2024-Q1&dimensionAtObservation=TIME_PERIOD",
    frequency: "quarterly",
    factorAffected: ["costOfLiving", "economic"],
    lastFetched: null,
  },
  {
    id: "abs_wpi",
    name: "ABS Wage Price Index",
    url: "https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/wage-price-index-australia/latest-release",
    frequency: "quarterly",
    factorAffected: ["wages", "economic"],
    lastFetched: null,
  },
  {
    id: "abs_gdp",
    name: "ABS National Accounts (GDP per capita)",
    url: "https://www.abs.gov.au/statistics/economy/national-accounts/australian-national-accounts-national-income-expenditure-and-product/latest-release",
    frequency: "quarterly",
    factorAffected: ["economic"],
    lastFetched: null,
  },
  {
    id: "abs_nom",
    name: "ABS Net Overseas Migration",
    url: "https://www.abs.gov.au/statistics/people/population/overseas-migration/latest-release",
    frequency: "quarterly",
    factorAffected: ["immigration"],
    lastFetched: null,
  },
  {
    id: "rba_rates",
    name: "RBA Cash Rate Target",
    url: "https://www.rba.gov.au/statistics/cash-rate/",
    frequency: "monthly",
    factorAffected: ["costOfLiving"],
    lastFetched: null,
  },
  {
    id: "dept_finance_cfs",
    name: "Commonwealth Consolidated Financial Statements",
    url: "https://www.finance.gov.au/publications/commonwealth-consolidated-financial-statements",
    frequency: "annual",
    factorAffected: ["all"],
    lastFetched: null,
  },
  {
    id: "anao_audit",
    name: "ANAO Financial Statement Audit Report",
    url: "https://www.anao.gov.au/work/financial-statement-audit",
    frequency: "annual",
    factorAffected: ["governance"],
    lastFetched: null,
  },
  {
    id: "rmit_factcheck",
    name: "RMIT FactLab Promise Tracker",
    url: "https://www.rmit.edu.au/about/schools-colleges/media-and-communication/journalism/factlab",
    frequency: "weekly",
    factorAffected: ["deception"],
    lastFetched: null,
  },
  {
    id: "nhsac_housing",
    name: "National Housing Supply & Affordability Council",
    url: "https://nhsac.gov.au/reports-and-data",
    frequency: "biannual",
    factorAffected: ["immigration", "costOfLiving"],
    lastFetched: null,
  },
  {
    id: "budget_papers",
    name: "Federal Budget Papers (budget.gov.au)",
    url: "https://budget.gov.au",
    frequency: "annual",
    factorAffected: ["all"],
    lastFetched: null,
    budgetDayTrigger: true,
  },
];

export const AGENT_SCHEDULE = {
  weekly: "0 9 * * 1",
  quarterly: "0 9 1 */3 *",
  annual: "0 9 15 12 *",
  budgetDay: "manual",
};

export const SCORE_CHANGE_THRESHOLD = 2;
export const REVIEW_REQUIRED = true;
export const ANTHROPIC_MODEL = "claude-opus-4-6";
