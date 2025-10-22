"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, HelpCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { CostInput, BenefitInput } from "@/lib/validations";

interface AssumptionTableProps {
  title: string;
  items: (CostInput | BenefitInput)[];
  onItemsChange: (items: (CostInput | BenefitInput)[]) => void;
  categories: string[];
  years: number;
  isCounterfactual?: boolean;
}

export function AssumptionTable({
  title,
  items,
  onItemsChange,
  categories,
  years,
  isCounterfactual = false,
}: AssumptionTableProps) {
  const [showHelp, setShowHelp] = useState(false);

  const addItem = () => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      label: "",
      category: categories[0],
      year: 0,
      amount: 0,
      isCounterfactual,
    };
    onItemsChange([...items, newItem]);
  };

  const updateItem = (index: number, field: keyof (CostInput | BenefitInput), value: any) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    onItemsChange(updatedItems);
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    onItemsChange(updatedItems);
  };

  const getYearlyTotals = () => {
    const totals: { [year: number]: number } = {};
    for (let year = 0; year < years; year++) {
      totals[year] = items
        .filter(item => item.year === year)
        .reduce((sum, item) => sum + item.amount, 0);
    }
    return totals;
  };

  const yearlyTotals = getYearlyTotals();
  const grandTotal = Object.values(yearlyTotals).reduce((sum, total) => sum + total, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHelp(!showHelp)}
            >
              <HelpCircle className="h-4 w-4" />
            </Button>
            <Button onClick={addItem} size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Item
            </Button>
          </div>
        </div>
        {showHelp && (
          <div className="text-sm text-muted-foreground bg-muted p-3 rounded">
            <p><strong>Categories:</strong> {categories.join(", ")}</p>
            <p><strong>Time Horizon:</strong> {years} years</p>
            <p><strong>Default Values:</strong> Use realistic estimates based on your organization's experience</p>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Header */}
          <div className="grid grid-cols-6 gap-2 text-sm font-medium text-muted-foreground">
            <div>Label</div>
            <div>Category</div>
            <div>Year 0</div>
            <div>Year 1</div>
            <div>Year 2</div>
            {years > 3 && <div>Year 3+</div>}
            <div>Actions</div>
          </div>

          {/* Items */}
          {items.map((item, index) => (
            <div key={item.id || index} className="grid grid-cols-6 gap-2 items-center">
              <Input
                value={item.label}
                onChange={(e) => updateItem(index, "label", e.target.value)}
                placeholder="Item description"
              />
              <select
                value={item.category}
                onChange={(e) => updateItem(index, "category", e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {Array.from({ length: Math.min(years, 4) }, (_, year) => (
                <Input
                  key={year}
                  type="number"
                  value={item.year === year ? item.amount : ""}
                  onChange={(e) => {
                    if (item.year === year) {
                      updateItem(index, "amount", parseFloat(e.target.value) || 0);
                    } else {
                      // Create a new item for this year
                      const newItem = {
                        ...item,
                        id: Math.random().toString(36).substr(2, 9),
                        year,
                        amount: parseFloat(e.target.value) || 0,
                      };
                      onItemsChange([...items, newItem]);
                    }
                  }}
                  placeholder="0"
                  className="text-right"
                />
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeItem(index)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {/* Totals Row */}
          <div className="grid grid-cols-6 gap-2 items-center pt-2 border-t">
            <div className="font-medium">Total</div>
            <div></div>
            {Array.from({ length: Math.min(years, 4) }, (_, year) => (
              <div key={year} className="text-right font-medium">
                {formatCurrency(yearlyTotals[year] || 0)}
              </div>
            ))}
            <div className="text-right font-bold text-lg">
              {formatCurrency(grandTotal)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
