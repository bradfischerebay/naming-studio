import { NextRequest } from "next/server";
import { labStorage } from "@/lib/lab-storage";
import type { LabRun } from "@/lib/lab-storage";

export async function POST(req: NextRequest) {
  try {
    const run = await req.json() as LabRun;
    if (!run?.id || !run?.brief) {
      return Response.json({ error: "Invalid lab run payload" }, { status: 400 });
    }
    await labStorage.save(run);
    return Response.json({ ok: true });
  } catch (err) {
    // Always return 200 — save failure should never surface to the user
    console.warn("[/api/lab/save] Failed:", err);
    return Response.json({ ok: false });
  }
}
