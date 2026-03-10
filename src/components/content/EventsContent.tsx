"use client";

import { Section } from "@/components/Section";
import { Card } from "@/components/ui/card";
import { useSiteContent } from "@/components/SiteContentProvider";

export function EventsContent() {
  const { content } = useSiteContent();
  const events = content.events;

  return (
    <div className="min-h-screen bg-[linear-gradient(to_bottom,var(--color-accent-green)_0,var(--color-accent-green)_50vh,#ffffff_25vh,#ffffff_100%)]">
      <Section
        eyebrow={events.eyebrow}
        title={events.title}
        description={events.description}
        className="pt-32 text-white lg:pt-40"
        titleClassName="text-white"
        descriptionClassName="text-white/70"
      >
        <div className="grid gap-4">
          {events.items.length ? (
            events.items.map((event, index) => (
              <Card key={event.id} className={index === 0 ? "border-[var(--color-accent-green)]" : ""}>
                <h3 className="font-display text-4xl tracking-wide">{event.title}</h3>
                {event.description ? <p className="mt-3 text-sm text-black/70">{event.description}</p> : null}
                <div className="mt-5 space-y-2 text-black/75">
                  <p>
                    <strong>When:</strong> {event.date}
                  </p>
                  <p>
                    <strong>Where:</strong> {event.location}
                  </p>
                  <p>
                    <strong>Fee:</strong> {event.fee}
                  </p>
                  <p>
                    <strong>Contacts:</strong> {event.contacts}
                  </p>
                </div>
              </Card>
            ))
          ) : (
            <Card>
              <p className="text-black/70">No events are currently listed.</p>
            </Card>
          )}
        </div>
      </Section>
    </div>
  );
}
