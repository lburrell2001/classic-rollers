import type { Metadata } from "next";
import { MembershipContent } from "@/components/content/MembershipContent";

export const metadata: Metadata = {
  title: "Membership",
  description: "Join Unlimited Classic Rollers Car Club and support scholarships.",
};

export default function MembershipPage() {
  return <MembershipContent />;
}
