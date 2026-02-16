import { NextRequest, NextResponse } from "next/server";
import { getEmployeeByUsername, createSession } from "../../../../../db/database";
import { verifyPassword, generateToken } from "../../../../lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json(
      { error: "Uživatelské jméno a heslo jsou povinné" },
      { status: 400 }
    );
  }

  const employee = getEmployeeByUsername(username);
  if (!employee || !verifyPassword(password, employee.passwordHash)) {
    return NextResponse.json(
      { error: "Nesprávné přihlašovací údaje" },
      { status: 401 }
    );
  }

  const token = generateToken();
  createSession(token, employee.id);

  return NextResponse.json({
    token,
    user: {
      id: employee.id,
      username: employee.username,
      name: employee.name,
      role: employee.role,
    },
  });
}
