# Personal Impact Calculator — Methodology

This document cites the sources and assumptions for the "What did this cost you?" calculator.

## Mortgage (fiscal contribution to rate rises)

- **RBA rate hikes 2022–23:** Cash rate 0.10% (May 2022) → 4.35% (Dec 2024) = +425 basis points. Source: RBA cash rate target.
- **Government fiscal contribution to inflation:** RBA and Treasury estimates suggest fiscal policy contributed roughly 30–40% of excess inflation above the 2–3% target. Excess inflation peak ~5.9pp; fiscal contribution ~1.8–2.4pp. That contributed approximately 40–60bp to the RBA tightening cycle. Conservative estimate: **0.5pp** of the total 4.25pp increase attributable to fiscal stance.
- **Direct cost:** 0.5% on loan balance per year. Formula: `mortgageBalance × 0.005` (annual).

Sources: RBA Statement on Monetary Policy; RBA Financial Stability Review; Budget Papers (fiscal stance).

## Rent (demand-side pressure)

- **Rent increase 2022–2025:** National median rent up ~33% (CoreLogic/REIA).
- **Attribution:** Economists estimate 40–60% of rental CPI attributable to demand (population growth) vs supply (construction costs). We use **40%** (conservative): 0.40 × 33% = **13.2%** of annual rent attributable to demand-side pressure.
- **Formula:** `weeklyRent × 52 × 0.132` (annual).

Sources: CoreLogic; REIA Housing Affordability; RBA FSR; ABS CPI rental component.

## Real wage loss

- **WPI vs CPI 2022–24:** WPI grew ~3.2%/yr average, CPI ~5.1%/yr average (ABS 6345.0, 6401.0). Real wage change ≈ −1.9%/yr. Two-year cumulative: **−3.8%** of gross income.
- **Formula:** `grossIncome × 0.038`.

Sources: ABS Wage Price Index; ABS Consumer Price Index.

## Grocery / food inflation

- **Food CPI 2022–24:** +16.3% cumulative (ABS CPI food and non-alcoholic beverages).
- **Fiscal attribution:** ~25% of food inflation attributed to demand-side/fiscal (mostly supply-side). Attributable share: 0.25 × 16.3% = 4.1% of food spend. For simplicity we use **25% of the 16.3%** applied to annual food spend: `weeklyGroceries × 52 × 0.25 × 0.163`.
- **Formula:** `weeklyGroceries × 52 × 0.041` (approx) or as coded: `weeklyGroceries × 52 × 0.25 × 0.163`.

Sources: ABS 6401.0 CPI, food subcategory.

## Energy

- **Electricity 2022–24:** Up ~23% (ABS CPI electricity).
- **Government contribution:** Delayed renewable transition / policy contribution ~30%. Attributable: 0.30 × 0.23 × average household electricity (~$1,800/yr) ≈ **$124/year**. Energy rebates ($300 or $150) partially offset; we use a flat **$124** as central estimate.

Sources: ABS 6401.0; energy policy literature.

## Uncertainty

All figures are central estimates. Uncertainty band approximately ±30%. The calculator is illustrative; individual circumstances vary.

## Code reference

Implementation: `components/sections/PersonalCalc.tsx`. Formulas and constants are in the `calc()` function.
