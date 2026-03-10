"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/components/SiteContentProvider";

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
  const featuredEvent = content.events.items[0];
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setNow(Date.now());
    });
    const interval = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(interval);
    };
  }, [featuredEvent?.countdownAt]);

  const countdown = now === null ? getCountdownParts(undefined) : getCountdownParts(featuredEvent?.countdownAt, now);

  return (
    <>
      <section className="relative min-h-[75vh] overflow-hidden bg-white text-black">
        <div className="absolute inset-0">
          <img src={home.heroImage} alt={home.heroTitle} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/75 via-45% to-transparent" />
        </div>
        <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-center px-4 pb-20 pt-40 text-black sm:px-6 lg:px-8 lg:pt-48">
          <h1 className="max-w-3xl font-display text-5xl leading-[0.95] tracking-wide [text-shadow:0_2px_16px_rgba(255,255,255,0.35)] sm:text-7xl">
            {home.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl rounded-2xl bg-white/0 px-4 py-3 text-base text-black/80 backdrop-blur-[0px] sm:text-lg">
            {home.heroDescription}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={home.heroPrimaryCtaHref} variant="accent" size="lg">
              {home.heroPrimaryCtaLabel}
            </Button>
            <Button
              href={home.heroSecondaryCtaHref}
              variant="primary"
              size="lg"
              className="border border-[var(--color-accent-green)] bg-[var(--color-accent-green)] text-white hover:brightness-110"
            >
              {home.heroSecondaryCtaLabel}
            </Button>
            
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-[var(--color-accent-green)] text-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-12 py-8 sm:px-6 xl:flex-row xl:items-center xl:justify-between xl:px-8 border-black/30">
          <div className="min-w-0 xl:max-w-3xl">
            <h2 className="font-display text-3xl tracking-wide sm:text-4xl">{featuredEvent?.title ?? "No upcoming event posted yet"}</h2>
            <div className="mt-3 flex flex-col gap-2 text-sm text-white/85 sm:text-base">
              <p>{featuredEvent?.date ?? "Add an event from the admin page."}</p>
              {featuredEvent?.location ? <p>{featuredEvent.location}</p> : null}
              {featuredEvent?.fee ? <p>Admission: {featuredEvent.fee}</p> : null}
            </div>
          </div>
          <div className="flex flex-col items-start gap-4 xl:items-end">
            <div className="grid grid-cols-4 gap-3">
              {countdown.map((item) => (
                <div key={item.label} className="min-w-[88px] rounded-xl border border-black/10 bg-white px-3 py-4 text-center shadow-sm">
                  <p className="text-2xl font-semibold text-black">{item.value}</p>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-black/60">{item.label}</p>
                </div>
              ))}
            </div>
            <Button href="/donate" variant="accent" className="w-full sm:w-auto">
              Donate to the Scholarship Fund
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <h2 className="font-display text-4xl tracking-wide sm:text-5xl">{home.welcomeTitle}</h2>
            <p className="mt-4 text-sm text-black/70">{home.welcomeDescription}</p>
            <div className="mt-8 grid grid-cols-1 gap-4">
              {[
                {
                  title: "Community First",
                  body: "Built on fellowship, service, and pride in every event we host.",
                },
                {
                  title: "Scholarships",
                  body: "Fundraisers directly support Amarillo-area students through the Ike Avery Scholarship Fund.",
                },
                {
                  title: "All Cars Welcome",
                  body: "From longtime cruisers to first-time members, there is a place for every enthusiast here.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  tabIndex={0}
                  className="group rounded-2xl border border-[var(--color-accent-red)] bg-white px-5 py-5 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--color-accent-red)] hover:shadow-[0_18px_45px_rgba(227,27,35,0.12)] focus:-translate-y-1 focus:bg-[var(--color-accent-red)] focus:shadow-[0_18px_45px_rgba(227,27,35,0.12)] focus:outline-none"
                >
                  <p className="text-xl font-semibold text-[var(--color-accent-red)] transition-colors duration-300 group-hover:text-white group-focus:text-white">
                    {item.title}
                  </p>
                  <div className="grid transition-all duration-300 [grid-template-rows:0fr] group-hover:[grid-template-rows:1fr] group-focus:[grid-template-rows:1fr]">
                    <div className="overflow-hidden">
                      <p className="mt-3 text-sm text-white opacity-0 transition-opacity duration-200 delay-75 group-hover:opacity-100 group-focus:opacity-100">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
            <img src={home.welcomeImage} alt={home.welcomeTitle} className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
            <img src={home.joinImage} alt={home.joinTitle} className="h-full w-full object-cover" />
          </div>
          <div className="flex h-full min-h-[180px] flex-col justify-center rounded-2xl border border-black/0 bg-white p-12 text-black ">
            <div>
              <h3 className="font-display text-3xl tracking-wide">{home.joinTitle}</h3>
              <p className="mt-3 max-w-xl text-sm text-black/70">{home.joinDescription}</p>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button
                href={home.joinPrimaryHref}
                variant="primary"
                className="border border-[var(--color-accent-green)] bg-[var(--color-accent-green)] text-white hover:brightness-110"
              >
                {home.joinPrimaryLabel}
              </Button>
              <Button href={home.joinSecondaryHref} variant="accent">
                {home.joinSecondaryLabel}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-4xl tracking-wide sm:text-5xl">{home.missionTitle}</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: home.missionOneTitle,
                body: home.missionOneBody,
                href: home.missionOneHref,
                cardClass: "border-[var(--color-accent-red)]/20 bg-[var(--color-accent-red)] text-white!",
                buttonClass: "border-white text-white hover:bg-white/20",
              },
              {
                title: home.missionTwoTitle,
                body: home.missionTwoBody,
                href: home.missionTwoHref,
                cardClass: "border-[var(--color-accent-green)]/20 bg-[var(--color-accent-green)] text-white!",
                buttonClass: "border-white text-white hover:bg-white/20",
              },
              {
                title: home.missionThreeTitle,
                body: home.missionThreeBody,
                href: home.missionThreeHref,
                cardClass: "border-black/15 bg-black text-white!",
                buttonClass: "border-white text-white hover:bg-white/20",
              },
            ].map((item) => (
              <div key={item.title} className={`rounded-2xl border p-6 shadow-sm ${item.cardClass}`}>
                <h3 className={`font-display text-2xl tracking-wide ${item.titleClass ?? "text-white"}`}>{item.title}</h3>
                <p className={`mt-3 text-sm ${item.bodyClass ?? "text-white/85"}`}>{item.body}</p>
                <Button href={item.href} variant="outline" className={`mt-5 ${item.buttonClass}`}>
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
