import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Unlimited Classic Rollers Car Club and its mission in Amarillo.",
};

export default function AboutPage() {
  return (
    <Section
      eyebrow="About"
      title="Classic Rollers Since 1985"
      description="Unlimited Classic Rollers Car Club is a nonprofit 501(c)(3) supporting Amarillo-area students through the Ike Avery Scholarship Fund."
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="font-display text-3xl tracking-wide">Who We Are</h3>
          <p className="mt-3 text-black/80">
            We are a community-focused classic car club rooted in fellowship, service, and pride in Amarillo.
          </p>
        </Card>
        <Card>
          <h3 className="font-display text-3xl tracking-wide">Our Motto</h3>
          <p className="mt-3 text-xl font-semibold text-[var(--color-accent-red)]">All Cars Welcome.</p>
          <p className="mt-3 text-black/80">Every style, every era, every enthusiast has a place in this club.</p>
        </Card>
      </div>
    </Section>
  );
}
