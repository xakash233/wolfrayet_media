"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { resolveHeroVideo } from "@/lib/media";
import { cn } from "@/lib/utils";

interface HeroVideoBackgroundProps {
  className?: string;
  webm?: string;
  mp4?: string;
  poster?: string;
}

export function HeroVideoBackground({
  className,
  webm,
  mp4,
  poster,
}: HeroVideoBackgroundProps) {
  const resolved = resolveHeroVideo({ webm, mp4, poster });
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setReady(false);
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.load();

    const play = () => {
      void video.play().catch(() => {
        /* autoplay blocked — poster remains visible */
      });
    };

    const onPlaying = () => setReady(true);

    video.addEventListener("playing", onPlaying);
    if (video.readyState >= 2) {
      play();
    } else {
      video.addEventListener("canplay", play, { once: true });
    }

    return () => {
      video.removeEventListener("playing", onPlaying);
    };
  }, [resolved.mp4, resolved.webm]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-black", className)}>
      {resolved.poster && (
        <Image
          src={resolved.poster}
          alt=""
          fill
          priority
          className={cn(
            "hero-video-dull object-cover object-center transition-opacity duration-700",
            ready ? "opacity-0" : "opacity-100"
          )}
          sizes="100vw"
        />
      )}
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
