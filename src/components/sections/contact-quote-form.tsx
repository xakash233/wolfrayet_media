"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useScrollReveal } from "@/components/shared/scroll-reveal";
import {
  contactQuoteSchema,
  type ContactQuoteValues,
} from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { apiUrl } from "@/lib/api/config";
import { cn } from "@/lib/utils";

const SERVICE_OPTIONS = [
  "SEO & Digital Marketing",
  "Brand Identity & Design",
  "Web Development",
  "eCommerce Solutions",
  "Social Media Marketing",
  "PPC & Performance Ads",
] as const;

const fieldClass =
  "h-14 rounded-xl border-white/15 bg-white/[0.03] px-4 text-white placeholder:text-white/35 focus-visible:border-white/40 focus-visible:ring-white/20";

function FormField({
  index,
  children,
  className,
}: {
  index: number;
  children: React.ReactNode;
  className?: string;
}) {
  const reveal = useScrollReveal({ index, duration: 1.2, y: 40, blur: 0 });

  return (
    <motion.div
      ref={reveal.ref}
      initial={reveal.initial}
      animate={reveal.animate}
      transition={reveal.transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ContactQuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactQuoteValues>({
    resolver: zodResolver(contactQuoteSchema),
    defaultValues: { services: [], phone: "" },
  });

  const selectedServices = watch("services") ?? [];

  const toggleService = (service: string) => {
    const next = selectedServices.includes(service)
      ? selectedServices.filter((s) => s !== service)
      : [...selectedServices, service];
    setValue("services", next, { shouldValidate: true });
  };

  const onSubmit = async (formData: ContactQuoteValues) => {
    setSubmitError(null);
    try {
      const response = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          subject: `Quote Request — ${formData.services.join(", ")}`,
          message: formData.message,
        }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(data.error ?? "Failed to send message");
      }
      setSubmitted(true);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again or WhatsApp us."
      );
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center py-16 text-center"
      >
        <CheckCircle className="h-14 w-14 text-primary" />
        <h3 className="mt-6 text-2xl font-bold text-white">Message Sent!</h3>
        <p className="mt-2 max-w-sm text-white/60">
          We&apos;ll get back to you within 24 hours.
        </p>
        <Button
          variant="outline"
          className="mt-8 border-white/20 bg-transparent text-white hover:bg-white/10"
          onClick={() => setSubmitted(false)}
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <FormField index={0}>
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.22em] text-white/45">
          Fill the form to request a quote:
        </p>
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField index={1}>
          <Input
            id="name"
            placeholder="Your Name *"
            {...register("name")}
            aria-invalid={!!errors.name}
            className={fieldClass}
          />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-400" role="alert">
              {errors.name.message}
            </p>
          )}
        </FormField>
        <FormField index={2}>
          <Input
            id="email"
            type="email"
            placeholder="Email *"
            {...register("email")}
            aria-invalid={!!errors.email}
            className={fieldClass}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-400" role="alert">
              {errors.email.message}
            </p>
          )}
        </FormField>
      </div>

      <FormField index={3}>
        <Input
          id="phone"
          type="tel"
          placeholder="Phone (Optional)"
          {...register("phone")}
          className={fieldClass}
        />
      </FormField>

      <FormField index={4}>
        <Textarea
          id="message"
          rows={6}
          placeholder="Tell us about your project *"
          {...register("message")}
          aria-invalid={!!errors.message}
          className={cn(fieldClass, "min-h-[160px] resize-none py-4")}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-400" role="alert">
            {errors.message.message}
          </p>
        )}
      </FormField>

      <FormField index={5}>
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.22em] text-white/45">
          Services are interested in
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {SERVICE_OPTIONS.map((service) => {
            const checked = selectedServices.includes(service);
            return (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className="group flex items-center gap-3 text-left text-sm text-white/80 transition-colors hover:text-white"
              >
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                    checked
                      ? "border-white bg-white"
                      : "border-white/30 group-hover:border-white/60"
                  )}
                  aria-hidden
                >
                  {checked && (
                    <span className="h-2 w-2 rounded-full bg-black" />
                  )}
                </span>
                <span>{service}</span>
              </button>
            );
          })}
        </div>
        {errors.services && (
          <p className="mt-3 text-xs text-red-400" role="alert">
            {errors.services.message}
          </p>
        )}
      </FormField>

      <FormField index={6}>
          <Button
            type="submit"
            variant="premium"
            size="lg"
            disabled={isSubmitting}
            className="motion-btn h-14 w-full min-w-[200px] rounded-xl bg-white text-black hover:bg-white/90 sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner
                  size="sm"
                  className="mr-2 border-black border-t-transparent"
                />
                Sending...
              </>
            ) : (
              "Send Request"
            )}
          </Button>
      </FormField>

      {submitError && (
        <p className="text-center text-sm text-red-400" role="alert">
          {submitError}
        </p>
      )}
    </form>
  );
}
