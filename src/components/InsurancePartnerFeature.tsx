import { Button } from "@/components/ui/button";
import { insurancePartner } from "@/lib/insurance-partner";

export function InsurancePartnerFeature() {
  return (
    <section className="border-y border-black/10 bg-white text-black">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-green)]">Official Insurance Partner</p>
          <h2 className="mt-1 font-display text-3xl tracking-wide">Club Cars Insured by {insurancePartner.agencyName}</h2>
          <p className="mt-2 max-w-2xl text-sm text-black/70">
            {insurancePartner.agentName} writes agreed value classic car insurance for Classic Rollers members, plus auto, home, RV, and
            business coverage across Texas.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            href="/insurance"
            variant="primary"
            className="border border-[var(--color-accent-green)] bg-[var(--color-accent-green)] text-white hover:brightness-110"
          >
            Classic Car Insurance
          </Button>
          <Button href={insurancePartner.phoneHref} variant="outline">
            Call {insurancePartner.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
