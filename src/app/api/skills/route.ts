import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = getDb();
  const skills = db.prepare("SELECT * FROM skills ORDER BY sort_order ASC").all();
  return NextResponse.json(skills);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const db = getDb();
  const { name, category, percentage } = body;

  const maxOrder = db.prepare("SELECT MAX(sort_order) as m FROM skills").get() as any;
  const sortOrder = (maxOrder?.m || 0) + 1;

  const result = db.prepare(
    "INSERT INTO skills (name, category, percentage, sort_order) VALUES (?, ?, ?, ?)"
  ).run(name, category, percentage || 0, sortOrder);

  const skill = db.prepare("SELECT * FROM skills WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json(skill, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const db = getDb();
  const { id, name, category, percentage } = body;

  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  db.prepare("UPDATE skills SET name=?, category=?, percentage=? WHERE id=?")
    .run(name, category, percentage || 0, id);

  const skill = db.prepare("SELECT * FROM skills WHERE id = ?").get(id);
  return NextResponse.json(skill);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = getDb();
  db.prepare("DELETE FROM skills WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}
