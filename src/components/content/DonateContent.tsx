"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

type DonationFormState = {
  fullName: string;
  email: string;
  phone: string;
  giftType: string;
  amount: string;
  message: string;
};

const giftTypes = ["Check by mail", "Door prize or giveaway item", "Event sponsorship", "Other"];

const emptyForm: DonationFormState = {
  fullName: "",
  email: "",
  phone: "",
  giftType: giftTypes[0],
  amount: "",
  message: "",
};

const fieldClass =
  "mt-1.5 w-full rounded-md border border-black/20 bg-white px-3 py-2.5 text-[15px] text-black outline-none transition focus:border-[var(--color-accent-green)] focus:ring-2 focus:ring-[var(--color-accent-green)]/20";

const steps = [
  { title: "Make your check payable to", body: "Unlimited Classic Rollers Car Club" },
  { title: "Mail it to", body: "PO Box 5513, Amarillo, TX 79117" },
  { title: "Let us know it's coming", body: "Fill out the donation form so the club knows to watch for your gift and can thank you." },
];

export function DonateContent() {
  const [form, setForm] = useState<DonationFormState>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const updateField = (key: keyof DonationFormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/donation-submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Failed to submit donation form.");
      }

      setForm(emptyForm);
      setSubmitMessage("Thank you! The club will be in touch to follow up on your gift.");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to submit donation form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-[var(--color-accent-green)] text-white">
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28 lg:px-8 lg:pt-32">
          <h1 className="font-display text-4xl leading-none tracking-wide sm:text-[2.75rem]">Give to the Ike Avery Scholarship Fund</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/85 sm:text-base">
            Unlimited Classic Rollers Car Club is a 501(c)(3), so your donation is tax-deductible. Every gift supports Amarillo-area students.
          </p>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:px-8">
          <div>
            <h2 className="font-display text-3xl leading-none tracking-wide sm:text-4xl">How to Give</h2>
            <ol className="mt-6 space-y-5">
              {steps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent-green)] text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div className="pt-1">
                    <p className="text-sm font-semibold text-black">{step.title}</p>
                    <p className="mt-0.5 text-[15px] text-black/70">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 border-t border-black/10 pt-6">
              <p className="text-sm font-semibold text-black">Not giving money?</p>
              <p className="mt-0.5 text-[15px] text-black/70">
                Door prizes and giveaway items for our fundraisers are always welcome. Use the form to tell us what you&apos;d like to donate.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-black/10 bg-[var(--color-surface-soft)] p-5 sm:p-6">
            <h2 className="font-display text-2xl tracking-wide sm:text-3xl">Donation Form</h2>
            <p className="mt-1 text-sm text-black/65">No payment is taken online. This lets the club know your gift is on the way.</p>

            <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={submitForm}>
              <label className="block">
                <span className="text-sm font-medium text-black/80">Full name</span>
                <input required value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} className={fieldClass} autoComplete="name" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-black/80">Email</span>
                <input required type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} className={fieldClass} autoComplete="email" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-black/80">
                  Phone <span className="font-normal text-black/50">(optional)</span>
                </span>
                <input type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} className={fieldClass} autoComplete="tel" />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-black/80">Type of gift</span>
                <select value={form.giftType} onChange={(e) => updateField("giftType", e.target.value)} className={fieldClass}>
                  {giftTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-black/80">
                  Amount or item <span className="font-normal text-black/50">(optional)</span>
                </span>
                <input
                  value={form.amount}
                  onChange={(e) => updateField("amount", e.target.value)}
                  className={fieldClass}
                  placeholder="e.g. $100, or a gift basket for the raffle"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-sm font-medium text-black/80">
                  Message <span className="font-normal text-black/50">(optional)</span>
                </span>
                <textarea value={form.message} onChange={(e) => updateField("message", e.target.value)} className={`${fieldClass} min-h-24 resize-y`} />
              </label>

              {submitError ? <p className="text-sm text-[var(--color-accent-red)] sm:col-span-2">{submitError}</p> : null}
              {submitMessage ? <p className="text-sm font-medium text-[var(--color-accent-green)] sm:col-span-2">{submitMessage}</p> : null}

              <div className="sm:col-span-2">
                <Button type="submit" variant="green" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                  {isSubmitting ? "Sending..." : "Send Donation Form"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
