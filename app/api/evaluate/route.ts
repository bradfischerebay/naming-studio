import { NextRequest, NextResponse } from "next/server";
import { chomsky } from "@/lib/chomsky";
import { GatekeeperSchema, ScorerSchema, type EvaluationResult } from "@/lib/schemas";
import { calculateVerdict } from "@/lib/verdict-engine";
import { rateLimit } from "@/lib/rate-limit";

/**
 * POST /api/evaluate
 *
 * Implements the 3-step DAG architecture for naming evaluation:
 * Step 1: The Gatekeeper (LLM via generateObject)
 * Step 2: The Scorer (LLM via generateObject - CONDITIONAL)
 * Step 3: The Verdict Engine (TypeScript logic)
 *
 * This route does NOT use one monolithic LLM prompt.
 */

// Step 1: Gatekeeper System Prompt
const GATEKEEPER_PROMPT = `You are the eBay Naming Gatekeeper. Your job is to evaluate a product naming brief against six strict architectural gates. You must return a structured JSON object with gates G0 through G5.

For each gate, provide:
- status: "Pass", "Fail", "Pending", or "Unknown"
- reasoning: A detailed explanation using the CHECK and FINDING format

GATE CRITERIA:

**G0 (Interaction Model): Does the user actively select, toggle, or see this feature, or is it an invisible background process?**
- ✅ Pass: User-visible feature that users actively select, toggle, or see
- ❌ Fail: Invisible background process that users don't directly interact with
- ⚠️ Pending: Need more information about user interaction model
- ❓ Unknown: Brief doesn't provide enough detail to determine

**G1 (Integration Level): Does this initiative have its own enrollment, checkout, or entry point?**
- ✅ Pass: Has its own distinct enrollment, checkout, or entry point
- ❌ Fail: Embedded in existing flows with no separate sign-up or entry
- ⚠️ Pending: Need clarification on enrollment/entry mechanism
- ❓ Unknown: Brief doesn't specify integration approach

**G2 (UX & Service Boundary): Does it operate as a separate system with its own backend, or is it a feature within the existing platform?**
- ✅ Pass: Establishes a distinct user environment/ecosystem (even if sharing backend infrastructure)
- ❌ Fail: Just a feature/button on an existing page, no distinct boundaries
- ⚠️ Pending: Need more details about system architecture
- ❓ Unknown: Insufficient architectural information

**G3 (Strategic Lifespan): Is this built to last as a permanent addition (>12 months), or is it a short-term promo?**
- ✅ Pass: Permanent addition lasting >12 months with multi-year roadmap
- ❌ Fail: Short-term promotion or temporary feature (<12 months)
- ⚠️ Pending: Need timeline clarification
- ❓ Unknown: No lifespan information provided

**G4 (Portfolio Alignment): Would the proposed concept cause user confusion or naming collisions with an existing eBay product?**
- ✅ Pass: No naming collisions or confusion with existing eBay products
- ❌ Fail: Would cause user confusion or conflicts with current portfolio
- ⚠️ Pending: Need portfolio context review
- ❓ Unknown: Related products not identified

**G5 (Legal & Localization Safety): Are there trademark conflicts, regulatory restrictions, or cultural blockers in core markets?**
- ✅ Pass: No trademark/regulatory red flags in target markets
- ❌ Fail: Trademark conflicts, regulatory restrictions, or cultural blockers identified
- ⚠️ Pending: Legal review required
- ❓ Unknown: No legal/localization information provided

CRITICAL: You must use this EXACT format for reasoning:
CHECK: [What specific evidence you examined from the brief - quote directly when possible]
// FINDING: [Your determination based on that evidence and why you reached that conclusion]

Example reasoning:
"CHECK: The brief states sellers can access the capability via a call-to-action and module on the native seller listing page, and can invoke it using voice on their phones.
// FINDING: This indicates direct, user-visible interactions rather than a background process."

If the brief lacks information needed to make a determination, use "Pending" or "Unknown" status and specify exactly what information is needed in the reasoning.`;

