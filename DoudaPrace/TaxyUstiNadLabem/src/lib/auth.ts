import { randomBytes, scryptSync } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSession, type EmployeeRow } from "../../db/database";

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  const testHash = scryptSync(password, salt, 64).toString("hex");
  return hash === testHash;
}

export function generateToken(): string {
  return randomBytes(32).toString("hex");
}

export function authenticateRequest(
  request: NextRequest
): Omit<EmployeeRow, "passwordHash"> | null {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  return getSession(token) ?? null;
}

export function requireAuth(
  request: NextRequest
): Omit<EmployeeRow, "passwordHash"> | NextResponse {
  const employee = authenticateRequest(request);
  if (!employee) {
    return NextResponse.json({ error: "Neautorizováno" }, { status: 401 });
  }
  return employee;
}

export function requireAdmin(
  request: NextRequest
): Omit<EmployeeRow, "passwordHash"> | NextResponse {
  const result = requireAuth(request);
  if (result instanceof NextResponse) return result;
  if (result.role !== "admin") {
    return NextResponse.json({ error: "Nedostatečná oprávnění" }, { status: 403 });
  }
  return result;
}
