"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { HERO_VIDEO } from "@/lib/media";
import { cn } from "@/lib/utils";

interface HeroVideoBackgroundProps {
  className?: string;
}

export function HeroVideoBackground({ className }: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const play = () => {
      void video.play().catch(() => {
        /* autoplay blocked — poster from layout still visible */
      });
    };

    if (video.readyState >= 2) {
      play();
    } else {
      video.addEventListener("canplay", play, { once: true });
    }
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <Image
        src={HERO_VIDEO.poster}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <video
        ref={videoRef}
        className="absolute inset-0 z-[1] h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      >
        <source src={HERO_VIDEO.webm} type="video/webm" />
        <source src={HERO_VIDEO.mp4} type="video/mp4" />
      </video>
    </div>
  );
}
