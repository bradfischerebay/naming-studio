/**
 * Formatter Tests
 * Unit tests for output formatting functions
 */

import { describe, it, expect } from 'vitest';
import { formatAsEscalation } from '../lib/modules/formatter';
import type { CompiledBrief } from '../lib/models/brief';
import type { GateEvaluation } from '../lib/models/gates';

describe('Formatter', () => {
  describe('formatAsEscalation', () => {
    it('should format escalation output with all required sections', () => {
      const mockBrief: CompiledBrief = {
        offering_description: 'A new shipping service for sellers',
        value_proposition: 'Faster delivery times',
        target_customers: 'Professional sellers',
        target_geographies: 'US, UK, DE',
        timing: 'Q2 2026',
      } as CompiledBrief;

      const mockGateEvaluation: GateEvaluation = {
        gate_results: {
          G0: {
            label: 'Interaction Model',
            status: 'Unknown',
            reasoning: 'Insufficient information about user interaction',
            evidence: 'No enrollment data',
          },
          G1: {
            label: 'Integration Level',
            status: 'Unknown',
            reasoning: 'Insufficient information about integration',
            evidence: 'No enrollment or checkout info',
          },
          G2: {
            label: 'Standalone Architecture',
            status: 'Unknown',
            reasoning: 'Insufficient information about architecture',
            evidence: 'No architectural indicators',
          },
          G3: {
            label: 'Strategic Lifespan',
            status: 'Pass',
            reasoning: 'Product has long-term lifespan',
            evidence: 'Q2 2026 launch',
          },
          G4: {
            label: 'Portfolio Alignment',
            status: 'Pass',
            reasoning: 'No conflicts detected',
            evidence: 'No collisions',
          },
          G5: {
            label: 'Legal & Localization',
            status: 'Pass',
            reasoning: 'No legal blockers',
            evidence: 'Clear for markets',
          },
        },
        any_failures: false,
        missing_info: true,
      };

      const result = formatAsEscalation({
        attempt1Status: 'PATH_B',
        attempt2Status: 'PATH_B',
        userClarification: 'This is a separate enrollment flow with its own sign-up page.',
        remainingGaps: [
          'G0: Still missing explicit user interaction details',
          'G1: Enrollment type unclear',
        ],
        brief: mockBrief,
        gateEvaluation: mockGateEvaluation,
        clarificationHistory: 'User confirmed separate enrollment',
      });

      // Check for required sections (updated format)
      expect(result).toContain('⚠️ ESCALATION: Manual Review Needed');
      expect(result).toContain('**What I tried:**');
      expect(result).toContain('**Initial assessment:** PATH_B');
      expect(result).toContain('**After your clarification:** PATH_B');
      expect(result).toContain('**Your clarification:**');
      expect(result).toContain('This is a separate enrollment flow');
      expect(result).toContain('**Why I\'m still stuck:**');
      expect(result).toContain('G0: Still missing explicit user interaction details');
      expect(result).toContain('**What I know so far:**');
      expect(result).toContain('A new shipping service for sellers');
      expect(result).toContain('**Clarifications provided:** User confirmed separate enrollment');
      expect(result).toContain('**Current gate evaluation:**');
      expect(result).toContain('**G0 (Interaction Model):** Unknown');
      expect(result).toContain('**Next steps:**');
      expect(result).toContain('gather the missing information');
    });

    it('should include gate evidence when available', () => {
      const mockBrief: CompiledBrief = {
        offering_description: 'Test offering',
      } as CompiledBrief;

      const mockGateEvaluation: GateEvaluation = {
        gate_results: {
          G0: {
            label: 'Interaction Model',
            status: 'Fail',
            reasoning: 'Embedded feature',
            evidence: 'Shared enrollment detected',
          },
          G1: { label: 'Integration Level', status: 'Pass', reasoning: 'Test' },
          G2: { label: 'Standalone Architecture', status: 'Pass', reasoning: 'Test' },
          G3: { label: 'Strategic Lifespan', status: 'Pass', reasoning: 'Test' },
          G4: { label: 'Portfolio Alignment', status: 'Pass', reasoning: 'Test' },
          G5: { label: 'Legal & Localization', status: 'Pass', reasoning: 'Test' },
        },
        any_failures: true,
        missing_info: false,
      };

      const result = formatAsEscalation({
        attempt1Status: 'PATH_B',
        attempt2Status: 'PATH_A1',
        userClarification: 'It is an embedded feature',
        remainingGaps: [],
        brief: mockBrief,
        gateEvaluation: mockGateEvaluation,
      });

      expect(result).toContain('*Evidence:* Shared enrollment detected');
    });
  });
});
