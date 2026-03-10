"use client";

import { Section } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { useSiteContent } from "@/components/SiteContentProvider";

export function MembershipContent() {
  const { content } = useSiteContent();
  const membership = content.membership;

  return (
    <div className="bg-white">
      <Section
        eyebrow={membership.eyebrow}
        title={membership.title}
        description={membership.description}
        className="pt-32 text-black lg:pt-40"
        titleClassName="text-black"
        descriptionClassName="text-black/70"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <h3 className="font-display text-3xl tracking-wide">{membership.detailsTitle}</h3>
            <p className="mt-3 text-black/70">
              <strong>Annual dues:</strong> {membership.annualDues}
            </p>
            <p className="mt-2 text-black/70">
              <strong>Meetings:</strong> {membership.meetings}
            </p>
            <Button href={membership.applicationUrl} variant="accent" className="mt-5">
              {membership.applicationLabel}
            </Button>
          </Card>

          <Tabs
            tone="light"
            tabs={[
              {
                id: "benefits",
                label: membership.benefitsTitle,
                content: <p className="text-black/70">{membership.benefitsBody}</p>,
              },
              {
                id: "fit",
                label: membership.fitTitle,
                content: <p className="text-black/70">{membership.fitBody}</p>,
              },
            ]}
          />
        </div>
      </Section>
    </div>
  );
}
