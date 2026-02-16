import { NextRequest, NextResponse } from "next/server";
import { updateOrderStatus, type OrderStatus } from "../../../../../db/database";
import { requireAuth } from "../../../../lib/auth";

const VALID_STATUSES: OrderStatus[] = ["pending", "accepted", "rejected", "completed"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const result = requireAuth(request);
  if (result instanceof NextResponse) return result;

  const { id } = await params;
  const orderId = parseInt(id, 10);
  if (isNaN(orderId)) {
    return NextResponse.json({ error: "Neplatné ID" }, { status: 400 });
  }

  const body = await request.json();
  const { status } = body;

  if (!VALID_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Neplatný status" }, { status: 400 });
  }

  const updated = updateOrderStatus(orderId, status, result.name);
  if (!updated) {
    return NextResponse.json({ error: "Objednávka nenalezena" }, { status: 404 });
  }

  return NextResponse.json({ status: "ok" });
}
