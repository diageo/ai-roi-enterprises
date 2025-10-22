/**
 * Core finance calculation engine for AI ROI assessment
 * Implements NPV, IRR, RoAI, Monte Carlo simulation, and sensitivity analysis
 */

export interface CashFlow {
  year: number;
  amount: number;
}

export interface InitiativeData {
  costs: CashFlow[];
  benefits: CashFlow[];
  cfCosts: CashFlow[];
  cfBenefits: CashFlow[];
  horizonYears: number;
  discountRate: number;
}

export interface RiskData {
  pSuccess: number;
  pAdoption: number;
  dataRisk: number;
  regulatoryRisk: number;
  vendorRisk: number;
}

export interface ROAIResults {
  npv: number;
  irr: number;
  paybackPeriod: number;
  bcr: number;
  roaiScore: number;
  recommendation: 'expand' | 'pilot' | 'halt';
  confidenceBand: {
    conservative: number;
    base: number;
    aggressive: number;
  };
}

export interface SensitivityResult {
  variable: string;
  elasticity: number;
  impact: number;
}

export interface MonteCarloResult {
  p10: number;
  p50: number;
  p90: number;
  mean: number;
  stdDev: number;
}

/**
 * Calculate Net Present Value
 */
export function calculateNPV(cashFlows: number[], discountRate: number): number {
  return cashFlows.reduce((npv, cf, year) => {
    return npv + cf / Math.pow(1 + discountRate, year);
  }, 0);
}

/**
 * Calculate Internal Rate of Return using Newton-Raphson method
 */
export function calculateIRR(cashFlows: number[], maxIterations = 100, tolerance = 1e-6): number {
  if (cashFlows.length === 0) return 0;
  
  // Check if all cash flows are zero
  if (cashFlows.every(cf => cf === 0)) return 0;
  
  // Initial guess
  let rate = 0.1;
  
  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let npvDerivative = 0;
    
    for (let year = 0; year < cashFlows.length; year++) {
      const discountFactor = Math.pow(1 + rate, year);
      npv += cashFlows[year] / discountFactor;
      npvDerivative -= (year * cashFlows[year]) / (discountFactor * (1 + rate));
    }
    
    if (Math.abs(npv) < tolerance) {
      return rate;
    }
    
    if (Math.abs(npvDerivative) < tolerance) {
      break;
    }
    
    rate = rate - npv / npvDerivative;
    
    // Prevent negative rates
    if (rate < -0.99) rate = -0.99;
  }
  
  return rate;
}

/**
 * Calculate payback period in years
 */
export function calculatePaybackPeriod(cashFlows: number[]): number {
  let cumulative = 0;
  let paybackYear = 0;
  
  for (let year = 0; year < cashFlows.length; year++) {
    cumulative += cashFlows[year];
    if (cumulative >= 0) {
      if (year === 0) return 0;
      // Linear interpolation for partial year
      const prevCumulative = cumulative - cashFlows[year];
      const fraction = -prevCumulative / cashFlows[year];
      return year - 1 + fraction;
    }
  }
  
  return cashFlows.length; // Never pays back
}

/**
 * Calculate Benefit-Cost Ratio
 */
export function calculateBCR(
  aiBenefits: number[],
  aiCosts: number[],
  cfBenefits: number[],
  cfCosts: number[],
  discountRate: number
): number {
  const discountedBenefits = aiBenefits.reduce((sum, benefit, year) => 
    sum + benefit / Math.pow(1 + discountRate, year), 0
  ) - cfBenefits.reduce((sum, benefit, year) => 
    sum + benefit / Math.pow(1 + discountRate, year), 0
  );
  
  const discountedCosts = aiCosts.reduce((sum, cost, year) => 
    sum + cost / Math.pow(1 + discountRate, year), 0
  ) - cfCosts.reduce((sum, cost, year) => 
    sum + cost / Math.pow(1 + discountRate, year), 0
  );
  
  return discountedCosts !== 0 ? discountedBenefits / Math.abs(discountedCosts) : 0;
}

/**
 * Calculate RoAI Score (0-100)
 */
export function calculateROAIScore(
  npv: number,
  irr: number,
  paybackPeriod: number,
  bcr: number,
  baselineSpend: number,
  riskMultiplier: number,
  weights = { npv: 0.4, irr: 0.3, payback: 0.15, bcr: 0.15 }
): number {
  // Normalize values to 0-1 scale
  const npvScore = Math.max(0, Math.min(1, npv / Math.max(baselineSpend, 1)));
  const irrScore = Math.max(0, Math.min(1, irr / 0.5)); // Cap at 50% IRR
  const paybackScore = Math.max(0, Math.min(1, 1 / (1 + paybackPeriod)));
  const bcrScore = Math.max(0, Math.min(1, (bcr - 1) / 2)); // Cap at BCR of 3
  
  const valueIndex = 
    weights.npv * npvScore +
    weights.irr * irrScore +
    weights.payback * paybackScore +
    weights.bcr * bcrScore;
  
  return Math.max(0, Math.min(100, 100 * valueIndex * riskMultiplier));
}

