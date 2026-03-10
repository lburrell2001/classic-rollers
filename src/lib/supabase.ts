import { createClient } from "@supabase/supabase-js";
import { cloneDefaultSiteContent, mergeWithDefaults, type SiteContent } from "@/lib/site-content";
import { cloneDefaultSubmissionStore, type MembershipSubmission, type ScholarshipSubmission, type SubmissionStore } from "@/lib/submissions";

export const SITE_IMAGES_BUCKET = process.env.SUPABASE_SITE_IMAGES_BUCKET ?? "site-images";
export const SITE_CONTENT_FILE_PATH = "__content/site-content.json";
export const ADMIN_DATA_BUCKET = process.env.SUPABASE_ADMIN_DATA_BUCKET ?? "site-admin-data";
export const SUBMISSIONS_FILE_PATH = "__admin/submissions.json";

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

async function readJsonFromBucket<T>(bucket: string, path: string, fallback: T) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.storage.from(bucket).download(path);

  if (error) {
    if (error.message.toLowerCase().includes("not found")) {
      return fallback;
    }
    throw error;
  }

  const raw = await data.text();
  return raw ? (JSON.parse(raw) as T) : fallback;
}

async function writeJsonToBucket(bucket: string, path: string, value: unknown) {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.storage.from(bucket).upload(path, JSON.stringify(value, null, 2), {
    contentType: "application/json",
    cacheControl: "0",
    upsert: true,
  });

  if (error) {
    throw error;
  }
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

export async function ensurePrivateAdminBucket() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }

  const supabase = createSupabaseServerClient();
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    throw listError;
  }

  const existingBucket = buckets.find((bucket) => bucket.name === ADMIN_DATA_BUCKET || bucket.id === ADMIN_DATA_BUCKET);
  if (!existingBucket) {
    const { error: createError } = await supabase.storage.createBucket(ADMIN_DATA_BUCKET, {
      public: false,
      fileSizeLimit: "5MB",
      allowedMimeTypes: ["application/json"],
    });

    if (createError) {
      throw createError;
    }

    return;
  }

  if (existingBucket.public) {
    const { error: updateError } = await supabase.storage.updateBucket(ADMIN_DATA_BUCKET, {
      public: false,
      fileSizeLimit: existingBucket.file_size_limit ?? undefined,
      allowedMimeTypes: existingBucket.allowed_mime_types ?? undefined,
    });

    if (updateError) {
      throw updateError;
    }
  }
}

export async function readSubmissionStore() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase is not configured.");
  }

  await ensurePrivateAdminBucket();
  const store = await readJsonFromBucket<SubmissionStore>(ADMIN_DATA_BUCKET, SUBMISSIONS_FILE_PATH, cloneDefaultSubmissionStore());
  return {
    membership: store.membership ?? [],
    scholarship: store.scholarship ?? [],
  } satisfies SubmissionStore;
}

export async function appendMembershipSubmission(submission: Omit<MembershipSubmission, "id" | "submittedAt">) {
  const store = await readSubmissionStore();
  const nextSubmission: MembershipSubmission = {
    id: `membership-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    submittedAt: new Date().toISOString(),
    ...submission,
  };

  const nextStore: SubmissionStore = {
    ...store,
    membership: [nextSubmission, ...store.membership],
  };

  await writeJsonToBucket(ADMIN_DATA_BUCKET, SUBMISSIONS_FILE_PATH, nextStore);
  return nextSubmission;
}

export async function appendScholarshipSubmission(submission: Omit<ScholarshipSubmission, "id" | "submittedAt">) {
  const store = await readSubmissionStore();
  const nextSubmission: ScholarshipSubmission = {
    id: `scholarship-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    submittedAt: new Date().toISOString(),
    ...submission,
  };

  const nextStore: SubmissionStore = {
    ...store,
    scholarship: [nextSubmission, ...store.scholarship],
  };

  await writeJsonToBucket(ADMIN_DATA_BUCKET, SUBMISSIONS_FILE_PATH, nextStore);
  return nextSubmission;
}

export function sanitizeFileName(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
}
