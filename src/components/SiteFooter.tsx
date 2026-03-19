import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-black text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
        <div>
          <Link href="/" className="inline-flex rounded-2xl bg-white px-4 py-3" aria-label="Classic Rollers home">
            <Image src="/classicrollers-logo.svg" alt="Classic Rollers" width={254} height={91} className="h-[4.5rem] w-auto" />
          </Link>
          <p className="mt-4 text-sm text-white">PO Box 5513, Amarillo, TX 79117</p>
          <p className="mt-2 text-xs text-white">© {new Date().getFullYear()} Unlimited Classic Rollers Car Club. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/membership"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold tracking-wide transition hover:border-[var(--color-accent-green)] hover:bg-[var(--color-accent-green)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-green)] focus-visible:ring-offset-2"
          >
            Membership
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold tracking-wide transition hover:border-[var(--color-accent-red)] hover:bg-[var(--color-accent-red)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-green)] focus-visible:ring-offset-2"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
