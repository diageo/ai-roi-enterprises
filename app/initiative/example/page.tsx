"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DecisionEngine } from "@/components/decision-engine";
import { AssumptionTable } from "@/components/assumption-table";
import { FormulaHint, FORMULA_HINTS } from "@/components/formula-hint";
import { 
  calculateROAI, 
  generateIncrementalCashFlows,
  InitiativeData,
  RiskData,
  ROAIResults 
} from "@/lib/finance";
import { formatCurrency, formatPercentage, formatYears } from "@/lib/utils";
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Target, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  Share2
} from "lucide-react";
import Link from "next/link";

export default function ExampleInitiativePage() {
  const [results, setResults] = useState<ROAIResults | null>(null);
  const [loading, setLoading] = useState(true);

  // Example data - in a real app, this would come from the database
  const exampleData: InitiativeData = {
    costs: [
      { year: 0, amount: 80000 }, // AI Model Licensing
      { year: 0, amount: 120000 }, // Integration & Development
      { year: 0, amount: 40000 }, // Data Preparation
      { year: 0, amount: 40000 }, // Training & Change Management
      { year: 0, amount: 60000 }, // Cloud Infrastructure
      { year: 0, amount: 20000 }, // Governance & Compliance
      { year: 1, amount: 80000 }, // AI Model Licensing
      { year: 1, amount: 60000 }, // Cloud Infrastructure
      { year: 1, amount: 20000 }, // Governance & Compliance
      { year: 2, amount: 80000 }, // AI Model Licensing
      { year: 2, amount: 60000 }, // Cloud Infrastructure
      { year: 2, amount: 20000 }, // Governance & Compliance
    ],
    benefits: [
      { year: 0, amount: 151200 }, // Productivity Gains
      { year: 0, amount: 50000 }, // Quality Improvement
      { year: 0, amount: 80000 }, // Customer Retention
      { year: 1, amount: 302400 }, // Productivity Gains
      { year: 1, amount: 100000 }, // Quality Improvement
      { year: 1, amount: 160000 }, // Customer Retention
      { year: 2, amount: 428400 }, // Productivity Gains
      { year: 2, amount: 150000 }, // Quality Improvement
      { year: 2, amount: 240000 }, // Customer Retention
    ],
    cfCosts: [
      { year: 0, amount: 360000 }, // Additional Support Staff (6 FTE)
      { year: 0, amount: 30000 }, // Basic Automation Tools
      { year: 1, amount: 180000 }, // Additional Support Staff (3 FTE)
      { year: 1, amount: 30000 }, // Basic Automation Tools
      { year: 2, amount: 180000 }, // Additional Support Staff (3 FTE)
      { year: 2, amount: 30000 }, // Basic Automation Tools
    ],
    cfBenefits: [
      { year: 0, amount: 100000 }, // Manual Process Efficiency
      { year: 1, amount: 200000 }, // Manual Process Efficiency
      { year: 2, amount: 300000 }, // Manual Process Efficiency
    ],
    horizonYears: 3,
    discountRate: 0.10,
  };

  const exampleRisk: RiskData = {
    pSuccess: 0.75,
    pAdoption: 0.70,
    dataRisk: 2,
    regulatoryRisk: 2,
    vendorRisk: 2,
  };

  useEffect(() => {
    // Calculate results
    const calculatedResults = calculateROAI(exampleData, exampleRisk, 1000000);
    setResults(calculatedResults);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Calculating RoAI...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive">Error calculating results</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link href="/">
                <Button variant="outline" size="sm">
                  ← Back to Home
                </Button>
              </Link>
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold">Customer Support AI Copilot</h1>
              <p className="text-sm text-muted-foreground">Example AI Initiative Assessment</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Key Financial Metrics
                </CardTitle>
                <CardDescription>
                  Core ROI calculations for the AI initiative
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{results.roaiScore.toFixed(1)}</div>
                    <div className="text-sm text-muted-foreground">RoAI Score</div>
                    <FormulaHint {...FORMULA_HINTS.ROAI} />
                  </div>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${results.npv >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(results.npv)}
                    </div>
                    <div className="text-sm text-muted-foreground">Net Present Value</div>
                    <FormulaHint {...FORMULA_HINTS.NPV} />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{formatPercentage(results.irr)}</div>
                    <div className="text-sm text-muted-foreground">Internal Rate of Return</div>
                    <FormulaHint {...FORMULA_HINTS.IRR} />
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{formatYears(results.paybackPeriod)}</div>
                    <div className="text-sm text-muted-foreground">Payback Period</div>
                    <FormulaHint {...FORMULA_HINTS.PAYBACK} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Decision Recommendation */}
            <DecisionEngine 
              results={results} 
              initiativeName="Customer Support AI Copilot" 
            />

            {/* Cost Analysis */}
            <AssumptionTable
              title="AI Initiative Costs"
              items={exampleData.costs.map(cost => ({
                id: Math.random().toString(36).substr(2, 9),
                label: cost.year === 0 ? "Year 0 Costs" : `Year ${cost.year} Costs`,
                category: "development",
                year: cost.year,
                amount: cost.amount,
                isCounterfactual: false,
              }))}
              onItemsChange={() => {}}
              categories={["development", "license", "cloud", "training", "governance"]}
              years={3}
            />

            {/* Benefit Analysis */}
            <AssumptionTable
              title="AI Initiative Benefits"
              items={exampleData.benefits.map(benefit => ({
                id: Math.random().toString(36).substr(2, 9),
                label: benefit.year === 0 ? "Year 0 Benefits" : `Year ${benefit.year} Benefits`,
                category: "productivity",
                year: benefit.year,
                amount: benefit.amount,
                isCounterfactual: false,
              }))}
              onItemsChange={() => {}}
              categories={["productivity", "revenue", "quality", "cx"]}
              years={3}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Initiative Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Initiative Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Owner</div>
                  <div className="font-medium">demo@company.com</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Time Horizon</div>
                  <div className="font-medium">3 Years</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Discount Rate</div>
                  <div className="font-medium">10%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Counterfactual</div>
                  <div className="font-medium">Manual Process Improvement</div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Assessment */}
            <Card>
              <CardHeader>
                <CardTitle>Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Success Probability</span>
                  <span className="font-medium">{formatPercentage(exampleRisk.pSuccess)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Adoption Probability</span>
                  <span className="font-medium">{formatPercentage(exampleRisk.pAdoption)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Data Risk</span>
                  <Badge variant="outline">{exampleRisk.dataRisk}/5</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Regulatory Risk</span>
                  <Badge variant="outline">{exampleRisk.regulatoryRisk}/5</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Vendor Risk</span>
                  <Badge variant="outline">{exampleRisk.vendorRisk}/5</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Confidence Bands */}
            <Card>
              <CardHeader>
                <CardTitle>Confidence Bands</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Conservative</span>
                    <span className="font-medium">{results.confidenceBand.conservative.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Base Case</span>
                    <span className="font-medium">{results.confidenceBand.base.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Aggressive</span>
                    <span className="font-medium">{results.confidenceBand.aggressive.toFixed(1)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href="/initiative/new">
                    Create New Assessment
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Results
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
