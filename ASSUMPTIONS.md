# Assumptions and Default Values

This document outlines the assumptions, default values, and category mappings used in the AI ROI assessment framework.

## 📊 Cost Categories

### AI Initiative Costs

| Category | Description | Typical Range | Example Items |
|----------|-------------|---------------|---------------|
| **Development** | Model development and integration | $50k - $500k | Custom model training, API integration, system architecture |
| **Data** | Data preparation and processing | $20k - $200k | Data cleaning, labeling, quality assurance |
| **License** | AI model and tool licensing | $10k - $100k/year | OpenAI API, Azure AI, AWS Bedrock |
| **Cloud** | Infrastructure and compute | $5k - $50k/year | GPU instances, storage, bandwidth |
| **Training** | Staff training and change management | $10k - $100k | AI literacy, tool training, workshops |
| **Governance** | Compliance and oversight | $5k - $50k/year | Audit, monitoring, governance tools |
| **Security** | Security and privacy measures | $5k - $30k/year | Data encryption, access controls |
| **Vendor** | Third-party services | $10k - $100k/year | Consulting, implementation partners |
| **Legal** | Legal and regulatory | $5k - $25k/year | Compliance review, contracts |
| **Maintenance** | Ongoing support and updates | $10k - $50k/year | Model updates, bug fixes, monitoring |

### Counterfactual Costs

| Category | Description | Typical Range | Example Items |
|----------|-------------|---------------|---------------|
| **Manual** | Additional human resources | $50k - $200k/FTE | Hiring, training, benefits |
| **Tools** | Non-AI automation tools | $5k - $25k/year | RPA, workflow automation |
| **Process** | Process improvement initiatives | $10k - $50k | Lean Six Sigma, training programs |

## 💰 Benefit Categories

### AI Initiative Benefits

| Category | Description | Calculation Method | Example |
|----------|-------------|-------------------|---------|
| **Productivity** | Time savings and efficiency gains | Hours Saved × Labor Rate × Adoption × Quality Factor | 12 FTE × 300 hours × $60/hour × 0.6 × 0.7 = $151k |
| **Revenue** | Direct revenue increases | Conversion Lift × Baseline Revenue × Margin | 5% lift × $1M revenue × 80% margin = $40k |
| **Quality** | Defect reduction and rework savings | Defect Rate Reduction × Cost of Poor Quality × Volume | 15% reduction × $50/ticket × 10k tickets = $75k |
| **Speed** | Time-to-market acceleration | Time Reduction × Value of Earlier Cash Flows | 3 months faster × $100k/month = $300k |
| **Risk** | Risk reduction and compliance | Baseline Loss × Risk Reduction % × Probability | $500k loss × 20% reduction × 0.8 = $80k |
| **Customer Experience** | Customer satisfaction and retention | NPS Delta × Revenue Elasticity | 10 point NPS increase × $50k revenue = $500k |

## 🎯 Default Values

### Time Horizon
- **Default**: 3 years
- **Range**: 1-5 years
- **Rationale**: Balances short-term validation with long-term value capture

### Discount Rate (WACC)
- **Default**: 10%
- **Range**: 5-15%
- **Rationale**: Conservative estimate for enterprise cost of capital

### Adoption Curve
- **Year 1**: 30% adoption
- **Year 2**: 60% adoption  
- **Year 3**: 85% adoption
- **Rationale**: Realistic ramp-up based on change management research

### Quality Factor
- **Default**: 0.7 (70% efficiency)
- **Range**: 0.5-0.9
- **Rationale**: Accounts for learning curve and imperfect automation

## ⚖️ Risk Assessment Scales

### Probability Scales (0-1)
- **pSuccess**: Technical implementation success
  - 0.9: Proven technology, experienced team
  - 0.75: Standard implementation (default)
  - 0.5: New technology, limited experience
  - 0.25: High complexity, unproven approach

- **pAdoption**: User adoption probability
  - 0.9: High user demand, clear benefits
  - 0.7: Standard change management (default)
  - 0.5: Moderate resistance, unclear benefits
  - 0.3: High resistance, unclear value

### Risk Factor Scales (1-5)
- **1**: Very Low Risk
- **2**: Low Risk (default)
- **3**: Moderate Risk
- **4**: High Risk
- **5**: Very High Risk

### Risk Multipliers
- **Data Risk**: 1.0 → 0.6 (1-5 scale)
- **Regulatory Risk**: 1.0 → 0.6 (1-5 scale)
- **Vendor Risk**: 1.0 → 0.6 (1-5 scale)

## 📈 Sensitivity Analysis Defaults

### Variable Ranges
- **Costs**: ±20% variation
- **Benefits**: ±20% variation
- **Discount Rate**: ±10% variation
- **Risk Factors**: ±15% variation

### Monte Carlo Parameters
- **Trials**: 1,000 simulations
- **Distribution**: Normal distribution with ±20% standard deviation
- **Correlation**: Independent variables (can be enhanced)

## 🎨 RoAI Score Weights

### Value Index Components
- **NPV Weight**: 40% (financial impact)
- **IRR Weight**: 30% (return rate)
- **Payback Weight**: 15% (liquidity)
- **BCR Weight**: 15% (efficiency)

### Decision Thresholds
- **Expand**: RoAI ≥ 70 AND NPV > 0
- **Pilot**: 40 ≤ RoAI < 70 OR NPV > 0
- **Halt**: RoAI < 40 OR payback > horizon

## 🔧 Customization Guidelines

### Organization-Specific Adjustments
1. **Industry Benchmarks**: Adjust adoption curves based on sector
2. **Company Culture**: Modify change management assumptions
3. **Technology Maturity**: Adjust technical risk based on AI readiness
4. **Regulatory Environment**: Update compliance risk factors

### Sensitivity Testing
1. **Conservative**: Reduce benefits by 20%, increase costs by 20%
2. **Base Case**: Use standard assumptions
3. **Aggressive**: Increase benefits by 20%, reduce costs by 20%

## 📚 References

- **Adoption Curves**: Based on Rogers' Diffusion of Innovation theory
- **Risk Factors**: Derived from enterprise AI implementation studies
- **Financial Metrics**: Standard corporate finance principles
- **Quality Factors**: Based on automation efficiency research

## 🔄 Updates

This document should be updated when:
- New cost/benefit categories are added
- Default values are changed based on research
- New risk factors are identified
- Industry benchmarks are updated

---

*Last updated: [Current Date]*
*Version: 1.0*
