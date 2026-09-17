import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = getDb();
  const experiences = db.prepare("SELECT * FROM experience ORDER BY sort_order ASC").all();
  return NextResponse.json(experiences);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const db = getDb();
  const { title, company, period, description } = body;

  const maxOrder = db.prepare("SELECT MAX(sort_order) as m FROM experience").get() as any;
  const sortOrder = (maxOrder?.m || 0) + 1;

  const result = db.prepare(
    "INSERT INTO experience (title, company, period, description, sort_order) VALUES (?, ?, ?, ?, ?)"
  ).run(title, company, period || "", description || "", sortOrder);

  const exp = db.prepare("SELECT * FROM experience WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json(exp, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const db = getDb();
  const { id, title, company, period, description } = body;

  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  db.prepare("UPDATE experience SET title=?, company=?, period=?, description=? WHERE id=?")
    .run(title, company, period || "", description || "", id);

  const exp = db.prepare("SELECT * FROM experience WHERE id = ?").get(id);
  return NextResponse.json(exp);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = getDb();
  db.prepare("DELETE FROM experience WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}
