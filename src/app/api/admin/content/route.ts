import { NextResponse } from "next/server";
import { cloneDefaultSiteContent, mergeWithDefaults, type SiteContent } from "@/lib/site-content";
import { getAdminPassword, isSupabaseConfigured, savePublishedSiteContent } from "@/lib/supabase";

type SaveContentBody = {
  password?: string;
  content?: SiteContent;
};

export async function PUT(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 });
    }

    const body = (await request.json()) as SaveContentBody;
    if (body.password !== getAdminPassword()) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const content = mergeWithDefaults(cloneDefaultSiteContent(), body.content);
    const saved = await savePublishedSiteContent(content);
    return NextResponse.json({ content: saved });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save site content." },
      { status: 500 },
    );
  }
}
