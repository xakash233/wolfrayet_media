"use client";

/**
 * No route-key remount / opacity fade — those caused blank pages until hard reload.
 * Children render directly for reliable Next.js client navigation.
 */
export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
