import type { Metadata } from "next";
import { AdminPageContent } from "@/components/AdminPageContent";

export const metadata: Metadata = {
  title: "Admin",
  description: "Classic Rollers site editor.",
};

export default function AdminPage() {
  return <AdminPageContent />;
}
