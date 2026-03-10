import type { Metadata } from "next";
import { EventsContent } from "@/components/content/EventsContent";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming Classic Rollers events and scholarship fundraisers.",
};

export default function EventsPage() {
  return <EventsContent />;
}
