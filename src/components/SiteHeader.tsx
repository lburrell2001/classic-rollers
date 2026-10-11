"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ContactForm } from "@/components/ContactForm";
import { DonateTrigger } from "@/components/DonateTrigger";
import { Button } from "@/components/ui/button";
import { scholarshipEnabled } from "@/lib/features";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  ...(scholarshipEnabled ? [{ href: "/scholarship", label: "Scholarship" }] : []),
  { href: "/membership", label: "Membership" },
  { href: "/gallery", label: "Gallery" },
];

// Pages whose hero sits on a dark or colored background behind the transparent header.
const darkHeroPaths = ["/about", "/events", "/scholarship", "/membership", "/gallery", "/donate"];

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
      <path d="M3 6h14M3 10h14M3 14h14" />
    </svg>
  );
}

function Modal({
  label,
  accentClass,
  title,
  subtitle,
  intro,
  onClose,
  children,
}: {
  label: string;
  accentClass: string;
  title: string;
  subtitle: string;
  intro: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
    >
      <div
        className="max-h-[92vh] w-full max-w-lg overflow-auto rounded-t-xl bg-white shadow-xl sm:rounded-lg"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={cn("flex items-start justify-between gap-4 px-5 py-5 text-white sm:px-6", accentClass)}>
          <div>
            <h2 className="font-display text-3xl leading-none tracking-wide">{title}</h2>
            <p className="mt-2 text-sm text-white/85">{subtitle}</p>
            <p className="mt-2 text-sm text-white/85">{intro}</p>
          </div>
          <button
            type="button"
            aria-label="Close"
            className="-mr-2 -mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-white hover:bg-white/15"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
        </div>
        <div className="px-5 py-5 sm:px-6 sm:py-6">{children}</div>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isOverHero = darkHeroPaths.includes(pathname) && !isScrolled && !mobileOpen;
  const useLightHeaderText = isOverHero;
  const useGreenDonateButton = (pathname === "/scholarship" || pathname === "/about") && isOverHero;
  const useLogoBadge = isOverHero;

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

    const openContact = () => setContactOpen(true);

    window.addEventListener("open-donate", openDonate);
    window.addEventListener("open-contact", openContact);
    return () => {
      window.removeEventListener("open-donate", openDonate);
      window.removeEventListener("open-contact", openContact);
    };
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
          "sticky top-0 z-40 transition-colors duration-200",
          isScrolled || mobileOpen ? "border-b border-black/10 bg-white" : "bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-4 sm:h-20 sm:px-6 lg:px-8">
          <Link
            href="/"
            className={cn("inline-flex shrink-0 items-center rounded-md transition-colors", useLogoBadge ? "bg-white px-2.5 py-1.5" : "")}
            aria-label="Classic Rollers home"
          >
            <Image src="/classicrollers-logo.svg" alt="Classic Rollers" width={236} height={85} priority className="h-10 w-auto sm:h-12" />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-md px-2.5 py-2 text-sm font-medium transition-colors lg:px-3",
                    useLightHeaderText
                      ? isActive
                        ? "text-white"
                        : "text-white/75 hover:text-white"
                      : isActive
                        ? "text-black"
                        : "text-black/60 hover:text-black",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              type="button"
              className={cn(
                "ml-2 inline-flex h-9 items-center justify-center rounded-md border px-3.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-green)] focus-visible:ring-offset-2",
                useLightHeaderText ? "border-white/35 text-white hover:bg-white/10" : "border-black/20 text-black hover:bg-black/5",
              )}
              onClick={() => setContactOpen(true)}
            >
              Contact
            </button>
            <DonateTrigger className="ml-2 h-9 px-3.5" colorScheme={useGreenDonateButton ? "on-red" : "default"}>
              Donate
            </DonateTrigger>
          </nav>

          <button
            type="button"
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-md md:hidden",
              useLightHeaderText ? "text-white hover:bg-white/10" : "text-black hover:bg-black/5",
            )}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        <nav
          className={cn(
            "overflow-hidden bg-white px-4 transition-all duration-200 md:hidden",
            mobileOpen ? "max-h-[28rem] border-t border-black/10 pb-4 pt-2 opacity-100" : "max-h-0 opacity-0",
          )}
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "border-b border-black/5 py-3 text-[15px] font-medium",
                  (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)) ? "text-[var(--color-accent-red)]" : "text-black/80",
                )}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-md border border-black/20 text-sm font-semibold text-black"
              onClick={() => {
                setMobileOpen(false);
                setContactOpen(true);
              }}
            >
              Contact
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--color-accent-red)] text-sm font-semibold text-white"
              onClick={() => {
                setMobileOpen(false);
                setDonateOpen(true);
              }}
            >
              Donate
            </button>
          </div>
        </nav>
      </header>

      {contactOpen ? (
        <Modal
          label="Contact Classic Rollers"
          accentClass="bg-[var(--color-accent-red)]"
          title="Contact Classic Rollers"
          subtitle="PO Box 5513, Amarillo, TX 79117"
          intro="Questions about membership, events, or donations? Send us a note."
          onClose={() => setContactOpen(false)}
        >
          <ContactForm />
        </Modal>
      ) : null}

      {donateOpen ? (
        <Modal
          label="Donate to the Ike Avery Scholarship Fund"
          accentClass="bg-[var(--color-accent-green)]"
          title="Donate"
          subtitle="Classic Rollers Car Club is a 501(c)(3)."
          intro="Your gift supports the Ike Avery Scholarship Fund for Amarillo-area students."
          onClose={() => setDonateOpen(false)}
        >
          <dl className="space-y-3 text-sm text-black/75">
            <div>
              <dt className="font-semibold text-black">Checks payable to</dt>
              <dd>Unlimited Classic Rollers Car Club</dd>
            </div>
            <div>
              <dt className="font-semibold text-black">Mail to</dt>
              <dd>PO Box 5513, Amarillo, TX 79117</dd>
            </div>
            <div>
              <dt className="font-semibold text-black">Also welcome</dt>
              <dd>Door prizes and giveaway items for fundraiser events.</dd>
            </div>
          </dl>
          <Button href="/donate" variant="green" className="mt-5 w-full sm:w-auto" onClick={() => setDonateOpen(false)}>
            Fill Out the Donation Form
          </Button>
        </Modal>
      ) : null}
    </>
  );
}
