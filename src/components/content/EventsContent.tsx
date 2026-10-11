"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSiteContent } from "@/components/SiteContentProvider";
import { getUpcomingEvents, useNow } from "@/lib/events";

export function EventsContent() {
  const { content } = useSiteContent();
  const events = content.events;
  const now = useNow(60_000);
  const upcoming = getUpcomingEvents(events.items, now);

  const pastPhotos = content.gallery.images.slice(0, 4);

  return (
    <>
      <section className="bg-black text-white">
        <div className="mx-auto w-full max-w-6xl px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28 lg:px-8 lg:pt-32">
          <h1 className="font-display text-4xl leading-none tracking-wide sm:text-[2.75rem]">{events.title}</h1>
          {events.description ? <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/70 sm:text-base">{events.description}</p> : null}
        </div>
      </section>

      <section className="bg-white text-black">
        <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          {now === null ? (
            <div className="min-h-64" />
          ) : upcoming.length ? (
            <div className="grid gap-4">
              {upcoming.map((event, index) => (
                <Card key={event.id} className={index === 0 ? "border-[var(--color-accent-green)]" : ""}>
                  <h2 className="font-display text-2xl leading-tight tracking-wide sm:text-3xl">{event.title}</h2>
                  {event.description ? <p className="mt-3 text-sm text-black/70">{event.description}</p> : null}
                  <dl className="mt-5 grid gap-x-6 gap-y-3 border-t border-black/10 pt-5 text-sm sm:grid-cols-[6rem_1fr]">
                    {[
                      ["When", event.date],
                      ["Where", event.location],
                      ["Fee", event.fee],
                      ["Contacts", event.contacts],
                    ].map(([label, value]) =>
                      value ? (
                        <div key={label} className="contents">
                          <dt className="font-semibold text-black">{label}</dt>
                          <dd className="-mt-2 text-black/70 sm:mt-0">{value}</dd>
                        </div>
                      ) : null,
                    )}
                  </dl>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent-red)]">Nothing on the calendar yet</p>
                <h2 className="mt-1 font-display text-3xl leading-none tracking-wide sm:text-4xl">The next event is on its way</h2>
                <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-black/70">
                  Our next car show, cruise, or fundraiser will be posted here as soon as it&apos;s set. Members hear about events first, and
                  we&apos;re always glad to hear from groups who want to host or sponsor one with us.
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  <Button href="/membership" variant="green">
                    Become a Member
                  </Button>
                  <Button type="button" variant="outline" onClick={() => window.dispatchEvent(new Event("open-contact"))}>
                    Contact Us
                  </Button>
                </div>
              </div>

              {pastPhotos.length ? (
                <div>
                  <div className="grid grid-cols-2 gap-2">
                    {pastPhotos.map((image) => (
                      <Link key={image.id} href="/gallery" className="group block aspect-square overflow-hidden rounded-md bg-black/5">
                        <img src={image.src} alt={image.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </Link>
                    ))}
                  </div>
                  <Link href="/gallery" className="mt-3 inline-block text-sm font-semibold underline-offset-4 hover:underline">
                    See photos from past events →
                  </Link>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
