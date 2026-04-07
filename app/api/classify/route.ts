import { NextRequest } from "next/server";
import { chomsky } from "@/lib/chomsky";

const CLASSIFIER_SYSTEM_PROMPT = `You are an intent classifier for an eBay product naming governance tool.

Classify the user's input as exactly one of:
- "brief": A product, service, or feature description that needs naming governance evaluation. Typically describes what's being built, who it's for, target markets, timing, scope, or explicitly asks whether something needs a name or should be named.
- "question": A conversational question, explanation request, or general inquiry that does NOT require running gate evaluation. Includes questions like "how does X work", "explain Y", "what is Z", "what's the difference between", "can you help me understand", greetings, follow-ups.

When ambiguous, prefer "brief" — it's better to run the evaluation than skip it.

Output ONLY valid JSON with no markdown formatting, explanation, or code blocks:
{"type":"brief"} or {"type":"question"}

Examples:
- "eBay is launching a managed shipping service for high-volume sellers in US and UK starting Q2 2026" → {"type":"brief"}
- "We're building an AI-powered listing tool for new sellers" → {"type":"brief"}
- "Should we name our new returns portal?" → {"type":"brief"}
- "How does eBay decide when something needs a proper name?" → {"type":"question"}
- "What's the difference between PATH_A1 and PATH_A2?" → {"type":"question"}
- "Can you explain the 6 gates?" → {"type":"question"}
- "What is a naming brief?" → {"type":"question"}
- "Hi, what can you help me with?" → {"type":"question"}
- "What happens if a gate fails?" → {"type":"question"}`;

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json() as { message: string };

    if (!message?.trim()) {
      return Response.json({ type: "brief", fallback: false });
    }

    const raw = await chomsky.generateText({
      messages: [
        { role: "system", content: CLASSIFIER_SYSTEM_PROMPT },
        { role: "user", content: message.slice(0, 800) },
      ],
      temperature: 0,
      maxTokens: 50, // only needs {"type":"brief"} or {"type":"question"}
    });

    // Strip markdown fences if model wraps response
    const cleaned = raw.replace(/```json\n?|```\n?/g, "").trim();

    try {
      const parsed = JSON.parse(cleaned) as { type: string };
      const type = parsed.type === "question" ? "question" : "brief";
      return Response.json({ type, fallback: false });
    } catch {
      // Parse failure — default to brief (safer)
      console.warn("[Classify] JSON parse failed, falling back to brief");
      return Response.json({ type: "brief", fallback: true });
    }
  } catch (error) {
    // Chomsky unreachable — default to brief
    console.warn("[Classify] Chomsky error, falling back to brief:", error);
    return Response.json({ type: "brief", fallback: true });
  }
}
