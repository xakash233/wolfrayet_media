"use client";

import { useEffect, useRef } from "react";
import { resolveHeroVideo } from "@/lib/media";
import { cn } from "@/lib/utils";

interface HeroVideoBackgroundProps {
  className?: string;
  webm?: string;
  mp4?: string;
}

export function HeroVideoBackground({
  className,
  webm,
  mp4,
}: HeroVideoBackgroundProps) {
  const resolved = resolveHeroVideo({ webm, mp4 });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.load();

    const play = () => {
      void video.play().catch(() => {
        /* autoplay blocked */
      });
    };

    if (video.readyState >= 2) {
      play();
    } else {
      video.addEventListener("canplay", play, { once: true });
    }
  }, [resolved.mp4, resolved.webm]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-black", className)}>
      <video
        ref={videoRef}
        key={resolved.webm || resolved.mp4}
        className="hero-video-dull absolute inset-0 z-[1] h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      >
        {resolved.webm ? (
          <source src={resolved.webm} type="video/webm" />
        ) : null}
        {resolved.mp4 ? (
          <source src={resolved.mp4} type="video/mp4" />
        ) : null}
      </video>
    </div>
  );
}
