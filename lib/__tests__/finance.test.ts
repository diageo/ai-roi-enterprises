import { describe, it, expect } from 'vitest';
import {
  calculateNPV,
  calculateIRR,
  calculatePaybackPeriod,
  calculateBCR,
  calculateROAIScore,
  calculateRiskMultiplier,
  generateIncrementalCashFlows,
  calculateROAI,
  InitiativeData,
  RiskData
} from '../finance';

describe('Finance Calculations', () => {
  const testData: InitiativeData = {
    costs: [
      { year: 0, amount: 100000 },
      { year: 1, amount: 50000 },
      { year: 2, amount: 50000 }
    ],
    benefits: [
      { year: 0, amount: 0 },
      { year: 1, amount: 80000 },
      { year: 2, amount: 120000 }
    ],
    cfCosts: [
      { year: 0, amount: 20000 },
      { year: 1, amount: 20000 },
      { year: 2, amount: 20000 }
    ],
    cfBenefits: [
      { year: 0, amount: 0 },
      { year: 1, amount: 30000 },
      { year: 2, amount: 40000 }
    ],
    horizonYears: 3,
    discountRate: 0.10
  };

  const testRisk: RiskData = {
    pSuccess: 0.8,
    pAdoption: 0.7,
    dataRisk: 2,
    regulatoryRisk: 2,
    vendorRisk: 2
  };

  describe('calculateNPV', () => {
    it('should calculate NPV correctly', () => {
      const cashFlows = [-100000, 50000, 100000];
      const npv = calculateNPV(cashFlows, 0.10);
      expect(npv).toBeCloseTo(28099.17, 2);
    });

    it('should handle zero discount rate', () => {
      const cashFlows = [-100000, 50000, 100000];
      const npv = calculateNPV(cashFlows, 0);
      expect(npv).toBe(50000);
    });
  });

  describe('calculateIRR', () => {
    it('should calculate IRR correctly', () => {
      const cashFlows = [-100000, 50000, 100000];
      const irr = calculateIRR(cashFlows);
      expect(irr).toBeCloseTo(0.281, 2); // ~28%
    });

    it('should handle zero cash flows', () => {
      const cashFlows = [0, 0, 0];
      const irr = calculateIRR(cashFlows);
      expect(irr).toBeCloseTo(0, 1);
    });
  });

  describe('calculatePaybackPeriod', () => {
    it('should calculate payback period correctly', () => {
      const cashFlows = [-100000, 50000, 100000];
      const payback = calculatePaybackPeriod(cashFlows);
      expect(payback).toBeCloseTo(1.5, 1);
    });

    it('should handle immediate payback', () => {
      const cashFlows = [100000, 0, 0];
      const payback = calculatePaybackPeriod(cashFlows);
      expect(payback).toBe(0);
    });
  });

  describe('calculateBCR', () => {
    it('should calculate BCR correctly', () => {
      const aiBenefits = [0, 80000, 120000];
      const aiCosts = [100000, 50000, 50000];
      const cfBenefits = [0, 30000, 40000];
      const cfCosts = [20000, 20000, 20000];
      
      const bcr = calculateBCR(aiBenefits, aiCosts, cfBenefits, cfCosts, 0.10);
      expect(bcr).toBeCloseTo(0.84, 1);
    });
  });

  describe('calculateRiskMultiplier', () => {
    it('should calculate risk multiplier correctly', () => {
      const multiplier = calculateRiskMultiplier(testRisk);
      expect(multiplier).toBeCloseTo(0.8 * 0.7 * 0.9 * 0.9 * 0.9, 3);
    });
  });

  describe('generateIncrementalCashFlows', () => {
    it('should generate incremental cash flows correctly', () => {
      const incremental = generateIncrementalCashFlows(testData);
      expect(incremental).toEqual([-80000, 20000, 50000]);
    });
  });

  describe('calculateROAI', () => {
    it('should calculate complete ROAI results', () => {
      const results = calculateROAI(testData, testRisk, 1000000);
      
      expect(results).toHaveProperty('npv');
      expect(results).toHaveProperty('irr');
      expect(results).toHaveProperty('paybackPeriod');
      expect(results).toHaveProperty('bcr');
      expect(results).toHaveProperty('roaiScore');
      expect(results).toHaveProperty('recommendation');
      expect(results).toHaveProperty('confidenceBand');
      
      expect(typeof results.npv).toBe('number');
      expect(typeof results.irr).toBe('number');
      expect(typeof results.paybackPeriod).toBe('number');
      expect(typeof results.bcr).toBe('number');
      expect(typeof results.roaiScore).toBe('number');
      expect(['expand', 'pilot', 'halt']).toContain(results.recommendation);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty cash flows', () => {
      const npv = calculateNPV([], 0.10);
      expect(npv).toBe(0);
    });

    it('should handle negative IRR gracefully', () => {
      const cashFlows = [-100000, 20000, 20000];
      const irr = calculateIRR(cashFlows);
      expect(irr).toBeLessThan(0);
    });

    it('should handle very high IRR', () => {
      const cashFlows = [-1000, 1000000];
      const irr = calculateIRR(cashFlows);
      expect(irr).toBeGreaterThan(0);
    });
  });
});
