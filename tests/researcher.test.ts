/**
 * Researcher Tests
 * Unit tests for landscape research and portfolio risk exception
 */

import { describe, it, expect } from 'vitest';
import { isReplacementScenario } from '../lib/modules/researcher';
import type { CompiledBrief } from '../lib/models/brief';

describe('Researcher', () => {
  describe('isReplacementScenario', () => {
    it('should detect "replacing" keyword', () => {
      const brief: CompiledBrief = {
        offering_description: 'This new service is replacing our old shipping tool',
        value_proposition: 'Better performance',
      } as CompiledBrief;

      expect(isReplacementScenario(brief)).toBe(true);
    });

    it('should detect "migrating" keyword', () => {
      const brief: CompiledBrief = {
        value_proposition: 'We are migrating from the legacy system',
        offering_description: 'New payment system',
      } as CompiledBrief;

      expect(isReplacementScenario(brief)).toBe(true);
    });

    it('should detect "sunsetting" keyword', () => {
      const brief: CompiledBrief = {
        offering_description: 'Modern tool, sunsetting the old version',
      } as CompiledBrief;

      expect(isReplacementScenario(brief)).toBe(true);
    });

    it('should detect "next generation" keyword', () => {
      const brief: CompiledBrief = {
        offering_description: 'The next generation of our checkout flow',
        benefits: 'Improved UX',
      } as CompiledBrief;

      expect(isReplacementScenario(brief)).toBe(true);
    });

    it('should detect "next-generation" (hyphenated) keyword', () => {
      const brief: CompiledBrief = {
        offering_description: 'A next-generation platform for sellers',
      } as CompiledBrief;

      expect(isReplacementScenario(brief)).toBe(true);
    });

    it('should detect "migration from" phrase', () => {
      const brief: CompiledBrief = {
        naming_request: 'Need a name for our migration from the old API',
      } as CompiledBrief;

      expect(isReplacementScenario(brief)).toBe(true);
    });

    it('should detect "replaces" keyword', () => {
      const brief: CompiledBrief = {
        value_proposition: 'This replaces the old dashboard',
      } as CompiledBrief;

      expect(isReplacementScenario(brief)).toBe(true);
    });

    it('should detect "sunset" keyword', () => {
      const brief: CompiledBrief = {
        offering_description: 'New tool to sunset the legacy app',
      } as CompiledBrief;

      expect(isReplacementScenario(brief)).toBe(true);
    });

    it('should return false when no replacement keywords present', () => {
      const brief: CompiledBrief = {
        offering_description: 'A new shipping service for sellers',
        value_proposition: 'Faster delivery times',
        benefits: 'Save time and money',
      } as CompiledBrief;

      expect(isReplacementScenario(brief)).toBe(false);
    });

    it('should be case-insensitive', () => {
      const brief: CompiledBrief = {
        offering_description: 'This service is REPLACING our old tool',
      } as CompiledBrief;

      expect(isReplacementScenario(brief)).toBe(true);
    });

    it('should check multiple fields in the brief', () => {
      const brief: CompiledBrief = {
        offering_description: 'New payment system',
        value_proposition: 'Better UX',
        benefits: 'Faster checkout',
        naming_request: 'We are sunsetting the old checkout',
      } as CompiledBrief;

      expect(isReplacementScenario(brief)).toBe(true);
    });

    it('should handle undefined fields gracefully', () => {
      const brief: CompiledBrief = {
        offering_description: 'New service',
      } as CompiledBrief;

      expect(isReplacementScenario(brief)).toBe(false);
    });
  });
});
