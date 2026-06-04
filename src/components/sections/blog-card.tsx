"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/types";
import { AnimatedSectionImage } from "@/components/shared/animated-section-image";
import { formatDate } from "@/lib/utils";
import { sectionTransition } from "@/lib/animations";
import { Card, CardContent } from "@/components/ui/card";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={sectionTransition(index * 0.1)}
      whileHover={{ y: -4 }}
    >
      <Link href={`/blog/${post.slug}`}>
        <Card className="group h-full overflow-hidden border-border/50 transition-all hover:border-primary/30 hover:shadow-xl">
          <div className="relative aspect-[16/10] overflow-hidden">
            <AnimatedSectionImage
              src={post.image}
              alt={post.title}
              fill
              className="h-full w-full"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {post.featured && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                Featured
              </span>
            )}
          </div>
          <CardContent className="p-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              {post.category}
            </span>
            <h3 className="mt-2 text-xl font-bold transition-colors group-hover:text-primary">
              {post.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-muted-foreground">
              {post.excerpt}
            </p>
            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
