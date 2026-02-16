import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support the Ike Avery Scholarship Fund with a tax-deductible donation.",
};

export default function DonatePage() {
  return (
    <Section
      eyebrow="Donate"
      title="Give to the Ike Avery Scholarship Fund"
      description="Unlimited Classic Rollers Car Club is a 501(c)(3). Donations are tax-deductible."
    >
      <Card>
        <div className="space-y-3 text-black/85">
          <p>
            <strong>Checks payable to:</strong> Unlimited Classic Rollers Car Club
          </p>
          <p>
            <strong>Mail to:</strong> PO Box 5513, Amarillo, TX 79117
          </p>
          <p>
            <strong>Donation contacts:</strong> Randy Meneweather: (414) 403-9679 | Thurman Jefferson: (806) 433-6872
          </p>
          <p>
            <strong>Also welcome:</strong> Door prizes and giveaway items for fundraiser events.
          </p>
        </div>
      </Card>
    </Section>
  );
}
