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
    "mt-2 w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-[var(--color-accent-green)] focus:ring-2 focus:ring-[var(--color-accent-green)]/20";

  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-black/60">{label}</span>
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
      setSubmitMessage("Membership form submitted. The club can now review it in the admin portal.");
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
        className="pt-32 text-white lg:pt-40"
        titleClassName="text-white"
        descriptionClassName="text-white/70"
      >
        <Card>
          <h3 className="font-display text-3xl tracking-wide">{membership.detailsTitle}</h3>
          <p className="mt-3 text-black/70">
            <strong>Annual dues:</strong> {membership.annualDues}
          </p>
          <p className="mt-2 text-black/70">
            <strong>Meetings:</strong> {membership.meetings}
          </p>
          <div className="mt-6 grid gap-5 border-t border-black/10 pt-6 lg:grid-cols-2">
            <div>
              <p className="text-s font-bold uppercase tracking-[0.18em] text-[var(--color-accent-red)]">{membership.benefitsTitle}</p>
              <p className="mt-2 text-sm text-black/70">{membership.benefitsBody}</p>
            </div>
            <div>
              <p className="text-s font-bold uppercase tracking-[0.18em] text-[var(--color-accent-red)]">{membership.fitTitle}</p>
              <p className="mt-2 text-sm text-black/70">{membership.fitBody}</p>
            </div>
          </div>
          <p className="mt-12 text-sm text-black/70">
            Use the form to apply for membership. Submissions go directly to the admin portal for review.
          </p>

          <div className="mb-6 mt-4 border-t border-black/10 pt-6">
            <h3 className="font-display text-3xl tracking-wide">Submit Your Membership Request</h3>
            <p className="mt-2 text-sm text-black/70">Fill out the form below and the submission will appear in the admin portal.</p>
          </div>

          <form className="grid gap-5 md:grid-cols-2" onSubmit={submitForm}>
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
                className="inline-flex rounded-full bg-[var(--color-accent-red)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit Membership Form"}
              </button>
            </div>
          </form>
        </Card>
      </Section>
    </div>
  );
}
