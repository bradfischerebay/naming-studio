import { NextRequest } from "next/server";
import { triageInjection } from "@/lib/modules/gate-agents";

export async function POST(req: NextRequest) {
  const { brief, newContext, currentGateStates } = await req.json() as {
    brief: string;
    newContext: string;
    currentGateStates: Record<string, { status?: string; thinking?: string }>;
  };

  if (!brief?.trim() || !newContext?.trim()) {
    return Response.json({ error: "brief and newContext are required" }, { status: 400 });
  }

  try {
    const requiresUpdate = await triageInjection(brief, newContext, currentGateStates);
    return Response.json({ requiresUpdate });
  } catch (err) {
    // If triage fails entirely, restart all gates
    return Response.json({
      requiresUpdate: ["G0", "G1", "G2", "G3", "G4", "G5"],
      error: String(err),
    });
  }
}
