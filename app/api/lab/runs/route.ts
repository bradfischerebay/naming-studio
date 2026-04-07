import { labStorage } from "@/lib/lab-storage";

export async function GET() {
  const runs = await labStorage.getRecent(50);
  return Response.json({ runs });
}
