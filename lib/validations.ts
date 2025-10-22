import { z } from "zod";

export const initiativeSchema = z.object({
  name: z.string().min(1, "Initiative name is required"),
  ownerEmail: z.string().email("Valid email is required"),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  strategicObjective: z.string().min(10, "Strategic objective is required"),
  primaryKPI: z.string().min(1, "Primary KPI is required"),
  currency: z.string().default("USD"),
  region: z.string().default("US"),
  horizonYears: z.number().min(1).max(5).default(3),
  discountRate: z.number().min(0).max(1).default(0.10),
  counterfactualType: z.enum(["do-nothing", "manual-improvement", "non-ai-software"]),
});

export const costSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1, "Cost label is required"),
  category: z.string().min(1, "Category is required"),
  year: z.number().min(0).max(10),
  amount: z.number().min(0, "Amount must be non-negative"),
  isCounterfactual: z.boolean().default(false),
});

export const benefitSchema = z.object({
  id: z.string().optional(),
  label: z.string().min(1, "Benefit label is required"),
  category: z.string().min(1, "Category is required"),
  year: z.number().min(0).max(10),
  amount: z.number().min(0, "Amount must be non-negative"),
  isCounterfactual: z.boolean().default(false),
});

export const riskSchema = z.object({
  pSuccess: z.number().min(0).max(1),
  pAdoption: z.number().min(0).max(1),
  dataRisk: z.number().min(1).max(5),
  regulatoryRisk: z.number().min(1).max(5),
  vendorRisk: z.number().min(1).max(5),
});

export const scenarioSchema = z.object({
  name: z.string().min(1, "Scenario name is required"),
  inputs: z.record(z.any()),
});

export const counterfactualSchema = z.object({
  description: z.string().min(10, "Counterfactual description is required"),
});

export type InitiativeInput = z.infer<typeof initiativeSchema>;
export type CostInput = z.infer<typeof costSchema>;
export type BenefitInput = z.infer<typeof benefitSchema>;
export type RiskInput = z.infer<typeof riskSchema>;
export type ScenarioInput = z.infer<typeof scenarioSchema>;
export type CounterfactualInput = z.infer<typeof counterfactualSchema>;
