/**
 * Gate Evaluator Module — deterministic gate evaluation (NO LLM)
 *
 * Input:        NamingFacts (output of extractor.ts)
 * Output:       GateEvaluation — G0–G5, each Pass | Fail | Pending | Unknown
 * Side effects: none — pure TypeScript, no I/O
 * Called by:    lib/orchestrator.ts  (GATES phase)
 * Tested by:    tests/evaluator.test.ts  (12 tests)
 */

import type { GateEvaluation, GateResult } from "../models/gates";
import type { NamingFacts } from "../models/facts";
import { GATE_DEFINITIONS } from "../config/naming-rules";
import { hasTag, isGateAnswered, markGateAnswered } from "../models/facts";

export function evaluateGates(facts: NamingFacts): GateEvaluation {
  const g0 = evaluateG0(facts);
  const g1 = evaluateG1(facts);
  const g2 = evaluateG2(facts, g1);
  const g3 = evaluateG3(facts);
  const g4 = evaluateG4(facts);
  const g5 = evaluateG5(facts);

  if (g0.status !== "Unknown" && g0.status !== "Pending") markGateAnswered(facts, "G0");
  if (g1.status !== "Unknown" && g1.status !== "Pending") markGateAnswered(facts, "G1");
  if (g2.status !== "Unknown" && g2.status !== "Pending") markGateAnswered(facts, "G2");
  if (g3.status !== "Unknown" && g3.status !== "Pending") markGateAnswered(facts, "G3");
  if (g4.status !== "Unknown" && g4.status !== "Pending") markGateAnswered(facts, "G4");
  if (g5.status !== "Unknown" && g5.status !== "Pending") markGateAnswered(facts, "G5");

  const allGates = [g0, g1, g2, g3, g4, g5];
  const any_failures = allGates.some(g => g.status === "Fail");
  const missing_info = allGates.some(g => g.status === "Unknown" || g.status === "Pending");

  return {
    gate_results: { G0: g0, G1: g1, G2: g2, G3: g3, G4: g4, G5: g5 },
    any_failures,
    missing_info,
  };
}

/**
 * G0: Interaction Model
 * Does the user explicitly see and select this? Or is it invisible?
 */
function evaluateG0(facts: NamingFacts): GateResult {
  const { vertical_services, enrollment_policies } = facts.facts;

  if (enrollment_policies === "separate") {
    return {
      label: GATE_DEFINITIONS.G0.label,
      status: "Pass",
      evidence: `Separate enrollment flow detected. Users must explicitly opt in to access this offering.`,
      reasoning: "A distinct enrollment step confirms this is a user-facing product, not a background process. Users actively choose to engage with it, which means a name provides real navigational value — they can find it, refer to it, and return to it.",
    };
  }

  if (vertical_services.length > 0) {
    return {
      label: GATE_DEFINITIONS.G0.label,
      status: "Pass",
      evidence: `Vertical services identified: ${vertical_services.join(", ")}.`,
      reasoning: "Vertical service offerings imply a distinct product surface that users interact with directly. Users select, configure, or purchase these services, making the interaction model explicit rather than automatic.",
    };
  }

  if (enrollment_policies === "shared") {
    return {
      label: GATE_DEFINITIONS.G0.label,
      status: "Fail",
      evidence: "Enrollment is shared with the existing platform flow — no separate opt-in detected.",
      reasoning: "When users don't make an active choice to engage with something, naming it creates cognitive overhead without payoff. Background or embedded features are better described inline rather than branded as standalone products.",
    };
  }

  return {
    label: GATE_DEFINITIONS.G0.label,
    status: "Unknown",
    evidence: "No enrollment or interaction model information was found in the brief.",
    reasoning: "We need to know whether users actively select or configure this feature, or whether it operates invisibly. That distinction determines whether a name would help users at all.",
  };
}

/**
 * G1: Integration Level
 * Does it have its own enrollment and/or checkout separate from the core platform?
 */
