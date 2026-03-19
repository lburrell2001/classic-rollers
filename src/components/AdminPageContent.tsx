"use client";

/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import { SiteContentPreviewProvider, useSiteContent } from "@/components/SiteContentProvider";
import { EventsContent } from "@/components/content/EventsContent";
import { GalleryContent } from "@/components/content/GalleryContent";
import { HomeContent } from "@/components/content/HomeContent";
import { MembershipContent } from "@/components/content/MembershipContent";
import { ScholarshipContent } from "@/components/content/ScholarshipContent";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cloneDefaultSiteContent, type EventItem, type GalleryImage, type ScholarshipItem, type SiteContent } from "@/lib/site-content";
import type { MembershipSubmission, ScholarshipSubmission } from "@/lib/submissions";

type AdminSection = "home" | "events" | "scholarships" | "membership" | "gallery" | "membershipSubmissions" | "scholarshipSubmissions";
type PreviewSection = "home" | "events" | "scholarships" | "membership" | "gallery";
type PreviewMode = "desktop" | "mobile";
const MAX_IMAGE_UPLOAD_BYTES = 4 * 1024 * 1024;

function Field({
  label,
  value,
  onChange,
  multiline = false,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
  type?: string;
}) {
  const className =
    "mt-2 w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-[var(--color-accent-green)] focus:ring-2 focus:ring-[var(--color-accent-green)]/20";

  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-black/60">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`${className} min-h-28 resize-y`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={className}
        />
      )}
    </label>
  );
}

function parseLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function makeId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function ImageDropzone({
  label,
  image,
  onAltChange,
  onSrcChange,
  onDelete,
  showAlt = true,
  uploadFolder,
  onUpload,
}: {
  label: string;
  image: { src: string; alt: string };
  onAltChange: (value: string) => void;
  onSrcChange: (value: string) => void;
  onDelete?: () => void;
  showAlt?: boolean;
  uploadFolder: string;
  onUpload: (file: File, folder: string) => Promise<string>;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFiles = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setUploadError("Only image files can be uploaded.");
      return;
    }

    if (file.size > MAX_IMAGE_UPLOAD_BYTES) {
      setUploadError("Image must be 4 MB or smaller.");
      return;
    }

    setIsUploading(true);
    setUploadError("");
    try {
      const nextSrc = await onUpload(file, uploadFolder);
      onSrcChange(nextSrc);
      if (!image.alt) {
        onAltChange(file.name.replace(/\.[^.]+$/, ""));
      }
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  const onDrop = async (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    await handleFiles(event.dataTransfer.files);
  };

  return (
    <Card className="overflow-hidden p-0">
      <div className="grid gap-0 lg:grid-cols-[220px_1fr]">
        <div className="aspect-[4/3] bg-black/[0.04]">
          <img src={image.src} alt={image.alt || label} className="h-full w-full object-cover" />
        </div>
        <div className="space-y-4 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-red)]">{label}</p>
            <p className="mt-1 text-sm text-black/60">Drag and drop a new image, upload one from your computer, or paste an image URL.</p>
          </div>

          <label
            onDragOver={(event) => {
              event.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-4 py-6 text-center transition ${
              isDragging ? "border-[var(--color-accent-green)] bg-[var(--color-accent-green)]/10" : "border-black/15 bg-black/[0.02] hover:bg-black/[0.04]"
            }`}
          >
            <input type="file" accept="image/*" className="hidden" onChange={(event) => void handleFiles(event.target.files)} />
            <span className="text-sm font-semibold text-black">{isUploading ? "Uploading image..." : "Drop image here or click to upload"}</span>
            <span className="mt-1 text-xs text-black/60">Uploads go to Supabase storage immediately and are published when you save content. Max file size: 4 MB.</span>
          </label>

          <Field label="Image URL" value={image.src} onChange={onSrcChange} />
          {showAlt ? <Field label="Alt text" value={image.alt} onChange={onAltChange} /> : null}
          {uploadError ? <p className="text-sm text-[var(--color-accent-red)]">{uploadError}</p> : null}

          {onDelete ? (
            <Button type="button" variant="outline" className="border-[var(--color-accent-red)] text-[var(--color-accent-red)] hover:bg-[var(--color-accent-red)]/5" onClick={onDelete}>
              Delete Image
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

function SectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-4xl tracking-wide text-black">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm text-black/70">{description}</p>
    </div>
  );
}

function formatSubmissionDate(value: string) {
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(timestamp);
}

function DesktopPreviewSurface({ children }: { children: React.ReactNode }) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const surfaceRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState(0);
  const baseWidth = 1280;

  useEffect(() => {
    const frame = frameRef.current;
    const surface = surfaceRef.current;
    if (!frame || !surface) {
      return;
    }

    const updateLayout = () => {
      const nextScale = Math.min(1, frame.clientWidth / baseWidth);
      setScale(nextScale);
      setHeight(surface.scrollHeight * nextScale);
    };

    updateLayout();

    const resizeObserver = new ResizeObserver(() => {
      updateLayout();
    });

    resizeObserver.observe(frame);
    resizeObserver.observe(surface);
    window.addEventListener("resize", updateLayout);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, [children]);

  return (
    <div ref={frameRef} className="bg-white">
      <div className="w-full overflow-hidden bg-white" style={{ height }}>
        <div
          ref={surfaceRef}
          style={{
            width: `${baseWidth}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

function LivePreview({
  section,
  draft,
  mode,
  onModeChange,
}: {
  section: AdminSection;
  draft: SiteContent;
  mode: PreviewMode;
  onModeChange: (mode: PreviewMode) => void;
}) {
  const previewSection: PreviewSection =
    section === "membershipSubmissions"
      ? "membership"
      : section === "scholarshipSubmissions"
        ? "scholarships"
        : section;
  const previewHref = `/preview/${previewSection}`;
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const postPreviewUpdate = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: "classic-rollers-preview-update",
        payload: draft,
      },
      window.location.origin,
    );
  }, [draft]);

  useEffect(() => {
    if (mode !== "mobile") {
      return;
    }

    postPreviewUpdate();
  }, [mode, postPreviewUpdate]);

  const desktopPreview = (
    <SiteContentPreviewProvider content={draft}>
      <>
        {section === "home" ? <HomeContent /> : null}
        {section === "events" ? <EventsContent /> : null}
        {section === "scholarships" ? <ScholarshipContent /> : null}
        {section === "membership" ? <MembershipContent /> : null}
        {section === "gallery" ? <GalleryContent /> : null}
      </>
    </SiteContentPreviewProvider>
  );

  return (
    <div className="overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-[0_20px_60px_-35px_rgba(0,0,0,0.35)]">
      <div className="border-b border-black/10 px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-red)]">Live Preview</p>
            <p className="mt-1 text-sm text-black/60">Unsaved draft changes appear here immediately.</p>
          </div>
          <div className="inline-flex rounded-2xl border border-black/10 bg-black/[0.03] p-1">
            {(["desktop", "mobile"] as PreviewMode[]).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => onModeChange(item)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize transition ${
                  mode === item ? "bg-black text-white" : "text-black/70 hover:bg-black/5"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
      {mode === "desktop" ? (
        <div className="max-h-[60vh] overflow-auto bg-white">
          <DesktopPreviewSurface>{desktopPreview}</DesktopPreviewSurface>
        </div>
      ) : null}
      {mode === "mobile" ? (
        <div className="flex max-h-[60vh] justify-center overflow-auto bg-[#f5f5f5]">
          <div className="w-full max-w-[390px]">
            <iframe
              ref={iframeRef}
              key={`${section}-${mode}`}
              src={previewHref}
              title="Live site preview"
              className="block min-h-[60vh] w-full rounded-[0rem] border-0 bg-white"
              onLoad={postPreviewUpdate}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function AdminPageContent() {
  const { content, setContent, isHydrated } = useSiteContent();
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [section, setSection] = useState<AdminSection>("home");
  const [draft, setDraft] = useState<SiteContent>(content);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const [membershipSubmissions, setMembershipSubmissions] = useState<MembershipSubmission[]>([]);
  const [scholarshipSubmissions, setScholarshipSubmissions] = useState<ScholarshipSubmission[]>([]);
  const [submissionsError, setSubmissionsError] = useState("");
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    setDraft(content);
  }, [content, isAuthenticated]);

  const featuredEvent = draft.events.items[0];
  const scholarshipCount = draft.scholarship.items.length;
  const eventCount = draft.events.items.length;

  const loadSubmissions = useCallback(async () => {
    setIsLoadingSubmissions(true);
    setSubmissionsError("");

    try {
      const response = await fetch("/api/admin/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const payload = (await response.json()) as {
        membership?: MembershipSubmission[];
        scholarship?: ScholarshipSubmission[];
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || "Failed to load form submissions.");
      }

      setMembershipSubmissions(payload.membership ?? []);
      setScholarshipSubmissions(payload.scholarship ?? []);
    } catch (error) {
      setSubmissionsError(error instanceof Error ? error.message : "Failed to load form submissions.");
    } finally {
      setIsLoadingSubmissions(false);
    }
  }, [password]);

  const saveChanges = async () => {
    setIsSaving(true);
    setSaveError("");
    setSaveMessage("");

    try {
      const response = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          content: draft,
        }),
      });

      const payload = (await response.json()) as { content?: SiteContent; error?: string };
      if (!response.ok || !payload.content) {
        throw new Error(payload.error || "Failed to save site content.");
      }

      setContent(payload.content);
      setDraft(payload.content);
      setSaveMessage("Changes saved to Supabase.");
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : "Failed to save site content.");
    } finally {
      setIsSaving(false);
    }
  };

  const restoreDefaults = () => {
    setSaveError("");
    setSaveMessage("");
    setDraft(cloneDefaultSiteContent());
  };

  const unlock = async () => {
    if (!password) {
      setError("Enter the admin password.");
      return;
    }

    setIsAuthenticating(true);
    try {
      const response = await fetch("/api/admin/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error("Incorrect password.");
      }

      setDraft(content);
      setIsAuthenticated(true);
      setError("");
      await loadSubmissions();
    } catch (unlockError) {
      setError(unlockError instanceof Error ? unlockError.message : "Incorrect password.");
    } finally {
      setIsAuthenticating(false);
    }
  };

  const uploadImage = async (file: File, folder: string) => {
    const formData = new FormData();
    formData.append("password", password);
    formData.append("folder", folder);
    formData.append("file", file);

    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    const raw = await response.text();
    let payload: { url?: string; error?: string } = {};

    if (raw) {
      try {
        payload = JSON.parse(raw) as { url?: string; error?: string };
      } catch {
        payload = { error: raw };
      }
    }

    if (!response.ok || !payload.url) {
      const message = payload.error?.includes("Request Entity Too Large")
        ? "Upload failed: the image is too large for the live site. Use an image 4 MB or smaller."
        : payload.error || "Failed to upload image.";
      throw new Error(message);
    }

    return payload.url;
  };

  const addEvent = () => {
    const nextEvent: EventItem = {
      id: makeId("event"),
      title: "New Event",
      date: "",
      countdownAt: "",
      location: "",
      fee: "",
      contacts: "",
      description: "",
    };

    setDraft({
      ...draft,
      events: {
        ...draft.events,
        items: [...draft.events.items, nextEvent],
      },
    });
  };

  const addScholarship = () => {
    const nextScholarship: ScholarshipItem = {
      id: makeId("scholarship"),
      title: "New Scholarship",
      deadline: "",
      summary: "",
      requirements: [],
      howToApply: "",
      contact: "",
      applicationLabel: "Download Application",
      applicationUrl: "",
    };

    setDraft({
      ...draft,
      scholarship: {
        ...draft.scholarship,
        items: [...draft.scholarship.items, nextScholarship],
      },
    });
  };

  const addGalleryImage = () => {
    const nextImage: GalleryImage = {
      id: makeId("gallery"),
      src: "",
      alt: "",
    };

    setDraft({
      ...draft,
      gallery: {
        ...draft.gallery,
        images: [...draft.gallery.images, nextImage],
      },
    });
  };

  const navItems = useMemo(
    () => [
      { id: "home", label: "Home" },
      { id: "events", label: `Events (${eventCount})` },
      { id: "scholarships", label: `Scholarships (${scholarshipCount})` },
      { id: "membership", label: "Membership" },
      { id: "membershipSubmissions", label: `Membership Forms (${membershipSubmissions.length})` },
      { id: "scholarshipSubmissions", label: `Scholarship Forms (${scholarshipSubmissions.length})` },
      { id: "gallery", label: `Gallery (${draft.gallery.images.length})` },
    ] satisfies { id: AdminSection; label: string }[],
    [draft.gallery.images.length, eventCount, membershipSubmissions.length, scholarshipCount, scholarshipSubmissions.length],
  );

  if (!isAuthenticated) {
    return (
      <div className="bg-white">
        <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-4xl items-center px-4 py-24 sm:px-6 lg:px-8">
          <Card className="w-full rounded-[2rem] p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent-red)]">Admin Access</p>
            <h1 className="mt-3 font-display text-5xl tracking-wide text-black">Site Editor</h1>
            <p className="mt-4 max-w-2xl text-sm text-black/70">
              Use this page to update homepage copy, replace photos, manage events, edit scholarship listings, and revise membership information. Changes save in this browser.
            </p>
            <div className="mt-8 grid gap-5">
              <Field label="Password" value={password} onChange={setPassword} placeholder="Enter admin password" />
              {error ? <p className="text-sm text-[var(--color-accent-red)]">{error}</p> : null}
              <div className="flex flex-wrap gap-3">
                <Button type="button" variant="accent" size="lg" onClick={() => void unlock()} disabled={!isHydrated || isAuthenticating}>
                  {isAuthenticating ? "Checking..." : "Open Admin"}
                </Button>
                <Button href="/" variant="outline" size="lg">
                  Back to Site
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f1e8] text-black">
      <div className="border-b border-black/10 bg-white/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="inline-flex pt-4">
              <Image src="/classicrollers-logo.svg" alt="Classic Rollers" width={268} height={96} className="h-[4.5rem] w-auto" priority />
            </div>
            <h1 className="font-display text-4xl tracking-wide">Admin Editor</h1>
            <p className="mt-1 text-sm text-black/65">Edit the draft, then save when you are ready to publish the changes on this device.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button type="button" variant="accent" onClick={() => void saveChanges()} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
            <Button type="button" variant="outline" onClick={() => void loadSubmissions()} disabled={isLoadingSubmissions}>
              {isLoadingSubmissions ? "Refreshing Forms..." : "Refresh Forms"}
            </Button>
            <Button type="button" variant="outline" onClick={restoreDefaults}>
              Reset to Defaults
            </Button>
            <Button href="/" variant="outline">
              View Site
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1600px] gap-6 px-4 py-8 sm:px-6 xl:grid-cols-[240px_minmax(0,1fr)_minmax(420px,0.9fr)] xl:px-8">
        <aside className="h-fit self-start lg:sticky lg:top-24">
          <Card className="h-fit rounded-[2rem] p-3">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSection(item.id)}
                  className={`rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                    section === item.id ? "bg-black text-white" : "bg-transparent text-black hover:bg-black/5"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </Card>
        </aside>

        <div className="space-y-6">
          {saveError ? (
            <Card className="rounded-[2rem] border-[var(--color-accent-red)]">
              <p className="text-sm font-semibold text-[var(--color-accent-red)]">{saveError}</p>
            </Card>
          ) : null}
          {saveMessage ? (
            <Card className="rounded-[2rem] border-[var(--color-accent-green)]">
              <p className="text-sm font-semibold text-[var(--color-accent-green)]">{saveMessage}</p>
            </Card>
          ) : null}
          {submissionsError ? (
            <Card className="rounded-[2rem] border-[var(--color-accent-red)]">
              <p className="text-sm font-semibold text-[var(--color-accent-red)]">{submissionsError}</p>
            </Card>
          ) : null}

          {section === "home" ? (
            <>
              <SectionHeader
                title="Homepage"
                description="Update the landing page copy and replace the three hero/home images. The featured event on the homepage always uses the first event in the Events section."
              />

              <Card className="rounded-[2rem]">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Hero eyebrow" value={draft.home.heroEyebrow} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, heroEyebrow: value } })} />
                  <Field label="Hero title" value={draft.home.heroTitle} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, heroTitle: value } })} />
                  <Field label="Hero description" value={draft.home.heroDescription} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, heroDescription: value } })} multiline />
                  <div className="grid gap-5">
                    <Field label="Primary button label" value={draft.home.heroPrimaryCtaLabel} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, heroPrimaryCtaLabel: value } })} />
                    <Field label="Primary button link" value={draft.home.heroPrimaryCtaHref} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, heroPrimaryCtaHref: value } })} />
                  </div>
                  <div className="grid gap-5">
                    <Field label="Secondary button label" value={draft.home.heroSecondaryCtaLabel} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, heroSecondaryCtaLabel: value } })} />
                    <Field label="Secondary button link" value={draft.home.heroSecondaryCtaHref} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, heroSecondaryCtaHref: value } })} />
                  </div>
                  <div className="grid gap-5">
                    <Field label="Tertiary button label" value={draft.home.heroTertiaryCtaLabel} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, heroTertiaryCtaLabel: value } })} />
                    <Field label="Tertiary button link" value={draft.home.heroTertiaryCtaHref} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, heroTertiaryCtaHref: value } })} />
                  </div>
                </div>
              </Card>

              <div className="grid gap-6 xl:grid-cols-1">
                <ImageDropzone
                  label="Hero Image"
                  image={{ src: draft.home.heroImage, alt: draft.home.heroTitle }}
                  onSrcChange={(value) => setDraft({ ...draft, home: { ...draft.home, heroImage: value } })}
                  onAltChange={() => {}}
                  showAlt={false}
                  uploadFolder="home"
                  onUpload={uploadImage}
                />
                <ImageDropzone
                  label="Welcome Image"
                  image={{ src: draft.home.welcomeImage, alt: draft.home.welcomeTitle }}
                  onSrcChange={(value) => setDraft({ ...draft, home: { ...draft.home, welcomeImage: value } })}
                  onAltChange={() => {}}
                  showAlt={false}
                  uploadFolder="home"
                  onUpload={uploadImage}
                />
                <ImageDropzone
                  label="Join Image"
                  image={{ src: draft.home.joinImage, alt: draft.home.joinTitle }}
                  onSrcChange={(value) => setDraft({ ...draft, home: { ...draft.home, joinImage: value } })}
                  onAltChange={() => {}}
                  showAlt={false}
                  uploadFolder="home"
                  onUpload={uploadImage}
                />
              </div>

              <Card className="rounded-[2rem]">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Welcome eyebrow" value={draft.home.welcomeEyebrow} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, welcomeEyebrow: value } })} />
                  <Field label="Welcome title" value={draft.home.welcomeTitle} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, welcomeTitle: value } })} />
                  <Field label="Welcome description" value={draft.home.welcomeDescription} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, welcomeDescription: value } })} multiline />
                  <div className="grid gap-5">
                    <Field label="Stat one label" value={draft.home.statOneLabel} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, statOneLabel: value } })} />
                    <Field label="Stat one value" value={draft.home.statOneValue} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, statOneValue: value } })} />
                  </div>
                  <div className="grid gap-5">
                    <Field label="Stat two label" value={draft.home.statTwoLabel} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, statTwoLabel: value } })} />
                    <Field label="Stat two value" value={draft.home.statTwoValue} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, statTwoValue: value } })} />
                  </div>
                  <div className="grid gap-5">
                    <Field label="Stat three label" value={draft.home.statThreeLabel} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, statThreeLabel: value } })} />
                    <Field label="Stat three value" value={draft.home.statThreeValue} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, statThreeValue: value } })} />
                  </div>
                </div>
              </Card>

              <Card className="rounded-[2rem]">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Join eyebrow" value={draft.home.joinEyebrow} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, joinEyebrow: value } })} />
                  <Field label="Join title" value={draft.home.joinTitle} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, joinTitle: value } })} />
                  <Field label="Join description" value={draft.home.joinDescription} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, joinDescription: value } })} multiline />
                  <div className="grid gap-5">
                    <Field label="Join button label" value={draft.home.joinPrimaryLabel} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, joinPrimaryLabel: value } })} />
                    <Field label="Join button link" value={draft.home.joinPrimaryHref} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, joinPrimaryHref: value } })} />
                  </div>
                  <div className="grid gap-5">
                    <Field label="Support button label" value={draft.home.joinSecondaryLabel} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, joinSecondaryLabel: value } })} />
                    <Field label="Support button link" value={draft.home.joinSecondaryHref} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, joinSecondaryHref: value } })} />
                  </div>
                </div>
              </Card>

              <Card className="rounded-[2rem]">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Mission eyebrow" value={draft.home.missionEyebrow} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, missionEyebrow: value } })} />
                  <Field label="Mission title" value={draft.home.missionTitle} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, missionTitle: value } })} />
                  <Field label="Mission one title" value={draft.home.missionOneTitle} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, missionOneTitle: value } })} />
                  <Field label="Mission one body" value={draft.home.missionOneBody} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, missionOneBody: value } })} multiline />
                  <Field label="Mission one link" value={draft.home.missionOneHref} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, missionOneHref: value } })} />
                  <Field label="Mission two title" value={draft.home.missionTwoTitle} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, missionTwoTitle: value } })} />
                  <Field label="Mission two body" value={draft.home.missionTwoBody} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, missionTwoBody: value } })} multiline />
                  <Field label="Mission two link" value={draft.home.missionTwoHref} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, missionTwoHref: value } })} />
                  <Field label="Mission three title" value={draft.home.missionThreeTitle} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, missionThreeTitle: value } })} />
                  <Field label="Mission three body" value={draft.home.missionThreeBody} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, missionThreeBody: value } })} multiline />
                  <Field label="Mission three link" value={draft.home.missionThreeHref} onChange={(value) => setDraft({ ...draft, home: { ...draft.home, missionThreeHref: value } })} />
                </div>
              </Card>
            </>
          ) : null}

          {section === "events" ? (
            <>
              <SectionHeader
                title="Events"
                description="Add, remove, and edit events. The first event is treated as the featured event on the homepage."
              />
              <div className="flex justify-end">
                <Button type="button" variant="accent" onClick={addEvent}>
                  Add Event
                </Button>
              </div>
              <Card className="rounded-[2rem]">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Events eyebrow" value={draft.events.eyebrow} onChange={(value) => setDraft({ ...draft, events: { ...draft.events, eyebrow: value } })} />
                  <Field label="Events title" value={draft.events.title} onChange={(value) => setDraft({ ...draft, events: { ...draft.events, title: value } })} />
                  <Field label="Events description" value={draft.events.description} onChange={(value) => setDraft({ ...draft, events: { ...draft.events, description: value } })} multiline />
                  <Card className="bg-[#fff7ec]">
                    <p className="text-sm text-black/70">
                      Featured event on homepage:
                      <span className="ml-2 font-semibold text-black">{featuredEvent?.title || "None"}</span>
                    </p>
                  </Card>
                </div>
              </Card>

              {draft.events.items.map((event, index) => (
                <Card key={event.id} className="rounded-[2rem]">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-red)]">
                        {index === 0 ? "Featured Event" : `Event ${index + 1}`}
                      </p>
                      <h3 className="font-display text-3xl tracking-wide">{event.title || "Untitled Event"}</h3>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-[var(--color-accent-red)] text-[var(--color-accent-red)] hover:bg-[var(--color-accent-red)]/5"
                      onClick={() =>
                        setDraft({
                          ...draft,
                          events: {
                            ...draft.events,
                            items: draft.events.items.filter((item) => item.id !== event.id),
                          },
                        })
                      }
                    >
                      Delete Event
                    </Button>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      label="Event title"
                      value={event.title}
                      onChange={(value) =>
                        setDraft({
                          ...draft,
                          events: {
                            ...draft.events,
                            items: draft.events.items.map((item) => (item.id === event.id ? { ...item, title: value } : item)),
                          },
                        })
                      }
                    />
                    <Field
                      label="Date text shown on site"
                      value={event.date}
                      onChange={(value) =>
                        setDraft({
                          ...draft,
                          events: {
                            ...draft.events,
                            items: draft.events.items.map((item) => (item.id === event.id ? { ...item, date: value } : item)),
                          },
                        })
                      }
                    />
                    <Field
                      label="Countdown date and time"
                      type="datetime-local"
                      value={event.countdownAt}
                      onChange={(value) =>
                        setDraft({
                          ...draft,
                          events: {
                            ...draft.events,
                            items: draft.events.items.map((item) => (item.id === event.id ? { ...item, countdownAt: value } : item)),
                          },
                        })
                      }
                    />
                    <Field
                      label="Location"
                      value={event.location}
                      onChange={(value) =>
                        setDraft({
                          ...draft,
                          events: {
                            ...draft.events,
                            items: draft.events.items.map((item) => (item.id === event.id ? { ...item, location: value } : item)),
                          },
                        })
                      }
                    />
                    <Field
                      label="Fee"
                      value={event.fee}
                      onChange={(value) =>
                        setDraft({
                          ...draft,
                          events: {
                            ...draft.events,
                            items: draft.events.items.map((item) => (item.id === event.id ? { ...item, fee: value } : item)),
                          },
                        })
                      }
                    />
                    <Field
                      label="Contacts"
                      value={event.contacts}
                      onChange={(value) =>
                        setDraft({
                          ...draft,
                          events: {
                            ...draft.events,
                            items: draft.events.items.map((item) => (item.id === event.id ? { ...item, contacts: value } : item)),
                          },
                        })
                      }
                      multiline
                    />
                    <Field
                      label="Short description"
                      value={event.description}
                      onChange={(value) =>
                        setDraft({
                          ...draft,
                          events: {
                            ...draft.events,
                            items: draft.events.items.map((item) => (item.id === event.id ? { ...item, description: value } : item)),
                          },
                        })
                      }
                      multiline
                    />
                  </div>
                </Card>
              ))}
            </>
          ) : null}

          {section === "scholarships" ? (
            <>
              <SectionHeader
                title="Scholarships"
                description="Manage scholarship entries, requirements, application links, and deadlines. Each scholarship can have its own application button."
              />
              <div className="flex justify-end">
                <Button type="button" variant="accent" onClick={addScholarship}>
                  Add Scholarship
                </Button>
              </div>

              <Card className="rounded-[2rem]">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Scholarship eyebrow" value={draft.scholarship.eyebrow} onChange={(value) => setDraft({ ...draft, scholarship: { ...draft.scholarship, eyebrow: value } })} />
                  <Field label="Scholarship title" value={draft.scholarship.title} onChange={(value) => setDraft({ ...draft, scholarship: { ...draft.scholarship, title: value } })} />
                  <Field label="Scholarship description" value={draft.scholarship.description} onChange={(value) => setDraft({ ...draft, scholarship: { ...draft.scholarship, description: value } })} multiline />
                  <Field label="Applications panel title" value={draft.scholarship.downloadsTitle} onChange={(value) => setDraft({ ...draft, scholarship: { ...draft.scholarship, downloadsTitle: value } })} />
                  <Field label="Applications panel description" value={draft.scholarship.downloadsDescription} onChange={(value) => setDraft({ ...draft, scholarship: { ...draft.scholarship, downloadsDescription: value } })} multiline />
                </div>
              </Card>

              {draft.scholarship.items.map((item, index) => (
                <Card key={item.id} className="rounded-[2rem]">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-red)]">Scholarship {index + 1}</p>
                      <h3 className="font-display text-3xl tracking-wide">{item.title || "Untitled Scholarship"}</h3>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-[var(--color-accent-red)] text-[var(--color-accent-red)] hover:bg-[var(--color-accent-red)]/5"
                      onClick={() =>
                        setDraft({
                          ...draft,
                          scholarship: {
                            ...draft.scholarship,
                            items: draft.scholarship.items.filter((entry) => entry.id !== item.id),
                          },
                        })
                      }
                    >
                      Delete Scholarship
                    </Button>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      label="Scholarship title"
                      value={item.title}
                      onChange={(value) =>
                        setDraft({
                          ...draft,
                          scholarship: {
                            ...draft.scholarship,
                            items: draft.scholarship.items.map((entry) => (entry.id === item.id ? { ...entry, title: value } : entry)),
                          },
                        })
                      }
                    />
                    <Field
                      label="Deadline"
                      value={item.deadline}
                      onChange={(value) =>
                        setDraft({
                          ...draft,
                          scholarship: {
                            ...draft.scholarship,
                            items: draft.scholarship.items.map((entry) => (entry.id === item.id ? { ...entry, deadline: value } : entry)),
                          },
                        })
                      }
                    />
                    <Field
                      label="Summary"
                      value={item.summary}
                      onChange={(value) =>
                        setDraft({
                          ...draft,
                          scholarship: {
                            ...draft.scholarship,
                            items: draft.scholarship.items.map((entry) => (entry.id === item.id ? { ...entry, summary: value } : entry)),
                          },
                        })
                      }
                      multiline
                    />
                    <Field
                      label="Contact"
                      value={item.contact}
                      onChange={(value) =>
                        setDraft({
                          ...draft,
                          scholarship: {
                            ...draft.scholarship,
                            items: draft.scholarship.items.map((entry) => (entry.id === item.id ? { ...entry, contact: value } : entry)),
                          },
                        })
                      }
                    />
                    <Field
                      label="Requirements"
                      value={item.requirements.join("\n")}
                      onChange={(value) =>
                        setDraft({
                          ...draft,
                          scholarship: {
                            ...draft.scholarship,
                            items: draft.scholarship.items.map((entry) =>
                              entry.id === item.id ? { ...entry, requirements: parseLines(value) } : entry,
                            ),
                          },
                        })
                      }
                      multiline
                      placeholder="One requirement per line"
                    />
                    <Field
                      label="How to apply"
                      value={item.howToApply}
                      onChange={(value) =>
                        setDraft({
                          ...draft,
                          scholarship: {
                            ...draft.scholarship,
                            items: draft.scholarship.items.map((entry) => (entry.id === item.id ? { ...entry, howToApply: value } : entry)),
                          },
                        })
                      }
                      multiline
                    />
                    <Field
                      label="Application button label"
                      value={item.applicationLabel}
                      onChange={(value) =>
                        setDraft({
                          ...draft,
                          scholarship: {
                            ...draft.scholarship,
                            items: draft.scholarship.items.map((entry) => (entry.id === item.id ? { ...entry, applicationLabel: value } : entry)),
                          },
                        })
                      }
                    />
                    <Field
                      label="Application URL or file path"
                      value={item.applicationUrl}
                      onChange={(value) =>
                        setDraft({
                          ...draft,
                          scholarship: {
                            ...draft.scholarship,
                            items: draft.scholarship.items.map((entry) => (entry.id === item.id ? { ...entry, applicationUrl: value } : entry)),
                          },
                        })
                      }
                    />
                  </div>
                </Card>
              ))}
            </>
          ) : null}

          {section === "membership" ? (
            <>
              <SectionHeader title="Membership" description="Update the membership page copy, club details, and application link." />
              <Card className="rounded-[2rem]">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Membership eyebrow" value={draft.membership.eyebrow} onChange={(value) => setDraft({ ...draft, membership: { ...draft.membership, eyebrow: value } })} />
                  <Field label="Membership title" value={draft.membership.title} onChange={(value) => setDraft({ ...draft, membership: { ...draft.membership, title: value } })} />
                  <Field label="Membership description" value={draft.membership.description} onChange={(value) => setDraft({ ...draft, membership: { ...draft.membership, description: value } })} />
                  <Field label="Details title" value={draft.membership.detailsTitle} onChange={(value) => setDraft({ ...draft, membership: { ...draft.membership, detailsTitle: value } })} />
                  <Field label="Annual dues" value={draft.membership.annualDues} onChange={(value) => setDraft({ ...draft, membership: { ...draft.membership, annualDues: value } })} />
                  <Field label="Meetings" value={draft.membership.meetings} onChange={(value) => setDraft({ ...draft, membership: { ...draft.membership, meetings: value } })} />
                  <Field label="Application button label" value={draft.membership.applicationLabel} onChange={(value) => setDraft({ ...draft, membership: { ...draft.membership, applicationLabel: value } })} />
                  <Field label="Application URL or file path" value={draft.membership.applicationUrl} onChange={(value) => setDraft({ ...draft, membership: { ...draft.membership, applicationUrl: value } })} />
                  <Field label="Benefits tab label" value={draft.membership.benefitsTitle} onChange={(value) => setDraft({ ...draft, membership: { ...draft.membership, benefitsTitle: value } })} />
                  <Field label="Benefits text" value={draft.membership.benefitsBody} onChange={(value) => setDraft({ ...draft, membership: { ...draft.membership, benefitsBody: value } })} multiline />
                  <Field label="Who should join tab label" value={draft.membership.fitTitle} onChange={(value) => setDraft({ ...draft, membership: { ...draft.membership, fitTitle: value } })} />
                  <Field label="Who should join text" value={draft.membership.fitBody} onChange={(value) => setDraft({ ...draft, membership: { ...draft.membership, fitBody: value } })} multiline />
                </div>
              </Card>
            </>
          ) : null}

          {section === "membershipSubmissions" ? (
            <>
              <SectionHeader
                title="Membership Form Submissions"
                description="Review membership applications submitted from the live site."
              />
              {membershipSubmissions.length ? (
                <div className="grid gap-6">
                  {membershipSubmissions.map((submission) => (
                    <Card key={submission.id} className="rounded-[2rem]">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-red)]">Submitted {formatSubmissionDate(submission.submittedAt)}</p>
                          <h3 className="mt-2 font-display text-3xl tracking-wide">{submission.fullName}</h3>
                        </div>
                        <div className="text-sm text-black/70">
                          <p>{submission.email}</p>
                          <p>{submission.phone}</p>
                        </div>
                      </div>
                      <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/60">Location</p>
                          <p className="mt-2 text-sm text-black/75">{submission.city}, {submission.state}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/60">Vehicle</p>
                          <p className="mt-2 text-sm text-black/75">{submission.vehicle}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/60">Why They Want To Join</p>
                          <p className="mt-2 whitespace-pre-wrap text-sm text-black/75">{submission.whyJoin}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="rounded-[2rem]">
                  <p className="text-sm text-black/70">No membership forms have been submitted yet.</p>
                </Card>
              )}
            </>
          ) : null}

          {section === "scholarshipSubmissions" ? (
            <>
              <SectionHeader
                title="Scholarship Form Submissions"
                description="Review scholarship applications submitted from the live site."
              />
              {scholarshipSubmissions.length ? (
                <div className="grid gap-6">
                  {scholarshipSubmissions.map((submission) => (
                    <Card key={submission.id} className="rounded-[2rem]">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-accent-red)]">Submitted {formatSubmissionDate(submission.submittedAt)}</p>
                          <h3 className="mt-2 font-display text-3xl tracking-wide">{submission.fullName}</h3>
                          <p className="mt-2 text-sm font-semibold text-black/75">{submission.scholarshipTitle}</p>
                        </div>
                        <div className="text-sm text-black/70">
                          <p>{submission.email}</p>
                          <p>{submission.phone}</p>
                        </div>
                      </div>
                      <div className="mt-6 grid gap-5 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/60">School</p>
                          <p className="mt-2 text-sm text-black/75">{submission.school}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/60">Graduation Year</p>
                          <p className="mt-2 text-sm text-black/75">{submission.graduationYear}</p>
                        </div>
                        <div className="md:col-span-2">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/60">Essay</p>
                          <p className="mt-2 whitespace-pre-wrap text-sm text-black/75">{submission.essay}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="rounded-[2rem]">
                  <p className="text-sm text-black/70">No scholarship forms have been submitted yet.</p>
                </Card>
              )}
            </>
          ) : null}

          {section === "gallery" ? (
            <>
              <SectionHeader
                title="Gallery"
                description="Replace current photos with drag and drop, update alt text for accessibility, or add more gallery images."
              />
              <div className="flex justify-end">
                <Button type="button" variant="accent" onClick={addGalleryImage}>
                  Add Gallery Image
                </Button>
              </div>
              <Card className="rounded-[2rem]">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="Gallery eyebrow" value={draft.gallery.eyebrow} onChange={(value) => setDraft({ ...draft, gallery: { ...draft.gallery, eyebrow: value } })} />
                  <Field label="Gallery title" value={draft.gallery.title} onChange={(value) => setDraft({ ...draft, gallery: { ...draft.gallery, title: value } })} />
                  <Field label="Gallery description" value={draft.gallery.description} onChange={(value) => setDraft({ ...draft, gallery: { ...draft.gallery, description: value } })} multiline />
                </div>
              </Card>

              <div className="grid gap-6">
                {draft.gallery.images.map((image, index) => (
                  <ImageDropzone
                    key={image.id}
                    label={`Gallery Image ${index + 1}`}
                    image={image}
                    uploadFolder="gallery"
                    onUpload={uploadImage}
                    onSrcChange={(value) =>
                      setDraft({
                        ...draft,
                        gallery: {
                          ...draft.gallery,
                          images: draft.gallery.images.map((entry) => (entry.id === image.id ? { ...entry, src: value } : entry)),
                        },
                      })
                    }
                    onAltChange={(value) =>
                      setDraft({
                        ...draft,
                        gallery: {
                          ...draft.gallery,
                          images: draft.gallery.images.map((entry) => (entry.id === image.id ? { ...entry, alt: value } : entry)),
                        },
                      })
                    }
                    onDelete={() =>
                      setDraft({
                        ...draft,
                        gallery: {
                          ...draft.gallery,
                          images: draft.gallery.images.filter((entry) => entry.id !== image.id),
                        },
                      })
                    }
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>

        <aside className="hidden self-start xl:sticky xl:top-24 xl:block">
          <LivePreview section={section} draft={draft} mode={previewMode} onModeChange={setPreviewMode} />
        </aside>
      </div>
    </div>
  );
}
