import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const db = getDb();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let projects;
  if (category && category !== "All") {
    projects = db.prepare("SELECT * FROM projects WHERE category = ? ORDER BY sort_order ASC").all(category);
  } else {
    projects = db.prepare("SELECT * FROM projects ORDER BY sort_order ASC").all();
  }
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const db = getDb();
  const { title, category, description, url, technologies, featured } = body;

  const maxOrder = db.prepare("SELECT MAX(sort_order) as m FROM projects").get() as any;
  const sortOrder = (maxOrder?.m || 0) + 1;

  const result = db.prepare(
    `INSERT INTO projects (title, category, description, url, technologies, featured, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(title, category, description || "", url || "", technologies || "", featured ? 1 : 0, sortOrder);

  const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(result.lastInsertRowid);
  return NextResponse.json(project, { status: 201 });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const db = getDb();
  const { id, title, category, description, url, technologies, featured } = body;

  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  db.prepare(
    `UPDATE projects SET title=?, category=?, description=?, url=?, technologies=?, featured=?, updated_at=CURRENT_TIMESTAMP WHERE id=?`
  ).run(title, category, description || "", url || "", technologies || "", featured ? 1 : 0, id);

  const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(id);
  return NextResponse.json(project);
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  const db = getDb();
  db.prepare("DELETE FROM projects WHERE id = ?").run(id);
  return NextResponse.json({ success: true });
}
