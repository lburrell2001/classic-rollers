import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { insurancePartner } from "@/lib/insurance-partner";

const title = "Classic Car Insurance in Texas | Agreed Value Coverage | Texas Home & Highway";
const description =
  "Texas Home & Highway Insurance Services and agent Elaine Siegel insure every car in the Unlimited Classic Rollers Car Club. Agreed value classic car insurance, plus auto, home, motorcycle, RV, and business coverage for Texas families.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "classic car insurance Texas",
    "agreed value car insurance Texas",
    "collector car insurance Amarillo",
    "Texas Home & Highway Insurance",
    "Texas Home and Highway Insurance",
    "Elaine Siegel insurance",
    "independent insurance agency Texas",
    "car club insurance",
  ],
  alternates: { canonical: "/insurance" },
  openGraph: {
    title,
    description,
    url: "https://classicrollersamatx.org/insurance",
  },
  twitter: {
    title,
    description,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "InsuranceAgency",
  name: insurancePartner.agencyName,
  url: insurancePartner.website,
  sameAs: [insurancePartner.classicCarPage],
  telephone: "+1-210-483-0928",
  email: insurancePartner.email,
  foundingDate: insurancePartner.foundingYear,
  openingHours: "Mo-Fr 10:00-18:00",
  areaServed: { "@type": "State", name: "Texas" },
  employee: { "@type": "Person", name: insurancePartner.agentName, jobTitle: "Insurance Agent" },
  sponsor: { "@type": "Organization", name: "Unlimited Classic Rollers Car Club", url: "https://classicrollersamatx.org" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Insurance Coverage",
    itemListElement: insurancePartner.services.map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};

const coverage = [
  {
    title: "Classic & Collector Cars",
    body: "Agreed value policies from specialty carriers for the classics, customs, and show cars that roll with the club.",
    href: insurancePartner.classicCarPage,
    cardClass: "border-[var(--color-accent-red)]/20 bg-[var(--color-accent-red)]",
  },
  {
    title: "Everyday Drivers",
    body: "Auto, commercial trucking, and motorcycle coverage for the vehicles you drive the rest of the week.",
    href: insurancePartner.website,
    cardClass: "border-[var(--color-accent-green)]/20 bg-[var(--color-accent-green)]",
  },
  {
    title: "Home, RV & Business",
    body: "Home, renters, RV, rental property, and business liability coverage for Texas families and local firms.",
    href: insurancePartner.website,
    cardClass: "border-black/15 bg-black",
  },
];

export default function InsurancePage() {
  return (
    <div className="bg-[linear-gradient(to_bottom,black_0,black_60vh,#ffffff_25vh,#ffffff_100%)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Section
        title="Classic Car Insurance"
        description={`Every car in the Unlimited Classic Rollers Car Club is insured by ${insurancePartner.agentName} of ${insurancePartner.agencyName}, the club's official insurance partner.`}
        className="pt-32 text-white lg:pt-40"
        titleClassName="text-white"
        descriptionClassName="text-white/70"
      >
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <h3 className="font-display text-3xl tracking-wide">Agreed Value Coverage</h3>
            <p className="mt-3 text-black/70">
              A standard auto policy pays actual cash value, which is usually far less than what a classic is really worth. With agreed value
              coverage, you and the carrier settle on your car&apos;s value when the policy is written. If it&apos;s totaled, that amount is
              what gets paid, with no depreciation and no argument after the fact.
            </p>
            <p className="mt-3 text-black/70">
              As an independent agency protecting Texas families since {insurancePartner.foundingYear}, {insurancePartner.agencyName} compares
              specialty classic car carriers to fit your car and how you actually drive it, from weekend cruises to a full show season.
            </p>
            <Button href={insurancePartner.classicCarPage} target="_blank" rel="noopener" variant="outline" className="mt-6">
              Classic Car Insurance FAQs
            </Button>
          </Card>

          <Card className="border-[var(--color-accent-green)]">
            <h3 className="font-display text-3xl tracking-wide">Get a Quote</h3>
            <p className="mt-3 text-black/70">Tell {insurancePartner.agentName} you&apos;re with the Classic Rollers.</p>
            <div className="mt-5 space-y-2 text-black/75">
              <p>
                <strong>Agent:</strong> {insurancePartner.agentName}
              </p>
              <p>
                <strong>Phone:</strong> <a href={insurancePartner.phoneHref}>{insurancePartner.phone}</a>
              </p>
              <p className="break-all">
                <strong>Email:</strong> <a href={`mailto:${insurancePartner.email}`}>{insurancePartner.email}</a>
              </p>
              <p>
                <strong>Hours:</strong> {insurancePartner.hours}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Button href={insurancePartner.phoneHref} variant="accent">
                Call {insurancePartner.agentName.split(" ")[0]}
              </Button>
              <Button
                href={insurancePartner.classicCarPage}
                target="_blank"
                rel="noopener"
                variant="primary"
                className="border border-[var(--color-accent-green)] bg-[var(--color-accent-green)] text-white hover:brightness-110"
              >
                Request a Quote
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      <section className="bg-white text-black">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-4xl tracking-wide sm:text-5xl">Coverage from Texas Home &amp; Highway</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {coverage.map((item) => (
              <div key={item.title} className={`rounded-2xl border p-6 text-white shadow-sm ${item.cardClass}`}>
                <h3 className="font-display text-2xl tracking-wide text-white">{item.title}</h3>
                <p className="mt-3 text-sm text-white/85">{item.body}</p>
                <Button href={item.href} target="_blank" rel="noopener" variant="outline" className="mt-5 border-white text-white hover:bg-white/20">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
