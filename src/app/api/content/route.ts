import { NextResponse } from "next/server";
import { readPublishedSiteContent } from "@/lib/supabase";

export async function GET() {
  try {
    const content = await readPublishedSiteContent();
    return NextResponse.json({ content });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load site content." },
      { status: 500 },
    );
  }
}
