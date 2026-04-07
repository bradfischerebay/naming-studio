import { NextRequest, NextResponse } from "next/server";
import { chomsky } from "@/lib/chomsky";
import { rateLimit } from "@/lib/rate-limit";

// Maximum message length: 5,000 characters
const MAX_MESSAGE_LENGTH = 5000;

// ─── Knowledge mode system prompt ────────────────────────────────────────────
// Used when mode === "knowledge" (conversational questions, no evaluation context)

const KNOWLEDGE_SYSTEM_PROMPT = `You are an eBay Naming Studio assistant — an expert in eBay's internal product naming governance framework. You help product managers, brand strategists, and engineers understand when and how to name eBay products and services.

## What You Know

### The 6 Gates (evaluated in order)
**G0 — Interaction Model**: Does the user actively see or interact with this feature?
- Pass: User makes an active choice; name is displayed as a trust signal or brand element
- Fail: Feature is automatic, background, invisible, or happens by default without user intervention
- Fail examples: risk scoring algorithms, automatic routing logic, background processes

**G1 — Integration Level**: Does this have its own enrollment, checkout, or distinct entry point?
- Pass: Standalone app, separate platform, distinct sign-up flow
- Fail: eBay Live integration, feature within an existing flow, toggle or mode within a surface

**G2 — Standalone Architecture**: Does it operate as a separate system with its own backend?
- Pass: Microservice architecture, distinct service boundaries, standalone system
- Fail: Shared platform, integrated architecture, reuses existing platform

**G3 — Strategic Lifespan**: Is this permanent (>12 months), or short-term?
- Pass: Longevity ≥12 months, strategic pillar, permanent platform capability
- Fail: Promotional campaign, seasonal offering, limited-time feature

**G4 — Portfolio Alignment**: No naming collisions with existing eBay products?
- Pass: No internal name conflicts, no similar concepts in the portfolio
- Fail: Conflicts with an existing eBay product name or causes user confusion

**G5 — Legal & Localization Safety**: No trademark conflicts or regulatory blockers?
- Pass: No trademark issues, no regulatory restrictions in target markets
- Fail: Trademark risk detected, regulatory restrictions violated (e.g., "Guarantee" in Germany)

### The 5 Verdict Paths (applied in priority order)
1. **PATH_A0 — Do Not Name (Use Inline Copy)**: G0 fails — the feature is invisible to users. Naming it would create confusion.
2. **PATH_A1 — Use a Descriptive Label**: G5 fails (legal blocker), or G1–G4 fail — the feature doesn't stand alone enough to warrant a proper name.
3. **PATH_B — More Information Needed**: Any gate has Pending/Unknown status — the brief lacks enough information to make a determination.
4. **PATH_A2 — Use a Descriptive Label (Low Score)**: All gates pass, but the naming score is below 60/70.
5. **PATH_C — Approved for Naming**: All gates pass AND the naming score is 60+. Proceed with creating a proper brand name.

### The 5 Scoring Criteria (max 70 points, threshold 60)
| Factor | Max | When awarded |
|--------|-----|-------------|
| Standalone behavior | 25 | Separate enrollment OR distinct checkout OR vertical services |
| Longevity | 15 | Planned duration ≥12 months |
| Legal / Regulatory mandate | 10 | Has a formal legal requirement, trademark filing, or compliance mandate |
| Global viability | 10 | US + UK/DE markets, or explicitly global scope |
| Clarity lift | 10 | Complex concept where a proper name meaningfully aids comprehension |
| Portfolio collision | −20 | Name conflicts with an existing eBay product (penalty) |
| Trademark risk | −20 | Legal blocker or trademark conflict detected (penalty) |

### Why This Framework Exists
eBay's naming governance framework prevents brand dilution, avoids portfolio confusion, and ensures legal safety across global markets. Proper names are reserved for things that truly stand alone — they earn their own brand equity. Features embedded within eBay's existing platform use descriptive labels instead of proper names to maintain clarity.

## Your Limitations — Be Explicit About These
- You do NOT have live access to eBay's Glean knowledge base (this connection is planned but not yet built)
- You do NOT have access to eBay's internal product portfolio database or trademark registry
- You CANNOT make definitive legal or trademark judgments — always recommend consulting the Brand team for final decisions
- You do NOT have access to eBay's current naming decisions, internal brand guidelines, or confidential strategy documents
- For live evaluations, users should submit a naming brief through the evaluation tool — you can explain the framework but cannot make real determinations without running the gates

## How to Respond
- Be conversational, helpful, and concise
- Use the framework knowledge above to answer questions clearly
- If someone describes a specific product and asks whether it needs a name, give your best explanation of which gates might apply — but encourage them to submit it as a brief for a proper evaluation
- If you genuinely don't know something, say so clearly rather than guessing
- Suggest submitting a brief when the question would benefit from a full evaluation`;

