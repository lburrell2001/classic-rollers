"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { useSiteContent } from "@/components/SiteContentProvider";

export function ScholarshipContent() {
  const { content } = useSiteContent();
  const scholarship = content.scholarship;

  return (
    <div className="bg-white">
      <Section
        eyebrow={scholarship.eyebrow}
        title={scholarship.title}
        description={scholarship.description}
        className="pt-32 text-black lg:pt-40"
        titleClassName="text-black"
        descriptionClassName="text-black/70"
      >
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid gap-4">
            {scholarship.items.length ? (
              scholarship.items.map((item) => (
                <Card key={item.id}>
                  <h3 className="font-display text-3xl tracking-wide">{item.title}</h3>
                  <p className="mt-3 text-black/70">{item.summary}</p>
                  <div className="mt-5 space-y-2 text-black/75">
                    <p>
                      <strong>Deadline:</strong> {item.deadline}
                    </p>
                    <p>
                      <strong>Contact:</strong> {item.contact}
                    </p>
                  </div>
                  <Accordion
                    className="mt-6"
                    tone="light"
                    items={[
                      {
                        title: "Requirements",
                        content: (
                          <ul className="list-disc space-y-1 pl-5">
                            {item.requirements.map((requirement) => (
                              <li key={requirement}>{requirement}</li>
                            ))}
                          </ul>
                        ),
                      },
                      {
                        title: "How to Apply",
                        content: item.howToApply,
                      },
                    ]}
                  />
                </Card>
              ))
            ) : (
              <Card>
                <p className="text-black/70">No scholarships are currently listed.</p>
              </Card>
            )}
          </div>

          <Card>
            <h3 className="font-display text-3xl tracking-wide">{scholarship.downloadsTitle}</h3>
            <p className="mt-2 text-sm text-black/70">{scholarship.downloadsDescription}</p>
            <div className="mt-5 flex flex-col gap-3">
              {scholarship.items.map((item) => (
                <Button key={item.id} href={item.applicationUrl} variant="accent">
                  {item.applicationLabel}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}
