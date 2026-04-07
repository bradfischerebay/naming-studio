/**
 * Example: Naming Agent v2
 * Run with: npx tsx example.ts
 */

import { orchestrator } from './lib/orchestrator';
import { evaluateGates } from './lib/modules/evaluator';
import { calculateScore } from './lib/modules/scorer';
import { calculateVerdict } from './lib/modules/verdict';
import type { NamingFacts } from './lib/models/facts';

// Example 1: Direct module testing (no LLM needed)
console.log('='.repeat(80));
console.log('Example 1: Testing Deterministic Modules (No LLM)');
console.log('='.repeat(80));

const mockFacts: NamingFacts = {
  facts: {
    vertical_services: ['Authentication', 'Vault Storage'],
    enrollment_policies: 'separate',
    checkout_flow: 'distinct',
    markets: ['US', 'UK', 'DE'],
    longevity_months: 24,
  },
  score_tags: ['global_big3', 'clarity_lift'],
  evidence_anchors: [
    'Brief mentions separate sign-up process',
    'Product described as permanent feature',
    'Target markets include US, UK, and DE',
  ],
  answered_gates: {
    G0: false,
    G1: false,
    G2: false,
    G3: false,
    G4: false,
    G5: false,
  },
};

console.log('\n📊 Input Facts:');
console.log(JSON.stringify(mockFacts, null, 2));

// Evaluate gates
const gates = evaluateGates(mockFacts);
console.log('\n🚪 Gate Evaluation:');
Object.entries(gates.gate_results).forEach(([key, gate]) => {
  const icon = gate.status === 'Pass' ? '✅' : gate.status === 'Fail' ? '❌' : '⚠️';
  console.log(`  ${icon} ${key} (${gate.label}): ${gate.status}`);
  console.log(`     ${gate.reasoning}`);
});

// Calculate score
const score = calculateScore(mockFacts);
console.log('\n💯 Scoring:');
console.log(`  Total Score: ${score.scores.total}/70`);
console.log('\n  Breakdown:');
console.log(`    Standalone: ${score.scores.breakdown.standalone} points`);
console.log(`    Longevity: ${score.scores.breakdown.longevity} points`);
console.log(`    Legal: ${score.scores.breakdown.legal} points`);
console.log(`    Global: ${score.scores.breakdown.global} points`);
console.log(`    Clarity: ${score.scores.breakdown.clarity} points`);
console.log(`    Portfolio Risk: ${score.scores.breakdown.portfolio_risk} points`);
console.log(`    Trademark Risk: ${score.scores.breakdown.trademark_risk} points`);

// Calculate verdict
const verdict = calculateVerdict(gates, score);
console.log('\n🎯 Verdict:');
console.log(`  ${verdict.title}`);
console.log('\n  Summary:');
verdict.summary.forEach(bullet => console.log(`  • ${bullet}`));

// Example 2: Full evaluation with LLM (requires eBay VPN)
console.log('\n' + '='.repeat(80));
console.log('Example 2: Full Evaluation with LLM');
console.log('='.repeat(80));

const exampleBrief = `
Offering Description: eBay is introducing a managed shipping service that handles all logistics for sellers. The service includes warehouse storage, packaging, and delivery coordination.

Value Proposition: Sellers can focus on sourcing products while eBay handles all shipping logistics.

Target Customer(s): High-volume sellers with >100 orders per month

Target Geographies: US, UK, DE

Customer Research and Competitive Insights: Amazon FBA, Shopify Fulfillment, and similar services exist in the market.

Timing: Launch Q2 2026, this will be a permanent service offering

Naming Request: Should we create a proper name for this managed shipping service?

Initial Name Ideas: ShipEasy, eBay Logistics, Managed Fulfillment
`;

async function runFullExample() {
  try {
    console.log('\n📝 Brief Input:');
    console.log(exampleBrief.trim());

    console.log('\n⏳ Evaluating...');

    const result = await orchestrator.evaluate({
      brief: exampleBrief,
      config: {
        skipWebResearch: true, // Skip web research for faster testing
        maxRetries: 1,
      },
      onProgress: (phase, message) => {
        console.log(`  [${phase}] ${message}`);
      },
    });

    console.log('\n✅ Evaluation Complete!');
    console.log('\n' + '='.repeat(80));
    console.log(result.markdown);
    console.log('='.repeat(80));

    if (result.requiresClarification) {
      console.log('\n❓ Questions for Clarification:');
      result.questions?.forEach((q, i) => {
        console.log(`\n${i + 1}. ${q}`);
      });
    }

  } catch (error) {
    console.error('\n❌ Error:', error instanceof Error ? error.message : error);
    console.log('\nNote: Full evaluation requires eBay VPN access for Chomsky LLM gateway.');
    console.log('To test without VPN, use Example 1 (deterministic modules only).');
  }
}

// Run full example if environment is configured
if (process.env.CHOMSKY_ENDPOINT) {
  runFullExample();
} else {
  console.log('\n⚠️  CHOMSKY_ENDPOINT not configured.');
  console.log('Skipping full LLM evaluation example.');
  console.log('\nTo run full example:');
  console.log('  1. Copy .env.example to .env');
  console.log('  2. Connect to eBay VPN');
  console.log('  3. Run: npx tsx example.ts');
}

console.log('\n' + '='.repeat(80));
console.log('✨ Example Complete!');
console.log('='.repeat(80));
console.log('\nNext steps:');
console.log('  • Run tests: npm test');
console.log('  • Start server: npm run dev');
console.log('  • Read docs: cat AGENT_README.md');
console.log('  • Try API: curl http://localhost:3000/api/evaluate-v2');
console.log('');
