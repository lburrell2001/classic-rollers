"use client";

import { Section } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { useSiteContent } from "@/components/SiteContentProvider";
import { getUpcomingEvents, useNow } from "@/lib/events";

export function EventsContent() {
  const { content } = useSiteContent();
  const events = content.events;
  const now = useNow(60_000);
  const upcoming = getUpcomingEvents(events.items, now);

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,black_0,black_50vh,#ffffff_25vh,#ffffff_100%)]">
      <Section
        eyebrow={events.eyebrow}
        title={events.title}
        description={events.description}
        className="pt-24 text-white sm:pt-28 lg:pt-32"
        titleClassName="text-white"
        descriptionClassName="text-white/70"
      >
        <div className="grid gap-4">
          {now === null ? null : upcoming.length ? (
            upcoming.map((event, index) => (
              <Card key={event.id} className={index === 0 ? "border-[var(--color-accent-green)]" : ""}>
                <h3 className="font-display text-2xl leading-tight tracking-wide sm:text-3xl">{event.title}</h3>
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
            ))
          ) : (
            <Card>
              <p className="text-black/70">No upcoming events right now. Check back soon for the next show or fundraiser.</p>
            </Card>
          )}
        </div>
      </Section>
    </div>
  );
}
