"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useInView,
} from "framer-motion";
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
  /** Subtle parallax on scroll — GPU transform only */
  parallax?: boolean;
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
  parallax = true,
}: AnimatedSectionImageProps) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-40px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const parallaxScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.06, 1, 1.03]);

  const enableParallax = parallax && !reducedMotion;

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "overflow-hidden",
        fill ? "absolute inset-0 h-full w-full" : "relative",
        className
      )}
      initial={false}
      animate={{ opacity: isInView || reducedMotion ? 1 : 0.85 }}
      transition={{
        duration: reducedMotion ? 0 : IMAGE_ANIMATION.fadeDuration,
        ease: IMAGE_ANIMATION.ease,
      }}
    >
      <motion.div
        className={cn(fill && "absolute inset-0 h-full w-full")}
        style={
          enableParallax
            ? { y: parallaxY, scale: parallaxScale, willChange: "transform" }
            : undefined
        }
        initial={false}
        animate={
          reducedMotion
            ? { scale: 1 }
            : isInView
              ? { scale: 1 }
              : { scale: 1.08 }
        }
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
