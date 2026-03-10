import type { Metadata } from "next";
import { ScholarshipContent } from "@/components/content/ScholarshipContent";

export const metadata: Metadata = {
  title: "Scholarship",
  description: "Ike Avery Scholarship 2026 details and application resources.",
};

export default function ScholarshipPage() {
  return <ScholarshipContent />;
}
