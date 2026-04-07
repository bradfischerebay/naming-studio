/**
 * Memory/Context Management Fix Test
 * Verifies that the system doesn't ask duplicate questions
 */

import { extractFacts, patchFacts } from "../lib/modules/extractor";
import { evaluateGates } from "../lib/modules/evaluator";
import { generateQuestions } from "../lib/modules/questioner";
import type { CompiledBrief } from "../lib/models/brief";
import { isGateAnswered } from "../lib/models/facts";

async function runMemoryTest() {
  console.log("🧪 Testing Memory/Context Management Fixes\n");

  // Test 1: Brief with explicit portfolio and legal info should mark G4/G5 as answered
  console.log("Test 1: Brief with explicit G4/G5 info");
  const briefWithG4G5: CompiledBrief = {
    offering_description: "A new payment protection feature for high-value transactions",
    value_proposition: "Provides additional security for buyers spending over $500",
    target_customers: "Buyers making large purchases",
    target_geographies: "US, UK, DE",
    timing: "Launch Q2 2026",
    brand_considerations: "This is completely new - no conflicts with existing eBay products. Legal has confirmed no trademark issues in target markets.",
  };

  const facts1 = await extractFacts(briefWithG4G5);
  console.log("  Answered gates after extraction:", facts1.answered_gates);
  console.log("  ✓ G4 should be true:", isGateAnswered(facts1, "G4"));
  console.log("  ✓ G5 should be true:", isGateAnswered(facts1, "G5"));

  const gates1 = evaluateGates(facts1);
  console.log("  G4 status:", gates1.gate_results.G4.status);
  console.log("  G5 status:", gates1.gate_results.G5.status);

  const questions1 = await generateQuestions(gates1, facts1);
  console.log("  Questions generated:", questions1.length);
  console.log("  ✓ Should NOT ask about G4 or G5");
  const hasG4Question = questions1.some(q => typeof q === 'string' && q.includes("Portfolio"));
  const hasG5Question = questions1.some(q => typeof q === 'string' && q.includes("Legal"));
  console.log("  Has G4 question:", hasG4Question, "(should be false)");
  console.log("  Has G5 question:", hasG5Question, "(should be false)");

  console.log("\n" + "=".repeat(60) + "\n");

  // Test 2: User answers G4/G5 via clarification - should mark as answered
  console.log("Test 2: User clarification for G4/G5");
  const briefMinimal: CompiledBrief = {
    offering_description: "A new seller dashboard feature",
    target_customers: "Professional sellers",
    timing: "Q3 2026",
  };

  const facts2 = await extractFacts(briefMinimal);
  console.log("  Initial answered gates:", facts2.answered_gates);

  const userClarification = "No conflicts with existing products - this is a new feature. No trademark issues, legal has cleared it.";
  const patchedFacts = await patchFacts(facts2, userClarification);
  console.log("  Answered gates after patch:", patchedFacts.answered_gates);
  console.log("  ✓ G4 should be true:", isGateAnswered(patchedFacts, "G4"));
  console.log("  ✓ G5 should be true:", isGateAnswered(patchedFacts, "G5"));

  const gates2 = evaluateGates(patchedFacts);
  const questions2 = await generateQuestions(gates2, patchedFacts);
  console.log("  Questions after patch:", questions2.length);
  console.log("  ✓ Should NOT re-ask G4 or G5");
  const hasG4Question2 = questions2.some(q => typeof q === 'string' && q.includes("Portfolio"));
  const hasG5Question2 = questions2.some(q => typeof q === 'string' && q.includes("Legal"));
  console.log("  Has G4 question:", hasG4Question2, "(should be false)");
  console.log("  Has G5 question:", hasG5Question2, "(should be false)");

  console.log("\n" + "=".repeat(60) + "\n");

  // Test 3: G4/G5 default to UNKNOWN (not PASS) when not mentioned
  console.log("Test 3: G4/G5 default to UNKNOWN when not mentioned");
  const briefNoG4G5: CompiledBrief = {
    offering_description: "A feature that helps sellers",
    target_customers: "Sellers",
    timing: "Q2 2026",
  };

  const facts3 = await extractFacts(briefNoG4G5);
  const gates3 = evaluateGates(facts3);
  console.log("  G4 status:", gates3.gate_results.G4.status, "(should be Unknown)");
  console.log("  G5 status:", gates3.gate_results.G5.status, "(should be Unknown)");
  console.log("  ✓ G4/G5 should trigger questions");

  const questions3 = await generateQuestions(gates3, facts3);
  console.log("  Questions generated:", questions3.length);
  const hasG4Question3 = questions3.some(q => typeof q === 'string' && q.includes("Portfolio"));
  const hasG5Question3 = questions3.some(q => typeof q === 'string' && q.includes("Legal"));
  console.log("  Has G4 question:", hasG4Question3, "(should be true)");
  console.log("  Has G5 question:", hasG5Question3, "(should be true)");

  console.log("\n✅ Memory/Context Fix Tests Complete\n");
}

// Run the test
runMemoryTest().catch(console.error);