/**
 * Calculate risk multiplier from risk factors
 */
export function calculateRiskMultiplier(riskData: RiskData): number {
  const { pSuccess, pAdoption, dataRisk, regulatoryRisk, vendorRisk } = riskData;
  
  // Risk multipliers (1-5 scale mapped to 0.6-1.0)
  const dataMultiplier = 1 - (dataRisk - 1) * 0.1;
  const regulatoryMultiplier = 1 - (regulatoryRisk - 1) * 0.1;
  const vendorMultiplier = 1 - (vendorRisk - 1) * 0.1;
  
  return pSuccess * pAdoption * dataMultiplier * regulatoryMultiplier * vendorMultiplier;
}

/**
 * Generate incremental cash flows
 */
export function generateIncrementalCashFlows(data: InitiativeData): number[] {
  const aiCashFlows = data.benefits.map((benefit, year) => 
    benefit.amount - (data.costs[year]?.amount || 0)
  );
  
  const cfCashFlows = data.cfBenefits.map((benefit, year) => 
    benefit.amount - (data.cfCosts[year]?.amount || 0)
  );
  
  return aiCashFlows.map((ai, year) => ai - (cfCashFlows[year] || 0));
}

/**
 * Main ROAI calculation function
 */
export function calculateROAI(data: InitiativeData, riskData: RiskData, baselineSpend = 1000000): ROAIResults {
  const incrementalCashFlows = generateIncrementalCashFlows(data);
  const npv = calculateNPV(incrementalCashFlows, data.discountRate);
  const irr = calculateIRR(incrementalCashFlows);
  const paybackPeriod = calculatePaybackPeriod(incrementalCashFlows);
  
  const aiBenefits = data.benefits.map(b => b.amount);
  const aiCosts = data.costs.map(c => c.amount);
  const cfBenefits = data.cfBenefits.map(b => b.amount);
  const cfCosts = data.cfCosts.map(c => c.amount);
  
  const bcr = calculateBCR(aiBenefits, aiCosts, cfBenefits, cfCosts, data.discountRate);
  const riskMultiplier = calculateRiskMultiplier(riskData);
  const roaiScore = calculateROAIScore(npv, irr, paybackPeriod, bcr, baselineSpend, riskMultiplier);
  
  // Decision logic
  let recommendation: 'expand' | 'pilot' | 'halt';
  if (roaiScore >= 70 && npv > 0) {
    recommendation = 'expand';
  } else if (roaiScore >= 40 || npv > 0) {
    recommendation = 'pilot';
  } else {
    recommendation = 'halt';
  }
  
  return {
    npv,
    irr,
    paybackPeriod,
    bcr,
    roaiScore,
    recommendation,
    confidenceBand: {
      conservative: roaiScore * 0.8,
      base: roaiScore,
      aggressive: roaiScore * 1.2
    }
  };
}

/**
 * Sensitivity analysis - calculate elasticity for each variable
 */
export function calculateSensitivity(
  data: InitiativeData,
  riskData: RiskData,
  baselineSpend: number
): SensitivityResult[] {
  const baseline = calculateROAI(data, riskData, baselineSpend);
  const results: SensitivityResult[] = [];
  
  // Test cost sensitivity
  const costSensitivity = testVariableSensitivity(
    data, riskData, baselineSpend, baseline,
    (d, multiplier) => ({
      ...d,
      costs: d.costs.map(c => ({ ...c, amount: c.amount * multiplier }))
    })
  );
  results.push({ variable: 'Costs', ...costSensitivity });
  
  // Test benefit sensitivity
  const benefitSensitivity = testVariableSensitivity(
    data, riskData, baselineSpend, baseline,
    (d, multiplier) => ({
      ...d,
      benefits: d.benefits.map(b => ({ ...b, amount: b.amount * multiplier }))
    })
  );
  results.push({ variable: 'Benefits', ...benefitSensitivity });
  
  // Test discount rate sensitivity
  const rateSensitivity = testVariableSensitivity(
    data, riskData, baselineSpend, baseline,
    (d, multiplier) => ({
      ...d,
      discountRate: d.discountRate * multiplier
    })
  );
  results.push({ variable: 'Discount Rate', ...rateSensitivity });
  
  // Test risk sensitivity
  const riskSensitivity = testVariableSensitivity(
    data, riskData, baselineSpend, baseline,
    (d, multiplier) => ({
      ...d,
      risks: { ...riskData, pSuccess: Math.max(0, Math.min(1, riskData.pSuccess * multiplier)) }
    })
  );
  results.push({ variable: 'Success Probability', ...riskSensitivity });
  
  return results.sort((a, b) => Math.abs(b.elasticity) - Math.abs(a.elasticity));
}

