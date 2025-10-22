import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create example initiative: Customer Support Copilot
  const initiative = await prisma.initiative.create({
    data: {
      name: "Customer Support AI Copilot",
      ownerEmail: "demo@company.com",
      summary: "AI-powered customer support assistant to reduce response times and improve satisfaction",
      strategicObjective: "Improve customer experience and reduce support costs through AI automation",
      primaryKPI: "Average response time reduction",
      currency: "USD",
      region: "US",
      horizonYears: 3,
      discountRate: 0.10,
      counterfactualType: "manual-improvement",
      counterfactual: {
        create: {
          description: "Expand manual support team with 6 additional FTEs in Year 1, 3 more in Year 2+, and implement basic automation tools ($30k/year)"
        }
      }
    }
  });

  // AI Plan Costs
  const aiCosts = [
    { label: "AI Model Licensing", category: "license", year: 0, amount: 80000 },
    { label: "AI Model Licensing", category: "license", year: 1, amount: 80000 },
    { label: "AI Model Licensing", category: "license", year: 2, amount: 80000 },
    { label: "Integration & Development", category: "dev", year: 0, amount: 120000 },
    { label: "Data Preparation", category: "data", year: 0, amount: 40000 },
    { label: "Training & Change Management", category: "training", year: 0, amount: 40000 },
    { label: "Cloud Infrastructure", category: "cloud", year: 0, amount: 60000 },
    { label: "Cloud Infrastructure", category: "cloud", year: 1, amount: 60000 },
    { label: "Cloud Infrastructure", category: "cloud", year: 2, amount: 60000 },
    { label: "Governance & Compliance", category: "governance", year: 0, amount: 20000 },
    { label: "Governance & Compliance", category: "governance", year: 1, amount: 20000 },
    { label: "Governance & Compliance", category: "governance", year: 2, amount: 20000 },
  ];

  for (const cost of aiCosts) {
    await prisma.cost.create({
      data: {
        ...cost,
        initiativeId: initiative.id,
        isCounterfactual: false,
      }
    });
  }

  // AI Plan Benefits
  const aiBenefits = [
    { label: "Productivity Gains (12 FTE)", category: "productivity", year: 0, amount: 151200 },
    { label: "Productivity Gains (12 FTE)", category: "productivity", year: 1, amount: 302400 },
    { label: "Productivity Gains (12 FTE)", category: "productivity", year: 2, amount: 428400 },
    { label: "Quality Improvement", category: "quality", year: 0, amount: 50000 },
    { label: "Quality Improvement", category: "quality", year: 1, amount: 100000 },
    { label: "Quality Improvement", category: "quality", year: 2, amount: 150000 },
    { label: "Customer Retention", category: "cx", year: 0, amount: 80000 },
    { label: "Customer Retention", category: "cx", year: 1, amount: 160000 },
    { label: "Customer Retention", category: "cx", year: 2, amount: 240000 },
  ];

  for (const benefit of aiBenefits) {
    await prisma.benefit.create({
      data: {
        ...benefit,
        initiativeId: initiative.id,
        isCounterfactual: false,
      }
    });
  }

  // Counterfactual Costs
  const cfCosts = [
    { label: "Additional Support Staff (6 FTE)", category: "dev", year: 0, amount: 360000 },
    { label: "Additional Support Staff (3 FTE)", category: "dev", year: 1, amount: 180000 },
    { label: "Additional Support Staff (3 FTE)", category: "dev", year: 2, amount: 180000 },
    { label: "Basic Automation Tools", category: "license", year: 0, amount: 30000 },
    { label: "Basic Automation Tools", category: "license", year: 1, amount: 30000 },
    { label: "Basic Automation Tools", category: "license", year: 2, amount: 30000 },
  ];

  for (const cost of cfCosts) {
    await prisma.cost.create({
      data: {
        ...cost,
        initiativeId: initiative.id,
        isCounterfactual: true,
      }
    });
  }

  // Counterfactual Benefits
  const cfBenefits = [
    { label: "Manual Process Efficiency", category: "productivity", year: 0, amount: 100000 },
    { label: "Manual Process Efficiency", category: "productivity", year: 1, amount: 200000 },
    { label: "Manual Process Efficiency", category: "productivity", year: 2, amount: 300000 },
  ];

  for (const benefit of cfBenefits) {
    await prisma.benefit.create({
      data: {
        ...benefit,
        initiativeId: initiative.id,
        isCounterfactual: true,
      }
    });
  }

  // Risk Assessment
  await prisma.risk.create({
    data: {
      initiativeId: initiative.id,
      pSuccess: 0.75,
      pAdoption: 0.70,
      dataRisk: 2,
      regulatoryRisk: 2,
      vendorRisk: 2,
      multipliers: JSON.stringify({
        data: 0.9,
        regulatory: 0.9,
        vendor: 0.9
      })
    }
  });

  // Create scenarios
  const scenarios = [
    {
      name: "Conservative",
      inputs: JSON.stringify({
        pSuccess: 0.6,
        pAdoption: 0.5,
        benefitMultiplier: 0.8
      })
    },
    {
      name: "Base",
      inputs: JSON.stringify({})
    },
    {
      name: "Aggressive", 
      inputs: JSON.stringify({
        pSuccess: 0.9,
        pAdoption: 0.85,
        benefitMultiplier: 1.2
      })
    }
  ];

  for (const scenario of scenarios) {
    await prisma.scenario.create({
      data: {
        ...scenario,
        initiativeId: initiative.id,
      }
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log(`📊 Created initiative: ${initiative.name}`);
  console.log(`💰 Added ${aiCosts.length} AI costs and ${aiBenefits.length} AI benefits`);
  console.log(`📈 Added ${cfCosts.length} counterfactual costs and ${cfBenefits.length} counterfactual benefits`);
  console.log(`🎯 Created ${scenarios.length} scenarios`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
