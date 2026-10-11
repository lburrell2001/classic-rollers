import Image from "next/image";
import Link from "next/link";
import { insurancePartner } from "@/lib/insurance-partner";

const footerLinks = [
  { href: "/events", label: "Events" },
  { href: "/membership", label: "Membership" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/donate", label: "Donate" },
];

export function SiteFooter() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex rounded-md bg-white px-2.5 py-1.5" aria-label="Classic Rollers home">
            <Image src="/classicrollers-logo.svg" alt="Classic Rollers" width={254} height={91} className="h-10 w-auto" />
          </Link>
          <p className="mt-4 text-sm text-white/70">Unlimited Classic Rollers Car Club</p>
          <p className="text-sm text-white/70">PO Box 5513, Amarillo, TX 79117</p>
        </div>

        <nav aria-label="Footer navigation">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Explore</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/80 hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">Classic Car Insurance</p>
          <a
            href={insurancePartner.classicCarPage}
            target="_blank"
            rel="noopener"
            className="mt-3 inline-block text-sm font-semibold text-white hover:text-[var(--color-accent-green)]"
          >
            Need classic car insurance? Get a quote →
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Unlimited Classic Rollers Car Club. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p>
              Site by{" "}
              <a href="https://thrivecreativestudios.org" target="_blank" rel="noopener" className="text-white/70 underline-offset-2 hover:text-white hover:underline">
                Thrive Creative Studios
              </a>
            </p>
            <Link href="/admin" className="hover:text-white">
              Admin login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
