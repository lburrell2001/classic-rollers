import { EventsContent } from "@/components/content/EventsContent";
import { GalleryContent } from "@/components/content/GalleryContent";
import { HomeContent } from "@/components/content/HomeContent";
import { MembershipContent } from "@/components/content/MembershipContent";
import { ScholarshipContent } from "@/components/content/ScholarshipContent";

type PreviewPageProps = {
  params: Promise<{
    section: string;
  }>;
};

export default async function PreviewSectionPage({ params }: PreviewPageProps) {
  const { section } = await params;

  if (section === "home") {
    return <HomeContent />;
  }

  if (section === "events") {
    return <EventsContent />;
  }

  if (section === "scholarships") {
    return <ScholarshipContent />;
  }

  if (section === "membership") {
    return <MembershipContent />;
  }

  if (section === "gallery") {
    return <GalleryContent />;
  }

  return <HomeContent />;
}
