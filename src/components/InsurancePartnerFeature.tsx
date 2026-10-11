import { Button } from "@/components/ui/button";
import { insurancePartner } from "@/lib/insurance-partner";

export function InsurancePartnerFeature() {
  return (
    <section className="bg-[var(--color-accent-green)] text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-4 py-10 sm:px-6 md:flex-row md:items-center lg:px-8">
        <div>
          <h2 className="font-display text-2xl tracking-wide sm:text-3xl">Need Classic Car Insurance?</h2>
          <p className="mt-2 max-w-2xl text-sm text-white/85">
            {insurancePartner.agentName} of {insurancePartner.agencyName} writes agreed value coverage for classics, customs, and show
            cars across Texas.
          </p>
        </div>
        <Button href={insurancePartner.classicCarPage} target="_blank" rel="noopener" variant="light">
          Get a Quote
        </Button>
      </div>
    </section>
  );
}
