"use client";

import { motion } from "framer-motion";
import type { TimelineEvent } from "@/types";
import { useScrollReveal } from "@/components/shared/scroll-reveal";

function TimelineItem({
  event,
  index,
}: {
  event: TimelineEvent;
  index: number;
}) {
  const reveal = useScrollReveal({
    index,
    duration: 1.4,
    y: 48,
  });

  return (
    <motion.div
      ref={reveal.ref}
      initial={reveal.initial}
      animate={reveal.animate}
      transition={reveal.transition}
      className={`relative mb-8 flex items-start gap-8 md:mb-10 ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div
        className={`flex-1 pl-12 md:pl-0 ${
          index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
        }`}
      >
        <span className="text-2xl font-bold text-primary">{event.year}</span>
        <h3 className="mt-1 text-lg font-semibold">{event.title}</h3>
        <p className="mt-2 text-muted-foreground">{event.description}</p>
      </div>
      <div className="absolute left-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-primary bg-background md:left-1/2">
        <div className="h-2 w-2 rounded-full bg-primary" />
      </div>
      <div className="hidden flex-1 md:block" />
    </motion.div>
  );
}

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-px" />
      {events.map((event, index) => (
        <TimelineItem key={event.id} event={event} index={index} />
      ))}
    </div>
  );
}
