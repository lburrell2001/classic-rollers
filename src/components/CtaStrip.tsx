import { DonateTrigger } from "@/components/DonateTrigger";
import { Button } from "@/components/ui/button";

export function CtaStrip() {
  return (
    <section className="cta-strip-zigzag relative border-y border-black/10 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-center lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-accent-green)]">Support Students</p>
          <h3 className="mt-1 font-display text-3xl tracking-wide text-black">Support the Ike Avery Scholarship Fund</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          <DonateTrigger>Donate</DonateTrigger>
          <Button href="/scholarship" variant="outline">
            Scholarship Info
          </Button>
        </div>
      </div>
    </section>
  );
}
