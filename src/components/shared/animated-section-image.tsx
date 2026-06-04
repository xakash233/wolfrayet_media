"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { IMAGE_ANIMATION } from "@/lib/images";
import { cn } from "@/lib/utils";

interface AnimatedSectionImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
}

export function AnimatedSectionImage({
  src,
  alt,
  fill = true,
  width,
  height,
  className,
  imageClassName = "object-cover",
  sizes,
  priority = false,
}: AnimatedSectionImageProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "overflow-hidden",
        fill ? "absolute inset-0 h-full w-full" : "relative",
        className
      )}
      initial={false}
      animate={{ opacity: 1 }}
      transition={{
        duration: reducedMotion ? 0 : IMAGE_ANIMATION.fadeDuration,
        ease: IMAGE_ANIMATION.ease,
      }}
    >
      <motion.div
        className={cn(fill && "absolute inset-0 h-full w-full")}
        initial={false}
        animate={{ scale: 1 }}
        transition={{
          duration: reducedMotion ? 0 : IMAGE_ANIMATION.zoomDuration,
          ease: IMAGE_ANIMATION.ease,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          priority={priority}
          className={cn(fill && "h-full w-full", imageClassName)}
          sizes={sizes}
        />
      </motion.div>
    </motion.div>
  );
}
