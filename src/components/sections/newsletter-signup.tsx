"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card mx-auto max-w-xl p-8 text-center"
    >
      <Mail className="mx-auto h-10 w-10 text-primary" />
      <h3 className="mt-4 text-xl font-bold">Stay Ahead of the Curve</h3>
      <p className="mt-2 text-muted-foreground">
        Subscribe for weekly marketing insights, trends, and exclusive tips.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-3 sm:flex-row"
      >
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-label="Email address"
          className="flex-1"
        />
        <Button type="submit" variant="premium">
          Subscribe
        </Button>
      </form>
      {status === "success" && (
        <p className="mt-3 text-sm text-primary" role="status">
          You&apos;re subscribed! Check your inbox.
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-destructive" role="alert">
          Please enter a valid email address.
        </p>
      )}
    </motion.div>
  );
}
