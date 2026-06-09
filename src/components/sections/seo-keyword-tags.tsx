"use client";

import { motion } from "framer-motion";
import { useScrollReveal } from "@/components/shared/scroll-reveal";

function KeywordTag({ keyword, index }: { keyword: string; index: number }) {
  const reveal = useScrollReveal({
    index,
    duration: 1.2,
    y: 36,
    blur: 4,
  });

  return (
    <motion.li
      ref={reveal.ref as unknown as React.Ref<HTMLLIElement>}
      initial={reveal.initial}
      animate={reveal.animate}
      transition={reveal.transition}
      className="rounded-full border border-border/60 bg-background/80 px-3 py-1.5 text-xs text-muted-foreground"
    >
      {keyword}
    </motion.li>
  );
}

interface SeoKeywordTagsProps {
  keywords: readonly string[];
}

export function SeoKeywordTags({ keywords }: SeoKeywordTagsProps) {
  return (
    <ul
      className="mx-auto mt-8 flex max-w-5xl flex-wrap justify-center gap-2"
      aria-label="Core digital marketing specialties"
    >
      {keywords.map((keyword, index) => (
        <KeywordTag key={keyword} keyword={keyword} index={index} />
      ))}
    </ul>
  );
}
