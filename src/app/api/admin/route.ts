import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password } = body;
  const db = getDb();
  const admin = db.prepare("SELECT * FROM admin WHERE id = 1").get() as any;
  if (!admin || admin.password !== password) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ success: true });
}
