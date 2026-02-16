import { NextRequest, NextResponse } from "next/server";
import { createOrder } from "../../../../db/database";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { from, to, date, name, phone } = body;

    if (!from || !to || !date || !name || !phone) {
      return NextResponse.json(
        { status: "error", message: "Všechna pole jsou povinná." },
        { status: 400 }
      );
    }

    if (typeof phone !== "string" || phone.length < 9) {
      return NextResponse.json(
        { status: "error", message: "Neplatné telefonní číslo." },
        { status: 400 }
      );
    }

    createOrder({ from, to, date, name, phone });

    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json(
      { status: "error", message: "Interní chyba serveru." },
      { status: 500 }
    );
  }
}
