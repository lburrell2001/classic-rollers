import { NextResponse } from "next/server";
import { getAdminPassword } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: string };
    if (body.password !== getAdminPassword()) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
