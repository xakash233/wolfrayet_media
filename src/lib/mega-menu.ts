export const MEGA_MENU_TABS = [
  { id: "home", label: "Home", href: "/", directLink: true },
  { id: "about", label: "About", href: "/about", directLink: true },
  { id: "services", label: "Services", href: "/services" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;

export type MegaMenuTabId = (typeof MEGA_MENU_TABS)[number]["id"];

export function megaMenuTitle(title: string): string {
  const short = title.replace(/\s*\([^)]*\)\s*/g, "").trim();
  if (short.length <= 32) return short;
  return short.split(/[,&]/)[0]?.trim() ?? short;
}
