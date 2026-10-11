import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ScholarshipContent } from "@/components/content/ScholarshipContent";
import { scholarshipEnabled } from "@/lib/features";

export const metadata: Metadata = {
  title: "Scholarship",
  description: "Ike Avery Scholarship 2026 details and application resources.",
};

export default function ScholarshipPage() {
  if (!scholarshipEnabled) {
    notFound();
  }

  return <ScholarshipContent />;
}
