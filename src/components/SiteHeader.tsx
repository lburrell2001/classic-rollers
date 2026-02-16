"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const desktopNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/scholarship", label: "Scholarship" },
];

const mobileNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/scholarship", label: "Scholarship" },
  { href: "/membership", label: "Membership" },
  { href: "/gallery", label: "Gallery" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    if (!contactOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setContactOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [contactOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-display text-2xl tracking-wide text-[var(--color-primary)]">
            Classic Rollers
          </Link>

          <nav className="hidden items-center gap-5 md:flex" aria-label="Main navigation">
            {desktopNavLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm font-medium text-black/80 transition-colors hover:text-black">
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-[var(--color-primary)] bg-[var(--color-primary)] px-5 text-sm font-semibold tracking-wide text-[var(--color-secondary)] transition-all hover:bg-[var(--color-primary-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-gold)] focus-visible:ring-offset-2"
              onClick={() => setContactOpen(true)}
            >
              Contact
            </button>
            <Button href="/donate" variant="accent" size="md">
              Donate
            </Button>
          </nav>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/20 md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <span className="text-lg leading-none">{mobileOpen ? "x" : "="}</span>
          </button>
        </div>

        <nav
          className={cn(
            "overflow-hidden bg-white px-4 transition-all duration-300 md:hidden",
            mobileOpen ? "max-h-96 border-t border-black/10 py-3 opacity-100" : "max-h-0 py-0 opacity-0",
          )}
          aria-label="Mobile navigation"
        >
          <div className="min-h-0">
            <div className="flex flex-col gap-1">
              {mobileNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-[var(--color-neutral-gray)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-left text-sm font-medium hover:bg-[var(--color-neutral-gray)]"
                onClick={() => {
                  setMobileOpen(false);
                  setContactOpen(true);
                }}
              >
                Contact
              </button>
            </div>
          </div>
        </nav>
      </header>

      {contactOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Contact Classic Rollers"
          onClick={() => setContactOpen(false)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-2xl border border-black/10 bg-white p-5 shadow-2xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-4xl tracking-wide text-[var(--color-primary)]">Contact Classic Rollers</h2>
                <p className="mt-2 text-sm text-black/75">PO Box 5513, Amarillo, TX 79117</p>
              </div>
              <button
                type="button"
                aria-label="Close contact form"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/15 hover:bg-[var(--color-neutral-gray)]"
                onClick={() => setContactOpen(false)}
              >
                x
              </button>
            </div>
            <ContactForm />
          </div>
        </div>
      ) : null}
    </>
  );
}
