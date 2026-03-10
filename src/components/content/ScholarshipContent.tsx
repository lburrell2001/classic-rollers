"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { useSiteContent } from "@/components/SiteContentProvider";

type ScholarshipFormState = {
  scholarshipId: string;
  fullName: string;
  email: string;
  phone: string;
  school: string;
  graduationYear: string;
  essay: string;
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
        <textarea value={value} onChange={(event) => onChange(event.target.value)} className={`${className} min-h-32 resize-y`} />
      ) : (
        <input type={type} value={value} onChange={(event) => onChange(event.target.value)} className={className} />
      )}
    </label>
  );
}

export function ScholarshipContent() {
  const { content } = useSiteContent();
  const scholarship = content.scholarship;
  const [form, setForm] = useState<ScholarshipFormState>({
    scholarshipId: scholarship.items[0]?.id ?? "",
    fullName: "",
    email: "",
    phone: "",
    school: "",
    graduationYear: "",
    essay: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    setForm((current) => ({
      ...current,
      scholarshipId:
        scholarship.items.some((item) => item.id === current.scholarshipId) ? current.scholarshipId : (scholarship.items[0]?.id ?? ""),
    }));
  }, [scholarship.items]);

  const updateField = (key: keyof ScholarshipFormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/scholarship-submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error || "Failed to submit scholarship form.");
      }

      setForm({
        scholarshipId: scholarship.items[0]?.id ?? "",
        fullName: "",
        email: "",
        phone: "",
        school: "",
        graduationYear: "",
        essay: "",
      });
      setSubmitMessage("Scholarship form submitted. The application is now visible in the admin portal.");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to submit scholarship form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[linear-gradient(to_bottom,var(--color-accent-green)_0,var(--color-accent-green)_70vh,#ffffff_25vh,#ffffff_100%)]">
      <Section
        eyebrow={scholarship.eyebrow}
        title={scholarship.title}
        description={scholarship.description}
        className="pt-32 text-black lg:pt-40"
        titleClassName="text-white"
        descriptionClassName="text-white/70"
      >
        <div className="flex flex-row gap-4 lg:[&>*:first-child]:basis-[70%] lg:[&>*:last-child]:basis-[130%]">
          <div className="grid gap-4">
            {scholarship.items.length ? (
              scholarship.items.map((item) => (
                <Card key={item.id}>
                  <h3 className="font-display text-3xl tracking-wide">{item.title}</h3>
                  <p className="mt-3 text-black/70">{item.summary}</p>
                  <div className="mt-5 space-y-2 text-black/75">
                    <p>
                      <strong>Deadline:</strong> {item.deadline}
                    </p>
                    <p>
                      <strong>Contact:</strong> {item.contact}
                    </p>
                  </div>
                  <Accordion
                    className="mt-6"
                    tone="light"
                    items={[
                      {
                        title: "Requirements",
                        content: (
                          <ul className="list-disc space-y-1 pl-5">
                            {item.requirements.map((requirement) => (
                              <li key={requirement}>{requirement}</li>
                            ))}
                          </ul>
                        ),
                      },
                    ]}
                  />
                </Card>
              ))
            ) : (
              <Card>
                <p className="text-black/70">No scholarships are currently listed.</p>
              </Card>
            )}
          </div>

          <Card>
            <h3 className="font-display text-3xl tracking-wide">Scholarship Form</h3>
            <p className="mt-2 text-sm text-black/70">Submit your application online and the admin team will be able to review it in the portal.</p>

            <form className="mt-5 space-y-4" onSubmit={submitForm}>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-black/60">Scholarship</span>
                <select
                  value={form.scholarshipId}
                  onChange={(event) => updateField("scholarshipId", event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-[var(--color-accent-green)] focus:ring-2 focus:ring-[var(--color-accent-green)]/20"
                >
                  {scholarship.items.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </label>

              <InputField label="Full Name" value={form.fullName} onChange={(value) => updateField("fullName", value)} />
              <InputField label="Email" type="email" value={form.email} onChange={(value) => updateField("email", value)} />
              <InputField label="Phone" value={form.phone} onChange={(value) => updateField("phone", value)} />
              <InputField label="School" value={form.school} onChange={(value) => updateField("school", value)} />
              <InputField label="Graduation Year" value={form.graduationYear} onChange={(value) => updateField("graduationYear", value)} />
              <InputField label="Essay" value={form.essay} onChange={(value) => updateField("essay", value)} multiline />

              {submitError ? <p className="text-sm text-[var(--color-accent-red)]">{submitError}</p> : null}
              {submitMessage ? <p className="text-sm text-[var(--color-accent-green)]">{submitMessage}</p> : null}

              <button
                type="submit"
                disabled={isSubmitting || !scholarship.items.length}
                className="inline-flex rounded-full bg-[var(--color-accent-red)] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Submitting..." : "Submit Scholarship Form"}
              </button>
            </form>

            
          </Card>
        </div>
      </Section>
    </div>
  );
}
