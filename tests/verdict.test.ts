/**
 * Verdict Tests
 * Unit tests for deterministic verdict routing logic
 */

import { describe, it, expect } from 'vitest';
import { calculateVerdict } from '../lib/modules/verdict';
import { VerdictPath } from '../lib/models/verdict';
import type { GateEvaluation } from '../lib/models/gates';
import type { ScoringResult } from '../lib/models/scoring';

describe('Verdict Decision Logic', () => {
  describe('Priority 1: Legal/Localization Blocker', () => {
    it('should return PATH_A1 when G5 fails', () => {
      const gates: GateEvaluation = {
        gate_results: {
          G0: { label: 'G0', status: 'Pass', reasoning: '' },
          G1: { label: 'G1', status: 'Pass', reasoning: '' },
          G2: { label: 'G2', status: 'Pass', reasoning: '' },
          G3: { label: 'G3', status: 'Pass', reasoning: '' },
          G4: { label: 'G4', status: 'Pass', reasoning: '' },
          G5: { label: 'G5', status: 'Fail', reasoning: 'Legal blocker' },
        },
        any_failures: true,
        missing_info: false,
      };

      const verdict = calculateVerdict(gates);
      expect(verdict.path).toBe(VerdictPath.PATH_A1);
      expect(verdict.title).toContain('No Proper Name Needed');
    });
  });

  describe('Priority 2: No Name (Ghost Protocol)', () => {
    it('should return PATH_A0 when G0 fails', () => {
      const gates: GateEvaluation = {
        gate_results: {
          G0: { label: 'G0', status: 'Fail', reasoning: 'Background process' },
          G1: { label: 'G1', status: 'Pass', reasoning: '' },
          G2: { label: 'G2', status: 'Pass', reasoning: '' },
          G3: { label: 'G3', status: 'Pass', reasoning: '' },
          G4: { label: 'G4', status: 'Pass', reasoning: '' },
          G5: { label: 'G5', status: 'Pass', reasoning: '' },
        },
        any_failures: true,
        missing_info: false,
      };

      const verdict = calculateVerdict(gates);
      expect(verdict.path).toBe(VerdictPath.PATH_A0);
      expect(verdict.title).toContain('Do Not Name');
    });
  });

  describe('Priority 3: Gate Failures', () => {
    it('should return PATH_A1 when G1 fails', () => {
      const gates: GateEvaluation = {
        gate_results: {
          G0: { label: 'G0', status: 'Pass', reasoning: '' },
          G1: { label: 'G1', status: 'Fail', reasoning: 'Integrated feature' },
          G2: { label: 'G2', status: 'Pass', reasoning: '' },
          G3: { label: 'G3', status: 'Pass', reasoning: '' },
          G4: { label: 'G4', status: 'Pass', reasoning: '' },
          G5: { label: 'G5', status: 'Pass', reasoning: '' },
        },
        any_failures: true,
        missing_info: false,
      };

      const verdict = calculateVerdict(gates);
      expect(verdict.path).toBe(VerdictPath.PATH_A1);
    });
  });

  describe('Priority 4: Missing Information', () => {
    it('should return PATH_B when gates are unknown', () => {
      const gates: GateEvaluation = {
        gate_results: {
          G0: { label: 'G0', status: 'Pass', reasoning: '' },
          G1: { label: 'G1', status: 'Unknown', reasoning: 'No enrollment data' },
          G2: { label: 'G2', status: 'Pass', reasoning: '' },
          G3: { label: 'G3', status: 'Pass', reasoning: '' },
          G4: { label: 'G4', status: 'Pass', reasoning: '' },
          G5: { label: 'G5', status: 'Pass', reasoning: '' },
        },
        any_failures: false,
        missing_info: true,
      };

      const verdict = calculateVerdict(gates);
      expect(verdict.path).toBe(VerdictPath.PATH_B);
      expect(verdict.title).toContain('Need More Information');
    });
  });

  describe('Priority 5: Score Failure', () => {
    it('should return PATH_A2 when score < 60', () => {
      const gates: GateEvaluation = {
        gate_results: {
          G0: { label: 'G0', status: 'Pass', reasoning: '' },
          G1: { label: 'G1', status: 'Pass', reasoning: '' },
          G2: { label: 'G2', status: 'Pass', reasoning: '' },
          G3: { label: 'G3', status: 'Pass', reasoning: '' },
          G4: { label: 'G4', status: 'Pass', reasoning: '' },
          G5: { label: 'G5', status: 'Pass', reasoning: '' },
        },
        any_failures: false,
        missing_info: false,
      };

      const score: ScoringResult = {
        math_scratchpad: [],
        scores: {
          total: 45,
          breakdown: {
            standalone: 25,
            longevity: 15,
            legal: 0,
            global: 0,
            clarity: 5,
            portfolio_risk: 0,
            trademark_risk: 0,
          },
        },
        markdown_table: '',
      };

      const verdict = calculateVerdict(gates, score);
      expect(verdict.path).toBe(VerdictPath.PATH_A2);
      expect(verdict.title).toContain('Score: 45/70');
    });
  });

  describe('Priority 6: Pass', () => {
    it('should return PATH_C when all gates pass and score >= 60', () => {
      const gates: GateEvaluation = {
        gate_results: {
          G0: { label: 'G0', status: 'Pass', reasoning: '' },
          G1: { label: 'G1', status: 'Pass', reasoning: '' },
          G2: { label: 'G2', status: 'Pass', reasoning: '' },
          G3: { label: 'G3', status: 'Pass', reasoning: '' },
          G4: { label: 'G4', status: 'Pass', reasoning: '' },
          G5: { label: 'G5', status: 'Pass', reasoning: '' },
        },
        any_failures: false,
        missing_info: false,
      };

      const score: ScoringResult = {
        math_scratchpad: [],
        scores: {
          total: 65,
          breakdown: {
            standalone: 25,
            longevity: 15,
            legal: 10,
            global: 10,
            clarity: 5,
            portfolio_risk: 0,
            trademark_risk: 0,
          },
        },
        markdown_table: '',
      };

      const verdict = calculateVerdict(gates, score);
      expect(verdict.path).toBe(VerdictPath.PATH_C);
      expect(verdict.title).toContain('Proceed With Naming');
      expect(verdict.title).toContain('Score: 65/70');
    });
  });

  describe('Error handling', () => {
    it('should throw when all gates pass but no scoring result is provided', () => {
      const gates: GateEvaluation = {
        gate_results: {
          G0: { label: 'G0', status: 'Pass', reasoning: '' },
          G1: { label: 'G1', status: 'Pass', reasoning: '' },
          G2: { label: 'G2', status: 'Pass', reasoning: '' },
          G3: { label: 'G3', status: 'Pass', reasoning: '' },
          G4: { label: 'G4', status: 'Pass', reasoning: '' },
          G5: { label: 'G5', status: 'Pass', reasoning: '' },
        },
        any_failures: false,
        missing_info: false,
      };

      expect(() => calculateVerdict(gates)).toThrow('Scorer result required when all gates pass');
    });
  });

  describe('Priority override: G5 takes precedence over G0', () => {
    it('should return PATH_A1 (not PATH_A0) when both G5 and G0 fail', () => {
      const gates: GateEvaluation = {
        gate_results: {
          G0: { label: 'G0', status: 'Fail', reasoning: 'Background process' },
          G1: { label: 'G1', status: 'Pass', reasoning: '' },
          G2: { label: 'G2', status: 'Pass', reasoning: '' },
          G3: { label: 'G3', status: 'Pass', reasoning: '' },
          G4: { label: 'G4', status: 'Pass', reasoning: '' },
          G5: { label: 'G5', status: 'Fail', reasoning: 'Legal blocker' },
        },
        any_failures: true,
        missing_info: false,
      };

      const verdict = calculateVerdict(gates);
      expect(verdict.path).toBe(VerdictPath.PATH_A1);
    });
  });

  describe('Verdict output structure', () => {
    it('should include summary bullets', () => {
      const gates: GateEvaluation = {
        gate_results: {
          G0: { label: 'G0', status: 'Pass', reasoning: '' },
          G1: { label: 'G1', status: 'Pass', reasoning: '' },
          G2: { label: 'G2', status: 'Pass', reasoning: '' },
          G3: { label: 'G3', status: 'Pass', reasoning: '' },
          G4: { label: 'G4', status: 'Pass', reasoning: '' },
          G5: { label: 'G5', status: 'Pass', reasoning: '' },
        },
        any_failures: false,
        missing_info: false,
      };

      const score: ScoringResult = {
        math_scratchpad: [],
        scores: {
          total: 65,
          breakdown: {
            standalone: 25,
            longevity: 15,
            legal: 10,
            global: 10,
            clarity: 5,
            portfolio_risk: 0,
            trademark_risk: 0,
          },
        },
        markdown_table: '',
      };

      const verdict = calculateVerdict(gates, score);
      expect(verdict.summary.length).toBeGreaterThan(0);
      expect(verdict.summary.join(' ')).toContain('qualifies for a proper name');
    });

    it('should include audit table', () => {
      const gates: GateEvaluation = {
        gate_results: {
          G0: { label: 'G0', status: 'Pass', reasoning: 'User interaction' },
          G1: { label: 'G1', status: 'Pass', reasoning: '' },
          G2: { label: 'G2', status: 'Pass', reasoning: '' },
          G3: { label: 'G3', status: 'Pass', reasoning: '' },
          G4: { label: 'G4', status: 'Pass', reasoning: '' },
          G5: { label: 'G5', status: 'Pass', reasoning: '' },
        },
        any_failures: false,
        missing_info: false,
      };

      const score: ScoringResult = {
        math_scratchpad: [],
        scores: {
          total: 60,
          breakdown: {
            standalone: 25,
            longevity: 15,
            legal: 10,
            global: 10,
            clarity: 0,
            portfolio_risk: 0,
            trademark_risk: 0,
          },
        },
        markdown_table: '',
      };

      const verdict = calculateVerdict(gates, score);
      expect(verdict.audit_table).toContain('G0');
      expect(verdict.audit_table).toContain('✅ Pass');
    });
  });
});
