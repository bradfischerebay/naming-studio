/**
 * Scorer Tests
 * Unit tests for deterministic scoring calculation
 */

import { describe, it, expect } from 'vitest';
import { calculateScore } from '../lib/modules/scorer';
import type { NamingFacts } from '../lib/models/facts';

describe('Scorer', () => {
  describe('Standalone scoring', () => {
    it('should score 25 when enrollment is separate', () => {
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

      const result = calculateScore(facts);
      expect(result.scores.breakdown.standalone).toBe(25);
    });

    it('should score 25 when vertical services present', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: ['Authentication'],
          enrollment_policies: null,
          checkout_flow: null,
          markets: [],
          longevity_months: null,
        },
        score_tags: [],
        evidence_anchors: [],
      };

      const result = calculateScore(facts);
      expect(result.scores.breakdown.standalone).toBe(25);
    });

    it('should score 0 when no standalone indicators', () => {
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

      const result = calculateScore(facts);
      expect(result.scores.breakdown.standalone).toBe(0);
    });
  });

  describe('Longevity scoring', () => {
    it('should score 15 when longevity >= 12 months', () => {
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

      const result = calculateScore(facts);
      expect(result.scores.breakdown.longevity).toBe(15);
    });

    it('should score 0 when longevity < 12 months', () => {
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

      const result = calculateScore(facts);
      expect(result.scores.breakdown.longevity).toBe(0);
    });

    it('should score 15 at exactly 12 months (boundary)', () => {
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

      const result = calculateScore(facts);
      expect(result.scores.breakdown.longevity).toBe(15);
    });

    it('should score 0 at 11 months (just below boundary)', () => {
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

      const result = calculateScore(facts);
      expect(result.scores.breakdown.longevity).toBe(0);
    });
  });

  describe('Tag-based scoring', () => {
    it('should score 10 for formal_legal tag', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: null,
          checkout_flow: null,
          markets: [],
          longevity_months: null,
        },
        score_tags: ['formal_legal'],
        evidence_anchors: [],
      };

      const result = calculateScore(facts);
      expect(result.scores.breakdown.legal).toBe(10);
    });

    it('should score 10 for global_big3 tag', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: null,
          checkout_flow: null,
          markets: [],
          longevity_months: null,
        },
        score_tags: ['global_big3'],
        evidence_anchors: [],
      };

      const result = calculateScore(facts);
      expect(result.scores.breakdown.global).toBe(10);
    });

    it('should score -20 for portfolio_risk tag', () => {
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

      const result = calculateScore(facts);
      expect(result.scores.breakdown.portfolio_risk).toBe(-20);
    });
  });

  describe('Total score calculation', () => {
    it('should calculate correct total for passing product', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: ['Authentication'],
          enrollment_policies: 'separate',
          checkout_flow: 'distinct',
          markets: ['US', 'UK'],
          longevity_months: 24,
        },
        score_tags: ['global_big3', 'clarity_lift'],
        evidence_anchors: [],
      };

      const result = calculateScore(facts);
      // standalone (25) + longevity (15) + global (10) + clarity (10) = 60
      expect(result.scores.total).toBe(60);
    });

    it('should calculate correct total for failing product', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: 'shared',
          checkout_flow: 'shared',
          markets: ['US'],
          longevity_months: 6,
        },
        score_tags: [],
        evidence_anchors: [],
      };

      const result = calculateScore(facts);
      // All 0
      expect(result.scores.total).toBe(0);
    });

    it('should handle negative scores correctly', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: 'separate',
          checkout_flow: null,
          markets: [],
          longevity_months: null,
        },
        score_tags: ['portfolio_risk', 'trademark_risk'],
        evidence_anchors: [],
      };

      const result = calculateScore(facts);
      // standalone (25) + portfolio_risk (-20) + trademark_risk (-20) = -15
      expect(result.scores.total).toBe(-15);
    });
  });

  describe('Math scratchpad', () => {
    it('should generate step-by-step calculation', () => {
      const facts: NamingFacts = {
        facts: {
          vertical_services: [],
          enrollment_policies: 'separate',
          checkout_flow: null,
          markets: [],
          longevity_months: 18,
        },
        score_tags: [],
        evidence_anchors: [],
      };

      const result = calculateScore(facts);
      expect(result.math_scratchpad).toContain('Start: 0');
      expect(result.math_scratchpad).toContain('Step 1 Standalone: Add 25 -> New Total: 25');
      expect(result.math_scratchpad).toContain('Step 2 Longevity: Add 15 -> New Total: 40');
    });
  });
});
