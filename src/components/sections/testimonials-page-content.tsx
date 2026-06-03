"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";
import type { Testimonial } from "@/types";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/sections/hero";
import { TestimonialsCarousel } from "@/components/sections/testimonials-carousel";
import { CTASection } from "@/components/sections/cta-section";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { testimonialStats } from "@/data/testimonials";
import { WHATSAPP_URL } from "@/lib/constants";

interface TestimonialsPageContentProps {
  testimonials: Testimonial[];
  featured?: Testimonial;
}

export function TestimonialsPageContent({
  testimonials,
  featured,
}: TestimonialsPageContentProps) {
  const hero = featured ?? testimonials[0];

  return (
    <>
      <Hero
        title="Our Clients Love Us"
        subtitle="Real brands. Real results. Hear from leaders who trusted Wolfrayet Media to transform their digital growth."
        showCta={false}
        compact
        hideEyebrow
      />

      <AnimatedSection compact>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-4xl"
          >
            <div className="glass-card relative overflow-hidden p-8 sm:p-12">
              <Quote className="absolute right-8 top-8 h-16 w-16 text-primary/10" />
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <Image
                  src={hero.avatar}
                  alt={hero.name}
                  width={96}
                  height={96}
                  className="rounded-2xl object-cover ring-2 ring-primary/30"
                />
                <div className="flex-1">
                  <div className="flex gap-1">
                    {Array.from({ length: hero.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-xl font-medium leading-relaxed sm:text-2xl">
                    &ldquo;{hero.content}&rdquo;
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-4">
                    <div>
                      <p className="font-bold">{hero.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {hero.role}, {hero.company}
                      </p>
                    </div>
                    {hero.metric && (
                      <span className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                        {hero.metric}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4"
          >
            {testimonialStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card/50 p-6 text-center"
              >
                <p className="text-3xl font-bold text-primary">
                  {stat.value}
                  <span className="text-lg">{stat.suffix}</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
      </AnimatedSection>

      <AnimatedSection>
        <SectionHeading
          eyebrow="Reviews"
          title="What Our Clients Say"
          description="Swipe through stories from CEOs, CMOs, and founders across industries."
        />
        <TestimonialsCarousel testimonials={testimonials} showViewAll={false} />
      </AnimatedSection>

      <AnimatedSection className="bg-muted/20">
        <SectionHeading
          eyebrow="All Reviews"
          title="Every Success Story"
          description="Detailed feedback from partners who achieved measurable growth."
        />
        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((t, index) => (
            <motion.article
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass-card flex flex-col p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={56}
                    height={56}
                    className="rounded-xl object-cover"
                  />
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
              </div>
              {t.service && (
                <span className="mt-4 inline-flex w-fit rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                  {t.service}
                </span>
              )}
              <p className="mt-4 flex-1 text-muted-foreground leading-relaxed">
                &ldquo;{t.content}&rdquo;
              </p>
              {t.metric && (
                <p className="mt-4 text-sm font-semibold text-primary">
                  Result: {t.metric}
                </p>
              )}
            </motion.article>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <div className="rounded-3xl border border-[#25D366]/30 bg-[#25D366]/5 p-8 text-center sm:p-12">
          <h3 className="text-2xl font-bold">Join 120+ Happy Clients</h3>
          <p className="mx-auto mt-2 max-w-lg text-muted-foreground">
            Ready to write your success story? Chat with us on WhatsApp or book a
            free strategy call.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#20BD5A] text-white">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Message on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <CTASection />
      </AnimatedSection>
    </>
  );
}
