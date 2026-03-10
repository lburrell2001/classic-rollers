export type EventItem = {
  id: string;
  title: string;
  date: string;
  countdownAt: string;
  location: string;
  fee: string;
  contacts: string;
  description: string;
};

export type ScholarshipItem = {
  id: string;
  title: string;
  deadline: string;
  summary: string;
  requirements: string[];
  howToApply: string;
  contact: string;
  applicationLabel: string;
  applicationUrl: string;
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
};

export type SiteContent = {
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    heroPrimaryCtaLabel: string;
    heroPrimaryCtaHref: string;
    heroSecondaryCtaLabel: string;
    heroSecondaryCtaHref: string;
    heroTertiaryCtaLabel: string;
    heroTertiaryCtaHref: string;
    heroImage: string;
    welcomeEyebrow: string;
    welcomeTitle: string;
    welcomeDescription: string;
    statOneLabel: string;
    statOneValue: string;
    statTwoLabel: string;
    statTwoValue: string;
    statThreeLabel: string;
    statThreeValue: string;
    welcomeImage: string;
    joinEyebrow: string;
    joinTitle: string;
    joinDescription: string;
    joinPrimaryLabel: string;
    joinPrimaryHref: string;
    joinSecondaryLabel: string;
    joinSecondaryHref: string;
    joinImage: string;
    missionEyebrow: string;
    missionTitle: string;
    missionOneTitle: string;
    missionOneBody: string;
    missionOneHref: string;
    missionTwoTitle: string;
    missionTwoBody: string;
    missionTwoHref: string;
    missionThreeTitle: string;
    missionThreeBody: string;
    missionThreeHref: string;
  };
  events: {
    eyebrow: string;
    title: string;
    description: string;
    items: EventItem[];
  };
  scholarship: {
    eyebrow: string;
    title: string;
    description: string;
    downloadsTitle: string;
    downloadsDescription: string;
    items: ScholarshipItem[];
  };
  membership: {
    eyebrow: string;
    title: string;
    description: string;
    detailsTitle: string;
    annualDues: string;
    meetings: string;
    applicationLabel: string;
    applicationUrl: string;
    benefitsTitle: string;
    benefitsBody: string;
    fitTitle: string;
    fitBody: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    description: string;
    images: GalleryImage[];
  };
};

function makeGalleryImage(index: number): GalleryImage {
  const number = String(index + 1).padStart(2, "0");
  return {
    id: `gallery-${number}`,
    src: `/gallery/car-${number}.svg`,
    alt: `Classic Rollers car placeholder ${index + 1}`,
  };
}

