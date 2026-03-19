"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isChromeLessPage = pathname === "/admin" || pathname.startsWith("/preview/");
  const mainClassName = pathname === "/" ? "-mt-24" : "page-offset";

  if (isChromeLessPage) {
    return <main>{children}</main>;
  }

  return (
    <div className="page-texture min-h-screen">
      <SiteHeader />
      <main className={mainClassName}>{children}</main>
      <SiteFooter />
    </div>
  );
}
