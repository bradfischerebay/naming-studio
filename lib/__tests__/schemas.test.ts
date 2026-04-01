import { describe, it, expect } from 'vitest'
import { GatekeeperSchema, ScorerSchema, GateStatus } from '../schemas'

describe('Zod Schemas', () => {
  describe('GateStatus', () => {
    it('should validate all valid statuses', () => {
      expect(GateStatus.parse('Pass')).toBe('Pass')
      expect(GateStatus.parse('Fail')).toBe('Fail')
      expect(GateStatus.parse('Pending')).toBe('Pending')
      expect(GateStatus.parse('Unknown')).toBe('Unknown')
    })

    it('should reject invalid status', () => {
      expect(() => GateStatus.parse('Invalid')).toThrow()
      expect(() => GateStatus.parse('Maybe')).toThrow()
    })
  })

  describe('GatekeeperSchema', () => {
    const validGatekeeperResult = {
      G0: { status: 'Pass', reasoning: 'User-visible feature' },
      G1: { status: 'Pass', reasoning: 'Has own entry point' },
      G2: { status: 'Pass', reasoning: 'Distinct UX boundary' },
      G3: { status: 'Pass', reasoning: 'Permanent feature' },
      G4: { status: 'Pass', reasoning: 'No conflicts' },
      G5: { status: 'Pass', reasoning: 'Legally clear' },
    }

    it('should validate correct gatekeeper result', () => {
      const result = GatekeeperSchema.parse(validGatekeeperResult)
      expect(result.G0.status).toBe('Pass')
      expect(result.G5.status).toBe('Pass')
    })

    it('should require all gates G0-G5', () => {
      const missingG3 = { ...validGatekeeperResult }
      delete (missingG3 as any).G3
      expect(() => GatekeeperSchema.parse(missingG3)).toThrow()
    })

    it('should require status and reasoning for each gate', () => {
      const missingReasoning = {
        ...validGatekeeperResult,
        G0: { status: 'Pass' }, // Missing reasoning
      }
      expect(() => GatekeeperSchema.parse(missingReasoning)).toThrow()
    })

    it('should accept all valid status values', () => {
      const statuses = ['Pass', 'Fail', 'Pending', 'Unknown'] as const
      statuses.forEach((status) => {
        const result = GatekeeperSchema.parse({
          ...validGatekeeperResult,
          G0: { status, reasoning: 'Test' },
        })
        expect(result.G0.status).toBe(status)
      })
    })

    it('should reject invalid status', () => {
      const invalidStatus = {
        ...validGatekeeperResult,
        G0: { status: 'Maybe', reasoning: 'Test' },
      }
      expect(() => GatekeeperSchema.parse(invalidStatus)).toThrow()
    })
  })

  describe('ScorerSchema', () => {
    const validScorerResult = {
      standalone: 25,
      longevity: 15,
      legal: 10,
      global: 10,
      clarity: 10,
      reasoning: 'Comprehensive scoring explanation',
    }

    it('should validate correct scorer result', () => {
      const result = ScorerSchema.parse(validScorerResult)
      expect(result.standalone).toBe(25)
      expect(result.reasoning).toBe('Comprehensive scoring explanation')
    })

    it('should require all scoring fields', () => {
      const missingClarity = { ...validScorerResult }
      delete (missingClarity as any).clarity
      expect(() => ScorerSchema.parse(missingClarity)).toThrow()
    })

    it('should accept numeric scores', () => {
      // Schema accepts any number (LLM guidance in descriptions)
      const result = ScorerSchema.parse({
        standalone: 20,
        longevity: 10,
        legal: 8,
        global: 7,
        clarity: 9,
        reasoning: 'Test',
      })
      expect(result.standalone).toBe(20)
    })

    it('should require reasoning string', () => {
      const missingReasoning = { ...validScorerResult }
      delete (missingReasoning as any).reasoning
      expect(() => ScorerSchema.parse(missingReasoning)).toThrow()
    })

    it('should allow calculating total score', () => {
      const result = ScorerSchema.parse(validScorerResult)
      const total = result.standalone + result.longevity + result.legal + result.global + result.clarity
      expect(total).toBe(70)
    })
  })
})
