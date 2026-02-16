import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Scholarship",
  description: "Ike Avery Scholarship 2026 details and application resources.",
};

export default function ScholarshipPage() {
  return (
    <Section
      eyebrow="Ike Avery Scholarship 2026"
      title="Scholarship Information"
      description="Complete and mail the full packet by the posted deadline."
    >
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <p className="text-lg">
            <strong>Deadline:</strong> postmarked by March 1, 2026
          </p>
          <p className="mt-3 text-black/80">
            <strong>Mail to:</strong> UCR – Ike Avery Scholarship Fund, P.O. Box 5513, Amarillo, TX 79117
          </p>
          <p className="mt-3 text-black/80">
            <strong>Contact:</strong> Thurman Jefferson – (806) 433-6872
          </p>

          <Accordion
            className="mt-6"
            items={[
              {
                title: "Required Packet Items",
                content: (
                  <ul className="list-disc space-y-1 pl-5">
                    <li>Application</li>
                    <li>Official transcript</li>
                    <li>Essay: “Why do you deserve the scholarship”</li>
                    <li>Two personal reference sheets</li>
                  </ul>
                ),
              },
              {
                title: "How to Submit",
                content:
                  "Assemble all required documents and mail your packet to the scholarship fund address so it is postmarked by March 1, 2026.",
              },
            ]}
          />
        </Card>

        <Card>
          <h3 className="font-display text-3xl tracking-wide">Downloads</h3>
          <p className="mt-2 text-sm text-black/75">Get the scholarship forms and complete them before mailing your packet.</p>
          <div className="mt-5 flex flex-col gap-3">
            <Button href="/forms/scholarship-application.pdf" variant="accent">
              Download Scholarship Application
            </Button>
          </div>
        </Card>
      </div>
    </Section>
  );
}
