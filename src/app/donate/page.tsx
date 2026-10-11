import type { Metadata } from "next";
import { DonateContent } from "@/components/content/DonateContent";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support the Ike Avery Scholarship Fund with a tax-deductible donation.",
};

export default function DonatePage() {
  return <DonateContent />;
}
