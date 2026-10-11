"use client";

import { useState, type FormEvent } from "react";
import { Section } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { useSiteContent } from "@/components/SiteContentProvider";

type MembershipFormState = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  vehicle: string;
  whyJoin: string;
};

const emptyForm: MembershipFormState = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  vehicle: "",
  whyJoin: "",
};

function InputField({
  label,
  value,
  onChange,
  multiline = false,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  type?: string;
}) {
  const className =
    "mt-1.5 w-full rounded-md border border-black/20 bg-white px-3 py-2.5 text-[15px] text-black outline-none transition focus:border-[var(--color-accent-green)] focus:ring-2 focus:ring-[var(--color-accent-green)]/20";

  return (
    <label className="block">
      <span className="text-sm font-medium text-black/80">{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} className={`${className} min-h-28 resize-y`} />
      ) : (
        <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className={className} />
      )}
    </label>
  );
}

export function MembershipContent() {
  const { content } = useSiteContent();
  const membership = content.membership;
  const [form, setForm] = useState<MembershipFormState>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const updateField = (key: keyof MembershipFormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/membership-submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Failed to submit membership form.");
      }

      setForm(emptyForm);
      setSubmitMessage("Thanks! Your application was sent to the club.");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to submit membership form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[linear-gradient(to_bottom,var(--color-accent-green)_0,var(--color-accent-green)_70vh,#ffffff_25vh,#ffffff_100%)]">
      <Section
        title={membership.title}
        description={membership.description}
        className="pt-24 text-white sm:pt-28 lg:pt-32"
        titleClassName="text-white"
        descriptionClassName="text-white/70"
      >
        <Card>
          <h3 className="font-display text-2xl tracking-wide sm:text-3xl">{membership.detailsTitle}</h3>
          <p className="mt-3 text-black/70">
            <strong>Annual dues:</strong> {membership.annualDues}
          </p>
          <p className="mt-2 text-black/70">
            <strong>Meetings:</strong> {membership.meetings}
          </p>
          <div className="mt-6 grid gap-5 border-t border-black/10 pt-6 lg:grid-cols-2">
            <div>
              <p className="text-sm font-semibold text-[var(--color-accent-red)]">{membership.benefitsTitle}</p>
              <p className="mt-2 text-sm text-black/70">{membership.benefitsBody}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--color-accent-red)]">{membership.fitTitle}</p>
              <p className="mt-2 text-sm text-black/70">{membership.fitBody}</p>
            </div>
          </div>
          <div className="mb-6 mt-8 border-t border-black/10 pt-8">
            <h3 className="font-display text-2xl tracking-wide sm:text-3xl">Apply for Membership</h3>
            <p className="mt-1 text-sm text-black/70">Fill out the form and a club officer will follow up with you.</p>
          </div>

          <form className="grid gap-4 md:grid-cols-2" onSubmit={submitForm}>
            <InputField label="Full Name" value={form.fullName} onChange={(value) => updateField("fullName", value)} />
            <InputField label="Email" type="email" value={form.email} onChange={(value) => updateField("email", value)} />
            <InputField label="Phone" value={form.phone} onChange={(value) => updateField("phone", value)} />
            <InputField label="Vehicle" value={form.vehicle} onChange={(value) => updateField("vehicle", value)} />
            <InputField label="City" value={form.city} onChange={(value) => updateField("city", value)} />
            <InputField label="State" value={form.state} onChange={(value) => updateField("state", value)} />
            <div className="md:col-span-2">
              <InputField label="Why You Want To Join" value={form.whyJoin} onChange={(value) => updateField("whyJoin", value)} multiline />
            </div>

            {submitError ? <p className="md:col-span-2 text-sm text-[var(--color-accent-red)]">{submitError}</p> : null}
            {submitMessage ? <p className="md:col-span-2 text-sm text-[var(--color-accent-green)]">{submitMessage}</p> : null}

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[var(--color-accent-red)] px-5 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </Card>
      </Section>
    </div>
  );
}
