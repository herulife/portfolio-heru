import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = getDb();
  const profile = db.prepare("SELECT * FROM profile LIMIT 1").get();
  return NextResponse.json(profile || {});
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const db = getDb();
  const { name, role, location, email, phone, whatsapp, github, linkedin, bio, avatar_url } = body;

  db.prepare(`UPDATE profile SET name=?, role=?, location=?, email=?, phone=?, whatsapp=?, github=?, linkedin=?, bio=?, avatar_url=?, updated_at=CURRENT_TIMESTAMP WHERE id=1`)
    .run(name, role, location, email, phone, whatsapp, github, linkedin, bio, avatar_url);

  const updated = db.prepare("SELECT * FROM profile WHERE id=1").get();
  return NextResponse.json(updated);
}
