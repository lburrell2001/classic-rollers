import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Membership",
  description: "Join Unlimited Classic Rollers Car Club and support scholarships.",
};

export default function MembershipPage() {
  return (
    <Section eyebrow="Membership" title="Join Classic Rollers" description="All Cars Welcome.">
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h3 className="font-display text-3xl tracking-wide">Membership Details</h3>
          <p className="mt-3 text-black/80">
            <strong>Annual dues:</strong> $40
          </p>
          <p className="mt-2 text-black/80">
            <strong>Meetings:</strong> Every 2nd Tuesday
          </p>
          <Button href="/forms/membership-application.pdf" variant="accent" className="mt-5">
            Download Membership Application
          </Button>
        </Card>

        <Tabs
          tabs={[
            {
              id: "benefits",
              label: "Benefits",
              content: <p className="text-black/80">Club fellowship, community events, and direct support for Amarillo student scholarships.</p>,
            },
            {
              id: "fit",
              label: "Who Should Join",
              content: <p className="text-black/80">Any classic car enthusiast who wants to serve the community and represent the culture with pride.</p>,
            },
          ]}
        />
      </div>
    </Section>
  );
}
