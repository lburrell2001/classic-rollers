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
    <div className="flex min-h-screen flex-col bg-white">
      <SiteHeader />
      <main className="-mt-16 flex-1 sm:-mt-20">{children}</main>
      <SiteFooter />
    </div>
  );
}
