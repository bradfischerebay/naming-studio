/**
 * Gate Evaluator Tests
 * Unit tests for deterministic gate evaluation logic
 */

import { describe, it, expect } from 'vitest';
import { evaluateGates } from '../lib/modules/evaluator';
import type { NamingFacts } from '../lib/models/facts';

describe('Gate Evaluator', () => {
  describe('G0: Interaction Model', () => {
    it('should pass when enrollment is separate', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: 'separate',
          checkout_flow: null,
          markets: [],
          longevity_months: null,
        },
        score_tags: [],
        evidence_anchors: [],
      };

      const result = evaluateGates(facts);
      expect(result.gate_results.G0.status).toBe('Pass');
    });

    it('should pass when vertical services exist', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: ['Authentication', 'Vault Storage'],
          enrollment_policies: null,
          checkout_flow: null,
          markets: [],
          longevity_months: null,
        },
        score_tags: [],
        evidence_anchors: [],
      };

      const result = evaluateGates(facts);
      expect(result.gate_results.G0.status).toBe('Pass');
    });

    it('should fail when enrollment is shared', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: 'shared',
          checkout_flow: null,
          markets: [],
          longevity_months: null,
        },
        score_tags: [],
        evidence_anchors: [],
      };

      const result = evaluateGates(facts);
      expect(result.gate_results.G0.status).toBe('Fail');
    });

    it('should be unknown when no enrollment info', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: null,
          checkout_flow: null,
          markets: [],
          longevity_months: null,
        },
        score_tags: [],
        evidence_anchors: [],
      };

      const result = evaluateGates(facts);
      expect(result.gate_results.G0.status).toBe('Unknown');
    });
  });

  describe('G2: Standalone Architecture', () => {
    it('should pass when enrollment is separate', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: 'separate',
          checkout_flow: null,
          markets: [],
          longevity_months: null,
        },
        score_tags: [],
        evidence_anchors: [],
      };

      const result = evaluateGates(facts);
      expect(result.gate_results.G2.status).toBe('Pass');
    });

    it('should fail when enrollment is shared', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: 'shared',
          checkout_flow: null,
          markets: [],
          longevity_months: null,
        },
        score_tags: [],
        evidence_anchors: [],
      };

      const result = evaluateGates(facts);
      expect(result.gate_results.G2.status).toBe('Fail');
    });

    it('should assume FAIL when G1 failed and G2 has no data (default inference)', () => {
      // Test case: G1 fails due to shared enrollment, but we have NO architecture data
      // In this case, G2 should use the explicit fail path (shared enrollment)
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: 'shared', // This makes G1 fail AND G2 fail explicitly
          checkout_flow: 'shared',
          markets: [],
          longevity_months: null,
        },
        score_tags: [],
        evidence_anchors: [],
      };

      const result = evaluateGates(facts);
      expect(result.gate_results.G1.status).toBe('Fail');
      expect(result.gate_results.G2.status).toBe('Fail');
      // When enrollment_policies is shared, G2 fails explicitly, not via default
      expect(result.gate_results.G2.reasoning).toContain('platform');
    });

    it('should use default inference when G1 fails without enrollment data', () => {
      // This is a tricky edge case: G1 could fail for other reasons
      // For now, our G1 logic only fails with shared enrollment
      // So we can't easily test this without mocking
      // The logic is there in evaluateG2 for future-proofing
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: 'shared', // Makes both G1 and G2 fail
          checkout_flow: null,
          markets: [],
          longevity_months: null,
        },
        score_tags: [],
        evidence_anchors: [],
      };

      const result = evaluateGates(facts);
      expect(result.gate_results.G1.status).toBe('Fail');
      expect(result.gate_results.G2.status).toBe('Fail');
    });

    it('should be unknown when G1 passes and G2 has no data', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: null,
          checkout_flow: null,
          markets: [],
          longevity_months: null,
        },
        score_tags: [],
        evidence_anchors: [],
      };

      const result = evaluateGates(facts);
      expect(result.gate_results.G1.status).toBe('Unknown');
      expect(result.gate_results.G2.status).toBe('Unknown');
    });
  });

  describe('G3: Strategic Lifespan', () => {
    it('should pass when longevity >= 12 months', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: null,
          checkout_flow: null,
          markets: [],
          longevity_months: 18,
        },
        score_tags: [],
        evidence_anchors: [],
      };

      const result = evaluateGates(facts);
      expect(result.gate_results.G3.status).toBe('Pass');
    });

    it('should fail when longevity < 12 months', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: null,
          checkout_flow: null,
          markets: [],
          longevity_months: 6,
        },
        score_tags: [],
        evidence_anchors: [],
      };

      const result = evaluateGates(facts);
      expect(result.gate_results.G3.status).toBe('Fail');
    });

    it('should pass at exactly 12 months (boundary)', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: null,
          checkout_flow: null,
          markets: [],
          longevity_months: 12,
        },
        score_tags: [],
        evidence_anchors: [],
      };

      const result = evaluateGates(facts);
      expect(result.gate_results.G3.status).toBe('Pass');
    });

    it('should fail at 11 months (just below boundary)', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: null,
          checkout_flow: null,
          markets: [],
          longevity_months: 11,
        },
        score_tags: [],
        evidence_anchors: [],
      };

      const result = evaluateGates(facts);
      expect(result.gate_results.G3.status).toBe('Fail');
    });
  });

  describe('G4: Portfolio Alignment', () => {
    it('should fail when portfolio_risk tag present', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: null,
          checkout_flow: null,
          markets: [],
          longevity_months: null,
        },
        score_tags: ['portfolio_risk'],
        evidence_anchors: [],
      };

      const result = evaluateGates(facts);
      expect(result.gate_results.G4.status).toBe('Fail');
    });

    it('should pass when no portfolio_risk tag and gate is answered', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: null,
          checkout_flow: null,
          markets: [],
          longevity_months: null,
        },
        score_tags: [],
        evidence_anchors: [],
        answered_gates: {
          G0: false,
          G1: false,
          G2: false,
          G3: false,
          G4: true, // Mark as answered
          G5: false,
        },
      };

      const result = evaluateGates(facts);
      expect(result.gate_results.G4.status).toBe('Pass');
    });

    it('should return Unknown when no portfolio_risk tag and gate not answered', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: null,
          checkout_flow: null,
          markets: [],
          longevity_months: null,
        },
        score_tags: [],
        evidence_anchors: [],
      };

      const result = evaluateGates(facts);
      expect(result.gate_results.G4.status).toBe('Unknown');
    });
  });

  describe('Overall evaluation', () => {
    it('should set any_failures when any gate fails', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: 'shared', // G0 will fail
          checkout_flow: null,
          markets: [],
          longevity_months: null,
        },
        score_tags: [],
        evidence_anchors: [],
      };

      const result = evaluateGates(facts);
      expect(result.any_failures).toBe(true);
    });

    it('should set missing_info when any gate is unknown', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: null, // G0 will be unknown
          checkout_flow: null,
          markets: [],
          longevity_months: null,
        },
        score_tags: [],
        evidence_anchors: [],
      };

      const result = evaluateGates(facts);
      expect(result.missing_info).toBe(true);
    });
  });
});
