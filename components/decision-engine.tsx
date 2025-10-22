"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, TrendingUp, Clock, DollarSign } from "lucide-react";
import { ROAIResults } from "@/lib/finance";
import { formatCurrency, formatPercentage, formatYears } from "@/lib/utils";

interface DecisionEngineProps {
  results: ROAIResults;
  initiativeName: string;
}

export function DecisionEngine({ results, initiativeName }: DecisionEngineProps) {
  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case "expand":
        return <CheckCircle className="h-6 w-6 text-green-600" />;
      case "pilot":
        return <AlertTriangle className="h-6 w-6 text-yellow-600" />;
      case "halt":
        return <XCircle className="h-6 w-6 text-red-600" />;
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case "expand":
        return "bg-green-50 border-green-200 text-green-800";
      case "pilot":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "halt":
        return "bg-red-50 border-red-200 text-red-800";
    }
  };

  const getRecommendationText = () => {
    switch (results.recommendation) {
      case "expand":
        return "EXPAND";
      case "pilot":
        return "PILOT";
      case "halt":
        return "HALT/REVISE";
    }
  };

  const getNextSteps = () => {
    switch (results.recommendation) {
      case "expand":
        return [
          "Proceed with full implementation",
          "Allocate resources for scaling",
          "Set up monitoring and governance",
          "Plan for organizational change management"
        ];
      case "pilot":
        return [
          "Start with limited scope pilot",
          "Define success metrics and timeline",
          "Plan for gradual rollout",
          "Prepare for potential expansion"
        ];
      case "halt":
        return [
          "Reconsider project scope and assumptions",
          "Explore alternative approaches",
          "Review cost-benefit analysis",
          "Consider different time horizons"
        ];
    }
  };

  const getDecisionRationale = () => {
    const { roaiScore, npv, paybackPeriod } = results;
    
    if (roaiScore >= 70 && npv > 0) {
      return `Strong RoAI score (${roaiScore.toFixed(1)}) and positive NPV (${formatCurrency(npv)}) indicate high value with acceptable risk.`;
    } else if (roaiScore >= 40 || npv > 0) {
      return `Moderate RoAI score (${roaiScore.toFixed(1)}) suggests pilot approach to validate assumptions and reduce risk.`;
    } else {
      return `Low RoAI score (${roaiScore.toFixed(1)}) and negative NPV (${formatCurrency(npv)}) indicate high risk or poor returns.`;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getRecommendationIcon()}
          Decision Recommendation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Recommendation Badge */}
        <div className="flex items-center justify-center">
          <Badge 
            variant="outline" 
            className={`text-lg px-6 py-3 ${getRecommendationColor()}`}
          >
            {getRecommendationText()}
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-sm text-muted-foreground">RoAI Score</span>
            </div>
            <div className="text-2xl font-bold">{results.roaiScore.toFixed(1)}</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-sm text-muted-foreground">NPV</span>
            </div>
            <div className={`text-2xl font-bold ${results.npv >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatCurrency(results.npv)}
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-sm text-muted-foreground">IRR</span>
            </div>
            <div className="text-2xl font-bold">{formatPercentage(results.irr)}</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="h-4 w-4 text-muted-foreground mr-1" />
              <span className="text-sm text-muted-foreground">Payback</span>
            </div>
            <div className="text-2xl font-bold">{formatYears(results.paybackPeriod)}</div>
          </div>
        </div>

        {/* Decision Rationale */}
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">Decision Rationale</h4>
          <p className="text-sm text-muted-foreground">
            {getDecisionRationale()}
          </p>
        </div>

        {/* Confidence Bands */}
        <div>
          <h4 className="font-medium mb-2">Confidence Bands</h4>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-muted-foreground">Conservative</div>
              <div className="text-lg font-semibold">{results.confidenceBand.conservative.toFixed(1)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Base Case</div>
              <div className="text-lg font-semibold">{results.confidenceBand.base.toFixed(1)}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Aggressive</div>
              <div className="text-lg font-semibold">{results.confidenceBand.aggressive.toFixed(1)}</div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div>
          <h4 className="font-medium mb-2">Recommended Next Steps</h4>
          <ul className="space-y-1">
            {getNextSteps().map((step, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-start">
                <span className="mr-2">•</span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        {/* Risk Factors */}
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">Key Risk Factors</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Technical Risk:</span>
              <span className="ml-2 font-medium">Monitor implementation progress</span>
            </div>
            <div>
              <span className="text-muted-foreground">Adoption Risk:</span>
              <span className="ml-2 font-medium">Plan change management</span>
            </div>
            <div>
              <span className="text-muted-foreground">Data Risk:</span>
              <span className="ml-2 font-medium">Ensure data quality</span>
            </div>
            <div>
              <span className="text-muted-foreground">Regulatory Risk:</span>
              <span className="ml-2 font-medium">Comply with regulations</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
