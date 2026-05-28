import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

const LOGO_SRC = "/logo/logo.png";

interface LogoProps {
  className?: string;
  imageClassName?: string;
  href?: string;
  priority?: boolean;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
}

const sizeMap = {
  sm: { width: 120, height: 40, className: "h-8 w-auto sm:h-9" },
  md: { width: 160, height: 48, className: "h-9 w-auto sm:h-10" },
  lg: { width: 200, height: 56, className: "h-10 w-auto sm:h-12" },
};

export function Logo({
  className,
  imageClassName,
  href = "/",
  priority = false,
  size = "md",
  onClick,
}: LogoProps) {
  const dimensions = sizeMap[size];

  const image = (
    <Image
      src={LOGO_SRC}
      alt={`${SITE_CONFIG.name} logo`}
      width={dimensions.width}
      height={dimensions.height}
      priority={priority}
      className={cn(
        dimensions.className,
        "object-contain object-left",
        imageClassName
      )}
    />
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
