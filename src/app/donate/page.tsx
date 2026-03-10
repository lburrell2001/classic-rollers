import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support the Ike Avery Scholarship Fund with a tax-deductible donation.",
};

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,var(--color-accent-green)_0,var(--color-accent-green)_50vh,#ffffff_25vh,#ffffff_100%)]">
      <Section
        eyebrow="Donate"
        title="Give to the Ike Avery Scholarship Fund"
        description="Classic Rollers Car Club is a 501(c)(3). Donations are tax-deductible."
        className="pt-32 text-white lg:pt-40"
        titleClassName="text-white"
        descriptionClassName="text-white/70"
      >
        <Card>
          <div className="space-y-3 text-black/70">
            <p>
              <strong>Checks payable to:</strong> Unlimited Classic Rollers Car Club
            </p>
            <p>
              <strong>Mail to:</strong> PO Box 5513, Amarillo, TX 79117
            </p>
          
            <p>
              <strong>Also welcome:</strong> Door prizes and giveaway items for fundraiser events.
            </p>
          </div>
        </Card>
      </Section>
    </div>
  );
}
