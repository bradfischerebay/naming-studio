/**
 * Test script for Chomsky authentication and CITA brief evaluation
 */

import { chomsky } from "./lib/chomsky";
import { GatekeeperSchema, ScorerSchema } from "./lib/schemas";
import { calculateVerdict } from "./lib/verdict-engine";

const CITA_BRIEF = `Product: Computer Vision-powered Item Taxonomy Assist (CITA)

Description: An AI-powered capability that helps sellers create listings by analyzing photos. Sellers access it via a button on the seller listing page.

Integration: Accessed within the existing eBay app through a button on the listing page. No separate app or sign-up.

Architecture: Integrated into native eBay experience, no separate backend.

Timeline: US first, then UK and DE. Future buyer expansion.

Portfolio: Related to Terapeak, Price Guide beta, Sell the Look.

Legal: N/A`;

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

async function testChomskyAuth() {
  console.log("Testing Chomsky Authentication and CITA Brief Evaluation\n");
  console.log("=" .repeat(80));

  try {
    console.log("\nStep 1: Testing Chomsky Authentication...");
    console.log("-".repeat(80));

    // Test with a simple request first
    const testResult = await chomsky.generateText({
      messages: [
        {
          role: "user",
          content: "Say 'Authentication successful!' if you can read this.",
        },
      ],
    });

    console.log("✅ Authentication test passed!");
    console.log("Response:", testResult);

    console.log("\n" + "=".repeat(80));
    console.log("\nStep 2: Running Gatekeeper Evaluation on CITA Brief...");
    console.log("-".repeat(80));

    const gatekeeperResult = await chomsky.generateObject({
      schema: GatekeeperSchema,
      messages: [
        {
          role: "system",
          content: GATEKEEPER_PROMPT,
        },
        {
          role: "user",
          content: `Evaluate this naming brief:\n\n${CITA_BRIEF}`,
        },
      ],
    });

    console.log("\n✅ Gatekeeper evaluation completed!");
    console.log("\nGate Results:");
    console.log("-------------");

    const gates = ["G0", "G1", "G2", "G3", "G4", "G5"] as const;
    for (const gate of gates) {
      const result = gatekeeperResult.object[gate];
      const emoji = result.status === "Pass" ? "✅" : result.status === "Fail" ? "❌" : result.status === "Pending" ? "⚠️" : "❓";
      console.log(`\n${gate}: ${emoji} ${result.status}`);
      console.log(`Reasoning: ${result.reasoning.substring(0, 200)}...`);
    }

    // Check if all gates passed
    const allGatesPassed = gates.every((gate) => gatekeeperResult.object[gate].status === "Pass");

    console.log("\n" + "=".repeat(80));
    console.log("\nStep 3: Calculating Verdict...");
    console.log("-".repeat(80));

    let scorerResult = undefined;

    if (allGatesPassed) {
      console.log("All gates passed - running scorer...");
      // Note: For CITA, gates should NOT all pass, so this shouldn't execute
    } else {
      console.log("Not all gates passed - skipping scorer");
    }

    const verdict = calculateVerdict(gatekeeperResult.object, scorerResult);

    console.log("\n✅ Final Verdict:", verdict);
    console.log("\nExpected Verdict: ❌ No Proper Name Needed");
    console.log("Verdict Match:", verdict === "❌ No Proper Name Needed" ? "✅ PASS" : "❌ FAIL");

    console.log("\n" + "=".repeat(80));
    console.log("\nTest Summary:");
    console.log("-".repeat(80));
    console.log("✅ Chomsky authentication: WORKING");
    console.log("✅ Gatekeeper evaluation: COMPLETED");
    console.log("✅ Verdict calculation: COMPLETED");
    console.log(`${verdict === "❌ No Proper Name Needed" ? "✅" : "❌"} Verdict matches expected: ${verdict === "❌ No Proper Name Needed" ? "YES" : "NO"}`);

  } catch (error) {
    console.error("\n❌ Test failed with error:");
    console.error(error);
    process.exit(1);
  }
}

testChomskyAuth();
