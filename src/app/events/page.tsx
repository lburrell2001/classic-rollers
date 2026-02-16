import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming Classic Rollers events and scholarship fundraisers.",
};

export default function EventsPage() {
  return (
    <Section eyebrow="Events" title="Upcoming Event" description="Join us in person to support student scholarships.">
      <Card className="border-[var(--color-accent-gold)]">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-red)]">Featured Event</p>
        <h3 className="mt-2 font-display text-4xl tracking-wide">Ike Avery Scholarship Breakfast Fundraiser</h3>
        <div className="mt-5 space-y-2 text-black/85">
          <p>
            <strong>When:</strong> Saturday, March 28, 2026 — 7:00 AM to 11:00 AM
          </p>
          <p>
            <strong>Where:</strong> Cultural Center, 901 N. Hayden St., Amarillo, TX 79107
          </p>
          <p>
            <strong>Breakfast fee:</strong> $8 (All-you-can-eat pancakes)
          </p>
          <p>
            <strong>Contacts:</strong> Thurman Jefferson: 806-433-6872 | Johnny Turner: 806-236-9367 | Art Spencer: 806-367-4862
          </p>
        </div>
      </Card>
    </Section>
  );
}
