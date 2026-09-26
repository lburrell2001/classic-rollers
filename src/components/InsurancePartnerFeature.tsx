import { Button } from "@/components/ui/button";
import { insurancePartner } from "@/lib/insurance-partner";

export function InsurancePartnerFeature() {
  return (
    <section className="bg-black text-white" aria-labelledby="insurance-partner-heading">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-green)]">Official Insurance Partner</p>
          <h2 id="insurance-partner-heading" className="mt-2 font-display text-4xl tracking-wide sm:text-5xl">
            Every Car in the Club Is Insured by {insurancePartner.agencyName}
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-white/80 sm:text-base">
            {insurancePartner.agentName} and {insurancePartner.agencyName} insure the classic cars of the Unlimited Classic Rollers Car
            Club. As an independent Texas agency since {insurancePartner.foundingYear}, they shop top carriers for classic car, auto, home,
            motorcycle, RV, and business insurance.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              href="/insurance"
              variant="primary"
              className="border border-[var(--color-accent-green)] bg-[var(--color-accent-green)] text-white hover:brightness-110"
            >
              Classic Car Insurance
            </Button>
            <Button href={insurancePartner.phoneHref} variant="outline" className="border-white text-white hover:bg-white/20">
              Call {insurancePartner.phone}
            </Button>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {insurancePartner.coverage.map((item) => (
            <li key={item.title} className="rounded-xl border border-white/20 px-4 py-4 text-sm font-semibold">
              {item.title}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
