import { NextRequest, NextResponse } from "next/server";
import {
  createEmployee,
  getEmployeeByUsername,
  getEmployeeCount,
  createSession,
} from "../../../../../db/database";
import { hashPassword, generateToken } from "../../../../lib/auth";

const REGISTRATION_PASSWORD = process.env.ADMIN_PASSWORD || "taxi2024";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username, name, password, registrationPassword } = body;

  if (!username || !name || !password || !registrationPassword) {
    return NextResponse.json(
      { error: "Všechna pole jsou povinná" },
      { status: 400 }
    );
  }

  if (registrationPassword !== REGISTRATION_PASSWORD) {
    return NextResponse.json(
      { error: "Nesprávné registrační heslo" },
      { status: 403 }
    );
  }

  if (getEmployeeByUsername(username)) {
    return NextResponse.json(
      { error: "Uživatelské jméno je již obsazené" },
      { status: 409 }
    );
  }

  const isFirstUser = getEmployeeCount() === 0;
  const role = isFirstUser ? "admin" : "employee";

  const passwordHash = hashPassword(password);
  const employeeId = createEmployee(username, name, passwordHash, role);

  const token = generateToken();
  createSession(token, employeeId);

  return NextResponse.json({
    token,
    user: { id: employeeId, username, name, role },
  });
}
