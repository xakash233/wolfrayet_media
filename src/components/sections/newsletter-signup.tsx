"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { subscribeNewsletter } from "@/lib/newsletter";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    const result = await subscribeNewsletter(email.trim());
    setLoading(false);
    setStatus(result.ok ? "success" : "error");
    setMessage(result.message);
    if (result.ok) setEmail("");
  };

  return (
    <ScrollReveal
      index={0}
      duration={1.5}
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
          disabled={loading}
          aria-label="Email address"
          className="flex-1"
        />
        <Button type="submit" variant="premium" disabled={loading}>
          {loading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2 border-white border-t-transparent" />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
      {status === "success" && (
        <p className="mt-3 text-sm text-primary" role="status">
          {message}
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-destructive" role="alert">
          {message}
        </p>
      )}
    </ScrollReveal>
  );
}