// Step 2: Scorer System Prompt
const SCORER_PROMPT = `You are the eBay Naming Scorer. The initiative has passed all six gates and now needs quantitative scoring.

Score each criterion and provide reasoning:

**Standalone (0, 15, or 25 points):**
- 25: Fully independent product with own ecosystem
- 15: Semi-independent with some shared infrastructure
- 0: Deeply integrated feature

**Longevity (0 or 15 points):**
- 15: Multi-year strategic initiative
- 0: Limited lifespan or unclear duration

**Legal (0 or 10 points):**
- 10: Clear path to trademark, no conflicts
- 0: Legal risks or complications

**Global (0 or 10 points):**
- 10: Translates well across all target markets
- 0: Localization challenges

**Clarity (0 or 10 points):**
- 10: Distinct, memorable, aligns with eBay brand
- 0: Generic or confusing

Total possible: 70 points. Threshold for naming: 60 points.`;

export async function POST(req: NextRequest) {
  // Rate limiting: 10 requests per minute
  const rateLimitResult = await rateLimit(req, {
    interval: 60 * 1000, // 1 minute
    maxRequests: 10,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: rateLimitResult.headers
      }
    );
  }

  try {
    const { brief, customPrompt } = await req.json();

    if (!brief || typeof brief !== "string") {
      return NextResponse.json(
        { error: "Brief text is required" },
        { status: 400 }
      );
    }

    // Use custom prompt if provided, otherwise use default
    const gatekeeperPrompt = customPrompt && typeof customPrompt === "string"
      ? customPrompt
      : GATEKEEPER_PROMPT;

    // 🔍 OBSERVABILITY INJECTION POINT #1
    // TODO: Inject LangSmith or Vercel AI SDK tracing here
    // Example: const trace = langsmith.trace({ name: "gatekeeper", input: brief });

    console.log("Step 1: Running Gatekeeper...");

    // Step 1: The Gatekeeper (LLM Call)
    const gatekeeperResult = await chomsky.generateObject({
      schema: GatekeeperSchema,
      messages: [
        {
          role: "system",
          content: gatekeeperPrompt,
        },
        {
          role: "user",
          content: `Evaluate this naming brief:\n\n${brief}`,
        },
      ],
    });

    console.log("Gatekeeper Result:", gatekeeperResult.object);

    // Check if all gates passed
    const allGatesPassed = [
      gatekeeperResult.object.G0,
      gatekeeperResult.object.G1,
      gatekeeperResult.object.G2,
      gatekeeperResult.object.G3,
      gatekeeperResult.object.G4,
      gatekeeperResult.object.G5,
    ].every((gate) => gate.status === "Pass");

    let scorerResult;
    let totalScore;

    // Step 2: The Scorer (CONDITIONAL - only if all gates passed)
    if (allGatesPassed) {
      // 🔍 OBSERVABILITY INJECTION POINT #2
      // TODO: Inject LangSmith or Vercel AI SDK tracing here

      console.log("Step 2: Running Scorer...");

      const scorerResponse = await chomsky.generateObject({
        schema: ScorerSchema,
        messages: [
          {
            role: "system",
            content: SCORER_PROMPT,
          },
          {
            role: "user",
            content: `Score this naming brief that passed all gates:\n\n${brief}`,
          },
        ],
      });

      scorerResult = scorerResponse.object;
      totalScore =
        scorerResult.standalone +
        scorerResult.longevity +
        scorerResult.legal +
        scorerResult.global +
        scorerResult.clarity;

      console.log("Scorer Result:", scorerResult, "Total Score:", totalScore);
    }

    // Step 3: The Verdict Engine (TypeScript Logic)
    console.log("Step 3: Calculating Verdict...");
    const verdict = calculateVerdict(gatekeeperResult.object, scorerResult);

    console.log("Final Verdict:", verdict);

    const result: EvaluationResult = {
      verdict,
      gatekeeperResult: gatekeeperResult.object,
      scorerResult,
      totalScore,
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error("Evaluation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Evaluation failed";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