export const defaultSiteContent: SiteContent = {
  home: {
    heroEyebrow: "Established 1985",
    heroTitle: "Classic Rollers Car Club",
    heroDescription: "A community of classic car enthusiasts in Amarillo, Texas dedicated to preserving automotive history, celebrating craftsmanship, and bringing people together through a shared love of vintage rides.",
    heroPrimaryCtaLabel: "Donate",
    heroPrimaryCtaHref: "/donate",
    heroSecondaryCtaLabel: "Join",
    heroSecondaryCtaHref: "/membership",
    heroTertiaryCtaLabel: "Scholarship Info",
    heroTertiaryCtaHref: "/scholarship",
    heroImage: "/gallery/car-01.svg",
    welcomeEyebrow: "Welcome",
    welcomeTitle: "Welcome to the Home of Classic Rollers",
    welcomeDescription:
      "We are a nonprofit 501(c)(3) and every event funds scholarships for Amarillo-area students through the Ike Avery Scholarship Fund.",
    statOneLabel: "Members",
    statOneValue: "185",
    statTwoLabel: "Miles Driven",
    statTwoValue: "48,137",
    statThreeLabel: "Scholarships",
    statThreeValue: "219",
    welcomeImage: "/gallery/car-02.svg",
    joinEyebrow: "Become One of Us",
    joinTitle: "Join the Club",
    joinDescription: "Join Classic Rollers Car Club and connect with fellow enthusiasts while supporting events, community programs, and scholarships in Amarillo.",
    joinPrimaryLabel: "Become a Member",
    joinPrimaryHref: "/membership",
    joinSecondaryLabel: "Support Scholarships",
    joinSecondaryHref: "/donate",
    joinImage: "/gallery/car-03.svg",
    missionEyebrow: "What We Do",
    missionTitle: "Our Missions",
    missionOneTitle: "Donate",
    missionOneBody: "Support the Ike Avery Scholarship Fund with tax-deductible giving.",
    missionOneHref: "/donate",
    missionTwoTitle: "Membership",
    missionTwoBody: "Join a welcoming car community. All Cars Welcome.",
    missionTwoHref: "/membership",
    missionThreeTitle: "Scholarships",
    missionThreeBody: "Help students apply for Ike Avery Scholarship opportunities.",
    missionThreeHref: "/scholarship",
  },
  events: {
    eyebrow: "Events",
    title: "Upcoming Events",
    description: "Join us in person to support student scholarships.",
    items: [
      {
        id: "event-1",
        title: "Ike Avery Scholarship Breakfast Fundraiser",
        date: "Saturday, March 28, 2026 — 7:00 AM to 11:00 AM",
        countdownAt: "2026-03-28T07:00",
        location: "Cultural Center, 901 N. Hayden St., Amarillo, TX 79107",
        fee: "$8 (All-you-can-eat pancakes)",
        contacts: "Thurman Jefferson: 806-433-6872 | Johnny Turner: 806-236-9367 | Art Spencer: 806-367-4862",
        description: "Come out for pancakes, fellowship, and direct support for Amarillo-area student scholarships.",
      },
    ],
  },
  scholarship: {
    eyebrow: "Scholarships",
    title: "Scholarship Opportunities",
    description: "Review each scholarship below, check the requirements, and download the correct application materials.",
    downloadsTitle: "Applications",
    downloadsDescription: "Each scholarship can have its own deadline, requirements, contact, and application link.",
    items: [
      {
        id: "scholarship-1",
        title: "Ike Avery Scholarship 2026",
        deadline: "Postmarked by March 1, 2026",
        summary: "Support for Amarillo-area students through the Unlimited Classic Rollers scholarship fund.",
        requirements: ["Application", "Official transcript", "Essay: Why do you deserve the scholarship", "Two personal reference sheets"],
        howToApply:
          "Assemble all required documents and mail your packet to UCR - Ike Avery Scholarship Fund, P.O. Box 5513, Amarillo, TX 79117.",
        contact: "Thurman Jefferson - (806) 433-6872",
        applicationLabel: "Download Scholarship Application",
        applicationUrl: "/forms/scholarship-application.pdf",
      },
    ],
  },
  membership: {
    eyebrow: "Membership",
    title: "Join Classic Rollers",
    description: "All Cars Welcome.",
    detailsTitle: "Membership Details",
    annualDues: "$40",
    meetings: "Every 2nd Tuesday",
    applicationLabel: "Download Membership Application",
    applicationUrl: "/forms/membership-application.pdf",
    benefitsTitle: "Benefits",
    benefitsBody: "Club fellowship, community events, and direct support for Amarillo student scholarships.",
    fitTitle: "Who Should Join",
    fitBody: "Any classic car enthusiast who wants to serve the community and represent the culture with pride.",
  },
  gallery: {
    eyebrow: "Gallery",
    title: "Classic Rollers Showcase",
    description: "Send us photos to be featured.",
    images: Array.from({ length: 12 }, (_, index) => makeGalleryImage(index)),
  },
};

function mergeArrayValue(defaultValue: unknown[], savedValue: unknown[]) {
  if (!defaultValue.length) {
    return savedValue;
  }

  if (typeof defaultValue[0] === "object" && defaultValue[0] !== null) {
    return savedValue.map((item, index) =>
      mergeWithDefaults(defaultValue[index] ?? defaultValue[0], item),
    );
  }

  return savedValue;
}

export function mergeWithDefaults<T>(defaults: T, saved: unknown): T {
  if (Array.isArray(defaults)) {
    return (Array.isArray(saved) ? mergeArrayValue(defaults, saved) : defaults) as T;
  }

  if (typeof defaults !== "object" || defaults === null) {
    return (saved === undefined ? defaults : saved) as T;
  }

  const result: Record<string, unknown> = { ...(defaults as Record<string, unknown>) };
  const savedRecord = typeof saved === "object" && saved !== null ? (saved as Record<string, unknown>) : {};

  Object.keys(result).forEach((key) => {
    result[key] = mergeWithDefaults(result[key], savedRecord[key]);
  });

  return result as T;
}

export function cloneDefaultSiteContent() {
  return JSON.parse(JSON.stringify(defaultSiteContent)) as SiteContent;
}
