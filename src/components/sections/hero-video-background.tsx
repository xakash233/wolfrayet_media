"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { HERO_VIDEO } from "@/lib/media";
import { cn } from "@/lib/utils";

interface HeroVideoBackgroundProps {
  className?: string;
  webm?: string;
  mp4?: string;
  poster?: string;
}

export function HeroVideoBackground({
  className,
  webm = HERO_VIDEO.webm,
  mp4 = HERO_VIDEO.mp4,
  poster = HERO_VIDEO.poster,
}: HeroVideoBackgroundProps) {
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
        src={poster}
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
        {webm ? <source src={webm} type="video/webm" /> : null}
        <source src={mp4} type="video/mp4" />
      </video>
    </div>
  );
}
