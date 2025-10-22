"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, TrendingUp, Shield, FileText, Users, Target } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-primary" />
              <h1 className="text-xl font-bold">Return on AI</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/about" className="text-sm hover:text-primary">
                About
              </Link>
              <Link href="/docs" className="text-sm hover:text-primary">
                Documentation
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Make AI decisions with{" "}
            <span className="text-primary">finance-grade clarity</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Assess the Return on AI (RoAI) for your enterprise initiatives. 
            Compare AI plans against counterfactuals and get data-driven recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/initiative/new">
                New Assessment
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="/initiative/example">
                Try Example
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our RoAI Framework?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built on rigorous financial principles with enterprise-grade analysis
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Comprehensive Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Calculate NPV, IRR, payback period, and benefit-cost ratio with 
                transparent formulas and assumptions.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Risk-Adjusted Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Factor in technical, adoption, data, regulatory, and vendor risks 
                for realistic ROI projections.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Target className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Counterfactual Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Compare your AI initiative against do-nothing, manual improvement, 
                or alternative software solutions.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Executive Decision Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get clear recommendations: expand, pilot, or halt with 
                confidence bands and sensitivity analysis.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Export & Share</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Generate PDF reports and CSV exports for stakeholder 
                presentations and documentation.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Calculator className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Monte Carlo Simulation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Run 1,000+ scenario simulations to understand probability 
                distributions and risk ranges.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Assess Your AI Initiative?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get started with our guided assessment wizard. Complete your first 
            RoAI analysis in under 10 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/initiative/new">
                Start Assessment
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
              <Link href="/initiative/example">
                View Example
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Calculator className="h-6 w-6 text-primary" />
              <span className="font-semibold">Return on AI</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Return on AI. Built for enterprise decision-making.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
