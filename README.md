# AI ROI for Enterprises by Mays School of Business

A production-ready web application that enables organizations to assess the **Return on AI (RoAI)** for proposed or active AI initiatives. Built with finance-grade clarity and enterprise decision-making in mind.

## 🎯 Purpose

Leaders struggle to separate hype from value on AI projects. This application provides a consistent, finance-sound method to estimate value, cost, risk, and counterfactual baselines for AI initiatives.

## ✨ Key Features

- **Comprehensive RoAI Calculation**: NPV, IRR, payback period, benefit-cost ratio
- **Counterfactual Analysis**: Compare AI plans against do-nothing, manual improvement, or alternative solutions
- **Risk-Adjusted Scoring**: Factor in technical, adoption, data, regulatory, and vendor risks
- **Executive Decision Support**: Clear recommendations (expand, pilot, halt) with confidence bands
- **Sensitivity Analysis**: Understand key drivers and risk ranges
- **Monte Carlo Simulation**: 1,000+ scenario simulations for probability distributions
- **Export & Share**: PDF reports and CSV exports for stakeholder presentations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- SQLite (default) or PostgreSQL

### Installation

1. **Clone and install dependencies:**
   ```bash
   git clone <repository-url>
   cd "AI ROI by Mays"
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your configuration
   ```

3. **Initialize database:**
   ```bash
   npm run db:push
   npm run db:seed
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

## 📊 RoAI Framework

### Core Formulas

**Net Present Value (NPV):**
```
NPV = Σ(CF_t / (1 + r)^t)
```

**Internal Rate of Return (IRR):**
```
0 = Σ(CF_t / (1 + IRR)^t)
```

**RoAI Score (0-100):**
```
RoAI = 100 × V × M
```
Where:
- V = Normalized value index (0-1)
- M = Risk multiplier (0-1)

**Decision Rules:**
- **Expand**: RoAI ≥ 70 and NPV > 0
- **Pilot**: 40 ≤ RoAI < 70 or NPV > 0
- **Halt**: RoAI < 40 or payback > horizon

### Risk Assessment

The framework considers five risk dimensions:
- **Technical Risk**: Probability of successful implementation
- **Adoption Risk**: Probability of user adoption
- **Data Risk**: Data quality and availability (1-5 scale)
- **Regulatory Risk**: Compliance requirements (1-5 scale)
- **Vendor Risk**: Vendor stability and support (1-5 scale)

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, shadcn/ui
- **Database**: Prisma ORM with SQLite/PostgreSQL
- **Authentication**: NextAuth.js
- **Charts**: Recharts
- **PDF Export**: @react-pdf/renderer
- **Testing**: Vitest, React Testing Library, Playwright

### Project Structure

```
├── app/                    # Next.js app router
│   ├── page.tsx           # Homepage
│   ├── initiative/        # Initiative management
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── assumption-table.tsx
│   ├── decision-engine.tsx
│   └── formula-hint.tsx
├── lib/                   # Utilities and business logic
│   ├── finance.ts        # Core finance calculations
│   ├── utils.ts          # Helper functions
│   └── validations.ts    # Zod schemas
├── prisma/               # Database schema and migrations
└── tests/                # Test files
```

## 📈 Usage

### 1. Create New Assessment

Navigate to `/initiative/new` and follow the 7-step wizard:

1. **Context**: Initiative details and strategic objectives
2. **Time Horizon**: Analysis period and discount rate
3. **AI Costs**: Development, licensing, infrastructure costs
4. **AI Benefits**: Productivity, revenue, quality improvements
5. **Counterfactual**: Alternative approach costs and benefits
6. **Risk Assessment**: Technical and adoption probabilities
7. **Review**: Final calculations and recommendations

### 2. View Example

Check out `/initiative/example` to see a complete assessment for a "Customer Support AI Copilot" initiative.

### 3. Export Results

Generate PDF reports and CSV exports for stakeholder presentations.

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Type checking
npm run type-check
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Docker

```bash
# Build image
docker build -t ai-roi-app .

# Run container
docker run -p 3000:3000 ai-roi-app
```

### Environment Variables

```bash
# Database
DATABASE_URL="file:./dev.db"  # or PostgreSQL URL

# Authentication
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-secret-key"

# Optional: GitHub OAuth
GITHUB_ID="your-github-id"
GITHUB_SECRET="your-github-secret"

# Optional: Rate limiting
UPSTASH_REDIS_REST_URL="your-redis-url"
UPSTASH_REDIS_REST_TOKEN="your-redis-token"
```

## 📚 Documentation

- [Assumptions Guide](./ASSUMPTIONS.md) - Category mappings and default values
- [Security Guide](./SECURITY.md) - Threat model and mitigations
- [API Reference](./docs/api.md) - API endpoints and schemas

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🏫 About Mays School of Business

This application was developed as part of the Mays School of Business research initiative to provide enterprise-grade tools for AI investment decision-making.

## 🆘 Support

For questions or issues:
- Create an issue in the repository
- Contact: [support-email]
- Documentation: [docs-url]

---

**Built with ❤️ for enterprise AI decision-making**
