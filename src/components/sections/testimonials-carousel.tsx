"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Testimonial } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollReveal } from "@/components/shared/scroll-reveal";

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  showViewAll?: boolean;
}

export function TestimonialsCarousel({
  testimonials,
  showViewAll = true,
}: TestimonialsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4500, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <ScrollReveal index={0} duration={1.5} className="relative">
      <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
        <div className="flex gap-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="min-w-0 flex-[0_0_100%] px-1 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <Card className="h-full border-border/50 bg-gradient-to-br from-card to-card/50 shadow-lg transition-shadow hover:shadow-xl hover:shadow-primary/5">
                <CardContent className="flex h-full flex-col p-6 sm:p-8">
                  <div className="flex items-start justify-between">
                    <Quote className="h-10 w-10 text-primary/40" />
                    {testimonial.metric && (
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                        {testimonial.metric}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 flex-1 text-base leading-relaxed text-muted-foreground">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-4 border-t border-border pt-6">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={52}
                      height={52}
                      className="rounded-xl object-cover ring-2 ring-primary/20"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold truncate">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {testimonial.role}, {testimonial.company}
                      </p>
                      {testimonial.service && (
                        <p className="mt-0.5 text-xs text-primary">
                          {testimonial.service}
                        </p>
                      )}
                      <div className="mt-2 flex gap-0.5">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-primary text-primary"
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            aria-label="Previous testimonial"
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            aria-label="Next testimonial"
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        {showViewAll && (
          <Button asChild variant="ghost">
            <Link href="/testimonials">View all client stories →</Link>
          </Button>
        )}
      </div>
    </ScrollReveal>
  );
}
