"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  PinterestIcon,
  TwitterIcon,
  YoutubeIcon,
} from "@/components/shared/social-icons";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/shared/logo";
import { usePathname } from "next/navigation";
import { useState } from "react";

const socialIcons = [
  { icon: FacebookIcon, href: SITE_CONFIG.social.facebook, label: "Facebook" },
  { icon: InstagramIcon, href: SITE_CONFIG.social.instagram, label: "Instagram" },
  { icon: LinkedinIcon, href: SITE_CONFIG.social.linkedin, label: "LinkedIn" },
  { icon: PinterestIcon, href: SITE_CONFIG.social.pinterest, label: "Pinterest" },
  { icon: TwitterIcon, href: SITE_CONFIG.social.twitter, label: "Twitter" },
  { icon: YoutubeIcon, href: SITE_CONFIG.social.youtube, label: "YouTube" },
];

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (pathname === "/about-details") {
    return null;
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#070b14] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid gap-12 lg:grid-cols-4"
        >
          <div className="lg:col-span-2">
            <Logo size="lg" staticLogo />
            <p className="mt-4 max-w-md text-white/70">
              {SITE_CONFIG.description}
            </p>
            <div className="mt-6 flex gap-3">
              {socialIcons.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Subscribe</h3>
            <p className="mt-2 text-sm text-white/70">
              Get marketing insights delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email for newsletter"
                className="border-white/20 bg-white/5 text-white placeholder:text-white/50"
              />
              <Button type="submit" variant="premium">
                Sign Up
              </Button>
            </form>
            {subscribed && (
              <p className="mt-2 text-sm text-primary" role="status">
                Thanks for subscribing!
              </p>
            )}
          </div>
        </motion.div>

        <Separator className="my-8 bg-white/10" />

        <motion.div
          initial={false}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <p className="text-sm text-white/60">
            Copyright © {new Date().getFullYear()} {SITE_CONFIG.name} — All
            Rights Reserved
          </p>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <Mail className="h-4 w-4" />
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="hover:text-primary"
            >
              {SITE_CONFIG.email}
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
