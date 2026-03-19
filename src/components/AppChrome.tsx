"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChromeLessPage = pathname === "/admin" || pathname.startsWith("/preview/");

  if (isChromeLessPage) {
    return <main>{children}</main>;
  }

  return (
    <div className="page-texture min-h-screen">
      <SiteHeader />
      <main className="-mt-24">{children}</main>
      <SiteFooter />
    </div>
  );
}
