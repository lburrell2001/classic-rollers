"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { InsurancePartnerFeature } from "@/components/InsurancePartnerFeature";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/components/SiteContentProvider";
import { getUpcomingEvents, useNow } from "@/lib/events";
import { scholarshipEnabled } from "@/lib/features";

function getCountdownParts(dateText?: string, currentTime = Date.now()) {
  const timestamp = dateText ? Date.parse(dateText) : Number.NaN;

  if (!Number.isFinite(timestamp)) {
    return [
      { label: "Days", value: "00" },
      { label: "Hours", value: "00" },
      { label: "Minutes", value: "00" },
      { label: "Seconds", value: "00" },
    ];
  }

  const remaining = Math.max(0, timestamp - currentTime);
  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [
    { label: "Days", value: String(days).padStart(2, "0") },
    { label: "Hours", value: String(hours).padStart(2, "0") },
    { label: "Minutes", value: String(minutes).padStart(2, "0") },
    { label: "Seconds", value: String(seconds).padStart(2, "0") },
  ];
}

export function HomeContent() {
  const { content } = useSiteContent();
  const home = content.home;
  const now = useNow();
  const featuredEvent = getUpcomingEvents(content.events.items, now)[0];
  const hasCountdown = Boolean(featuredEvent?.countdownAt);
  const countdown = getCountdownParts(featuredEvent?.countdownAt, now ?? undefined);

  const missions = [
    { title: home.missionOneTitle, body: home.missionOneBody, href: home.missionOneHref, accent: "bg-[var(--color-accent-red)]" },
    { title: home.missionTwoTitle, body: home.missionTwoBody, href: home.missionTwoHref, accent: "bg-[var(--color-accent-green)]" },
    { title: home.missionThreeTitle, body: home.missionThreeBody, href: home.missionThreeHref, accent: "bg-white" },
  ].map((mission) =>
    !scholarshipEnabled && mission.href.startsWith("/scholarship")
      ? { ...mission, title: "Events", body: "Car shows, cruises, and fundraisers around Amarillo all year long.", href: "/events" }
      : mission,
  );

  const galleryImages = content.gallery.images.map((image) => image.src);
  const missionImages = [0, 1, 2].map((index) => galleryImages[index] ?? [home.heroImage, home.welcomeImage, home.joinImage][index]);

  return (
    <>
      <section className="relative overflow-hidden bg-white text-black">
        <div className="absolute inset-0">
          <img src={home.heroImage} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-white/80 sm:bg-transparent sm:bg-linear-to-r sm:from-white/95 sm:via-white/80 sm:via-45% sm:to-transparent" />
        </div>
        <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-center px-4 pb-14 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:min-h-[640px] lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-red)]">{home.heroEyebrow}</p>
          <h1 className="mt-2 max-w-2xl font-display text-5xl leading-[0.9] tracking-wide sm:text-6xl lg:text-7xl">{home.heroTitle}</h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-black/75 sm:text-base">{home.heroDescription}</p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Button href={home.heroPrimaryCtaHref} variant="accent" size="lg">
              {home.heroPrimaryCtaLabel}
            </Button>
            <Button href={home.heroSecondaryCtaHref} variant="green" size="lg">
              {home.heroSecondaryCtaLabel}
            </Button>
          </div>
        </div>
      </section>

      {featuredEvent ? (
        <section className="bg-[var(--color-accent-green)] text-white">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:px-8">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/70">Next event</p>
              <h2 className="mt-1 font-display text-2xl leading-tight tracking-wide sm:text-3xl">{featuredEvent.title}</h2>
              <div className="mt-2 space-y-0.5 text-sm text-white/85">
                <p>{featuredEvent.date}</p>
                {featuredEvent.location ? <p>{featuredEvent.location}</p> : null}
                {featuredEvent.fee ? <p>Admission: {featuredEvent.fee}</p> : null}
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
              {hasCountdown ? (
                <div className="grid grid-cols-4 gap-2">
                  {countdown.map((item) => (
                    <div key={item.label} className="min-w-[3.75rem] rounded-md bg-white/12 px-2 py-2 text-center">
                      <p className="text-lg font-semibold tabular-nums leading-none">{item.value}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wider text-white/70">{item.label}</p>
                    </div>
                  ))}
                </div>
              ) : null}
              <Button href="/events" variant="outline-light">
                Event details
              </Button>
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[var(--color-accent-red)] text-white">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div>
            <h2 className="font-display text-4xl leading-none tracking-wide sm:text-[2.75rem]">{home.welcomeTitle}</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-white/85">{home.welcomeDescription}</p>
            <Link href="/about" className="mt-5 inline-flex h-10 items-center rounded-md bg-white px-4 text-sm font-semibold text-[var(--color-accent-red)] transition-colors hover:bg-white/90">
              About the club
            </Link>
          </div>
          <div className="overflow-hidden rounded-lg">
            <img src={home.welcomeImage} alt="" className="aspect-[4/3] h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div className="order-2 overflow-hidden rounded-lg lg:order-1">
            <img src={home.joinImage} alt="" className="aspect-[4/3] h-full w-full object-cover" />
          </div>
          <div className="order-1 lg:order-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-red)]">{home.joinEyebrow}</p>
            <h2 className="mt-1 font-display text-4xl leading-none tracking-wide sm:text-[2.75rem]">{home.joinTitle}</h2>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-black/70">{home.joinDescription}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <Button
                href={home.joinPrimaryHref}
                variant="green"
              >
                {home.joinPrimaryLabel}
              </Button>
              <Button href={home.joinSecondaryHref} variant="outline">
                {home.joinSecondaryLabel}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <h2 className="font-display text-4xl leading-none tracking-wide sm:text-[2.75rem]">{home.missionTitle}</h2>
          <div className="mt-6 grid gap-3 sm:mt-8 md:grid-cols-3 md:gap-4">
            {missions.map((item, index) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative block aspect-[16/9] overflow-hidden rounded-lg bg-white/10 ring-1 ring-white/10 md:aspect-[4/5]"
              >
                <img
                  src={missionImages[index]}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className={`block h-1 w-8 rounded-full ${item.accent}`} />
                  <h3 className="mt-3 font-display text-3xl leading-none tracking-wide text-white sm:text-4xl">{item.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InsurancePartnerFeature />
    </>
  );
}
