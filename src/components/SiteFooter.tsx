import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-black text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-8">
        <div>
          <p className="font-display text-2xl tracking-wide">Unlimited Classic Rollers Car Club</p>
          <p className="mt-3 text-sm text-white/70">PO Box 5513, Amarillo, TX 79117</p>
          <p className="mt-2 text-xs text-white/60">© {new Date().getFullYear()} Unlimited Classic Rollers Car Club. All rights reserved.</p>
        </div>
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold tracking-wide transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-green)] focus-visible:ring-offset-2"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
