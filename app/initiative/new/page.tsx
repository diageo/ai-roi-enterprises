"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";

const WIZARD_STEPS = [
  "Context",
  "Time Horizon",
  "AI Costs",
  "AI Benefits", 
  "Counterfactual",
  "Risk Assessment",
  "Review"
];

export default function NewInitiativePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Context
    name: "",
    ownerEmail: "",
    summary: "",
    strategicObjective: "",
    primaryKPI: "",
    counterfactualType: "",
    
    // Time Horizon
    horizonYears: 3,
    discountRate: 0.10,
    currency: "USD",
    region: "US",
    
    // AI Initiative Costs
    devCost: 0,
    licenseCost: 0,
    cloudCost: 0,
    trainingCost: 0,
    dataCost: 0,
    governanceCost: 0,
    
    // AI Initiative Benefits
    productivityBenefit: 0,
    revenueBenefit: 0,
    qualityBenefit: 0,
    cxBenefit: 0,
    riskBenefit: 0,
    speedBenefit: 0,
    
    // Counterfactual Costs
    cfStaffCost: 0,
    cfToolCost: 0,
    cfProcessCost: 0,
    
    // Counterfactual Benefits
    cfEfficiencyBenefit: 0,
    cfToolBenefit: 0,
    
    // Risk Assessment
    pSuccess: 0.75,
    pAdoption: 0.70,
    dataRisk: 2,
    regulatoryRisk: 2,
    vendorRisk: 2,
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < WIZARD_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="name">Initiative Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
                placeholder="e.g., Customer Support AI Copilot"
              />
            </div>
            
            <div>
              <Label htmlFor="ownerEmail">Owner Email</Label>
              <Input
                id="ownerEmail"
                type="email"
                value={formData.ownerEmail}
                onChange={(e) => updateFormData("ownerEmail", e.target.value)}
                placeholder="owner@company.com"
              />
            </div>
            
            <div>
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => updateFormData("summary", e.target.value)}
                placeholder="Brief description of the AI initiative..."
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="strategicObjective">Strategic Objective</Label>
              <Textarea
                id="strategicObjective"
                value={formData.strategicObjective}
                onChange={(e) => updateFormData("strategicObjective", e.target.value)}
                placeholder="How does this align with business strategy?"
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="primaryKPI">Primary KPI</Label>
              <Input
                id="primaryKPI"
                value={formData.primaryKPI}
                onChange={(e) => updateFormData("primaryKPI", e.target.value)}
                placeholder="e.g., Response time, Customer satisfaction, Cost reduction"
              />
            </div>
            
            <div>
              <Label htmlFor="counterfactualType">Counterfactual Type</Label>
              <Select
                value={formData.counterfactualType}
                onValueChange={(value) => updateFormData("counterfactualType", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose comparison baseline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="do-nothing">Do Nothing (current state)</SelectItem>
                  <SelectItem value="manual-improvement">Improve Manual Process</SelectItem>
                  <SelectItem value="non-ai-software">Replace with Non-AI Software</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
        
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="horizonYears">Analysis Time Horizon (Years)</Label>
              <Select
                value={formData.horizonYears.toString()}
                onValueChange={(value) => updateFormData("horizonYears", parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Year</SelectItem>
                  <SelectItem value="2">2 Years</SelectItem>
                  <SelectItem value="3">3 Years</SelectItem>
                  <SelectItem value="4">4 Years</SelectItem>
                  <SelectItem value="5">5 Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="discountRate">Discount Rate (WACC)</Label>
              <Input
                id="discountRate"
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={formData.discountRate}
                onChange={(e) => updateFormData("discountRate", parseFloat(e.target.value))}
                placeholder="0.10"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Default: 10%. Adjust based on your organization's cost of capital.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={formData.currency}
                  onValueChange={(value) => updateFormData("currency", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="CAD">CAD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="region">Region</Label>
                <Select
                  value={formData.region}
                  onValueChange={(value) => updateFormData("region", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">United States</SelectItem>
                    <SelectItem value="EU">European Union</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="CA">Canada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">AI Initiative Costs</h3>
              <p className="text-sm text-muted-foreground">
                Enter the costs for your AI initiative over the analysis period
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Development & Integration</Label>
                <Input
                  type="number"
                  placeholder="120000"
                  onChange={(e) => updateFormData("devCost", parseFloat(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">Model development, API integration</p>
              </div>
              
              <div>
                <Label>AI Model Licensing (Annual)</Label>
                <Input
                  type="number"
                  placeholder="80000"
                  onChange={(e) => updateFormData("licenseCost", parseFloat(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">OpenAI, Azure AI, AWS Bedrock</p>
              </div>
              
              <div>
                <Label>Cloud Infrastructure (Annual)</Label>
                <Input
                  type="number"
                  placeholder="60000"
                  onChange={(e) => updateFormData("cloudCost", parseFloat(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">GPU instances, storage, bandwidth</p>
              </div>
              
              <div>
                <Label>Training & Change Management</Label>
                <Input
                  type="number"
                  placeholder="40000"
                  onChange={(e) => updateFormData("trainingCost", parseFloat(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">Staff training, workshops</p>
              </div>
              
              <div>
                <Label>Data Preparation</Label>
                <Input
                  type="number"
                  placeholder="40000"
                  onChange={(e) => updateFormData("dataCost", parseFloat(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">Data cleaning, labeling, QA</p>
              </div>
              
              <div>
                <Label>Governance & Compliance (Annual)</Label>
                <Input
                  type="number"
                  placeholder="20000"
                  onChange={(e) => updateFormData("governanceCost", parseFloat(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">Audit, monitoring, compliance</p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">AI Initiative Benefits</h3>
              <p className="text-sm text-muted-foreground">
                Estimate the benefits from your AI initiative
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Productivity Gains (Annual)</Label>
                <Input
                  type="number"
                  placeholder="300000"
                  onChange={(e) => updateFormData("productivityBenefit", parseFloat(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">Time savings × labor rate × adoption</p>
              </div>
              
              <div>
                <Label>Revenue Uplift (Annual)</Label>
                <Input
                  type="number"
                  placeholder="100000"
                  onChange={(e) => updateFormData("revenueBenefit", parseFloat(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">Conversion lift × baseline revenue</p>
              </div>
              
              <div>
                <Label>Quality Improvement (Annual)</Label>
                <Input
                  type="number"
                  placeholder="75000"
                  onChange={(e) => updateFormData("qualityBenefit", parseFloat(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">Defect reduction × cost of poor quality</p>
              </div>
              
              <div>
                <Label>Customer Experience (Annual)</Label>
                <Input
                  type="number"
                  placeholder="120000"
                  onChange={(e) => updateFormData("cxBenefit", parseFloat(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">NPS improvement, churn reduction</p>
              </div>
              
              <div>
                <Label>Risk Reduction (Annual)</Label>
                <Input
                  type="number"
                  placeholder="50000"
                  onChange={(e) => updateFormData("riskBenefit", parseFloat(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">Expected loss avoided</p>
              </div>
              
              <div>
                <Label>Speed to Value (One-time)</Label>
                <Input
                  type="number"
                  placeholder="200000"
                  onChange={(e) => updateFormData("speedBenefit", parseFloat(e.target.value) || 0)}
                />
                <p className="text-xs text-muted-foreground">Time-to-market acceleration</p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Counterfactual Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Enter costs and benefits for the alternative approach
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">Counterfactual Costs</h4>
                <div className="space-y-4">
                  <div>
                    <Label>Additional Staff (Annual)</Label>
                    <Input
                      type="number"
                      placeholder="180000"
                      onChange={(e) => updateFormData("cfStaffCost", parseFloat(e.target.value) || 0)}
                    />
                    <p className="text-xs text-muted-foreground">Hiring additional FTEs</p>
                  </div>
                  
                  <div>
                    <Label>Alternative Tools (Annual)</Label>
                    <Input
                      type="number"
                      placeholder="30000"
                      onChange={(e) => updateFormData("cfToolCost", parseFloat(e.target.value) || 0)}
                    />
                    <p className="text-xs text-muted-foreground">Non-AI automation tools</p>
                  </div>
                  
                  <div>
                    <Label>Process Improvement</Label>
                    <Input
                      type="number"
                      placeholder="25000"
                      onChange={(e) => updateFormData("cfProcessCost", parseFloat(e.target.value) || 0)}
                    />
                    <p className="text-xs text-muted-foreground">Lean Six Sigma, training</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">Counterfactual Benefits</h4>
                <div className="space-y-4">
                  <div>
                    <Label>Manual Efficiency Gains (Annual)</Label>
                    <Input
                      type="number"
                      placeholder="200000"
                      onChange={(e) => updateFormData("cfEfficiencyBenefit", parseFloat(e.target.value) || 0)}
                    />
                    <p className="text-xs text-muted-foreground">Process improvements</p>
                  </div>
                  
                  <div>
                    <Label>Tool Automation Benefits (Annual)</Label>
                    <Input
                      type="number"
                      placeholder="80000"
                      onChange={(e) => updateFormData("cfToolBenefit", parseFloat(e.target.value) || 0)}
                    />
                    <p className="text-xs text-muted-foreground">RPA, workflow automation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Risk Assessment</h3>
              <p className="text-sm text-muted-foreground">
                Evaluate the risks that could impact your AI initiative
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pSuccess">Technical Success Probability</Label>
                  <Input
                    id="pSuccess"
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={formData.pSuccess}
                    onChange={(e) => updateFormData("pSuccess", parseFloat(e.target.value))}
                    placeholder="0.75"
                  />
                  <p className="text-xs text-muted-foreground">Likelihood of successful implementation</p>
                </div>
                
                <div>
                  <Label htmlFor="pAdoption">User Adoption Probability</Label>
                  <Input
                    id="pAdoption"
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={formData.pAdoption}
                    onChange={(e) => updateFormData("pAdoption", parseFloat(e.target.value))}
                    placeholder="0.70"
                  />
                  <p className="text-xs text-muted-foreground">Likelihood of user adoption</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="dataRisk">Data Risk (1-5 scale)</Label>
                  <Select
                    value={formData.dataRisk.toString()}
                    onValueChange={(value) => updateFormData("dataRisk", parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Very Low</SelectItem>
                      <SelectItem value="2">2 - Low</SelectItem>
                      <SelectItem value="3">3 - Moderate</SelectItem>
                      <SelectItem value="4">4 - High</SelectItem>
                      <SelectItem value="5">5 - Very High</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Data quality and availability</p>
                </div>
                
                <div>
                  <Label htmlFor="regulatoryRisk">Regulatory Risk (1-5 scale)</Label>
                  <Select
                    value={formData.regulatoryRisk.toString()}
                    onValueChange={(value) => updateFormData("regulatoryRisk", parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Very Low</SelectItem>
                      <SelectItem value="2">2 - Low</SelectItem>
                      <SelectItem value="3">3 - Moderate</SelectItem>
                      <SelectItem value="4">4 - High</SelectItem>
                      <SelectItem value="5">5 - Very High</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Compliance requirements</p>
                </div>
                
                <div>
                  <Label htmlFor="vendorRisk">Vendor Risk (1-5 scale)</Label>
                  <Select
                    value={formData.vendorRisk.toString()}
                    onValueChange={(value) => updateFormData("vendorRisk", parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Very Low</SelectItem>
                      <SelectItem value="2">2 - Low</SelectItem>
                      <SelectItem value="3">3 - Moderate</SelectItem>
                      <SelectItem value="4">4 - High</SelectItem>
                      <SelectItem value="5">5 - Very High</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Vendor stability and support</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold mb-2">Review & Calculate</h3>
              <p className="text-sm text-muted-foreground">
                Review your inputs and calculate the RoAI assessment
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Initiative Summary</h4>
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <div><strong>Name:</strong> {formData.name || "Not specified"}</div>
                  <div><strong>Owner:</strong> {formData.ownerEmail || "Not specified"}</div>
                  <div><strong>Horizon:</strong> {formData.horizonYears} years</div>
                  <div><strong>Discount Rate:</strong> {(formData.discountRate * 100).toFixed(1)}%</div>
                  <div><strong>Counterfactual:</strong> {formData.counterfactualType || "Not specified"}</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Risk Assessment</h4>
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <div><strong>Success Probability:</strong> {(formData.pSuccess * 100).toFixed(1)}%</div>
                  <div><strong>Adoption Probability:</strong> {(formData.pAdoption * 100).toFixed(1)}%</div>
                  <div><strong>Data Risk:</strong> {formData.dataRisk}/5</div>
                  <div><strong>Regulatory Risk:</strong> {formData.regulatoryRisk}/5</div>
                  <div><strong>Vendor Risk:</strong> {formData.vendorRisk}/5</div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <Button 
                size="lg" 
                className="w-full md:w-auto"
                onClick={() => {
                  // Here you would typically save the initiative and redirect to results
                  alert("Initiative saved! This would redirect to the results page.");
                }}
              >
                Calculate RoAI Assessment
              </Button>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Step {currentStep + 1} coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold">Return on AI Assessment</h1>
              <p className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {WIZARD_STEPS.length}: {WIZARD_STEPS[currentStep]}
              </p>
            </div>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            {WIZARD_STEPS.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {index < currentStep ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <span className={`ml-2 text-sm ${
                  index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step}
                </span>
                {index < WIZARD_STEPS.length - 1 && (
                  <div className="w-8 h-px bg-border mx-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>{WIZARD_STEPS[currentStep]}</CardTitle>
            </CardHeader>
            <CardContent>
              {renderStep()}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex gap-2">
              {currentStep < WIZARD_STEPS.length - 1 && (
                <Button onClick={nextStep}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
              
              {currentStep === WIZARD_STEPS.length - 1 && (
                <Button 
                  onClick={() => {
                    alert("Assessment complete! This would redirect to results page.");
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Calculate RoAI
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
