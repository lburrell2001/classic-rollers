export function SiteFooter() {
  return (
    <footer className="bg-[var(--color-primary)] text-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="font-display text-2xl tracking-wide">Unlimited Classic Rollers Car Club</p>
        <p className="mt-3 text-sm text-white/85">PO Box 5513, Amarillo, TX 79117</p>
        <p className="mt-2 text-xs text-white/70">© {new Date().getFullYear()} Unlimited Classic Rollers Car Club. All rights reserved.</p>
      </div>
    </footer>
  );
}
