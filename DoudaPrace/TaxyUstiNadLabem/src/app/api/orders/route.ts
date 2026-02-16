import { NextRequest, NextResponse } from "next/server";
import { getOrders, type OrderStatus } from "../../../../db/database";
import { requireAuth } from "../../../lib/auth";

export async function GET(request: NextRequest) {
  const result = requireAuth(request);
  if (result instanceof NextResponse) return result;

  const status = request.nextUrl.searchParams.get("status") as OrderStatus | null;
  const orders = getOrders(status || undefined);

  return NextResponse.json(orders);
}
