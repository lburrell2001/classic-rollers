"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import { DonateTrigger } from "@/components/DonateTrigger";
import { cn } from "@/lib/utils";

const desktopNavLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/scholarship", label: "Scholarship" },
  { href: "/gallery", label: "Gallery" },
];

const mobileNavLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/scholarship", label: "Scholarship" },
  { href: "/membership", label: "Membership" },
  { href: "/gallery", label: "Gallery" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const useLightHeaderText = pathname !== "/" && !isScrolled && !mobileOpen;
  const useGreenDonateButton = pathname === "/scholarship" && !isScrolled && !mobileOpen;

  useEffect(() => {
    if (!contactOpen && !donateOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setContactOpen(false);
        setDonateOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [contactOpen, donateOpen]);

  useEffect(() => {
    const openDonate = () => setDonateOpen(true);

    window.addEventListener("open-donate", openDonate);
    return () => window.removeEventListener("open-donate", openDonate);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-colors duration-300",
          isScrolled || mobileOpen ? "border-b border-black/10 bg-white shadow-sm" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className={cn("font-display text-2xl tracking-wide", useLightHeaderText ? "text-white" : "text-black")}>
            Classic Rollers
          </Link>

          <nav className="hidden items-center gap-5 md:flex" aria-label="Main navigation">
            {desktopNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  useLightHeaderText ? "text-white/85 hover:text-white" : "text-black/80 hover:text-black",
                )}
              >
                {link.label}
              </Link>
            ))}
            <button
              type="button"
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-xl px-5 text-sm font-semibold tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-green)] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
                useLightHeaderText
                  ? "border border-white/30 bg-white/10 text-white hover:bg-white/20"
                  : "border border-black/20 bg-white/80 text-black hover:bg-white",
              )}
              onClick={() => setContactOpen(true)}
            >
              Contact
            </button>
            <DonateTrigger size="md" colorScheme={useGreenDonateButton ? "on-red" : "default"}>
              Donate
            </DonateTrigger>
          </nav>

          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-xl md:hidden",
              useLightHeaderText ? "border border-white/30 text-white" : "border border-black/20 text-black",
            )}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <span className="text-lg leading-none">{mobileOpen ? "x" : "="}</span>
          </button>
        </div>

        <nav
          className={cn(
            "overflow-hidden bg-white/95 px-4 transition-all duration-300 md:hidden",
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
                  className="rounded-lg px-3 py-2 text-sm font-medium text-black/85 hover:bg-black/5"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-left text-sm font-medium text-black/85 hover:bg-black/5"
                onClick={() => {
                  setMobileOpen(false);
                  setContactOpen(true);
                }}
              >
                Contact
              </button>
              <button
                type="button"
                className="rounded-lg px-3 py-2 text-left text-sm font-medium text-black/85 hover:bg-black/5"
                onClick={() => {
                  setMobileOpen(false);
                  setDonateOpen(true);
                }}
              >
                Donate
              </button>
            </div>
          </div>
        </nav>
      </header>

      {contactOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Contact Classic Rollers"
          onClick={() => setContactOpen(false)}
        >
          <div
            className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-2xl bg-[linear-gradient(to_bottom,var(--color-accent-red)_0,var(--color-accent-red)_48%,#ffffff_34%,#ffffff_100%)] shadow-2xl sm:max-h-[90vh] sm:bg-[linear-gradient(to_bottom,var(--color-accent-red)_0,var(--color-accent-red)_60%,#ffffff_42%,#ffffff_100%)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="p-5 sm:p-6 md:p-8">
              <div className="mb-10 flex items-start justify-between gap-4 text-white">
                <div>
                  <h2 className="font-display text-3xl tracking-wide text-white sm:text-4xl">Contact Classic Rollers</h2>
                  <p className="mt-2 text-sm text-white/80">PO Box 5513, Amarillo, TX 79117</p>
                  <div className="mt-4 space-y-2 text-sm text-white/85">
                    <p>Use the form to send a message directly from the site.</p>
                    <p>Questions about membership, scholarships, or upcoming events all come through here.</p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Close contact form"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white hover:bg-white/10"
                  onClick={() => setContactOpen(false)}
                >
                  x
                </button>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-[0_18px_45px_rgba(0,0,0,0.08)] sm:p-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {donateOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-3 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Donate to the Ike Avery Scholarship Fund"
          onClick={() => setDonateOpen(false)}
        >
          <div
            className="max-h-[92vh] w-full max-w-2xl overflow-auto rounded-2xl bg-[linear-gradient(to_bottom,var(--color-accent-green)_0,var(--color-accent-green)_42%,#ffffff_32%,#ffffff_100%)] shadow-2xl sm:max-h-[90vh] sm:bg-[linear-gradient(to_bottom,var(--color-accent-green)_0,var(--color-accent-green)_48%,#ffffff_42%,#ffffff_100%)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="p-5 sm:p-6 md:p-8">
              <div className="mb-10 flex items-start justify-between gap-4 text-white">
                <div>
                  <h2 className="font-display text-3xl tracking-wide text-white sm:text-4xl">Donate to the Scholarship Fund</h2>
                  <p className="mt-2 text-sm text-white/80">Classic Rollers Car Club is a 501(c)(3).</p>
                  <div className="mt-4 space-y-2 text-sm text-white/85">
                    <p>Your donation supports the Ike Avery Scholarship Fund for Amarillo-area students.</p>
                    <p>Checks, fundraiser support items, and direct giving are all welcome.</p>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Close donate form"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-white hover:bg-white/10"
                  onClick={() => setDonateOpen(false)}
                >
                  x
                </button>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-[0_18px_45px_rgba(0,0,0,0.08)] sm:p-6">
                <div className="space-y-4 text-black/75">
                  <p>
                    <strong className="text-black">Checks payable to:</strong> Unlimited Classic Rollers Car Club
                  </p>
                  <p>
                    <strong className="text-black">Mail to:</strong> PO Box 5513, Amarillo, TX 79117
                  </p>
                  <p>
                    <strong className="text-black">Also welcome:</strong> Door prizes and giveaway items for fundraiser events.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
