"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, X } from "lucide-react";

interface FormulaHintProps {
  title: string;
  formula: string;
  description: string;
  example?: string;
  variables?: { name: string; description: string }[];
}

export function FormulaHint({
  title,
  formula,
  description,
  example,
  variables = [],
}: FormulaHintProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="ml-2"
      >
        <HelpCircle className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{title}</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Formula:</h4>
                <code className="bg-muted p-2 rounded text-sm block">
                  {formula}
                </code>
              </div>

              <div>
                <h4 className="font-medium mb-2">Description:</h4>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>

              {variables.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Variables:</h4>
                  <ul className="space-y-1">
                    {variables.map((variable, index) => (
                      <li key={index} className="text-sm">
                        <strong>{variable.name}:</strong> {variable.description}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {example && (
                <div>
                  <h4 className="font-medium mb-2">Example:</h4>
                  <code className="bg-muted p-2 rounded text-sm block">
                    {example}
                  </code>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}

// Predefined formula hints for common calculations
export const FORMULA_HINTS = {
  NPV: {
    title: "Net Present Value (NPV)",
    formula: "NPV = Σ(CF_t / (1 + r)^t)",
    description: "The present value of all future cash flows, discounted at the required rate of return.",
    variables: [
      { name: "CF_t", description: "Cash flow in year t" },
      { name: "r", description: "Discount rate (WACC)" },
      { name: "t", description: "Time period" }
    ],
    example: "NPV = 100,000/(1.10)^1 + 150,000/(1.10)^2 + 200,000/(1.10)^3 = $365,000"
  },
  IRR: {
    title: "Internal Rate of Return (IRR)",
    formula: "0 = Σ(CF_t / (1 + IRR)^t)",
    description: "The discount rate that makes the NPV equal to zero. Represents the annual return on investment.",
    example: "If IRR = 25%, the project returns 25% annually"
  },
  PAYBACK: {
    title: "Payback Period",
    formula: "Payback = Year when cumulative cash flows ≥ 0",
    description: "The time it takes to recover the initial investment.",
    example: "If initial investment is $100k and annual cash flow is $50k, payback = 2 years"
  },
  BCR: {
    title: "Benefit-Cost Ratio (BCR)",
    formula: "BCR = Present Value of Benefits / Present Value of Costs",
    description: "The ratio of benefits to costs. Values > 1 indicate positive returns.",
    example: "BCR = $500k benefits / $300k costs = 1.67"
  },
  ROAI: {
    title: "Return on AI (RoAI) Score",
    formula: "RoAI = 100 × V × M",
    description: "Composite score (0-100) combining financial metrics with risk factors.",
    variables: [
      { name: "V", description: "Normalized value index (0-1)" },
      { name: "M", description: "Risk multiplier (0-1)" }
    ],
    example: "RoAI = 100 × 0.8 × 0.9 = 72 (Good for pilot/expand)"
  },
  PRODUCTIVITY: {
    title: "Productivity Benefits",
    formula: "Benefits = Hours Saved × Labor Rate × Adoption × Quality Factor",
    description: "Calculate productivity gains from AI automation.",
    variables: [
      { name: "Hours Saved", description: "Annual hours saved per employee" },
      { name: "Labor Rate", description: "Loaded labor cost per hour" },
      { name: "Adoption", description: "Percentage of employees using AI" },
      { name: "Quality Factor", description: "Efficiency multiplier (default 0.7)" }
    ],
    example: "12 FTE × 300 hours × $60/hour × 0.6 adoption × 0.7 quality = $75,600"
  }
};
