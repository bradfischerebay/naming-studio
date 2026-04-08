/**
 * Naming Evaluation API v2
 * Production-ready modular agent system
 */

import { NextRequest, NextResponse } from "next/server";
import { orchestrator } from "@/lib/orchestrator";
import { toMachinePayload } from "@/lib/modules/formatter";
import { analytics } from "@/lib/analytics";
import type { AnalyticsEvent } from "@/lib/analytics";
import { validateModel } from "@/lib/config/models";
import { storeBriefMemory } from "@/lib/brief-memory";
import { notifySlackPathC } from "@/lib/slack";

export const runtime = "nodejs";
export const maxDuration = 240; // 4 minutes — pipeline makes 4-6 sequential LLM calls

// Maximum brief length: 50,000 characters (~12,500 tokens)
// Prevents timeouts and excessive token costs
const MAX_BRIEF_LENGTH = 50000;

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let sessionId = "unknown";
  let modelUsed = "unknown";
  let briefLength = 0;
  let isClarificationRetry = false;
  let retryCount = 0;

  try {
    const body = await request.json();
    const { brief, skipWebResearch = false, useDeepSights = false, clarification, previousResult, model } = body;

    // Extract session ID from headers or generate one
    sessionId = request.headers.get("x-session-id") ||
                request.headers.get("x-request-id") ||
                `${Date.now()}-${Math.random().toString(36).substring(7)}`;

    if (!brief || typeof brief !== "string" || !brief.trim()) {
      return NextResponse.json(
        { error: "Brief text is required" },
        { status: 400 }
      );
    }

    briefLength = brief.length;

    // Validate brief length
    if (briefLength > MAX_BRIEF_LENGTH) {
      return NextResponse.json(
        {
          error: `Brief is too long. Maximum ${MAX_BRIEF_LENGTH.toLocaleString()} characters allowed. Your brief is ${briefLength.toLocaleString()} characters.`,
        },
        { status: 400 }
      );
    }

    // Validate model if provided
    let validatedModel: string | undefined;
    try {
      validatedModel = model ? validateModel(model) : undefined;
    } catch (error) {
      return NextResponse.json(
        { error: error instanceof Error ? error.message : "Invalid model specified" },
        { status: 400 }
      );
    }

    modelUsed = validatedModel || process.env.CHOMSKY_MODEL || "unknown";
    isClarificationRetry = !!(clarification && previousResult);
    retryCount = isClarificationRetry ? (previousResult?.retryCount || 0) + 1 : 0;

    // Thin-brief detection is now handled by the orchestrator via buildNoBriefVerdict,
    // which returns a helpful PATH_B response instead of a hard error.

    const config = { skipWebResearch, useDeepSights, model: validatedModel };

    // Handle clarification flow (retry)
    if (clarification && previousResult) {
      const result = await orchestrator.evaluateWithClarification({
        brief,
        userClarification: clarification,
        previousResult,
        config,
      });

      // Track analytics (fire-and-forget)
      trackEvaluation({
        timestamp: new Date().toISOString(),
        sessionId,
        model: modelUsed,
        verdictPath: result.verdict.path,
        gateResults: result.gateEvaluation,
        scoringTotal: result.scoringResult?.scores.total ?? null,
        requiresClarification: result.requiresClarification,
        isClarificationRetry: true,
        durationMs: Date.now() - startTime,
        briefLength,
        error: null,
        briefText: brief,
        briefSummary: result.compiledBrief?.offering_description ?? null,
        targetGeographies: result.compiledBrief?.target_geographies ?? null,
        targetCustomers: result.compiledBrief?.target_customers ?? null,
        timing: result.compiledBrief?.timing ?? null,
        gateResultsFull: result.gateEvaluation?.gate_results ?? null,
        verdictTitle: result.verdict.title,
        verdictSummary: result.verdict.summary?.find(s => s.trim()) ?? null,
        scoringBreakdown: result.scoringResult?.scores?.breakdown ?? null,
        questionCount: result.questions?.length ?? 0,
        retryCount,
      });

      // Store embedding for future similarity lookup (fire-and-forget)
      void storeBriefMemory({
        brief,
        verdictPath: result.verdict.path,
        verdictTitle: result.verdict.title,
        score: result.scoringResult?.scores.total ?? null,
        offeringDescription: result.compiledBrief?.offering_description ?? null,
        gateSummary: buildGateSummary(result.gateEvaluation?.gate_results),
      });

      // Notify Slack on PATH_C verdicts (fire-and-forget)
      let slackNotified = false;
      if (result.verdict.path === "PATH_C") {
        slackNotified = await notifySlackPathC({
          verdictTitle: result.verdict.title,
          score: result.scoringResult?.scores.total ?? null,
          briefSnippet: brief.slice(0, 200),
          gateSummary: result.gateEvaluation?.gate_results
            ? Object.entries(result.gateEvaluation.gate_results)
                .map(([k, g]) => `${k}${(g as any).status === "Pass" ? "✓" : "✗"}`)
                .join(" ")
            : null,
          offeringDescription: result.compiledBrief?.offering_description ?? null,
        });
      }

      return NextResponse.json({
        success: true,
        result,
        payload: toMachinePayload(result),
        requiresClarification: result.requiresClarification,
        questions: result.questions,
        slackNotified,
      });
    }

    // Handle initial evaluation
    const result = await orchestrator.evaluate({
      brief,
      config,
    });

    // Track analytics (fire-and-forget)
    trackEvaluation({
      timestamp: new Date().toISOString(),
      sessionId,
      model: modelUsed,
      verdictPath: result.verdict.path,
      gateResults: result.gateEvaluation,
      scoringTotal: result.scoringResult?.scores.total ?? null,
      requiresClarification: result.requiresClarification,
      isClarificationRetry: false,
      durationMs: Date.now() - startTime,
      briefLength,
      error: null,
      briefText: brief,
      briefSummary: result.compiledBrief?.offering_description ?? null,
      targetGeographies: result.compiledBrief?.target_geographies ?? null,
      targetCustomers: result.compiledBrief?.target_customers ?? null,
      timing: result.compiledBrief?.timing ?? null,
      gateResultsFull: result.gateEvaluation?.gate_results ?? null,
      verdictTitle: result.verdict.title,
      verdictSummary: result.verdict.summary?.find(s => s.trim()) ?? null,
      scoringBreakdown: result.scoringResult?.scores?.breakdown ?? null,
      questionCount: result.questions?.length ?? 0,
      retryCount: 0,
    });

    // Store embedding for future similarity lookup (fire-and-forget)
    void storeBriefMemory({
      brief,
      verdictPath: result.verdict.path,
      verdictTitle: result.verdict.title,
      score: result.scoringResult?.scores.total ?? null,
      offeringDescription: result.compiledBrief?.offering_description ?? null,
      gateSummary: buildGateSummary(result.gateEvaluation?.gate_results),
    });

    // Notify Slack on PATH_C verdicts (fire-and-forget)
    let slackNotified = false;
    if (result.verdict.path === "PATH_C") {
      slackNotified = await notifySlackPathC({
        verdictTitle: result.verdict.title,
        score: result.scoringResult?.scores.total ?? null,
        briefSnippet: brief.slice(0, 200),
        gateSummary: result.gateEvaluation?.gate_results
          ? Object.entries(result.gateEvaluation.gate_results)
              .map(([k, g]) => `${k}${(g as any).status === "Pass" ? "✓" : "✗"}`)
              .join(" ")
          : null,
        offeringDescription: result.compiledBrief?.offering_description ?? null,
      });
    }

    return NextResponse.json({
      success: true,
      result,
      payload: toMachinePayload(result),
      requiresClarification: result.requiresClarification,
      questions: result.questions,
      slackNotified,
    });
  } catch (error) {
    // Sanitize error message before sending to client
    const rawMessage = error instanceof Error ? error.message : String(error);
    console.error("Evaluation error:", rawMessage);

    // Determine safe error message to return to client
    let clientMessage: string;
    let statusCode = 500;

    if (rawMessage.includes("403") || rawMessage.includes("ECONNREFUSED") || rawMessage.includes("ETIMEDOUT")) {
      clientMessage = "Cannot reach the Chomsky gateway. Make sure you're on the eBay VPN.";
      statusCode = 503;
    } else if (rawMessage.includes("rate limit") || rawMessage.includes("429")) {
      clientMessage = "Rate limit exceeded. Please try again in a few minutes.";
      statusCode = 429;
    } else if (rawMessage.includes("timeout") || rawMessage.includes("ESOCKETTIMEDOUT")) {
      clientMessage = "Request timed out. The brief may be too complex. Try simplifying it.";
      statusCode = 504;
    } else if (rawMessage.includes("Invalid model")) {
      clientMessage = rawMessage; // Safe — our own validation error
      statusCode = 400;
    } else {
      // Generic error — don't leak internal details
      clientMessage = "Evaluation failed. Please try again or contact support if the issue persists.";
    }

    // Track error (fire-and-forget)
    trackEvaluation({
      timestamp: new Date().toISOString(),
      sessionId,
      model: modelUsed,
      verdictPath: "PATH_B",
      gateResults: {
        pass: 0,
        fail: 0,
        unknown: 6,
      },
      scoringTotal: null,
      requiresClarification: false,
      isClarificationRetry,
      durationMs: Date.now() - startTime,
      briefLength,
      error: rawMessage, // Log full error internally
      briefText: "",
      briefSummary: null,
      targetGeographies: null,
      targetCustomers: null,
      timing: null,
      gateResultsFull: null,
      verdictTitle: "Error",
      verdictSummary: null,
      scoringBreakdown: null,
      questionCount: 0,
      retryCount,
    });

    return NextResponse.json(
      {
        success: false,
        error: clientMessage,
      },
      { status: statusCode }
    );
  }
}

