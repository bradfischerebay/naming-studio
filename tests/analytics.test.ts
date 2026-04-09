/**
 * Analytics Tests
 * Verify analytics tracking and summary generation
 */

import { describe, it, expect, beforeEach } from "vitest";
import { analytics } from "@/lib/analytics";
import { VerdictPath } from "@/lib/models/verdict";
import type { AnalyticsEvent } from "@/lib/analytics";

describe("Analytics Module", () => {
  beforeEach(() => {
    // Analytics is a singleton, so we can't easily reset it
    // These tests verify the interface works correctly
  });

  it("should have isEnabled() method", () => {
    expect(typeof analytics.isEnabled).toBe("function");
    expect(typeof analytics.isEnabled()).toBe("boolean");
  });

  it("should have track() method that accepts events", async () => {
    const event: AnalyticsEvent = {
      timestamp: new Date().toISOString(),
      sessionId: "test-session-123",
      model: "gpt-5-2",
      verdictPath: VerdictPath.PATH_C,
      gateResults: {
        pass: 6,
        fail: 0,
        unknown: 0,
      },
      scoringTotal: 65,
      requiresClarification: false,
      isClarificationRetry: false,
      durationMs: 12000,
      briefLength: 500,
      error: null,
      briefText: "Test brief text",
      briefSummary: null,
      targetGeographies: null,
      targetCustomers: null,
      timing: null,
      gateResultsFull: null,
      verdictTitle: "Proceed With Naming",
      verdictSummary: null,
      scoringBreakdown: null,
      questionCount: 0,
      retryCount: 0,
    };

    // Track should not throw even if Redis is not configured
    await expect(analytics.track(event)).resolves.not.toThrow();
  });

  it("should have getSummary() method that returns analytics", async () => {
    const summary = await analytics.getSummary();

    expect(summary).toBeDefined();
    expect(summary).toHaveProperty("totalEvaluations");
    expect(summary).toHaveProperty("verdictBreakdown");
    expect(summary).toHaveProperty("avgDurationMs");
    expect(summary).toHaveProperty("avgBriefLength");
    expect(summary).toHaveProperty("clarificationRate");
    expect(summary).toHaveProperty("errorRate");
    expect(summary).toHaveProperty("modelBreakdown");
    expect(summary).toHaveProperty("recentEvents");

    expect(typeof summary.totalEvaluations).toBe("number");
    expect(typeof summary.avgDurationMs).toBe("number");
    expect(typeof summary.avgBriefLength).toBe("number");
    expect(typeof summary.clarificationRate).toBe("number");
    expect(typeof summary.errorRate).toBe("number");
    expect(Array.isArray(summary.recentEvents)).toBe(true);
  });

  it("should gracefully handle missing Redis configuration", async () => {
    // Even without Redis, analytics should not crash
    await expect(analytics.getSummary()).resolves.not.toThrow();

    const event: AnalyticsEvent = {
      timestamp: new Date().toISOString(),
      sessionId: "test-session",
      model: "test-model",
      verdictPath: VerdictPath.PATH_A1,
      gateResults: { pass: 0, fail: 3, unknown: 3 },
      scoringTotal: null,
      requiresClarification: false,
      isClarificationRetry: false,
      durationMs: 5000,
      briefLength: 100,
      error: null,
      briefText: "",
      briefSummary: null,
      targetGeographies: null,
      targetCustomers: null,
      timing: null,
      gateResultsFull: null,
      verdictTitle: "No Proper Name",
      verdictSummary: null,
      scoringBreakdown: null,
      questionCount: 0,
      retryCount: 0,
    };

    await expect(analytics.track(event)).resolves.not.toThrow();
  });

  it("should handle error events", async () => {
    const errorEvent: AnalyticsEvent = {
      timestamp: new Date().toISOString(),
      sessionId: "error-session",
      model: "gpt-5-2",
      verdictPath: VerdictPath.PATH_B,
      gateResults: { pass: 0, fail: 0, unknown: 6 },
      scoringTotal: null,
      requiresClarification: false,
      isClarificationRetry: false,
      durationMs: 1000,
      briefLength: 50,
      error: "VPN connection failed",
      briefText: "",
      briefSummary: null,
      targetGeographies: null,
      targetCustomers: null,
      timing: null,
      gateResultsFull: null,
      verdictTitle: "Need More Information",
      verdictSummary: null,
      scoringBreakdown: null,
      questionCount: 0,
      retryCount: 0,
    };

    await expect(analytics.track(errorEvent)).resolves.not.toThrow();
  });

  it("should track clarification retries", async () => {
    const retryEvent: AnalyticsEvent = {
      timestamp: new Date().toISOString(),
      sessionId: "retry-session",
      model: "claude-sonnet-4.6",
      verdictPath: VerdictPath.PATH_C,
      gateResults: { pass: 6, fail: 0, unknown: 0 },
      scoringTotal: 70,
      requiresClarification: false,
      isClarificationRetry: true, // This is a retry
      durationMs: 8000,
      briefLength: 600,
      error: null,
      briefText: "Test brief for retry",
      briefSummary: null,
      targetGeographies: null,
      targetCustomers: null,
      timing: null,
      gateResultsFull: null,
      verdictTitle: "Proceed With Naming",
      verdictSummary: null,
      scoringBreakdown: null,
      questionCount: 0,
      retryCount: 1,
    };

    await expect(analytics.track(retryEvent)).resolves.not.toThrow();
  });

  it("should validate AnalyticsEvent structure", () => {
    const validEvent: AnalyticsEvent = {
      timestamp: "2026-04-03T16:15:00.000Z",
      sessionId: "abc123",
      model: "gpt-5-2",
      verdictPath: VerdictPath.PATH_A2,
      gateResults: { pass: 6, fail: 0, unknown: 0 },
      scoringTotal: 55,
      requiresClarification: false,
      isClarificationRetry: false,
      durationMs: 10000,
      briefLength: 450,
      error: null,
      briefText: "Validation test brief",
      briefSummary: null,
      targetGeographies: null,
      targetCustomers: null,
      timing: null,
      gateResultsFull: null,
      verdictTitle: "No Proper Name - Low Score",
      verdictSummary: null,
      scoringBreakdown: null,
      questionCount: 0,
      retryCount: 0,
    };

    // Verify all required fields are present
    expect(validEvent).toHaveProperty("timestamp");
    expect(validEvent).toHaveProperty("sessionId");
    expect(validEvent).toHaveProperty("model");
    expect(validEvent).toHaveProperty("verdictPath");
    expect(validEvent).toHaveProperty("gateResults");
    expect(validEvent).toHaveProperty("scoringTotal");
    expect(validEvent).toHaveProperty("requiresClarification");
    expect(validEvent).toHaveProperty("isClarificationRetry");
    expect(validEvent).toHaveProperty("durationMs");
    expect(validEvent).toHaveProperty("briefLength");
    expect(validEvent).toHaveProperty("error");

    // Verify gateResults structure
    expect(validEvent.gateResults).toHaveProperty("pass");
    expect(validEvent.gateResults).toHaveProperty("fail");
    expect(validEvent.gateResults).toHaveProperty("unknown");
  });
});
