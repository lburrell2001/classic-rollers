import { createClient } from "@supabase/supabase-js";
import { cloneDefaultSiteContent, mergeWithDefaults, type SiteContent } from "@/lib/site-content";

export const SITE_IMAGES_BUCKET = process.env.SUPABASE_SITE_IMAGES_BUCKET ?? "site-images";
export const SITE_CONTENT_FILE_PATH = "__content/site-content.json";

function getSupabaseConfig() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
}

export function isSupabaseConfigured() {
  const config = getSupabaseConfig();
  return Boolean(config.url && config.anonKey && config.serviceRoleKey);
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "classicrollersamarillotx";
}

export function createSupabaseServerClient() {
  const config = getSupabaseConfig();

  if (!config.url || !config.serviceRoleKey) {
    throw new Error("Supabase server environment variables are missing.");
  }

  return createClient(config.url, config.serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function readPublishedSiteContent() {
  if (!isSupabaseConfigured()) {
    return cloneDefaultSiteContent();
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.storage.from(SITE_IMAGES_BUCKET).download(SITE_CONTENT_FILE_PATH);

  if (error) {
    if (error.message.toLowerCase().includes("not found")) {
      return cloneDefaultSiteContent();
    }
    throw error;
  }

  const raw = await data.text();
  return mergeWithDefaults(cloneDefaultSiteContent(), JSON.parse(raw));
}

export async function savePublishedSiteContent(content: SiteContent) {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }

  const supabase = createSupabaseServerClient();
  const mergedContent = mergeWithDefaults(cloneDefaultSiteContent(), content);
  await ensurePublicImagesBucket();
  const { error } = await supabase.storage
    .from(SITE_IMAGES_BUCKET)
    .upload(SITE_CONTENT_FILE_PATH, JSON.stringify(mergedContent, null, 2), {
      contentType: "application/json",
      cacheControl: "0",
      upsert: true,
    });

  if (error) {
    throw error;
  }

  return mergedContent;
}

export async function ensurePublicImagesBucket() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }

  const supabase = createSupabaseServerClient();
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    throw listError;
  }

  const existingBucket = buckets.find((bucket) => bucket.name === SITE_IMAGES_BUCKET || bucket.id === SITE_IMAGES_BUCKET);
  if (!existingBucket) {
    const { error: createError } = await supabase.storage.createBucket(SITE_IMAGES_BUCKET, {
      public: true,
      fileSizeLimit: "10MB",
      allowedMimeTypes: ["image/*", "application/json"],
    });

    if (createError) {
      throw createError;
    }

    return;
  }

  if (!existingBucket.public) {
    const { error: updateError } = await supabase.storage.updateBucket(SITE_IMAGES_BUCKET, {
      public: true,
      fileSizeLimit: existingBucket.file_size_limit ?? undefined,
      allowedMimeTypes: existingBucket.allowed_mime_types ?? undefined,
    });

    if (updateError) {
      throw updateError;
    }
  }
}

export function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
}