/**
 * Build a concise gate summary string from gate results
 */
function buildGateSummary(gateResults: Record<string, { status: string }> | undefined): string | null {
  if (!gateResults) return null;
  const icons: Record<string, string> = { Pass: "✓", Fail: "✗", Unknown: "?", Pending: "?" };
  const parts = Object.entries(gateResults).map(([key, g]) => `${key}${icons[g.status] ?? "?"}`);
  const allPass = Object.values(gateResults).every(g => g.status === "Pass");
  return allPass ? "All gates passed" : parts.join(" ");
}

/**
 * Helper to track analytics event
 * Extracts gate result counts and fires analytics.track()
 */
function trackEvaluation(params: {
  timestamp: string;
  sessionId: string;
  model: string;
  verdictPath: any;
  gateResults: any;
  scoringTotal: number | null;
  requiresClarification: boolean;
  isClarificationRetry: boolean;
  durationMs: number;
  briefLength: number;
  error: string | null;
  briefText: string;
  briefSummary: string | null;
  targetGeographies: string | null;
  targetCustomers: string | null;
  timing: string | null;
  gateResultsFull: Record<string, any> | null;
  verdictTitle: string;
  verdictSummary: string | null;
  scoringBreakdown: Record<string, number> | null;
  questionCount: number;
  retryCount: number;
}): void {
  try {
    const gateResultCounts = {
      pass: 0,
      fail: 0,
      unknown: 0,
    };

    // Extract gate counts if available
    if (params.gateResults && typeof params.gateResults === 'object') {
      if ('gate_results' in params.gateResults) {
        const gates = params.gateResults.gate_results;
        for (const gate of Object.values(gates)) {
          const gateObj = gate as any;
          if (gateObj && gateObj.status) {
            if (gateObj.status === 'Pass') gateResultCounts.pass++;
            else if (gateObj.status === 'Fail') gateResultCounts.fail++;
            else gateResultCounts.unknown++;
          }
        }
      } else if ('pass' in params.gateResults) {
        // Already in summary format
        gateResultCounts.pass = params.gateResults.pass;
        gateResultCounts.fail = params.gateResults.fail;
        gateResultCounts.unknown = params.gateResults.unknown;
      }
    }

    const event: AnalyticsEvent = {
      timestamp: params.timestamp,
      sessionId: params.sessionId,
      model: params.model,
      verdictPath: params.verdictPath,
      gateResults: gateResultCounts,
      scoringTotal: params.scoringTotal,
      requiresClarification: params.requiresClarification,
      isClarificationRetry: params.isClarificationRetry,
      durationMs: params.durationMs,
      briefLength: params.briefLength,
      error: params.error,
      briefText: params.briefText,
      briefSummary: params.briefSummary,
      targetGeographies: params.targetGeographies,
      targetCustomers: params.targetCustomers,
      timing: params.timing,
      gateResultsFull: params.gateResultsFull,
      verdictTitle: params.verdictTitle,
      verdictSummary: params.verdictSummary,
      scoringBreakdown: params.scoringBreakdown,
      questionCount: params.questionCount,
      retryCount: params.retryCount,
    };

    // Fire-and-forget - never blocks
    void analytics.track(event);
  } catch (err) {
    // Never throw - analytics should never crash the main flow
    console.warn("[Analytics] Failed to track:", err);
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    version: "2.0",
    description: "Naming Agent v2 - Modular Production System",
  });
}