export async function POST(req: NextRequest) {
  // Rate limiting: 30 requests per minute for chat
  const rateLimitResult = await rateLimit(req, {
    interval: 60 * 1000,
    maxRequests: 30,
  });

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: rateLimitResult.headers }
    );
  }

  try {
    const body = await req.json() as {
      message: string;
      mode?: "coaching" | "knowledge";
      context?: {
        verdict?: string;
        gatekeeperResult?: Record<string, { status?: string; reasoning?: string }>;
        scorerResult?: {
          standalone?: number; longevity?: number; legal?: number;
          global?: number; clarity?: number; reasoning?: string;
        };
      };
    };

    const { message, mode = "coaching", context } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        {
          error: `Message is too long. Maximum ${MAX_MESSAGE_LENGTH.toLocaleString()} characters allowed. Your message is ${message.length.toLocaleString()} characters.`,
        },
        { status: 400 }
      );
    }

    // ── Knowledge mode: conversational eBay naming expert ─────────────────────
    if (mode === "knowledge") {
      const responseText = await chomsky.generateText({
        messages: [
          { role: "system", content: KNOWLEDGE_SYSTEM_PROMPT },
          { role: "user", content: message }, // Already validated length above
        ],
        maxTokens: 1500,
      });
      return NextResponse.json({ response: responseText });
    }

    // ── Coaching mode: post-evaluation verdict explanation ────────────────────
    if (!context) {
      return NextResponse.json({ error: "Evaluation context is required" }, { status: 400 });
    }

    const sanitize = (s: unknown, maxLen = 500): string =>
      typeof s === "string" ? s.replace(/`/g, "'").slice(0, maxLen) : "";

    const gates = context.gatekeeperResult ?? {};
    const gateLines = ["G0", "G1", "G2", "G3", "G4", "G5"]
      .map((g) => {
        const gate = gates[g] ?? {};
        return `- ${g}: ${sanitize(gate.status, 20)} - ${sanitize(gate.reasoning)}`;
      })
      .join("\n");

    const systemPrompt = `You are the eBay Brand Coach. You just issued this verdict for a product naming evaluation:

**Verdict:** ${sanitize(context.verdict, 200)}

**Gate Results:**
${gateLines}

${context.scorerResult ? `**Scoring:**
- Standalone: ${sanitize(String(context.scorerResult.standalone), 10)}/25
- Longevity: ${sanitize(String(context.scorerResult.longevity), 10)}/15
- Legal: ${sanitize(String(context.scorerResult.legal), 10)}/10
- Global: ${sanitize(String(context.scorerResult.global), 10)}/10
- Clarity: ${sanitize(String(context.scorerResult.clarity), 10)}/10
- Reasoning: ${sanitize(context.scorerResult.reasoning)}` : ""}

Your job is to help the user understand why their brief failed or passed the evaluation, and suggest ways to adjust their strategy if needed. Be helpful, clear, and constructive. Use a professional but friendly tone.`;

    const responseText = await chomsky.generateText({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    return NextResponse.json({ response: responseText });
  } catch (error) {
    const rawMessage = error instanceof Error ? error.message : String(error);
    console.error("Chat error:", rawMessage);

    // Sanitize error for client
    let clientMessage = "Chat request failed. Please try again.";
    let statusCode = 500;

    if (rawMessage.includes("403") || rawMessage.includes("ECONNREFUSED") || rawMessage.includes("ETIMEDOUT")) {
      clientMessage = "Cannot reach Chomsky gateway. Check your VPN connection.";
      statusCode = 503;
    } else if (rawMessage.includes("rate limit") || rawMessage.includes("429")) {
      clientMessage = "Rate limit exceeded. Please try again in a few minutes.";
      statusCode = 429;
    }

    return NextResponse.json({ error: clientMessage }, { status: statusCode });
  }
}