function testVariableSensitivity(
  data: InitiativeData,
  riskData: RiskData,
  baselineSpend: number,
  baseline: ROAIResults,
  modifyData: (data: InitiativeData, multiplier: number) => InitiativeData
): { elasticity: number; impact: number } {
  const testMultiplier = 1.1; // 10% increase
  const modifiedData = modifyData(data, testMultiplier);
  const modifiedRisk = testMultiplier !== 1.0 ? 
    { ...riskData, pSuccess: Math.max(0, Math.min(1, riskData.pSuccess * testMultiplier)) } : 
    riskData;
  
  const modified = calculateROAI(modifiedData, modifiedRisk, baselineSpend);
  const elasticity = ((modified.roaiScore - baseline.roaiScore) / baseline.roaiScore) / 0.1;
  const impact = Math.abs(modified.roaiScore - baseline.roaiScore);
  
  return { elasticity, impact };
}

/**
 * Monte Carlo simulation
 */
export function runMonteCarloSimulation(
  data: InitiativeData,
  riskData: RiskData,
  baselineSpend: number,
  trials = 1000
): { npv: MonteCarloResult; roai: MonteCarloResult } {
  const npvResults: number[] = [];
  const roaiResults: number[] = [];
  
  for (let i = 0; i < trials; i++) {
    // Generate random variations (±20% for most variables)
    const variation = () => 0.8 + Math.random() * 0.4;
    
    const variedData: InitiativeData = {
      ...data,
      costs: data.costs.map(c => ({ ...c, amount: c.amount * variation() })),
      benefits: data.benefits.map(b => ({ ...b, amount: b.amount * variation() })),
      cfCosts: data.cfCosts.map(c => ({ ...c, amount: c.amount * variation() })),
      cfBenefits: data.cfBenefits.map(b => ({ ...b, amount: b.amount * variation() })),
      discountRate: data.discountRate * variation()
    };
    
    const variedRisk: RiskData = {
      ...riskData,
      pSuccess: Math.max(0, Math.min(1, riskData.pSuccess * variation())),
      pAdoption: Math.max(0, Math.min(1, riskData.pAdoption * variation()))
    };
    
    const result = calculateROAI(variedData, variedRisk, baselineSpend);
    npvResults.push(result.npv);
    roaiResults.push(result.roaiScore);
  }
  
  return {
    npv: calculateMonteCarloStats(npvResults),
    roai: calculateMonteCarloStats(roaiResults)
  };
}

function calculateMonteCarloStats(results: number[]): MonteCarloResult {
  const sorted = [...results].sort((a, b) => a - b);
  const mean = results.reduce((sum, val) => sum + val, 0) / results.length;
  const variance = results.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / results.length;
  const stdDev = Math.sqrt(variance);
  
  return {
    p10: sorted[Math.floor(sorted.length * 0.1)],
    p50: sorted[Math.floor(sorted.length * 0.5)],
    p90: sorted[Math.floor(sorted.length * 0.9)],
    mean,
    stdDev
  };
}

/**
 * Generate adoption curve (30%, 60%, 85% over 3 years)
 */
export function generateAdoptionCurve(years: number, finalAdoption = 0.85): number[] {
  const curve: number[] = [];
  for (let year = 0; year < years; year++) {
    if (year === 0) curve.push(0.3);
    else if (year === 1) curve.push(0.6);
    else if (year === 2) curve.push(0.85);
    else curve.push(finalAdoption);
  }
  return curve;
}

/**
 * Calculate productivity benefits
 */
export function calculateProductivityBenefits(
  hoursSaved: number,
  loadedLaborRate: number,
  adoptionRate: number,
  qualityFactor = 0.7
): number {
  return hoursSaved * loadedLaborRate * adoptionRate * qualityFactor;
}

/**
 * Calculate revenue uplift benefits
 */
export function calculateRevenueUplift(
  conversionLift: number,
  baselineRevenue: number,
  grossMargin = 0.8
): number {
  return conversionLift * baselineRevenue * grossMargin;
}

/**
 * Calculate quality improvement benefits
 */
export function calculateQualityBenefits(
  defectRateReduction: number,
  costOfPoorQuality: number,
  volume: number
): number {
  return defectRateReduction * costOfPoorQuality * volume;
}

/**
 * Calculate risk reduction benefits
 */
export function calculateRiskReduction(
  baselineLoss: number,
  riskReductionPercent: number,
  probability: number
): number {
  return baselineLoss * riskReductionPercent * probability;
}
