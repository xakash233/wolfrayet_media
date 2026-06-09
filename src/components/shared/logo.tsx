import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

/** 840×297 — both assets share this ratio */
const LOGO_BLACK = "/logo/black.png";
const LOGO_WHITE = "/logo/white.png";
const LOGO_ASPECT = "aspect-[280/99]";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  href?: string;
  priority?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  /** Dark backgrounds (footer) — always white logo */
  staticLogo?: boolean;
}

const sizeMap = {
  sm: { box: "h-10 sm:h-11" },
  md: { box: "h-11 sm:h-12" },
  lg: { box: "h-14 sm:h-16" },
};

function LogoImage({
  src,
  alt,
  boxClass,
  imageClassName,
  priority,
  visibleClass,
}: {
  src: string;
  alt: string;
  boxClass: string;
  imageClassName?: string;
  priority?: boolean;
  visibleClass?: string;
}) {
  return (
    <span className={cn(boxClass, visibleClass)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 220px, 300px"
        className={cn("object-contain object-left", imageClassName)}
      />
    </span>
  );
}

export function Logo({
  className,
  imageClassName,
  href = "/",
  priority = false,
  size = "md",
  onClick,
  staticLogo = false,
}: LogoProps) {
  const dimensions = sizeMap[size];
  const boxClass = cn(
    "relative inline-block shrink-0",
    LOGO_ASPECT,
    imageClassName ?? dimensions.box
  );

  const image = staticLogo ? (
    <LogoImage
      src={LOGO_WHITE}
      alt={`${SITE_CONFIG.name} logo`}
      boxClass={boxClass}
      priority={priority}
    />
  ) : (
    <span className="inline-flex shrink-0 items-center">
      <LogoImage
        src={LOGO_WHITE}
        alt={`${SITE_CONFIG.name} logo`}
        boxClass={boxClass}
        priority={priority}
        visibleClass="hidden dark:block"
      />
      <LogoImage
        src={LOGO_BLACK}
        alt={`${SITE_CONFIG.name} logo`}
        boxClass={boxClass}
        priority={priority}
        visibleClass="dark:hidden"
      />
    </span>
  );

  if (!href) {
    return <div className={cn("inline-flex shrink-0", className)}>{image}</div>;
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 transition-opacity hover:opacity-90",
        className
      )}
      aria-label={`${SITE_CONFIG.name} home`}
    >
      {image}
    </Link>
  );
}
