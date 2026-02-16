import { NextRequest, NextResponse } from "next/server";
import { getEmployees } from "../../../../db/database";
import { requireAdmin } from "../../../lib/auth";

export async function GET(request: NextRequest) {
  const result = requireAdmin(request);
  if (result instanceof NextResponse) return result;

  const employees = getEmployees();
  return NextResponse.json(employees);
}
