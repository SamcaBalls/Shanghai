import { NextRequest, NextResponse } from "next/server";
import { deleteSession } from "../../../../../db/database";

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Neautorizováno" }, { status: 401 });
  }

  const token = authHeader.slice(7);
  deleteSession(token);

  return NextResponse.json({ status: "ok" });
}