function evaluateG1(facts: NamingFacts): GateResult {
  const { enrollment_policies, checkout_flow, vertical_services } = facts.facts;

  if (enrollment_policies === "separate" || checkout_flow === "distinct" || vertical_services.length > 0) {
    const evidenceParts: string[] = [];
    if (enrollment_policies === "separate") evidenceParts.push("separate enrollment");
    if (checkout_flow === "distinct") evidenceParts.push("distinct checkout flow");
    if (vertical_services.length > 0) evidenceParts.push(`vertical services (${vertical_services.join(", ")})`);

    return {
      label: GATE_DEFINITIONS.G1.label,
      status: "Pass",
      evidence: `Standalone integration signals found: ${evidenceParts.join("; ")}.`,
      reasoning: "Products with their own enrollment or checkout are experienced as distinct entities by users. This separation signals product-level investment and justifies a proper name — users need to be able to identify what they signed up for, track its benefits, and recommend it to others.",
    };
  }

  if (enrollment_policies === "shared" && checkout_flow === "shared") {
    return {
      label: GATE_DEFINITIONS.G1.label,
      status: "Fail",
      evidence: "Both enrollment and checkout are shared with the existing platform.",
      reasoning: "When a feature uses the same enrollment and purchase flow as everything else on the platform, it functions as an integrated capability rather than a discrete product. A proper name would be confusing — users would encounter the name inconsistently and have no clear mental model of what it represents.",
    };
  }

  if (enrollment_policies === "shared") {
    return {
      label: GATE_DEFINITIONS.G1.label,
      status: "Fail",
      evidence: "Enrollment is shared — users access this through the standard platform flow with no distinct sign-up.",
      reasoning: "Shared enrollment means this feature is accessed as part of a larger experience, not independently. There's no moment where a user decides to 'get' this product, which makes a standalone brand name unnecessary and potentially misleading.",
    };
  }

  return {
    label: GATE_DEFINITIONS.G1.label,
    status: "Unknown",
    evidence: "The brief doesn't describe whether users go through a dedicated enrollment or standard platform access.",
    reasoning: "We need to know whether this has its own sign-up flow or relies on the existing platform's entry points. The answer determines whether this functions as a standalone product (needs a name) or an embedded feature (use descriptive copy instead).",
  };
}

/**
 * G2: Standalone Architecture
 * Does it have distinct service boundaries, or does it share platform infrastructure?
 */
function evaluateG2(facts: NamingFacts, g1Result: GateResult): GateResult {
  const { enrollment_policies, vertical_services } = facts.facts;

  if (enrollment_policies === "separate") {
    return {
      label: GATE_DEFINITIONS.G2.label,
      status: "Pass",
      evidence: "Separate enrollment implies distinct operational boundaries.",
      reasoning: "A product with its own enrollment flow almost always requires dedicated backend infrastructure to manage member state, entitlements, and service delivery. Distinct architecture reinforces that this is a first-class product rather than a feature layer on top of existing systems.",
    };
  }

  if (vertical_services.length > 0) {
    return {
      label: GATE_DEFINITIONS.G2.label,
      status: "Pass",
      evidence: `Vertical services present: ${vertical_services.join(", ")}. These typically require dedicated service infrastructure.`,
      reasoning: "Vertical service offerings (authentication, storage, payments, etc.) operate with their own data models and system boundaries. This architectural separation supports product-level naming, since the service functions independently of the core platform.",
    };
  }

  if (enrollment_policies === "shared") {
    return {
      label: GATE_DEFINITIONS.G2.label,
      status: "Fail",
      evidence: "Shared enrollment indicates the feature runs within existing platform infrastructure.",
      reasoning: "Features that share the platform's enrollment and access patterns typically share its infrastructure too. Without distinct service boundaries, there's no architectural rationale for a standalone product name.",
    };
  }

  if (g1Result.status === "Fail") {
    return {
      label: GATE_DEFINITIONS.G2.label,
      status: "Fail",
      evidence: "G1 (Integration Level) failed — no standalone integration signals found, so architecture is assumed to be shared.",
      reasoning: "Since this doesn't appear to have its own enrollment or checkout path, it most likely runs on shared platform infrastructure. Absent any evidence of distinct service boundaries, we apply the conservative default: this is an embedded feature.",
    };
  }

  return {
    label: GATE_DEFINITIONS.G2.label,
    status: "Unknown",
    evidence: "No architectural signals found in the brief. Cannot determine if this has its own backend services.",
    reasoning: "We need to understand whether this runs on dedicated infrastructure or is layered onto the existing platform. Products with distinct system boundaries benefit from a name; features that share the platform's core systems typically don't.",
  };
}

/**
 * G3: Strategic Lifespan
 * Is this a long-term, permanent addition (12+ months) or a short-term initiative?
 */
