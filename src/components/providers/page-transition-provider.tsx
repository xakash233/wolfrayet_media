"use client";

/**
 * Direct render — route-level opacity fades caused blank pages on navigation.
 */
export function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
