import { NextRequest, NextResponse } from "next/server";
import { deleteEmployee, updateEmployeeRole, type EmployeeRole } from "../../../../../db/database";
import { requireAdmin } from "../../../../lib/auth";

const VALID_ROLES: EmployeeRole[] = ["admin", "employee"];

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;
  const employeeId = parseInt(id, 10);
  if (isNaN(employeeId)) {
    return NextResponse.json({ error: "Neplatné ID" }, { status: 400 });
  }

  if (employeeId === admin.id) {
    return NextResponse.json(
      { error: "Nemůžete smazat sami sebe" },
      { status: 400 }
    );
  }

  const deleted = deleteEmployee(employeeId);
  if (!deleted) {
    return NextResponse.json({ error: "Zaměstnanec nenalezen" }, { status: 404 });
  }

  return NextResponse.json({ status: "ok" });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = requireAdmin(request);
  if (admin instanceof NextResponse) return admin;

  const { id } = await params;
  const employeeId = parseInt(id, 10);
  if (isNaN(employeeId)) {
    return NextResponse.json({ error: "Neplatné ID" }, { status: 400 });
  }

  const body = await request.json();
  const { role } = body;

  if (!VALID_ROLES.includes(role)) {
    return NextResponse.json({ error: "Neplatná role" }, { status: 400 });
  }

  const updated = updateEmployeeRole(employeeId, role);
  if (!updated) {
    return NextResponse.json({ error: "Zaměstnanec nenalezen" }, { status: 404 });
  }

  return NextResponse.json({ status: "ok" });
}
