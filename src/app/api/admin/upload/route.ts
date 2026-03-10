import { NextResponse } from "next/server";
import { createSupabaseServerClient, ensurePublicImagesBucket, getAdminPassword, isSupabaseConfigured, sanitizeFileName, SITE_IMAGES_BUCKET } from "@/lib/supabase";

const MAX_IMAGE_UPLOAD_BYTES = 4 * 1024 * 1024;

function sanitizeFolder(value: string) {
  return value.replace(/[^a-zA-Z0-9/_-]/g, "-").replace(/\/+/g, "/").replace(/^\/|\/$/g, "");
}

export async function POST(request: Request) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "Supabase is not configured." }, { status: 500 });
    }

    const formData = await request.formData();
    const password = String(formData.get("password") ?? "");
    if (password !== getAdminPassword()) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded." }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "Only image uploads are supported." }, { status: 400 });
    }

    if (file.size > MAX_IMAGE_UPLOAD_BYTES) {
      return NextResponse.json({ error: "Image must be 4 MB or smaller." }, { status: 413 });
    }

    const folder = sanitizeFolder(String(formData.get("folder") ?? "site-images"));
    const fileName = sanitizeFileName(file.name || "upload");
    const path = `${folder}/${Date.now()}-${fileName}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const supabase = createSupabaseServerClient();
    await ensurePublicImagesBucket();
    const { error } = await supabase.storage.from(SITE_IMAGES_BUCKET).upload(path, buffer, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage.from(SITE_IMAGES_BUCKET).getPublicUrl(path);
    return NextResponse.json({ url: data.publicUrl, path });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload image." },
      { status: 500 },
    );
  }
}
