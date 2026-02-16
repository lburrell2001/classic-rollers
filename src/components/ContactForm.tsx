"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export function ContactForm() {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormValues>>({});

  function validate(nextValues: FormValues) {
    const nextErrors: Partial<FormValues> = {};

    if (!nextValues.name.trim()) nextErrors.name = "Name is required.";
    if (!nextValues.email.trim()) nextErrors.email = "Email is required.";
    if (nextValues.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nextValues.email)) nextErrors.email = "Enter a valid email.";
    if (!nextValues.message.trim()) nextErrors.message = "Message is required.";

    return nextErrors;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    const subject = encodeURIComponent(`Classic Rollers Contact from ${values.name}`);
    const body = encodeURIComponent(`${values.message}\n\nFrom: ${values.name}\nEmail: ${values.email}`);

    window.location.href = `mailto:info@classicrollers.org?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-semibold">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={values.name}
          onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
          className="w-full rounded-xl border border-black/20 px-4 py-3 outline-none transition focus:border-[var(--color-accent-red)]"
          autoComplete="name"
        />
        {errors.name ? <p className="mt-1 text-xs text-[var(--color-accent-red)]">{errors.name}</p> : null}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-semibold">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
          className="w-full rounded-xl border border-black/20 px-4 py-3 outline-none transition focus:border-[var(--color-accent-red)]"
          autoComplete="email"
        />
        {errors.email ? <p className="mt-1 text-xs text-[var(--color-accent-red)]">{errors.email}</p> : null}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-semibold">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(event) => setValues((prev) => ({ ...prev, message: event.target.value }))}
          className="w-full rounded-xl border border-black/20 px-4 py-3 outline-none transition focus:border-[var(--color-accent-red)]"
        />
        {errors.message ? <p className="mt-1 text-xs text-[var(--color-accent-red)]">{errors.message}</p> : null}
      </div>

      <Button type="submit" variant="primary" size="lg">
        Send Message
      </Button>
    </form>
  );
}
