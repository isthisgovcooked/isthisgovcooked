// Configuration for the future weekly AI agent (v2)
// See AGENT.md for roadmap. Workflow: .github/workflows/agent-update.yml

export const DATA_SOURCES: Record<
  string,
  { name: string; url: string; frequency: string; factorsAffected: string[] }
> = {
  abs_cpi: {
    name: "ABS CPI",
    url: "https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/consumer-price-index-australia/latest-release",
    frequency: "quarterly",
    factorsAffected: ["costOfLiving", "wages"],
  },
  abs_nom: {
    name: "ABS Net Overseas Migration",
    url: "https://www.abs.gov.au/statistics/people/population/overseas-migration/latest-release",
    frequency: "quarterly",
    factorsAffected: ["immigration"],
  },
  abs_wpi: {
    name: "ABS Wage Price Index",
    url: "https://www.abs.gov.au/statistics/economy/price-indexes-and-inflation/wage-price-index-australia/latest-release",
    frequency: "quarterly",
    factorsAffected: ["wages", "economicReality"],
  },
  abs_gdp: {
    name: "ABS National Accounts (per capita)",
    url: "https://www.abs.gov.au/statistics/economy/national-accounts/australian-national-accounts-national-income-expenditure-and-product/latest-release",
    frequency: "quarterly",
    factorsAffected: ["economicReality", "immigration"],
  },
  rmit_factcheck: {
    name: "RMIT ABC FactLab Promise Tracker",
    url: "https://www.rmit.edu.au/about/schools-colleges/media-and-communication/journalism/factlab",
    frequency: "monthly",
    factorsAffected: ["deception"],
  },
  rba_fsr: {
    name: "RBA Financial Stability Review",
    url: "https://www.rba.gov.au/publications/fsr/",
    frequency: "biannual",
    factorsAffected: ["costOfLiving"],
  },
  nhsac: {
    name: "National Housing Supply & Affordability Council",
    url: "https://nhsac.gov.au/reports-and-data",
    frequency: "annual",
    factorsAffected: ["immigration", "costOfLiving"],
  },
};

export const AGENT_CONFIG = {
  dataSources: DATA_SOURCES,
  updateSchedule: "0 9 * * 1",
  githubRepo: "isthisgovcooked/isthisgovcooked",
  dataFilePath: "lib/pm-data.ts",
  requiresReview: true,
};
