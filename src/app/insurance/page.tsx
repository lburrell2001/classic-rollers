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
    url: "https://classicrollers.org/insurance",
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
  openingHours: "Mo-Fr 10:00-18:00",
  telephone: "+1-210-483-0928",
  email: insurancePartner.email,
  foundingDate: insurancePartner.foundingYear,
  areaServed: { "@type": "State", name: "Texas" },
  employee: { "@type": "Person", name: insurancePartner.agentName, jobTitle: "Insurance Agent" },
  sponsor: { "@type": "Organization", name: "Unlimited Classic Rollers Car Club", url: "https://classicrollers.org" },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Insurance Coverage",
    itemListElement: insurancePartner.coverage.map((item) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: `${item.title} Insurance`, description: item.body },
    })),
  },
};

export default function InsurancePage() {
  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Section
        title="Classic Car Insurance for the Classic Rollers"
        description={`Every car in the Unlimited Classic Rollers Car Club is insured by ${insurancePartner.agentName} of ${insurancePartner.agencyName}, our official insurance partner.`}
        className="pt-32 text-black lg:pt-40"
        titleClassName="text-black"
        descriptionClassName="text-black/70"
      >
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <h3 className="font-display text-3xl tracking-wide">Why the Club Trusts {insurancePartner.agentName}</h3>
            <div className="mt-3 space-y-3 text-black/70">
              <p>
                Classic cars aren&apos;t daily drivers, and they shouldn&apos;t be insured like one. {insurancePartner.agencyName} has
                protected Texas families since {insurancePartner.foundingYear}, and {insurancePartner.agentName} knows what our members&apos;
                cars are worth to them.
              </p>
              <p>
                As an independent agency, Texas Home &amp; Highway shops top carriers you know and trust to find the right coverage at the
                right price, for your classic and for everything else you own.
              </p>
            </div>
          </Card>
          <div className="rounded-xl bg-[var(--color-accent-green)] p-6 text-white shadow-[0_10px_35px_-20px_rgba(0,0,0,0.35)]">
            <h3 className="font-display text-3xl tracking-wide text-white">Get a Quote</h3>
            <p className="mt-3 text-white/85">
              Tell {insurancePartner.agentName} you&apos;re with the Classic Rollers.
            </p>
            <div className="mt-5 space-y-2 text-white">
              <p>
                <strong>Phone:</strong>{" "}
                <a href={insurancePartner.phoneHref} className="underline underline-offset-4">
                  {insurancePartner.phone}
                </a>
              </p>
              <p className="break-all">
                <strong>Email:</strong>{" "}
                <a href={`mailto:${insurancePartner.email}`} className="underline underline-offset-4">
                  {insurancePartner.email}
                </a>
              </p>
              <p>
                <strong>Hours:</strong> {insurancePartner.hours}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={insurancePartner.phoneHref}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-semibold tracking-wide text-black transition-all hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
              >
                Call Now
              </a>
              <Button
                href={insurancePartner.classicCarPage}
                target="_blank"
                rel="noopener"
                variant="outline"
                className="border-white text-white hover:bg-white/20"
              >
                Request a Classic Car Quote
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Agreed Value, Not Market Guesswork"
        description="A standard auto policy pays actual cash value, which is usually far less than what a collector car is really worth."
        className="pt-0"
        titleClassName="text-black"
        descriptionClassName="text-black/70"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <h3 className="font-display text-2xl tracking-wide text-[var(--color-accent-green)]">How Agreed Value Works</h3>
            <p className="mt-2 text-sm text-black/70">
              You and the carrier settle on your car&apos;s value when the policy is written. If it&apos;s totaled, that amount is what gets
              paid, with no depreciation and no argument about market value after the fact.
            </p>
          </Card>
          <Card>
            <h3 className="font-display text-2xl tracking-wide text-[var(--color-accent-green)]">Specialty Carriers, Compared for You</h3>
            <p className="mt-2 text-sm text-black/70">
              {insurancePartner.agentName} compares specialty classic car carriers to find the right fit for your car and how you actually
              drive it, whether that&apos;s weekend cruises or a full show season.
            </p>
          </Card>
        </div>
        <Button href={insurancePartner.classicCarPage} target="_blank" rel="noopener" variant="outline" className="mt-6">
          Classic Car Insurance FAQs at Texas Home &amp; Highway
        </Button>
      </Section>

      <Section title="Coverage from Texas Home & Highway" className="pt-0" titleClassName="text-black">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {insurancePartner.coverage.map((item) => (
            <Card key={item.title}>
              <h3 className="font-display text-2xl tracking-wide text-[var(--color-accent-red)]">{item.title}</h3>
              <p className="mt-2 text-sm text-black/70">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}
