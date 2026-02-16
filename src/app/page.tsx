import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Unlimited Classic Rollers Car Club supports Amarillo students through scholarships and community events.",
  openGraph: {
    title: "Unlimited Classic Rollers Car Club",
    description:
      "Classic cars. Community pride. Scholarships for Amarillo students.",
  },
  twitter: {
    title: "Unlimited Classic Rollers Car Club",
    description:
      "Classic cars. Community pride. Scholarships for Amarillo students.",
  },
};

export default function HomePage() {
  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-4 pb-14 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-red)]">Established 1985</p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[0.95] tracking-wide text-[var(--color-primary)] sm:text-7xl md:text-8xl">
              Unlimited Classic Rollers Car Club
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-black/75 lg:mx-0">
              Classic cars. Community pride. Scholarships for Amarillo students.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button href="/donate" variant="accent" size="lg">
                Donate
              </Button>
              <Button href="/membership" variant="primary" size="lg">
                Join
              </Button>
              <Button href="/scholarship" variant="outline" size="lg">
                Scholarship Info
              </Button>
            </div>
          </div>
          <div className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-black/10 bg-white shadow-lg lg:max-w-none">
            <Image src="/gallery/car-01.svg" alt="Featured classic rollers photo slot" width={900} height={640} className="h-auto w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-6 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="order-2 mx-auto w-full max-w-xl overflow-hidden rounded-2xl border-2 border-black/25 bg-white shadow-sm lg:order-1 lg:h-full lg:max-w-none">
            <Image src="/gallery/car-02.svg" alt="Community photo slot one" width={900} height={900} className="h-full w-full object-cover" />
          </div>
          <div className="order-1 flex flex-col gap-4 lg:order-2">
            <div className="rounded-2xl border border-black/30 bg-[var(--color-primary)] p-7 text-center text-white shadow-xl lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">Scholarship Mission</p>
              <h2 className="mt-2 font-display text-4xl tracking-wide sm:text-5xl">Fuel the Next Generation</h2>
              <p className="mt-3 max-w-lg text-sm text-white/85">
                Every fundraiser and donation helps local Amarillo students move forward through the Ike Avery Scholarship Fund.
              </p>
              <Button href="/donate" variant="outline" className="mt-5 border-white text-white hover:bg-white/10">
                Support the Fund
              </Button>
            </div>
            <div className="rounded-2xl border border-[var(--color-accent-red)] bg-[var(--color-accent-red)] p-7 text-center text-white shadow-xl lg:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/85">Club Community</p>
              <h2 className="mt-2 font-display text-4xl tracking-wide sm:text-5xl">All Cars Welcome</h2>
              <p className="mt-3 max-w-lg text-sm text-white/90">
                Join a long-standing club culture built on pride, service, and shared love for classic cars.
              </p>
              <Button href="/membership" variant="outline" className="mt-5 border-white text-white hover:bg-white/10">
                Join Classic Rollers
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Section
        eyebrow="What We Do"
        title="Driven by Culture, Powered by Community"
        description="We bring together classic car lovers and use every event to invest in the next generation of Amarillo students."
      >
        <div className="grid items-stretch gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-4 lg:h-full">
            <Card className="bg-[var(--color-neutral-gray)] text-center lg:flex-1 lg:text-left">
              <h3 className="font-display text-3xl tracking-wide">Donate</h3>
              <p className="mt-2 text-sm text-black/75">Support the Ike Avery Scholarship Fund with tax-deductible giving.</p>
              <Button href="/donate" variant="outline" className="mt-5">
                Give Today
              </Button>
            </Card>
            <Card className="bg-[var(--color-neutral-gray)] text-center lg:flex-1 lg:text-left">
              <h3 className="font-display text-3xl tracking-wide">Membership</h3>
              <p className="mt-2 text-sm text-black/75">Join a welcoming car community. All Cars Welcome.</p>
              <Button href="/membership" variant="outline" className="mt-5">
                Become a Member
              </Button>
            </Card>
            <Card className="bg-[var(--color-neutral-gray)] text-center lg:flex-1 lg:text-left">
              <h3 className="font-display text-3xl tracking-wide">Scholarships</h3>
              <p className="mt-2 text-sm text-black/75">Help students apply for Ike Avery Scholarship opportunities.</p>
              <Button href="/scholarship" variant="outline" className="mt-5">
                View Details
              </Button>
            </Card>
          </div>
          <div className="flex flex-col gap-4 lg:h-full">
            <div className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border-2 border-black/25 bg-white shadow-sm lg:min-h-0 lg:max-w-none lg:flex-1">
              <Image src="/gallery/car-03.svg" alt="Classic Rollers photo slot three" width={700} height={480} className="h-full w-full object-cover" />
            </div>
            <div className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border-2 border-black/25 bg-white shadow-sm lg:min-h-0 lg:max-w-none lg:flex-1">
              <Image src="/gallery/car-04.svg" alt="Classic Rollers photo slot four" width={700} height={480} className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
