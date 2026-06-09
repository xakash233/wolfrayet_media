"use client";

import Link from "next/link";
import { AnimatedSectionImage } from "@/components/shared/animated-section-image";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import type { BlogPost } from "@/types";
import { BlogListing } from "@/components/sections/blog-listing";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BlogEnhancedProps {
  posts: BlogPost[];
}

export function BlogEnhanced({ posts }: BlogEnhancedProps) {
  const featured =
    posts.find((p) => p.featured) ?? posts[0];
  const trending = posts.slice(0, 4);

  return (
    <div className="space-y-16">
      <ScrollReveal
        as="article"
        index={0}
        duration={1.55}
        className="group overflow-hidden rounded-3xl border border-border"
      >
        <Link href={`/blog/${featured.slug}`} className="grid lg:grid-cols-2">
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[360px]">
            <AnimatedSectionImage
              src={featured.image}
              alt={featured.title}
              fill
              priority
              className="h-full w-full"
              imageClassName="object-cover transition-transform duration-[3.5s] group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute left-4 top-4 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">
              Featured
            </div>
          </div>
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {featured.category}
            </span>
            <h2 className="mt-3 text-3xl font-bold transition-colors group-hover:text-primary lg:text-4xl">
              {featured.title}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {featured.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(featured.date)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {featured.readTime}
              </span>
            </div>
            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-primary">
              Read article
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </Link>
      </ScrollReveal>

      <div className="grid gap-8 lg:grid-cols-4">
        <ScrollReveal index={1} duration={1.45} className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <div className="glass-card p-6">
              <BookOpen className="h-8 w-8 text-primary" />
              <h3 className="mt-3 font-bold">Trending Topics</h3>
              <ul className="mt-4 space-y-2">
                {trending.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary line-clamp-2"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <p className="font-semibold">Need expert help?</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Our strategists turn insights into growth.
              </p>
              <Button asChild variant="default" size="sm" className="mt-4 w-full">
                <Link href="/contact">Talk to Us</Link>
              </Button>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal index={2} duration={1.5} className="lg:col-span-3">
          <BlogListing posts={posts} />
        </ScrollReveal>
      </div>
    </div>
  );
}
