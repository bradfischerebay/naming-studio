import { NextRequest, NextResponse } from "next/server";
import { gptConversations } from "@/lib/gpt-conversations";
import type { StoredConversation } from "@/lib/models/gpt-conversation";

export const runtime = "nodejs";

export async function GET() {
  const conversations = await gptConversations.getAll();
  return NextResponse.json({ conversations });
}

export async function POST(request: NextRequest) {
  try {
    const conv = (await request.json()) as StoredConversation;
    if (!conv?.id || !conv?.assistantKey || !conv?.messages) {
      return NextResponse.json({ error: "Invalid conversation" }, { status: 400 });
    }
    await gptConversations.upsert(conv);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to save" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = (await request.json()) as { id: string };
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    await gptConversations.delete(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
