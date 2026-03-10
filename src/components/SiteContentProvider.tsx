"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { cloneDefaultSiteContent, mergeWithDefaults, type SiteContent } from "@/lib/site-content";

type SiteContentContextValue = {
  content: SiteContent;
  setContent: (value: SiteContent) => void;
  resetContent: () => void;
  isHydrated: boolean;
};

const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<SiteContent>(cloneDefaultSiteContent);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadContent() {
      try {
        const response = await fetch("/api/content", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to load published site content.");
        }

        const payload = (await response.json()) as { content?: SiteContent };
        if (isMounted && payload.content) {
          setContentState(mergeWithDefaults(cloneDefaultSiteContent(), payload.content));
        }
      } catch {
        if (isMounted) {
          setContentState(cloneDefaultSiteContent());
        }
      } finally {
        if (isMounted) {
          setIsHydrated(true);
        }
      }
    }

    void loadContent();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!window.location.pathname.startsWith("/preview/")) {
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) {
        return;
      }

      if (event.data?.type !== "classic-rollers-preview-update") {
        return;
      }

      setContentState(mergeWithDefaults(cloneDefaultSiteContent(), event.data.payload));
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const setContent = (value: SiteContent) => {
    setContentState(value);
  };

  const resetContent = () => {
    setContentState(cloneDefaultSiteContent());
  };

  const value = useMemo(
    () => ({
      content,
      setContent,
      resetContent,
      isHydrated,
    }),
    [content, isHydrated],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function SiteContentPreviewProvider({
  children,
  content,
}: {
  children: ReactNode;
  content: SiteContent;
}) {
  const value = useMemo(
    () => ({
      content,
      setContent: () => {},
      resetContent: () => {},
      isHydrated: true,
    }),
    [content],
  );

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error("useSiteContent must be used within SiteContentProvider");
  }
  return context;
}
