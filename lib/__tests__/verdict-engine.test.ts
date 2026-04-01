import { describe, it, expect } from 'vitest'
import { calculateVerdict } from '../verdict-engine'
import type { GatekeeperResult, ScorerResult } from '../schemas'

describe('Verdict Engine', () => {
  const createGatekeeperResult = (overrides?: Partial<GatekeeperResult>): GatekeeperResult => ({
    G0: { status: 'Pass', reasoning: 'Test' },
    G1: { status: 'Pass', reasoning: 'Test' },
    G2: { status: 'Pass', reasoning: 'Test' },
    G3: { status: 'Pass', reasoning: 'Test' },
    G4: { status: 'Pass', reasoning: 'Test' },
    G5: { status: 'Pass', reasoning: 'Test' },
    ...overrides,
  })

  const createScorerResult = (overrides?: Partial<ScorerResult>): ScorerResult => ({
    standalone: 25,
    longevity: 15,
    legal: 10,
    global: 10,
    clarity: 10,
    reasoning: 'Test scoring',
    ...overrides,
  })

  describe('G0 Fail - Do Not Name', () => {
    it('should return "Do Not Name" message when G0 fails', () => {
      const gatekeeper = createGatekeeperResult({
        G0: { status: 'Fail', reasoning: 'Not user-visible' },
      })
      const verdict = calculateVerdict(gatekeeper)
      expect(verdict).toContain('Do Not Name')
      expect(verdict).toContain('Inline Action Copy')
    })

    it('should return "Do Not Name" even if other gates pass', () => {
      const gatekeeper = createGatekeeperResult({
        G0: { status: 'Fail', reasoning: 'Not user-visible' },
      })
      const scorer = createScorerResult()
      const verdict = calculateVerdict(gatekeeper, scorer)
      expect(verdict).toContain('Do Not Name')
    })
  })

  describe('Any Pending/Unknown - Need More Info', () => {
    it('should return "Need More Info" message when any gate is Pending', () => {
      const gatekeeper = createGatekeeperResult({
        G1: { status: 'Pending', reasoning: 'Need clarification' },
      })
      const verdict = calculateVerdict(gatekeeper)
      expect(verdict).toContain('Need More Information')
    })

    it('should return "Need More Info" message when any gate is Unknown', () => {
      const gatekeeper = createGatekeeperResult({
        G4: { status: 'Unknown', reasoning: 'Insufficient data' },
      })
      const verdict = calculateVerdict(gatekeeper)
      expect(verdict).toContain('Need More Information')
    })

    it('should prioritize G0 Fail over Pending/Unknown', () => {
      const gatekeeper = createGatekeeperResult({
        G0: { status: 'Fail', reasoning: 'Not user-visible' },
        G1: { status: 'Pending', reasoning: 'Need clarification' },
      })
      const verdict = calculateVerdict(gatekeeper)
      expect(verdict).toContain('Do Not Name')
    })
  })

  describe('G1-G5 Fail - No Proper Name', () => {
    it('should return "No Proper Name" message when G1 fails', () => {
      const gatekeeper = createGatekeeperResult({
        G1: { status: 'Fail', reasoning: 'Embedded feature' },
      })
      const verdict = calculateVerdict(gatekeeper)
      expect(verdict).toContain('No Proper Name Needed')
      expect(verdict).toContain('Descriptive Label')
    })

    it('should return "No Proper Name" message when any of G2-G5 fails', () => {
      const gates = ['G2', 'G3', 'G4', 'G5'] as const
      gates.forEach((gate) => {
        const gatekeeper = createGatekeeperResult({
          [gate]: { status: 'Fail', reasoning: 'Test failure' },
        })
        const verdict = calculateVerdict(gatekeeper)
        expect(verdict).toContain('No Proper Name Needed')
      })
    })
  })

  describe('Score-based verdicts', () => {
    it('should return "No Proper Name" when score < 60', () => {
      const gatekeeper = createGatekeeperResult()
      const scorer = createScorerResult({
        standalone: 15,
        longevity: 15,
        legal: 10,
        global: 10,
        clarity: 5,
      }) // Total: 55
      const verdict = calculateVerdict(gatekeeper, scorer)
      expect(verdict).toContain('No Proper Name Needed')
      expect(verdict).toContain('55/70')
    })

    it('should return "Proceed with Naming" when score >= 60', () => {
      const gatekeeper = createGatekeeperResult()
      const scorer = createScorerResult() // Total: 70
      const verdict = calculateVerdict(gatekeeper, scorer)
      expect(verdict).toContain('Proceed With Naming')
      expect(verdict).toContain('70/70')
    })

    it('should return "Proceed with Naming" when score = 60 exactly', () => {
      const gatekeeper = createGatekeeperResult()
      const scorer = createScorerResult({
        standalone: 25,
        longevity: 15,
        legal: 10,
        global: 10,
        clarity: 0,
      }) // Total: 60
      const verdict = calculateVerdict(gatekeeper, scorer)
      expect(verdict).toContain('Proceed With Naming')
      expect(verdict).toContain('60/70')
    })
  })

  describe('No scorer result', () => {
    it('should throw error when all gates pass but no scorer result', () => {
      const gatekeeper = createGatekeeperResult()
      expect(() => calculateVerdict(gatekeeper)).toThrow('Scorer result required')
    })
  })

  describe('Edge cases', () => {
    it('should handle multiple gate failures correctly', () => {
      const gatekeeper = createGatekeeperResult({
        G1: { status: 'Fail', reasoning: 'Test' },
        G2: { status: 'Fail', reasoning: 'Test' },
        G3: { status: 'Fail', reasoning: 'Test' },
      })
      const verdict = calculateVerdict(gatekeeper)
      expect(verdict).toContain('No Proper Name Needed')
    })

    it('should handle mixed Pending and Unknown states', () => {
      const gatekeeper = createGatekeeperResult({
        G1: { status: 'Pending', reasoning: 'Test' },
        G2: { status: 'Unknown', reasoning: 'Test' },
      })
      const verdict = calculateVerdict(gatekeeper)
      expect(verdict).toContain('Need More Information')
    })
  })
})
