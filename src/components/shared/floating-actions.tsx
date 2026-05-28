"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Bot, Mail, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/shared/whatsapp-icon";
import { AIAgent } from "@/components/shared/ai-agent";
import { WHATSAPP_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FloatingActions() {
  const [scrolled, setScrolled] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 300);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <AIAgent open={aiOpen} onOpenChange={setAiOpen} />

      <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3 sm:right-6">
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.9 }}
              className="flex flex-col items-end gap-3"
            >
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 }}
                className="flex items-center gap-2"
              >
                <span className="rounded-lg bg-background/95 px-3 py-1.5 text-xs font-medium shadow-lg backdrop-blur border border-border">
                  Contact Us
                </span>
                <Button
                  asChild
                  size="icon"
                  className="h-12 w-12 rounded-full shadow-lg"
                  aria-label="Contact us"
                >
                  <Link href="/contact">
                    <Mail className="h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2"
              >
                <span className="rounded-lg bg-background/95 px-3 py-1.5 text-xs font-medium shadow-lg backdrop-blur border border-border">
                  AI Assistant
                </span>
                <Button
                  size="icon"
                  onClick={() => {
                    setAiOpen(true);
                    setExpanded(false);
                  }}
                  className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-cyan-600 shadow-lg shadow-primary/30"
                  aria-label="Open AI assistant"
                >
                  <Bot className="h-5 w-5" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-2"
              >
                <span className="rounded-lg bg-[#25D366]/10 px-3 py-1.5 text-xs font-medium text-[#25D366] shadow-lg backdrop-blur border border-[#25D366]/30">
                  Chat on WhatsApp
                </span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Message us on WhatsApp"
                  className={cn(
                    "relative flex h-12 w-12 items-center justify-center rounded-full",
                    "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40",
                    "transition-transform hover:scale-105 active:scale-95"
                  )}
                >
                  <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
                  <WhatsAppIcon className="relative h-6 w-6" />
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {scrolled && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Button
                size="icon"
                variant="outline"
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className="h-11 w-11 rounded-full border-border bg-background/95 shadow-lg backdrop-blur"
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            size="icon"
            onClick={() => setExpanded(!expanded)}
            aria-label={expanded ? "Close quick actions" : "Open quick actions"}
            aria-expanded={expanded}
            className={cn(
              "h-14 w-14 rounded-full shadow-xl transition-colors",
              expanded
                ? "bg-muted text-foreground"
                : "bg-primary text-primary-foreground shadow-primary/30"
            )}
          >
            {expanded ? (
              <X className="h-6 w-6" />
            ) : (
              <Plus className="h-6 w-6" />
            )}
          </Button>
        </motion.div>

        {!expanded && (
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full sm:hidden",
              "bg-[#25D366] text-white shadow-lg"
            )}
          >
            <WhatsAppIcon className="h-6 w-6" />
          </a>
        )}
      </div>
    </>
  );
}
