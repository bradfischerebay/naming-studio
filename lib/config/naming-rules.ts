/**
 * Naming Rules Configuration
 * Single source of truth for gates, scoring, and business logic
 */

export const GATE_DEFINITIONS = {
  G0: {
    label: "Interaction Model",
    description: "Does the user actively select, toggle, or see this feature, or is it an invisible background process?",
    passConditions: [
      "User makes an active choice or interacts with a UI element",
      "Name is prominently displayed as a trust signal, badge, or brand element",
    ],
    failConditions: [
      "Feature is automatic, backend, infrastructure, or invisible",
      "Feature happens by default without user intervention",
      "Brief describes a rule, logic, algorithm, or risk score (not a tool)",
    ],
  },
  G1: {
    label: "Integration Level",
    description: "Does this initiative have its own enrollment, checkout, or entry point?",
    passConditions: [
      "Standalone App",
      "Separate Platform",
      "Distinct Sign-up",
    ],
    failConditions: [
      "eBay Live integration",
      "Feature within existing flow",
      "Format, mode, tool, toggle",
    ],
  },
  G2: {
    label: "Standalone Architecture",
    description: "Does it operate as a separate system with its own backend, or is it a feature within the existing platform?",
    passConditions: [
      "Microservice architecture",
      "Standalone system",
      "Distinct service boundaries",
    ],
    failConditions: [
      "Shared platform",
      "Integrated architecture",
      "Reuses existing platform",
    ],
  },
  G3: {
    label: "Strategic Lifespan",
    description: "Is this built to last as a permanent addition (>12 months), or is it a short-term promo?",
    passConditions: [
      "Longevity >= 12 months",
      "Launch date implies permanence",
      "Strategic pillar or platform capability",
    ],
    failConditions: [
      "Promo or campaign",
      "Seasonal offering",
      "Limited time",
    ],
  },
  G4: {
    label: "Portfolio Alignment",
    description: "Would the proposed concept cause user confusion or naming collisions with an existing eBay product?",
    passConditions: [
      "No internal name conflicts",
      "No similar concepts in portfolio",
    ],
    failConditions: [
      "portfolio_risk tag present",
      "Proposed names match competitor names",
    ],
  },
  G5: {
    label: "Legal & Localization Safety",
    description: "Are there trademark conflicts, regulatory restrictions, or cultural blockers in core markets?",
    passConditions: [
      "No trademark issues",
      "No regulatory blockers",
      "Safe for target markets",
    ],
    failConditions: [
      "trademark_risk tag present",
      "Regulatory restrictions violated",
      "Restricted language in target geographies (e.g., 'Guarantee' in DE)",
    ],
  },
} as const;

export const SCORING_RULES = {
  standalone: {
    label: "Standalone purchase behavior",
    maxPoints: 25,
    tiers: [
      { points: 25, condition: "Separate enrollment OR distinct checkout OR vertical services OR downloadable software" },
      { points: 0, condition: "None of the above" },
    ],
  },
  longevity: {
    label: "Longevity",
    maxPoints: 15,
    tiers: [
      { points: 15, condition: "longevity_months >= 12" },
      { points: 0, condition: "longevity_months < 12 or null" },
    ],
  },
  legal: {
    label: "Legal Req",
    maxPoints: 10,
    tiers: [
      { points: 10, condition: "formal_legal tag present" },
      { points: 0, condition: "formal_legal tag absent" },
    ],
  },
  global: {
    label: "Global Viability",
    maxPoints: 10,
    tiers: [
      { points: 10, condition: "global_big3 tag present OR (US AND UK/DE markets)" },
      { points: 0, condition: "None of the above" },
    ],
  },
  clarity: {
    label: "Clarity Lift",
    maxPoints: 10,
    tiers: [
      { points: 10, condition: "clarity_lift tag present" },
      { points: 0, condition: "clarity_lift tag absent" },
    ],
  },
  portfolio_risk: {
    label: "Portfolio Risk",
    maxPoints: 0,
    minPoints: -20,
    tiers: [
      { points: -20, condition: "portfolio_risk tag present" },
      { points: 0, condition: "portfolio_risk tag absent" },
    ],
  },
  trademark_risk: {
    label: "Trademark Risk",
    maxPoints: 0,
    minPoints: -20,
    tiers: [
      { points: -20, condition: "trademark_risk tag present" },
      { points: 0, condition: "trademark_risk tag absent" },
    ],
  },
} as const;

export const VERDICT_LOGIC = {
  PRIORITY_1: {
    name: "Legal/Localization Blocker",
    check: "G5 status is Fail",
    output: "PATH_A1",
  },
  PRIORITY_2: {
    name: "No Name (Ghost Protocol)",
    check: "G0 status is Fail",
    output: "PATH_A0",
  },
  PRIORITY_3: {
    name: "Gate Failures",
    check: "Any gate (G1-G4) status is Fail",
    output: "PATH_A1",
  },
  PRIORITY_4: {
    name: "Missing Info",
    check: "Any gate status is Unknown or Pending",
    output: "PATH_B",
  },
  PRIORITY_5: {
    name: "Score Failure",
    check: "Score < 60",
    output: "PATH_A2",
  },
  PRIORITY_6: {
    name: "Pass",
    check: "All gates pass AND score >= 60",
    output: "PATH_C",
  },
} as const;

export const BRIEF_FIELD_DEFINITIONS = [
  { key: "offering_description", label: "Offering Description", required: true },
  { key: "value_proposition", label: "Value Proposition", required: false },
  { key: "benefits", label: "Benefits", required: false },
  { key: "jobs_to_be_done", label: "Job(s) to be Done", required: false },
  { key: "example_use_cases", label: "Example Use Case(s)", required: false },
  { key: "pain_points", label: "Pain Point(s)", required: false },
  { key: "target_customers", label: "Target Customer(s)", required: true },
  { key: "target_geographies", label: "Target Geographies", required: false },
  { key: "customer_research_and_competitive_insights", label: "Customer Research and Competitive Insights", required: false },
  { key: "brand_considerations", label: "Brand Considerations", required: false },
  { key: "naming_request", label: "Naming Request", required: false },
  { key: "primary_contact", label: "Primary Contact", required: false },
  { key: "initial_name_ideas", label: "Initial Name Ideas", required: false },
  { key: "timing", label: "Timing", required: true },
] as const;
