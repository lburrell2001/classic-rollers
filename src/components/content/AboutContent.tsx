"use client";

/* eslint-disable @next/next/no-img-element */

import { Button } from "@/components/ui/button";
import { useSiteContent } from "@/components/SiteContentProvider";

const pillars = [
  {
    title: "Shows & Cruises",
    body: "We get together to show off our rides, swap stories, and enjoy the open road around Amarillo.",
  },
  {
    title: "Giving Back",
    body: "Our fundraisers support Amarillo-area students through the Ike Avery Scholarship Fund.",
  },
  {
    title: "Fellowship",
    body: "Monthly meetings and events keep members connected long after the engines cool down.",
  },
];

export function AboutContent() {
  const { content } = useSiteContent();
  const photos = content.gallery.images.map((image) => image.src);
  const storyPhoto = photos[0] ?? content.home.welcomeImage;
  const sidePhotos = [photos[1] ?? content.home.joinImage, photos[2] ?? content.home.heroImage];

  return (
    <>
      <section className="bg-[var(--color-accent-red)] text-white">
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28 lg:px-8 lg:pt-32">
          <h1 className="font-display text-5xl leading-[0.9] tracking-wide sm:text-6xl">Classic Rollers Since 1985</h1>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/90 sm:text-base">
            Unlimited Classic Rollers Car Club is an Amarillo, Texas car club and nonprofit 501(c)(3). We bring people together around a shared
            love of classic cars, and we put that passion to work for local students.
          </p>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:px-8">
          <div className="overflow-hidden rounded-lg">
            <img src={storyPhoto} alt="" className="aspect-[4/3] w-full object-cover" />
          </div>
          <div>
            <h2 className="font-display text-4xl leading-none tracking-wide sm:text-[2.75rem]">Who We Are</h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-black/70">
              <p>
                We&apos;re a community-focused classic car club rooted in fellowship, service, and pride in Amarillo. Our members drive
                everything from lifelong restorations to weekend cruisers, and every one of them has a seat at the table.
              </p>
              <p>
                As a 501(c)(3), the club does more than show cars. Every fundraiser we host supports the Ike Avery Scholarship Fund and helps
                Amarillo-area students take their next step.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-black text-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Our motto</p>
          <p className="mt-2 font-display text-6xl leading-[0.85] tracking-wide sm:text-8xl lg:text-9xl">
            All Cars <span className="text-[var(--color-accent-red)]">Welcome.</span>
          </p>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-base">
            Every style, every era, every enthusiast. You don&apos;t need a show winner to belong here, just a love for the ride.
          </p>
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-14 lg:px-8">
          <div>
            <h2 className="font-display text-4xl leading-none tracking-wide sm:text-[2.75rem]">What We Do</h2>
            <dl className="mt-6 space-y-6">
              {pillars.map((pillar) => (
                <div key={pillar.title}>
                  <dt className="font-display text-2xl tracking-wide text-[var(--color-accent-green)]">{pillar.title}</dt>
                  <dd className="mt-1 text-[15px] leading-relaxed text-black/70">{pillar.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <img src={sidePhotos[0]} alt="" className="aspect-[3/4] w-full rounded-lg object-cover" />
            <img src={sidePhotos[1]} alt="" className="mt-8 aspect-[3/4] w-full rounded-lg object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-accent-green)] text-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-5 px-4 py-10 sm:px-6 md:flex-row md:items-center lg:px-8">
          <div>
            <h2 className="font-display text-3xl leading-none tracking-wide sm:text-4xl">Come Ride With Us</h2>
            <p className="mt-2 max-w-xl text-[15px] text-white/85">
              Annual dues: {content.membership.annualDues} · Meetings: {content.membership.meetings}
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button href="/membership" variant="light" size="lg">
              Become a Member
            </Button>
            <Button href="/donate" variant="outline-light" size="lg">
              Donate
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
