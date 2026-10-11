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
    accent: "bg-[var(--color-accent-red)]",
  },
  {
    title: "Everyday Drivers",
    body: "Auto, commercial trucking, and motorcycle coverage for the vehicles you drive the rest of the week.",
    href: insurancePartner.website,
    accent: "bg-[var(--color-accent-green)]",
  },
  {
    title: "Home, RV & Business",
    body: "Home, renters, RV, rental property, and business liability coverage for Texas families and local firms.",
    href: insurancePartner.website,
    accent: "bg-black",
  },
];

export default function InsurancePage() {
  return (
    <div className="bg-[linear-gradient(to_bottom,black_0,black_60vh,#ffffff_25vh,#ffffff_100%)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Section
        title="Classic Car Insurance"
        description={`Every car in the Unlimited Classic Rollers Car Club is insured by ${insurancePartner.agentName} of ${insurancePartner.agencyName}, the club's official insurance partner.`}
        className="pt-24 text-white sm:pt-28 lg:pt-32"
        titleClassName="text-white"
        descriptionClassName="text-white/70"
      >
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card>
            <h3 className="font-display text-2xl tracking-wide sm:text-3xl">Agreed Value Coverage</h3>
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
            <h3 className="font-display text-2xl tracking-wide sm:text-3xl">Get a Quote</h3>
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
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Button href={insurancePartner.phoneHref} variant="accent">
                Call {insurancePartner.agentName.split(" ")[0]}
              </Button>
              <Button
                href={insurancePartner.classicCarPage}
                target="_blank"
                rel="noopener"
                variant="green"
              >
                Request a Quote
              </Button>
            </div>
          </Card>
        </div>
      </Section>

      <section className="bg-white text-black">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <h2 className="font-display text-4xl leading-none tracking-wide sm:text-[2.75rem]">Coverage from Texas Home &amp; Highway</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-6">
            {coverage.map((item) => (
              <a key={item.title} href={item.href} target="_blank" rel="noopener" className="group block">
                <span className={`block h-1 w-10 rounded-full ${item.accent}`} />
                <h3 className="mt-4 font-display text-2xl tracking-wide">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-black/65">{item.body}</p>
                <span className="mt-3 inline-block text-sm font-semibold underline-offset-4 group-hover:underline">Learn more →</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