function evaluateG3(facts: NamingFacts): GateResult {
  const { longevity_months } = facts.facts;

  if (longevity_months !== null && longevity_months >= 12) {
    return {
      label: GATE_DEFINITIONS.G3.label,
      status: "Pass",
      evidence: `Planned duration: ${longevity_months} months${longevity_months >= 24 ? " (2+ years)" : ""}.`,
      reasoning: "A lifespan of 12 months or more justifies the investment that naming requires — legal review, trademark searches, brand governance, localization, and ongoing maintenance. With enough time in market, users can build familiarity with the name and it becomes a genuine asset.",
    };
  }

  if (longevity_months !== null && longevity_months < 12) {
    return {
      label: GATE_DEFINITIONS.G3.label,
      status: "Fail",
      evidence: `Planned duration: ${longevity_months} months — below the 12-month naming threshold.`,
      reasoning: "Short-term initiatives don't justify the overhead of a proper name. Users won't have time to build recognition, legal review takes time, and the brand equity created would be abandoned before it compounds. Descriptive labels are the right approach here.",
    };
  }

  return {
    label: GATE_DEFINITIONS.G3.label,
    status: "Unknown",
    evidence: "No timing or lifespan information found in the brief.",
    reasoning: "We need to know whether this is a permanent platform addition or a time-limited campaign. Naming only makes sense when a product will be around long enough for users to recognize and trust the name. Without this, we can't assess the return on naming investment.",
  };
}

/**
 * G4: Portfolio Alignment
 * Does this conflict with any existing eBay products or programs?
 */
function evaluateG4(facts: NamingFacts): GateResult {
  const hasPortfolioRisk = hasTag(facts, "portfolio_risk");
  const wasExplicitlyAnswered = isGateAnswered(facts, "G4");

  if (hasPortfolioRisk) {
    return {
      label: GATE_DEFINITIONS.G4.label,
      status: "Fail",
      evidence: "Portfolio risk flag raised during landscape analysis — naming overlap with an existing eBay product detected.",
      reasoning: "A naming collision with an existing product creates confusion for customers and internal teams, dilutes both brands, and forces expensive remediation later. Any name chosen for this offering needs to be clearly differentiated from existing portfolio names.",
    };
  }

  if (wasExplicitlyAnswered) {
    return {
      label: GATE_DEFINITIONS.G4.label,
      status: "Pass",
      evidence: "Portfolio alignment confirmed — no internal naming conflicts found.",
      reasoning: "With no overlapping names in the existing portfolio, a new name for this product won't create customer confusion or internal brand fragmentation. The naming space is clear.",
    };
  }

  return {
    label: GATE_DEFINITIONS.G4.label,
    status: "Unknown",
    evidence: "No portfolio conflict check has been completed for this brief.",
    reasoning: "Before proceeding, we need to verify there are no existing eBay products, programs, or features with a similar name or concept. Even partial overlaps can create confusion at scale. This is a required check before any naming recommendation.",
  };
}

/**
 * G5: Legal & Localization
 * Are there trademark conflicts or regulatory restrictions on naming?
 */
function evaluateG5(facts: NamingFacts): GateResult {
  const hasTrademarkRisk = hasTag(facts, "trademark_risk");
  const wasExplicitlyAnswered = isGateAnswered(facts, "G5");

  if (hasTrademarkRisk) {
    return {
      label: GATE_DEFINITIONS.G5.label,
      status: "Fail",
      evidence: "Trademark risk flag raised — potential conflict with registered marks or regulatory terminology detected.",
      reasoning: "A trademark conflict or regulatory mandate can make a proposed name legally unusable in target markets. This isn't just a legal formality — in some markets (particularly Germany and the EU), regulatory terminology for consumer-facing financial or protection products is mandated by law and cannot be replaced by a brand name.",
    };
  }

  if (wasExplicitlyAnswered) {
    return {
      label: GATE_DEFINITIONS.G5.label,
      status: "Pass",
      evidence: "Legal clearance confirmed — no trademark conflicts or regulatory restrictions identified in target markets.",
      reasoning: "With legal clearance in hand, the naming path is open. The proposed name can be used across the declared markets without running into trademark conflicts or regulatory language requirements.",
    };
  }

  return {
    label: GATE_DEFINITIONS.G5.label,
    status: "Unknown",
    evidence: "Legal review has not been completed for this offering.",
    reasoning: "We need to know whether legal has screened this for trademark availability and regulatory compliance in the target markets. Some markets have mandatory consumer-protection terminology that cannot be overridden by a brand name, which would affect whether a proper name is even viable.",
  };
}
