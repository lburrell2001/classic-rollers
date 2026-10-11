import { Button } from "@/components/ui/button";
import { insurancePartner } from "@/lib/insurance-partner";

export function InsurancePartnerFeature() {
  return (
    <section className="bg-[var(--color-accent-green)] text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Official Insurance Partner</p>
          <h2 className="mt-1 font-display text-2xl tracking-wide sm:text-3xl">Club Cars Insured by {insurancePartner.agencyName}</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/85">
            {insurancePartner.agentName} writes agreed value classic car insurance for Classic Rollers members, plus auto, home, RV, and
            business coverage across Texas.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button href="/insurance" variant="light">
            Classic Car Insurance
          </Button>
          <Button href={insurancePartner.phoneHref} variant="outline-light">
            Call {insurancePartner.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
